import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const newsletterService = req.scope.resolve("newsletterModuleService") as any
  const subscriber = await newsletterService.retrieveNewsletterSubscriber(req.params.id)
  return res.json({ subscriber })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const newsletterService = req.scope.resolve("newsletterModuleService") as any
  const body = req.body as {
    status?: string
    tags?: string
    first_name?: string
    last_name?: string
  }

  const updated = await newsletterService.updateNewsletterSubscribers(
    req.params.id,
    body
  )

  // Sync unsubscribe with Resend if status changed
  if (body.status === "unsubscribed") {
    try {
      const emailService = req.scope.resolve("emailModuleService") as any
      const subscriber = await newsletterService.retrieveNewsletterSubscriber(req.params.id)
      await emailService.unsubscribeContactFromResend(subscriber.email)
    } catch {
      // Non-critical
    }
  }

  return res.json({ subscriber: updated })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const newsletterService = req.scope.resolve("newsletterModuleService") as any
  await newsletterService.deleteNewsletterSubscribers(req.params.id)
  return res.json({ id: req.params.id, deleted: true })
}
