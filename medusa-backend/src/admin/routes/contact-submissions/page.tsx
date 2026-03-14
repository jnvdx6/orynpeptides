import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Table, Badge, Text, Button } from "@medusajs/ui"
import { useEffect, useState } from "react"

type ContactSubmission = {
  id: string
  first_name: string
  last_name: string
  email: string
  organization: string | null
  inquiry_type: string
  message: string
  status: "new" | "read" | "replied" | "archived"
  admin_notes: string | null
  created_at: string
}

const statusColors: Record<string, "green" | "orange" | "blue" | "grey"> = {
  new: "orange",
  read: "blue",
  replied: "green",
  archived: "grey",
}

const ContactSubmissionsPage = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const fetchSubmissions = async () => {
    try {
      const res = await fetch("/admin/contact-submissions", {
        credentials: "include",
      })
      const data = await res.json()
      setSubmissions(data.contact_submissions || [])
    } catch (e) {
      console.error("Failed to fetch contact submissions", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/admin/contact-submissions/${id}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    fetchSubmissions()
  }

  const deleteSubmission = async (id: string) => {
    await fetch(`/admin/contact-submissions/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
    fetchSubmissions()
  }

  const selected = submissions.find((s) => s.id === selectedId)

  if (loading) {
    return (
      <Container className="divide-y p-0">
        <div className="px-6 py-4">
          <Heading level="h1">Contact Submissions</Heading>
          <Text className="text-ui-fg-subtle mt-2">Loading...</Text>
        </div>
      </Container>
    )
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h1">Contact Submissions</Heading>
          <Text className="text-ui-fg-subtle mt-1">
            {submissions.length} total submissions
            {submissions.filter((s) => s.status === "new").length > 0 &&
              ` (${submissions.filter((s) => s.status === "new").length} new)`}
          </Text>
        </div>
      </div>

      {selected ? (
        <div className="p-6">
          <Button
            variant="secondary"
            onClick={() => setSelectedId(null)}
            className="mb-4"
          >
            &larr; Back to list
          </Button>
          <div className="space-y-3">
            <Heading level="h2">
              {selected.first_name} {selected.last_name}
            </Heading>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text className="text-ui-fg-subtle text-sm">Email</Text>
                <Text>{selected.email}</Text>
              </div>
              <div>
                <Text className="text-ui-fg-subtle text-sm">Organization</Text>
                <Text>{selected.organization || "N/A"}</Text>
              </div>
              <div>
                <Text className="text-ui-fg-subtle text-sm">Inquiry Type</Text>
                <Text className="capitalize">{selected.inquiry_type}</Text>
              </div>
              <div>
                <Text className="text-ui-fg-subtle text-sm">Date</Text>
                <Text>
                  {new Date(selected.created_at).toLocaleString()}
                </Text>
              </div>
              <div>
                <Text className="text-ui-fg-subtle text-sm">Status</Text>
                <Badge color={statusColors[selected.status]}>
                  {selected.status}
                </Badge>
              </div>
            </div>
            <div className="mt-4">
              <Text className="text-ui-fg-subtle text-sm mb-1">Message</Text>
              <div className="rounded bg-ui-bg-subtle p-4">
                <Text style={{ whiteSpace: "pre-wrap" }}>
                  {selected.message}
                </Text>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                size="small"
                onClick={() => updateStatus(selected.id, "read")}
              >
                Mark Read
              </Button>
              <Button
                size="small"
                onClick={() => updateStatus(selected.id, "replied")}
              >
                Mark Replied
              </Button>
              <Button
                size="small"
                onClick={() => updateStatus(selected.id, "archived")}
              >
                Archive
              </Button>
              <Button
                size="small"
                variant="danger"
                onClick={() => {
                  deleteSubmission(selected.id)
                  setSelectedId(null)
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ) : submissions.length === 0 ? (
        <div className="p-6">
          <Text>No contact submissions yet.</Text>
        </div>
      ) : (
        <div className="p-6">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {submissions.map((s) => (
                <Table.Row
                  key={s.id}
                  className="cursor-pointer hover:bg-ui-bg-subtle"
                  onClick={() => {
                    setSelectedId(s.id)
                    if (s.status === "new") updateStatus(s.id, "read")
                  }}
                >
                  <Table.Cell>
                    {new Date(s.created_at).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {s.first_name} {s.last_name}
                  </Table.Cell>
                  <Table.Cell>{s.email}</Table.Cell>
                  <Table.Cell className="capitalize">
                    {s.inquiry_type}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={statusColors[s.status]}>{s.status}</Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Contact Submissions",
})

export default ContactSubmissionsPage
