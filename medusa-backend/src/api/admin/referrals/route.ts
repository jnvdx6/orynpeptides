import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const referralService = req.scope.resolve("referralModuleService") as any
  const { limit = "50", offset = "0" } = req.query as Record<string, string>

  const links = await referralService.listReferralLinks({}, {
    take: parseInt(limit),
    skip: parseInt(offset),
    order: { created_at: "DESC" },
  })

  const [, count] = await referralService.listAndCountReferralLinks({})

  const stats = await referralService.getReferralStats()

  return res.json({
    referral_links: links,
    count,
    limit: parseInt(limit),
    offset: parseInt(offset),
    stats,
  })
}
