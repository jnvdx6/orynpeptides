import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"

export default async function contactSubmittedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")
  const contactService = container.resolve("contactModuleService") as any

  try {
    const submission = await contactService.retrieveContactSubmission(data.id)

    const priority = submission.priority || "medium"
    const priorityColor = priority === "high" ? "#e53e3e" : priority === "medium" ? "#FF6A1A" : "#38a169"
    const priorityLabel = priority.charAt(0).toUpperCase() + priority.slice(1)

    // Response time based on inquiry type
    const responseTimeMap: Record<string, string> = {
      "general": "24-48 hours",
      "wholesale": "12-24 hours",
      "technical": "24 hours",
      "partnership": "24-48 hours",
      "support": "12-24 hours",
      "returns": "24 hours",
    }
    const expectedResponseTime = responseTimeMap[submission.inquiry_type] || "24-48 hours"

    // Admin notification HTML
    const adminNotificationHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>New Contact Submission</title></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
    <tr><td align="center" style="padding:20px 0;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr><td style="background-color:#1a1a1a;padding:24px 40px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <h1 style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:20px;font-weight:700;color:#FF6A1A;letter-spacing:2px;">ORYN</h1>
                <p style="margin:4px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;color:#666666;letter-spacing:1px;text-transform:uppercase;">Admin Notification</p>
              </td>
              <td style="text-align:right;vertical-align:middle;">
                <span style="display:inline-block;background-color:${priorityColor};color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:700;padding:4px 12px;border-radius:12px;text-transform:uppercase;letter-spacing:1px;">${priorityLabel} Priority</span>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Title -->
        <tr><td style="padding:24px 40px 16px;">
          <h2 style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:20px;font-weight:700;color:#1a1a1a;">New Contact Submission</h2>
          <p style="margin:8px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#999999;">Received on ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} at ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>
        </td></tr>

        <!-- Details Table -->
        <tr><td style="padding:8px 40px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;border-radius:6px;overflow:hidden;">
            <tr>
              <td style="padding:12px 16px;background-color:#fafafa;border-bottom:1px solid #e5e5e5;width:140px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;">Name</td>
              <td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#333333;">${submission.first_name} ${submission.last_name}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;background-color:#fafafa;border-bottom:1px solid #e5e5e5;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;">Email</td>
              <td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#333333;"><a href="mailto:${submission.email}" style="color:#FF6A1A;text-decoration:none;">${submission.email}</a></td>
            </tr>
            <tr>
              <td style="padding:12px 16px;background-color:#fafafa;border-bottom:1px solid #e5e5e5;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;">Organization</td>
              <td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#333333;">${submission.organization || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;background-color:#fafafa;border-bottom:1px solid #e5e5e5;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;">Inquiry Type</td>
              <td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#333333;">${submission.inquiry_type}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;background-color:#fafafa;border-bottom:1px solid #e5e5e5;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;">Priority</td>
              <td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:${priorityColor};font-weight:600;">${priorityLabel}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;background-color:#fafafa;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;">Submission ID</td>
              <td style="padding:12px 16px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#999999;font-family:'Courier New',monospace;">${submission.id}</td>
            </tr>
          </table>
        </td></tr>

        <!-- Message -->
        <tr><td style="padding:0 40px 24px;">
          <p style="margin:0 0 8px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;">Message</p>
          <div style="padding:16px 20px;background-color:#f5f5f5;border-radius:6px;border-left:4px solid #FF6A1A;">
            <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#333333;line-height:1.7;white-space:pre-wrap;">${submission.message}</p>
          </div>
        </td></tr>

        <!-- Action Buttons -->
        <tr><td style="padding:0 40px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:12px;">
                <a href="mailto:${submission.email}?subject=Re: Your ${submission.inquiry_type} inquiry - ORYN Peptide Labs" style="display:inline-block;background-color:#FF6A1A;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:6px;">Reply to Customer</a>
              </td>
              <td>
                <a href="https://medusa.skyodoo.com/app/contacts" style="display:inline-block;background-color:#1a1a1a;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:6px;">View in Admin</a>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:16px 40px;background-color:#fafafa;border-top:1px solid #e5e5e5;">
          <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;color:#cccccc;text-align:center;">
            ORYN Peptide Labs - Admin Notification System
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    // Customer auto-reply HTML
    const customerAutoReplyHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Thank you for contacting ORYN</title></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
    <tr><td align="center" style="padding:20px 0;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr><td style="background-color:#FF6A1A;padding:32px 40px;text-align:center;">
          <h1 style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:2px;">ORYN</h1>
          <p style="margin:8px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.9);letter-spacing:1px;text-transform:uppercase;">Peptide Labs</p>
        </td></tr>

        <!-- Thank You Banner -->
        <tr><td style="background-color:#1a1a1a;padding:24px 40px;text-align:center;">
          <h2 style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:20px;font-weight:600;color:#ffffff;">Thank You for Contacting Us</h2>
          <p style="margin:8px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#999999;">We've received your message</p>
        </td></tr>

        <!-- Greeting -->
        <tr><td style="padding:32px 40px 16px;">
          <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;color:#333333;line-height:1.6;">
            Hi ${submission.first_name},
          </p>
          <p style="margin:12px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;color:#666666;line-height:1.7;">
            Thank you for reaching out to ORYN Peptide Labs. We have received your <strong style="color:#1a1a1a;">${submission.inquiry_type}</strong> inquiry and our team is reviewing it now.
          </p>
        </td></tr>

        <!-- Submission Summary -->
        <tr><td style="padding:8px 40px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;border-radius:6px;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;">Your Submission Summary</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#999999;width:120px;">Inquiry Type:</td>
                  <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#333333;font-weight:600;">${submission.inquiry_type}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#999999;">Reference ID:</td>
                  <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#333333;font-family:'Courier New',monospace;">${submission.id.slice(0, 8)}...</td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- Expected Response Time -->
        <tr><td style="padding:0 40px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:2px solid #FF6A1A;border-radius:6px;">
            <tr><td style="padding:20px 24px;text-align:center;">
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#FF6A1A;text-transform:uppercase;letter-spacing:1px;">Expected Response Time</p>
              <p style="margin:8px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:24px;font-weight:700;color:#1a1a1a;">${expectedResponseTime}</p>
              <p style="margin:4px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:#999999;">Based on your inquiry type</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- FAQ Section -->
        <tr><td style="padding:0 40px 24px;">
          <p style="margin:0 0 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:700;color:#1a1a1a;">In the meantime, you might find these helpful:</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:8px 0;">
                <a href="https://orynxpeptides.com/en/faq" style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#FF6A1A;text-decoration:none;">Frequently Asked Questions &rarr;</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;">
                <a href="https://orynxpeptides.com/en/products" style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#FF6A1A;text-decoration:none;">Browse Our Products &rarr;</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;">
                <a href="https://orynxpeptides.com/en/why-oryn" style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#FF6A1A;text-decoration:none;">Why Choose ORYN? &rarr;</a>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Note -->
        <tr><td style="padding:0 40px 32px;">
          <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#999999;line-height:1.6;font-style:italic;">
            Please do not reply to this automated email. Our team will respond to your inquiry directly from our support address.
          </p>
        </td></tr>

        <!-- Divider -->
        <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e5e5;margin:0;"/></td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 40px 32px;text-align:center;">
          <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#999999;">ORYN Peptide Labs</p>
          <p style="margin:8px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:#cccccc;">
            <a href="https://orynxpeptides.com/en/privacy-policy" style="color:#999999;text-decoration:underline;">Privacy Policy</a>
            &nbsp;&middot;&nbsp;
            <a href="https://orynxpeptides.com/en/terms" style="color:#999999;text-decoration:underline;">Terms &amp; Conditions</a>
            &nbsp;&middot;&nbsp;
            <a href="https://orynxpeptides.com/en/contact" style="color:#999999;text-decoration:underline;">Contact Us</a>
          </p>
          <p style="margin:12px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;color:#cccccc;">
            You received this email because you submitted a contact form at orynxpeptides.com.<br/>
            &copy; ${new Date().getFullYear()} ORYN Peptide Labs. All rights reserved.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

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
          html: adminNotificationHtml,
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
          subject: "Thank you for contacting ORYN Peptide Labs",
          html: customerAutoReplyHtml,
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
          html: adminNotificationHtml,
        }),
      })

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromEmail,
          to: [submission.email],
          subject: "Thank you for contacting ORYN Peptide Labs",
          html: customerAutoReplyHtml,
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
