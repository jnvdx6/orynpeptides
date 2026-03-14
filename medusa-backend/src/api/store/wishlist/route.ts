import type { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"
import { PostStoreWishlistSchema } from "./validators"

type PostBody = z.infer<typeof PostStoreWishlistSchema>

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const wishlistService = req.scope.resolve("wishlistModuleService") as any
  const customerId = req.auth_context?.actor_id

  if (!customerId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const items = await wishlistService.listWishlistItems({
    customer_id: customerId,
  })

  return res.json({ wishlist_items: items })
}

export async function POST(
  req: AuthenticatedMedusaRequest<PostBody>,
  res: MedusaResponse
) {
  const wishlistService = req.scope.resolve("wishlistModuleService") as any
  const customerId = req.auth_context?.actor_id

  if (!customerId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const existing = await wishlistService.listWishlistItems({
    customer_id: customerId,
    product_id: req.validatedBody.product_id,
  })

  if (existing.length > 0) {
    return res.json({ wishlist_item: existing[0], already_exists: true })
  }

  const item = await wishlistService.createWishlistItems({
    customer_id: customerId,
    product_id: req.validatedBody.product_id,
  })

  return res.status(201).json({ wishlist_item: item })
}
