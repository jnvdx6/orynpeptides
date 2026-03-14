import { model } from "@medusajs/framework/utils"

const ReferralLink = model.define("referral_link", {
  id: model.id().primaryKey(),
  referrer_customer_id: model.text(),
  referred_customer_id: model.text(),
  referral_code: model.text(),
  level: model.number().default(1),
  clicks: model.number().default(0),
  status: model.enum(["active", "inactive", "expired"]).default("active"),
  expires_at: model.text().nullable(),
  source: model.text().nullable(),
})

export default ReferralLink
