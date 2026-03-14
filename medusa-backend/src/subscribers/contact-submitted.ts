import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { CONTACT_MODULE } from "../modules/contact"

export default async function contactSubmittedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")
  const contactService = container.resolve(CONTACT_MODULE)

  try {
    const submission = await contactService.retrieveContactSubmission(data.id)

    // Try SendGrid if available, otherwise just log
    try {
      const sgMail = require("@sendgrid/mail")
      if (process.env.SENDGRID_API_KEY) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)

        // Notify admin
        await sgMail.send({
          to: process.env.ADMIN_NOTIFICATION_EMAIL || "admin@oryn.com",
          from: process.env.SENDGRID_FROM_EMAIL || "info@orynlabs.com",
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
        })

        // Auto-reply to customer
        await sgMail.send({
          to: submission.email,
          from: process.env.SENDGRID_FROM_EMAIL || "info@orynlabs.com",
          subject: "Thank you for contacting ORYN Peptides",
          html: `
            <h2>Thank you, ${submission.first_name}!</h2>
            <p>We have received your inquiry and will get back to you within 24-48 hours.</p>
            <p>Best regards,<br/>The ORYN Peptides Team</p>
          `,
        })

        logger.info(`Contact notification emails sent for submission ${data.id}`)
      } else {
        logger.warn(`SENDGRID_API_KEY not set - skipping email for contact submission ${data.id}`)
      }
    } catch (emailErr) {
      logger.warn(`Email sending failed (SendGrid may not be configured): ${emailErr}`)
    }

    logger.info(`Contact form submission ${data.id} processed successfully`)
  } catch (error) {
    logger.error(`Failed to process contact submission: ${error}`)
  }
}

export const config: SubscriberConfig = {
  event: "contact.submitted",
}
