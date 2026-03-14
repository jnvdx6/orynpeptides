import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const newsletterService = req.scope.resolve("newsletterModuleService") as any
  await newsletterService.deleteNewsletterSubscribers(req.params.id)
  return res.json({ id: req.params.id, deleted: true })
}
