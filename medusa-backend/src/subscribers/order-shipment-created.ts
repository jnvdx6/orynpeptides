import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"

export default async function orderShipmentHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string; fulfillment_id: string }>) {
  const logger = container.resolve("logger")

  try {
    const query = container.resolve("query")

    // Get order details
    const { data: orders } = await query.graph({
      entity: "order",
      fields: [
        "id", "display_id", "email", "total", "currency_code",
        "items.*", "shipping_address.*",
      ],
      filters: { id: data.id },
    })

    const order = orders?.[0]
    if (!order) {
      logger.warn(`Order ${data.id} not found for shipment notification`)
      return
    }

    // Try to get fulfillment/tracking details
    let trackingNumber = ""
    let trackingUrl = ""
    let carrier = ""
    if (data.fulfillment_id) {
      try {
        const { data: fulfillments } = await query.graph({
          entity: "fulfillment",
          fields: ["id", "tracking_links.*", "provider_id", "metadata"],
          filters: { id: data.fulfillment_id },
        })
        const fulfillment = fulfillments?.[0] as any
        if (fulfillment?.tracking_links?.length > 0) {
          const link = fulfillment.tracking_links[0]
          trackingNumber = link.tracking_number || ""
          trackingUrl = link.url || ""
        }
        if (fulfillment?.provider_id) {
          carrier = fulfillment.provider_id.replace(/_/g, " ").replace(/^fp-/, "")
        }
      } catch {
        logger.warn(`Could not fetch fulfillment ${data.fulfillment_id} details`)
      }
    }

    const currency = (order.currency_code || "EUR").toUpperCase()
    const currencySymbol = currency === "EUR" ? "\u20AC" : currency === "USD" ? "$" : currency === "GBP" ? "\u00A3" : `${currency} `
    const orderTotal = Number(order.total || 0).toFixed(2)

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

    // Build items summary
    let itemsSummaryHtml = ""
    if (order.items && Array.isArray(order.items)) {
      itemsSummaryHtml = order.items
        .map((item: any) => `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#333333;">
            ${item.title || "Product"}
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#666666;text-align:right;">
            x${item.quantity || 1}
          </td>
        </tr>`)
        .join("")
    }

    // Tracking section - only show if tracking info available
    const trackingHtml = trackingNumber
      ? `<!-- Tracking Info -->
        <tr><td style="padding:0 40px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a1a;border-radius:8px;">
            <tr><td style="padding:24px;text-align:center;">
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#FF6A1A;text-transform:uppercase;letter-spacing:2px;">Tracking Number</p>
              <p style="margin:12px 0;font-family:'Courier New',monospace;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:2px;">${trackingNumber}</p>
              ${carrier ? `<p style="margin:0 0 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#999999;">Carrier: ${carrier}</p>` : ""}
              ${trackingUrl ? `<a href="${trackingUrl}" style="display:inline-block;background-color:#FF6A1A;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;font-weight:700;text-decoration:none;padding:10px 24px;border-radius:6px;">Track Your Package</a>` : ""}
            </td></tr>
          </table>
        </td></tr>`
      : `<!-- No Tracking Yet -->
        <tr><td style="padding:0 40px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;border-radius:6px;">
            <tr><td style="padding:20px 24px;text-align:center;">
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#666666;">
                Tracking information will be sent separately once available from the carrier.
              </p>
            </td></tr>
          </table>
        </td></tr>`

    const shippingNotificationHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Your Order Has Shipped</title></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
    <tr><td align="center" style="padding:20px 0;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr><td style="background-color:#FF6A1A;padding:32px 40px;text-align:center;">
          <h1 style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:2px;">ORYN</h1>
          <p style="margin:8px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.9);letter-spacing:1px;text-transform:uppercase;">Peptide Labs</p>
        </td></tr>

        <!-- Shipped Banner -->
        <tr><td style="background-color:#1a1a1a;padding:24px 40px;text-align:center;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr>
              <td style="padding-right:12px;vertical-align:middle;"><span style="font-size:28px;">&#128230;</span></td>
              <td style="vertical-align:middle;"><h2 style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:20px;font-weight:600;color:#ffffff;">Your Order Is On Its Way!</h2></td>
            </tr>
          </table>
          <p style="margin:8px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#999999;">Order #${order.display_id}</p>
        </td></tr>

        <!-- Greeting -->
        <tr><td style="padding:32px 40px 16px;">
          <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;color:#333333;line-height:1.6;">
            Hi ${customerName},
          </p>
          <p style="margin:12px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;color:#666666;line-height:1.7;">
            Great news! Your order has been packed, inspected, and handed over to the carrier. It's now on its way to you.
          </p>
        </td></tr>

        ${trackingHtml}

        <!-- Estimated Delivery -->
        <tr><td style="padding:0 40px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;border-radius:6px;">
            <tr>
              <td width="50%" style="padding:20px 24px;text-align:center;border-right:1px solid #e5e5e5;">
                <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;">Estimated Delivery</p>
                <p style="margin:8px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;font-weight:700;color:#1a1a1a;">3-7 Business Days</p>
              </td>
              <td width="50%" style="padding:20px 24px;text-align:center;">
                <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;">Order Total</p>
                <p style="margin:8px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;font-weight:700;color:#FF6A1A;">${currencySymbol}${orderTotal}</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Items Summary -->
        <tr><td style="padding:0 40px 24px;">
          <p style="margin:0 0 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;">Items Shipped</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${itemsSummaryHtml || '<tr><td style="padding:8px 0;font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:14px;color:#666;">See your order details in your account.</td></tr>'}
          </table>
        </td></tr>

        <!-- Shipping Address -->
        <tr><td style="padding:0 40px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;border-radius:6px;">
            <tr><td style="padding:16px 20px;border-bottom:1px solid #e5e5e5;background-color:#fafafa;">
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;">Delivering To</p>
            </td></tr>
            <tr><td style="padding:16px 20px;">
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#333333;line-height:1.8;">${shippingAddressHtml}</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:0 40px 32px;text-align:center;">
          <a href="https://orynxpeptides.com/en/account" style="display:inline-block;background-color:#FF6A1A;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:6px;letter-spacing:0.5px;">View Order Details</a>
        </td></tr>

        <!-- Help Note -->
        <tr><td style="padding:0 40px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;border-radius:6px;">
            <tr><td style="padding:16px 20px;">
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#666666;line-height:1.6;">
                <strong style="color:#333333;">Need help?</strong> If you have any questions about your delivery, don't hesitate to
                <a href="https://orynxpeptides.com/en/contact" style="color:#FF6A1A;text-decoration:none;font-weight:600;">contact our support team</a>.
              </p>
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
            You received this email because your order is being shipped from orynxpeptides.com.<br/>
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
      try {
        await emailService.sendTemplatedEmail("shipping-notification", {
          to: order.email,
          variables: {
            display_id: String(order.display_id),
            customer_name: customerName,
            tracking_number: trackingNumber,
            tracking_url: trackingUrl,
            carrier,
          },
          tags: [
            { name: "type", value: "shipping-notification" },
            { name: "order_id", value: order.id },
          ],
          related_type: "order",
          related_id: order.id,
        })
      } catch (err: any) {
        logger.warn(`Shipping template failed, using fallback: ${err.message}`)
        await emailService.sendEmail({
          to: order.email,
          subject: `ORYN Peptides - Your Order #${order.display_id} Has Shipped!`,
          html: shippingNotificationHtml,
          related_type: "order",
          related_id: order.id,
        })
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
            subject: `ORYN Peptides - Your Order #${order.display_id} Has Shipped!`,
            html: shippingNotificationHtml,
          }),
        })
      }
    }

    logger.info(`Shipping notification sent for order ${data.id}, fulfillment ${data.fulfillment_id}`)
  } catch (error) {
    logger.error(`Failed to handle order.fulfillment_created: ${error}`)
  }
}

export const config: SubscriberConfig = {
  event: "order.fulfillment_created",
}
