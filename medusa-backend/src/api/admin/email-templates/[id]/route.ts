import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const emailService = req.scope.resolve("emailModuleService") as any
  const template = await emailService.retrieveEmailTemplate(req.params.id)
  return res.json({ email_template: template })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const emailService = req.scope.resolve("emailModuleService") as any
  const body = req.body as {
    name?: string
    subject_template?: string
    html_body?: string
    text_body?: string
    description?: string
    category?: string
    variables?: string
    is_active?: boolean
  }

  const updated = await emailService.updateEmailTemplates(req.params.id, body)
  return res.json({ email_template: updated })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const emailService = req.scope.resolve("emailModuleService") as any
  await emailService.deleteEmailTemplates(req.params.id)
  return res.json({ id: req.params.id, deleted: true })
}
