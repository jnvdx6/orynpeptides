import { model } from "@medusajs/framework/utils"

const ContactSubmission = model.define("contact_submission", {
  id: model.id().primaryKey(),
  first_name: model.text(),
  last_name: model.text(),
  email: model.text(),
  organization: model.text().nullable(),
  inquiry_type: model.text(),
  message: model.text(),
  status: model.enum(["new", "read", "replied", "archived"]).default("new"),
  admin_notes: model.text().nullable(),
})

export default ContactSubmission
