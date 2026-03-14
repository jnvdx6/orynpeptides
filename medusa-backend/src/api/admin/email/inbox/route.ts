import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const emailService = req.scope.resolve("emailModuleService") as any
  const { status, limit = "50", offset = "0" } = req.query as Record<string, string>

  const filters: Record<string, any> = {}
  if (status) filters.status = status

  const emails = await emailService.listInboundEmails(filters, {
    take: parseInt(limit),
    skip: parseInt(offset),
    order: { created_at: "DESC" },
  })

  const [, count] = await emailService.listAndCountInboundEmails(filters)

  return res.json({
    emails,
    count,
    limit: parseInt(limit),
    offset: parseInt(offset),
  })
}
