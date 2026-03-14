import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const contactService = req.scope.resolve("contactModuleService") as any
  const emailService = req.scope.resolve("emailModuleService") as any
  const logger = req.scope.resolve("logger")

  const submissionId = req.params.id
  const { message, sender_name } = req.body as {
    message: string
    sender_name?: string
  }

  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: "Message is required" })
  }

  // Get the submission
  const submission = await contactService.retrieveContactSubmission(submissionId)

  // Send reply email via Email module
  let emailLogId: string | null = null
  try {
    const emailLog = await emailService.sendTemplatedEmail(
      "contact-admin-reply",
      {
        to: submission.email,
        variables: {
          first_name: submission.first_name,
          reply_message: message,
          original_inquiry_type: submission.inquiry_type,
        },
        reply_to: process.env.ADMIN_NOTIFICATION_EMAIL || "admin@oryn.com",
        tags: [{ name: "type", value: "contact-reply" }],
        related_type: "contact",
        related_id: submissionId,
      }
    )
    emailLogId = emailLog.id
  } catch (error: any) {
    logger.error(`Failed to send reply email: ${error.message}`)
  }

  // Save reply in conversation thread
  const reply = await contactService.addReply(submissionId, {
    sender_type: "admin",
    sender_name: sender_name || "ORYN Support",
    sender_email: process.env.ADMIN_NOTIFICATION_EMAIL || "admin@oryn.com",
    message,
    email_log_id: emailLogId,
  })

  return res.json({ reply, email_sent: !!emailLogId })
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const contactService = req.scope.resolve("contactModuleService") as any
  const replies = await contactService.getConversation(req.params.id)
  return res.json({ replies })
}
