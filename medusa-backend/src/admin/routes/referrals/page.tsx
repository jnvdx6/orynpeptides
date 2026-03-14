import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useState, useEffect } from "react"

// ── Types ────────────────────────────────────────────────────────────────────

type Commission = {
  id: string
  referral_link_id: string
  order_id: string
  beneficiary_customer_id: string
  source_customer_id: string
  level: number
  rate: number
  order_amount: number
  commission_amount: number
  currency_code: string
  status: "pending" | "approved" | "paid" | "rejected" | "cancelled"
  payout_method: string | null
  payout_reference: string | null
  paid_at: string | null
  approved_at: string | null
  rejected_at: string | null
  admin_notes: string | null
  created_at: string
}

type ReferralLink = {
  id: string
  referrer_customer_id: string
  referred_customer_id: string
  referral_code: string
  level: number
  clicks: number
  status: "active" | "inactive" | "expired"
  source: string | null
  expires_at: string | null
  created_at: string
}

type TopReferrer = {
  customer_id: string
  referrals: number
  total_earned: number
}

type Stats = {
  total_referrals: number
  active_referrers: number
  total_clicks: number
  conversion_rate: number
  total_commissions_generated: number
  total_pending: number
  total_approved: number
  total_paid: number
  total_rejected: number
  top_referrers: TopReferrer[]
  commissions_by_level: Record<number, { count: number; total: number }>
}

type PayoutModal = {
  commissionId: string
  method: string
  reference: string
}

type RejectModal = {
  commissionId: string
  reason: string
}

// ── Design Tokens ────────────────────────────────────────────────────────────

const C = {
  bg: "#1a1a1a",
  card: "#252525",
  cardHover: "#2a2a2a",
  border: "#333",
  accent: "#FF6A1A",
  accentHover: "#e55e15",
  text: "#e0e0e0",
  textMuted: "#999",
  textDim: "#777",
  white: "#fff",
  green: "#22c55e",
  greenBg: "rgba(34,197,94,0.12)",
  blue: "#3b82f6",
  blueBg: "rgba(59,130,246,0.12)",
  orange: "#f59e0b",
  orangeBg: "rgba(245,158,11,0.12)",
  red: "#ef4444",
  redBg: "rgba(239,68,68,0.12)",
  gray: "#6b7280",
  grayBg: "rgba(107,114,128,0.12)",
}

const levelLabels: Record<number, string> = {
  1: "Level 1 (5%)",
  2: "Level 2 (3%)",
  3: "Level 3 (2%)",
  4: "Level 4 (1%)",
  5: "Level 5 (0.5%)",
}

// ── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  page: {
    backgroundColor: C.bg,
    minHeight: "100vh",
    padding: "28px 32px",
    color: C.text,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  } as React.CSSProperties,

  header: {
    marginBottom: 28,
  } as React.CSSProperties,

  title: {
    fontSize: 26,
    fontWeight: 700,
    color: C.white,
    margin: 0,
    letterSpacing: "-0.02em",
  } as React.CSSProperties,

  subtitle: {
    fontSize: 14,
    color: C.textMuted,
    marginTop: 4,
  } as React.CSSProperties,

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 14,
    marginBottom: 20,
  } as React.CSSProperties,

  statCard: {
    backgroundColor: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    padding: "18px 20px",
  } as React.CSSProperties,

  statLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: C.textMuted,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    marginBottom: 6,
  } as React.CSSProperties,

  statValue: {
    fontSize: 24,
    fontWeight: 700,
    color: C.white,
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: C.textMuted,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    marginBottom: 12,
    marginTop: 4,
  } as React.CSSProperties,

  levelRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: `1px solid ${C.border}`,
  } as React.CSSProperties,

  tabBar: {
    display: "flex",
    gap: 0,
    borderBottom: `2px solid ${C.border}`,
    marginBottom: 24,
  } as React.CSSProperties,

  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: 13,
  } as React.CSSProperties,

  th: {
    textAlign: "left" as const,
    padding: "10px 14px",
    fontSize: 11,
    fontWeight: 600,
    color: C.textMuted,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    borderBottom: `2px solid ${C.border}`,
    whiteSpace: "nowrap" as const,
  } as React.CSSProperties,

  td: {
    padding: "12px 14px",
    borderBottom: `1px solid ${C.border}`,
    verticalAlign: "middle" as const,
  } as React.CSSProperties,

  mono: {
    fontFamily: '"IBM Plex Mono", "SF Mono", "Fira Code", monospace',
    fontSize: 12,
    color: C.textMuted,
  } as React.CSSProperties,

  filterBar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  } as React.CSSProperties,

  overlay: {
    position: "fixed" as const,
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  } as React.CSSProperties,

  modal: {
    backgroundColor: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: 28,
    width: 420,
    maxWidth: "90vw",
  } as React.CSSProperties,

  input: {
    width: "100%",
    padding: "10px 12px",
    backgroundColor: C.bg,
    border: `1px solid ${C.border}`,
    borderRadius: 6,
    color: C.text,
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,

  select: {
    padding: "10px 12px",
    backgroundColor: C.bg,
    border: `1px solid ${C.border}`,
    borderRadius: 6,
    color: C.text,
    fontSize: 14,
    outline: "none",
    cursor: "pointer",
    minWidth: 120,
  } as React.CSSProperties,

  empty: {
    textAlign: "center" as const,
    padding: "48px 0",
    color: C.textDim,
    fontSize: 14,
  } as React.CSSProperties,
}

// ── Utility Functions ────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function formatCurrency(amount: number, currency = "eur"): string {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount)
}

function truncateId(id: string, chars = 14): string {
  if (!id) return "---"
  if (id.length <= chars) return id
  return id.slice(0, chars) + "..."
}

// ── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    pending: { bg: C.orangeBg, color: C.orange },
    approved: { bg: C.blueBg, color: C.blue },
    paid: { bg: C.greenBg, color: C.green },
    rejected: { bg: C.redBg, color: C.red },
    cancelled: { bg: C.grayBg, color: C.gray },
    active: { bg: C.greenBg, color: C.green },
    inactive: { bg: C.grayBg, color: C.gray },
    expired: { bg: C.redBg, color: C.red },
  }
  const s = map[status] || { bg: C.grayBg, color: C.gray }
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        backgroundColor: s.bg,
        color: s.color,
        textTransform: "capitalize",
        letterSpacing: "0.02em",
      }}
    >
      {status}
    </span>
  )
}

function Button({
  children,
  onClick,
  variant = "default",
  size = "sm",
  disabled = false,
}: {
  children: React.ReactNode
  onClick: () => void
  variant?: "default" | "accent" | "danger" | "success" | "ghost"
  size?: "sm" | "md"
  disabled?: boolean
}) {
  const baseStyle: React.CSSProperties = {
    border: "none",
    borderRadius: 6,
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 600,
    fontSize: size === "sm" ? 12 : 14,
    padding: size === "sm" ? "6px 12px" : "10px 18px",
    transition: "all 0.15s ease",
    opacity: disabled ? 0.5 : 1,
    whiteSpace: "nowrap",
  }

  const variants: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: C.border,
      color: C.text,
    },
    accent: {
      backgroundColor: C.accent,
      color: C.white,
    },
    danger: {
      backgroundColor: C.redBg,
      color: C.red,
      border: `1px solid ${C.red}33`,
    },
    success: {
      backgroundColor: C.greenBg,
      color: C.green,
      border: `1px solid ${C.green}33`,
    },
    ghost: {
      backgroundColor: "transparent",
      color: C.textMuted,
      border: `1px solid ${C.border}`,
    },
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{ ...baseStyle, ...variants[variant] }}
    >
      {children}
    </button>
  )
}

function TabButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count?: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 20px",
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        color: active ? C.accent : C.textMuted,
        backgroundColor: "transparent",
        border: "none",
        borderBottom: active ? `2px solid ${C.accent}` : "2px solid transparent",
        cursor: "pointer",
        transition: "all 0.15s ease",
        marginBottom: -2,
      }}
    >
      {label}
      {count !== undefined && (
        <span
          style={{
            marginLeft: 6,
            fontSize: 11,
            padding: "2px 7px",
            borderRadius: 10,
            backgroundColor: active ? `${C.accent}22` : `${C.border}`,
            color: active ? C.accent : C.textMuted,
          }}
        >
          {count}
        </span>
      )}
    </button>
  )
}

function KPICard({
  label,
  value,
  accentColor,
}: {
  label: string
  value: string | number
  accentColor?: string
}) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statLabel}>{label}</div>
      <div
        style={{
          ...styles.statValue,
          color: accentColor || C.white,
        }}
      >
        {value}
      </div>
    </div>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────

const ReferralsPage = () => {
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [links, setLinks] = useState<ReferralLink[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<
    "commissions" | "links" | "top-referrers"
  >("commissions")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Modal states
  const [payoutModal, setPayoutModal] = useState<PayoutModal | null>(null)
  const [rejectModal, setRejectModal] = useState<RejectModal | null>(null)

  // ── Data fetching ────────────────────────────────────────────────────────

  const fetchData = async () => {
    try {
      setError(null)
      const [commissionsRes, linksRes] = await Promise.all([
        fetch("/admin/commissions?limit=500", { credentials: "include" }),
        fetch("/admin/referrals?limit=500", { credentials: "include" }),
      ])

      if (!commissionsRes.ok || !linksRes.ok) {
        throw new Error("Failed to fetch data from server")
      }

      const commissionsData = await commissionsRes.json()
      const linksData = await linksRes.json()

      setCommissions(commissionsData.commissions || [])
      setLinks(linksData.referral_links || [])
      setStats(commissionsData.stats || linksData.stats || null)
    } catch (e: any) {
      console.error("Failed to fetch referral data:", e)
      setError(e.message || "Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // ── Actions ──────────────────────────────────────────────────────────────

  const updateCommission = async (
    id: string,
    body: Record<string, any>
  ) => {
    setActionLoading(id)
    try {
      const res = await fetch(`/admin/commissions/${id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error("Update failed")
      await fetchData()
    } catch (e: any) {
      console.error("Commission update failed:", e)
      setError(e.message || "Failed to update commission")
    } finally {
      setActionLoading(null)
    }
  }

  const handleApprove = (id: string) => {
    updateCommission(id, { status: "approved" })
  }

  const handleMarkPaid = () => {
    if (!payoutModal) return
    updateCommission(payoutModal.commissionId, {
      status: "paid",
      payout_method: payoutModal.method,
      payout_reference: payoutModal.reference,
    })
    setPayoutModal(null)
  }

  const handleReject = () => {
    if (!rejectModal) return
    updateCommission(rejectModal.commissionId, {
      status: "rejected",
      admin_notes: rejectModal.reason,
    })
    setRejectModal(null)
  }

  // ── Derived data ─────────────────────────────────────────────────────────

  const filteredCommissions =
    statusFilter === "all"
      ? commissions
      : commissions.filter((c) => c.status === statusFilter)

  const filteredTotals = filteredCommissions.reduce(
    (acc, c) => acc + c.commission_amount,
    0
  )

  const directLinks = links.filter((l) => l.level <= 1)

  // ── Loading / Error states ───────────────────────────────────────────────

  if (loading) {
    return (
      <div style={styles.page}>
        <h1 style={styles.title}>Referrals & Commissions</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 300,
            color: C.textMuted,
            fontSize: 15,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 20,
              height: 20,
              border: `2px solid ${C.border}`,
              borderTopColor: C.accent,
              borderRadius: "50%",
              marginRight: 12,
              animation: "spin 0.8s linear infinite",
            }}
          />
          Loading referral data...
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  if (error && !stats) {
    return (
      <div style={styles.page}>
        <h1 style={styles.title}>Referrals & Commissions</h1>
        <div
          style={{
            ...styles.statCard,
            borderColor: C.red,
            marginTop: 20,
            textAlign: "center",
            padding: 32,
          }}
        >
          <div style={{ color: C.red, fontSize: 16, marginBottom: 8 }}>
            Error loading data
          </div>
          <div style={{ color: C.textMuted, fontSize: 13 }}>{error}</div>
          <div style={{ marginTop: 16 }}>
            <Button variant="accent" size="md" onClick={fetchData}>
              Retry
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={styles.page}>
      {/* Error banner */}
      {error && (
        <div
          style={{
            backgroundColor: C.redBg,
            border: `1px solid ${C.red}44`,
            borderRadius: 8,
            padding: "10px 16px",
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 13,
            color: C.red,
          }}
        >
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            style={{
              background: "none",
              border: "none",
              color: C.red,
              cursor: "pointer",
              fontSize: 16,
              lineHeight: 1,
            }}
          >
            x
          </button>
        </div>
      )}

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Referrals & Commissions</h1>
        <p style={styles.subtitle}>
          Multi-level referral program management -- 5 tier commission structure
        </p>
      </div>

      {/* ── KPI Dashboard ───────────────────────────────────────────────────── */}

      {stats && (
        <>
          {/* Referral KPIs */}
          <div style={styles.statsGrid}>
            <KPICard label="Total Referrals" value={stats.total_referrals} />
            <KPICard label="Active Referrers" value={stats.active_referrers} />
            <KPICard label="Total Clicks" value={stats.total_clicks} />
            <KPICard
              label="Conversion Rate"
              value={`${stats.conversion_rate}%`}
              accentColor={
                stats.conversion_rate > 10
                  ? C.green
                  : stats.conversion_rate > 0
                  ? C.orange
                  : C.textMuted
              }
            />
          </div>

          {/* Commission KPIs */}
          <div style={styles.statsGrid}>
            <KPICard
              label="Pending"
              value={formatCurrency(stats.total_pending)}
              accentColor={C.orange}
            />
            <KPICard
              label="Approved"
              value={formatCurrency(stats.total_approved)}
              accentColor={C.blue}
            />
            <KPICard
              label="Paid Out"
              value={formatCurrency(stats.total_paid)}
              accentColor={C.green}
            />
            <KPICard
              label="Rejected"
              value={formatCurrency(stats.total_rejected)}
              accentColor={C.red}
            />
          </div>

          {/* Commission Distribution by Level */}
          {Object.keys(stats.commissions_by_level).length > 0 && (
            <div
              style={{
                ...styles.statCard,
                marginBottom: 28,
              }}
            >
              <div style={styles.sectionTitle}>
                Commission Distribution by Level
              </div>
              {[1, 2, 3, 4, 5].map((level) => {
                const data = stats.commissions_by_level[level]
                if (!data) return null
                return (
                  <div key={level} style={styles.levelRow}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: C.accent,
                          opacity: 1 - (level - 1) * 0.15,
                        }}
                      />
                      <span style={{ fontSize: 13, color: C.text }}>
                        {levelLabels[level] || `Level ${level}`}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                      <span style={{ fontSize: 12, color: C.textMuted }}>
                        {data.count} commission{data.count !== 1 ? "s" : ""}
                      </span>
                      <span
                        style={{ fontSize: 14, fontWeight: 600, color: C.white, minWidth: 80, textAlign: "right" }}
                      >
                        {formatCurrency(data.total)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}

      {/* ── Tabs ────────────────────────────────────────────────────────────── */}

      <div style={styles.tabBar}>
        <TabButton
          label="Commissions"
          count={commissions.length}
          active={activeTab === "commissions"}
          onClick={() => setActiveTab("commissions")}
        />
        <TabButton
          label="Referral Links"
          count={directLinks.length}
          active={activeTab === "links"}
          onClick={() => setActiveTab("links")}
        />
        <TabButton
          label="Top Referrers"
          count={stats?.top_referrers?.length}
          active={activeTab === "top-referrers"}
          onClick={() => setActiveTab("top-referrers")}
        />
      </div>

      {/* ── Commissions Tab ─────────────────────────────────────────────────── */}

      {activeTab === "commissions" && (
        <div>
          {/* Status filter */}
          <div style={styles.filterBar}>
            <span style={{ fontSize: 12, color: C.textMuted, marginRight: 4 }}>
              Filter by status:
            </span>
            {["all", "pending", "approved", "paid", "rejected", "cancelled"].map(
              (s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  style={{
                    padding: "5px 12px",
                    fontSize: 12,
                    fontWeight: statusFilter === s ? 600 : 400,
                    color: statusFilter === s ? C.accent : C.textMuted,
                    backgroundColor:
                      statusFilter === s ? `${C.accent}18` : "transparent",
                    border: `1px solid ${
                      statusFilter === s ? C.accent + "44" : C.border
                    }`,
                    borderRadius: 16,
                    cursor: "pointer",
                    textTransform: "capitalize",
                    transition: "all 0.15s ease",
                  }}
                >
                  {s}
                </button>
              )
            )}
          </div>

          {filteredCommissions.length === 0 ? (
            <div style={styles.empty}>
              No commissions found
              {statusFilter !== "all" ? ` with status "${statusFilter}"` : ""}.
            </div>
          ) : (
            <>
              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Date</th>
                      <th style={styles.th}>Beneficiary</th>
                      <th style={styles.th}>Order</th>
                      <th style={styles.th}>Lvl</th>
                      <th style={styles.th}>Rate</th>
                      <th style={styles.th}>Amount</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Payout</th>
                      <th style={styles.th}>Notes</th>
                      <th style={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCommissions.map((c) => (
                      <tr
                        key={c.id}
                        style={{
                          transition: "background-color 0.1s ease",
                        }}
                        onMouseEnter={(e) => {
                          ;(e.currentTarget as HTMLElement).style.backgroundColor =
                            C.cardHover
                        }}
                        onMouseLeave={(e) => {
                          ;(e.currentTarget as HTMLElement).style.backgroundColor =
                            "transparent"
                        }}
                      >
                        <td style={styles.td}>{formatDate(c.created_at)}</td>
                        <td style={{ ...styles.td, ...styles.mono }}>
                          {truncateId(c.beneficiary_customer_id)}
                        </td>
                        <td style={{ ...styles.td, ...styles.mono }}>
                          {truncateId(c.order_id)}
                        </td>
                        <td style={styles.td}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "2px 8px",
                              borderRadius: 4,
                              fontSize: 11,
                              fontWeight: 600,
                              backgroundColor: `${C.accent}18`,
                              color: C.accent,
                            }}
                          >
                            L{c.level}
                          </span>
                        </td>
                        <td style={styles.td}>
                          {(c.rate * 100).toFixed(1)}%
                        </td>
                        <td
                          style={{
                            ...styles.td,
                            fontWeight: 600,
                            color: C.white,
                          }}
                        >
                          {formatCurrency(
                            c.commission_amount,
                            c.currency_code
                          )}
                        </td>
                        <td style={styles.td}>
                          <StatusBadge status={c.status} />
                        </td>
                        <td style={{ ...styles.td, fontSize: 12, color: C.textMuted }}>
                          {c.payout_method ? (
                            <div>
                              <div style={{ textTransform: "capitalize" }}>
                                {c.payout_method}
                              </div>
                              {c.payout_reference && (
                                <div style={{ ...styles.mono, fontSize: 10, marginTop: 2 }}>
                                  {c.payout_reference}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span style={{ color: C.textDim }}>--</span>
                          )}
                        </td>
                        <td
                          style={{
                            ...styles.td,
                            fontSize: 12,
                            color: C.textMuted,
                            maxWidth: 140,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          title={c.admin_notes || ""}
                        >
                          {c.admin_notes || (
                            <span style={{ color: C.textDim }}>--</span>
                          )}
                        </td>
                        <td style={styles.td}>
                          <div
                            style={{
                              display: "flex",
                              gap: 6,
                              alignItems: "center",
                            }}
                          >
                            {c.status === "pending" && (
                              <Button
                                variant="success"
                                onClick={() => handleApprove(c.id)}
                                disabled={actionLoading === c.id}
                              >
                                {actionLoading === c.id
                                  ? "..."
                                  : "Approve"}
                              </Button>
                            )}
                            {c.status === "approved" && (
                              <Button
                                variant="accent"
                                onClick={() =>
                                  setPayoutModal({
                                    commissionId: c.id,
                                    method: "bank",
                                    reference: "",
                                  })
                                }
                                disabled={actionLoading === c.id}
                              >
                                Mark Paid
                              </Button>
                            )}
                            {(c.status === "pending" ||
                              c.status === "approved") && (
                              <Button
                                variant="danger"
                                onClick={() =>
                                  setRejectModal({
                                    commissionId: c.id,
                                    reason: "",
                                  })
                                }
                                disabled={actionLoading === c.id}
                              >
                                Reject
                              </Button>
                            )}
                            {c.status === "paid" && (
                              <span
                                style={{
                                  fontSize: 11,
                                  color: C.green,
                                  fontWeight: 500,
                                }}
                              >
                                Completed
                              </span>
                            )}
                            {c.status === "rejected" && (
                              <span
                                style={{
                                  fontSize: 11,
                                  color: C.textDim,
                                  fontStyle: "italic",
                                }}
                              >
                                Closed
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals summary */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  padding: "16px 14px",
                  borderTop: `2px solid ${C.border}`,
                  gap: 24,
                }}
              >
                <span style={{ fontSize: 13, color: C.textMuted }}>
                  Showing {filteredCommissions.length} commission
                  {filteredCommissions.length !== 1 ? "s" : ""}
                </span>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: C.white,
                  }}
                >
                  Total: {formatCurrency(filteredTotals)}
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Referral Links Tab ──────────────────────────────────────────────── */}

      {activeTab === "links" && (
        <div>
          {directLinks.length === 0 ? (
            <div style={styles.empty}>No referral links found.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Code</th>
                    <th style={styles.th}>Referrer ID</th>
                    <th style={styles.th}>Referred ID</th>
                    <th style={styles.th}>Level</th>
                    <th style={styles.th}>Clicks</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {directLinks.map((l) => (
                    <tr
                      key={l.id}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.backgroundColor =
                          C.cardHover
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.backgroundColor =
                          "transparent"
                      }}
                    >
                      <td style={styles.td}>{formatDate(l.created_at)}</td>
                      <td style={styles.td}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "3px 10px",
                            borderRadius: 4,
                            fontSize: 12,
                            fontWeight: 600,
                            fontFamily: '"IBM Plex Mono", monospace',
                            backgroundColor: `${C.accent}18`,
                            color: C.accent,
                            letterSpacing: "0.04em",
                          }}
                        >
                          {l.referral_code}
                        </span>
                      </td>
                      <td style={{ ...styles.td, ...styles.mono }}>
                        {truncateId(l.referrer_customer_id)}
                      </td>
                      <td style={{ ...styles.td, ...styles.mono }}>
                        {l.level === 0 ? (
                          <span style={{ color: C.textDim, fontStyle: "italic" }}>
                            Own code
                          </span>
                        ) : (
                          truncateId(l.referred_customer_id)
                        )}
                      </td>
                      <td style={styles.td}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "2px 8px",
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 600,
                            backgroundColor:
                              l.level === 0 ? C.grayBg : `${C.accent}18`,
                            color: l.level === 0 ? C.gray : C.accent,
                          }}
                        >
                          {l.level === 0 ? "Own" : `L${l.level}`}
                        </span>
                      </td>
                      <td
                        style={{
                          ...styles.td,
                          fontWeight: 600,
                          color: l.clicks > 0 ? C.white : C.textDim,
                        }}
                      >
                        {l.clicks}
                      </td>
                      <td style={styles.td}>
                        <StatusBadge status={l.status} />
                      </td>
                      <td
                        style={{
                          ...styles.td,
                          fontSize: 12,
                          color: C.textMuted,
                        }}
                      >
                        {l.source || (
                          <span style={{ color: C.textDim }}>--</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── Top Referrers Tab ───────────────────────────────────────────────── */}

      {activeTab === "top-referrers" && (
        <div>
          {!stats?.top_referrers?.length ? (
            <div style={styles.empty}>No referrer data available yet.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={{ ...styles.th, width: 60 }}>Rank</th>
                    <th style={styles.th}>Customer ID</th>
                    <th style={styles.th}>Referrals</th>
                    <th style={styles.th}>Total Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.top_referrers.map((r, i) => (
                    <tr
                      key={r.customer_id}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.backgroundColor =
                          C.cardHover
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.backgroundColor =
                          "transparent"
                      }}
                    >
                      <td style={styles.td}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            fontSize: 12,
                            fontWeight: 700,
                            backgroundColor:
                              i === 0
                                ? C.accent
                                : i === 1
                                ? C.blue
                                : i === 2
                                ? C.green
                                : C.border,
                            color: i < 3 ? C.white : C.textMuted,
                          }}
                        >
                          {i + 1}
                        </span>
                      </td>
                      <td style={{ ...styles.td, ...styles.mono }}>
                        {r.customer_id}
                      </td>
                      <td style={styles.td}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 600,
                              color: C.white,
                              fontSize: 15,
                            }}
                          >
                            {r.referrals}
                          </span>
                          {/* Mini bar */}
                          <div
                            style={{
                              flex: 1,
                              maxWidth: 120,
                              height: 6,
                              backgroundColor: C.border,
                              borderRadius: 3,
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${Math.min(
                                  100,
                                  (r.referrals /
                                    Math.max(
                                      1,
                                      stats.top_referrers[0]?.referrals || 1
                                    )) *
                                    100
                                )}%`,
                                height: "100%",
                                backgroundColor: C.accent,
                                borderRadius: 3,
                                transition: "width 0.3s ease",
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td
                        style={{
                          ...styles.td,
                          fontWeight: 600,
                          color: r.total_earned > 0 ? C.green : C.textDim,
                          fontSize: 14,
                        }}
                      >
                        {formatCurrency(r.total_earned)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── Payout Modal ────────────────────────────────────────────────────── */}

      {payoutModal && (
        <div style={styles.overlay} onClick={() => setPayoutModal(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3
              style={{
                margin: "0 0 6px 0",
                fontSize: 18,
                fontWeight: 600,
                color: C.white,
              }}
            >
              Mark Commission as Paid
            </h3>
            <p
              style={{
                fontSize: 13,
                color: C.textMuted,
                marginBottom: 20,
                marginTop: 0,
              }}
            >
              Enter payout details to complete this commission.
            </p>

            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 500,
                  color: C.textMuted,
                  marginBottom: 6,
                }}
              >
                Payout Method
              </label>
              <select
                value={payoutModal.method}
                onChange={(e) =>
                  setPayoutModal({ ...payoutModal, method: e.target.value })
                }
                style={styles.select}
              >
                <option value="bank">Bank Transfer</option>
                <option value="paypal">PayPal</option>
                <option value="crypto">Crypto</option>
                <option value="manual">Manual / Other</option>
              </select>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 500,
                  color: C.textMuted,
                  marginBottom: 6,
                }}
              >
                Reference Number
              </label>
              <input
                type="text"
                placeholder="Transaction ID, reference, etc."
                value={payoutModal.reference}
                onChange={(e) =>
                  setPayoutModal({
                    ...payoutModal,
                    reference: e.target.value,
                  })
                }
                style={styles.input}
              />
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <Button variant="ghost" onClick={() => setPayoutModal(null)}>
                Cancel
              </Button>
              <Button variant="accent" onClick={handleMarkPaid}>
                Confirm Paid
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Reject Modal ────────────────────────────────────────────────────── */}

      {rejectModal && (
        <div style={styles.overlay} onClick={() => setRejectModal(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3
              style={{
                margin: "0 0 6px 0",
                fontSize: 18,
                fontWeight: 600,
                color: C.white,
              }}
            >
              Reject Commission
            </h3>
            <p
              style={{
                fontSize: 13,
                color: C.textMuted,
                marginBottom: 20,
                marginTop: 0,
              }}
            >
              Please provide a reason for rejecting this commission.
            </p>

            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 500,
                  color: C.textMuted,
                  marginBottom: 6,
                }}
              >
                Reason
              </label>
              <textarea
                placeholder="Reason for rejection..."
                value={rejectModal.reason}
                onChange={(e) =>
                  setRejectModal({
                    ...rejectModal,
                    reason: e.target.value,
                  })
                }
                rows={3}
                style={{
                  ...styles.input,
                  resize: "vertical" as const,
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <Button variant="ghost" onClick={() => setRejectModal(null)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleReject}
                disabled={!rejectModal.reason.trim()}
              >
                Confirm Reject
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const config = defineRouteConfig({
  label: "Referrals",
})

export default ReferralsPage
