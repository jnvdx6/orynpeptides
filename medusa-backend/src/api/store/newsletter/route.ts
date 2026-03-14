import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"
import { PostStoreNewsletterSchema } from "./validators"
import { NEWSLETTER_MODULE } from "../../../modules/newsletter"

type PostBody = z.infer<typeof PostStoreNewsletterSchema>

export async function POST(
  req: MedusaRequest<PostBody>,
  res: MedusaResponse
) {
  const newsletterService = req.scope.resolve(NEWSLETTER_MODULE)

  const existing = await newsletterService.listNewsletterSubscribers({
    email: req.validatedBody.email,
  })

  if (existing.length > 0) {
    if (existing[0].status === "unsubscribed") {
      const updated = await newsletterService.updateNewsletterSubscribers(
        existing[0].id,
        { status: "active", source: req.validatedBody.source }
      )
      return res.json({ subscriber: updated, reactivated: true })
    }
    return res.json({ subscriber: existing[0], already_subscribed: true })
  }

  const subscriber = await newsletterService.createNewsletterSubscribers({
    email: req.validatedBody.email,
    first_name: req.validatedBody.first_name || null,
    last_name: req.validatedBody.last_name || null,
    source: req.validatedBody.source,
    status: "active",
  })

  res.status(201).json({ subscriber })
}
