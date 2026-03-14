import { model } from "@medusajs/framework/utils"

const EmailTemplate = model.define("email_template", {
  id: model.id().primaryKey(),
  name: model.text(),
  slug: model.text(),
  subject_template: model.text(),
  html_body: model.text(),
  text_body: model.text().nullable(),
  description: model.text().nullable(),
  category: model
    .enum(["transactional", "marketing", "notification", "system"])
    .default("transactional"),
  variables: model.text().nullable(),
  is_active: model.boolean().default(true),
})

export default EmailTemplate
