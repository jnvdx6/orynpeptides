import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const logger = req.scope.resolve("logger")
  const emailService = req.scope.resolve("emailModuleService") as any

  try {
    const event = req.body as {
      type: string
      created_at: string
      data: any
    }

    if (!event?.type) {
      return res.status(400).json({ error: "Invalid webhook payload" })
    }

    logger.info(`Resend webhook received: ${event.type}`)

    await emailService.handleResendWebhook(event)

    return res.json({ received: true })
  } catch (error: any) {
    logger.error(`Resend webhook error: ${error.message}`)
    return res.status(500).json({ error: "Webhook processing failed" })
  }
}
