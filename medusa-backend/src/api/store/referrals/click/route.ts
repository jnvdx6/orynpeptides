import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const referralService = req.scope.resolve("referralModuleService") as any
  const { code, source } = req.body as { code: string; source?: string }

  if (!code) {
    return res.status(400).json({ error: "Referral code is required" })
  }

  await referralService.trackClick(code, source)
  return res.json({ tracked: true })
}
