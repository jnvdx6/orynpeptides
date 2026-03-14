import { model } from "@medusajs/framework/utils"

const NewsletterSubscriber = model.define("newsletter_subscriber", {
  id: model.id().primaryKey(),
  email: model.text(),
  first_name: model.text().nullable(),
  last_name: model.text().nullable(),
  source: model
    .enum(["footer", "exit_intent", "checkout", "manual", "referral", "import"])
    .default("footer"),
  status: model.enum(["active", "unsubscribed", "bounced", "complained"]).default("active"),
  tags: model.text().nullable(),
  unsubscribe_token: model.text().nullable(),
  resend_contact_id: model.text().nullable(),
  ip_address: model.text().nullable(),
  confirmed_at: model.text().nullable(),
  unsubscribed_at: model.text().nullable(),
})

export default NewsletterSubscriber
