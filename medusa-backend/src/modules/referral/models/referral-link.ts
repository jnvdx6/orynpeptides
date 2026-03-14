import { model } from "@medusajs/framework/utils"

const ReferralLink = model.define("referral_link", {
  id: model.id().primaryKey(),
  referrer_customer_id: model.text(),
  referred_customer_id: model.text(),
  referral_code: model.text(),
  level: model.number().default(1),
})

export default ReferralLink
