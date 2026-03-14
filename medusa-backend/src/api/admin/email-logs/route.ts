import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const emailService = req.scope.resolve("emailModuleService") as any
  const {
    direction,
    status,
    related_type,
    limit = "50",
    offset = "0",
  } = req.query as Record<string, string>

  const filters: Record<string, any> = {}
  if (direction) filters.direction = direction
  if (status) filters.status = status
  if (related_type) filters.related_type = related_type

  const logs = await emailService.listEmailLogs(filters, {
    take: parseInt(limit),
    skip: parseInt(offset),
    order: { created_at: "DESC" },
  })

  const [, count] = await emailService.listAndCountEmailLogs(filters)

  // Get stats
  const stats = await emailService.getEmailStats()

  return res.json({
    email_logs: logs,
    count,
    limit: parseInt(limit),
    offset: parseInt(offset),
    stats,
  })
}
