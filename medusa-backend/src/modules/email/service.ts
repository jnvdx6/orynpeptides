import { MedusaService } from "@medusajs/framework/utils"
import EmailLog from "./models/email-log"
import EmailTemplate from "./models/email-template"
import InboundEmail from "./models/inbound-email"

interface SendEmailOptions {
  from?: string
  to: string | string[]
  cc?: string | string[]
  bcc?: string | string[]
  subject: string
  html?: string
  text?: string
  reply_to?: string | string[]
  tags?: Array<{ name: string; value: string }>
  headers?: Record<string, string>
  scheduled_at?: string
  related_type?: string
  related_id?: string
}

interface SendTemplatedEmailOptions {
  to: string | string[]
  variables?: Record<string, string>
  cc?: string | string[]
  bcc?: string | string[]
  reply_to?: string | string[]
  tags?: Array<{ name: string; value: string }>
  related_type?: string
  related_id?: string
}

interface EmailStats {
  total_sent: number
  delivered: number
  opened: number
  clicked: number
  bounced: number
  complained: number
  failed: number
  delivery_rate: number
  open_rate: number
  click_rate: number
  bounce_rate: number
  inbound_total: number
  inbound_new: number
}

const RESEND_API_URL = "https://api.resend.com"

const DEFAULT_TEMPLATES = [
  {
    name: "Welcome Email",
    slug: "welcome",
    subject_template: "Welcome to ORYN Peptides, {{first_name}}!",
    category: "transactional" as const,
    description: "Sent when a new customer registers",
    variables: "first_name,referral_code",
    html_body: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
  body { margin:0; padding:0; background:#0d0d0d; font-family:'Helvetica Neue',Arial,sans-serif; color:#e0e0e0; }
  .container { max-width:600px; margin:0 auto; }
  .header { background:linear-gradient(135deg,#FF6A1A 0%,#ff8c4a 100%); padding:40px 30px; text-align:center; }
  .header h1 { color:#fff; margin:0; font-size:28px; letter-spacing:1px; }
  .header p { color:rgba(255,255,255,0.9); margin:8px 0 0; font-size:14px; }
  .body { background:#1a1a1a; padding:40px 30px; }
  .body h2 { color:#FF6A1A; margin:0 0 16px; font-size:22px; }
  .body p { color:#ccc; line-height:1.6; margin:0 0 16px; font-size:15px; }
  .referral-box { background:#252525; border:1px solid #FF6A1A; border-radius:8px; padding:20px; text-align:center; margin:24px 0; }
  .referral-code { font-size:28px; font-weight:bold; color:#FF6A1A; letter-spacing:3px; margin:8px 0; }
  .referral-label { color:#999; font-size:12px; text-transform:uppercase; letter-spacing:1px; }
  .cta { display:inline-block; background:#FF6A1A; color:#fff; padding:14px 32px; border-radius:6px; text-decoration:none; font-weight:bold; font-size:15px; margin:16px 0; }
  .footer { background:#111; padding:30px; text-align:center; }
  .footer p { color:#666; font-size:12px; margin:4px 0; }
  .footer a { color:#FF6A1A; text-decoration:none; }
</style></head>
<body><div class="container">
  <div class="header">
    <h1>ORYN PEPTIDES</h1>
    <p>Precision Peptide Delivery Systems</p>
  </div>
  <div class="body">
    <h2>Welcome, {{first_name}}!</h2>
    <p>Your account has been created successfully. You now have access to our full range of precision peptide delivery systems.</p>
    <div class="referral-box">
      <div class="referral-label">Your Personal Referral Code</div>
      <div class="referral-code">{{referral_code}}</div>
      <p style="color:#999;font-size:13px;margin:8px 0 0">Share with friends &amp; earn 5% commission on their purchases</p>
    </div>
    <p>With our multi-level referral program, you earn commissions up to 5 levels deep:</p>
    <p style="color:#FF6A1A">Level 1: 5% &bull; Level 2: 3% &bull; Level 3: 2% &bull; Level 4: 1% &bull; Level 5: 0.5%</p>
    <a href="https://oryn-psi.vercel.app/products" class="cta">Browse Products</a>
  </div>
  <div class="footer">
    <p>&copy; 2026 ORYN Peptides. All rights reserved.</p>
    <p><a href="https://oryn-psi.vercel.app">orynpeptides.com</a></p>
  </div>
</div></body></html>`,
  },
  {
    name: "Order Confirmation",
    slug: "order-confirmation",
    subject_template: "ORYN Peptides - Order Confirmation #{{display_id}}",
    category: "transactional" as const,
    description: "Sent when an order is placed",
    variables: "display_id,total,currency,items_html,shipping_name,shipping_address",
    html_body: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
  body { margin:0; padding:0; background:#0d0d0d; font-family:'Helvetica Neue',Arial,sans-serif; color:#e0e0e0; }
  .container { max-width:600px; margin:0 auto; }
  .header { background:linear-gradient(135deg,#FF6A1A 0%,#ff8c4a 100%); padding:40px 30px; text-align:center; }
  .header h1 { color:#fff; margin:0; font-size:28px; letter-spacing:1px; }
  .body { background:#1a1a1a; padding:40px 30px; }
  .body h2 { color:#FF6A1A; margin:0 0 16px; font-size:22px; }
  .body p { color:#ccc; line-height:1.6; margin:0 0 16px; font-size:15px; }
  .order-box { background:#252525; border-radius:8px; padding:24px; margin:24px 0; }
  .order-number { font-size:14px; color:#999; text-transform:uppercase; letter-spacing:1px; }
  .order-id { font-size:32px; font-weight:bold; color:#FF6A1A; margin:4px 0 16px; }
  .total-row { display:flex; justify-content:space-between; padding:12px 0; border-top:1px solid #333; }
  .total-label { color:#999; font-size:14px; }
  .total-value { color:#FF6A1A; font-size:20px; font-weight:bold; }
  .items { margin:16px 0; }
  .item { padding:12px 0; border-bottom:1px solid #333; }
  .status-badge { display:inline-block; background:rgba(255,106,26,0.15); color:#FF6A1A; padding:6px 16px; border-radius:20px; font-size:13px; font-weight:600; }
  .footer { background:#111; padding:30px; text-align:center; }
  .footer p { color:#666; font-size:12px; margin:4px 0; }
  .footer a { color:#FF6A1A; text-decoration:none; }
</style></head>
<body><div class="container">
  <div class="header">
    <h1>ORYN PEPTIDES</h1>
  </div>
  <div class="body">
    <h2>Order Confirmed!</h2>
    <div class="order-box">
      <div class="order-number">Order Number</div>
      <div class="order-id">#{{display_id}}</div>
      <span class="status-badge">Confirmed</span>
      <div class="items">{{items_html}}</div>
      <div class="total-row">
        <span class="total-label">Total</span>
        <span class="total-value">{{total}} {{currency}}</span>
      </div>
    </div>
    <p>We'll send you a shipping confirmation once your order is on its way.</p>
    <p>If you have questions, reply to this email or visit our contact page.</p>
  </div>
  <div class="footer">
    <p>&copy; 2026 ORYN Peptides. All rights reserved.</p>
    <p><a href="https://oryn-psi.vercel.app">orynpeptides.com</a></p>
  </div>
</div></body></html>`,
  },
  {
    name: "Contact Auto-Reply",
    slug: "contact-auto-reply",
    subject_template: "Thank you for contacting ORYN Peptides",
    category: "transactional" as const,
    description: "Auto-reply sent when a contact form is submitted",
    variables: "first_name,inquiry_type",
    html_body: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
  body { margin:0; padding:0; background:#0d0d0d; font-family:'Helvetica Neue',Arial,sans-serif; color:#e0e0e0; }
  .container { max-width:600px; margin:0 auto; }
  .header { background:linear-gradient(135deg,#FF6A1A 0%,#ff8c4a 100%); padding:40px 30px; text-align:center; }
  .header h1 { color:#fff; margin:0; font-size:28px; letter-spacing:1px; }
  .body { background:#1a1a1a; padding:40px 30px; }
  .body h2 { color:#FF6A1A; margin:0 0 16px; font-size:22px; }
  .body p { color:#ccc; line-height:1.6; margin:0 0 16px; font-size:15px; }
  .info-box { background:#252525; border-left:3px solid #FF6A1A; padding:16px 20px; margin:20px 0; border-radius:0 6px 6px 0; }
  .footer { background:#111; padding:30px; text-align:center; }
  .footer p { color:#666; font-size:12px; margin:4px 0; }
  .footer a { color:#FF6A1A; text-decoration:none; }
</style></head>
<body><div class="container">
  <div class="header">
    <h1>ORYN PEPTIDES</h1>
  </div>
  <div class="body">
    <h2>Thank you, {{first_name}}!</h2>
    <p>We have received your {{inquiry_type}} inquiry and our team is reviewing it.</p>
    <div class="info-box">
      <p style="margin:0;color:#FF6A1A;font-weight:600">Expected Response Time</p>
      <p style="margin:8px 0 0">We typically respond within <strong>24 hours</strong> during business days. For urgent matters, please note so in your inquiry.</p>
    </div>
    <p>In the meantime, feel free to browse our latest products and research.</p>
  </div>
  <div class="footer">
    <p>&copy; 2026 ORYN Peptides. All rights reserved.</p>
    <p><a href="https://oryn-psi.vercel.app">orynpeptides.com</a></p>
  </div>
</div></body></html>`,
  },
  {
    name: "Contact Admin Alert",
    slug: "contact-admin-alert",
    subject_template: "[ORYN] New {{inquiry_type}} inquiry from {{first_name}} {{last_name}}",
    category: "notification" as const,
    description: "Admin notification for new contact form submissions",
    variables: "first_name,last_name,email,organization,inquiry_type,message,priority,submission_id",
    html_body: `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  body { margin:0; padding:0; background:#f5f5f5; font-family:'Helvetica Neue',Arial,sans-serif; color:#333; }
  .container { max-width:600px; margin:0 auto; }
  .header { background:#1a1a1a; padding:20px 30px; }
  .header h1 { color:#FF6A1A; margin:0; font-size:20px; }
  .body { background:#fff; padding:30px; }
  .body h2 { color:#1a1a1a; margin:0 0 20px; font-size:18px; }
  .field { margin-bottom:12px; }
  .field-label { font-size:12px; color:#999; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:2px; }
  .field-value { font-size:15px; color:#333; }
  .message-box { background:#f9f9f9; border:1px solid #e0e0e0; border-radius:6px; padding:16px; margin:20px 0; }
  .priority-badge { display:inline-block; padding:4px 12px; border-radius:12px; font-size:12px; font-weight:600; }
  .priority-high { background:#fff0e0; color:#ff6a1a; }
  .priority-urgent { background:#ffe0e0; color:#e02020; }
  .priority-medium { background:#e0f0ff; color:#2070e0; }
  .priority-low { background:#e8e8e8; color:#666; }
  .cta { display:inline-block; background:#FF6A1A; color:#fff; padding:10px 24px; border-radius:4px; text-decoration:none; font-size:14px; margin-top:16px; }
</style></head>
<body><div class="container">
  <div class="header"><h1>ORYN Admin Alert</h1></div>
  <div class="body">
    <h2>New Contact Submission</h2>
    <span class="priority-badge priority-{{priority}}">{{priority}}</span>
    <div class="field"><div class="field-label">Name</div><div class="field-value">{{first_name}} {{last_name}}</div></div>
    <div class="field"><div class="field-label">Email</div><div class="field-value">{{email}}</div></div>
    <div class="field"><div class="field-label">Organization</div><div class="field-value">{{organization}}</div></div>
    <div class="field"><div class="field-label">Inquiry Type</div><div class="field-value">{{inquiry_type}}</div></div>
    <div class="message-box">
      <div class="field-label">Message</div>
      <p style="margin:8px 0 0;white-space:pre-wrap">{{message}}</p>
    </div>
    <a href="https://medusa.skyodoo.com/app/contact-submissions" class="cta">View in Admin</a>
  </div>
</div></body></html>`,
  },
  {
    name: "Order Admin Alert",
    slug: "order-admin-alert",
    subject_template: "[ORYN] New Order #{{display_id}} - {{total}} {{currency}}",
    category: "notification" as const,
    description: "Admin notification for new orders",
    variables: "display_id,email,total,currency,items_html,customer_name",
    html_body: `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  body { margin:0; padding:0; background:#f5f5f5; font-family:'Helvetica Neue',Arial,sans-serif; color:#333; }
  .container { max-width:600px; margin:0 auto; }
  .header { background:#1a1a1a; padding:20px 30px; }
  .header h1 { color:#FF6A1A; margin:0; font-size:20px; }
  .body { background:#fff; padding:30px; }
  .highlight { font-size:32px; font-weight:bold; color:#FF6A1A; margin:16px 0; }
  .field { margin-bottom:8px; }
  .field-label { font-size:12px; color:#999; text-transform:uppercase; }
  .field-value { font-size:15px; color:#333; }
  .items-box { background:#f9f9f9; border:1px solid #e0e0e0; border-radius:6px; padding:16px; margin:16px 0; }
</style></head>
<body><div class="container">
  <div class="header"><h1>ORYN Admin - New Order</h1></div>
  <div class="body">
    <h2 style="margin:0 0 8px;color:#1a1a1a">Order #{{display_id}}</h2>
    <div class="highlight">{{total}} {{currency}}</div>
    <div class="field"><div class="field-label">Customer</div><div class="field-value">{{customer_name}} ({{email}})</div></div>
    <div class="items-box">{{items_html}}</div>
    <a href="https://medusa.skyodoo.com/app/orders" style="display:inline-block;background:#FF6A1A;color:#fff;padding:10px 24px;border-radius:4px;text-decoration:none;font-size:14px;margin-top:12px">View Order</a>
  </div>
</div></body></html>`,
  },
  {
    name: "Referral Invitation",
    slug: "referral-invitation",
    subject_template: "{{referrer_name}} thinks you'll love ORYN Peptides",
    category: "marketing" as const,
    description: "Sent when a customer invites someone via referral",
    variables: "referrer_name,referral_code,message",
    html_body: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
  body { margin:0; padding:0; background:#0d0d0d; font-family:'Helvetica Neue',Arial,sans-serif; color:#e0e0e0; }
  .container { max-width:600px; margin:0 auto; }
  .header { background:linear-gradient(135deg,#FF6A1A 0%,#ff8c4a 100%); padding:40px 30px; text-align:center; }
  .header h1 { color:#fff; margin:0; font-size:28px; }
  .body { background:#1a1a1a; padding:40px 30px; }
  .body h2 { color:#FF6A1A; margin:0 0 16px; font-size:22px; }
  .body p { color:#ccc; line-height:1.6; margin:0 0 16px; }
  .message-box { background:#252525; border-left:3px solid #FF6A1A; padding:16px 20px; margin:20px 0; border-radius:0 6px 6px 0; font-style:italic; }
  .code-box { background:#252525; border:2px dashed #FF6A1A; border-radius:8px; padding:20px; text-align:center; margin:24px 0; }
  .code { font-size:32px; font-weight:bold; color:#FF6A1A; letter-spacing:4px; }
  .cta { display:inline-block; background:#FF6A1A; color:#fff; padding:14px 32px; border-radius:6px; text-decoration:none; font-weight:bold; }
  .footer { background:#111; padding:30px; text-align:center; }
  .footer p { color:#666; font-size:12px; margin:4px 0; }
</style></head>
<body><div class="container">
  <div class="header"><h1>ORYN PEPTIDES</h1></div>
  <div class="body">
    <h2>You've Been Invited!</h2>
    <p><strong>{{referrer_name}}</strong> recommends ORYN Peptides' precision delivery systems.</p>
    <div class="message-box">"{{message}}"</div>
    <div class="code-box">
      <p style="color:#999;font-size:12px;text-transform:uppercase;margin:0 0 8px">Use this code at checkout</p>
      <div class="code">{{referral_code}}</div>
    </div>
    <p style="text-align:center"><a href="https://oryn-psi.vercel.app/products" class="cta">Shop Now</a></p>
  </div>
  <div class="footer">
    <p>&copy; 2026 ORYN Peptides. All rights reserved.</p>
  </div>
</div></body></html>`,
  },
  {
    name: "Commission Notification",
    slug: "commission-notification",
    subject_template: "You earned a {{amount}} {{currency}} commission!",
    category: "transactional" as const,
    description: "Sent when a referral commission is generated",
    variables: "beneficiary_name,amount,currency,level,rate,order_display_id",
    html_body: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
  body { margin:0; padding:0; background:#0d0d0d; font-family:'Helvetica Neue',Arial,sans-serif; color:#e0e0e0; }
  .container { max-width:600px; margin:0 auto; }
  .header { background:linear-gradient(135deg,#FF6A1A 0%,#ff8c4a 100%); padding:30px; text-align:center; }
  .header h1 { color:#fff; margin:0; font-size:24px; }
  .body { background:#1a1a1a; padding:40px 30px; text-align:center; }
  .amount { font-size:48px; font-weight:bold; color:#FF6A1A; margin:16px 0; }
  .body p { color:#ccc; line-height:1.6; margin:0 0 12px; font-size:15px; }
  .details { background:#252525; border-radius:8px; padding:20px; margin:24px 0; text-align:left; }
  .detail-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #333; }
  .detail-label { color:#999; }
  .detail-value { color:#e0e0e0; font-weight:600; }
  .footer { background:#111; padding:30px; text-align:center; }
  .footer p { color:#666; font-size:12px; margin:4px 0; }
</style></head>
<body><div class="container">
  <div class="header"><h1>Commission Earned!</h1></div>
  <div class="body">
    <p>Congratulations, {{beneficiary_name}}!</p>
    <div class="amount">{{amount}} {{currency}}</div>
    <p>You earned a Level {{level}} referral commission.</p>
    <div class="details">
      <div class="detail-row"><span class="detail-label">Order</span><span class="detail-value">#{{order_display_id}}</span></div>
      <div class="detail-row"><span class="detail-label">Level</span><span class="detail-value">{{level}}</span></div>
      <div class="detail-row"><span class="detail-label">Rate</span><span class="detail-value">{{rate}}%</span></div>
      <div class="detail-row" style="border:none"><span class="detail-label">Status</span><span class="detail-value" style="color:#FF6A1A">Pending Approval</span></div>
    </div>
    <p style="color:#999;font-size:13px">Commissions are reviewed and paid out monthly.</p>
  </div>
  <div class="footer"><p>&copy; 2026 ORYN Peptides</p></div>
</div></body></html>`,
  },
  {
    name: "Newsletter Welcome",
    slug: "newsletter-welcome",
    subject_template: "Welcome to ORYN Peptides Newsletter",
    category: "marketing" as const,
    description: "Sent when someone subscribes to the newsletter",
    variables: "first_name,unsubscribe_url",
    html_body: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
  body { margin:0; padding:0; background:#0d0d0d; font-family:'Helvetica Neue',Arial,sans-serif; color:#e0e0e0; }
  .container { max-width:600px; margin:0 auto; }
  .header { background:linear-gradient(135deg,#FF6A1A 0%,#ff8c4a 100%); padding:40px 30px; text-align:center; }
  .header h1 { color:#fff; margin:0; font-size:28px; }
  .body { background:#1a1a1a; padding:40px 30px; }
  .body h2 { color:#FF6A1A; margin:0 0 16px; font-size:22px; }
  .body p { color:#ccc; line-height:1.6; margin:0 0 16px; }
  .benefits { list-style:none; padding:0; margin:20px 0; }
  .benefits li { padding:8px 0 8px 24px; position:relative; color:#ccc; }
  .benefits li::before { content:"\\2714"; position:absolute; left:0; color:#FF6A1A; }
  .footer { background:#111; padding:30px; text-align:center; }
  .footer p { color:#666; font-size:12px; margin:4px 0; }
  .footer a { color:#FF6A1A; text-decoration:none; }
</style></head>
<body><div class="container">
  <div class="header"><h1>ORYN PEPTIDES</h1></div>
  <div class="body">
    <h2>You're In, {{first_name}}!</h2>
    <p>Thanks for subscribing to our newsletter. Here's what you can expect:</p>
    <ul class="benefits">
      <li>Early access to new products</li>
      <li>Exclusive research updates</li>
      <li>Special promotions &amp; discounts</li>
      <li>Industry insights &amp; peptide science</li>
    </ul>
    <p>Stay tuned for our next update!</p>
  </div>
  <div class="footer">
    <p>&copy; 2026 ORYN Peptides. All rights reserved.</p>
    <p><a href="{{unsubscribe_url}}">Unsubscribe</a></p>
  </div>
</div></body></html>`,
  },
  {
    name: "Contact Admin Reply",
    slug: "contact-admin-reply",
    subject_template: "Re: Your inquiry to ORYN Peptides",
    category: "transactional" as const,
    description: "Admin reply to a contact submission",
    variables: "first_name,reply_message,original_inquiry_type",
    html_body: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
  body { margin:0; padding:0; background:#0d0d0d; font-family:'Helvetica Neue',Arial,sans-serif; color:#e0e0e0; }
  .container { max-width:600px; margin:0 auto; }
  .header { background:linear-gradient(135deg,#FF6A1A 0%,#ff8c4a 100%); padding:30px; text-align:center; }
  .header h1 { color:#fff; margin:0; font-size:24px; }
  .body { background:#1a1a1a; padding:40px 30px; }
  .body h2 { color:#FF6A1A; margin:0 0 16px; font-size:20px; }
  .body p { color:#ccc; line-height:1.7; margin:0 0 16px; font-size:15px; }
  .reply-content { background:#252525; border-radius:8px; padding:20px; margin:20px 0; white-space:pre-wrap; }
  .footer { background:#111; padding:30px; text-align:center; }
  .footer p { color:#666; font-size:12px; margin:4px 0; }
</style></head>
<body><div class="container">
  <div class="header"><h1>ORYN PEPTIDES</h1></div>
  <div class="body">
    <h2>Hello {{first_name}},</h2>
    <p>Thank you for your {{original_inquiry_type}} inquiry. Here is our response:</p>
    <div class="reply-content">{{reply_message}}</div>
    <p>If you have further questions, simply reply to this email.</p>
    <p>Best regards,<br/><strong>The ORYN Peptides Team</strong></p>
  </div>
  <div class="footer"><p>&copy; 2026 ORYN Peptides</p></div>
</div></body></html>`,
  },
]

class EmailModuleService extends MedusaService({
  EmailLog,
  EmailTemplate,
  InboundEmail,
}) {
  private get resendApiKey(): string | undefined {
    return process.env.RESEND_API_KEY
  }

  private get fromEmail(): string {
    return process.env.RESEND_FROM_EMAIL || "ORYN Peptides <info@orynlabs.com>"
  }

  // ─── Template Rendering ────────────────────────────────────────────

  renderTemplate(template: string, variables: Record<string, string>): string {
    return template.replace(
      /\{\{(\w+)(?:\|([^}]*))?\}\}/g,
      (_, key, defaultValue) => variables[key] ?? defaultValue ?? ""
    )
  }

  // ─── Core Email Sending ────────────────────────────────────────────

  async sendEmail(options: SendEmailOptions): Promise<any> {
    const apiKey = this.resendApiKey
    if (!apiKey) {
      throw new Error("RESEND_API_KEY not configured")
    }

    const toArray = Array.isArray(options.to) ? options.to : [options.to]
    const from = options.from || this.fromEmail

    // Create log entry first
    const log = await this.createEmailLogs({
      direction: "outbound",
      from_email: from,
      to_emails: toArray.join(","),
      cc_emails: options.cc
        ? (Array.isArray(options.cc) ? options.cc.join(",") : options.cc)
        : null,
      bcc_emails: options.bcc
        ? (Array.isArray(options.bcc) ? options.bcc.join(",") : options.bcc)
        : null,
      subject: options.subject,
      html_body: options.html || null,
      text_body: options.text || null,
      tags: options.tags ? JSON.stringify(options.tags) : null,
      status: "queued",
      related_type: options.related_type || null,
      related_id: options.related_id || null,
    })

    try {
      const payload: Record<string, any> = {
        from,
        to: toArray,
        subject: options.subject,
      }
      if (options.html) payload.html = options.html
      if (options.text) payload.text = options.text
      if (options.cc) payload.cc = Array.isArray(options.cc) ? options.cc : [options.cc]
      if (options.bcc) payload.bcc = Array.isArray(options.bcc) ? options.bcc : [options.bcc]
      if (options.reply_to) payload.reply_to = options.reply_to
      if (options.tags) payload.tags = options.tags
      if (options.headers) payload.headers = options.headers
      if (options.scheduled_at) payload.scheduled_at = options.scheduled_at

      const response = await fetch(`${RESEND_API_URL}/emails`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        await this.updateEmailLogs({
          id: log.id,
          status: "failed" as const,
          error_message: JSON.stringify(result),
        })
        throw new Error(`Resend API error: ${JSON.stringify(result)}`)
      }

      await this.updateEmailLogs({
        id: log.id,
        resend_id: (result as any).id,
        status: "sent" as const,
      })

      return { ...log, resend_id: (result as any).id, status: "sent" }
    } catch (error: any) {
      if (error.message?.includes("Resend API error")) throw error
      await this.updateEmailLogs({
        id: log.id,
        status: "failed" as const,
        error_message: error.message,
      })
      throw error
    }
  }

  // ─── Templated Email Sending ───────────────────────────────────────

  async sendTemplatedEmail(
    slug: string,
    options: SendTemplatedEmailOptions
  ): Promise<any> {
    const templates = await this.listEmailTemplates({ slug, is_active: true })
    if (!templates.length) {
      throw new Error(`Email template "${slug}" not found or inactive`)
    }

    const template = templates[0]
    const variables = options.variables || {}
    const subject = this.renderTemplate(template.subject_template, variables)
    const html = this.renderTemplate(template.html_body, variables)
    const text = template.text_body
      ? this.renderTemplate(template.text_body, variables)
      : undefined

    return this.sendEmail({
      to: options.to,
      cc: options.cc,
      bcc: options.bcc,
      subject,
      html,
      text,
      reply_to: options.reply_to,
      tags: [
        { name: "template", value: slug },
        { name: "category", value: template.category },
        ...(options.tags || []),
      ],
      related_type: options.related_type,
      related_id: options.related_id,
    })
  }

  // ─── Batch Sending ─────────────────────────────────────────────────

  async sendBatchEmails(emails: SendEmailOptions[]): Promise<any[]> {
    const apiKey = this.resendApiKey
    if (!apiKey) throw new Error("RESEND_API_KEY not configured")

    // Create log entries
    const logs = await Promise.all(
      emails.map((email) =>
        this.createEmailLogs({
          direction: "outbound",
          from_email: email.from || this.fromEmail,
          to_emails: Array.isArray(email.to) ? email.to.join(",") : email.to,
          subject: email.subject,
          html_body: email.html || null,
          text_body: email.text || null,
          status: "queued",
          related_type: email.related_type || null,
          related_id: email.related_id || null,
        })
      )
    )

    const payload = emails.map((email) => ({
      from: email.from || this.fromEmail,
      to: Array.isArray(email.to) ? email.to : [email.to],
      subject: email.subject,
      html: email.html,
      text: email.text,
      tags: email.tags,
    }))

    try {
      const response = await fetch(`${RESEND_API_URL}/batch`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (response.ok && (result as any).data) {
        await Promise.all(
          (result as any).data.map((r: any, i: number) =>
            this.updateEmailLogs({
              id: logs[i].id,
              resend_id: r.id,
              status: "sent" as const,
            })
          )
        )
      }

      return logs
    } catch (error: any) {
      await Promise.all(
        logs.map((log: any) =>
          this.updateEmailLogs({
            id: log.id,
            status: "failed" as const,
            error_message: error.message,
          })
        )
      )
      throw error
    }
  }

  // ─── Resend Webhook Processing ─────────────────────────────────────

  async handleResendWebhook(event: {
    type: string
    created_at: string
    data: any
  }): Promise<void> {
    const { type, data, created_at } = event

    if (type === "email.received") {
      await this.processInboundEmail(data)
      return
    }

    // Outbound email events
    const resendId = data.email_id || data.id
    if (!resendId) return

    const logs = await this.listEmailLogs({ resend_id: resendId })
    if (!logs.length) return

    const log = logs[0]
    const updates: Record<string, any> = {}

    switch (type) {
      case "email.sent":
        updates.status = "sent"
        break
      case "email.delivered":
        updates.status = "delivered"
        updates.delivered_at = created_at
        break
      case "email.opened":
        updates.status = "opened"
        updates.opened_at = log.opened_at || created_at
        break
      case "email.clicked":
        updates.status = "clicked"
        updates.clicked_at = log.clicked_at || created_at
        break
      case "email.bounced":
        updates.status = "bounced"
        updates.bounced_at = created_at
        updates.error_message = JSON.stringify(data.bounce || data)
        break
      case "email.complained":
        updates.status = "complained"
        break
      case "email.delivery_delayed":
        updates.metadata = JSON.stringify({
          ...(log.metadata ? JSON.parse(log.metadata) : {}),
          delay_reason: data.reason,
        })
        break
      default:
        return
    }

    await this.updateEmailLogs({ id: log.id, ...updates })
  }

  // ─── Inbound Email Processing ──────────────────────────────────────

  async processInboundEmail(data: any): Promise<any> {
    const inbound = await this.createInboundEmails({
      resend_email_id: data.email_id || data.id || "",
      from_email: data.from || "",
      from_name: data.from_name || null,
      to_email: Array.isArray(data.to) ? data.to.join(",") : (data.to || ""),
      subject: data.subject || null,
      html_body: data.html || null,
      text_body: data.text || null,
      has_attachments: !!(data.attachments && data.attachments.length > 0),
      attachments_meta: data.attachments ? JSON.stringify(data.attachments) : null,
      status: "new" as const,
    })

    // Try to fetch full email content from Resend if we only got metadata
    if (!data.html && !data.text && data.email_id) {
      try {
        const apiKey = this.resendApiKey
        if (apiKey) {
          const response = await fetch(
            `${RESEND_API_URL}/emails/${data.email_id}`,
            {
              headers: { Authorization: `Bearer ${apiKey}` },
            }
          )
          if (response.ok) {
            const fullEmail = (await response.json()) as any
            await this.updateInboundEmails({
              id: inbound.id,
              html_body: fullEmail.html || null,
              text_body: fullEmail.text || null,
            })
          }
        }
      } catch {
        // Silently continue - we'll have at least the metadata
      }
    }

    return inbound
  }

  // ─── Resend Contact Sync ───────────────────────────────────────────

  async syncContactToResend(email: string, firstName?: string, lastName?: string): Promise<void> {
    const apiKey = this.resendApiKey
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (!apiKey || !audienceId) return

    try {
      await fetch(`${RESEND_API_URL}/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          first_name: firstName || undefined,
          last_name: lastName || undefined,
          unsubscribed: false,
        }),
      })
    } catch {
      // Non-critical - don't block operations
    }
  }

  async unsubscribeContactFromResend(email: string): Promise<void> {
    const apiKey = this.resendApiKey
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (!apiKey || !audienceId) return

    try {
      // List contacts to find the one to update
      const response = await fetch(
        `${RESEND_API_URL}/audiences/${audienceId}/contacts?email=${encodeURIComponent(email)}`,
        { headers: { Authorization: `Bearer ${apiKey}` } }
      )
      if (response.ok) {
        const result = (await response.json()) as any
        const contact = result.data?.[0]
        if (contact) {
          await fetch(
            `${RESEND_API_URL}/audiences/${audienceId}/contacts/${contact.id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ unsubscribed: true }),
            }
          )
        }
      }
    } catch {
      // Non-critical
    }
  }

  // ─── Analytics ─────────────────────────────────────────────────────

  async getEmailStats(fromDate?: string, toDate?: string): Promise<EmailStats> {
    const allLogs = await this.listEmailLogs(
      { direction: "outbound" },
      { take: 10000 }
    )

    let logs = allLogs
    if (fromDate || toDate) {
      logs = allLogs.filter((log: any) => {
        const created = new Date(log.created_at).getTime()
        if (fromDate && created < new Date(fromDate).getTime()) return false
        if (toDate && created > new Date(toDate).getTime()) return false
        return true
      })
    }

    const total = logs.length
    const delivered = logs.filter((l: any) =>
      ["delivered", "opened", "clicked"].includes(l.status)
    ).length
    const opened = logs.filter((l: any) =>
      ["opened", "clicked"].includes(l.status)
    ).length
    const clicked = logs.filter((l: any) => l.status === "clicked").length
    const bounced = logs.filter((l: any) => l.status === "bounced").length
    const complained = logs.filter((l: any) => l.status === "complained").length
    const failed = logs.filter((l: any) => l.status === "failed").length

    const inboundAll = await this.listInboundEmails({}, { take: 10000 })
    let inbound = inboundAll
    if (fromDate || toDate) {
      inbound = inboundAll.filter((e: any) => {
        const created = new Date(e.created_at).getTime()
        if (fromDate && created < new Date(fromDate).getTime()) return false
        if (toDate && created > new Date(toDate).getTime()) return false
        return true
      })
    }

    return {
      total_sent: total,
      delivered,
      opened,
      clicked,
      bounced,
      complained,
      failed,
      delivery_rate: total > 0 ? Math.round((delivered / total) * 10000) / 100 : 0,
      open_rate: delivered > 0 ? Math.round((opened / delivered) * 10000) / 100 : 0,
      click_rate: opened > 0 ? Math.round((clicked / opened) * 10000) / 100 : 0,
      bounce_rate: total > 0 ? Math.round((bounced / total) * 10000) / 100 : 0,
      inbound_total: inbound.length,
      inbound_new: inbound.filter((e: any) => e.status === "new").length,
    }
  }

  // ─── Seed Default Templates ────────────────────────────────────────

  async seedDefaultTemplates(): Promise<{ created: number; skipped: number }> {
    let created = 0
    let skipped = 0

    for (const tmpl of DEFAULT_TEMPLATES) {
      const existing = await this.listEmailTemplates({ slug: tmpl.slug })
      if (existing.length > 0) {
        skipped++
        continue
      }
      await this.createEmailTemplates({
        ...tmpl,
        is_active: true,
      })
      created++
    }

    return { created, skipped }
  }
}

export default EmailModuleService
