import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"

export default async function customerCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")

  try {
    const query = container.resolve("query")
    const { data: customers } = await query.graph({
      entity: "customer",
      fields: ["id", "email", "first_name", "last_name", "metadata"],
      filters: { id: data.id },
    })

    const customer = customers?.[0]
    if (!customer) return

    const referralService = container.resolve("referralModuleService") as any

    // Generate a referral code
    const referralCode = await referralService.generateReferralCode()

    // Create own referral link (level 0)
    await referralService.createReferralLinks({
      referrer_customer_id: customer.id,
      referred_customer_id: customer.id,
      referral_code: referralCode,
      level: 0,
      clicks: 0,
      status: "active",
    })

    // If referred, create referral chain
    const referredByCode = (customer.metadata as any)?.referred_by_code as string | undefined
    if (referredByCode) {
      const referrerLinks = await referralService.listReferralLinks({
        referral_code: referredByCode,
        level: 0,
      })

      if (referrerLinks.length > 0) {
        const referrerId = referrerLinks[0].referrer_customer_id

        await referralService.createReferralLinks({
          referrer_customer_id: referrerId,
          referred_customer_id: customer.id,
          referral_code: referredByCode,
          level: 1,
          clicks: 0,
          status: "active",
        })

        const chain = await referralService.getReferralChain(referrerId)
        for (let i = 0; i < chain.length && i < 4; i++) {
          await referralService.createReferralLinks({
            referrer_customer_id: chain[i],
            referred_customer_id: customer.id,
            referral_code: referredByCode,
            level: i + 2,
            clicks: 0,
            status: "active",
          })
        }

        logger.info(`Referral chain created for ${customer.id} via ${referredByCode}`)
      }
    }

    // Build branded welcome email HTML
    const firstName = customer.first_name || "there"
    const welcomeHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Welcome to ORYN</title></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
    <tr><td align="center" style="padding:20px 0;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr><td style="background-color:#FF6A1A;padding:32px 40px;text-align:center;">
          <h1 style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:2px;">ORYN</h1>
          <p style="margin:8px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.9);letter-spacing:1px;text-transform:uppercase;">Peptide Labs</p>
        </td></tr>

        <!-- Welcome Banner -->
        <tr><td style="background-color:#1a1a1a;padding:24px 40px;text-align:center;">
          <h2 style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:22px;font-weight:600;color:#ffffff;">Welcome to ORYN, ${firstName}!</h2>
          <p style="margin:8px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#999999;">Your account is ready. Let's get started.</p>
        </td></tr>

        <!-- Greeting -->
        <tr><td style="padding:32px 40px 16px;">
          <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;color:#666666;line-height:1.7;">
            Thank you for creating an account with ORYN Peptide Labs. You now have access to our full range of premium research peptides, priority support, and exclusive member benefits.
          </p>
        </td></tr>

        <!-- Referral Code Box -->
        <tr><td style="padding:8px 40px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a1a;border-radius:8px;border:2px solid #FF6A1A;">
            <tr><td style="padding:24px;text-align:center;">
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#FF6A1A;text-transform:uppercase;letter-spacing:2px;">Your Personal Referral Code</p>
              <p style="margin:12px 0;font-family:'Courier New',monospace;font-size:32px;font-weight:700;color:#ffffff;letter-spacing:4px;">${referralCode}</p>
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#999999;line-height:1.6;">
                Share your code with friends and earn <strong style="color:#FF6A1A;">5% commission</strong> on every purchase they make.
              </p>
            </td></tr>
          </table>
        </td></tr>

        <!-- How It Works -->
        <tr><td style="padding:0 40px 24px;">
          <p style="margin:0 0 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:700;color:#1a1a1a;">How referrals work:</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:8px 0;vertical-align:top;width:24px;">
                <span style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:700;color:#FF6A1A;">1.</span>
              </td>
              <td style="padding:8px 0 8px 8px;">
                <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#666666;">Share your unique code with friends and colleagues</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;vertical-align:top;width:24px;">
                <span style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:700;color:#FF6A1A;">2.</span>
              </td>
              <td style="padding:8px 0 8px 8px;">
                <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#666666;">They sign up using your code at checkout</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;vertical-align:top;width:24px;">
                <span style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:700;color:#FF6A1A;">3.</span>
              </td>
              <td style="padding:8px 0 8px 8px;">
                <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#666666;">You earn 5% on every purchase they make - automatically!</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- CTA Button -->
        <tr><td style="padding:0 40px 32px;text-align:center;">
          <a href="https://orynxpeptides.com/en/products" style="display:inline-block;background-color:#FF6A1A;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:6px;letter-spacing:0.5px;">Browse Our Peptides</a>
        </td></tr>

        <!-- Account Benefits -->
        <tr><td style="padding:0 40px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;border-radius:6px;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 16px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:700;color:#1a1a1a;">Your Account Benefits</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;">
                    <span style="color:#FF6A1A;font-size:16px;padding-right:8px;">&#10003;</span>
                    <span style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#666666;">Order tracking and history</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;">
                    <span style="color:#FF6A1A;font-size:16px;padding-right:8px;">&#10003;</span>
                    <span style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#666666;">Priority customer support</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;">
                    <span style="color:#FF6A1A;font-size:16px;padding-right:8px;">&#10003;</span>
                    <span style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#666666;">Exclusive offers and early access</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;">
                    <span style="color:#FF6A1A;font-size:16px;padding-right:8px;">&#10003;</span>
                    <span style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#666666;">Referral earnings dashboard</span>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
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
            You received this email because you created an account at orynxpeptides.com.<br/>
            &copy; ${new Date().getFullYear()} ORYN Peptide Labs. All rights reserved.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    // Send welcome email via Email module
    let emailService: any
    try {
      emailService = container.resolve("emailModuleService")
    } catch {
      // Email module not available
    }

    if (emailService) {
      try {
        await emailService.sendTemplatedEmail("welcome", {
          to: customer.email,
          variables: {
            first_name: firstName,
            referral_code: referralCode,
          },
          tags: [{ name: "type", value: "welcome" }],
          related_type: "customer",
          related_id: customer.id,
        })
      } catch (err: any) {
        logger.warn(`Welcome template failed, using fallback: ${err.message}`)
        await emailService.sendEmail({
          to: customer.email,
          subject: "Welcome to ORYN Peptide Labs!",
          html: welcomeHtml,
          related_type: "customer",
          related_id: customer.id,
        })
      }
    } else {
      const resendApiKey = process.env.RESEND_API_KEY
      if (resendApiKey) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || "ORYN Peptides <info@orynxpeptides.com>",
            to: [customer.email],
            subject: "Welcome to ORYN Peptide Labs!",
            html: welcomeHtml,
          }),
        })
      }
    }

    // Sync to Resend Contacts
    if (emailService) {
      try {
        await emailService.syncContactToResend(
          customer.email,
          customer.first_name,
          customer.last_name
        )
      } catch {
        // Non-critical
      }
    }

    logger.info(`Customer ${data.id} processed: referral code ${referralCode}`)
  } catch (error) {
    logger.error(`Failed to handle customer.created: ${error}`)
  }
}

export const config: SubscriberConfig = {
  event: "customer.created",
}
