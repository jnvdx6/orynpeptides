import { model } from "@medusajs/framework/utils"

const EmailLog = model.define("email_log", {
  id: model.id().primaryKey(),
  resend_id: model.text().nullable(),
  direction: model.enum(["outbound", "inbound"]).default("outbound"),
  from_email: model.text(),
  from_name: model.text().nullable(),
  to_emails: model.text(),
  cc_emails: model.text().nullable(),
  bcc_emails: model.text().nullable(),
  subject: model.text(),
  html_body: model.text().nullable(),
  text_body: model.text().nullable(),
  template_slug: model.text().nullable(),
  tags: model.text().nullable(),
  status: model
    .enum([
      "queued",
      "sent",
      "delivered",
      "opened",
      "clicked",
      "bounced",
      "complained",
      "failed",
    ])
    .default("queued"),
  related_type: model.text().nullable(),
  related_id: model.text().nullable(),
  error_message: model.text().nullable(),
  opened_at: model.text().nullable(),
  clicked_at: model.text().nullable(),
  bounced_at: model.text().nullable(),
  delivered_at: model.text().nullable(),
  metadata: model.text().nullable(),
})

export default EmailLog
