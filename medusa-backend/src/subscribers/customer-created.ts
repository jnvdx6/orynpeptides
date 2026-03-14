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
            first_name: customer.first_name || "there",
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
          subject: "Welcome to ORYN Peptides!",
          html: `<h2>Welcome, ${customer.first_name || ""}!</h2>
<p>Your account is ready. Your referral code is: <strong>${referralCode}</strong></p>
<p>Share it to earn commissions!</p>`,
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
            subject: "Welcome to ORYN Peptides!",
            html: `<h2>Welcome, ${customer.first_name || ""}!</h2><p>Your referral code: <strong>${referralCode}</strong></p>`,
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
