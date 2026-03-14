import { MedusaService } from "@medusajs/framework/utils"
import ContactSubmission from "./models/contact-submission"
import ContactReply from "./models/contact-reply"

const SLA_TARGETS: Record<string, number> = {
  urgent: 2,
  high: 8,
  medium: 24,
  low: 72,
}

class ContactModuleService extends MedusaService({
  ContactSubmission,
  ContactReply,
}) {
  calculateResponseDueAt(priority: string, createdAt?: Date): string {
    const created = createdAt || new Date()
    const hours = SLA_TARGETS[priority] || SLA_TARGETS.medium
    const due = new Date(created.getTime() + hours * 60 * 60 * 1000)
    return due.toISOString()
  }

  async checkSlaBreaches(): Promise<any[]> {
    const openSubmissions = await this.listContactSubmissions(
      { status: ["new", "read", "in_progress"] },
      { take: 1000 }
    )

    const now = new Date()
    return openSubmissions
      .filter(
        (sub: any) => sub.response_due_at && new Date(sub.response_due_at) < now
      )
      .map((sub: any) => ({
        ...sub,
        overdue_hours: Math.round(
          (now.getTime() - new Date(sub.response_due_at).getTime()) /
            (1000 * 60 * 60)
        ),
      }))
  }

  async addReply(
    submissionId: string,
    data: {
      sender_type: "admin" | "customer"
      sender_name: string
      sender_email: string
      message: string
      email_log_id?: string
    }
  ): Promise<any> {
    const reply = await this.createContactReplys({
      submission_id: submissionId,
      sender_type: data.sender_type,
      sender_name: data.sender_name,
      sender_email: data.sender_email,
      message: data.message,
      email_log_id: data.email_log_id || null,
    })

    const submission = await this.retrieveContactSubmission(submissionId)
    const updates: Record<string, any> = {
      reply_count: (submission.reply_count || 0) + 1,
    }

    if (data.sender_type === "admin") {
      updates.status = "replied"
      if (!submission.first_response_at) {
        updates.first_response_at = new Date().toISOString()
      }
    }

    await this.updateContactSubmissions(submissionId, updates)
    return reply
  }

  async getConversation(submissionId: string): Promise<any[]> {
    return this.listContactReplys(
      { submission_id: submissionId },
      { order: { created_at: "ASC" } }
    )
  }

  async getContactStats(): Promise<{
    total: number
    by_status: Record<string, number>
    by_priority: Record<string, number>
    by_inquiry_type: Record<string, number>
    avg_response_hours: number
    sla_breaches: number
    open_count: number
  }> {
    const all = await this.listContactSubmissions({}, { take: 10000 })

    const byStatus: Record<string, number> = {}
    const byPriority: Record<string, number> = {}
    const byType: Record<string, number> = {}
    let totalResponseMs = 0
    let responsesCount = 0

    for (const sub of all) {
      byStatus[sub.status] = (byStatus[sub.status] || 0) + 1
      byPriority[sub.priority] = (byPriority[sub.priority] || 0) + 1
      byType[sub.inquiry_type] = (byType[sub.inquiry_type] || 0) + 1

      if (sub.first_response_at) {
        const responseTime =
          new Date(sub.first_response_at).getTime() -
          new Date((sub as any).created_at).getTime()
        totalResponseMs += responseTime
        responsesCount++
      }
    }

    const now = new Date()
    const slaBreaches = all.filter(
      (s: any) =>
        ["new", "read", "in_progress"].includes(s.status) &&
        s.response_due_at &&
        new Date(s.response_due_at) < now
    ).length

    return {
      total: all.length,
      by_status: byStatus,
      by_priority: byPriority,
      by_inquiry_type: byType,
      avg_response_hours:
        responsesCount > 0
          ? Math.round((totalResponseMs / responsesCount / (1000 * 60 * 60)) * 10) / 10
          : 0,
      sla_breaches: slaBreaches,
      open_count: all.filter((s: any) =>
        ["new", "read", "in_progress"].includes(s.status)
      ).length,
    }
  }
}

export default ContactModuleService
