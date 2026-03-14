import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"

export default async function contactSubmittedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")
  const contactService = container.resolve("contactModuleService") as any

  try {
    const submission = await contactService.retrieveContactSubmission(data.id)

    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL || "ORYN Peptides <info@orynlabs.com>"
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "admin@oryn.com"

    if (!resendApiKey) {
      logger.warn(`RESEND_API_KEY not set - skipping email for contact submission ${data.id}`)
      return
    }

    // Notify admin
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [adminEmail],
        subject: `[ORYN] New Contact: ${submission.inquiry_type} from ${submission.first_name} ${submission.last_name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${submission.first_name} ${submission.last_name}</p>
          <p><strong>Email:</strong> ${submission.email}</p>
          <p><strong>Organization:</strong> ${submission.organization || "N/A"}</p>
          <p><strong>Type:</strong> ${submission.inquiry_type}</p>
          <hr/>
          <p>${submission.message}</p>
        `,
      }),
    })

    // Auto-reply to customer
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [submission.email],
        subject: "Thank you for contacting ORYN Peptides",
        html: `
          <h2>Thank you, ${submission.first_name}!</h2>
          <p>We have received your inquiry and will get back to you within 24-48 hours.</p>
          <p>Best regards,<br/>The ORYN Peptides Team</p>
        `,
      }),
    })

    logger.info(`Contact notification emails sent for submission ${data.id}`)
  } catch (error) {
    logger.error(`Failed to process contact submission: ${error}`)
  }
}

export const config: SubscriberConfig = {
  event: "contact.submitted",
}
