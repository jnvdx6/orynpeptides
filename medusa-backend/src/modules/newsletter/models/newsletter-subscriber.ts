import { model } from "@medusajs/framework/utils"

const NewsletterSubscriber = model.define("newsletter_subscriber", {
  id: model.id().primaryKey(),
  email: model.text(),
  first_name: model.text().nullable(),
  last_name: model.text().nullable(),
  source: model.enum(["footer", "exit_intent", "checkout", "manual"]).default("footer"),
  status: model.enum(["active", "unsubscribed"]).default("active"),
})

export default NewsletterSubscriber
