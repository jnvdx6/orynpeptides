import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Envelope } from "@medusajs/icons"
import {
  Container,
  Heading,
  Text,
  Badge,
  Button,
  StatusBadge,
  Table,
  Tabs,
  Switch,
  Input,
  Textarea,
  Label,
  Drawer,
  FocusModal,
  toast,
} from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { sdk } from "../../lib/sdk"
import { useState } from "react"

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  })
}

function statusColor(s: string): "green" | "red" | "blue" | "orange" | "grey" {
  if (["delivered", "opened", "clicked"].includes(s)) return "green"
  if (["bounced", "failed", "complained"].includes(s)) return "red"
  if (s === "sent") return "blue"
  if (s === "queued") return "orange"
  return "grey"
}

const EmailPage = () => {
  const qc = useQueryClient()

  // State
  const [composeOpen, setComposeOpen] = useState(false)
  const [selectedSent, setSelectedSent] = useState<any>(null)
  const [sentDrawerOpen, setSentDrawerOpen] = useState(false)
  const [selectedInbound, setSelectedInbound] = useState<any>(null)
  const [inboundDrawerOpen, setInboundDrawerOpen] = useState(false)
  const [replyMode, setReplyMode] = useState(false)

  // Compose form
  const [composeFrom, setComposeFrom] = useState("ORYN Peptides <info@orynxpeptides.com>")
  const [composeTo, setComposeTo] = useState("")
  const [composeCc, setComposeCc] = useState("")
  const [composeSubject, setComposeSubject] = useState("")
  const [composeBody, setComposeBody] = useState("")

  const fromOptions = [
    "ORYN Peptides <info@orynxpeptides.com>",
    "ORYN Support <support@orynxpeptides.com>",
    "ORYN Sales <sales@orynxpeptides.com>",
    "ORYN Admin <admin@orynxpeptides.com>",
  ]

  // Reply form
  const [replyBody, setReplyBody] = useState("")

  // Queries
  const { data: sentData, isLoading: sentLoading } = useQuery({
    queryFn: () => sdk.client.fetch<any>("/admin/email-logs", {
      method: "GET",
      query: { direction: "outbound", limit: "100" },
    }),
    queryKey: ["email-sent"],
  })

  const { data: inboxData, isLoading: inboxLoading } = useQuery({
    queryFn: () => sdk.client.fetch<any>("/admin/email/inbox", { method: "GET", query: { limit: "100" } }),
    queryKey: ["email-inbox"],
  })

  const { data: templatesData } = useQuery({
    queryFn: () => sdk.client.fetch<any>("/admin/email-templates", { method: "GET" }),
    queryKey: ["email-templates"],
  })

  // Mutations
  const sendMutation = useMutation({
    mutationFn: (payload: any) => sdk.client.fetch("/admin/email/send", { method: "POST", body: payload }),
    onSuccess: () => {
      toast.success("Email sent")
      setComposeOpen(false)
      resetCompose()
      qc.invalidateQueries({ queryKey: ["email-sent"] })
    },
    onError: (e: any) => toast.error("Failed to send", { description: e.message }),
  })

  const seedMutation = useMutation({
    mutationFn: () => sdk.client.fetch("/admin/email-templates/seed", { method: "POST", body: {} }),
    onSuccess: (data: any) => {
      toast.success("Templates seeded", { description: `${data.created} created, ${data.skipped} skipped` })
      qc.invalidateQueries({ queryKey: ["email-templates"] })
    },
    onError: () => toast.error("Seed failed"),
  })

  const toggleMutation = useMutation({
    mutationFn: ({ id, is_active }: any) =>
      sdk.client.fetch(`/admin/email-templates/${id}`, { method: "POST", body: { is_active } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["email-templates"] }),
  })

  const markReadMutation = useMutation({
    mutationFn: (id: string) =>
      sdk.client.fetch(`/admin/email/inbox/${id}`, { method: "POST", body: { status: "read" } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["email-inbox"] }),
  })

  const replyMutation = useMutation({
    mutationFn: (payload: any) => sdk.client.fetch("/admin/email/send", { method: "POST", body: payload }),
    onSuccess: () => {
      toast.success("Reply sent")
      setReplyMode(false)
      setReplyBody("")
      qc.invalidateQueries({ queryKey: ["email-sent"] })
    },
    onError: () => toast.error("Failed to send reply"),
  })

  const sentLogs = sentData?.email_logs ?? []
  const stats = sentData?.stats
  const inbox = inboxData?.emails ?? []
  const templates = templatesData?.email_templates ?? []
  const unreadCount = inbox.filter((e: any) => e.status === "new").length

  function resetCompose() {
    setComposeFrom(fromOptions[0]); setComposeTo(""); setComposeCc(""); setComposeSubject(""); setComposeBody("")
  }

  function handleSend() {
    if (!composeTo || !composeSubject || !composeBody) {
      toast.error("Fill in To, Subject, and Body")
      return
    }
    sendMutation.mutate({
      from: composeFrom,
      to: composeTo.split(",").map((s: string) => s.trim()).filter(Boolean),
      cc: composeCc ? composeCc.split(",").map((s: string) => s.trim()).filter(Boolean) : undefined,
      subject: composeSubject,
      html: `<div style="font-family:sans-serif;white-space:pre-wrap">${composeBody.replace(/\n/g, "<br>")}</div>`,
      text: composeBody,
    })
  }

  function handleReply() {
    if (!replyBody || !selectedInbound) return
    replyMutation.mutate({
      to: selectedInbound.from_email,
      subject: `Re: ${selectedInbound.subject || "(no subject)"}`,
      html: `<div style="font-family:sans-serif;white-space:pre-wrap">${replyBody.replace(/\n/g, "<br>")}</div>
<hr style="margin:16px 0;border:none;border-top:1px solid #ddd">
<div style="color:#888">
<p><strong>From:</strong> ${selectedInbound.from_email}</p>
<p><strong>Date:</strong> ${fmtDate(selectedInbound.created_at)}</p>
<p><strong>Subject:</strong> ${selectedInbound.subject || ""}</p>
</div>
<blockquote style="margin:8px 0;padding:8px 16px;border-left:3px solid #ddd;color:#666">${selectedInbound.text_body || selectedInbound.html_body || ""}</blockquote>`,
      text: replyBody,
      reply_to: "info@orynlabs.com",
    })
  }

  function openInbound(email: any) {
    setSelectedInbound(email)
    setInboundDrawerOpen(true)
    setReplyMode(false)
    setReplyBody("")
    if (email.status === "new") markReadMutation.mutate(email.id)
  }

  function openSent(log: any) {
    setSelectedSent(log)
    setSentDrawerOpen(true)
  }

  function startReplyFromCompose(email: any) {
    setComposeTo(email.from_email || "")
    setComposeSubject(`Re: ${email.subject || ""}`)
    setComposeBody("")
    setInboundDrawerOpen(false)
    setComposeOpen(true)
  }

  return (
    <div className="flex flex-col gap-y-2">
      {/* Stats row */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
        {[
          { label: "Total Sent", value: stats?.total_sent ?? 0 },
          { label: "Delivered", value: stats?.delivered ?? 0, sub: stats ? `${stats.delivery_rate}%` : "" },
          { label: "Opened", value: stats?.opened ?? 0, sub: stats ? `${stats.open_rate}%` : "" },
          { label: "Bounced", value: stats?.bounced ?? 0, sub: stats ? `${stats.bounce_rate}%` : "" },
          { label: "Inbox", value: inbox.length, sub: unreadCount > 0 ? `${unreadCount} new` : "" },
        ].map((c) => (
          <Container key={c.label} className="p-4">
            <Text size="small" className="text-ui-fg-muted">{c.label}</Text>
            <Heading level="h2" className="text-xl">{c.value}</Heading>
            {c.sub && <Text size="xsmall" className="text-ui-fg-muted">{c.sub}</Text>}
          </Container>
        ))}
      </div>

      {/* Main email interface */}
      <Container className="divide-y p-0">
        <Tabs defaultValue="inbox">
          <div className="flex items-center justify-between px-6 py-4">
            <Heading level="h1">Email</Heading>
            <div className="flex items-center gap-x-3">
              <Tabs.List>
                <Tabs.Trigger value="inbox">
                  Inbox {unreadCount > 0 && <Badge color="red" size="2xsmall" className="ml-1">{unreadCount}</Badge>}
                </Tabs.Trigger>
                <Tabs.Trigger value="sent">Sent</Tabs.Trigger>
                <Tabs.Trigger value="templates">Templates</Tabs.Trigger>
              </Tabs.List>
              <Button size="small" onClick={() => { resetCompose(); setComposeOpen(true) }}>
                Compose
              </Button>
            </div>
          </div>

          {/* ──── INBOX TAB ──── */}
          <Tabs.Content value="inbox">
            <div className="px-6 py-4">
              {inboxLoading ? (
                <Text className="text-ui-fg-muted py-12 text-center">Loading inbox...</Text>
              ) : inbox.length === 0 ? (
                <div className="flex flex-col items-center py-12">
                  <Text className="text-ui-fg-muted">No incoming emails yet.</Text>
                  <Text size="small" className="text-ui-fg-muted mt-1">
                    Configure a Resend inbound webhook pointing to /store/webhooks/resend
                  </Text>
                </div>
              ) : (
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell>From</Table.HeaderCell>
                      <Table.HeaderCell>Subject</Table.HeaderCell>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {inbox.map((email: any) => (
                      <Table.Row key={email.id} className="cursor-pointer" onClick={() => openInbound(email)}>
                        <Table.Cell className="w-8">
                          {email.status === "new" && (
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          <Text size="small" className={email.status === "new" ? "font-semibold" : ""}>
                            {email.from_name || email.from_email}
                          </Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text size="small" className={`max-w-[400px] truncate ${email.status === "new" ? "font-semibold" : "text-ui-fg-muted"}`}>
                            {email.subject || "(no subject)"}
                          </Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text size="xsmall" className="text-ui-fg-muted">{fmtDate(email.created_at)}</Text>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
            </div>
          </Tabs.Content>

          {/* ──── SENT TAB ──── */}
          <Tabs.Content value="sent">
            <div className="px-6 py-4">
              {sentLoading ? (
                <Text className="text-ui-fg-muted py-12 text-center">Loading sent emails...</Text>
              ) : sentLogs.length === 0 ? (
                <div className="flex flex-col items-center py-12">
                  <Text className="text-ui-fg-muted">No sent emails yet</Text>
                </div>
              ) : (
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>To</Table.HeaderCell>
                      <Table.HeaderCell>Subject</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {sentLogs.map((log: any) => (
                      <Table.Row key={log.id} className="cursor-pointer" onClick={() => openSent(log)}>
                        <Table.Cell>
                          <Text size="small">{log.to_emails}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text size="small" className="max-w-[350px] truncate">{log.subject}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <StatusBadge color={statusColor(log.status)}>{log.status}</StatusBadge>
                        </Table.Cell>
                        <Table.Cell>
                          <Text size="xsmall" className="text-ui-fg-muted">{fmtDate(log.created_at)}</Text>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
            </div>
          </Tabs.Content>

          {/* ──── TEMPLATES TAB ──── */}
          <Tabs.Content value="templates">
            <div className="px-6 py-4">
              <div className="mb-4 flex justify-end">
                <Button variant="secondary" size="small" onClick={() => seedMutation.mutate()} isLoading={seedMutation.isPending}>
                  Seed Default Templates
                </Button>
              </div>
              {templates.length === 0 ? (
                <Text className="text-ui-fg-muted py-12 text-center">No templates yet. Click &quot;Seed Default Templates&quot;.</Text>
              ) : (
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Slug</Table.HeaderCell>
                      <Table.HeaderCell>Category</Table.HeaderCell>
                      <Table.HeaderCell>Subject</Table.HeaderCell>
                      <Table.HeaderCell>Active</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {templates.map((tpl: any) => (
                      <Table.Row key={tpl.id}>
                        <Table.Cell><Text size="small" className="font-medium">{tpl.name}</Text></Table.Cell>
                        <Table.Cell><Text size="xsmall" className="font-mono text-ui-fg-muted">{tpl.slug}</Text></Table.Cell>
                        <Table.Cell><Badge color="grey" size="2xsmall">{tpl.category}</Badge></Table.Cell>
                        <Table.Cell><Text size="xsmall" className="max-w-[200px] truncate text-ui-fg-muted">{tpl.subject_template}</Text></Table.Cell>
                        <Table.Cell>
                          <Switch checked={tpl.is_active} onCheckedChange={(v) => toggleMutation.mutate({ id: tpl.id, is_active: v })} />
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

      {/* ──── COMPOSE MODAL ──── */}
      <FocusModal open={composeOpen} onOpenChange={setComposeOpen}>
        <FocusModal.Content>
          <FocusModal.Header>
            <div className="flex items-center justify-between w-full">
              <Heading level="h2">New Email</Heading>
              <Button onClick={handleSend} isLoading={sendMutation.isPending} disabled={!composeTo || !composeSubject || !composeBody}>
                Send
              </Button>
            </div>
          </FocusModal.Header>
          <FocusModal.Body className="flex flex-col gap-y-4 px-6 py-4 overflow-y-auto">
            <div>
              <Label htmlFor="from">From</Label>
              <select
                id="from"
                value={composeFrom}
                onChange={(e) => setComposeFrom(e.target.value)}
                className="w-full rounded-lg border border-ui-border-base bg-ui-bg-field px-3 py-2 text-sm text-ui-fg-base"
              >
                {fromOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="to">To</Label>
              <Input id="to" placeholder="email@example.com (comma-separated for multiple)" value={composeTo} onChange={(e) => setComposeTo(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="cc">Cc</Label>
              <Input id="cc" placeholder="Optional cc" value={composeCc} onChange={(e) => setComposeCc(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Email subject" value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} />
            </div>
            <div className="flex-1">
              <Label htmlFor="body">Message</Label>
              <Textarea id="body" placeholder="Write your message..." rows={14} value={composeBody} onChange={(e) => setComposeBody(e.target.value)} />
            </div>
          </FocusModal.Body>
        </FocusModal.Content>
      </FocusModal>

      {/* ──── SENT EMAIL DETAIL DRAWER ──── */}
      <Drawer open={sentDrawerOpen} onOpenChange={setSentDrawerOpen}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{selectedSent?.subject || "Email Detail"}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="flex flex-col gap-y-3 overflow-y-auto">
            {selectedSent && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Text size="xsmall" className="text-ui-fg-muted">From</Text>
                    <Text size="small">{selectedSent.from_email}</Text>
                  </div>
                  <div>
                    <Text size="xsmall" className="text-ui-fg-muted">To</Text>
                    <Text size="small">{selectedSent.to_emails}</Text>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Text size="xsmall" className="text-ui-fg-muted">Status</Text>
                    <StatusBadge color={statusColor(selectedSent.status)}>{selectedSent.status}</StatusBadge>
                  </div>
                  <div>
                    <Text size="xsmall" className="text-ui-fg-muted">Date</Text>
                    <Text size="small">{fmtDate(selectedSent.created_at)}</Text>
                  </div>
                </div>
                {selectedSent.delivered_at && (
                  <div>
                    <Text size="xsmall" className="text-ui-fg-muted">Delivered</Text>
                    <Text size="small">{fmtDate(selectedSent.delivered_at)}</Text>
                  </div>
                )}
                {selectedSent.opened_at && (
                  <div>
                    <Text size="xsmall" className="text-ui-fg-muted">Opened</Text>
                    <Text size="small">{fmtDate(selectedSent.opened_at)}</Text>
                  </div>
                )}
                {selectedSent.error_message && (
                  <div>
                    <Text size="xsmall" className="text-ui-fg-muted">Error</Text>
                    <Text size="small" className="text-red-500">{selectedSent.error_message}</Text>
                  </div>
                )}
                {selectedSent.html_body && (
                  <div>
                    <Text size="xsmall" className="text-ui-fg-muted mb-1">Content</Text>
                    <div className="rounded-lg border border-ui-border-base bg-white p-4 max-h-[400px] overflow-y-auto">
                      <div dangerouslySetInnerHTML={{ __html: selectedSent.html_body }} />
                    </div>
                  </div>
                )}
                {!selectedSent.html_body && selectedSent.text_body && (
                  <div>
                    <Text size="xsmall" className="text-ui-fg-muted mb-1">Content</Text>
                    <pre className="rounded-lg border border-ui-border-base bg-ui-bg-subtle p-3 text-xs whitespace-pre-wrap max-h-[400px] overflow-y-auto">
                      {selectedSent.text_body}
                    </pre>
                  </div>
                )}
              </>
            )}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer>

      {/* ──── INBOUND EMAIL DETAIL DRAWER ──── */}
      <Drawer open={inboundDrawerOpen} onOpenChange={setInboundDrawerOpen}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{selectedInbound?.subject || "(no subject)"}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="flex flex-col gap-y-3 overflow-y-auto">
            {selectedInbound && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Text size="xsmall" className="text-ui-fg-muted">From</Text>
                    <Text size="small" className="font-medium">{selectedInbound.from_name || selectedInbound.from_email}</Text>
                    {selectedInbound.from_name && <Text size="xsmall" className="text-ui-fg-muted">{selectedInbound.from_email}</Text>}
                  </div>
                  <div>
                    <Text size="xsmall" className="text-ui-fg-muted">To</Text>
                    <Text size="small">{selectedInbound.to_email}</Text>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Text size="xsmall" className="text-ui-fg-muted">Date</Text>
                    <Text size="small">{fmtDate(selectedInbound.created_at)}</Text>
                  </div>
                  <div>
                    <Text size="xsmall" className="text-ui-fg-muted">Status</Text>
                    <StatusBadge color={selectedInbound.status === "new" ? "blue" : selectedInbound.status === "replied" ? "green" : "grey"}>
                      {selectedInbound.status}
                    </StatusBadge>
                  </div>
                </div>
                {selectedInbound.has_attachments && (
                  <Badge color="blue" size="2xsmall">Has attachments</Badge>
                )}

                {/* Email body */}
                {selectedInbound.html_body ? (
                  <div>
                    <Text size="xsmall" className="text-ui-fg-muted mb-1">Message</Text>
                    <div className="rounded-lg border border-ui-border-base bg-white p-4 max-h-[300px] overflow-y-auto">
                      <div dangerouslySetInnerHTML={{ __html: selectedInbound.html_body }} />
                    </div>
                  </div>
                ) : selectedInbound.text_body ? (
                  <div>
                    <Text size="xsmall" className="text-ui-fg-muted mb-1">Message</Text>
                    <pre className="rounded-lg border border-ui-border-base bg-ui-bg-subtle p-3 text-sm whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                      {selectedInbound.text_body}
                    </pre>
                  </div>
                ) : (
                  <Text size="small" className="text-ui-fg-muted italic">
                    Email body not available. Configure Resend webhook to include content.
                  </Text>
                )}

                {/* Reply section */}
                <div className="border-t border-ui-border-base pt-3 mt-2">
                  {!replyMode ? (
                    <div className="flex gap-x-2">
                      <Button size="small" onClick={() => setReplyMode(true)}>Reply</Button>
                      <Button size="small" variant="secondary" onClick={() => startReplyFromCompose(selectedInbound)}>
                        Reply in Compose
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-y-3">
                      <Text size="small" className="text-ui-fg-muted">Reply to {selectedInbound.from_email}</Text>
                      <Textarea placeholder="Write your reply..." rows={6} value={replyBody} onChange={(e) => setReplyBody(e.target.value)} />
                      <div className="flex gap-x-2">
                        <Button size="small" onClick={handleReply} isLoading={replyMutation.isPending} disabled={!replyBody.trim()}>
                          Send Reply
                        </Button>
                        <Button size="small" variant="secondary" onClick={() => { setReplyMode(false); setReplyBody("") }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
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
  label: "Email",
  icon: Envelope,
})

export default EmailPage
