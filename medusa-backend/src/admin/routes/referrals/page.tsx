import { defineRouteConfig } from "@medusajs/admin-sdk"
import { CurrencyDollar } from "@medusajs/icons"
import {
  Container,
  Heading,
  Text,
  Badge,
  Button,
  StatusBadge,
  Table,
  Tabs,
  Input,
  FocusModal,
  toast,
} from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { sdk } from "../../lib/sdk"
import { useState } from "react"

// --- Types ---

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
}

// --- Helpers ---

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency || "EUR" }).format(amount)
}

function commissionStatusColor(s: string): "green" | "orange" | "red" | "blue" | "grey" {
  switch (s) {
    case "pending": return "orange"
    case "approved": return "blue"
    case "paid": return "green"
    case "rejected": case "cancelled": return "red"
    default: return "grey"
  }
}

function linkStatusColor(s: string): "green" | "red" | "grey" {
  switch (s) {
    case "active": return "green"
    case "inactive": return "grey"
    case "expired": return "red"
    default: return "grey"
  }
}

const LEVEL_LABELS: Record<number, string> = {
  1: "L1 (5%)",
  2: "L2 (3%)",
  3: "L3 (2%)",
  4: "L4 (1%)",
  5: "L5 (0.5%)",
}

// --- Component ---

const ReferralsPage = () => {
  const queryClient = useQueryClient()
  const [payoutModalOpen, setPayoutModalOpen] = useState(false)
  const [payoutCommissionId, setPayoutCommissionId] = useState("")
  const [payoutMethod, setPayoutMethod] = useState("")
  const [payoutReference, setPayoutReference] = useState("")

  const { data, isLoading } = useQuery({
    queryFn: () =>
      sdk.client.fetch<{ commissions: Commission[]; referral_links: ReferralLink[]; stats: Stats }>(
        "/admin/referrals",
        { method: "GET" }
      ),
    queryKey: ["referrals"],
  })

  const actionMutation = useMutation({
    mutationFn: ({ id, action, body }: { id: string; action: string; body?: Record<string, unknown> }) =>
      sdk.client.fetch(`/admin/commissions/${id}/${action}`, { method: "POST", body: body || {} }),
    onSuccess: (_data, variables) => {
      toast.success(`Commission ${variables.action}d`)
      queryClient.invalidateQueries({ queryKey: ["referrals"] })
    },
    onError: () => toast.error("Action failed"),
  })

  const commissions = data?.commissions ?? []
  const links = data?.referral_links ?? []
  const stats = data?.stats

  const handleApprove = (id: string) => actionMutation.mutate({ id, action: "approve" })
  const handleReject = (id: string) => actionMutation.mutate({ id, action: "reject" })

  const handleMarkPaid = () => {
    actionMutation.mutate({
      id: payoutCommissionId,
      action: "pay",
      body: { payout_method: payoutMethod, payout_reference: payoutReference },
    })
    setPayoutModalOpen(false)
    setPayoutMethod("")
    setPayoutReference("")
  }

  const openPayoutModal = (id: string) => {
    setPayoutCommissionId(id)
    setPayoutModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-y-2">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
        {[
          { label: "Total Referrals", value: stats?.total_referrals ?? 0 },
          { label: "Active Referrers", value: stats?.active_referrers ?? 0 },
          { label: "Total Clicks", value: stats?.total_clicks ?? 0 },
          { label: "Conversion Rate", value: `${stats?.conversion_rate ?? 0}%` },
          { label: "Pending", value: formatCurrency(stats?.total_pending ?? 0, "EUR") },
        ].map((card) => (
          <Container key={card.label} className="p-4">
            <Text size="small" className="text-ui-fg-muted mb-1">{card.label}</Text>
            <Heading level="h2" className="text-xl">{card.value}</Heading>
          </Container>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">Total Commissions</Text>
          <Heading level="h2" className="text-xl">{formatCurrency(stats?.total_commissions_generated ?? 0, "EUR")}</Heading>
        </Container>
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">Total Paid</Text>
          <Heading level="h2" className="text-xl text-ui-fg-interactive">{formatCurrency(stats?.total_paid ?? 0, "EUR")}</Heading>
        </Container>
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">Total Rejected</Text>
          <Heading level="h2" className="text-xl">{formatCurrency(stats?.total_rejected ?? 0, "EUR")}</Heading>
        </Container>
      </div>

      {/* Tabs */}
      <Container className="divide-y p-0">
        <Tabs defaultValue="commissions">
          <div className="flex items-center justify-between px-6 py-4">
            <Heading level="h1">Referrals & Commissions</Heading>
            <Tabs.List>
              <Tabs.Trigger value="commissions">Commissions</Tabs.Trigger>
              <Tabs.Trigger value="links">Referral Links</Tabs.Trigger>
            </Tabs.List>
          </div>

          {/* Commissions Tab */}
          <Tabs.Content value="commissions">
            <div className="px-6 py-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Text className="text-ui-fg-muted">Loading commissions...</Text>
                </div>
              ) : commissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Text className="text-ui-fg-muted">No commissions yet</Text>
                </div>
              ) : (
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                      <Table.HeaderCell>Beneficiary</Table.HeaderCell>
                      <Table.HeaderCell>Order</Table.HeaderCell>
                      <Table.HeaderCell>Level</Table.HeaderCell>
                      <Table.HeaderCell>Rate</Table.HeaderCell>
                      <Table.HeaderCell>Amount</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                      <Table.HeaderCell className="text-right">Actions</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {commissions.map((c) => (
                      <Table.Row key={c.id}>
                        <Table.Cell>
                          <Text size="small" className="text-ui-fg-muted">{formatDate(c.created_at)}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text size="small" className="font-mono text-xs">{c.beneficiary_customer_id.slice(0, 12)}...</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text size="small" className="font-mono text-xs">{c.order_id.slice(0, 12)}...</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge color="grey" size="2xsmall">{LEVEL_LABELS[c.level] || `L${c.level}`}</Badge>
                        </Table.Cell>
                        <Table.Cell>
                          <Text size="small">{c.rate}%</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text size="small" className="font-medium">
                            {formatCurrency(c.commission_amount, c.currency_code)}
                          </Text>
                        </Table.Cell>
                        <Table.Cell>
                          <StatusBadge color={commissionStatusColor(c.status)}>{c.status}</StatusBadge>
                        </Table.Cell>
                        <Table.Cell className="text-right">
                          <div className="flex items-center justify-end gap-x-1">
                            {c.status === "pending" && (
                              <>
                                <Button variant="secondary" size="small" onClick={() => handleApprove(c.id)}>
                                  Approve
                                </Button>
                                <Button variant="secondary" size="small" onClick={() => handleReject(c.id)}>
                                  Reject
                                </Button>
                              </>
                            )}
                            {c.status === "approved" && (
                              <Button size="small" onClick={() => openPayoutModal(c.id)}>
                                Mark Paid
                              </Button>
                            )}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
            </div>
          </Tabs.Content>

          {/* Referral Links Tab */}
          <Tabs.Content value="links">
            <div className="px-6 py-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Text className="text-ui-fg-muted">Loading referral links...</Text>
                </div>
              ) : links.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Text className="text-ui-fg-muted">No referral links yet</Text>
                </div>
              ) : (
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Code</Table.HeaderCell>
                      <Table.HeaderCell>Referrer</Table.HeaderCell>
                      <Table.HeaderCell>Referred</Table.HeaderCell>
                      <Table.HeaderCell>Level</Table.HeaderCell>
                      <Table.HeaderCell>Clicks</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {links.map((link) => (
                      <Table.Row key={link.id}>
                        <Table.Cell>
                          <Text size="small" className="font-mono font-medium">{link.referral_code}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text size="small" className="font-mono text-xs text-ui-fg-muted">
                            {link.referrer_customer_id.slice(0, 12)}...
                          </Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text size="small" className="font-mono text-xs text-ui-fg-muted">
                            {link.referred_customer_id?.slice(0, 12) || "--"}...
                          </Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge color="grey" size="2xsmall">{LEVEL_LABELS[link.level] || `L${link.level}`}</Badge>
                        </Table.Cell>
                        <Table.Cell>
                          <Text size="small">{link.clicks}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <StatusBadge color={linkStatusColor(link.status)}>{link.status}</StatusBadge>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
            </div>
          </Tabs.Content>
        </Tabs>
      </Container>

      {/* Payout Modal */}
      <FocusModal open={payoutModalOpen} onOpenChange={setPayoutModalOpen}>
        <FocusModal.Content>
          <FocusModal.Header>
            <Button size="small" onClick={handleMarkPaid} disabled={!payoutMethod.trim()}>
              Confirm Payment
            </Button>
          </FocusModal.Header>
          <FocusModal.Body className="flex flex-col gap-y-4 p-6">
            <Heading level="h2">Mark Commission as Paid</Heading>
            <Text size="small" className="text-ui-fg-muted">
              Enter the payout details for this commission.
            </Text>
            <div>
              <Text size="small" className="text-ui-fg-muted mb-1">Payout Method</Text>
              <Input
                placeholder="e.g. PayPal, Bank Transfer, Crypto"
                value={payoutMethod}
                onChange={(e) => setPayoutMethod(e.target.value)}
              />
            </div>
            <div>
              <Text size="small" className="text-ui-fg-muted mb-1">Reference / Transaction ID</Text>
              <Input
                placeholder="e.g. TXN-12345"
                value={payoutReference}
                onChange={(e) => setPayoutReference(e.target.value)}
              />
            </div>
          </FocusModal.Body>
        </FocusModal.Content>
      </FocusModal>
    </div>
  )
}

export const config = defineRouteConfig({
  label: "Referrals",
  icon: CurrencyDollar,
})

export default ReferralsPage
