import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const referralService = req.scope.resolve("referralModuleService") as any
  const { status } = req.body as { status: "pending" | "approved" | "paid" | "rejected" }

  const updated = await referralService.updateCommissions(req.params.id, { status })

  return res.json({ commission: updated })
}
