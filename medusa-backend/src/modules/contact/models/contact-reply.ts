import { model } from "@medusajs/framework/utils"

const ContactReply = model.define("contact_reply", {
  id: model.id().primaryKey(),
  submission_id: model.text(),
  sender_type: model.enum(["admin", "customer"]).default("admin"),
  sender_name: model.text(),
  sender_email: model.text(),
  message: model.text(),
  email_log_id: model.text().nullable(),
})

export default ContactReply
