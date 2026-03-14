import { model } from "@medusajs/framework/utils"

const ContactSubmission = model.define("contact_submission", {
  id: model.id().primaryKey(),
  first_name: model.text(),
  last_name: model.text(),
  email: model.text(),
  phone: model.text().nullable(),
  organization: model.text().nullable(),
  inquiry_type: model.text(),
  message: model.text(),
  priority: model.enum(["low", "medium", "high", "urgent"]).default("medium"),
  status: model
    .enum(["new", "read", "in_progress", "replied", "resolved", "archived"])
    .default("new"),
  assigned_to: model.text().nullable(),
  admin_notes: model.text().nullable(),
  response_due_at: model.text().nullable(),
  first_response_at: model.text().nullable(),
  resolved_at: model.text().nullable(),
  reply_count: model.number().default(0),
  source: model.enum(["website", "email", "phone", "social", "other"]).default("website"),
})

export default ContactSubmission
