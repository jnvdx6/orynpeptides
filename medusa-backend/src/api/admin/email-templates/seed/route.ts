import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const emailService = req.scope.resolve("emailModuleService") as any
  const result = await emailService.seedDefaultTemplates()
  return res.json(result)
}
