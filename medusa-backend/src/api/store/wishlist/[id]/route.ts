import type { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { WISHLIST_MODULE } from "../../../../modules/wishlist"

export async function DELETE(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const wishlistService = req.scope.resolve(WISHLIST_MODULE)
  const customerId = req.auth_context?.actor_id

  if (!customerId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  await wishlistService.deleteWishlistItems(req.params.id)

  res.status(200).json({ id: req.params.id, deleted: true })
}
