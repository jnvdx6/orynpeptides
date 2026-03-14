import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Table, Badge, Text, Button } from "@medusajs/ui"
import { useEffect, useState } from "react"

type Subscriber = {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  source: string
  status: "active" | "unsubscribed"
  created_at: string
}

const NewsletterPage = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/admin/newsletter-subscribers", {
        credentials: "include",
      })
      const data = await res.json()
      setSubscribers(data.newsletter_subscribers || [])
      setCount(data.count || 0)
    } catch (e) {
      console.error("Failed to fetch subscribers", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const deleteSubscriber = async (id: string) => {
    await fetch(`/admin/newsletter-subscribers/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
    fetchSubscribers()
  }

  const exportCSV = () => {
    const headers = "email,first_name,last_name,source,status,subscribed_at\n"
    const rows = subscribers
      .map(
        (s) =>
          `${s.email},${s.first_name || ""},${s.last_name || ""},${s.source},${s.status},${s.created_at}`
      )
      .join("\n")
    const blob = new Blob([headers + rows], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `oryn-newsletter-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const activeCount = subscribers.filter((s) => s.status === "active").length

  if (loading) {
    return (
      <Container className="divide-y p-0">
        <div className="px-6 py-4">
          <Heading level="h1">Newsletter Subscribers</Heading>
          <Text className="text-ui-fg-subtle mt-2">Loading...</Text>
        </div>
      </Container>
    )
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h1">Newsletter Subscribers</Heading>
          <Text className="text-ui-fg-subtle mt-1">
            {activeCount} active / {count} total
          </Text>
        </div>
        <Button variant="secondary" onClick={exportCSV}>
          Export CSV
        </Button>
      </div>

      <div className="p-6">
        {subscribers.length === 0 ? (
          <Text>No subscribers yet.</Text>
        ) : (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Source</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {subscribers.map((s) => (
                <Table.Row key={s.id}>
                  <Table.Cell>{s.email}</Table.Cell>
                  <Table.Cell>
                    {[s.first_name, s.last_name].filter(Boolean).join(" ") ||
                      "-"}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge>{s.source}</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={s.status === "active" ? "green" : "grey"}>
                      {s.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(s.created_at).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      size="small"
                      variant="danger"
                      onClick={() => deleteSubscriber(s.id)}
                    >
                      Remove
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Newsletter",
})

export default NewsletterPage
