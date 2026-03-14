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
      logger.warn(`Order ${data.id} not found`)
      return
    }

    const currency = (order.currency_code || "EUR").toUpperCase()

    // Build items HTML
    let itemsHtml = ""
    if (order.items && Array.isArray(order.items)) {
      itemsHtml = order.items
        .map(
          (item: any) =>
            `<div style="padding:8px 0;border-bottom:1px solid #333">
              <span style="color:#e0e0e0">${item.title || "Product"}</span>
              <span style="float:right;color:#FF6A1A">${item.quantity || 1}x</span>
            </div>`
        )
        .join("")
    }

    const customerName = order.shipping_address
      ? `${order.shipping_address.first_name || ""} ${order.shipping_address.last_name || ""}`.trim()
      : order.email

    let emailService: any
    try {
      emailService = container.resolve("emailModuleService")
    } catch {
      // Email module not available
    }

    if (emailService) {
      // Order confirmation to customer
      try {
        await emailService.sendTemplatedEmail("order-confirmation", {
          to: order.email,
          variables: {
            display_id: String(order.display_id),
            total: String(order.total),
            currency,
            items_html: itemsHtml || "<p>See your order details in your account.</p>",
            shipping_name: customerName,
            shipping_address: order.shipping_address
              ? `${order.shipping_address.address_1 || ""}, ${order.shipping_address.city || ""}`
              : "",
          },
          tags: [
            { name: "type", value: "order-confirmation" },
            { name: "order_id", value: order.id },
          ],
          related_type: "order",
          related_id: order.id,
        })
      } catch (err: any) {
        logger.warn(`Order template failed, using fallback: ${err.message}`)
        await emailService.sendEmail({
          to: order.email,
          subject: `ORYN Peptides - Order Confirmation #${order.display_id}`,
          html: `<h2>Order Confirmed!</h2><p>Order #${order.display_id}</p><p>Total: ${order.total} ${currency}</p>`,
          related_type: "order",
          related_id: order.id,
        })
      }

      // Admin notification
      try {
        await emailService.sendTemplatedEmail("order-admin-alert", {
          to: process.env.ADMIN_NOTIFICATION_EMAIL || "admin@oryn.com",
          variables: {
            display_id: String(order.display_id),
            email: order.email,
            total: String(order.total),
            currency,
            items_html: itemsHtml,
            customer_name: customerName,
          },
          tags: [
            { name: "type", value: "order-admin-alert" },
            { name: "order_id", value: order.id },
          ],
          related_type: "order",
          related_id: order.id,
        })
      } catch (err: any) {
        logger.warn(`Order admin template failed: ${err.message}`)
      }
    } else {
      // Fallback: direct Resend
      const resendApiKey = process.env.RESEND_API_KEY
      if (resendApiKey) {
        const fromEmail = process.env.RESEND_FROM_EMAIL || "ORYN Peptides <info@orynxpeptides.com>"
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: fromEmail,
            to: [order.email],
            subject: `ORYN Peptides - Order #${order.display_id}`,
            html: `<h2>Order Confirmed!</h2><p>#${order.display_id} - ${order.total} ${currency}</p>`,
          }),
        })
      }
    }

    logger.info(`Order emails sent for ${data.id}`)

    // Generate referral commissions
    if (order.customer_id) {
      try {
        const referralService = container.resolve("referralModuleService") as any
        const commissions = await referralService.generateCommissions(
          order.id,
          order.customer_id,
          order.total,
          order.currency_code || "eur"
        )

        // Notify commission beneficiaries
        if (emailService && commissions && commissions.length > 0) {
          for (const commission of commissions) {
            try {
              // Get beneficiary email
              const { data: beneficiaries } = await query.graph({
                entity: "customer",
                fields: ["email", "first_name"],
                filters: { id: commission.beneficiary_customer_id },
              })
              const beneficiary = beneficiaries?.[0]
              if (beneficiary) {
                await emailService.sendTemplatedEmail("commission-notification", {
                  to: beneficiary.email,
                  variables: {
                    beneficiary_name: beneficiary.first_name || "there",
                    amount: String(commission.commission_amount),
                    currency,
                    level: String(commission.level),
                    rate: String(Math.round(commission.rate * 100)),
                    order_display_id: String(order.display_id),
                  },
                  tags: [{ name: "type", value: "commission-notification" }],
                  related_type: "commission",
                  related_id: commission.id,
                })
              }
            } catch {
              // Non-critical
            }
          }
        }

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
