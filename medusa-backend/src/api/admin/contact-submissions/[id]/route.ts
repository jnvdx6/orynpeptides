import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const contactService = req.scope.resolve("contactModuleService") as any
  const submission = await contactService.retrieveContactSubmission(req.params.id)
  return res.json({ contact_submission: submission })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const contactService = req.scope.resolve("contactModuleService") as any
  const updated = await contactService.updateContactSubmissions(
    req.params.id,
    req.body as { status?: string; admin_notes?: string }
  )
  return res.json({ contact_submission: updated })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const contactService = req.scope.resolve("contactModuleService") as any
  await contactService.deleteContactSubmissions(req.params.id)
  return res.json({ id: req.params.id, deleted: true })
}
