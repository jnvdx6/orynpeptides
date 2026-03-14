import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const contactService = req.scope.resolve("contactModuleService") as any
  const submission = await contactService.retrieveContactSubmission(req.params.id)
  const replies = await contactService.getConversation(req.params.id)
  return res.json({ contact_submission: submission, replies })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const contactService = req.scope.resolve("contactModuleService") as any
  const body = req.body as {
    status?: string
    admin_notes?: string
    priority?: string
    assigned_to?: string
  }

  const updates: Record<string, any> = {}
  if (body.status) updates.status = body.status
  if (body.admin_notes !== undefined) updates.admin_notes = body.admin_notes
  if (body.priority) updates.priority = body.priority
  if (body.assigned_to !== undefined) updates.assigned_to = body.assigned_to

  if (body.status === "resolved") {
    updates.resolved_at = new Date().toISOString()
  }

  const updated = await contactService.updateContactSubmissions(
    req.params.id,
    updates
  )
  return res.json({ contact_submission: updated })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const contactService = req.scope.resolve("contactModuleService") as any
  await contactService.deleteContactSubmissions(req.params.id)
  return res.json({ id: req.params.id, deleted: true })
}
