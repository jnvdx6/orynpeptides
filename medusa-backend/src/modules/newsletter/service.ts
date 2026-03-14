import { MedusaService } from "@medusajs/framework/utils"
import NewsletterSubscriber from "./models/newsletter-subscriber"
import crypto from "crypto"

class NewsletterModuleService extends MedusaService({
  NewsletterSubscriber,
}) {
  generateUnsubscribeToken(): string {
    return crypto.randomBytes(32).toString("hex")
  }

  generateUnsubscribeUrl(token: string): string {
    const baseUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
    return `${baseUrl}/store/newsletter/unsubscribe?token=${token}`
  }

  async getNewsletterStats(): Promise<{
    total: number
    active: number
    unsubscribed: number
    bounced: number
    by_source: Record<string, number>
    growth_last_30_days: number
    unsubscribe_rate: number
  }> {
    const all = await this.listNewsletterSubscribers({}, { take: 100000 })

    const bySource: Record<string, number> = {}
    let active = 0
    let unsubscribed = 0
    let bounced = 0

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    let recentSubscribers = 0

    for (const sub of all) {
      if (sub.status === "active") active++
      else if (sub.status === "unsubscribed") unsubscribed++
      else if (sub.status === "bounced" || sub.status === "complained") bounced++

      bySource[sub.source] = (bySource[sub.source] || 0) + 1

      if (new Date((sub as any).created_at) > thirtyDaysAgo) {
        recentSubscribers++
      }
    }

    return {
      total: all.length,
      active,
      unsubscribed,
      bounced,
      by_source: bySource,
      growth_last_30_days: recentSubscribers,
      unsubscribe_rate:
        all.length > 0
          ? Math.round((unsubscribed / all.length) * 10000) / 100
          : 0,
    }
  }

  async bulkImport(
    subscribers: Array<{ email: string; first_name?: string; last_name?: string; tags?: string }>
  ): Promise<{ imported: number; skipped: number; errors: string[] }> {
    let imported = 0
    let skipped = 0
    const errors: string[] = []

    for (const sub of subscribers) {
      try {
        const existing = await this.listNewsletterSubscribers({
          email: sub.email,
        })
        if (existing.length > 0) {
          skipped++
          continue
        }

        await this.createNewsletterSubscribers({
          email: sub.email,
          first_name: sub.first_name || null,
          last_name: sub.last_name || null,
          source: "import",
          status: "active",
          tags: sub.tags || null,
          unsubscribe_token: this.generateUnsubscribeToken(),
        })
        imported++
      } catch (err: any) {
        errors.push(`${sub.email}: ${err.message}`)
      }
    }

    return { imported, skipped, errors }
  }
}

export default NewsletterModuleService
