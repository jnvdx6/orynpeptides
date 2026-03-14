import { MedusaService } from "@medusajs/framework/utils"
import ReferralLink from "./models/referral-link"
import Commission from "./models/commission"

class ReferralModuleService extends MedusaService({
  ReferralLink,
  Commission,
}) {
  private commissionRates = [0.05, 0.03, 0.02, 0.01, 0.005]

  async generateReferralCode(): Promise<string> {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = ""
    let exists = true
    while (exists) {
      code = "ORYN-"
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      const existing = await this.listReferralLinks({ referral_code: code })
      exists = existing.length > 0
    }
    return code
  }

  async getReferralChain(customerId: string): Promise<string[]> {
    const chain: string[] = []
    let currentId = customerId
    for (let i = 0; i < 5; i++) {
      const links = await this.listReferralLinks({
        referred_customer_id: currentId,
        level: 1,
      })
      if (!links.length) break
      chain.push(links[0].referrer_customer_id)
      currentId = links[0].referrer_customer_id
    }
    return chain
  }

  async trackClick(referralCode: string, source?: string): Promise<void> {
    const links = await this.listReferralLinks({
      referral_code: referralCode,
      level: 0,
    })
    if (links.length > 0) {
      await this.updateReferralLinks({
        id: links[0].id,
        clicks: (links[0].clicks || 0) + 1,
        source: source || links[0].source,
      })
    }
  }

  async generateCommissions(
    orderId: string,
    customerIdWhoPaid: string,
    orderAmount: number,
    currencyCode: string
  ): Promise<any[]> {
    const chain = await this.getReferralChain(customerIdWhoPaid)
    const created: any[] = []

    for (let i = 0; i < chain.length; i++) {
      const rate = this.commissionRates[i]
      const commissionAmount = Math.round(orderAmount * rate * 100) / 100
      if (commissionAmount <= 0) continue

      const referredId = i === 0 ? customerIdWhoPaid : chain[i - 1]
      const links = await this.listReferralLinks({
        referrer_customer_id: chain[i],
        referred_customer_id: referredId,
      })

      const commission = await this.createCommissions({
        referral_link_id: links[0]?.id || "",
        order_id: orderId,
        beneficiary_customer_id: chain[i],
        source_customer_id: customerIdWhoPaid,
        level: i + 1,
        rate,
        order_amount: orderAmount,
        commission_amount: commissionAmount,
        currency_code: currencyCode,
        status: "pending",
      })

      created.push(commission)
    }

    return created
  }

  async approveCommission(id: string, notes?: string): Promise<any> {
    return this.updateCommissions({
      id,
      status: "approved" as const,
      approved_at: new Date().toISOString(),
      admin_notes: notes || null,
    })
  }

  async payCommission(
    id: string,
    payoutMethod: string,
    payoutReference: string,
    notes?: string
  ): Promise<any> {
    return this.updateCommissions({
      id,
      status: "paid" as const,
      paid_at: new Date().toISOString(),
      payout_method: payoutMethod,
      payout_reference: payoutReference,
      admin_notes: notes || null,
    })
  }

  async rejectCommission(id: string, reason: string): Promise<any> {
    return this.updateCommissions({
      id,
      status: "rejected" as const,
      rejected_at: new Date().toISOString(),
      admin_notes: reason,
    })
  }

  async getReferralStats(): Promise<{
    total_referrals: number
    active_referrers: number
    total_clicks: number
    conversion_rate: number
    total_commissions_generated: number
    total_pending: number
    total_approved: number
    total_paid: number
    total_rejected: number
    top_referrers: Array<{
      customer_id: string
      referrals: number
      total_earned: number
    }>
    commissions_by_level: Record<number, { count: number; total: number }>
  }> {
    const allLinks = await this.listReferralLinks({}, { take: 100000 })
    const directReferrals = allLinks.filter((l: any) => l.level === 1)
    const ownLinks = allLinks.filter((l: any) => l.level === 0)

    const totalClicks = ownLinks.reduce((sum: number, l: any) => sum + (l.clicks || 0), 0)

    const allCommissions = await this.listCommissions({}, { take: 100000 })

    let totalPending = 0
    let totalApproved = 0
    let totalPaid = 0
    let totalRejected = 0
    const byLevel: Record<number, { count: number; total: number }> = {}

    for (const c of allCommissions) {
      const amt = c.commission_amount || 0
      if (c.status === "pending") totalPending += amt
      else if (c.status === "approved") totalApproved += amt
      else if (c.status === "paid") totalPaid += amt
      else if (c.status === "rejected") totalRejected += amt

      if (!byLevel[c.level]) byLevel[c.level] = { count: 0, total: 0 }
      byLevel[c.level].count++
      byLevel[c.level].total += amt
    }

    // Top referrers
    const referrerMap = new Map<string, { referrals: number; earned: number }>()
    for (const link of directReferrals) {
      const r = referrerMap.get(link.referrer_customer_id) || {
        referrals: 0,
        earned: 0,
      }
      r.referrals++
      referrerMap.set(link.referrer_customer_id, r)
    }
    for (const c of allCommissions) {
      if (c.status === "paid") {
        const r = referrerMap.get(c.beneficiary_customer_id) || {
          referrals: 0,
          earned: 0,
        }
        r.earned += c.commission_amount
        referrerMap.set(c.beneficiary_customer_id, r)
      }
    }

    const topReferrers = Array.from(referrerMap.entries())
      .map(([customer_id, data]) => ({
        customer_id,
        referrals: data.referrals,
        total_earned: Math.round(data.earned * 100) / 100,
      }))
      .sort((a, b) => b.referrals - a.referrals)
      .slice(0, 10)

    const uniqueReferrers = new Set(
      directReferrals.map((l: any) => l.referrer_customer_id)
    )

    return {
      total_referrals: directReferrals.length,
      active_referrers: uniqueReferrers.size,
      total_clicks: totalClicks,
      conversion_rate:
        totalClicks > 0
          ? Math.round((directReferrals.length / totalClicks) * 10000) / 100
          : 0,
      total_commissions_generated: allCommissions.length,
      total_pending: Math.round(totalPending * 100) / 100,
      total_approved: Math.round(totalApproved * 100) / 100,
      total_paid: Math.round(totalPaid * 100) / 100,
      total_rejected: Math.round(totalRejected * 100) / 100,
      top_referrers: topReferrers,
      commissions_by_level: byLevel,
    }
  }
}

export default ReferralModuleService
