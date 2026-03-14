import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const referralService = req.scope.resolve("referralModuleService") as any
  const { status, limit = "50", offset = "0" } = req.query as Record<string, string>

  const filters: Record<string, any> = {}
  if (status) filters.status = status

  const commissions = await referralService.listCommissions(filters, {
    take: parseInt(limit),
    skip: parseInt(offset),
    order: { created_at: "DESC" },
  })

  const [, count] = await referralService.listAndCountCommissions(filters)

  // Get comprehensive stats
  const stats = await referralService.getReferralStats()

  return res.json({
    commissions,
    count,
    limit: parseInt(limit),
    offset: parseInt(offset),
    totals: {
      pending: stats.total_pending,
      approved: stats.total_approved,
      paid: stats.total_paid,
      rejected: stats.total_rejected,
    },
    stats,
  })
}
