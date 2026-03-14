import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CONTACT_MODULE } from "../../../../modules/contact"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const contactService = req.scope.resolve(CONTACT_MODULE)
  const submission = await contactService.retrieveContactSubmission(req.params.id)
  res.json({ contact_submission: submission })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const contactService = req.scope.resolve(CONTACT_MODULE)
  const updated = await contactService.updateContactSubmissions(
    req.params.id,
    req.body as { status?: string; admin_notes?: string }
  )
  res.json({ contact_submission: updated })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const contactService = req.scope.resolve(CONTACT_MODULE)
  await contactService.deleteContactSubmissions(req.params.id)
  res.json({ id: req.params.id, deleted: true })
}
