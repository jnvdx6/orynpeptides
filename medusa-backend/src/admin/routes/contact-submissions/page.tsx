import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChatBubble } from "@medusajs/icons"
import {
  Container,
  Heading,
  Text,
  Badge,
  Button,
  StatusBadge,
  Table,
  Drawer,
  Textarea,
  toast,
} from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { sdk } from "../../lib/sdk"
import { useState, useMemo } from "react"

// --- Types ---

type ContactSubmission = {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  organization: string | null
  inquiry_type: string
  message: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "new" | "read" | "in_progress" | "replied" | "resolved" | "archived"
  assigned_to: string | null
  admin_notes: string | null
  response_due_at: string | null
  first_response_at: string | null
  resolved_at: string | null
  reply_count: number
  source: string
  created_at: string
}

type ContactReply = {
  id: string
  submission_id: string
  sender_type: "admin" | "customer"
  sender_name: string
  sender_email: string
  message: string
  created_at: string
}

type ContactStats = {
  total: number
  by_status: Record<string, number>
  by_priority: Record<string, number>
  avg_response_hours: number
  sla_breaches: number
  open_count: number
}

// --- Helpers ---

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function priorityColor(p: string): "red" | "orange" | "blue" | "grey" {
  switch (p) {
    case "urgent": return "red"
    case "high": return "orange"
    case "medium": return "blue"
    default: return "grey"
  }
}

function submissionStatusColor(s: string): "green" | "red" | "blue" | "orange" | "grey" {
  switch (s) {
    case "new": return "orange"
    case "read": return "blue"
    case "in_progress": return "orange"
    case "replied": return "green"
    case "resolved": return "green"
    case "archived": return "grey"
    default: return "grey"
  }
}

// --- Component ---

const ContactSubmissionsPage = () => {
  const queryClient = useQueryClient()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selected, setSelected] = useState<ContactSubmission | null>(null)
  const [replyText, setReplyText] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  const { data, isLoading } = useQuery({
    queryFn: () =>
      sdk.client.fetch<{ contact_submissions: ContactSubmission[]; stats: ContactStats }>(
        "/admin/contact-submissions",
        { method: "GET" }
      ),
    queryKey: ["contact-submissions"],
  })

  const { data: repliesData } = useQuery({
    queryFn: () =>
      sdk.client.fetch<{ replies: ContactReply[] }>(
        `/admin/contact-submissions/${selected?.id}/replies`,
        { method: "GET" }
      ),
    queryKey: ["contact-replies", selected?.id],
    enabled: !!selected?.id,
  })

  const replyMutation = useMutation({
    mutationFn: (message: string) =>
      sdk.client.fetch(`/admin/contact-submissions/${selected?.id}/reply`, {
        method: "POST",
        body: { message },
      }),
    onSuccess: () => {
      toast.success("Reply sent")
      setReplyText("")
      queryClient.invalidateQueries({ queryKey: ["contact-submissions"] })
      queryClient.invalidateQueries({ queryKey: ["contact-replies", selected?.id] })
    },
    onError: () => toast.error("Failed to send reply"),
  })

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      sdk.client.fetch(`/admin/contact-submissions/${id}`, {
        method: "POST",
        body: { status },
      }),
    onSuccess: () => {
      toast.success("Status updated")
      queryClient.invalidateQueries({ queryKey: ["contact-submissions"] })
    },
    onError: () => toast.error("Failed to update status"),
  })

  const submissions = data?.contact_submissions ?? []
  const stats = data?.stats
  const replies = repliesData?.replies ?? []

  const filtered = useMemo(() => {
    let result = submissions
    if (statusFilter !== "all") result = result.filter((s) => s.status === statusFilter)
    if (priorityFilter !== "all") result = result.filter((s) => s.priority === priorityFilter)
    return result
  }, [submissions, statusFilter, priorityFilter])

  const openDetail = (sub: ContactSubmission) => {
    setSelected(sub)
    setDrawerOpen(true)
    setReplyText("")
    // Mark as read if new
    if (sub.status === "new") {
      statusMutation.mutate({ id: sub.id, status: "read" })
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">Open Tickets</Text>
          <Heading level="h2" className="text-2xl">{stats?.open_count ?? 0}</Heading>
        </Container>
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">SLA Breaches</Text>
          <Heading level="h2" className="text-2xl text-ui-fg-error">{stats?.sla_breaches ?? 0}</Heading>
        </Container>
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">Avg Response Time</Text>
          <Heading level="h2" className="text-2xl">{stats?.avg_response_hours?.toFixed(1) ?? "0"}h</Heading>
        </Container>
      </div>

      {/* Main Table */}
      <Container className="divide-y p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <Heading level="h1">Contact Submissions</Heading>
          <div className="flex items-center gap-x-2">
            <select
              className="rounded-md border border-ui-border-base bg-ui-bg-field px-3 py-1.5 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="in_progress">In Progress</option>
              <option value="replied">Replied</option>
              <option value="resolved">Resolved</option>
              <option value="archived">Archived</option>
            </select>
            <select
              className="rounded-md border border-ui-border-base bg-ui-bg-field px-3 py-1.5 text-sm"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="px-6 py-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Text className="text-ui-fg-muted">Loading submissions...</Text>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Text className="text-ui-fg-muted">No submissions found</Text>
            </div>
          ) : (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Priority</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filtered.map((sub) => (
                  <Table.Row key={sub.id} className="cursor-pointer" onClick={() => openDetail(sub)}>
                    <Table.Cell>
                      <Badge color={priorityColor(sub.priority)} size="2xsmall">
                        {sub.priority}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="small" className="font-medium">
                        {sub.first_name} {sub.last_name}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="small" className="text-ui-fg-muted">{sub.email}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="small">{sub.inquiry_type}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <StatusBadge color={submissionStatusColor(sub.status)}>
                        {sub.status.replace("_", " ")}
                      </StatusBadge>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="small" className="text-ui-fg-muted">{formatDate(sub.created_at)}</Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
      </Container>

      {/* Detail Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              {selected ? `${selected.first_name} ${selected.last_name}` : "Submission Detail"}
            </Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="flex flex-col gap-y-4 overflow-y-auto">
            {selected && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Text size="small" className="text-ui-fg-muted mb-1">Email</Text>
                    <Text size="small">{selected.email}</Text>
                  </div>
                  <div>
                    <Text size="small" className="text-ui-fg-muted mb-1">Organization</Text>
                    <Text size="small">{selected.organization || "--"}</Text>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Text size="small" className="text-ui-fg-muted mb-1">Priority</Text>
                    <Badge color={priorityColor(selected.priority)} size="2xsmall">{selected.priority}</Badge>
                  </div>
                  <div>
                    <Text size="small" className="text-ui-fg-muted mb-1">Status</Text>
                    <StatusBadge color={submissionStatusColor(selected.status)}>
                      {selected.status.replace("_", " ")}
                    </StatusBadge>
                  </div>
                  <div>
                    <Text size="small" className="text-ui-fg-muted mb-1">Type</Text>
                    <Text size="small">{selected.inquiry_type}</Text>
                  </div>
                </div>
                <div>
                  <Text size="small" className="text-ui-fg-muted mb-1">Message</Text>
                  <div className="rounded-lg border border-ui-border-base bg-ui-bg-subtle p-3">
                    <Text size="small" className="whitespace-pre-wrap">{selected.message}</Text>
                  </div>
                </div>

                {/* Status change buttons */}
                <div className="flex flex-wrap gap-2">
                  {["in_progress", "resolved", "archived"].map((s) => (
                    <Button
                      key={s}
                      variant="secondary"
                      size="small"
                      disabled={selected.status === s}
                      onClick={() => {
                        statusMutation.mutate({ id: selected.id, status: s })
                        setSelected({ ...selected, status: s as ContactSubmission["status"] })
                      }}
                    >
                      {s === "in_progress" ? "Mark In Progress" : s === "resolved" ? "Mark Resolved" : "Archive"}
                    </Button>
                  ))}
                </div>

                {/* Conversation Thread */}
                {replies.length > 0 && (
                  <div>
                    <Text size="small" className="text-ui-fg-muted mb-2 font-medium">Conversation</Text>
                    <div className="flex flex-col gap-y-2">
                      {replies.map((r) => (
                        <div
                          key={r.id}
                          className={`rounded-lg border p-3 ${
                            r.sender_type === "admin"
                              ? "border-ui-border-base bg-ui-bg-subtle ml-4"
                              : "border-ui-border-base mr-4"
                          }`}
                        >
                          <div className="mb-1 flex items-center gap-x-2">
                            <Text size="small" className="font-medium">{r.sender_name}</Text>
                            <Text size="xsmall" className="text-ui-fg-muted">
                              {formatDate(r.created_at)}
                            </Text>
                          </div>
                          <Text size="small" className="whitespace-pre-wrap">{r.message}</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reply Form */}
                <div>
                  <Text size="small" className="text-ui-fg-muted mb-2 font-medium">Reply</Text>
                  <Textarea
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                  />
                  <div className="mt-2 flex justify-end">
                    <Button
                      size="small"
                      disabled={!replyText.trim()}
                      isLoading={replyMutation.isPending}
                      onClick={() => replyMutation.mutate(replyText)}
                    >
                      Send Reply
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer>
    </div>
  )
}

export const config = defineRouteConfig({
  label: "Contact Submissions",
  icon: ChatBubble,
})

export default ContactSubmissionsPage
