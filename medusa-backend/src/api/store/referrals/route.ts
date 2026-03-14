import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const referralService = req.scope.resolve("referralModuleService") as any
  const customerId = req.auth_context?.actor_id

  if (!customerId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const directReferrals = await referralService.listReferralLinks({
    referrer_customer_id: customerId,
    level: 1,
  })

  const ownLinks = await referralService.listReferralLinks({
    referrer_customer_id: customerId,
    level: 0,
  })

  const commissions = await referralService.listCommissions({
    beneficiary_customer_id: customerId,
  })

  const totalEarnings = commissions
    .filter((c: any) => c.status === "paid")
    .reduce((sum: number, c: any) => sum + c.commission_amount, 0)

  const pendingEarnings = commissions
    .filter((c: any) => c.status === "pending" || c.status === "approved")
    .reduce((sum: number, c: any) => sum + c.commission_amount, 0)

  const approvedEarnings = commissions
    .filter((c: any) => c.status === "approved")
    .reduce((sum: number, c: any) => sum + c.commission_amount, 0)

  const totalClicks = ownLinks.reduce(
    (sum: number, l: any) => sum + (l.clicks || 0),
    0
  )

  return res.json({
    referral_code: ownLinks[0]?.referral_code || null,
    referral_link_status: ownLinks[0]?.status || null,
    direct_referrals_count: directReferrals.length,
    total_clicks: totalClicks,
    conversion_rate:
      totalClicks > 0
        ? Math.round((directReferrals.length / totalClicks) * 10000) / 100
        : 0,
    total_earnings: Math.round(totalEarnings * 100) / 100,
    pending_earnings: Math.round(pendingEarnings * 100) / 100,
    approved_earnings: Math.round(approvedEarnings * 100) / 100,
    commissions: commissions.map((c: any) => ({
      id: c.id,
      order_id: c.order_id,
      level: c.level,
      rate: c.rate,
      order_amount: c.order_amount,
      commission_amount: c.commission_amount,
      currency_code: c.currency_code,
      status: c.status,
      paid_at: c.paid_at,
      created_at: (c as any).created_at,
    })),
  })
}
