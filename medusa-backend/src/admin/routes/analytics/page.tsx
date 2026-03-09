import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text, Badge, Select, Toaster } from "@medusajs/ui"
import { useEffect, useState, useMemo } from "react"
import {
  ChartBar,
  ShoppingBag,
  CurrencyDollar,
  Users,
  ArrowUpRightMini,
  ArrowDownRightMini,
  Clock,
  CreditCard,
} from "@medusajs/icons"

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
  orders?: { id: string }[]
}

type DateRange = "today" | "7d" | "30d" | "90d" | "all"

const formatCurrency = (amount: number, currency = "gbp") => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

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

const StatusBadge = ({ status }: { status: string }) => {
  const colorMap: Record<string, "green" | "orange" | "red" | "blue" | "grey" | "purple"> = {
    completed: "green",
    captured: "green",
    paid: "green",
    shipped: "blue",
    fulfilled: "blue",
    pending: "orange",
    not_fulfilled: "orange",
    awaiting: "orange",
    requires_action: "orange",
    canceled: "red",
    refunded: "red",
    not_paid: "grey",
  }
  const color = colorMap[status] || "grey"
  return <Badge color={color} size="xsmall">{status.replace(/_/g, " ")}</Badge>
}

// Simple inline sparkline using SVG
const MiniChart = ({ data, color = "#7c3aed" }: { data: number[]; color?: string }) => {
  if (data.length < 2) return null
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const range = max - min || 1
  const w = 120
  const h = 32
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 4) - 2
    return `${x},${y}`
  }).join(" ")

  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const KPICard = ({
  title,
  value,
  change,
  icon: Icon,
  chartData,
  chartColor,
}: {
  title: string
  value: string
  change?: number
  icon: React.ComponentType<{ className?: string }>
  chartData?: number[]
  chartColor?: string
}) => (
  <div className="bg-ui-bg-base border border-ui-border-base rounded-lg p-5 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-ui-bg-subtle flex items-center justify-center">
          <Icon className="text-ui-fg-muted" />
        </div>
        <Text size="small" className="text-ui-fg-muted">{title}</Text>
      </div>
      {change !== undefined && (
        <div className={`flex items-center gap-0.5 text-xs font-medium ${change >= 0 ? "text-ui-fg-interactive" : "text-ui-tag-red-text"}`}>
          {change >= 0 ? <ArrowUpRightMini /> : <ArrowDownRightMini />}
          {Math.abs(change).toFixed(1)}%
        </div>
      )}
    </div>
    <div className="flex items-end justify-between">
      <Heading level="h2" className="text-2xl font-bold">{value}</Heading>
      {chartData && chartData.length > 1 && <MiniChart data={chartData} color={chartColor} />}
    </div>
  </div>
)

const AnalyticsPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<DateRange>("30d")
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const fetchData = async () => {
    setLoading(true)
    try {
      const [ordersRes, customersRes] = await Promise.all([
        fetch("/admin/orders?limit=100&order=-created_at&fields=id,display_id,email,total,subtotal,currency_code,status,fulfillment_status,payment_status,created_at,items.*,customer.*,shipping_address.*", {
          credentials: "include",
        }),
        fetch("/admin/customers?limit=100&order=-created_at&fields=id,email,first_name,last_name,created_at", {
          credentials: "include",
        }),
      ])

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json()
        setOrders(ordersData.orders || [])
      }
      if (customersRes.ok) {
        const customersData = await customersRes.json()
        setCustomers(customersData.customers || [])
      }
      setLastRefresh(new Date())
    } catch (err) {
      console.error("Failed to fetch analytics data:", err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000) // refresh every 60s
    return () => clearInterval(interval)
  }, [])

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

    // Revenue by day (last 7 buckets for sparkline)
    const now = new Date()
    const buckets = 7
    const rangeMs = now.getTime() - getDateRange(dateRange).getTime()
    const bucketMs = rangeMs / buckets
    const revenueByBucket: number[] = Array(buckets).fill(0)
    const ordersByBucket: number[] = Array(buckets).fill(0)

    filteredOrders.forEach((o) => {
      const orderTime = new Date(o.created_at).getTime()
      const bucketIndex = Math.min(
        Math.floor((orderTime - getDateRange(dateRange).getTime()) / bucketMs),
        buckets - 1
      )
      if (bucketIndex >= 0) {
        revenueByBucket[bucketIndex] += o.total || 0
        ordersByBucket[bucketIndex] += 1
      }
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

    // Compare with previous period for change %
    const start = getDateRange(dateRange)
    const periodMs = now.getTime() - start.getTime()
    const prevStart = new Date(start.getTime() - periodMs)
    const prevOrders = orders.filter(
      (o) => new Date(o.created_at) >= prevStart && new Date(o.created_at) < start
    )
    const prevRevenue = prevOrders.reduce((sum, o) => sum + (o.total || 0), 0)
    const revenueChange = prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : 0
    const orderChange = prevOrders.length > 0 ? ((orderCount - prevOrders.length) / prevOrders.length) * 100 : 0

    // Top countries
    const countryMap: Record<string, number> = {}
    filteredOrders.forEach((o) => {
      const cc = o.shipping_address?.country_code?.toUpperCase() || "N/A"
      countryMap[cc] = (countryMap[cc] || 0) + 1
    })
    const topCountries = Object.entries(countryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    return {
      totalRevenue,
      orderCount,
      aov,
      uniqueCustomers,
      statusCounts,
      revenueByBucket,
      ordersByBucket,
      topProducts,
      revenueChange,
      orderChange,
      topCountries,
    }
  }, [filteredOrders, orders, dateRange])

  // Revenue bar chart
  const RevenueBarChart = () => {
    const data = stats.revenueByBucket
    const max = Math.max(...data, 1)
    const barW = 100 / data.length

    return (
      <div className="h-40 flex items-end gap-1 px-2">
        {data.map((val, i) => {
          const height = (val / max) * 100
          return (
            <div
              key={i}
              className="flex-1 group relative"
              style={{ height: "100%" }}
            >
              <div
                className="absolute bottom-0 w-full bg-ui-tag-purple-bg hover:bg-ui-tag-purple-icon transition-colors rounded-t"
                style={{ height: `${Math.max(height, 2)}%` }}
              />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-ui-bg-base border border-ui-border-base rounded px-2 py-1 text-xs whitespace-nowrap shadow-md z-10">
                {formatCurrency(val)}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Status distribution
  const StatusDistribution = () => {
    const entries = Object.entries(stats.statusCounts).sort((a, b) => b[1] - a[1])
    const total = entries.reduce((sum, [, count]) => sum + count, 0) || 1

    const colors: Record<string, string> = {
      completed: "bg-ui-tag-green-bg",
      captured: "bg-ui-tag-green-bg",
      fulfilled: "bg-ui-tag-blue-bg",
      shipped: "bg-ui-tag-blue-bg",
      pending: "bg-ui-tag-orange-bg",
      not_fulfilled: "bg-ui-tag-orange-bg",
      canceled: "bg-ui-tag-red-bg",
      refunded: "bg-ui-tag-red-bg",
    }

    return (
      <div className="space-y-3">
        <div className="flex h-3 rounded overflow-hidden gap-0.5">
          {entries.map(([status, count]) => (
            <div
              key={status}
              className={`${colors[status] || "bg-ui-bg-subtle"} transition-all`}
              style={{ width: `${(count / total) * 100}%` }}
            />
          ))}
        </div>
        <div className="space-y-2">
          {entries.map(([status, count]) => (
            <div key={status} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-sm ${colors[status] || "bg-ui-bg-subtle"}`} />
                <Text size="small" className="text-ui-fg-subtle capitalize">
                  {status.replace(/_/g, " ")}
                </Text>
              </div>
              <div className="flex items-center gap-2">
                <Text size="small" className="font-medium">{count}</Text>
                <Text size="xsmall" className="text-ui-fg-muted">
                  ({((count / total) * 100).toFixed(0)}%)
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (loading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-ui-border-interactive border-t-transparent rounded-full animate-spin mx-auto" />
          <Text className="text-ui-fg-muted">Loading analytics...</Text>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Heading level="h1" className="text-2xl font-bold">Analytics Dashboard</Heading>
          <Text className="text-ui-fg-muted mt-1">
            Real-time store performance overview
          </Text>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-ui-fg-muted">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Live &middot; {lastRefresh.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <Select size="small" value={dateRange} onValueChange={(v) => setDateRange(v as DateRange)}>
            <Select.Trigger>
              <Select.Value placeholder="Period" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="today">Today</Select.Item>
              <Select.Item value="7d">Last 7 days</Select.Item>
              <Select.Item value="30d">Last 30 days</Select.Item>
              <Select.Item value="90d">Last 90 days</Select.Item>
              <Select.Item value="all">All time</Select.Item>
            </Select.Content>
          </Select>
          <button
            onClick={fetchData}
            className="px-3 py-1.5 text-xs bg-ui-bg-subtle hover:bg-ui-bg-subtle-hover border border-ui-border-base rounded-md transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          change={stats.revenueChange}
          icon={CurrencyDollar}
          chartData={stats.revenueByBucket}
          chartColor="#7c3aed"
        />
        <KPICard
          title="Orders"
          value={stats.orderCount.toString()}
          change={stats.orderChange}
          icon={ShoppingBag}
          chartData={stats.ordersByBucket}
          chartColor="#2563eb"
        />
        <KPICard
          title="Average Order Value"
          value={formatCurrency(stats.aov)}
          icon={CreditCard}
        />
        <KPICard
          title="Unique Customers"
          value={stats.uniqueCustomers.toString()}
          icon={Users}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <Container className="lg:col-span-2 p-0">
          <div className="px-6 py-4 border-b border-ui-border-base">
            <Heading level="h2" className="text-base">Revenue Over Time</Heading>
            <Text size="small" className="text-ui-fg-muted mt-0.5">
              Revenue distribution across the selected period
            </Text>
          </div>
          <div className="p-6">
            <RevenueBarChart />
          </div>
        </Container>

        {/* Order Status */}
        <Container className="p-0">
          <div className="px-6 py-4 border-b border-ui-border-base">
            <Heading level="h2" className="text-base">Order Status</Heading>
            <Text size="small" className="text-ui-fg-muted mt-0.5">
              Fulfillment breakdown
            </Text>
          </div>
          <div className="p-6">
            <StatusDistribution />
          </div>
        </Container>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Orders */}
        <Container className="lg:col-span-2 p-0">
          <div className="px-6 py-4 border-b border-ui-border-base flex items-center justify-between">
            <div>
              <Heading level="h2" className="text-base">Recent Orders</Heading>
              <Text size="small" className="text-ui-fg-muted mt-0.5">
                Latest {Math.min(filteredOrders.length, 10)} orders
              </Text>
            </div>
            <a
              href="/app/orders"
              className="text-xs text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
            >
              View all &rarr;
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ui-border-base bg-ui-bg-subtle">
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-ui-fg-muted">Order</th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-ui-fg-muted">Customer</th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-ui-fg-muted">Date</th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-ui-fg-muted">Status</th>
                  <th className="text-right px-4 py-2.5 text-xs font-medium text-ui-fg-muted">Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.slice(0, 10).map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-ui-border-base hover:bg-ui-bg-subtle-hover cursor-pointer transition-colors"
                    onClick={() => window.location.href = `/app/orders/${order.id}`}
                  >
                    <td className="px-4 py-3">
                      <Text size="small" className="font-medium text-ui-fg-interactive">
                        #{order.display_id}
                      </Text>
                    </td>
                    <td className="px-4 py-3">
                      <Text size="small">{order.email}</Text>
                    </td>
                    <td className="px-4 py-3">
                      <Text size="small" className="text-ui-fg-subtle">
                        {formatDate(order.created_at)}
                      </Text>
                      <Text size="xsmall" className="text-ui-fg-muted">
                        {formatTime(order.created_at)}
                      </Text>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.fulfillment_status || order.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Text size="small" className="font-medium">
                        {formatCurrency(order.total, order.currency_code)}
                      </Text>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center">
                      <Text className="text-ui-fg-muted">No orders in this period</Text>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Container>

        {/* Right column */}
        <div className="space-y-4">
          {/* Top Products */}
          <Container className="p-0">
            <div className="px-6 py-4 border-b border-ui-border-base">
              <Heading level="h2" className="text-base">Top Products</Heading>
              <Text size="small" className="text-ui-fg-muted mt-0.5">By revenue</Text>
            </div>
            <div className="divide-y divide-ui-border-base">
              {stats.topProducts.length > 0 ? (
                stats.topProducts.map((product, i) => (
                  <div key={product.name} className="px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded bg-ui-bg-subtle flex items-center justify-center text-xs font-medium text-ui-fg-muted">
                        {i + 1}
                      </span>
                      <div>
                        <Text size="small" className="font-medium">{product.name}</Text>
                        <Text size="xsmall" className="text-ui-fg-muted">
                          {product.quantity} units sold
                        </Text>
                      </div>
                    </div>
                    <Text size="small" className="font-medium">
                      {formatCurrency(product.revenue)}
                    </Text>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center">
                  <Text className="text-ui-fg-muted">No product data</Text>
                </div>
              )}
            </div>
          </Container>

          {/* Top Countries */}
          <Container className="p-0">
            <div className="px-6 py-4 border-b border-ui-border-base">
              <Heading level="h2" className="text-base">Top Countries</Heading>
            </div>
            <div className="divide-y divide-ui-border-base">
              {stats.topCountries.length > 0 ? (
                stats.topCountries.map(([code, count]) => {
                  const pct = ((count / (stats.orderCount || 1)) * 100).toFixed(0)
                  return (
                    <div key={code} className="px-6 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Text size="small" className="font-medium">{code}</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded bg-ui-bg-subtle overflow-hidden">
                          <div
                            className="h-full bg-ui-tag-blue-bg rounded"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <Text size="xsmall" className="text-ui-fg-muted w-12 text-right">
                          {count} ({pct}%)
                        </Text>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="px-6 py-8 text-center">
                  <Text className="text-ui-fg-muted">No location data</Text>
                </div>
              )}
            </div>
          </Container>

          {/* Recent Customers */}
          <Container className="p-0">
            <div className="px-6 py-4 border-b border-ui-border-base flex items-center justify-between">
              <Heading level="h2" className="text-base">New Customers</Heading>
              <a
                href="/app/customers"
                className="text-xs text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
              >
                View all &rarr;
              </a>
            </div>
            <div className="divide-y divide-ui-border-base">
              {customers.slice(0, 5).map((customer) => (
                <div key={customer.id} className="px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-ui-tag-purple-bg flex items-center justify-center text-xs font-medium text-ui-tag-purple-text">
                      {(customer.first_name?.[0] || customer.email[0]).toUpperCase()}
                    </div>
                    <div>
                      <Text size="small" className="font-medium">
                        {customer.first_name && customer.last_name
                          ? `${customer.first_name} ${customer.last_name}`
                          : customer.email}
                      </Text>
                      <Text size="xsmall" className="text-ui-fg-muted">
                        {formatDate(customer.created_at)}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
              {customers.length === 0 && (
                <div className="px-6 py-8 text-center">
                  <Text className="text-ui-fg-muted">No customers yet</Text>
                </div>
              )}
            </div>
          </Container>
        </div>
      </div>

      <Toaster />
    </div>
  )
}

export const config = defineRouteConfig({
  label: "Analytics",
  icon: ChartBar,
})

export default AnalyticsPage
