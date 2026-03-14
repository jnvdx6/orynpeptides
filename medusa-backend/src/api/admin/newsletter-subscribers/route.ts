import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const newsletterService = req.scope.resolve("newsletterModuleService") as any
  const { status, source, limit = "50", offset = "0" } = req.query as Record<string, string>

  const filters: Record<string, any> = {}
  if (status) filters.status = status
  if (source) filters.source = source

  const subscribers = await newsletterService.listNewsletterSubscribers(
    filters,
    { take: parseInt(limit), skip: parseInt(offset), order: { created_at: "DESC" } }
  )

  const [, count] = await newsletterService.listAndCountNewsletterSubscribers(filters)

  return res.json({
    newsletter_subscribers: subscribers,
    count,
    limit: parseInt(limit),
    offset: parseInt(offset),
  })
}
