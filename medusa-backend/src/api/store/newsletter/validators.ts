import { z } from "@medusajs/framework/zod"

export const PostStoreNewsletterSchema = z.object({
  email: z.string().email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  source: z.enum(["footer", "exit_intent", "checkout", "manual"]).default("footer"),
})
