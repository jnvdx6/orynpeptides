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
    const currencySymbol = currency === "EUR" ? "\u20AC" : currency === "USD" ? "$" : currency === "GBP" ? "\u00A3" : `${currency} `

    // Build items HTML for the order table
    let itemsHtml = ""
    let subtotal = 0
    if (order.items && Array.isArray(order.items)) {
      itemsHtml = order.items
        .map((item: any) => {
          const unitPrice = item.unit_price || 0
          const qty = item.quantity || 1
          const lineTotal = unitPrice * qty
          subtotal += lineTotal
          return `<tr>
            <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#333333;">
              ${item.title || "Product"}
            </td>
            <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#666666;text-align:center;">
              ${qty}
            </td>
            <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#333333;text-align:right;">
              ${currencySymbol}${Number(lineTotal).toFixed(2)}
            </td>
          </tr>`
        })
        .join("")
    }

    const customerName = order.shipping_address
      ? `${order.shipping_address.first_name || ""} ${order.shipping_address.last_name || ""}`.trim()
      : order.email

    const shippingAddr = order.shipping_address
    const shippingAddressHtml = shippingAddr
      ? `${shippingAddr.first_name || ""} ${shippingAddr.last_name || ""}<br/>
         ${shippingAddr.address_1 || ""}${shippingAddr.address_2 ? ", " + shippingAddr.address_2 : ""}<br/>
         ${shippingAddr.postal_code || ""} ${shippingAddr.city || ""}<br/>
         ${shippingAddr.province ? shippingAddr.province + ", " : ""}${shippingAddr.country_code ? shippingAddr.country_code.toUpperCase() : ""}`
      : "Not provided"

    const orderTotal = Number(order.total || 0).toFixed(2)
    const shippingAmount = Number((order as any).shipping_total || 0).toFixed(2)
    const discountAmount = Number((order as any).discount_total || 0).toFixed(2)
    const hasDiscount = Number(discountAmount) > 0

    // Full branded HTML email
    const orderConfirmationHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Order Confirmed</title></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
    <tr><td align="center" style="padding:20px 0;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr><td style="background-color:#FF6A1A;padding:32px 40px;text-align:center;">
          <h1 style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:2px;">ORYN</h1>
          <p style="margin:8px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.9);letter-spacing:1px;text-transform:uppercase;">Peptide Labs</p>
        </td></tr>

        <!-- Order Confirmed Banner -->
        <tr><td style="background-color:#1a1a1a;padding:20px 40px;text-align:center;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr>
              <td style="padding-right:12px;vertical-align:middle;"><span style="font-size:24px;color:#FF6A1A;">&#10003;</span></td>
              <td style="vertical-align:middle;"><h2 style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:20px;font-weight:600;color:#ffffff;">Order Confirmed</h2></td>
            </tr>
          </table>
          <p style="margin:8px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#999999;">Order #${order.display_id}</p>
        </td></tr>

        <!-- Greeting -->
        <tr><td style="padding:32px 40px 16px;">
          <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;color:#333333;line-height:1.6;">
            Hi ${customerName},
          </p>
          <p style="margin:12px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;color:#666666;line-height:1.6;">
            Thank you for your order! We've received your purchase and are preparing it for shipment. Here's a summary of your order:
          </p>
        </td></tr>

        <!-- Items Table -->
        <tr><td style="padding:8px 40px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:12px 0;border-bottom:2px solid #1a1a1a;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;">Product</td>
              <td style="padding:12px 0;border-bottom:2px solid #1a1a1a;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;text-align:center;">Qty</td>
              <td style="padding:12px 0;border-bottom:2px solid #1a1a1a;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;text-align:right;">Price</td>
            </tr>
            ${itemsHtml || '<tr><td colspan="3" style="padding:12px 0;font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:14px;color:#666;">See your order details in your account.</td></tr>'}
          </table>
        </td></tr>

        <!-- Totals -->
        <tr><td style="padding:0 40px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;border-radius:6px;padding:16px;">
            <tr>
              <td style="padding:8px 16px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#666666;">Subtotal</td>
              <td style="padding:8px 16px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#333333;text-align:right;">${currencySymbol}${subtotal > 0 ? subtotal.toFixed(2) : orderTotal}</td>
            </tr>
            ${hasDiscount ? `<tr>
              <td style="padding:8px 16px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#FF6A1A;">Discount</td>
              <td style="padding:8px 16px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#FF6A1A;text-align:right;">-${currencySymbol}${discountAmount}</td>
            </tr>` : ""}
            <tr>
              <td style="padding:8px 16px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#666666;">Shipping</td>
              <td style="padding:8px 16px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#333333;text-align:right;">${Number(shippingAmount) > 0 ? currencySymbol + shippingAmount : "Free"}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;border-top:2px solid #e5e5e5;font-family:'Helvetica Neue',Arial,sans-serif;font-size:18px;font-weight:700;color:#1a1a1a;">Total</td>
              <td style="padding:12px 16px;border-top:2px solid #e5e5e5;font-family:'Helvetica Neue',Arial,sans-serif;font-size:18px;font-weight:700;color:#FF6A1A;text-align:right;">${currencySymbol}${orderTotal}</td>
            </tr>
          </table>
        </td></tr>

        <!-- Shipping Address -->
        <tr><td style="padding:0 40px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;border-radius:6px;">
            <tr><td style="padding:16px 20px;border-bottom:1px solid #e5e5e5;background-color:#fafafa;">
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;">Shipping Address</p>
            </td></tr>
            <tr><td style="padding:16px 20px;">
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#333333;line-height:1.8;">${shippingAddressHtml}</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- What Happens Next -->
        <tr><td style="padding:0 40px 32px;">
          <h3 style="margin:0 0 16px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;font-weight:700;color:#1a1a1a;">What happens next?</h3>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="48" style="vertical-align:top;padding:8px 0;">
                <div style="width:36px;height:36px;background-color:#FF6A1A;border-radius:50%;text-align:center;line-height:36px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;font-weight:700;color:#ffffff;">1</div>
              </td>
              <td style="vertical-align:top;padding:8px 0 8px 8px;">
                <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:600;color:#333333;">Order Processing</p>
                <p style="margin:4px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#666666;">Your order is being prepared by our team.</p>
              </td>
            </tr>
            <tr>
              <td width="48" style="vertical-align:top;padding:8px 0;">
                <div style="width:36px;height:36px;background-color:#FF6A1A;border-radius:50%;text-align:center;line-height:36px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;font-weight:700;color:#ffffff;">2</div>
              </td>
              <td style="vertical-align:top;padding:8px 0 8px 8px;">
                <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:600;color:#333333;">Quality Check</p>
                <p style="margin:4px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#666666;">Every item is inspected to ensure the highest quality standards.</p>
              </td>
            </tr>
            <tr>
              <td width="48" style="vertical-align:top;padding:8px 0;">
                <div style="width:36px;height:36px;background-color:#FF6A1A;border-radius:50%;text-align:center;line-height:36px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;font-weight:700;color:#ffffff;">3</div>
              </td>
              <td style="vertical-align:top;padding:8px 0 8px 8px;">
                <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:600;color:#333333;">Shipped with Tracking</p>
                <p style="margin:4px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#666666;">You'll receive a tracking number once your order ships.</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- CTA Button -->
        <tr><td style="padding:0 40px 32px;text-align:center;">
          <a href="https://orynxpeptides.com/en/account" style="display:inline-block;background-color:#FF6A1A;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:6px;letter-spacing:0.5px;">View Your Order</a>
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
            You received this email because you placed an order at orynxpeptides.com.<br/>
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
          html: orderConfirmationHtml,
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
            subject: `ORYN Peptides - Order Confirmation #${order.display_id}`,
            html: orderConfirmationHtml,
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
