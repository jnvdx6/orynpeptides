import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useState, useEffect, useCallback } from "react"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ContactSubmission = {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  organization: string | null
  inquiry_type: string
  message: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "new" | "read" | "in_progress" | "replied" | "resolved" | "archived"
  assigned_to: string | null
  admin_notes: string | null
  response_due_at: string | null
  first_response_at: string | null
  resolved_at: string | null
  reply_count: number
  source: "website" | "email" | "phone" | "social" | "other"
  created_at: string
  updated_at: string
}

type ContactReply = {
  id: string
  submission_id: string
  sender_type: "admin" | "customer"
  sender_name: string
  sender_email: string
  message: string
  email_log_id: string | null
  created_at: string
}

type ContactStats = {
  total: number
  by_status: Record<string, number>
  by_priority: Record<string, number>
  by_inquiry_type: Record<string, number>
  avg_response_hours: number
  sla_breaches: number
  open_count: number
}

// ---------------------------------------------------------------------------
// Theme constants
// ---------------------------------------------------------------------------

const COLORS = {
  bg: "#1a1a1a",
  card: "#252525",
  cardHover: "#2a2a2a",
  border: "#333",
  accent: "#FF6A1A",
  accentHover: "#e85d10",
  text: "#e0e0e0",
  textMuted: "#999",
  textDim: "#777",
  white: "#fff",
  danger: "#ef4444",
  dangerHover: "#dc2626",
  success: "#10b981",
  warning: "#f59e0b",
  info: "#3b82f6",
  teal: "#14b8a6",
}

const PRIORITY_COLORS: Record<string, { bg: string; text: string }> = {
  urgent: { bg: "#991b1b", text: "#fca5a5" },
  high: { bg: "#7c2d12", text: "#fdba74" },
  medium: { bg: "#1e3a5f", text: "#93c5fd" },
  low: { bg: "#374151", text: "#9ca3af" },
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  new: { bg: "#7c2d12", text: "#fdba74" },
  read: { bg: "#1e3a5f", text: "#93c5fd" },
  in_progress: { bg: "#713f12", text: "#fde047" },
  replied: { bg: "#14532d", text: "#86efac" },
  resolved: { bg: "#134e4a", text: "#5eead4" },
  archived: { bg: "#374151", text: "#9ca3af" },
}

const SOURCE_LABELS: Record<string, string> = {
  website: "Website",
  email: "Email",
  phone: "Phone",
  social: "Social",
  other: "Other",
}

// ---------------------------------------------------------------------------
// Shared inline styles
// ---------------------------------------------------------------------------

const inputStyle: React.CSSProperties = {
  background: "#1a1a1a",
  border: `1px solid ${COLORS.border}`,
  borderRadius: 6,
  padding: "8px 12px",
  color: COLORS.text,
  fontSize: 13,
  outline: "none",
  width: "100%",
}

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: "pointer",
  appearance: "auto" as const,
}

const btnBase: React.CSSProperties = {
  border: "none",
  borderRadius: 6,
  padding: "8px 16px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  transition: "background 0.15s, opacity 0.15s",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
}

const btnPrimary: React.CSSProperties = {
  ...btnBase,
  background: COLORS.accent,
  color: COLORS.white,
}

const btnSecondary: React.CSSProperties = {
  ...btnBase,
  background: COLORS.border,
  color: COLORS.text,
}

const btnDanger: React.CSSProperties = {
  ...btnBase,
  background: COLORS.danger,
  color: COLORS.white,
}

const btnSmall: React.CSSProperties = {
  padding: "6px 12px",
  fontSize: 12,
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function Badge({
  label,
  colorMap,
}: {
  label: string
  colorMap: Record<string, { bg: string; text: string }>
}) {
  const c = colorMap[label] || { bg: COLORS.border, text: COLORS.textMuted }
  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        padding: "3px 10px",
        borderRadius: 12,
        fontSize: 11,
        fontWeight: 600,
        textTransform: "capitalize",
        whiteSpace: "nowrap",
        letterSpacing: "0.02em",
      }}
    >
      {label.replace("_", " ")}
    </span>
  )
}

function SlaIndicator({ submission }: { submission: ContactSubmission }) {
  if (!submission.response_due_at) {
    return <span style={{ color: COLORS.textDim, fontSize: 12 }}>--</span>
  }
  if (
    ["resolved", "archived"].includes(submission.status) &&
    submission.first_response_at
  ) {
    return <span style={{ color: COLORS.success, fontSize: 14 }}>&#10003;</span>
  }
  const now = new Date()
  const due = new Date(submission.response_due_at)
  const isBreached = now > due && !submission.first_response_at
  if (isBreached) {
    const overdueMs = now.getTime() - due.getTime()
    const overdueH = Math.round(overdueMs / (1000 * 60 * 60))
    return (
      <span
        title={`Overdue by ${overdueH}h`}
        style={{ color: COLORS.danger, fontSize: 14, cursor: "help" }}
      >
        &#9888; {overdueH}h
      </span>
    )
  }
  if (submission.first_response_at) {
    return <span style={{ color: COLORS.success, fontSize: 14 }}>&#10003;</span>
  }
  const remainMs = due.getTime() - now.getTime()
  const remainH = Math.round(remainMs / (1000 * 60 * 60))
  return (
    <span
      title={`${remainH}h remaining`}
      style={{
        color: remainH <= 2 ? COLORS.warning : COLORS.success,
        fontSize: 12,
        cursor: "help",
      }}
    >
      {remainH}h left
    </span>
  )
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatDateTime(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function timeAgo(dateStr: string): string {
  const now = new Date()
  const d = new Date(dateStr)
  const diffMs = now.getTime() - d.getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return formatDate(dateStr)
}

// ---------------------------------------------------------------------------
// Stat Card
// ---------------------------------------------------------------------------

function StatCard({
  label,
  value,
  accent,
}: {
  label: string
  value: string | number
  accent?: boolean
}) {
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 10,
        padding: "18px 22px",
        flex: "1 1 0",
        minWidth: 150,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: COLORS.textMuted,
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: accent ? COLORS.accent : COLORS.text,
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

const ContactSubmissionsPage = () => {
  // List state
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [stats, setStats] = useState<ContactStats | null>(null)
  const [slaBreaches, setSlaBreaches] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters
  const [filterStatus, setFilterStatus] = useState("")
  const [filterPriority, setFilterPriority] = useState("")
  const [searchEmail, setSearchEmail] = useState("")
  const [page, setPage] = useState(0)
  const PAGE_SIZE = 25

  // Detail view state
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [detail, setDetail] = useState<ContactSubmission | null>(null)
  const [replies, setReplies] = useState<ContactReply[]>([])
  const [detailLoading, setDetailLoading] = useState(false)

  // Reply form
  const [replyText, setReplyText] = useState("")
  const [replySending, setReplySending] = useState(false)

  // Action states
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Confirm delete dialog
  const [confirmDelete, setConfirmDelete] = useState(false)

  // -----------------------------------------------------------------------
  // Fetch list
  // -----------------------------------------------------------------------

  const fetchSubmissions = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (filterStatus) params.set("status", filterStatus)
      if (filterPriority) params.set("priority", filterPriority)
      params.set("limit", String(PAGE_SIZE))
      params.set("offset", String(page * PAGE_SIZE))

      const res = await fetch(`/admin/contact-submissions?${params}`, {
        credentials: "include",
      })
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const data = await res.json()
      setSubmissions(data.contact_submissions || [])
      setTotalCount(data.count || 0)
      setStats(data.stats || null)
      setSlaBreaches(data.sla_breaches || 0)
    } catch (e: any) {
      setError(e.message || "Failed to fetch submissions")
    } finally {
      setLoading(false)
    }
  }, [filterStatus, filterPriority, page])

  useEffect(() => {
    fetchSubmissions()
  }, [fetchSubmissions])

  // -----------------------------------------------------------------------
  // Fetch detail
  // -----------------------------------------------------------------------

  const fetchDetail = useCallback(async (id: string) => {
    setDetailLoading(true)
    try {
      const res = await fetch(`/admin/contact-submissions/${id}`, {
        credentials: "include",
      })
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const data = await res.json()
      setDetail(data.contact_submission)
      setReplies(data.replies || [])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setDetailLoading(false)
    }
  }, [])

  useEffect(() => {
    if (selectedId) {
      fetchDetail(selectedId)
      setReplyText("")
      setConfirmDelete(false)
    }
  }, [selectedId, fetchDetail])

  // -----------------------------------------------------------------------
  // Actions
  // -----------------------------------------------------------------------

  const updateSubmission = async (
    id: string,
    body: Record<string, string | undefined>
  ) => {
    setActionLoading(Object.keys(body)[0] || "action")
    try {
      const res = await fetch(`/admin/contact-submissions/${id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      const data = await res.json()
      setDetail(data.contact_submission)
      fetchSubmissions()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setActionLoading(null)
    }
  }

  const deleteSubmission = async (id: string) => {
    setActionLoading("delete")
    try {
      await fetch(`/admin/contact-submissions/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      setSelectedId(null)
      setDetail(null)
      fetchSubmissions()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setActionLoading(null)
      setConfirmDelete(false)
    }
  }

  const sendReply = async () => {
    if (!replyText.trim() || !selectedId) return
    setReplySending(true)
    try {
      const res = await fetch(
        `/admin/contact-submissions/${selectedId}/reply`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: replyText.trim(),
            sender_name: "ORYN Support",
          }),
        }
      )
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      setReplyText("")
      fetchDetail(selectedId)
      fetchSubmissions()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setReplySending(false)
    }
  }

  // -----------------------------------------------------------------------
  // Filtered submissions (client-side email search)
  // -----------------------------------------------------------------------

  const displayed = searchEmail
    ? submissions.filter((s) =>
        s.email.toLowerCase().includes(searchEmail.toLowerCase())
      )
    : submissions

  // -----------------------------------------------------------------------
  // Render: Detail View
  // -----------------------------------------------------------------------

  if (selectedId) {
    if (detailLoading && !detail) {
      return (
        <div style={{ background: COLORS.bg, minHeight: "100vh", padding: 32 }}>
          <div style={{ color: COLORS.textMuted, fontSize: 14 }}>
            Loading submission...
          </div>
        </div>
      )
    }

    if (!detail) {
      return (
        <div style={{ background: COLORS.bg, minHeight: "100vh", padding: 32 }}>
          <div style={{ color: COLORS.danger, fontSize: 14, marginBottom: 16 }}>
            Submission not found.
          </div>
          <button
            style={btnSecondary}
            onClick={() => setSelectedId(null)}
          >
            Back to list
          </button>
        </div>
      )
    }

    return (
      <div
        style={{
          background: COLORS.bg,
          minHeight: "100vh",
          padding: "24px 32px",
          color: COLORS.text,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Error banner */}
        {error && (
          <div
            style={{
              background: "#7f1d1d",
              border: "1px solid #991b1b",
              borderRadius: 8,
              padding: "12px 16px",
              marginBottom: 16,
              color: "#fca5a5",
              fontSize: 13,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              style={{
                background: "none",
                border: "none",
                color: "#fca5a5",
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              &#10005;
            </button>
          </div>
        )}

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <button
            style={{ ...btnSecondary, ...btnSmall }}
            onClick={() => {
              setSelectedId(null)
              setDetail(null)
              setReplies([])
            }}
          >
            &#8592; Back
          </button>
          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 700,
                margin: 0,
                color: COLORS.text,
              }}
            >
              {detail.first_name} {detail.last_name}
            </h1>
            <div
              style={{
                fontSize: 12,
                color: COLORS.textMuted,
                marginTop: 4,
              }}
            >
              Submitted {formatDateTime(detail.created_at)} &middot;{" "}
              {timeAgo(detail.created_at)}
            </div>
          </div>
          <Badge label={detail.priority} colorMap={PRIORITY_COLORS} />
          <Badge label={detail.status} colorMap={STATUS_COLORS} />
        </div>

        <div style={{ display: "flex", gap: 24 }}>
          {/* Left column: submission info + conversation */}
          <div style={{ flex: "1 1 0", minWidth: 0 }}>
            {/* Submission details card */}
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: 24,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px 32px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: COLORS.textMuted,
                      marginBottom: 4,
                    }}
                  >
                    Email
                  </div>
                  <a
                    href={`mailto:${detail.email}`}
                    style={{ color: COLORS.accent, textDecoration: "none", fontSize: 14 }}
                  >
                    {detail.email}
                  </a>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: COLORS.textMuted,
                      marginBottom: 4,
                    }}
                  >
                    Phone
                  </div>
                  <div style={{ fontSize: 14 }}>
                    {detail.phone || "--"}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: COLORS.textMuted,
                      marginBottom: 4,
                    }}
                  >
                    Organization
                  </div>
                  <div style={{ fontSize: 14 }}>
                    {detail.organization || "--"}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: COLORS.textMuted,
                      marginBottom: 4,
                    }}
                  >
                    Inquiry Type
                  </div>
                  <div style={{ fontSize: 14, textTransform: "capitalize" }}>
                    {detail.inquiry_type}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: COLORS.textMuted,
                      marginBottom: 4,
                    }}
                  >
                    Source
                  </div>
                  <div style={{ fontSize: 14 }}>
                    {SOURCE_LABELS[detail.source] || detail.source}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: COLORS.textMuted,
                      marginBottom: 4,
                    }}
                  >
                    Assigned To
                  </div>
                  <div style={{ fontSize: 14 }}>
                    {detail.assigned_to || "Unassigned"}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: COLORS.textMuted,
                      marginBottom: 4,
                    }}
                  >
                    SLA Due
                  </div>
                  <div style={{ fontSize: 14 }}>
                    {detail.response_due_at
                      ? formatDateTime(detail.response_due_at)
                      : "--"}
                    {" "}
                    <SlaIndicator submission={detail} />
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: COLORS.textMuted,
                      marginBottom: 4,
                    }}
                  >
                    First Response
                  </div>
                  <div style={{ fontSize: 14 }}>
                    {detail.first_response_at
                      ? formatDateTime(detail.first_response_at)
                      : "No response yet"}
                  </div>
                </div>
              </div>

              {/* Original message */}
              <div style={{ marginTop: 20 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: COLORS.textMuted,
                    marginBottom: 8,
                  }}
                >
                  Original Message
                </div>
                <div
                  style={{
                    background: COLORS.bg,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 8,
                    padding: 16,
                    fontSize: 14,
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {detail.message}
                </div>
              </div>

              {/* Admin notes */}
              {detail.admin_notes && (
                <div style={{ marginTop: 16 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: COLORS.textMuted,
                      marginBottom: 8,
                    }}
                  >
                    Admin Notes
                  </div>
                  <div
                    style={{
                      background: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: 8,
                      padding: 16,
                      fontSize: 13,
                      lineHeight: 1.5,
                      whiteSpace: "pre-wrap",
                      color: "#94a3b8",
                    }}
                  >
                    {detail.admin_notes}
                  </div>
                </div>
              )}
            </div>

            {/* Conversation thread */}
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: 24,
                marginBottom: 20,
              }}
            >
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  margin: "0 0 16px 0",
                  color: COLORS.text,
                }}
              >
                Conversation ({replies.length}{" "}
                {replies.length === 1 ? "reply" : "replies"})
              </h3>

              {replies.length === 0 ? (
                <div
                  style={{
                    color: COLORS.textMuted,
                    fontSize: 13,
                    padding: "20px 0",
                    textAlign: "center",
                  }}
                >
                  No replies yet. Send the first response below.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {replies.map((reply) => {
                    const isAdmin = reply.sender_type === "admin"
                    return (
                      <div
                        key={reply.id}
                        style={{
                          background: isAdmin ? "#1e293b" : COLORS.bg,
                          border: `1px solid ${isAdmin ? "#334155" : COLORS.border}`,
                          borderRadius: 8,
                          padding: 16,
                          borderLeft: `3px solid ${isAdmin ? COLORS.accent : COLORS.info}`,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 8,
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: isAdmin ? COLORS.accent : COLORS.info,
                              }}
                            >
                              {reply.sender_name}
                            </span>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 600,
                                textTransform: "uppercase",
                                padding: "2px 6px",
                                borderRadius: 4,
                                background: isAdmin ? "#7c2d12" : "#1e3a5f",
                                color: isAdmin ? "#fdba74" : "#93c5fd",
                              }}
                            >
                              {reply.sender_type}
                            </span>
                          </div>
                          <span style={{ fontSize: 11, color: COLORS.textDim }}>
                            {formatDateTime(reply.created_at)}
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            lineHeight: 1.6,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {reply.message}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Reply form */}
              <div
                style={{
                  marginTop: 20,
                  borderTop: `1px solid ${COLORS.border}`,
                  paddingTop: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: COLORS.text,
                  }}
                >
                  Reply to {detail.first_name}
                </div>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply... This will be emailed to the customer."
                  rows={4}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: 100,
                    marginBottom: 12,
                    lineHeight: 1.5,
                  }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    style={{
                      ...btnPrimary,
                      opacity: replySending || !replyText.trim() ? 0.5 : 1,
                      cursor:
                        replySending || !replyText.trim()
                          ? "not-allowed"
                          : "pointer",
                    }}
                    disabled={replySending || !replyText.trim()}
                    onClick={sendReply}
                  >
                    {replySending ? "Sending..." : "Send Reply"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: actions sidebar */}
          <div style={{ width: 280, flexShrink: 0 }}>
            {/* Status actions */}
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: 20,
                marginBottom: 16,
              }}
            >
              <h4
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: COLORS.textMuted,
                  margin: "0 0 12px 0",
                  letterSpacing: "0.05em",
                }}
              >
                Change Status
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {(
                  [
                    "new",
                    "read",
                    "in_progress",
                    "replied",
                    "resolved",
                    "archived",
                  ] as const
                ).map((s) => (
                  <button
                    key={s}
                    style={{
                      ...btnSecondary,
                      ...btnSmall,
                      width: "100%",
                      justifyContent: "flex-start",
                      opacity:
                        detail.status === s || actionLoading === "status"
                          ? 0.5
                          : 1,
                      background:
                        detail.status === s ? COLORS.border : "transparent",
                      border: `1px solid ${COLORS.border}`,
                    }}
                    disabled={detail.status === s || actionLoading === "status"}
                    onClick={() => updateSubmission(detail.id, { status: s })}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: STATUS_COLORS[s]?.text || COLORS.textMuted,
                        display: "inline-block",
                      }}
                    />
                    {s.replace("_", " ")}
                    {detail.status === s && " (current)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority actions */}
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: 20,
                marginBottom: 16,
              }}
            >
              <h4
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: COLORS.textMuted,
                  margin: "0 0 12px 0",
                  letterSpacing: "0.05em",
                }}
              >
                Change Priority
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {(["low", "medium", "high", "urgent"] as const).map((p) => (
                  <button
                    key={p}
                    style={{
                      ...btnSecondary,
                      ...btnSmall,
                      flex: "1 1 calc(50% - 3px)",
                      justifyContent: "center",
                      opacity:
                        detail.priority === p || actionLoading === "priority"
                          ? 0.5
                          : 1,
                      background:
                        detail.priority === p
                          ? PRIORITY_COLORS[p].bg
                          : "transparent",
                      color:
                        detail.priority === p
                          ? PRIORITY_COLORS[p].text
                          : COLORS.text,
                      border: `1px solid ${COLORS.border}`,
                      textTransform: "capitalize",
                    }}
                    disabled={
                      detail.priority === p || actionLoading === "priority"
                    }
                    onClick={() => updateSubmission(detail.id, { priority: p })}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Assign */}
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: 20,
                marginBottom: 16,
              }}
            >
              <h4
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: COLORS.textMuted,
                  margin: "0 0 12px 0",
                  letterSpacing: "0.05em",
                }}
              >
                Assign To
              </h4>
              <div style={{ display: "flex", gap: 6 }}>
                <input
                  type="text"
                  placeholder="Agent name..."
                  defaultValue={detail.assigned_to || ""}
                  id="assign-input"
                  style={{ ...inputStyle, flex: 1 }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const val = (e.target as HTMLInputElement).value
                      updateSubmission(detail.id, {
                        assigned_to: val || undefined,
                      })
                    }
                  }}
                />
                <button
                  style={{ ...btnPrimary, ...btnSmall }}
                  onClick={() => {
                    const el = document.getElementById(
                      "assign-input"
                    ) as HTMLInputElement
                    if (el) {
                      updateSubmission(detail.id, {
                        assigned_to: el.value || undefined,
                      })
                    }
                  }}
                >
                  Set
                </button>
              </div>
            </div>

            {/* Danger zone */}
            <div
              style={{
                background: COLORS.card,
                border: `1px solid #991b1b`,
                borderRadius: 10,
                padding: 20,
              }}
            >
              <h4
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: COLORS.danger,
                  margin: "0 0 12px 0",
                  letterSpacing: "0.05em",
                }}
              >
                Danger Zone
              </h4>
              {!confirmDelete ? (
                <button
                  style={{ ...btnDanger, ...btnSmall, width: "100%", justifyContent: "center" }}
                  onClick={() => setConfirmDelete(true)}
                >
                  Delete Submission
                </button>
              ) : (
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#fca5a5",
                      marginBottom: 10,
                      lineHeight: 1.4,
                    }}
                  >
                    This will permanently delete this submission and all replies.
                    Are you sure?
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      style={{
                        ...btnDanger,
                        ...btnSmall,
                        flex: 1,
                        justifyContent: "center",
                        opacity: actionLoading === "delete" ? 0.5 : 1,
                      }}
                      disabled={actionLoading === "delete"}
                      onClick={() => deleteSubmission(detail.id)}
                    >
                      {actionLoading === "delete" ? "Deleting..." : "Confirm"}
                    </button>
                    <button
                      style={{
                        ...btnSecondary,
                        ...btnSmall,
                        flex: 1,
                        justifyContent: "center",
                      }}
                      onClick={() => setConfirmDelete(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // -----------------------------------------------------------------------
  // Render: List View
  // -----------------------------------------------------------------------

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div
      style={{
        background: COLORS.bg,
        minHeight: "100vh",
        padding: "24px 32px",
        color: COLORS.text,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Page header */}
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            margin: 0,
            color: COLORS.text,
          }}
        >
          Contact Submissions
        </h1>
        <p style={{ margin: "6px 0 0 0", fontSize: 13, color: COLORS.textMuted }}>
          Manage customer inquiries, track SLA compliance, and respond to
          messages.
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div
          style={{
            background: "#7f1d1d",
            border: "1px solid #991b1b",
            borderRadius: 8,
            padding: "12px 16px",
            marginBottom: 16,
            color: "#fca5a5",
            fontSize: 13,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            style={{
              background: "none",
              border: "none",
              color: "#fca5a5",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            &#10005;
          </button>
        </div>
      )}

      {/* SLA breach warning banner */}
      {slaBreaches > 0 && (
        <div
          style={{
            background: "#7f1d1d",
            border: "1px solid #dc2626",
            borderRadius: 8,
            padding: "14px 20px",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 20 }}>&#9888;</span>
          <div>
            <div
              style={{
                color: "#fca5a5",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              SLA Breach Alert
            </div>
            <div style={{ color: "#fca5a5", fontSize: 12, marginTop: 2 }}>
              {slaBreaches} submission{slaBreaches !== 1 ? "s have" : " has"}{" "}
              exceeded their response deadline. Immediate attention required.
            </div>
          </div>
        </div>
      )}

      {/* Stats bar */}
      {stats && (
        <div
          style={{
            display: "flex",
            gap: 14,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <StatCard label="Total Submissions" value={stats.total} />
          <StatCard label="Open" value={stats.open_count} accent />
          <StatCard label="SLA Breaches" value={stats.sla_breaches} />
          <StatCard
            label="Avg Response"
            value={
              stats.avg_response_hours > 0
                ? `${stats.avg_response_hours}h`
                : "--"
            }
          />
        </div>
      )}

      {/* Filters */}
      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 10,
          padding: "16px 20px",
          marginBottom: 20,
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "0 0 auto" }}>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              color: COLORS.textMuted,
              display: "block",
              marginBottom: 4,
              letterSpacing: "0.05em",
            }}
          >
            Status
          </label>
          <select
            style={{ ...selectStyle, width: 160 }}
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value)
              setPage(0)
            }}
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="in_progress">In Progress</option>
            <option value="replied">Replied</option>
            <option value="resolved">Resolved</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div style={{ flex: "0 0 auto" }}>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              color: COLORS.textMuted,
              display: "block",
              marginBottom: 4,
              letterSpacing: "0.05em",
            }}
          >
            Priority
          </label>
          <select
            style={{ ...selectStyle, width: 160 }}
            value={filterPriority}
            onChange={(e) => {
              setFilterPriority(e.target.value)
              setPage(0)
            }}
          >
            <option value="">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div style={{ flex: "1 1 200px" }}>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              color: COLORS.textMuted,
              display: "block",
              marginBottom: 4,
              letterSpacing: "0.05em",
            }}
          >
            Search by Email
          </label>
          <input
            type="text"
            placeholder="Filter by email address..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            style={{ ...inputStyle, maxWidth: 320 }}
          />
        </div>

        <div style={{ flex: "0 0 auto", alignSelf: "flex-end" }}>
          <button
            style={{ ...btnPrimary, ...btnSmall }}
            onClick={() => {
              setFilterStatus("")
              setFilterPriority("")
              setSearchEmail("")
              setPage(0)
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 0",
            color: COLORS.textMuted,
            fontSize: 14,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              border: `3px solid ${COLORS.border}`,
              borderTopColor: COLORS.accent,
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px auto",
            }}
          />
          Loading submissions...
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Empty state */}
      {!loading && displayed.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 0",
            color: COLORS.textMuted,
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }}>
            &#9993;
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
            No submissions found
          </div>
          <div style={{ fontSize: 13 }}>
            {filterStatus || filterPriority || searchEmail
              ? "Try adjusting your filters."
              : "No contact submissions have been received yet."}
          </div>
        </div>
      )}

      {/* Table */}
      {!loading && displayed.length > 0 && (
        <div
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: `1px solid ${COLORS.border}`,
                    textAlign: "left",
                  }}
                >
                  {[
                    "Priority",
                    "Name",
                    "Email",
                    "Type",
                    "Status",
                    "Source",
                    "Date",
                    "SLA",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 14px",
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: COLORS.textMuted,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayed.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => {
                      setSelectedId(s.id)
                      if (s.status === "new") {
                        fetch(`/admin/contact-submissions/${s.id}`, {
                          method: "POST",
                          credentials: "include",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ status: "read" }),
                        })
                      }
                    }}
                    style={{
                      borderBottom: `1px solid ${COLORS.border}`,
                      cursor: "pointer",
                      transition: "background 0.1s",
                      background:
                        s.status === "new"
                          ? "rgba(255, 106, 26, 0.04)"
                          : "transparent",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = COLORS.cardHover)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        s.status === "new"
                          ? "rgba(255, 106, 26, 0.04)"
                          : "transparent")
                    }
                  >
                    <td style={{ padding: "10px 14px" }}>
                      <Badge label={s.priority} colorMap={PRIORITY_COLORS} />
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        fontWeight: s.status === "new" ? 600 : 400,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.first_name} {s.last_name}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        color: COLORS.textMuted,
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.email}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        textTransform: "capitalize",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.inquiry_type}
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <Badge label={s.status} colorMap={STATUS_COLORS} />
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        color: COLORS.textMuted,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {SOURCE_LABELS[s.source] || s.source}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        whiteSpace: "nowrap",
                        color: COLORS.textMuted,
                      }}
                    >
                      <span title={formatDateTime(s.created_at)}>
                        {timeAgo(s.created_at)}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <SlaIndicator submission={s} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 20px",
                borderTop: `1px solid ${COLORS.border}`,
              }}
            >
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>
                Showing {page * PAGE_SIZE + 1}--
                {Math.min((page + 1) * PAGE_SIZE, totalCount)} of {totalCount}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  style={{
                    ...btnSecondary,
                    ...btnSmall,
                    opacity: page === 0 ? 0.4 : 1,
                    cursor: page === 0 ? "not-allowed" : "pointer",
                  }}
                  disabled={page === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                  &#8592; Prev
                </button>
                <span
                  style={{
                    fontSize: 12,
                    color: COLORS.textMuted,
                    padding: "6px 10px",
                  }}
                >
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  style={{
                    ...btnSecondary,
                    ...btnSmall,
                    opacity: page >= totalPages - 1 ? 0.4 : 1,
                    cursor:
                      page >= totalPages - 1 ? "not-allowed" : "pointer",
                  }}
                  disabled={page >= totalPages - 1}
                  onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                >
                  Next &#8594;
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export const config = defineRouteConfig({
  label: "Contact Submissions",
})

export default ContactSubmissionsPage
