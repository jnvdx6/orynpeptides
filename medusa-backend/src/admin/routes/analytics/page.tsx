import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useEffect, useState, useMemo } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

type Order = {
  id: string
  display_id: number
  email: string
  total: number
  subtotal: number
  currency_code: string
  status: string
  fulfillment_status: string
  payment_status: string
  created_at: string
  items?: { quantity: number; unit_price: number; title: string }[]
  customer?: { first_name: string; last_name: string; email: string }
  shipping_address?: { city: string; country_code: string }
}

type Customer = {
  id: string
  email: string
  first_name: string
  last_name: string
  created_at: string
}

type EmailStats = {
  total_sent: number
  delivered: number
  opened: number
  clicked: number
  bounced: number
  complained: number
  failed: number
  delivery_rate: number
  open_rate: number
  click_rate: number
  bounce_rate: number
  inbound_total: number
  inbound_new: number
}

type NewsletterStats = {
  total: number
  active: number
  unsubscribed: number
  bounced: number
  by_source: Record<string, number>
  growth_last_30_days: number
  unsubscribe_rate: number
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

type ReferralStats = {
  total_referrals: number
  active_referrers: number
  total_clicks: number
  conversion_rate: number
  total_commissions_generated: number
  total_pending: number
  total_approved: number
  total_paid: number
  total_rejected: number
  top_referrers: Array<{
    customer_id: string
    referrals: number
    total_earned: number
  }>
  commissions_by_level: Record<number, { count: number; total: number }>
}

type DateRange = "today" | "7d" | "30d" | "90d" | "all"

// ─── Design Tokens ────────────────────────────────────────────────────────────

const C = {
  bg: "#1a1a1a",
  bgCard: "#252525",
  bgCardHover: "#2a2a2a",
  bgInput: "#1e1e1e",
  accent: "#FF6A1A",
  accentDim: "rgba(255,106,26,0.15)",
  accentHover: "#ff7e3a",
  text: "#e0e0e0",
  textMuted: "#888",
  textDim: "#666",
  border: "#333",
  borderLight: "#3a3a3a",
  green: "#22c55e",
  greenDim: "rgba(34,197,94,0.15)",
  blue: "#3b82f6",
  blueDim: "rgba(59,130,246,0.15)",
  red: "#ef4444",
  redDim: "rgba(239,68,68,0.15)",
  yellow: "#eab308",
  yellowDim: "rgba(234,179,8,0.15)",
  purple: "#a855f7",
  purpleDim: "rgba(168,85,247,0.15)",
}

// ─── Utilities ────────────────────────────────────────────────────────────────

const formatCurrency = (amount: number, currency = "eur") =>
  new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount)

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })

const getDateRange = (range: DateRange): Date => {
  const now = new Date()
  switch (range) {
    case "today":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate())
    case "7d":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    case "30d":
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    case "90d":
      return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
    case "all":
      return new Date(0)
  }
}

const pct = (value: number, total: number) =>
  total > 0 ? Math.round((value / total) * 100) : 0

// ─── Shared Styles ────────────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  background: C.bgCard,
  borderRadius: 12,
  border: `1px solid ${C.border}`,
  overflow: "hidden",
}

const cardHeaderStyle: React.CSSProperties = {
  padding: "16px 20px",
  borderBottom: `1px solid ${C.border}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}

const cardTitleStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: C.text,
  margin: 0,
}

const cardSubtitleStyle: React.CSSProperties = {
  fontSize: 12,
  color: C.textMuted,
  marginTop: 2,
}

const cardBodyStyle: React.CSSProperties = {
  padding: 20,
}

// ─── Components ───────────────────────────────────────────────────────────────

const KPICard = ({
  label,
  value,
  change,
  icon,
  color = C.accent,
}: {
  label: string
  value: string
  change?: number
  icon: string
  color?: string
}) => (
  <div
    style={{
      ...cardStyle,
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      minWidth: 0,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: `${color}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
        }}
      >
        {icon}
      </div>
      {change !== undefined && change !== 0 && (
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: change > 0 ? C.green : C.red,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {change > 0 ? "\u2191" : "\u2193"} {Math.abs(change).toFixed(1)}%
        </span>
      )}
    </div>
    <div>
      <div style={{ fontSize: 24, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>
        {value}
      </div>
      <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>{label}</div>
    </div>
  </div>
)

const ModuleKPICard = ({
  title,
  icon,
  color,
  metrics,
}: {
  title: string
  icon: string
  color: string
  metrics: Array<{ label: string; value: string | number }>
}) => (
  <div
    style={{
      ...cardStyle,
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 10,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color }}>{title}</span>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {metrics.map((m) => (
        <div key={m.label} style={{ flex: "1 1 45%", minWidth: 70 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{m.value}</div>
          <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>{m.label}</div>
        </div>
      ))}
    </div>
  </div>
)

const ProgressBar = ({
  value,
  max,
  color,
  label,
  suffix = "",
}: {
  value: number
  max: number
  color: string
  label: string
  suffix?: string
}) => {
  const width = max > 0 ? Math.min((value / max) * 100, 100) : 0
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: C.textMuted }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>
          {typeof value === "number" && suffix === "%" ? `${value.toFixed(1)}%` : value}
          {suffix && suffix !== "%" ? ` ${suffix}` : ""}
        </span>
      </div>
      <div
        style={{
          height: 6,
          borderRadius: 3,
          background: `${color}20`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            borderRadius: 3,
            background: color,
            transition: "width 0.6s ease",
          }}
        />
      </div>
    </div>
  )
}

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { bg: string; color: string }> = {
    pending: { bg: C.yellowDim, color: C.yellow },
    not_fulfilled: { bg: C.yellowDim, color: C.yellow },
    awaiting: { bg: C.yellowDim, color: C.yellow },
    requires_action: { bg: C.yellowDim, color: C.yellow },
    completed: { bg: C.greenDim, color: C.green },
    captured: { bg: C.greenDim, color: C.green },
    paid: { bg: C.greenDim, color: C.green },
    fulfilled: { bg: C.blueDim, color: C.blue },
    shipped: { bg: C.blueDim, color: C.blue },
    canceled: { bg: C.redDim, color: C.red },
    cancelled: { bg: C.redDim, color: C.red },
    refunded: { bg: C.redDim, color: C.red },
  }
  const s = map[status] || { bg: `${C.textDim}20`, color: C.textMuted }
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 600,
        background: s.bg,
        color: s.color,
        textTransform: "capitalize",
        whiteSpace: "nowrap",
      }}
    >
      {status.replace(/_/g, " ")}
    </span>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

const AnalyticsPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [emailStats, setEmailStats] = useState<EmailStats | null>(null)
  const [newsletterStats, setNewsletterStats] = useState<NewsletterStats | null>(null)
  const [contactStats, setContactStats] = useState<ContactStats | null>(null)
  const [contactSlaBreaches, setContactSlaBreaches] = useState(0)
  const [referralStats, setReferralStats] = useState<ReferralStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<DateRange>("30d")
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const fetchData = async () => {
    try {
      const [ordersRes, customersRes, emailRes, newsletterRes, contactRes, referralRes] =
        await Promise.allSettled([
          fetch(
            "/admin/orders?limit=200&order=-created_at&fields=id,display_id,email,total,subtotal,currency_code,status,fulfillment_status,payment_status,created_at,items.*,customer.*,shipping_address.*",
            { credentials: "include" }
          ),
          fetch("/admin/customers?limit=200&order=-created_at&fields=id,email,first_name,last_name,created_at", {
            credentials: "include",
          }),
          fetch("/admin/email-logs?limit=1", { credentials: "include" }),
          fetch("/admin/newsletter-subscribers?limit=1", { credentials: "include" }),
          fetch("/admin/contact-submissions?limit=1", { credentials: "include" }),
          fetch("/admin/referrals?limit=1", { credentials: "include" }),
        ])

      if (ordersRes.status === "fulfilled" && ordersRes.value.ok) {
        const data = await ordersRes.value.json()
        setOrders(data.orders || [])
      }
      if (customersRes.status === "fulfilled" && customersRes.value.ok) {
        const data = await customersRes.value.json()
        setCustomers(data.customers || [])
      }
      if (emailRes.status === "fulfilled" && emailRes.value.ok) {
        const data = await emailRes.value.json()
        setEmailStats(data.stats || null)
      }
      if (newsletterRes.status === "fulfilled" && newsletterRes.value.ok) {
        const data = await newsletterRes.value.json()
        setNewsletterStats(data.stats || null)
      }
      if (contactRes.status === "fulfilled" && contactRes.value.ok) {
        const data = await contactRes.value.json()
        setContactStats(data.stats || null)
        setContactSlaBreaches(data.sla_breaches || 0)
      }
      if (referralRes.status === "fulfilled" && referralRes.value.ok) {
        const data = await referralRes.value.json()
        setReferralStats(data.stats || null)
      }

      setError(null)
      setLastRefresh(new Date())
    } catch (err: any) {
      setError(err.message || "Failed to fetch data")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [])

  // ─── Computed Stats ───────────────────────────────────────────────────

  const filteredOrders = useMemo(() => {
    const start = getDateRange(dateRange)
    return orders.filter((o) => new Date(o.created_at) >= start)
  }, [orders, dateRange])

  const stats = useMemo(() => {
    const totalRevenue = filteredOrders.reduce((sum, o) => sum + (o.total || 0), 0)
    const orderCount = filteredOrders.length
    const aov = orderCount > 0 ? totalRevenue / orderCount : 0
    const uniqueCustomers = new Set(filteredOrders.map((o) => o.email)).size

    // Status counts
    const statusCounts: Record<string, number> = {}
    filteredOrders.forEach((o) => {
      const st = o.fulfillment_status || o.status || "unknown"
      statusCounts[st] = (statusCounts[st] || 0) + 1
    })

    // Revenue by 7 time buckets
    const now = new Date()
    const startDate = getDateRange(dateRange)
    const rangeMs = now.getTime() - startDate.getTime()
    const buckets = 7
    const bucketMs = rangeMs / buckets || 1
    const revenueByBucket: number[] = Array(buckets).fill(0)
    const bucketLabels: string[] = []

    for (let i = 0; i < buckets; i++) {
      const bucketStart = new Date(startDate.getTime() + i * bucketMs)
      if (dateRange === "today") {
        bucketLabels.push(
          bucketStart.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
        )
      } else if (dateRange === "7d") {
        bucketLabels.push(
          bucketStart.toLocaleDateString("en-GB", { weekday: "short" })
        )
      } else {
        bucketLabels.push(
          bucketStart.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
        )
      }
    }

    filteredOrders.forEach((o) => {
      const t = new Date(o.created_at).getTime()
      const idx = Math.min(Math.floor((t - startDate.getTime()) / bucketMs), buckets - 1)
      if (idx >= 0) revenueByBucket[idx] += o.total || 0
    })

    // Top products
    const productMap: Record<string, { name: string; quantity: number; revenue: number }> = {}
    filteredOrders.forEach((o) => {
      o.items?.forEach((item) => {
        const key = item.title || "Unknown"
        if (!productMap[key]) productMap[key] = { name: key, quantity: 0, revenue: 0 }
        productMap[key].quantity += item.quantity
        productMap[key].revenue += item.unit_price * item.quantity
      })
    })
    const topProducts = Object.values(productMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)

    // Period change comparison
    const start = startDate
    const periodMs = now.getTime() - start.getTime()
    const prevStart = new Date(start.getTime() - periodMs)
    const prevOrders = orders.filter(
      (o) => new Date(o.created_at) >= prevStart && new Date(o.created_at) < start
    )
    const prevRevenue = prevOrders.reduce((sum, o) => sum + (o.total || 0), 0)
    const revenueChange =
      prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : 0
    const orderChange =
      prevOrders.length > 0
        ? ((orderCount - prevOrders.length) / prevOrders.length) * 100
        : 0

    return {
      totalRevenue,
      orderCount,
      aov,
      uniqueCustomers,
      statusCounts,
      revenueByBucket,
      bucketLabels,
      topProducts,
      revenueChange,
      orderChange,
    }
  }, [filteredOrders, orders, dateRange])

  // ─── Loading State ────────────────────────────────────────────────────

  if (loading && orders.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          background: C.bg,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 40,
              height: 40,
              border: `3px solid ${C.border}`,
              borderTopColor: C.accent,
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <div style={{ color: C.textMuted, fontSize: 14 }}>Loading analytics...</div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  // ─── Render ───────────────────────────────────────────────────────────

  return (
    <div style={{ background: C.bg, minHeight: "100vh", padding: "24px 28px 48px" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: C.text,
              margin: 0,
              letterSpacing: -0.3,
            }}
          >
            Analytics Dashboard
          </h1>
          <p style={{ fontSize: 13, color: C.textMuted, margin: "4px 0 0" }}>
            Unified performance overview across all modules
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Live indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: C.textMuted,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: C.green,
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span>
              Live &middot;{" "}
              {lastRefresh.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>

          {/* Date range select */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as DateRange)}
            style={{
              background: C.bgInput,
              color: C.text,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 13,
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="today">Today</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="all">All time</option>
          </select>

          {/* Refresh button */}
          <button
            onClick={fetchData}
            style={{
              background: C.accent,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "7px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.accentHover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = C.accent)}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div
          style={{
            background: C.redDim,
            border: `1px solid ${C.red}`,
            borderRadius: 8,
            padding: "10px 16px",
            marginBottom: 20,
            fontSize: 13,
            color: C.red,
          }}
        >
          Error loading data: {error}
        </div>
      )}

      {/* ── Top KPI Row ─────────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <KPICard
          label="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          change={stats.revenueChange}
          icon={"\uD83D\uDCB0"}
          color={C.green}
        />
        <KPICard
          label="Total Orders"
          value={stats.orderCount.toLocaleString()}
          change={stats.orderChange}
          icon={"\uD83D\uDCE6"}
          color={C.blue}
        />
        <KPICard
          label="Avg Order Value"
          value={formatCurrency(stats.aov)}
          icon={"\uD83D\uDCC8"}
          color={C.purple}
        />
        <KPICard
          label="Unique Customers"
          value={stats.uniqueCustomers.toLocaleString()}
          icon={"\uD83D\uDC65"}
          color={C.accent}
        />
      </div>

      {/* ── Module KPIs Row ─────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <ModuleKPICard
          title="Email"
          icon={"\u2709\uFE0F"}
          color={C.blue}
          metrics={
            emailStats
              ? [
                  { label: "Sent", value: emailStats.total_sent },
                  { label: "Delivery Rate", value: `${emailStats.delivery_rate}%` },
                  { label: "Open Rate", value: `${emailStats.open_rate}%` },
                  { label: "Bounced", value: emailStats.bounced },
                ]
              : [
                  { label: "Sent", value: "--" },
                  { label: "Delivery Rate", value: "--" },
                ]
          }
        />
        <ModuleKPICard
          title="Newsletter"
          icon={"\uD83D\uDCF0"}
          color={C.green}
          metrics={
            newsletterStats
              ? [
                  { label: "Active", value: newsletterStats.active },
                  { label: "Growth (30d)", value: `+${newsletterStats.growth_last_30_days}` },
                  { label: "Unsub Rate", value: `${newsletterStats.unsubscribe_rate}%` },
                  { label: "Total", value: newsletterStats.total },
                ]
              : [
                  { label: "Active", value: "--" },
                  { label: "Growth", value: "--" },
                ]
          }
        />
        <ModuleKPICard
          title="Contact"
          icon={"\uD83D\uDCE9"}
          color={C.yellow}
          metrics={
            contactStats
              ? [
                  { label: "Open Tickets", value: contactStats.open_count },
                  { label: "SLA Breaches", value: contactSlaBreaches },
                  { label: "Avg Response", value: `${contactStats.avg_response_hours}h` },
                  { label: "Total", value: contactStats.total },
                ]
              : [
                  { label: "Open", value: "--" },
                  { label: "SLA", value: "--" },
                ]
          }
        />
        <ModuleKPICard
          title="Referrals"
          icon={"\uD83D\uDD17"}
          color={C.purple}
          metrics={
            referralStats
              ? [
                  { label: "Total Referrals", value: referralStats.total_referrals },
                  {
                    label: "Paid",
                    value: `\u20AC${referralStats.total_paid.toFixed(2)}`,
                  },
                  { label: "Pending", value: `\u20AC${referralStats.total_pending.toFixed(2)}` },
                  { label: "Conversion", value: `${referralStats.conversion_rate}%` },
                ]
              : [
                  { label: "Referrals", value: "--" },
                  { label: "Paid", value: "--" },
                ]
          }
        />
      </div>

      {/* ── Revenue Chart + Order Status Row ────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 16,
          marginBottom: 20,
        }}
      >
        {/* Revenue Bar Chart */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <div>
              <h3 style={cardTitleStyle}>Revenue Over Time</h3>
              <p style={cardSubtitleStyle}>
                Revenue distribution across the selected period
              </p>
            </div>
            <span style={{ fontSize: 12, color: C.textMuted }}>
              {formatCurrency(stats.totalRevenue)} total
            </span>
          </div>
          <div style={{ ...cardBodyStyle, paddingTop: 24 }}>
            {(() => {
              const data = stats.revenueByBucket
              const labels = stats.bucketLabels
              const max = Math.max(...data, 1)
              return (
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 6,
                      height: 160,
                    }}
                  >
                    {data.map((val, i) => {
                      const height = Math.max((val / max) * 100, 2)
                      return (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            height: "100%",
                            justifyContent: "flex-end",
                            position: "relative",
                          }}
                        >
                          <div
                            title={formatCurrency(val)}
                            style={{
                              width: "100%",
                              maxWidth: 48,
                              height: `${height}%`,
                              background: val > 0
                                ? `linear-gradient(to top, ${C.accent}, ${C.accentHover})`
                                : `${C.accent}30`,
                              borderRadius: "4px 4px 0 0",
                              transition: "height 0.5s ease",
                              cursor: "pointer",
                              position: "relative",
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>
                  {/* X-axis labels */}
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      marginTop: 8,
                    }}
                  >
                    {labels.map((label, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          textAlign: "center",
                          fontSize: 10,
                          color: C.textDim,
                        }}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <div>
              <h3 style={cardTitleStyle}>Order Status</h3>
              <p style={cardSubtitleStyle}>Fulfillment breakdown</p>
            </div>
          </div>
          <div style={cardBodyStyle}>
            {(() => {
              const entries = Object.entries(stats.statusCounts).sort(
                (a, b) => b[1] - a[1]
              )
              const total = entries.reduce((s, [, c]) => s + c, 0) || 1
              const colorMap: Record<string, string> = {
                completed: C.green,
                captured: C.green,
                paid: C.green,
                fulfilled: C.blue,
                shipped: C.blue,
                pending: C.yellow,
                not_fulfilled: C.yellow,
                awaiting: C.yellow,
                requires_action: C.yellow,
                canceled: C.red,
                cancelled: C.red,
                refunded: C.red,
              }

              if (entries.length === 0) {
                return (
                  <div style={{ textAlign: "center", padding: 24, color: C.textMuted, fontSize: 13 }}>
                    No orders in this period
                  </div>
                )
              }

              return (
                <div>
                  {/* Stacked bar */}
                  <div
                    style={{
                      display: "flex",
                      height: 10,
                      borderRadius: 5,
                      overflow: "hidden",
                      gap: 2,
                      marginBottom: 16,
                    }}
                  >
                    {entries.map(([status, count]) => (
                      <div
                        key={status}
                        style={{
                          width: `${(count / total) * 100}%`,
                          background: colorMap[status] || C.textDim,
                          transition: "width 0.5s ease",
                        }}
                      />
                    ))}
                  </div>
                  {/* Legend rows with horizontal bars */}
                  {entries.map(([status, count]) => {
                    const barColor = colorMap[status] || C.textDim
                    const barWidth = (count / total) * 100
                    return (
                      <div
                        key={status}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 2,
                            background: barColor,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontSize: 12,
                            color: C.textMuted,
                            textTransform: "capitalize",
                            width: 100,
                            flexShrink: 0,
                          }}
                        >
                          {status.replace(/_/g, " ")}
                        </span>
                        <div
                          style={{
                            flex: 1,
                            height: 6,
                            borderRadius: 3,
                            background: `${barColor}20`,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${barWidth}%`,
                              background: barColor,
                              borderRadius: 3,
                              transition: "width 0.5s ease",
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: C.text,
                            width: 28,
                            textAlign: "right",
                            flexShrink: 0,
                          }}
                        >
                          {count}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            color: C.textDim,
                            width: 36,
                            textAlign: "right",
                            flexShrink: 0,
                          }}
                        >
                          {pct(count, total)}%
                        </span>
                      </div>
                    )
                  })}
                </div>
              )
            })()}
          </div>
        </div>
      </div>

      {/* ── Recent Orders + Sidebar Row ──────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 16,
          marginBottom: 20,
        }}
      >
        {/* Recent Orders Table */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <div>
              <h3 style={cardTitleStyle}>Recent Orders</h3>
              <p style={cardSubtitleStyle}>
                Latest {Math.min(filteredOrders.length, 10)} of {filteredOrders.length}{" "}
                orders
              </p>
            </div>
            <a
              href="/app/orders"
              style={{
                fontSize: 12,
                color: C.accent,
                textDecoration: "none",
              }}
            >
              View all &rarr;
            </a>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["Order", "Customer", "Total", "Status", "Date"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: h === "Total" ? "right" : "left",
                        padding: "10px 16px",
                        fontSize: 11,
                        fontWeight: 600,
                        color: C.textMuted,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        background: `${C.bgCard}`,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        padding: 32,
                        textAlign: "center",
                        color: C.textMuted,
                        fontSize: 13,
                      }}
                    >
                      No orders in this period
                    </td>
                  </tr>
                ) : (
                  filteredOrders.slice(0, 10).map((order) => (
                    <tr
                      key={order.id}
                      style={{
                        borderBottom: `1px solid ${C.border}`,
                        cursor: "pointer",
                        transition: "background 0.15s",
                      }}
                      onClick={() => (window.location.href = `/app/orders/${order.id}`)}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = C.bgCardHover)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td style={{ padding: "10px 16px" }}>
                        <span style={{ fontWeight: 600, color: C.accent }}>
                          #{order.display_id}
                        </span>
                      </td>
                      <td style={{ padding: "10px 16px", color: C.text }}>
                        {order.customer
                          ? `${order.customer.first_name || ""} ${order.customer.last_name || ""}`.trim() ||
                            order.email
                          : order.email}
                      </td>
                      <td
                        style={{
                          padding: "10px 16px",
                          textAlign: "right",
                          fontWeight: 600,
                          color: C.text,
                        }}
                      >
                        {formatCurrency(order.total, order.currency_code)}
                      </td>
                      <td style={{ padding: "10px 16px" }}>
                        <StatusBadge
                          status={order.fulfillment_status || order.status}
                        />
                      </td>
                      <td style={{ padding: "10px 16px" }}>
                        <div style={{ color: C.textMuted, fontSize: 12 }}>
                          {formatDate(order.created_at)}
                        </div>
                        <div style={{ color: C.textDim, fontSize: 11 }}>
                          {formatTime(order.created_at)}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right sidebar column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Email Performance Mini-Dashboard */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <h3 style={cardTitleStyle}>Email Performance</h3>
              <span style={{ fontSize: 12, color: C.textMuted }}>
                {emailStats ? `${emailStats.total_sent} sent` : "--"}
              </span>
            </div>
            <div style={cardBodyStyle}>
              {emailStats ? (
                <>
                  <ProgressBar
                    label="Delivery Rate"
                    value={emailStats.delivery_rate}
                    max={100}
                    color={C.green}
                    suffix="%"
                  />
                  <ProgressBar
                    label="Open Rate"
                    value={emailStats.open_rate}
                    max={100}
                    color={C.blue}
                    suffix="%"
                  />
                  <ProgressBar
                    label="Click Rate"
                    value={emailStats.click_rate}
                    max={100}
                    color={C.purple}
                    suffix="%"
                  />
                  <ProgressBar
                    label="Bounce Rate"
                    value={emailStats.bounce_rate}
                    max={100}
                    color={C.red}
                    suffix="%"
                  />
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 8,
                      marginTop: 12,
                      paddingTop: 12,
                      borderTop: `1px solid ${C.border}`,
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{ fontSize: 16, fontWeight: 700, color: C.green }}
                      >
                        {emailStats.delivered}
                      </div>
                      <div style={{ fontSize: 10, color: C.textDim }}>Delivered</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{ fontSize: 16, fontWeight: 700, color: C.blue }}
                      >
                        {emailStats.opened}
                      </div>
                      <div style={{ fontSize: 10, color: C.textDim }}>Opened</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{ fontSize: 16, fontWeight: 700, color: C.red }}
                      >
                        {emailStats.bounced}
                      </div>
                      <div style={{ fontSize: 10, color: C.textDim }}>Bounced</div>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: 16,
                    color: C.textMuted,
                    fontSize: 13,
                  }}
                >
                  Email data unavailable
                </div>
              )}
            </div>
          </div>

          {/* New Customers */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <h3 style={cardTitleStyle}>New Customers</h3>
              <a
                href="/app/customers"
                style={{ fontSize: 12, color: C.accent, textDecoration: "none" }}
              >
                View all &rarr;
              </a>
            </div>
            <div>
              {customers.length === 0 ? (
                <div
                  style={{
                    padding: 24,
                    textAlign: "center",
                    color: C.textMuted,
                    fontSize: 13,
                  }}
                >
                  No customers yet
                </div>
              ) : (
                customers.slice(0, 5).map((c, i) => (
                  <div
                    key={c.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 16px",
                      borderTop: i > 0 ? `1px solid ${C.border}` : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: C.accentDim,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 700,
                        color: C.accent,
                        flexShrink: 0,
                      }}
                    >
                      {(c.first_name?.[0] || c.email[0]).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: C.text,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.first_name && c.last_name
                          ? `${c.first_name} ${c.last_name}`
                          : c.email}
                      </div>
                      <div style={{ fontSize: 11, color: C.textDim }}>
                        {formatDate(c.created_at)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Top Products + Contact & Referral Details Row ────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
        }}
      >
        {/* Top Products */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <div>
              <h3 style={cardTitleStyle}>Top Products</h3>
              <p style={cardSubtitleStyle}>By revenue</p>
            </div>
          </div>
          <div>
            {stats.topProducts.length === 0 ? (
              <div
                style={{
                  padding: 32,
                  textAlign: "center",
                  color: C.textMuted,
                  fontSize: 13,
                }}
              >
                No product data
              </div>
            ) : (
              stats.topProducts.map((product, i) => {
                const maxRev = stats.topProducts[0]?.revenue || 1
                return (
                  <div
                    key={product.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 16px",
                      borderTop: i > 0 ? `1px solid ${C.border}` : "none",
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        background: C.accentDim,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        color: C.accent,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: C.text,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.name}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                        <div
                          style={{
                            flex: 1,
                            height: 4,
                            borderRadius: 2,
                            background: `${C.accent}20`,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${(product.revenue / maxRev) * 100}%`,
                              background: C.accent,
                              borderRadius: 2,
                            }}
                          />
                        </div>
                        <span style={{ fontSize: 11, color: C.textDim, flexShrink: 0 }}>
                          {product.quantity} units
                        </span>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: C.text,
                        flexShrink: 0,
                      }}
                    >
                      {formatCurrency(product.revenue)}
                    </span>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Contact Breakdown */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <div>
              <h3 style={cardTitleStyle}>Contact Submissions</h3>
              <p style={cardSubtitleStyle}>Status & inquiry breakdown</p>
            </div>
          </div>
          <div style={cardBodyStyle}>
            {contactStats ? (
              <>
                {/* Status breakdown */}
                <div style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: C.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      marginBottom: 8,
                    }}
                  >
                    By Status
                  </div>
                  {Object.entries(contactStats.by_status)
                    .sort((a, b) => b[1] - a[1])
                    .map(([status, count]) => {
                      const statusColors: Record<string, string> = {
                        new: C.blue,
                        read: C.yellow,
                        in_progress: C.accent,
                        replied: C.green,
                        resolved: C.green,
                        archived: C.textDim,
                      }
                      return (
                        <div
                          key={status}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "4px 0",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: 2,
                                background: statusColors[status] || C.textDim,
                              }}
                            />
                            <span
                              style={{
                                fontSize: 12,
                                color: C.textMuted,
                                textTransform: "capitalize",
                              }}
                            >
                              {status.replace(/_/g, " ")}
                            </span>
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>
                            {count}
                          </span>
                        </div>
                      )
                    })}
                </div>
                {/* Inquiry type breakdown */}
                <div
                  style={{
                    paddingTop: 12,
                    borderTop: `1px solid ${C.border}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: C.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      marginBottom: 8,
                    }}
                  >
                    By Inquiry Type
                  </div>
                  {Object.entries(contactStats.by_inquiry_type)
                    .sort((a, b) => b[1] - a[1])
                    .map(([type, count]) => (
                      <div
                        key={type}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "4px 0",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            color: C.textMuted,
                            textTransform: "capitalize",
                          }}
                        >
                          {type.replace(/_/g, " ")}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>
                          {count}
                        </span>
                      </div>
                    ))}
                </div>
                {/* SLA warning */}
                {contactSlaBreaches > 0 && (
                  <div
                    style={{
                      marginTop: 12,
                      padding: "8px 12px",
                      borderRadius: 6,
                      background: C.redDim,
                      border: `1px solid ${C.red}40`,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12,
                      color: C.red,
                      fontWeight: 600,
                    }}
                  >
                    {"\u26A0"} {contactSlaBreaches} SLA breach
                    {contactSlaBreaches !== 1 ? "es" : ""}
                  </div>
                )}
              </>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: 16,
                  color: C.textMuted,
                  fontSize: 13,
                }}
              >
                Contact data unavailable
              </div>
            )}
          </div>
        </div>

        {/* Referral Details */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <div>
              <h3 style={cardTitleStyle}>Referral Program</h3>
              <p style={cardSubtitleStyle}>Commissions & performance</p>
            </div>
          </div>
          <div style={cardBodyStyle}>
            {referralStats ? (
              <>
                {/* Commission stats */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  {[
                    {
                      label: "Pending",
                      value: `\u20AC${referralStats.total_pending.toFixed(2)}`,
                      color: C.yellow,
                    },
                    {
                      label: "Approved",
                      value: `\u20AC${referralStats.total_approved.toFixed(2)}`,
                      color: C.blue,
                    },
                    {
                      label: "Paid Out",
                      value: `\u20AC${referralStats.total_paid.toFixed(2)}`,
                      color: C.green,
                    },
                    {
                      label: "Rejected",
                      value: `\u20AC${referralStats.total_rejected.toFixed(2)}`,
                      color: C.red,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        padding: "8px 10px",
                        borderRadius: 6,
                        background: `${item.color}12`,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <div
                        style={{ fontSize: 15, fontWeight: 700, color: item.color }}
                      >
                        {item.value}
                      </div>
                      <div style={{ fontSize: 11, color: C.textDim }}>{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* Funnel metrics */}
                <div
                  style={{
                    paddingTop: 12,
                    borderTop: `1px solid ${C.border}`,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: C.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      marginBottom: 8,
                    }}
                  >
                    Funnel
                  </div>
                  {[
                    { label: "Total Clicks", value: referralStats.total_clicks },
                    { label: "Conversions", value: referralStats.total_referrals },
                    { label: "Conversion Rate", value: `${referralStats.conversion_rate}%` },
                    { label: "Active Referrers", value: referralStats.active_referrers },
                  ].map((row) => (
                    <div
                      key={row.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "3px 0",
                      }}
                    >
                      <span style={{ fontSize: 12, color: C.textMuted }}>{row.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Commissions by level */}
                {Object.keys(referralStats.commissions_by_level).length > 0 && (
                  <div
                    style={{
                      paddingTop: 12,
                      borderTop: `1px solid ${C.border}`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: C.textMuted,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        marginBottom: 8,
                      }}
                    >
                      By Level
                    </div>
                    {Object.entries(referralStats.commissions_by_level)
                      .sort(([a], [b]) => Number(a) - Number(b))
                      .map(([level, data]) => {
                        const rates = ["5%", "3%", "2%", "1%", "0.5%"]
                        const levelIdx = Number(level) - 1
                        return (
                          <div
                            key={level}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "3px 0",
                            }}
                          >
                            <span style={{ fontSize: 12, color: C.textMuted }}>
                              Level {level}{" "}
                              <span style={{ color: C.textDim }}>
                                ({rates[levelIdx] || "?"})
                              </span>
                            </span>
                            <span style={{ fontSize: 12, color: C.text }}>
                              {data.count} &middot;{" "}
                              <span style={{ fontWeight: 600 }}>
                                {"\u20AC"}{data.total.toFixed(2)}
                              </span>
                            </span>
                          </div>
                        )
                      })}
                  </div>
                )}
              </>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: 16,
                  color: C.textMuted,
                  fontSize: 13,
                }}
              >
                Referral data unavailable
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const config = defineRouteConfig({
  label: "Analytics",
})

export default AnalyticsPage
