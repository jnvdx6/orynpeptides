import type { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function DELETE(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const wishlistService = req.scope.resolve("wishlistModuleService") as any
  const customerId = req.auth_context?.actor_id

  if (!customerId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  await wishlistService.deleteWishlistItems(req.params.id)

  return res.status(200).json({ id: req.params.id, deleted: true })
}
