import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useState, useEffect, useMemo } from "react"

// ── Types ──────────────────────────────────────────────────────────────────────

type SubscriberStatus = "active" | "unsubscribed" | "bounced" | "complained"
type SubscriberSource = "footer" | "exit_intent" | "checkout" | "manual" | "referral" | "import"

type Subscriber = {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  source: SubscriberSource
  status: SubscriberStatus
  tags: string | null
  created_at: string
  unsubscribed_at: string | null
}

type Stats = {
  total: number
  active: number
  unsubscribed: number
  bounced: number
  by_source: Record<string, number>
  growth_last_30_days: number
  unsubscribe_rate: number
}

type ImportResult = {
  imported: number
  skipped: number
  errors: string[]
}

// ── Design Tokens ──────────────────────────────────────────────────────────────

const T = {
  bg: "#1a1a1a",
  card: "#252525",
  border: "#333",
  accent: "#FF6A1A",
  accentHover: "#e55d10",
  text: "#e0e0e0",
  textMuted: "#999",
  textDim: "#666",
  green: "#34d399",
  greenBg: "rgba(52, 211, 153, 0.12)",
  orange: "#FF6A1A",
  orangeBg: "rgba(255, 106, 26, 0.12)",
  red: "#f87171",
  redBg: "rgba(248, 113, 113, 0.12)",
  white: "#fff",
  dangerBg: "rgba(248, 113, 113, 0.08)",
  dangerBorder: "rgba(248, 113, 113, 0.3)",
  radius: 8,
  radiusSm: 6,
} as const

// ── Styles ─────────────────────────────────────────────────────────────────────

const S = {
  page: {
    background: T.bg,
    color: T.text,
    minHeight: "100vh",
    padding: "32px 40px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 14,
  } as React.CSSProperties,

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
  } as React.CSSProperties,

  title: {
    fontSize: 28,
    fontWeight: 700,
    margin: 0,
    color: T.white,
    letterSpacing: "-0.02em",
  } as React.CSSProperties,

  subtitle: {
    fontSize: 14,
    color: T.textMuted,
    margin: "6px 0 0",
  } as React.CSSProperties,

  headerActions: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  } as React.CSSProperties,

  // KPI Grid
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: 16,
    marginBottom: 28,
  } as React.CSSProperties,

  kpiCard: {
    background: T.card,
    border: `1px solid ${T.border}`,
    borderRadius: T.radius,
    padding: "20px 22px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  } as React.CSSProperties,

  kpiLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: T.textMuted,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  } as React.CSSProperties,

  kpiValue: {
    fontSize: 28,
    fontWeight: 700,
    color: T.white,
    lineHeight: 1,
  } as React.CSSProperties,

  // Source distribution
  sourceSection: {
    background: T.card,
    border: `1px solid ${T.border}`,
    borderRadius: T.radius,
    padding: "22px 24px",
    marginBottom: 28,
  } as React.CSSProperties,

  sourceSectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: T.text,
    margin: "0 0 16px",
  } as React.CSSProperties,

  sourceGrid: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 12,
  } as React.CSSProperties,

  sourceChip: {
    background: T.bg,
    border: `1px solid ${T.border}`,
    borderRadius: 20,
    padding: "6px 16px",
    fontSize: 13,
    color: T.text,
    display: "flex",
    alignItems: "center",
    gap: 8,
  } as React.CSSProperties,

  sourceCount: {
    background: T.accent,
    color: T.white,
    borderRadius: 10,
    padding: "1px 8px",
    fontSize: 11,
    fontWeight: 700,
    minWidth: 20,
    textAlign: "center" as const,
  } as React.CSSProperties,

  // Controls row
  controlsRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap" as const,
  } as React.CSSProperties,

  searchInput: {
    background: T.card,
    border: `1px solid ${T.border}`,
    borderRadius: T.radiusSm,
    padding: "9px 14px 9px 36px",
    color: T.text,
    fontSize: 13,
    outline: "none",
    width: 260,
    transition: "border-color 0.15s",
  } as React.CSSProperties,

  searchWrapper: {
    position: "relative" as const,
  } as React.CSSProperties,

  searchIcon: {
    position: "absolute" as const,
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    color: T.textDim,
    fontSize: 14,
    pointerEvents: "none" as const,
  } as React.CSSProperties,

  select: {
    background: T.card,
    border: `1px solid ${T.border}`,
    borderRadius: T.radiusSm,
    padding: "9px 12px",
    color: T.text,
    fontSize: 13,
    outline: "none",
    cursor: "pointer",
    appearance: "none" as const,
    minWidth: 130,
  } as React.CSSProperties,

  // Buttons
  btnPrimary: {
    background: T.accent,
    color: T.white,
    border: "none",
    borderRadius: T.radiusSm,
    padding: "9px 18px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.15s, transform 0.1s",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    whiteSpace: "nowrap" as const,
  } as React.CSSProperties,

  btnSecondary: {
    background: "transparent",
    color: T.text,
    border: `1px solid ${T.border}`,
    borderRadius: T.radiusSm,
    padding: "9px 18px",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.15s, border-color 0.15s",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    whiteSpace: "nowrap" as const,
  } as React.CSSProperties,

  btnDanger: {
    background: T.dangerBg,
    color: T.red,
    border: `1px solid ${T.dangerBorder}`,
    borderRadius: T.radiusSm,
    padding: "5px 12px",
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.15s",
  } as React.CSSProperties,

  // Table
  tableWrapper: {
    background: T.card,
    border: `1px solid ${T.border}`,
    borderRadius: T.radius,
    overflow: "hidden",
  } as React.CSSProperties,

  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: 13,
  } as React.CSSProperties,

  th: {
    textAlign: "left" as const,
    padding: "13px 16px",
    fontSize: 11,
    fontWeight: 600,
    color: T.textMuted,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    borderBottom: `1px solid ${T.border}`,
    background: "rgba(0,0,0,0.15)",
    whiteSpace: "nowrap" as const,
  } as React.CSSProperties,

  td: {
    padding: "12px 16px",
    borderBottom: `1px solid ${T.border}`,
    verticalAlign: "middle" as const,
  } as React.CSSProperties,

  trHover: {
    transition: "background 0.1s",
  } as React.CSSProperties,

  // Badges
  badge: (status: SubscriberStatus) => {
    const map: Record<SubscriberStatus, { bg: string; color: string }> = {
      active: { bg: T.greenBg, color: T.green },
      unsubscribed: { bg: T.orangeBg, color: T.orange },
      bounced: { bg: T.redBg, color: T.red },
      complained: { bg: T.redBg, color: T.red },
    }
    const c = map[status] || map.active
    return {
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 12,
      fontSize: 11,
      fontWeight: 600,
      background: c.bg,
      color: c.color,
      textTransform: "capitalize" as const,
      letterSpacing: "0.02em",
    } as React.CSSProperties
  },

  tagBadge: {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: 11,
    background: "rgba(255,255,255,0.06)",
    color: T.textMuted,
    marginRight: 4,
    marginBottom: 2,
  } as React.CSSProperties,

  // Modal / Import overlay
  overlay: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  } as React.CSSProperties,

  modal: {
    background: T.card,
    border: `1px solid ${T.border}`,
    borderRadius: 12,
    padding: "28px 32px",
    width: 560,
    maxHeight: "80vh",
    overflowY: "auto" as const,
  } as React.CSSProperties,

  modalTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: T.white,
    margin: "0 0 6px",
  } as React.CSSProperties,

  modalSubtitle: {
    fontSize: 13,
    color: T.textMuted,
    margin: "0 0 20px",
    lineHeight: 1.5,
  } as React.CSSProperties,

  textarea: {
    width: "100%",
    minHeight: 180,
    background: T.bg,
    border: `1px solid ${T.border}`,
    borderRadius: T.radiusSm,
    padding: 14,
    color: T.text,
    fontSize: 12,
    fontFamily: "'IBM Plex Mono', monospace",
    resize: "vertical" as const,
    outline: "none",
    lineHeight: 1.6,
    boxSizing: "border-box" as const,
  } as React.CSSProperties,

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 20,
  } as React.CSSProperties,

  importResult: {
    background: T.bg,
    border: `1px solid ${T.border}`,
    borderRadius: T.radiusSm,
    padding: 16,
    marginTop: 16,
    fontSize: 13,
    lineHeight: 1.7,
  } as React.CSSProperties,

  // Empty state
  emptyState: {
    textAlign: "center" as const,
    padding: "60px 20px",
    color: T.textMuted,
  } as React.CSSProperties,

  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
    opacity: 0.3,
  } as React.CSSProperties,

  // Toast
  toast: {
    position: "fixed" as const,
    bottom: 24,
    right: 24,
    background: T.card,
    border: `1px solid ${T.border}`,
    borderRadius: T.radius,
    padding: "14px 20px",
    fontSize: 13,
    color: T.text,
    zIndex: 2000,
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    gap: 10,
    animation: "slideIn 0.25s ease",
  } as React.CSSProperties,

  // Pagination
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    borderTop: `1px solid ${T.border}`,
    fontSize: 13,
    color: T.textMuted,
  } as React.CSSProperties,

  paginationBtn: {
    background: "transparent",
    border: `1px solid ${T.border}`,
    borderRadius: T.radiusSm,
    padding: "6px 14px",
    fontSize: 12,
    color: T.text,
    cursor: "pointer",
    transition: "background 0.15s",
  } as React.CSSProperties,

  paginationBtnDisabled: {
    opacity: 0.35,
    cursor: "not-allowed",
    pointerEvents: "none" as const,
  } as React.CSSProperties,

  // Loading skeleton
  skeleton: {
    background: `linear-gradient(90deg, ${T.card} 25%, #2a2a2a 50%, ${T.card} 75%)`,
    backgroundSize: "200% 100%",
    borderRadius: T.radiusSm,
    height: 16,
    animation: "shimmer 1.5s infinite",
  } as React.CSSProperties,

  loadingContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 24,
    padding: "32px 40px",
    minHeight: "100vh",
    background: T.bg,
  } as React.CSSProperties,
} as const

// ── Helpers ────────────────────────────────────────────────────────────────────

const SOURCE_LABELS: Record<string, string> = {
  footer: "Footer",
  exit_intent: "Exit Intent",
  checkout: "Checkout",
  manual: "Manual",
  referral: "Referral",
  import: "Import",
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function formatSourceLabel(source: string): string {
  return SOURCE_LABELS[source] || source.charAt(0).toUpperCase() + source.slice(1).replace(/_/g, " ")
}

// ── Component ──────────────────────────────────────────────────────────────────

const PAGE_SIZE = 25

const NewsletterPage = () => {
  // Data
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  // UI State
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sourceFilter, setSourceFilter] = useState<string>("all")
  const [page, setPage] = useState(0)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  // Import modal
  const [showImport, setShowImport] = useState(false)
  const [importCsv, setImportCsv] = useState("")
  const [importLoading, setImportLoading] = useState(false)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)

  // Toast
  const [toast, setToast] = useState<string | null>(null)

  // ── Fetch ─────────────────────────────────────────────────────────────────

  const fetchSubscribers = async () => {
    try {
      const params = new URLSearchParams()
      params.set("limit", String(PAGE_SIZE))
      params.set("offset", String(page * PAGE_SIZE))
      if (statusFilter !== "all") params.set("status", statusFilter)
      if (sourceFilter !== "all") params.set("source", sourceFilter)

      const res = await fetch(`/admin/newsletter-subscribers?${params}`, {
        credentials: "include",
      })
      const data = await res.json()
      setSubscribers(data.newsletter_subscribers || [])
      setTotalCount(data.count || 0)
      if (data.stats) setStats(data.stats)
    } catch (e) {
      console.error("Failed to fetch subscribers", e)
      showToast("Failed to load subscribers")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchSubscribers()
  }, [page, statusFilter, sourceFilter])

  // Reset page when filters change
  useEffect(() => {
    setPage(0)
  }, [statusFilter, sourceFilter, searchQuery])

  // ── Filtered results (client-side email search) ───────────────────────────

  const filteredSubscribers = useMemo(() => {
    if (!searchQuery.trim()) return subscribers
    const q = searchQuery.toLowerCase()
    return subscribers.filter(
      (s) =>
        s.email.toLowerCase().includes(q) ||
        (s.first_name && s.first_name.toLowerCase().includes(q)) ||
        (s.last_name && s.last_name.toLowerCase().includes(q))
    )
  }, [subscribers, searchQuery])

  // ── Actions ───────────────────────────────────────────────────────────────

  const deleteSubscriber = async (id: string) => {
    if (!confirm("Remove this subscriber permanently?")) return
    setDeletingId(id)
    try {
      await fetch(`/admin/newsletter-subscribers/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      showToast("Subscriber removed")
      fetchSubscribers()
    } catch {
      showToast("Failed to delete subscriber")
    } finally {
      setDeletingId(null)
    }
  }

  const exportCSV = () => {
    const headers = "email,first_name,last_name,source,status,tags,subscribed_at"
    const rows = subscribers.map((s) => {
      const escape = (v: string | null) => {
        if (!v) return ""
        if (v.includes(",") || v.includes('"') || v.includes("\n")) {
          return `"${v.replace(/"/g, '""')}"`
        }
        return v
      }
      return [
        escape(s.email),
        escape(s.first_name),
        escape(s.last_name),
        s.source,
        s.status,
        escape(s.tags),
        s.created_at,
      ].join(",")
    })
    const csvContent = headers + "\n" + rows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `oryn-newsletter-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    showToast(`Exported ${subscribers.length} subscribers`)
  }

  const handleImport = async () => {
    if (!importCsv.trim()) return
    setImportLoading(true)
    setImportResult(null)
    try {
      const lines = importCsv.trim().split("\n")
      const headerLine = lines[0].toLowerCase()
      const hasHeader =
        headerLine.includes("email") || headerLine.includes("first_name")
      const dataLines = hasHeader ? lines.slice(1) : lines

      const parsedSubscribers = dataLines
        .filter((line) => line.trim())
        .map((line) => {
          const parts = line.split(",").map((p) => p.trim().replace(/^"|"$/g, ""))
          return {
            email: parts[0],
            first_name: parts[1] || undefined,
            last_name: parts[2] || undefined,
            tags: parts[3] || undefined,
          }
        })
        .filter((s) => s.email && s.email.includes("@"))

      const res = await fetch("/admin/newsletter-subscribers", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "import",
          subscribers: parsedSubscribers,
        }),
      })
      const result = await res.json()
      setImportResult(result)
      if (result.imported > 0) {
        showToast(`Imported ${result.imported} subscriber(s)`)
        fetchSubscribers()
      }
    } catch {
      showToast("Import failed")
    } finally {
      setImportLoading(false)
    }
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  // ── Pagination ────────────────────────────────────────────────────────────

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)
  const showingFrom = totalCount === 0 ? 0 : page * PAGE_SIZE + 1
  const showingTo = Math.min((page + 1) * PAGE_SIZE, totalCount)

  // ── Render: Loading state ─────────────────────────────────────────────────

  if (loading && subscribers.length === 0) {
    return (
      <div style={S.loadingContainer}>
        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
        <div>
          <div style={{ ...S.skeleton, width: 200, height: 28, marginBottom: 8 }} />
          <div style={{ ...S.skeleton, width: 140, height: 14 }} />
        </div>
        <div style={S.kpiGrid}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={S.kpiCard}>
              <div style={{ ...S.skeleton, width: 80, height: 12 }} />
              <div style={{ ...S.skeleton, width: 60, height: 28, marginTop: 4 }} />
            </div>
          ))}
        </div>
        <div style={{ ...S.skeleton, width: "100%", height: 300 }} />
      </div>
    )
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div style={S.page}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div style={S.header}>
        <div>
          <h1 style={S.title}>Newsletter</h1>
          <p style={S.subtitle}>
            Manage subscribers, track growth, and export your mailing list
          </p>
        </div>
        <div style={S.headerActions}>
          <button
            style={S.btnSecondary}
            onClick={() => {
              setShowImport(true)
              setImportCsv("")
              setImportResult(null)
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = T.accent
              e.currentTarget.style.color = T.accent
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = T.border
              e.currentTarget.style.color = T.text
            }}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
            Bulk Import
          </button>
          <button
            style={S.btnPrimary}
            onClick={exportCSV}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = T.accentHover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = T.accent
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      {stats && (
        <div style={S.kpiGrid}>
          <div style={S.kpiCard}>
            <span style={S.kpiLabel}>Total Subscribers</span>
            <span style={S.kpiValue}>{stats.total.toLocaleString()}</span>
          </div>
          <div style={S.kpiCard}>
            <span style={S.kpiLabel}>Active</span>
            <span style={{ ...S.kpiValue, color: T.green }}>
              {stats.active.toLocaleString()}
            </span>
          </div>
          <div style={S.kpiCard}>
            <span style={S.kpiLabel}>Unsubscribed</span>
            <span style={{ ...S.kpiValue, color: T.orange }}>
              {stats.unsubscribed.toLocaleString()}
            </span>
          </div>
          <div style={S.kpiCard}>
            <span style={S.kpiLabel}>Bounced / Complained</span>
            <span style={{ ...S.kpiValue, color: T.red }}>
              {stats.bounced.toLocaleString()}
            </span>
          </div>
          <div style={S.kpiCard}>
            <span style={S.kpiLabel}>Growth (30 days)</span>
            <span style={{ ...S.kpiValue, color: T.green }}>
              +{stats.growth_last_30_days.toLocaleString()}
            </span>
          </div>
          <div style={S.kpiCard}>
            <span style={S.kpiLabel}>Unsub Rate</span>
            <span style={{ ...S.kpiValue, color: stats.unsubscribe_rate > 5 ? T.red : T.text }}>
              {stats.unsubscribe_rate}%
            </span>
          </div>
        </div>
      )}

      {/* Source Distribution */}
      {stats && Object.keys(stats.by_source).length > 0 && (
        <div style={S.sourceSection}>
          <h3 style={S.sourceSectionTitle}>Source Distribution</h3>
          <div style={S.sourceGrid}>
            {Object.entries(stats.by_source)
              .sort(([, a], [, b]) => b - a)
              .map(([source, count]) => (
                <div key={source} style={S.sourceChip}>
                  <span>{formatSourceLabel(source)}</span>
                  <span style={S.sourceCount}>{count}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Controls Row */}
      <div style={S.controlsRow}>
        <div style={S.searchWrapper}>
          <span style={S.searchIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by email or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={S.searchInput}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = T.accent
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = T.border
            }}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={S.select}
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="unsubscribed">Unsubscribed</option>
          <option value="bounced">Bounced</option>
          <option value="complained">Complained</option>
        </select>

        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          style={S.select}
        >
          <option value="all">All Sources</option>
          <option value="footer">Footer</option>
          <option value="exit_intent">Exit Intent</option>
          <option value="checkout">Checkout</option>
          <option value="manual">Manual</option>
          <option value="referral">Referral</option>
          <option value="import">Import</option>
        </select>

        {(statusFilter !== "all" || sourceFilter !== "all" || searchQuery) && (
          <button
            style={{
              ...S.btnSecondary,
              padding: "9px 14px",
              fontSize: 12,
            }}
            onClick={() => {
              setStatusFilter("all")
              setSourceFilter("all")
              setSearchQuery("")
            }}
          >
            Clear Filters
          </button>
        )}

        <span style={{ marginLeft: "auto", fontSize: 13, color: T.textMuted }}>
          {totalCount.toLocaleString()} subscriber{totalCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Subscriber Table */}
      <div style={S.tableWrapper}>
        {filteredSubscribers.length === 0 ? (
          <div style={S.emptyState}>
            <div style={S.emptyIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <p style={{ fontSize: 15, color: T.textMuted, margin: "0 0 6px" }}>
              No subscribers found
            </p>
            <p style={{ fontSize: 13, color: T.textDim, margin: 0 }}>
              {searchQuery || statusFilter !== "all" || sourceFilter !== "all"
                ? "Try adjusting your filters or search query"
                : "Subscribers will appear here once people sign up"}
            </p>
          </div>
        ) : (
          <>
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>Email</th>
                  <th style={S.th}>Name</th>
                  <th style={S.th}>Source</th>
                  <th style={S.th}>Status</th>
                  <th style={S.th}>Tags</th>
                  <th style={S.th}>Subscribed</th>
                  <th style={{ ...S.th, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((s) => (
                  <tr
                    key={s.id}
                    style={{
                      ...S.trHover,
                      background: hoveredRow === s.id ? "rgba(255,255,255,0.02)" : "transparent",
                      opacity: deletingId === s.id ? 0.4 : 1,
                    }}
                    onMouseEnter={() => setHoveredRow(s.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={S.td}>
                      <span style={{ fontWeight: 500, color: T.white }}>{s.email}</span>
                    </td>
                    <td style={S.td}>
                      <span style={{ color: T.textMuted }}>
                        {[s.first_name, s.last_name].filter(Boolean).join(" ") || "\u2014"}
                      </span>
                    </td>
                    <td style={S.td}>
                      <span
                        style={{
                          fontSize: 12,
                          color: T.textMuted,
                          background: "rgba(255,255,255,0.05)",
                          padding: "3px 10px",
                          borderRadius: 4,
                        }}
                      >
                        {formatSourceLabel(s.source)}
                      </span>
                    </td>
                    <td style={S.td}>
                      <span style={S.badge(s.status)}>{s.status}</span>
                    </td>
                    <td style={S.td}>
                      {s.tags
                        ? s.tags.split(",").map((tag) => (
                            <span key={tag.trim()} style={S.tagBadge}>
                              {tag.trim()}
                            </span>
                          ))
                        : <span style={{ color: T.textDim }}>{"\u2014"}</span>}
                    </td>
                    <td style={S.td}>
                      <span style={{ color: T.textMuted, fontSize: 13 }}>
                        {formatDate(s.created_at)}
                      </span>
                    </td>
                    <td style={{ ...S.td, textAlign: "right" }}>
                      <button
                        style={S.btnDanger}
                        disabled={deletingId === s.id}
                        onClick={() => deleteSubscriber(s.id)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(248, 113, 113, 0.18)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = T.dangerBg
                        }}
                      >
                        {deletingId === s.id ? "Removing..." : "Remove"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={S.pagination}>
                <span>
                  Showing {showingFrom}\u2013{showingTo} of {totalCount.toLocaleString()}
                </span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button
                    style={{
                      ...S.paginationBtn,
                      ...(page === 0 ? S.paginationBtnDisabled : {}),
                    }}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                  >
                    Previous
                  </button>
                  <span style={{ fontSize: 13, color: T.textMuted, padding: "0 8px" }}>
                    Page {page + 1} of {totalPages}
                  </span>
                  <button
                    style={{
                      ...S.paginationBtn,
                      ...(page >= totalPages - 1 ? S.paginationBtnDisabled : {}),
                    }}
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Import Modal */}
      {showImport && (
        <div
          style={S.overlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowImport(false)
            }
          }}
        >
          <div style={S.modal}>
            <h2 style={S.modalTitle}>Bulk Import Subscribers</h2>
            <p style={S.modalSubtitle}>
              Paste CSV data below. Expected columns:{" "}
              <span style={{ color: T.accent, fontFamily: "'IBM Plex Mono', monospace" }}>
                email, first_name, last_name, tags
              </span>
              <br />
              A header row is optional and will be auto-detected. Duplicate emails will be skipped.
            </p>
            <textarea
              style={S.textarea}
              value={importCsv}
              onChange={(e) => setImportCsv(e.target.value)}
              placeholder={`email,first_name,last_name,tags\njohn@example.com,John,Doe,vip\njane@example.com,Jane,Smith,`}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = T.accent
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = T.border
              }}
            />

            {importResult && (
              <div style={S.importResult}>
                <div style={{ marginBottom: 4 }}>
                  <span style={{ color: T.green, fontWeight: 600 }}>
                    {importResult.imported} imported
                  </span>
                  {importResult.skipped > 0 && (
                    <span style={{ color: T.orange, marginLeft: 16, fontWeight: 600 }}>
                      {importResult.skipped} skipped (duplicates)
                    </span>
                  )}
                </div>
                {importResult.errors.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <span style={{ color: T.red, fontWeight: 600, fontSize: 12 }}>Errors:</span>
                    {importResult.errors.map((err, i) => (
                      <div key={i} style={{ color: T.red, fontSize: 12, marginTop: 2 }}>
                        {err}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div style={S.modalActions}>
              <button
                style={S.btnSecondary}
                onClick={() => setShowImport(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                }}
              >
                {importResult ? "Close" : "Cancel"}
              </button>
              {!importResult && (
                <button
                  style={{
                    ...S.btnPrimary,
                    opacity: importLoading || !importCsv.trim() ? 0.5 : 1,
                    cursor: importLoading || !importCsv.trim() ? "not-allowed" : "pointer",
                  }}
                  disabled={importLoading || !importCsv.trim()}
                  onClick={handleImport}
                >
                  {importLoading ? "Importing..." : "Import Subscribers"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div style={S.toast}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: T.accent,
              flexShrink: 0,
            }}
          />
          {toast}
        </div>
      )}
    </div>
  )
}

export const config = defineRouteConfig({
  label: "Newsletter",
})

export default NewsletterPage
