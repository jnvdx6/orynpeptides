import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { NEWSLETTER_MODULE } from "../../../../modules/newsletter"

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const newsletterService = req.scope.resolve(NEWSLETTER_MODULE)
  await newsletterService.deleteNewsletterSubscribers(req.params.id)
  res.json({ id: req.params.id, deleted: true })
}
