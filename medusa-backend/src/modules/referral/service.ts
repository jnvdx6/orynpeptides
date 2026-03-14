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
    let code: string = ""
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

  async generateCommissions(
    orderId: string,
    customerIdWhoPaid: string,
    orderAmount: number,
    currencyCode: string
  ): Promise<void> {
    const chain = await this.getReferralChain(customerIdWhoPaid)
    for (let i = 0; i < chain.length; i++) {
      const rate = this.commissionRates[i]
      const commissionAmount = Math.round(orderAmount * rate * 100) / 100
      if (commissionAmount <= 0) continue

      const referredId = i === 0 ? customerIdWhoPaid : chain[i - 1]
      const links = await this.listReferralLinks({
        referrer_customer_id: chain[i],
        referred_customer_id: referredId,
      })

      await this.createCommissions({
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
    }
  }
}

export default ReferralModuleService
