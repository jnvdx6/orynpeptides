import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Table, Badge, Text, Button, Tabs } from "@medusajs/ui"
import { useEffect, useState } from "react"

type ReferralLink = {
  id: string
  referrer_customer_id: string
  referred_customer_id: string
  referral_code: string
  level: number
  created_at: string
}

type Commission = {
  id: string
  beneficiary_customer_id: string
  source_customer_id: string
  order_id: string
  level: number
  rate: number
  order_amount: number
  commission_amount: number
  currency_code: string
  status: "pending" | "approved" | "paid" | "rejected"
  created_at: string
}

const statusColors: Record<string, "orange" | "blue" | "green" | "red"> = {
  pending: "orange",
  approved: "blue",
  paid: "green",
  rejected: "red",
}

const ReferralsPage = () => {
  const [links, setLinks] = useState<ReferralLink[]>([])
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [totals, setTotals] = useState({ pending: 0, paid: 0 })
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const [linksRes, commissionsRes] = await Promise.all([
        fetch("/admin/referrals", { credentials: "include" }),
        fetch("/admin/commissions", { credentials: "include" }),
      ])
      const linksData = await linksRes.json()
      const commissionsData = await commissionsRes.json()
      setLinks(linksData.referral_links || [])
      setCommissions(commissionsData.commissions || [])
      setTotals(commissionsData.totals || { pending: 0, paid: 0 })
    } catch (e) {
      console.error("Failed to fetch referral data", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const updateCommissionStatus = async (id: string, status: string) => {
    await fetch(`/admin/commissions/${id}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    fetchData()
  }

  if (loading) {
    return (
      <Container className="divide-y p-0">
        <div className="px-6 py-4">
          <Heading level="h1">Referrals & Commissions</Heading>
          <Text className="text-ui-fg-subtle mt-2">Loading...</Text>
        </div>
      </Container>
    )
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h1">Referrals & Commissions</Heading>
          <Text className="text-ui-fg-subtle mt-1">
            Pending: {totals.pending.toFixed(2)} EUR | Paid:{" "}
            {totals.paid.toFixed(2)} EUR
          </Text>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="commissions">
          <Tabs.List>
            <Tabs.Trigger value="commissions">
              Commissions ({commissions.length})
            </Tabs.Trigger>
            <Tabs.Trigger value="links">
              Referral Links ({links.filter((l) => l.level === 1).length})
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="commissions" className="mt-4">
            {commissions.length === 0 ? (
              <Text>No commissions yet.</Text>
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
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {commissions.map((c) => (
                    <Table.Row key={c.id}>
                      <Table.Cell>
                        {new Date(c.created_at).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell className="font-mono text-xs">
                        {c.beneficiary_customer_id.slice(0, 12)}...
                      </Table.Cell>
                      <Table.Cell className="font-mono text-xs">
                        {c.order_id.slice(0, 12)}...
                      </Table.Cell>
                      <Table.Cell>L{c.level}</Table.Cell>
                      <Table.Cell>{(c.rate * 100).toFixed(1)}%</Table.Cell>
                      <Table.Cell>
                        {c.commission_amount.toFixed(2)}{" "}
                        {c.currency_code.toUpperCase()}
                      </Table.Cell>
                      <Table.Cell>
                        <Badge color={statusColors[c.status]}>
                          {c.status}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex gap-1">
                          {c.status === "pending" && (
                            <Button
                              size="small"
                              onClick={() =>
                                updateCommissionStatus(c.id, "approved")
                              }
                            >
                              Approve
                            </Button>
                          )}
                          {(c.status === "pending" ||
                            c.status === "approved") && (
                            <Button
                              size="small"
                              onClick={() =>
                                updateCommissionStatus(c.id, "paid")
                              }
                            >
                              Mark Paid
                            </Button>
                          )}
                          {c.status !== "rejected" && c.status !== "paid" && (
                            <Button
                              size="small"
                              variant="danger"
                              onClick={() =>
                                updateCommissionStatus(c.id, "rejected")
                              }
                            >
                              Reject
                            </Button>
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </Tabs.Content>

          <Tabs.Content value="links" className="mt-4">
            {links.filter((l) => l.level === 1).length === 0 ? (
              <Text>No referral links yet.</Text>
            ) : (
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Referrer</Table.HeaderCell>
                    <Table.HeaderCell>Referred</Table.HeaderCell>
                    <Table.HeaderCell>Code</Table.HeaderCell>
                    <Table.HeaderCell>Level</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {links
                    .filter((l) => l.level === 1)
                    .map((l) => (
                      <Table.Row key={l.id}>
                        <Table.Cell>
                          {new Date(l.created_at).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell className="font-mono text-xs">
                          {l.referrer_customer_id.slice(0, 12)}...
                        </Table.Cell>
                        <Table.Cell className="font-mono text-xs">
                          {l.referred_customer_id.slice(0, 12)}...
                        </Table.Cell>
                        <Table.Cell>
                          <Badge>{l.referral_code}</Badge>
                        </Table.Cell>
                        <Table.Cell>L{l.level}</Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
            )}
          </Tabs.Content>
        </Tabs>
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Referrals",
})

export default ReferralsPage
