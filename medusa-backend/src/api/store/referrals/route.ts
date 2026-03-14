import type { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { REFERRAL_MODULE } from "../../../modules/referral"

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const referralService = req.scope.resolve(REFERRAL_MODULE)
  const customerId = req.auth_context?.actor_id

  if (!customerId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  // Get referral links where this customer is the referrer (direct)
  const directReferrals = await referralService.listReferralLinks({
    referrer_customer_id: customerId,
    level: 1,
  })

  // Get this customer's own referral code (level 0 = own code)
  const ownLinks = await referralService.listReferralLinks({
    referrer_customer_id: customerId,
    level: 0,
  })

  // Get all commissions for this customer
  const commissions = await referralService.listCommissions({
    beneficiary_customer_id: customerId,
  })

  const totalEarnings = commissions
    .filter((c: any) => c.status === "paid")
    .reduce((sum: number, c: any) => sum + c.commission_amount, 0)

  const pendingEarnings = commissions
    .filter((c: any) => c.status === "pending" || c.status === "approved")
    .reduce((sum: number, c: any) => sum + c.commission_amount, 0)

  res.json({
    referral_code: ownLinks[0]?.referral_code || null,
    direct_referrals_count: directReferrals.length,
    total_earnings: totalEarnings,
    pending_earnings: pendingEarnings,
    commissions,
  })
}
