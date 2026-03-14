import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useState, useEffect, useCallback } from "react"

// ─── Types ──────────────────────────────────────────────────────────────────

type EmailDirection = "outbound" | "inbound"
type EmailStatus = "sent" | "delivered" | "opened" | "clicked" | "bounced" | "failed"

type EmailLog = {
  id: string
  direction: EmailDirection
  from: string
  to: string
  subject: string
  status: EmailStatus
  html_body?: string
  text_body?: string
  metadata?: Record<string, unknown>
  error?: string
  opened_at?: string
  clicked_at?: string
  delivered_at?: string
  bounced_at?: string
  created_at: string
  updated_at: string
}

type EmailTemplate = {
  id: string
  name: string
  slug: string
  category: string
  description: string
  subject_template: string
  html_template: string
  variables: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

type EmailStats = {
  total_sent: number
  total_delivered: number
  total_opened: number
  total_bounced: number
  total_failed: number
  total_inbound: number
  delivery_rate: number
  open_rate: number
  bounce_rate: number
}

type Tab = "dashboard" | "logs" | "templates"

// ─── Styles ─────────────────────────────────────────────────────────────────

const colors = {
  bg: "#1a1a1a",
  card: "#252525",
  cardHover: "#2a2a2a",
  border: "#333",
  borderLight: "#444",
  accent: "#FF6A1A",
  accentHover: "#e55e15",
  accentSubtle: "rgba(255, 106, 26, 0.12)",
  text: "#e0e0e0",
  textMuted: "#999",
  textDim: "#777",
  white: "#fff",
  success: "#22c55e",
  successBg: "rgba(34, 197, 94, 0.15)",
  info: "#3b82f6",
  infoBg: "rgba(59, 130, 246, 0.15)",
  cyan: "#06b6d4",
  cyanBg: "rgba(6, 182, 212, 0.15)",
  purple: "#a855f7",
  purpleBg: "rgba(168, 85, 247, 0.15)",
  danger: "#ef4444",
  dangerBg: "rgba(239, 68, 68, 0.15)",
  warning: "#f59e0b",
  warningBg: "rgba(245, 158, 11, 0.15)",
}

const statusConfig: Record<EmailStatus, { color: string; bg: string; label: string }> = {
  sent: { color: colors.info, bg: colors.infoBg, label: "Sent" },
  delivered: { color: colors.success, bg: colors.successBg, label: "Delivered" },
  opened: { color: colors.cyan, bg: colors.cyanBg, label: "Opened" },
  clicked: { color: colors.purple, bg: colors.purpleBg, label: "Clicked" },
  bounced: { color: colors.danger, bg: colors.dangerBg, label: "Bounced" },
  failed: { color: colors.danger, bg: colors.dangerBg, label: "Failed" },
}

// ─── Utility Helpers ────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function formatDateShort(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function truncate(str: string, len: number): string {
  if (str.length <= len) return str
  return str.slice(0, len) + "..."
}

// ─── Sub-Components ─────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  subtitle,
  accentColor,
  icon,
}: {
  label: string
  value: string | number
  subtitle?: string
  accentColor: string
  icon: string
}) {
  return (
    <div
      style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: "24px",
        flex: "1 1 0",
        minWidth: 180,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: accentColor,
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <span style={{ color: colors.textMuted, fontSize: 13, fontWeight: 500, letterSpacing: 0.3 }}>
          {label}
        </span>
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color: colors.white, lineHeight: 1 }}>
        {value}
      </div>
      {subtitle && (
        <div style={{ color: colors.textDim, fontSize: 12, marginTop: 8 }}>{subtitle}</div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: EmailStatus }) {
  const cfg = statusConfig[status] || statusConfig.sent
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        color: cfg.color,
        background: cfg.bg,
        border: `1px solid ${cfg.color}33`,
        textTransform: "capitalize",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: cfg.color,
          flexShrink: 0,
        }}
      />
      {cfg.label}
    </span>
  )
}

function DirectionBadge({ direction }: { direction: EmailDirection }) {
  const isOut = direction === "outbound"
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 8px",
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 600,
        color: isOut ? colors.info : colors.success,
        background: isOut ? colors.infoBg : colors.successBg,
        textTransform: "uppercase",
        letterSpacing: 0.5,
      }}
    >
      <span style={{ fontSize: 13 }}>{isOut ? "\u2191" : "\u2193"}</span>
      {direction}
    </span>
  )
}

function TabButton({
  label,
  active,
  onClick,
  count,
}: {
  label: string
  active: boolean
  onClick: () => void
  count?: number
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        background: active ? colors.accent : "transparent",
        color: active ? colors.white : colors.textMuted,
        border: active ? `1px solid ${colors.accent}` : `1px solid ${colors.border}`,
        borderRadius: 8,
        cursor: "pointer",
        fontSize: 14,
        fontWeight: active ? 600 : 500,
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "all 0.15s ease",
      }}
    >
      {label}
      {count !== undefined && (
        <span
          style={{
            background: active ? "rgba(255,255,255,0.2)" : colors.border,
            padding: "1px 7px",
            borderRadius: 10,
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {count}
        </span>
      )}
    </button>
  )
}

function FilterSelect({
  value,
  onChange,
  options,
  label,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  label: string
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ color: colors.textMuted, fontSize: 13, fontWeight: 500 }}>{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: colors.card,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          borderRadius: 6,
          padding: "6px 12px",
          fontSize: 13,
          cursor: "pointer",
          outline: "none",
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          border: `3px solid ${colors.border}`,
          borderTop: `3px solid ${colors.accent}`,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <span style={{ color: colors.textMuted, fontSize: 14 }}>Loading...</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function EmptyState({ message, icon }: { message: string; icon: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        gap: 12,
      }}
    >
      <span style={{ fontSize: 40, opacity: 0.4 }}>{icon}</span>
      <span style={{ color: colors.textDim, fontSize: 14 }}>{message}</span>
    </div>
  )
}

function ErrorBanner({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div
      style={{
        background: colors.dangerBg,
        border: `1px solid ${colors.danger}44`,
        borderRadius: 8,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        margin: "12px 0",
      }}
    >
      <span style={{ color: colors.danger, fontSize: 13 }}>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: colors.danger,
            color: colors.white,
            border: "none",
            borderRadius: 6,
            padding: "5px 14px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      )}
    </div>
  )
}

// ─── Modal / Preview Panel ──────────────────────────────────────────────────

function PreviewModal({
  title,
  html,
  onClose,
}: {
  title: string
  html: string
  onClose: () => void
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: 24,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        style={{
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
          width: "100%",
          maxWidth: 800,
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <span style={{ color: colors.white, fontSize: 16, fontWeight: 600 }}>{title}</span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: `1px solid ${colors.border}`,
              borderRadius: 6,
              color: colors.textMuted,
              cursor: "pointer",
              padding: "4px 10px",
              fontSize: 13,
            }}
          >
            Close
          </button>
        </div>
        <div
          style={{
            flex: 1,
            overflow: "auto",
            padding: 0,
            background: "#fff",
          }}
        >
          <iframe
            srcDoc={html}
            style={{
              width: "100%",
              minHeight: 500,
              border: "none",
            }}
            title="Email Preview"
            sandbox="allow-same-origin"
          />
        </div>
      </div>
    </div>
  )
}

// ─── Email Detail Drawer ────────────────────────────────────────────────────

function EmailDetailPanel({ log, onClose }: { log: EmailLog; onClose: () => void }) {
  const [showHtml, setShowHtml] = useState(false)

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 9998,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          background: colors.bg,
          borderLeft: `1px solid ${colors.border}`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "slideIn 0.2s ease-out",
        }}
      >
        <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: `1px solid ${colors.border}`,
            background: colors.card,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 600, color: colors.white }}>
              Email Detail
            </span>
            <DirectionBadge direction={log.direction} />
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: `1px solid ${colors.border}`,
              borderRadius: 6,
              color: colors.textMuted,
              cursor: "pointer",
              padding: "4px 10px",
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Status */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <StatusBadge status={log.status} />
              <span style={{ color: colors.textDim, fontSize: 12 }}>
                {formatDate(log.created_at)}
              </span>
            </div>

            {/* Fields */}
            {[
              { label: "From", value: log.from },
              { label: "To", value: log.to },
              { label: "Subject", value: log.subject },
              { label: "ID", value: log.id },
            ].map((field) => (
              <div key={field.label}>
                <div
                  style={{
                    color: colors.textMuted,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    marginBottom: 4,
                    fontWeight: 600,
                  }}
                >
                  {field.label}
                </div>
                <div
                  style={{
                    color: colors.text,
                    fontSize: 14,
                    wordBreak: "break-all",
                    background: colors.card,
                    padding: "8px 12px",
                    borderRadius: 6,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  {field.value}
                </div>
              </div>
            ))}

            {/* Timestamps */}
            <div>
              <div
                style={{
                  color: colors.textMuted,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  marginBottom: 8,
                  fontWeight: 600,
                }}
              >
                Timeline
              </div>
              <div
                style={{
                  background: colors.card,
                  borderRadius: 8,
                  border: `1px solid ${colors.border}`,
                  overflow: "hidden",
                }}
              >
                {[
                  { label: "Created", value: log.created_at },
                  { label: "Delivered", value: log.delivered_at },
                  { label: "Opened", value: log.opened_at },
                  { label: "Clicked", value: log.clicked_at },
                  { label: "Bounced", value: log.bounced_at },
                ]
                  .filter((t) => t.value)
                  .map((t, i) => (
                    <div
                      key={t.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 12px",
                        borderTop: i > 0 ? `1px solid ${colors.border}` : "none",
                        fontSize: 13,
                      }}
                    >
                      <span style={{ color: colors.textMuted }}>{t.label}</span>
                      <span style={{ color: colors.text }}>{formatDate(t.value!)}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Error */}
            {log.error && (
              <div>
                <div
                  style={{
                    color: colors.danger,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    marginBottom: 4,
                    fontWeight: 600,
                  }}
                >
                  Error
                </div>
                <div
                  style={{
                    color: colors.danger,
                    fontSize: 13,
                    background: colors.dangerBg,
                    padding: "10px 12px",
                    borderRadius: 6,
                    border: `1px solid ${colors.danger}44`,
                    fontFamily: "monospace",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                  }}
                >
                  {log.error}
                </div>
              </div>
            )}

            {/* Body preview */}
            {(log.html_body || log.text_body) && (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      color: colors.textMuted,
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: 0.8,
                      fontWeight: 600,
                    }}
                  >
                    Body
                  </span>
                  {log.html_body && (
                    <button
                      onClick={() => setShowHtml(true)}
                      style={{
                        background: colors.accentSubtle,
                        color: colors.accent,
                        border: `1px solid ${colors.accent}44`,
                        borderRadius: 6,
                        padding: "4px 12px",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Preview HTML
                    </button>
                  )}
                </div>
                <div
                  style={{
                    background: colors.card,
                    padding: "12px",
                    borderRadius: 6,
                    border: `1px solid ${colors.border}`,
                    fontSize: 13,
                    color: colors.text,
                    whiteSpace: "pre-wrap",
                    maxHeight: 200,
                    overflow: "auto",
                    fontFamily: "monospace",
                    lineHeight: 1.5,
                  }}
                >
                  {log.text_body || "(HTML only - click Preview to view)"}
                </div>
              </div>
            )}

            {/* Metadata */}
            {log.metadata && Object.keys(log.metadata).length > 0 && (
              <div>
                <div
                  style={{
                    color: colors.textMuted,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    marginBottom: 4,
                    fontWeight: 600,
                  }}
                >
                  Metadata
                </div>
                <div
                  style={{
                    background: colors.card,
                    padding: "10px 12px",
                    borderRadius: 6,
                    border: `1px solid ${colors.border}`,
                    fontSize: 12,
                    color: colors.textMuted,
                    fontFamily: "monospace",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                  }}
                >
                  {JSON.stringify(log.metadata, null, 2)}
                </div>
              </div>
            )}
          </div>
        </div>

        {showHtml && log.html_body && (
          <PreviewModal
            title={`Preview: ${log.subject}`}
            html={log.html_body}
            onClose={() => setShowHtml(false)}
          />
        )}
      </div>
    </div>
  )
}

// ─── Dashboard Tab ──────────────────────────────────────────────────────────

function DashboardTab({ stats, loading, error, onRetry }: {
  stats: EmailStats | null
  loading: boolean
  error: string | null
  onRetry: () => void
}) {
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorBanner message={error} onRetry={onRetry} />
  if (!stats) return <EmptyState message="No email data available yet." icon="📊" />

  const statusDistribution = [
    { label: "Delivered", count: stats.total_delivered, color: colors.success },
    { label: "Opened", count: stats.total_opened, color: colors.cyan },
    { label: "Bounced", count: stats.total_bounced, color: colors.danger },
    { label: "Failed", count: stats.total_failed, color: colors.warning },
  ]

  const maxCount = Math.max(...statusDistribution.map((s) => s.count), 1)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* KPI Cards */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <KpiCard
          label="Total Sent"
          value={stats.total_sent.toLocaleString()}
          subtitle="All outbound emails"
          accentColor={colors.accent}
          icon="📤"
        />
        <KpiCard
          label="Delivered"
          value={stats.total_delivered.toLocaleString()}
          subtitle={`${stats.delivery_rate.toFixed(1)}% delivery rate`}
          accentColor={colors.success}
          icon="✅"
        />
        <KpiCard
          label="Opened"
          value={stats.total_opened.toLocaleString()}
          subtitle={`${stats.open_rate.toFixed(1)}% open rate`}
          accentColor={colors.cyan}
          icon="👁"
        />
        <KpiCard
          label="Bounced"
          value={stats.total_bounced.toLocaleString()}
          subtitle={`${stats.bounce_rate.toFixed(1)}% bounce rate`}
          accentColor={colors.danger}
          icon="🔴"
        />
      </div>

      {/* Second row */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {/* Inbound */}
        <div
          style={{
            background: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            padding: 24,
            flex: "1 1 280px",
            minWidth: 280,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 22 }}>📥</span>
            <span
              style={{
                color: colors.textMuted,
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: 0.3,
              }}
            >
              Inbound Emails
            </span>
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, color: colors.white, lineHeight: 1 }}>
            {stats.total_inbound.toLocaleString()}
          </div>
          <div style={{ color: colors.textDim, fontSize: 12, marginTop: 8 }}>
            Received / forwarded emails
          </div>
        </div>

        {/* Status Distribution */}
        <div
          style={{
            background: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            padding: 24,
            flex: "2 1 400px",
            minWidth: 400,
          }}
        >
          <div
            style={{
              color: colors.textMuted,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: 0.3,
              marginBottom: 20,
            }}
          >
            Status Distribution
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {statusDistribution.map((item) => (
              <div key={item.label}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: colors.text, fontWeight: 500 }}>{item.label}</span>
                  <span style={{ color: item.color, fontWeight: 600 }}>
                    {item.count.toLocaleString()}
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 6,
                    background: colors.border,
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${(item.count / maxCount) * 100}%`,
                      height: "100%",
                      background: item.color,
                      borderRadius: 3,
                      transition: "width 0.4s ease",
                      minWidth: item.count > 0 ? 4 : 0,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick stats summary */}
      <div
        style={{
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          padding: 20,
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {[
          { label: "Delivery Rate", value: `${stats.delivery_rate.toFixed(1)}%`, color: colors.success },
          { label: "Open Rate", value: `${stats.open_rate.toFixed(1)}%`, color: colors.cyan },
          { label: "Bounce Rate", value: `${stats.bounce_rate.toFixed(1)}%`, color: colors.danger },
          { label: "Failure Rate", value: stats.total_sent > 0 ? `${((stats.total_failed / stats.total_sent) * 100).toFixed(1)}%` : "0.0%", color: colors.warning },
        ].map((metric) => (
          <div
            key={metric.label}
            style={{
              textAlign: "center",
              minWidth: 120,
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 700, color: metric.color }}>{metric.value}</div>
            <div style={{ color: colors.textDim, fontSize: 12, marginTop: 4 }}>{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Email Logs Tab ─────────────────────────────────────────────────────────

function EmailLogsTab({
  logs,
  loading,
  error,
  onRetry,
}: {
  logs: EmailLog[]
  loading: boolean
  error: string | null
  onRetry: () => void
}) {
  const [directionFilter, setDirectionFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedLog, setSelectedLog] = useState<EmailLog | null>(null)

  const filtered = logs.filter((log) => {
    if (directionFilter !== "all" && log.direction !== directionFilter) return false
    if (statusFilter !== "all" && log.status !== statusFilter) return false
    return true
  })

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorBanner message={error} onRetry={onRetry} />

  return (
    <div>
      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 16,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <FilterSelect
            label="Direction"
            value={directionFilter}
            onChange={setDirectionFilter}
            options={[
              { value: "all", label: "All" },
              { value: "outbound", label: "Outbound" },
              { value: "inbound", label: "Inbound" },
            ]}
          />
          <FilterSelect
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "all", label: "All" },
              { value: "sent", label: "Sent" },
              { value: "delivered", label: "Delivered" },
              { value: "opened", label: "Opened" },
              { value: "clicked", label: "Clicked" },
              { value: "bounced", label: "Bounced" },
              { value: "failed", label: "Failed" },
            ]}
          />
        </div>
        <span style={{ color: colors.textDim, fontSize: 13 }}>
          {filtered.length} email{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState message="No emails match the current filters." icon="📭" />
      ) : (
        <div
          style={{
            background: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "90px 1fr 1.5fr 110px 160px",
              padding: "12px 16px",
              borderBottom: `1px solid ${colors.border}`,
              background: "#1f1f1f",
              gap: 12,
            }}
          >
            {["Direction", "To / From", "Subject", "Status", "Date"].map((h) => (
              <span
                key={h}
                style={{
                  color: colors.textMuted,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {filtered.map((log) => (
            <div
              key={log.id}
              onClick={() => setSelectedLog(log)}
              style={{
                display: "grid",
                gridTemplateColumns: "90px 1fr 1.5fr 110px 160px",
                padding: "12px 16px",
                borderBottom: `1px solid ${colors.border}`,
                cursor: "pointer",
                gap: 12,
                alignItems: "center",
                transition: "background 0.1s ease",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.background = colors.cardHover
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.background = "transparent"
              }}
            >
              <div>
                <DirectionBadge direction={log.direction} />
              </div>
              <div
                style={{
                  color: colors.text,
                  fontSize: 13,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={log.direction === "outbound" ? log.to : log.from}
              >
                {log.direction === "outbound" ? log.to : log.from}
              </div>
              <div
                style={{
                  color: colors.text,
                  fontSize: 13,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={log.subject}
              >
                {log.subject}
              </div>
              <div>
                <StatusBadge status={log.status} />
              </div>
              <div style={{ color: colors.textDim, fontSize: 12 }}>
                {formatDate(log.created_at)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail panel */}
      {selectedLog && (
        <EmailDetailPanel log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
    </div>
  )
}

// ─── Templates Tab ──────────────────────────────────────────────────────────

function TemplatesTab({
  templates,
  loading,
  error,
  onRetry,
  onRefresh,
}: {
  templates: EmailTemplate[]
  loading: boolean
  error: string | null
  onRetry: () => void
  onRefresh: () => void
}) {
  const [previewHtml, setPreviewHtml] = useState<string | null>(null)
  const [previewTitle, setPreviewTitle] = useState("")
  const [seeding, setSeeding] = useState(false)
  const [seedMessage, setSeedMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const handleSeedTemplates = async () => {
    setSeeding(true)
    setSeedMessage(null)
    try {
      const res = await fetch("/admin/email-templates/seed", {
        method: "POST",
        credentials: "include",
      })
      const data = await res.json()
      if (res.ok) {
        setSeedMessage({ type: "success", text: data.message || "Templates seeded successfully." })
        onRefresh()
      } else {
        setSeedMessage({ type: "error", text: data.message || "Failed to seed templates." })
      }
    } catch (e) {
      setSeedMessage({ type: "error", text: "Network error while seeding templates." })
    } finally {
      setSeeding(false)
    }
  }

  const handleToggleActive = async (template: EmailTemplate) => {
    setTogglingId(template.id)
    try {
      await fetch(`/admin/email-templates/${template.id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !template.is_active }),
      })
      onRefresh()
    } catch (e) {
      console.error("Failed to toggle template", e)
    } finally {
      setTogglingId(null)
    }
  }

  const handlePreview = async (template: EmailTemplate) => {
    setPreviewTitle(template.name)
    setPreviewHtml(template.html_template)
  }

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorBanner message={error} onRetry={onRetry} />

  return (
    <div>
      {/* Actions bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ color: colors.textDim, fontSize: 13 }}>
          {templates.length} template{templates.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={handleSeedTemplates}
          disabled={seeding}
          style={{
            background: seeding ? colors.border : colors.accent,
            color: colors.white,
            border: "none",
            borderRadius: 8,
            padding: "8px 18px",
            fontSize: 13,
            fontWeight: 600,
            cursor: seeding ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            opacity: seeding ? 0.7 : 1,
          }}
        >
          {seeding ? "Seeding..." : "Seed Default Templates"}
        </button>
      </div>

      {/* Seed message */}
      {seedMessage && (
        <div
          style={{
            background: seedMessage.type === "success" ? colors.successBg : colors.dangerBg,
            border: `1px solid ${seedMessage.type === "success" ? colors.success : colors.danger}44`,
            borderRadius: 8,
            padding: "10px 16px",
            marginBottom: 16,
            color: seedMessage.type === "success" ? colors.success : colors.danger,
            fontSize: 13,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{seedMessage.text}</span>
          <button
            onClick={() => setSeedMessage(null)}
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              cursor: "pointer",
              fontSize: 16,
              padding: "0 4px",
            }}
          >
            &times;
          </button>
        </div>
      )}

      {/* Template cards */}
      {templates.length === 0 ? (
        <EmptyState
          message="No templates yet. Click 'Seed Default Templates' to create starter templates."
          icon="📝"
        />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: 16,
          }}
        >
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              style={{
                background: colors.card,
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Card header */}
              <div
                style={{
                  padding: "16px 20px 12px",
                  borderBottom: `1px solid ${colors.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      color: colors.white,
                      fontSize: 15,
                      fontWeight: 600,
                      marginBottom: 4,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={tpl.name}
                  >
                    {tpl.name}
                  </div>
                  <div
                    style={{
                      color: colors.textDim,
                      fontSize: 12,
                      fontFamily: "monospace",
                    }}
                  >
                    {tpl.slug}
                  </div>
                </div>
                {/* Active toggle */}
                <button
                  onClick={() => handleToggleActive(tpl)}
                  disabled={togglingId === tpl.id}
                  style={{
                    background: tpl.is_active ? colors.successBg : colors.dangerBg,
                    color: tpl.is_active ? colors.success : colors.danger,
                    border: `1px solid ${tpl.is_active ? colors.success : colors.danger}44`,
                    borderRadius: 20,
                    padding: "3px 12px",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: togglingId === tpl.id ? "not-allowed" : "pointer",
                    whiteSpace: "nowrap",
                    opacity: togglingId === tpl.id ? 0.5 : 1,
                  }}
                >
                  {tpl.is_active ? "Active" : "Inactive"}
                </button>
              </div>

              {/* Card body */}
              <div style={{ padding: "12px 20px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Category */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      background: colors.accentSubtle,
                      color: colors.accent,
                      padding: "2px 10px",
                      borderRadius: 12,
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {tpl.category}
                  </span>
                </div>

                {/* Description */}
                {tpl.description && (
                  <div style={{ color: colors.textMuted, fontSize: 13, lineHeight: 1.5 }}>
                    {tpl.description}
                  </div>
                )}

                {/* Subject template */}
                <div>
                  <div
                    style={{
                      color: colors.textDim,
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: 0.6,
                      marginBottom: 4,
                      fontWeight: 600,
                    }}
                  >
                    Subject
                  </div>
                  <div
                    style={{
                      color: colors.text,
                      fontSize: 12,
                      fontFamily: "monospace",
                      background: "#1f1f1f",
                      padding: "6px 10px",
                      borderRadius: 4,
                      border: `1px solid ${colors.border}`,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={tpl.subject_template}
                  >
                    {tpl.subject_template}
                  </div>
                </div>

                {/* Variables */}
                {tpl.variables && tpl.variables.length > 0 && (
                  <div>
                    <div
                      style={{
                        color: colors.textDim,
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: 0.6,
                        marginBottom: 6,
                        fontWeight: 600,
                      }}
                    >
                      Variables
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {tpl.variables.map((v) => (
                        <span
                          key={v}
                          style={{
                            background: colors.infoBg,
                            color: colors.info,
                            padding: "2px 8px",
                            borderRadius: 4,
                            fontSize: 11,
                            fontFamily: "monospace",
                            fontWeight: 500,
                            border: `1px solid ${colors.info}33`,
                          }}
                        >
                          {`{{${v}}}`}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Meta info */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "auto",
                    paddingTop: 8,
                    borderTop: `1px solid ${colors.border}`,
                  }}
                >
                  <span style={{ color: colors.textDim, fontSize: 11 }}>
                    Updated {formatDateShort(tpl.updated_at)}
                  </span>
                  <button
                    onClick={() => handlePreview(tpl)}
                    style={{
                      background: "transparent",
                      color: colors.accent,
                      border: `1px solid ${colors.accent}`,
                      borderRadius: 6,
                      padding: "5px 14px",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLButtonElement).style.background = colors.accentSubtle
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLButtonElement).style.background = "transparent"
                    }}
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview modal */}
      {previewHtml && (
        <PreviewModal
          title={previewTitle}
          html={previewHtml}
          onClose={() => setPreviewHtml(null)}
        />
      )}
    </div>
  )
}

// ─── Main Page Component ────────────────────────────────────────────────────

const EmailPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard")

  // Dashboard state
  const [stats, setStats] = useState<EmailStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState<string | null>(null)

  // Email logs state
  const [logs, setLogs] = useState<EmailLog[]>([])
  const [logsLoading, setLogsLoading] = useState(true)
  const [logsError, setLogsError] = useState<string | null>(null)

  // Templates state
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [templatesLoading, setTemplatesLoading] = useState(true)
  const [templatesError, setTemplatesError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    setStatsLoading(true)
    setStatsError(null)
    try {
      const res = await fetch("/admin/email-logs?stats=true", {
        credentials: "include",
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setStats(data.stats || null)
    } catch (e: any) {
      console.error("Failed to fetch email stats", e)
      setStatsError(e.message || "Failed to load email statistics.")
    } finally {
      setStatsLoading(false)
    }
  }, [])

  const fetchLogs = useCallback(async () => {
    setLogsLoading(true)
    setLogsError(null)
    try {
      const res = await fetch("/admin/email-logs?limit=200", {
        credentials: "include",
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setLogs(data.email_logs || [])
    } catch (e: any) {
      console.error("Failed to fetch email logs", e)
      setLogsError(e.message || "Failed to load email logs.")
    } finally {
      setLogsLoading(false)
    }
  }, [])

  const fetchTemplates = useCallback(async () => {
    setTemplatesLoading(true)
    setTemplatesError(null)
    try {
      const res = await fetch("/admin/email-templates", {
        credentials: "include",
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setTemplates(data.email_templates || [])
    } catch (e: any) {
      console.error("Failed to fetch email templates", e)
      setTemplatesError(e.message || "Failed to load email templates.")
    } finally {
      setTemplatesLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
    fetchLogs()
    fetchTemplates()
  }, [fetchStats, fetchLogs, fetchTemplates])

  return (
    <div
      style={{
        background: colors.bg,
        minHeight: "100vh",
        padding: "24px 32px",
        color: colors.text,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Page Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <span style={{ fontSize: 28 }}>📧</span>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: colors.white,
              margin: 0,
              letterSpacing: -0.3,
            }}
          >
            Email Management
          </h1>
        </div>
        <p style={{ color: colors.textMuted, fontSize: 14, margin: 0 }}>
          Monitor outbound and inbound emails, view delivery analytics, and manage templates.
        </p>
      </div>

      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 24,
          borderBottom: `1px solid ${colors.border}`,
          paddingBottom: 16,
        }}
      >
        <TabButton
          label="Dashboard"
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
        />
        <TabButton
          label="Email Logs"
          active={activeTab === "logs"}
          onClick={() => setActiveTab("logs")}
          count={logs.length}
        />
        <TabButton
          label="Templates"
          active={activeTab === "templates"}
          onClick={() => setActiveTab("templates")}
          count={templates.length}
        />

        {/* Refresh button aligned right */}
        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={() => {
              fetchStats()
              fetchLogs()
              fetchTemplates()
            }}
            style={{
              background: "transparent",
              color: colors.textMuted,
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              padding: "10px 16px",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = colors.accent
              ;(e.currentTarget as HTMLButtonElement).style.color = colors.accent
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = colors.border
              ;(e.currentTarget as HTMLButtonElement).style.color = colors.textMuted
            }}
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "dashboard" && (
        <DashboardTab
          stats={stats}
          loading={statsLoading}
          error={statsError}
          onRetry={fetchStats}
        />
      )}
      {activeTab === "logs" && (
        <EmailLogsTab
          logs={logs}
          loading={logsLoading}
          error={logsError}
          onRetry={fetchLogs}
        />
      )}
      {activeTab === "templates" && (
        <TemplatesTab
          templates={templates}
          loading={templatesLoading}
          error={templatesError}
          onRetry={fetchTemplates}
          onRefresh={fetchTemplates}
        />
      )}
    </div>
  )
}

export default EmailPage

export const config = defineRouteConfig({
  label: "Email",
})
