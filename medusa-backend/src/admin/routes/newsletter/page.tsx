import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Newspaper } from "@medusajs/icons"
import {
  Container,
  Heading,
  Text,
  Badge,
  Button,
  StatusBadge,
  Table,
  Input,
  FocusModal,
  Textarea,
  toast,
} from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { sdk } from "../../lib/sdk"
import { useState, useMemo } from "react"

// --- Types ---

type Subscriber = {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  source: string
  status: "active" | "unsubscribed" | "bounced" | "complained"
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

// --- Helpers ---

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function statusColor(s: string): "green" | "red" | "orange" | "grey" {
  switch (s) {
    case "active": return "green"
    case "unsubscribed": return "orange"
    case "bounced": case "complained": return "red"
    default: return "grey"
  }
}

const SOURCE_LABELS: Record<string, string> = {
  footer: "Footer",
  exit_intent: "Exit Intent",
  checkout: "Checkout",
  manual: "Manual",
  referral: "Referral",
  import: "Import",
}

// --- Component ---

const PAGE_SIZE = 25

const NewsletterPage = () => {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(0)
  const [importOpen, setImportOpen] = useState(false)
  const [importCsv, setImportCsv] = useState("")

  const { data, isLoading } = useQuery({
    queryFn: () => {
      const params = new URLSearchParams()
      params.set("limit", String(PAGE_SIZE))
      params.set("offset", String(page * PAGE_SIZE))
      if (statusFilter !== "all") params.set("status", statusFilter)
      return sdk.client.fetch<{ newsletter_subscribers: Subscriber[]; count: number; stats: Stats }>(
        `/admin/newsletter-subscribers?${params}`,
        { method: "GET" }
      )
    },
    queryKey: ["newsletter-subscribers", page, statusFilter],
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      sdk.client.fetch(`/admin/newsletter-subscribers/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Subscriber removed")
      queryClient.invalidateQueries({ queryKey: ["newsletter-subscribers"] })
    },
    onError: () => toast.error("Failed to remove subscriber"),
  })

  const importMutation = useMutation({
    mutationFn: (csvText: string) => {
      const lines = csvText.trim().split("\n")
      const headerLine = lines[0].toLowerCase()
      const hasHeader = headerLine.includes("email") || headerLine.includes("first_name")
      const dataLines = hasHeader ? lines.slice(1) : lines
      const subscribers = dataLines
        .filter((l) => l.trim())
        .map((l) => {
          const parts = l.split(",").map((p) => p.trim().replace(/^"|"$/g, ""))
          return { email: parts[0], first_name: parts[1] || undefined, last_name: parts[2] || undefined }
        })
        .filter((s) => s.email?.includes("@"))
      return sdk.client.fetch("/admin/newsletter-subscribers", {
        method: "POST",
        body: { action: "import", subscribers },
      })
    },
    onSuccess: (result: any) => {
      toast.success(`Imported ${result.imported ?? 0} subscriber(s)`)
      setImportOpen(false)
      setImportCsv("")
      queryClient.invalidateQueries({ queryKey: ["newsletter-subscribers"] })
    },
    onError: () => toast.error("Import failed"),
  })

  const subscribers = data?.newsletter_subscribers ?? []
  const stats = data?.stats
  const totalCount = data?.count ?? 0
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return subscribers
    const q = searchQuery.toLowerCase()
    return subscribers.filter(
      (s) =>
        s.email.toLowerCase().includes(q) ||
        s.first_name?.toLowerCase().includes(q) ||
        s.last_name?.toLowerCase().includes(q)
    )
  }, [subscribers, searchQuery])

  const exportCSV = () => {
    const headers = "email,first_name,last_name,source,status,subscribed_at"
    const rows = subscribers.map((s) =>
      [s.email, s.first_name || "", s.last_name || "", s.source, s.status, s.created_at].join(",")
    )
    const blob = new Blob([headers + "\n" + rows.join("\n")], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `oryn-newsletter-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success(`Exported ${subscribers.length} subscribers`)
  }

  return (
    <div className="flex flex-col gap-y-2">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">Active Subscribers</Text>
          <Heading level="h2" className="text-2xl">{stats?.active ?? 0}</Heading>
        </Container>
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">Unsubscribed</Text>
          <Heading level="h2" className="text-2xl">{stats?.unsubscribed ?? 0}</Heading>
        </Container>
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">Growth (30d)</Text>
          <Heading level="h2" className="text-2xl text-ui-fg-interactive">
            +{stats?.growth_last_30_days ?? 0}
          </Heading>
        </Container>
        <Container className="p-4">
          <Text size="small" className="text-ui-fg-muted mb-1">Unsub Rate</Text>
          <Heading level="h2" className="text-2xl">{stats?.unsubscribe_rate ?? 0}%</Heading>
        </Container>
      </div>

      {/* Main Table */}
      <Container className="divide-y p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <Heading level="h1">Newsletter</Heading>
          <div className="flex items-center gap-x-2">
            <Button variant="secondary" size="small" onClick={() => setImportOpen(true)}>
              Bulk Import
            </Button>
            <Button size="small" onClick={exportCSV}>
              Export CSV
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-x-3 px-6 py-3">
          <Input
            type="text"
            placeholder="Search by email or name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setPage(0)
            }}
            size="small"
            className="max-w-[280px]"
          />
          <select
            className="rounded-md border border-ui-border-base bg-ui-bg-field px-3 py-1.5 text-sm"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(0)
            }}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="unsubscribed">Unsubscribed</option>
            <option value="bounced">Bounced</option>
            <option value="complained">Complained</option>
          </select>
          <Text size="small" className="text-ui-fg-muted ml-auto">
            {totalCount} subscriber{totalCount !== 1 ? "s" : ""}
          </Text>
        </div>

        <div className="px-6 py-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Text className="text-ui-fg-muted">Loading subscribers...</Text>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Text className="text-ui-fg-muted">No subscribers found</Text>
            </div>
          ) : (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Source</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell className="text-right">Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filtered.map((sub) => (
                  <Table.Row key={sub.id}>
                    <Table.Cell>
                      <Text size="small" className="font-medium">{sub.email}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="small" className="text-ui-fg-muted">
                        {[sub.first_name, sub.last_name].filter(Boolean).join(" ") || "--"}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge color="grey" size="2xsmall">
                        {SOURCE_LABELS[sub.source] || sub.source}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <StatusBadge color={statusColor(sub.status)}>{sub.status}</StatusBadge>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="small" className="text-ui-fg-muted">{formatDate(sub.created_at)}</Text>
                    </Table.Cell>
                    <Table.Cell className="text-right">
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={() => {
                          if (confirm("Remove this subscriber permanently?")) {
                            deleteMutation.mutate(sub.id)
                          }
                        }}
                        isLoading={deleteMutation.isPending && deleteMutation.variables === sub.id}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3">
            <Text size="small" className="text-ui-fg-muted">
              Page {page + 1} of {totalPages}
            </Text>
            <div className="flex gap-x-2">
              <Button variant="secondary" size="small" disabled={page === 0} onClick={() => setPage(page - 1)}>
                Previous
              </Button>
              <Button variant="secondary" size="small" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
                Next
              </Button>
            </div>
          </div>
        )}
      </Container>

      {/* Import Modal */}
      <FocusModal open={importOpen} onOpenChange={setImportOpen}>
        <FocusModal.Content>
          <FocusModal.Header>
            <Button
              size="small"
              disabled={!importCsv.trim()}
              isLoading={importMutation.isPending}
              onClick={() => importMutation.mutate(importCsv)}
            >
              Import
            </Button>
          </FocusModal.Header>
          <FocusModal.Body className="flex flex-col gap-y-4 p-6">
            <div>
              <Heading level="h2" className="mb-2">Bulk Import Subscribers</Heading>
              <Text size="small" className="text-ui-fg-muted">
                Paste CSV data below. Expected columns: email, first_name, last_name.
                A header row is optional. Duplicates will be skipped.
              </Text>
            </div>
            <Textarea
              placeholder={`email,first_name,last_name\njohn@example.com,John,Doe\njane@example.com,Jane,Smith`}
              value={importCsv}
              onChange={(e) => setImportCsv(e.target.value)}
              rows={12}
              className="font-mono text-sm"
            />
          </FocusModal.Body>
        </FocusModal.Content>
      </FocusModal>
    </div>
  )
}

export const config = defineRouteConfig({
  label: "Newsletter",
  icon: Newspaper,
})

export default NewsletterPage
