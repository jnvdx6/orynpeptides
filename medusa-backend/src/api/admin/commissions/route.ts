import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const referralService = req.scope.resolve("referralModuleService") as any
  const { status, limit = "50", offset = "0" } = req.query as Record<string, string>

  const filters: Record<string, any> = {}
  if (status) filters.status = status

  const commissions = await referralService.listCommissions(
    filters,
    { take: parseInt(limit), skip: parseInt(offset), order: { created_at: "DESC" } }
  )

  const [, count] = await referralService.listAndCountCommissions(filters)

  const allCommissions = await referralService.listCommissions({})
  const totalPending = allCommissions
    .filter((c: any) => c.status === "pending")
    .reduce((sum: number, c: any) => sum + c.commission_amount, 0)
  const totalPaid = allCommissions
    .filter((c: any) => c.status === "paid")
    .reduce((sum: number, c: any) => sum + c.commission_amount, 0)

  return res.json({
    commissions,
    count,
    limit: parseInt(limit),
    offset: parseInt(offset),
    totals: { pending: totalPending, paid: totalPaid },
  })
}
