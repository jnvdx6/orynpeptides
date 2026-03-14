import { Module } from "@medusajs/framework/utils"
import ReferralModuleService from "./service"

export const REFERRAL_MODULE = "referralModuleService"

export default Module(REFERRAL_MODULE, {
  service: ReferralModuleService,
})
