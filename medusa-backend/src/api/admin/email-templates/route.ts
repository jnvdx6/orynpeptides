import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const emailService = req.scope.resolve("emailModuleService") as any
  const { category, is_active } = req.query as Record<string, string>

  const filters: Record<string, any> = {}
  if (category) filters.category = category
  if (is_active !== undefined) filters.is_active = is_active === "true"

  const templates = await emailService.listEmailTemplates(filters, {
    order: { created_at: "DESC" },
  })

  return res.json({ email_templates: templates })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const emailService = req.scope.resolve("emailModuleService") as any
  const body = req.body as {
    name: string
    slug: string
    subject_template: string
    html_body: string
    text_body?: string
    description?: string
    category?: string
    variables?: string
  }

  // Check slug uniqueness
  const existing = await emailService.listEmailTemplates({ slug: body.slug })
  if (existing.length > 0) {
    return res.status(409).json({ error: `Template with slug "${body.slug}" already exists` })
  }

  const template = await emailService.createEmailTemplates({
    name: body.name,
    slug: body.slug,
    subject_template: body.subject_template,
    html_body: body.html_body,
    text_body: body.text_body || null,
    description: body.description || null,
    category: body.category || "transactional",
    variables: body.variables || null,
    is_active: true,
  })

  return res.status(201).json({ email_template: template })
}
