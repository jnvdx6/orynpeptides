import { Module } from "@medusajs/framework/utils"
import EmailModuleService from "./service"

export const EMAIL_MODULE = "emailModuleService"

export default Module(EMAIL_MODULE, {
  service: EmailModuleService,
})
