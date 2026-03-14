import { z } from "@medusajs/framework/zod"

export const PostStoreContactSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  organization: z.string().optional(),
  inquiry_type: z.string().min(1),
  message: z.string().min(10),
})
