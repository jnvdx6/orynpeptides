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

    // Generate a referral code for this new customer
    const referralCode = await referralService.generateReferralCode()

    // Create the new customer's own referral link (level 0 = own code)
    await referralService.createReferralLinks({
      referrer_customer_id: customer.id,
      referred_customer_id: customer.id,
      referral_code: referralCode,
      level: 0,
    })

    // If customer was referred, create referral chain
    const referredByCode = (customer.metadata as any)?.referred_by_code as string | undefined
    if (referredByCode) {
      const referrerLinks = await referralService.listReferralLinks({
        referral_code: referredByCode,
        level: 0,
      })

      if (referrerLinks.length > 0) {
        const referrerId = referrerLinks[0].referrer_customer_id

        // Create direct referral link (level 1)
        await referralService.createReferralLinks({
          referrer_customer_id: referrerId,
          referred_customer_id: customer.id,
          referral_code: referredByCode,
          level: 1,
        })

        // Build multi-level chain (levels 2-5)
        const chain = await referralService.getReferralChain(referrerId)
        for (let i = 0; i < chain.length && i < 4; i++) {
          await referralService.createReferralLinks({
            referrer_customer_id: chain[i],
            referred_customer_id: customer.id,
            referral_code: referredByCode,
            level: i + 2,
          })
        }

        logger.info(`Referral chain created for customer ${customer.id} referred by code ${referredByCode}`)
      }
    }

    // Send welcome email via Resend
    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL || "ORYN Peptides <info@orynlabs.com>"

    if (resendApiKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [customer.email],
          subject: "Welcome to ORYN Peptides!",
          html: `
            <h2>Welcome, ${customer.first_name || ""}!</h2>
            <p>Your account has been created successfully.</p>
            <p>Your personal referral code is: <strong>${referralCode}</strong></p>
            <p>Share it with friends and earn commissions on their purchases!</p>
            <p>Best regards,<br/>The ORYN Peptides Team</p>
          `,
        }),
      })

      logger.info(`Welcome email sent to customer ${customer.id}`)
    }

    logger.info(`Customer ${data.id} processed: referral code ${referralCode} generated`)
  } catch (error) {
    logger.error(`Failed to handle customer.created: ${error}`)
  }
}

export const config: SubscriberConfig = {
  event: "customer.created",
}
