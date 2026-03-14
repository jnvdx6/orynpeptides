import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { REFERRAL_MODULE } from "../../../../modules/referral"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const referralService = req.scope.resolve(REFERRAL_MODULE)
  const { status } = req.body as { status: "pending" | "approved" | "paid" | "rejected" }

  const updated = await referralService.updateCommissions(req.params.id, { status })

  res.json({ commission: updated })
}
