import { model } from "@medusajs/framework/utils"

const InboundEmail = model.define("inbound_email", {
  id: model.id().primaryKey(),
  resend_email_id: model.text(),
  from_email: model.text(),
  from_name: model.text().nullable(),
  to_email: model.text(),
  subject: model.text().nullable(),
  html_body: model.text().nullable(),
  text_body: model.text().nullable(),
  has_attachments: model.boolean().default(false),
  attachments_meta: model.text().nullable(),
  status: model
    .enum(["new", "read", "replied", "archived", "forwarded"])
    .default("new"),
  related_type: model.text().nullable(),
  related_id: model.text().nullable(),
  replied_at: model.text().nullable(),
})

export default InboundEmail
