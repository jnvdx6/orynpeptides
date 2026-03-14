import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const emailService = req.scope.resolve("emailModuleService") as any
  const email = await emailService.retrieveInboundEmail(req.params.id)
  return res.json({ email })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const emailService = req.scope.resolve("emailModuleService") as any
  const { status } = req.body as { status?: string }

  if (status) {
    await emailService.updateInboundEmails({ id: req.params.id, status })
  }

  const email = await emailService.retrieveInboundEmail(req.params.id)
  return res.json({ email })
}
