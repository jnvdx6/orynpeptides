import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"
import { PostStoreContactSchema } from "./validators"

type PostBody = z.infer<typeof PostStoreContactSchema>

export async function POST(
  req: MedusaRequest<PostBody>,
  res: MedusaResponse
) {
  const contactService = req.scope.resolve("contactModuleService") as any
  const eventBus = req.scope.resolve("event_bus")

  const priority = req.validatedBody.priority || "medium"
  const responseDueAt = contactService.calculateResponseDueAt(priority)

  const submission = await contactService.createContactSubmissions({
    first_name: req.validatedBody.first_name,
    last_name: req.validatedBody.last_name,
    email: req.validatedBody.email,
    phone: req.validatedBody.phone || null,
    organization: req.validatedBody.organization || null,
    inquiry_type: req.validatedBody.inquiry_type,
    message: req.validatedBody.message,
    priority,
    status: "new",
    source: req.validatedBody.source || "website",
    response_due_at: responseDueAt,
    reply_count: 0,
  })

  await eventBus.emit({
    name: "contact.submitted",
    data: { id: submission.id },
  })

  return res.status(201).json({ submission })
}
