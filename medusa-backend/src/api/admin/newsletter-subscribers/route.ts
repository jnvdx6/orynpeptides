import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const newsletterService = req.scope.resolve("newsletterModuleService") as any
  const { status, source, tags, limit = "50", offset = "0" } = req.query as Record<string, string>

  const filters: Record<string, any> = {}
  if (status) filters.status = status
  if (source) filters.source = source
  if (tags) filters.tags = tags

  const subscribers = await newsletterService.listNewsletterSubscribers(filters, {
    take: parseInt(limit),
    skip: parseInt(offset),
    order: { created_at: "DESC" },
  })

  const [, count] = await newsletterService.listAndCountNewsletterSubscribers(filters)

  // Get stats
  const stats = await newsletterService.getNewsletterStats()

  return res.json({
    newsletter_subscribers: subscribers,
    count,
    limit: parseInt(limit),
    offset: parseInt(offset),
    stats,
  })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const newsletterService = req.scope.resolve("newsletterModuleService") as any
  const { action, subscribers } = req.body as {
    action: "import"
    subscribers: Array<{ email: string; first_name?: string; last_name?: string; tags?: string }>
  }

  if (action === "import") {
    const result = await newsletterService.bulkImport(subscribers)
    return res.json(result)
  }

  return res.status(400).json({ error: "Invalid action" })
}
