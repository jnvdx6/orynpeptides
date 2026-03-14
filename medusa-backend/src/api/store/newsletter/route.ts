import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"
import { PostStoreNewsletterSchema } from "./validators"

type PostBody = z.infer<typeof PostStoreNewsletterSchema>

export async function POST(
  req: MedusaRequest<PostBody>,
  res: MedusaResponse
) {
  const newsletterService = req.scope.resolve("newsletterModuleService") as any
  const logger = req.scope.resolve("logger")

  const existing = await newsletterService.listNewsletterSubscribers({
    email: req.validatedBody.email,
  })

  if (existing.length > 0) {
    if (existing[0].status === "unsubscribed") {
      const newToken = newsletterService.generateUnsubscribeToken()
      const updated = await newsletterService.updateNewsletterSubscribers(
        existing[0].id,
        {
          status: "active",
          source: req.validatedBody.source,
          unsubscribe_token: newToken,
          unsubscribed_at: null,
        }
      )
      return res.json({ subscriber: updated, reactivated: true })
    }
    return res.json({ subscriber: existing[0], already_subscribed: true })
  }

  const unsubscribeToken = newsletterService.generateUnsubscribeToken()

  const subscriber = await newsletterService.createNewsletterSubscribers({
    email: req.validatedBody.email,
    first_name: req.validatedBody.first_name || null,
    last_name: req.validatedBody.last_name || null,
    source: req.validatedBody.source,
    status: "active",
    tags: req.validatedBody.tags || null,
    unsubscribe_token: unsubscribeToken,
    confirmed_at: new Date().toISOString(),
  })

  // Sync with Resend Contacts + send welcome email
  try {
    const emailService = req.scope.resolve("emailModuleService") as any

    await emailService.syncContactToResend(
      subscriber.email,
      subscriber.first_name,
      subscriber.last_name
    )

    const unsubscribeUrl = newsletterService.generateUnsubscribeUrl(unsubscribeToken)
    await emailService.sendTemplatedEmail("newsletter-welcome", {
      to: subscriber.email,
      variables: {
        first_name: subscriber.first_name || "there",
        unsubscribe_url: unsubscribeUrl,
      },
      tags: [{ name: "type", value: "newsletter-welcome" }],
      related_type: "newsletter",
      related_id: subscriber.id,
    })
  } catch (err: any) {
    logger.warn(`Newsletter sync/welcome email failed: ${err.message}`)
  }

  return res.status(201).json({ subscriber })
}
