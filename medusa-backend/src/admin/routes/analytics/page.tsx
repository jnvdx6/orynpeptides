import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChartBar } from "@medusajs/icons"
import {
  Container,
  Heading,
  Text,
  Badge,
  Button,
  StatusBadge,
  Table,
} from "@medusajs/ui"
import { useQuery } from "@tanstack/react-query"
import { sdk } from "../../lib/sdk"
import { useState } from "react"

// --- Types ---

type Order = {
  id: string
  display_id: number
  email: string
  total: number
  currency_code: string
  status: string
  payment_status: string
  created_at: string
}

type EmailStats = {
  total_sent: number
  delivery_rate: number
}

type NewsletterStats = {
  active: number
  growth_last_30_days: number
}

type ContactStats = {
  open_count: number
  sla_breaches: number
}

type ReferralStats = {
  total_referrals: number
  total_paid: number
}

type DateRange = "today" | "7d" | "30d" | "90d" | "all"

// --- Helpers ---

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency || "EUR" }).format(amount)
}

function orderStatusColor(s: string): "green" | "orange" | "red" | "grey" {
  switch (s) {
    case "completed": return "green"
    case "pending": return "orange"
    case "canceled": case "cancelled": return "red"
    default: return "grey"
  }
}

// --- Component ---

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState<DateRange>("30d")

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryFn: () =>
      sdk.client.fetch<{ orders: Order[]; count: number }>("/admin/orders?limit=10&order=-created_at", { method: "GET" }),
    queryKey: ["analytics-orders"],
    refetchInterval: 60_000,
  })

  const { data: emailStats } = useQuery({
    queryFn: () =>
      sdk.client.fetch<{ stats: EmailStats }>("/admin/email-logs?stats_only=true", { method: "GET" }),
    queryKey: ["analytics-email"],
    refetchInterval: 60_000,
  })

  const { data: newsletterStats } = useQuery({
    queryFn: () =>
      sdk.client.fetch<{ stats: NewsletterStats }>("/admin/newsletter-subscribers?stats_only=true", { method: "GET" }),
    queryKey: ["analytics-newsletter"],
    refetchInterval: 60_000,
  })

  const { data: contactStats } = useQuery({
    queryFn: () =>
      sdk.client.fetch<{ stats: ContactStats }>("/admin/contact-submissions?stats_only=true", { method: "GET" }),
    queryKey: ["analytics-contact"],
    refetchInterval: 60_000,
  })

  const { data: referralStats } = useQuery({
    queryFn: () =>
      sdk.client.fetch<{ stats: ReferralStats }>("/admin/referrals?stats_only=true", { method: "GET" }),
    queryKey: ["analytics-referrals"],
    refetchInterval: 60_000,
  })

  const orders = ordersData?.orders ?? []
  const totalOrders = ordersData?.count ?? 0

  // Compute KPIs from orders
  const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
  const aov = orders.length > 0 ? revenue / orders.length : 0
  const currency = orders[0]?.currency_code || "EUR"

  const ranges: { label: string; value: DateRange }[] = [
    { label: "Today", value: "today" },
    { label: "7d", value: "7d" },
    { label: "30d", value: "30d" },
    { label: "90d", value: "90d" },
    { label: "All", value: "all" },
  ]

  return (
    <div className="flex flex-col gap-y-2">
      {/* Header with date range */}
      <Container className="p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <Heading level="h1">Analytics</Heading>
            <Text size="small" className="text-ui-fg-muted mt-1">
              Overview of your store performance. Auto-refreshes every 60s.
            </Text>
          </div>
          <div className="flex items-center gap-x-1">
            {ranges.map((r) => (
              <Button
                key={r.value}
                variant={dateRange === r.value ? "primary" : "secondary"}
                size="small"
                onClick={() => setDateRange(r.value)}
              >
                {r.label}
              </Button>
            ))}
          </div>
        </div>
      </Container>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">Revenue</Text>
          <Heading level="h2" className="text-2xl">{formatCurrency(revenue, currency)}</Heading>
        </Container>
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">Orders</Text>
          <Heading level="h2" className="text-2xl">{totalOrders}</Heading>
        </Container>
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">AOV</Text>
          <Heading level="h2" className="text-2xl">{formatCurrency(aov, currency)}</Heading>
        </Container>
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">Recent Orders</Text>
          <Heading level="h2" className="text-2xl">{orders.length}</Heading>
        </Container>
      </div>

      {/* Module Stats */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">Email</Text>
          <div className="flex items-baseline gap-x-2">
            <Heading level="h2" className="text-xl">{emailStats?.stats?.total_sent ?? 0}</Heading>
            <Text size="xsmall" className="text-ui-fg-muted">sent</Text>
          </div>
          <Text size="xsmall" className="text-ui-fg-muted">
            {emailStats?.stats?.delivery_rate ?? 0}% delivery rate
          </Text>
        </Container>
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">Newsletter</Text>
          <div className="flex items-baseline gap-x-2">
            <Heading level="h2" className="text-xl">{newsletterStats?.stats?.active ?? 0}</Heading>
            <Text size="xsmall" className="text-ui-fg-muted">subscribers</Text>
          </div>
          <Text size="xsmall" className="text-ui-fg-interactive">
            +{newsletterStats?.stats?.growth_last_30_days ?? 0} last 30d
          </Text>
        </Container>
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">Contact</Text>
          <div className="flex items-baseline gap-x-2">
            <Heading level="h2" className="text-xl">{contactStats?.stats?.open_count ?? 0}</Heading>
            <Text size="xsmall" className="text-ui-fg-muted">open</Text>
          </div>
          <Text size="xsmall" className="text-ui-fg-error">
            {contactStats?.stats?.sla_breaches ?? 0} SLA breaches
          </Text>
        </Container>
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">Referrals</Text>
          <div className="flex items-baseline gap-x-2">
            <Heading level="h2" className="text-xl">{referralStats?.stats?.total_referrals ?? 0}</Heading>
            <Text size="xsmall" className="text-ui-fg-muted">total</Text>
          </div>
          <Text size="xsmall" className="text-ui-fg-interactive">
            {formatCurrency(referralStats?.stats?.total_paid ?? 0, "EUR")} paid
          </Text>
        </Container>
      </div>

      {/* Recent Orders Table */}
      <Container className="divide-y p-0">
        <div className="px-6 py-4">
          <Heading level="h2">Recent Orders</Heading>
        </div>
        <div className="px-6 py-4">
          {ordersLoading ? (
            <div className="flex items-center justify-center py-12">
              <Text className="text-ui-fg-muted">Loading orders...</Text>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Text className="text-ui-fg-muted">No orders yet</Text>
            </div>
          ) : (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Order</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Total</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Payment</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {orders.map((order) => (
                  <Table.Row key={order.id}>
                    <Table.Cell>
                      <Text size="small" className="font-medium">#{order.display_id}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="small" className="text-ui-fg-muted">{order.email}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="small" className="font-medium">
                        {formatCurrency(order.total, order.currency_code)}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <StatusBadge color={orderStatusColor(order.status)}>
                        {order.status}
                      </StatusBadge>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge
                        color={order.payment_status === "captured" ? "green" : "orange"}
                        size="2xsmall"
                      >
                        {order.payment_status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="small" className="text-ui-fg-muted">{formatDate(order.created_at)}</Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
      </Container>
    </div>
  )
}

export const config = defineRouteConfig({
  label: "Analytics",
  icon: ChartBar,
})

export default AnalyticsPage
