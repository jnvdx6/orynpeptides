import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")

  try {
    const query = container.resolve("query")
    const { data: orders } = await query.graph({
      entity: "order",
      fields: [
        "id", "display_id", "email", "total", "currency_code",
        "items.*", "shipping_address.*", "customer_id",
      ],
      filters: { id: data.id },
    })

    const order = orders?.[0]
    if (!order) {
      logger.warn(`Order ${data.id} not found for notification`)
      return
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL || "ORYN Peptides <info@orynlabs.com>"
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "admin@oryn.com"

    if (resendApiKey) {
      // Send order confirmation to customer
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [order.email],
          subject: `ORYN Peptides - Order Confirmation #${order.display_id}`,
          html: `
            <h2>Order Confirmed!</h2>
            <p>Thank you for your order <strong>#${order.display_id}</strong>.</p>
            <p><strong>Total:</strong> ${order.total} ${(order.currency_code || "EUR").toUpperCase()}</p>
            <p>We'll send you a shipping confirmation once your order is on its way.</p>
            <p>Best regards,<br/>The ORYN Peptides Team</p>
          `,
        }),
      })

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
          subject: `[ORYN] New Order #${order.display_id} - ${order.total} ${(order.currency_code || "EUR").toUpperCase()}`,
          html: `
            <h2>New Order Received</h2>
            <p><strong>Order:</strong> #${order.display_id}</p>
            <p><strong>Customer:</strong> ${order.email}</p>
            <p><strong>Total:</strong> ${order.total} ${(order.currency_code || "EUR").toUpperCase()}</p>
          `,
        }),
      })

      logger.info(`Order confirmation emails sent for order ${data.id}`)
    }

    // Generate referral commissions
    if (order.customer_id) {
      try {
        const referralService = container.resolve("referralModuleService") as any
        await referralService.generateCommissions(
          order.id,
          order.customer_id,
          order.total,
          order.currency_code || "eur"
        )
        logger.info(`Commissions generated for order ${order.id}`)
      } catch (refErr) {
        logger.warn(`Commission generation failed: ${refErr}`)
      }
    }
  } catch (error) {
    logger.error(`Failed to handle order.placed: ${error}`)
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
