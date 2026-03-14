import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const contactService = req.scope.resolve("contactModuleService") as any
  const { status, limit = "50", offset = "0" } = req.query as Record<string, string>

  const filters: Record<string, any> = {}
  if (status) filters.status = status

  const submissions = await contactService.listContactSubmissions(
    filters,
    { take: parseInt(limit), skip: parseInt(offset), order: { created_at: "DESC" } }
  )

  const [, count] = await contactService.listAndCountContactSubmissions(filters)

  return res.json({
    contact_submissions: submissions,
    count,
    limit: parseInt(limit),
    offset: parseInt(offset),
  })
}
