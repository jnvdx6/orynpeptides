import { model } from "@medusajs/framework/utils"

const Commission = model.define("commission", {
  id: model.id().primaryKey(),
  referral_link_id: model.text(),
  order_id: model.text(),
  beneficiary_customer_id: model.text(),
  source_customer_id: model.text(),
  level: model.number(),
  rate: model.float(),
  order_amount: model.float(),
  commission_amount: model.float(),
  currency_code: model.text().default("eur"),
  status: model
    .enum(["pending", "approved", "paid", "rejected", "cancelled"])
    .default("pending"),
  payout_method: model.text().nullable(),
  payout_reference: model.text().nullable(),
  paid_at: model.text().nullable(),
  approved_at: model.text().nullable(),
  rejected_at: model.text().nullable(),
  admin_notes: model.text().nullable(),
})

export default Commission
