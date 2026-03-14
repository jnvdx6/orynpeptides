import { z } from "@medusajs/framework/zod"

export const PostStoreContactSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  organization: z.string().optional(),
  inquiry_type: z.string().min(1),
  message: z.string().min(10),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  source: z.enum(["website", "email", "phone", "social", "other"]).default("website"),
})
