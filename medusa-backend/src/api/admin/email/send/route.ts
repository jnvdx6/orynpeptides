import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const emailService = req.scope.resolve("emailModuleService") as any
  const { from, to, cc, bcc, subject, html, text, reply_to } = req.body as {
    from?: string
    to: string | string[]
    cc?: string | string[]
    bcc?: string | string[]
    subject: string
    html?: string
    text?: string
    reply_to?: string
  }

  if (!to || !subject) {
    return res.status(400).json({ error: "to and subject are required" })
  }

  if (!html && !text) {
    return res.status(400).json({ error: "html or text body is required" })
  }

  const result = await emailService.sendEmail({
    from: from || undefined,
    to,
    cc,
    bcc,
    subject,
    html,
    text,
    reply_to,
    tags: [{ name: "source", value: "admin-compose" }],
    related_type: "admin",
  })

  return res.json({ email: result })
}
