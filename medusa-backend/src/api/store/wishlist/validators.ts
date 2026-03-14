import { z } from "@medusajs/framework/zod"

export const PostStoreWishlistSchema = z.object({
  product_id: z.string().min(1),
})
