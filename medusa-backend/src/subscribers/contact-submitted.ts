import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"

export default async function contactSubmittedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")
  const contactService = container.resolve("contactModuleService") as any

  try {
    const submission = await contactService.retrieveContactSubmission(data.id)

    let emailService: any
    try {
      emailService = container.resolve("emailModuleService")
    } catch {
      logger.warn("Email module not available - using direct Resend API")
    }

    if (emailService) {
      // Use centralized Email module with branded templates
      try {
        await emailService.sendTemplatedEmail("contact-admin-alert", {
          to: process.env.ADMIN_NOTIFICATION_EMAIL || "admin@oryn.com",
          variables: {
            first_name: submission.first_name,
            last_name: submission.last_name,
            email: submission.email,
            organization: submission.organization || "N/A",
            inquiry_type: submission.inquiry_type,
            message: submission.message,
            priority: submission.priority || "medium",
            submission_id: submission.id,
          },
          tags: [
            { name: "type", value: "contact-admin-alert" },
            { name: "priority", value: submission.priority || "medium" },
          ],
          related_type: "contact",
          related_id: submission.id,
        })
      } catch (err: any) {
        logger.warn(`Admin alert template failed, using fallback: ${err.message}`)
        await emailService.sendEmail({
          to: process.env.ADMIN_NOTIFICATION_EMAIL || "admin@oryn.com",
          subject: `[ORYN] New ${submission.inquiry_type} from ${submission.first_name} ${submission.last_name}`,
          html: `<h2>New Contact Submission</h2>
<p><strong>Name:</strong> ${submission.first_name} ${submission.last_name}</p>
<p><strong>Email:</strong> ${submission.email}</p>
<p><strong>Organization:</strong> ${submission.organization || "N/A"}</p>
<p><strong>Priority:</strong> ${submission.priority || "medium"}</p>
<p><strong>Type:</strong> ${submission.inquiry_type}</p>
<hr/><p>${submission.message}</p>`,
          related_type: "contact",
          related_id: submission.id,
        })
      }

      // Auto-reply to customer
      try {
        await emailService.sendTemplatedEmail("contact-auto-reply", {
          to: submission.email,
          variables: {
            first_name: submission.first_name,
            inquiry_type: submission.inquiry_type,
          },
          reply_to: process.env.ADMIN_NOTIFICATION_EMAIL || "admin@oryn.com",
          tags: [{ name: "type", value: "contact-auto-reply" }],
          related_type: "contact",
          related_id: submission.id,
        })
      } catch (err: any) {
        logger.warn(`Auto-reply template failed, using fallback: ${err.message}`)
        await emailService.sendEmail({
          to: submission.email,
          subject: "Thank you for contacting ORYN Peptides",
          html: `<h2>Thank you, ${submission.first_name}!</h2>
<p>We have received your ${submission.inquiry_type} inquiry and will respond within 24 hours.</p>
<p>Best regards,<br/>The ORYN Peptides Team</p>`,
          related_type: "contact",
          related_id: submission.id,
        })
      }
    } else {
      // Fallback: direct Resend API (original behavior)
      const resendApiKey = process.env.RESEND_API_KEY
      if (!resendApiKey) {
        logger.warn(`RESEND_API_KEY not set - skipping emails for submission ${data.id}`)
        return
      }

      const fromEmail = process.env.RESEND_FROM_EMAIL || "ORYN Peptides <info@orynxpeptides.com>"
      const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "admin@oryn.com"

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromEmail,
          to: [adminEmail],
          subject: `[ORYN] New Contact: ${submission.inquiry_type} from ${submission.first_name} ${submission.last_name}`,
          html: `<h2>New Contact</h2><p>${submission.first_name} ${submission.last_name} (${submission.email})</p><p>${submission.message}</p>`,
        }),
      })

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromEmail,
          to: [submission.email],
          subject: "Thank you for contacting ORYN Peptides",
          html: `<h2>Thank you, ${submission.first_name}!</h2><p>We'll respond within 24-48 hours.</p>`,
        }),
      })
    }

    logger.info(`Contact notification emails sent for submission ${data.id}`)
  } catch (error) {
    logger.error(`Failed to process contact submission: ${error}`)
  }
}

export const config: SubscriberConfig = {
  event: "contact.submitted",
}
