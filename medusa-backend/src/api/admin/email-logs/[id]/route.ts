import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const emailService = req.scope.resolve("emailModuleService") as any
  const log = await emailService.retrieveEmailLog(req.params.id)
  return res.json({ email_log: log })
}
