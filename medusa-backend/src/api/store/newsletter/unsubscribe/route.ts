import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const newsletterService = req.scope.resolve("newsletterModuleService") as any
  const { token } = req.query as Record<string, string>

  if (!token) {
    return res.status(400).json({ error: "Missing unsubscribe token" })
  }

  const subscribers = await newsletterService.listNewsletterSubscribers({
    unsubscribe_token: token,
  })

  if (!subscribers.length) {
    return res.status(404).json({ error: "Invalid unsubscribe token" })
  }

  const subscriber = subscribers[0]

  if (subscriber.status === "unsubscribed") {
    return res.json({ message: "Already unsubscribed", email: subscriber.email })
  }

  await newsletterService.updateNewsletterSubscribers(subscriber.id, {
    status: "unsubscribed",
    unsubscribed_at: new Date().toISOString(),
  })

  // Sync with Resend
  try {
    const emailService = req.scope.resolve("emailModuleService") as any
    await emailService.unsubscribeContactFromResend(subscriber.email)
  } catch {
    // Non-critical
  }

  // Return a simple HTML page
  res.setHeader("Content-Type", "text/html")
  return res.send(`<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Unsubscribed - ORYN Peptides</title>
<style>
  body{margin:0;padding:0;background:#0d0d0d;font-family:'Helvetica Neue',Arial,sans-serif;color:#e0e0e0;display:flex;align-items:center;justify-content:center;min-height:100vh}
  .card{background:#1a1a1a;border-radius:12px;padding:48px;text-align:center;max-width:400px}
  h1{color:#FF6A1A;font-size:24px;margin:0 0 16px}
  p{color:#999;line-height:1.6;margin:0 0 8px}
  .email{color:#FF6A1A;font-weight:600}
  a{color:#FF6A1A;text-decoration:none}
</style></head>
<body><div class="card">
  <h1>Unsubscribed</h1>
  <p>You've been successfully unsubscribed.</p>
  <p class="email">${subscriber.email}</p>
  <p style="margin-top:24px"><a href="https://oryn-psi.vercel.app">Back to ORYN Peptides</a></p>
</div></body></html>`)
}
