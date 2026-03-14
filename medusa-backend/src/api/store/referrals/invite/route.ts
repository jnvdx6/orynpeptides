import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"

export async function POST(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const customerId = req.auth_context?.actor_id
  if (!customerId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const { emails, message } = req.body as {
    emails: string[]
    message?: string
  }

  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ error: "At least one email is required" })
  }

  if (emails.length > 10) {
    return res.status(400).json({ error: "Maximum 10 invitations at a time" })
  }

  const referralService = req.scope.resolve("referralModuleService") as any
  const emailService = req.scope.resolve("emailModuleService") as any

  // Get customer's referral code
  const ownLinks = await referralService.listReferralLinks({
    referrer_customer_id: customerId,
    level: 0,
  })

  if (!ownLinks.length) {
    return res.status(404).json({ error: "No referral code found" })
  }

  const referralCode = ownLinks[0].referral_code

  // Get customer name
  const query = req.scope.resolve("query")
  const { data: customers } = await query.graph({
    entity: "customer",
    fields: ["first_name", "last_name"],
    filters: { id: customerId },
  })
  const customer = customers?.[0]
  const referrerName = customer
    ? `${customer.first_name || ""} ${customer.last_name || ""}`.trim()
    : "An ORYN customer"

  const sent: string[] = []
  const failed: string[] = []

  for (const email of emails) {
    try {
      await emailService.sendTemplatedEmail("referral-invitation", {
        to: email,
        variables: {
          referrer_name: referrerName,
          referral_code: referralCode,
          message: message || "Check out ORYN Peptides - they have amazing precision delivery systems!",
        },
        tags: [{ name: "type", value: "referral-invitation" }],
        related_type: "referral",
        related_id: ownLinks[0].id,
      })
      sent.push(email)
    } catch {
      failed.push(email)
    }
  }

  return res.json({
    sent,
    failed,
    referral_code: referralCode,
  })
}
