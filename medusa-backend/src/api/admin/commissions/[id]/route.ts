import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const referralService = req.scope.resolve("referralModuleService") as any
  const {
    status,
    payout_method,
    payout_reference,
    admin_notes,
  } = req.body as {
    status: "pending" | "approved" | "paid" | "rejected" | "cancelled"
    payout_method?: string
    payout_reference?: string
    admin_notes?: string
  }

  let updated: any

  switch (status) {
    case "approved":
      updated = await referralService.approveCommission(req.params.id, admin_notes)
      break
    case "paid":
      updated = await referralService.payCommission(
        req.params.id,
        payout_method || "manual",
        payout_reference || "",
        admin_notes
      )
      break
    case "rejected":
      updated = await referralService.rejectCommission(
        req.params.id,
        admin_notes || "Rejected by admin"
      )
      break
    default:
      updated = await referralService.updateCommissions(req.params.id, {
        status,
        admin_notes: admin_notes || null,
      })
  }

  return res.json({ commission: updated })
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const referralService = req.scope.resolve("referralModuleService") as any
  const commission = await referralService.retrieveCommission(req.params.id)
  return res.json({ commission })
}
