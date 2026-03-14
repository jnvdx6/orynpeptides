# Consolidate Everything Into Medusa - Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move ALL business logic (contact forms, newsletter, wishlist, referrals, commissions, user auth, order management) from the frontend's ephemeral `/tmp/oryn-db` JSON file database into Medusa v2 custom modules, making everything manageable from the Medusa admin panel.

**Architecture:** Create 4 custom Medusa modules (Contact, Newsletter, Wishlist, Referral) with their own data models stored in Medusa's PostgreSQL database. Expose store-side and admin-side API routes. Add admin UI pages for management. Replace frontend's custom auth with Medusa's native customer auth. Add email notifications via SendGrid. Remove all `/tmp/oryn-db` code.

**Tech Stack:** Medusa v2.13.3, PostgreSQL, SendGrid (notifications), Zod (validation), @medusajs/ui + @medusajs/icons (admin UI), @medusajs/framework (modules, routes, subscribers)

**Spec:** See `docs/superpowers/specs/2026-03-14-consolidate-medusa-design.md` (if exists)

---

## File Structure Overview

All backend changes are in `medusa-backend/src/`:

```
medusa-backend/src/
├── modules/
│   ├── contact/
│   │   ├── index.ts                    # Module registration
│   │   ├── service.ts                  # CRUD service
│   │   └── models/
│   │       └── contact-submission.ts   # Data model
│   ├── newsletter/
│   │   ├── index.ts
│   │   ├── service.ts
│   │   └── models/
│   │       └── newsletter-subscriber.ts
│   ├── wishlist/
│   │   ├── index.ts
│   │   ├── service.ts
│   │   └── models/
│   │       └── wishlist-item.ts
│   └── referral/
│       ├── index.ts
│       ├── service.ts
│       └── models/
│           ├── referral-link.ts
│           └── commission.ts
├── api/
│   ├── middlewares.ts                  # Validation middlewares
│   ├── store/
│   │   ├── contact/
│   │   │   ├── route.ts               # POST submit contact form
│   │   │   └── validators.ts
│   │   ├── newsletter/
│   │   │   ├── route.ts               # POST subscribe
│   │   │   └── validators.ts
│   │   ├── wishlist/
│   │   │   ├── route.ts               # GET list, POST add
│   │   │   ├── [id]/route.ts          # DELETE remove
│   │   │   └── validators.ts
│   │   └── referrals/
│   │       └── route.ts               # GET my referrals
│   └── admin/
│       ├── contact-submissions/
│       │   ├── route.ts               # GET list
│       │   └── [id]/route.ts          # GET one, POST update, DELETE
│       ├── newsletter-subscribers/
│       │   ├── route.ts               # GET list
│       │   └── [id]/route.ts          # DELETE
│       ├── referrals/
│       │   └── route.ts               # GET list
│       └── commissions/
│           ├── route.ts               # GET list
│           └── [id]/route.ts          # POST update status
├── subscribers/
│   ├── contact-submitted.ts           # Notify admin on contact form
│   ├── order-placed.ts                # Send confirmation + generate commissions
│   └── customer-created.ts            # Welcome email + referral tracking
├── workflows/
│   ├── send-email.ts                  # Reusable email workflow
│   └── generate-commissions.ts        # Commission calculation workflow
├── admin/
│   ├── routes/
│   │   ├── analytics/page.tsx         # (existing)
│   │   ├── contact-submissions/page.tsx
│   │   ├── newsletter/page.tsx
│   │   └── referrals/page.tsx
│   └── widgets/
│       ├── order-stats-widget.tsx      # (existing)
│       └── product-sales-widget.tsx    # (existing)
└── scripts/
    └── seed.ts                         # (existing)
```

Frontend changes are in `oryn-website/src/`:
- Replace `src/lib/db.ts` usage → Medusa API calls
- Replace `src/lib/auth.ts` → Medusa customer auth
- Update `src/app/api/` routes → proxy to Medusa or remove
- Update providers (cart already done, wishlist needs update)
- Update form components (contact, newsletter, exit intent)
- Update account pages (profile, orders)
- Fix cookie consent to actually block analytics

---

## Chunk 1: Medusa Custom Modules

### Task 1: Contact Form Module

**Files:**
- Create: `medusa-backend/src/modules/contact/models/contact-submission.ts`
- Create: `medusa-backend/src/modules/contact/service.ts`
- Create: `medusa-backend/src/modules/contact/index.ts`
- Modify: `medusa-backend/medusa-config.ts`

- [ ] **Step 1: Create the ContactSubmission data model**

```typescript
// medusa-backend/src/modules/contact/models/contact-submission.ts
import { model } from "@medusajs/framework/utils"

const ContactSubmission = model.define("contact_submission", {
  id: model.id().primaryKey(),
  first_name: model.text(),
  last_name: model.text(),
  email: model.text(),
  organization: model.text().nullable(),
  inquiry_type: model.text(),
  message: model.text(),
  status: model.enum(["new", "read", "replied", "archived"]).default("new"),
  admin_notes: model.text().nullable(),
})

export default ContactSubmission
```

- [ ] **Step 2: Create the ContactModuleService**

```typescript
// medusa-backend/src/modules/contact/service.ts
import { MedusaService } from "@medusajs/framework/utils"
import ContactSubmission from "./models/contact-submission"

class ContactModuleService extends MedusaService({
  ContactSubmission,
}) {}

export default ContactModuleService
```

- [ ] **Step 3: Create module registration**

```typescript
// medusa-backend/src/modules/contact/index.ts
import { Module } from "@medusajs/framework/utils"
import ContactModuleService from "./service"

export const CONTACT_MODULE = "contactModuleService"

export default Module(CONTACT_MODULE, {
  service: ContactModuleService,
})
```

- [ ] **Step 4: Register module in medusa-config.ts**

Add to the modules array in `medusa-backend/medusa-config.ts`:

```typescript
// Add import at top:
// No import needed - path-based resolution

// Add to module.exports.modules:
{
  resolve: "./src/modules/contact",
}
```

- [ ] **Step 5: Run database migration**

```bash
cd medusa-backend
npx medusa db:generate contactModule
npx medusa db:migrate
```

- [ ] **Step 6: Commit**

```bash
git add medusa-backend/src/modules/contact/ medusa-backend/medusa-config.ts
git commit -m "feat(medusa): add Contact Form custom module with data model and service"
```

---

### Task 2: Newsletter Module

**Files:**
- Create: `medusa-backend/src/modules/newsletter/models/newsletter-subscriber.ts`
- Create: `medusa-backend/src/modules/newsletter/service.ts`
- Create: `medusa-backend/src/modules/newsletter/index.ts`
- Modify: `medusa-backend/medusa-config.ts`

- [ ] **Step 1: Create the NewsletterSubscriber data model**

```typescript
// medusa-backend/src/modules/newsletter/models/newsletter-subscriber.ts
import { model } from "@medusajs/framework/utils"

const NewsletterSubscriber = model.define("newsletter_subscriber", {
  id: model.id().primaryKey(),
  email: model.text(),
  first_name: model.text().nullable(),
  last_name: model.text().nullable(),
  source: model.enum(["footer", "exit_intent", "checkout", "manual"]).default("footer"),
  status: model.enum(["active", "unsubscribed"]).default("active"),
})

export default NewsletterSubscriber
```

- [ ] **Step 2: Create the NewsletterModuleService**

```typescript
// medusa-backend/src/modules/newsletter/service.ts
import { MedusaService } from "@medusajs/framework/utils"
import NewsletterSubscriber from "./models/newsletter-subscriber"

class NewsletterModuleService extends MedusaService({
  NewsletterSubscriber,
}) {}

export default NewsletterModuleService
```

- [ ] **Step 3: Create module registration**

```typescript
// medusa-backend/src/modules/newsletter/index.ts
import { Module } from "@medusajs/framework/utils"
import NewsletterModuleService from "./service"

export const NEWSLETTER_MODULE = "newsletterModuleService"

export default Module(NEWSLETTER_MODULE, {
  service: NewsletterModuleService,
})
```

- [ ] **Step 4: Register module in medusa-config.ts**

```typescript
{
  resolve: "./src/modules/newsletter",
}
```

- [ ] **Step 5: Run migration and commit**

```bash
npx medusa db:generate newsletterModule
npx medusa db:migrate
git add medusa-backend/src/modules/newsletter/ medusa-backend/medusa-config.ts
git commit -m "feat(medusa): add Newsletter custom module"
```

---

### Task 3: Wishlist Module

**Files:**
- Create: `medusa-backend/src/modules/wishlist/models/wishlist-item.ts`
- Create: `medusa-backend/src/modules/wishlist/service.ts`
- Create: `medusa-backend/src/modules/wishlist/index.ts`
- Modify: `medusa-backend/medusa-config.ts`

- [ ] **Step 1: Create the WishlistItem data model**

```typescript
// medusa-backend/src/modules/wishlist/models/wishlist-item.ts
import { model } from "@medusajs/framework/utils"

const WishlistItem = model.define("wishlist_item", {
  id: model.id().primaryKey(),
  customer_id: model.text(),
  product_id: model.text(),
})

export default WishlistItem
```

- [ ] **Step 2: Create the WishlistModuleService**

```typescript
// medusa-backend/src/modules/wishlist/service.ts
import { MedusaService } from "@medusajs/framework/utils"
import WishlistItem from "./models/wishlist-item"

class WishlistModuleService extends MedusaService({
  WishlistItem,
}) {}

export default WishlistModuleService
```

- [ ] **Step 3: Create module registration**

```typescript
// medusa-backend/src/modules/wishlist/index.ts
import { Module } from "@medusajs/framework/utils"
import WishlistModuleService from "./service"

export const WISHLIST_MODULE = "wishlistModuleService"

export default Module(WISHLIST_MODULE, {
  service: WishlistModuleService,
})
```

- [ ] **Step 4: Register module in medusa-config.ts and migrate**

```bash
npx medusa db:generate wishlistModule
npx medusa db:migrate
git add medusa-backend/src/modules/wishlist/ medusa-backend/medusa-config.ts
git commit -m "feat(medusa): add Wishlist custom module"
```

---

### Task 4: Referral & Commission Module

**Files:**
- Create: `medusa-backend/src/modules/referral/models/referral-link.ts`
- Create: `medusa-backend/src/modules/referral/models/commission.ts`
- Create: `medusa-backend/src/modules/referral/service.ts`
- Create: `medusa-backend/src/modules/referral/index.ts`
- Modify: `medusa-backend/medusa-config.ts`

- [ ] **Step 1: Create the ReferralLink data model**

```typescript
// medusa-backend/src/modules/referral/models/referral-link.ts
import { model } from "@medusajs/framework/utils"

const ReferralLink = model.define("referral_link", {
  id: model.id().primaryKey(),
  referrer_customer_id: model.text(),
  referred_customer_id: model.text(),
  referral_code: model.text(),
  level: model.number().default(1),
})

export default ReferralLink
```

- [ ] **Step 2: Create the Commission data model**

```typescript
// medusa-backend/src/modules/referral/models/commission.ts
import { model } from "@medusajs/framework/utils"

const Commission = model.define("commission", {
  id: model.id().primaryKey(),
  referral_link_id: model.text(),
  order_id: model.text(),
  beneficiary_customer_id: model.text(),
  source_customer_id: model.text(),
  level: model.number(),
  rate: model.float(),
  order_amount: model.float(),
  commission_amount: model.float(),
  currency_code: model.text().default("eur"),
  status: model.enum(["pending", "approved", "paid", "rejected"]).default("pending"),
})

export default Commission
```

- [ ] **Step 3: Create the ReferralModuleService with custom methods**

```typescript
// medusa-backend/src/modules/referral/service.ts
import { MedusaService } from "@medusajs/framework/utils"
import ReferralLink from "./models/referral-link"
import Commission from "./models/commission"

class ReferralModuleService extends MedusaService({
  ReferralLink,
  Commission,
}) {
  // Commission rates per level (matching current frontend logic)
  private commissionRates = [0.05, 0.03, 0.02, 0.01, 0.005]

  async generateReferralCode(): Promise<string> {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code: string
    let exists = true
    while (exists) {
      code = "ORYN-"
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      const [existing] = await this.listReferralLinks({ referral_code: code })
      exists = !!existing
    }
    return code!
  }

  async getReferralChain(customerId: string): Promise<string[]> {
    const chain: string[] = []
    let currentId = customerId
    for (let i = 0; i < 5; i++) {
      const [link] = await this.listReferralLinks({
        referred_customer_id: currentId,
      })
      if (!link) break
      chain.push(link.referrer_customer_id)
      currentId = link.referrer_customer_id
    }
    return chain
  }

  async generateCommissions(
    orderId: string,
    customerIdWhoPaid: string,
    orderAmount: number,
    currencyCode: string
  ): Promise<void> {
    const chain = await this.getReferralChain(customerIdWhoPaid)
    for (let i = 0; i < chain.length; i++) {
      const rate = this.commissionRates[i]
      const commissionAmount = Math.round(orderAmount * rate * 100) / 100
      if (commissionAmount <= 0) continue

      // Find the referral link for this level
      const referredId = i === 0 ? customerIdWhoPaid : chain[i - 1]
      const [link] = await this.listReferralLinks({
        referrer_customer_id: chain[i],
        referred_customer_id: referredId,
      })

      await this.createCommissions({
        referral_link_id: link?.id || "",
        order_id: orderId,
        beneficiary_customer_id: chain[i],
        source_customer_id: customerIdWhoPaid,
        level: i + 1,
        rate,
        order_amount: orderAmount,
        commission_amount: commissionAmount,
        currency_code: currencyCode,
        status: "pending",
      })
    }
  }
}

export default ReferralModuleService
```

- [ ] **Step 4: Create module registration**

```typescript
// medusa-backend/src/modules/referral/index.ts
import { Module } from "@medusajs/framework/utils"
import ReferralModuleService from "./service"

export const REFERRAL_MODULE = "referralModuleService"

export default Module(REFERRAL_MODULE, {
  service: ReferralModuleService,
})
```

- [ ] **Step 5: Register module in medusa-config.ts and migrate**

```bash
npx medusa db:generate referralModule
npx medusa db:migrate
git add medusa-backend/src/modules/referral/ medusa-backend/medusa-config.ts
git commit -m "feat(medusa): add Referral & Commission custom module with multi-level commission logic"
```

---

## Chunk 2: Medusa Store & Admin API Routes

### Task 5: Validation Schemas

**Files:**
- Create: `medusa-backend/src/api/store/contact/validators.ts`
- Create: `medusa-backend/src/api/store/newsletter/validators.ts`
- Create: `medusa-backend/src/api/store/wishlist/validators.ts`
- Create: `medusa-backend/src/api/middlewares.ts`

- [ ] **Step 1: Create contact form validators**

```typescript
// medusa-backend/src/api/store/contact/validators.ts
import { z } from "@medusajs/framework/zod"

export const PostStoreContactSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  organization: z.string().optional(),
  inquiry_type: z.enum([
    "general",
    "wholesale",
    "research",
    "support",
    "returns",
    "partnership",
  ]),
  message: z.string().min(10),
})
```

- [ ] **Step 2: Create newsletter validators**

```typescript
// medusa-backend/src/api/store/newsletter/validators.ts
import { z } from "@medusajs/framework/zod"

export const PostStoreNewsletterSchema = z.object({
  email: z.string().email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  source: z.enum(["footer", "exit_intent", "checkout", "manual"]).default("footer"),
})
```

- [ ] **Step 3: Create wishlist validators**

```typescript
// medusa-backend/src/api/store/wishlist/validators.ts
import { z } from "@medusajs/framework/zod"

export const PostStoreWishlistSchema = z.object({
  product_id: z.string().min(1),
})
```

- [ ] **Step 4: Create middlewares.ts with validation**

```typescript
// medusa-backend/src/api/middlewares.ts
import {
  defineMiddlewares,
  validateAndTransformBody,
} from "@medusajs/framework/http"
import { PostStoreContactSchema } from "./store/contact/validators"
import { PostStoreNewsletterSchema } from "./store/newsletter/validators"
import { PostStoreWishlistSchema } from "./store/wishlist/validators"

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/contact",
      method: "POST",
      middlewares: [validateAndTransformBody(PostStoreContactSchema)],
    },
    {
      matcher: "/store/newsletter",
      method: "POST",
      middlewares: [validateAndTransformBody(PostStoreNewsletterSchema)],
    },
    {
      matcher: "/store/wishlist",
      method: "POST",
      middlewares: [validateAndTransformBody(PostStoreWishlistSchema)],
    },
  ],
})
```

- [ ] **Step 5: Commit**

```bash
git add medusa-backend/src/api/
git commit -m "feat(medusa): add Zod validation schemas and middlewares for store API routes"
```

---

### Task 6: Store API Routes

**Files:**
- Create: `medusa-backend/src/api/store/contact/route.ts`
- Create: `medusa-backend/src/api/store/newsletter/route.ts`
- Create: `medusa-backend/src/api/store/wishlist/route.ts`
- Create: `medusa-backend/src/api/store/wishlist/[id]/route.ts`
- Create: `medusa-backend/src/api/store/referrals/route.ts`

- [ ] **Step 1: Create contact form store route**

```typescript
// medusa-backend/src/api/store/contact/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"
import { PostStoreContactSchema } from "./validators"
import { CONTACT_MODULE } from "../../../modules/contact"

type PostBody = z.infer<typeof PostStoreContactSchema>

export async function POST(
  req: MedusaRequest<PostBody>,
  res: MedusaResponse
) {
  const contactService = req.scope.resolve(CONTACT_MODULE)
  const eventBus = req.scope.resolve("event_bus")

  const submission = await contactService.createContactSubmissions({
    first_name: req.validatedBody.first_name,
    last_name: req.validatedBody.last_name,
    email: req.validatedBody.email,
    organization: req.validatedBody.organization || null,
    inquiry_type: req.validatedBody.inquiry_type,
    message: req.validatedBody.message,
    status: "new",
  })

  // Emit event for subscriber to send notification email
  await eventBus.emit({
    name: "contact.submitted",
    data: { id: submission.id },
  })

  res.status(201).json({ submission })
}
```

- [ ] **Step 2: Create newsletter store route**

```typescript
// medusa-backend/src/api/store/newsletter/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"
import { PostStoreNewsletterSchema } from "./validators"
import { NEWSLETTER_MODULE } from "../../../modules/newsletter"

type PostBody = z.infer<typeof PostStoreNewsletterSchema>

export async function POST(
  req: MedusaRequest<PostBody>,
  res: MedusaResponse
) {
  const newsletterService = req.scope.resolve(NEWSLETTER_MODULE)

  // Check if already subscribed
  const existing = await newsletterService.listNewsletterSubscribers({
    email: req.validatedBody.email,
  })

  if (existing.length > 0) {
    // Reactivate if unsubscribed
    if (existing[0].status === "unsubscribed") {
      const updated = await newsletterService.updateNewsletterSubscribers(
        existing[0].id,
        { status: "active", source: req.validatedBody.source }
      )
      return res.json({ subscriber: updated, reactivated: true })
    }
    return res.json({ subscriber: existing[0], already_subscribed: true })
  }

  const subscriber = await newsletterService.createNewsletterSubscribers({
    email: req.validatedBody.email,
    first_name: req.validatedBody.first_name || null,
    last_name: req.validatedBody.last_name || null,
    source: req.validatedBody.source,
    status: "active",
  })

  res.status(201).json({ subscriber })
}
```

- [ ] **Step 3: Create wishlist store routes**

```typescript
// medusa-backend/src/api/store/wishlist/route.ts
import type { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"
import { PostStoreWishlistSchema } from "./validators"
import { WISHLIST_MODULE } from "../../../modules/wishlist"

type PostBody = z.infer<typeof PostStoreWishlistSchema>

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const wishlistService = req.scope.resolve(WISHLIST_MODULE)
  const customerId = req.auth_context?.actor_id

  if (!customerId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const items = await wishlistService.listWishlistItems({
    customer_id: customerId,
  })

  res.json({ wishlist_items: items })
}

export async function POST(
  req: AuthenticatedMedusaRequest<PostBody>,
  res: MedusaResponse
) {
  const wishlistService = req.scope.resolve(WISHLIST_MODULE)
  const customerId = req.auth_context?.actor_id

  if (!customerId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  // Check if already in wishlist
  const existing = await wishlistService.listWishlistItems({
    customer_id: customerId,
    product_id: req.validatedBody.product_id,
  })

  if (existing.length > 0) {
    return res.json({ wishlist_item: existing[0], already_exists: true })
  }

  const item = await wishlistService.createWishlistItems({
    customer_id: customerId,
    product_id: req.validatedBody.product_id,
  })

  res.status(201).json({ wishlist_item: item })
}
```

```typescript
// medusa-backend/src/api/store/wishlist/[id]/route.ts
import type { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { WISHLIST_MODULE } from "../../../../modules/wishlist"

export async function DELETE(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const wishlistService = req.scope.resolve(WISHLIST_MODULE)
  const customerId = req.auth_context?.actor_id

  if (!customerId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  await wishlistService.deleteWishlistItems(req.params.id)

  res.status(200).json({ id: req.params.id, deleted: true })
}
```

- [ ] **Step 4: Create referrals store route**

```typescript
// medusa-backend/src/api/store/referrals/route.ts
import type { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { REFERRAL_MODULE } from "../../../modules/referral"

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const referralService = req.scope.resolve(REFERRAL_MODULE)
  const customerId = req.auth_context?.actor_id

  if (!customerId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  // Get referral links where this customer is the referrer
  const directReferrals = await referralService.listReferralLinks({
    referrer_customer_id: customerId,
    level: 1,
  })

  // Get this customer's referral code
  const [myLink] = await referralService.listReferralLinks({
    referrer_customer_id: customerId,
  })

  // Get all commissions for this customer
  const commissions = await referralService.listCommissions({
    beneficiary_customer_id: customerId,
  })

  const totalEarnings = commissions
    .filter((c: any) => c.status === "paid")
    .reduce((sum: number, c: any) => sum + c.commission_amount, 0)

  const pendingEarnings = commissions
    .filter((c: any) => c.status === "pending" || c.status === "approved")
    .reduce((sum: number, c: any) => sum + c.commission_amount, 0)

  res.json({
    referral_code: myLink?.referral_code || null,
    direct_referrals_count: directReferrals.length,
    total_earnings: totalEarnings,
    pending_earnings: pendingEarnings,
    commissions,
  })
}
```

- [ ] **Step 5: Commit**

```bash
git add medusa-backend/src/api/store/
git commit -m "feat(medusa): add store API routes for contact, newsletter, wishlist, referrals"
```

---

### Task 7: Admin API Routes

**Files:**
- Create: `medusa-backend/src/api/admin/contact-submissions/route.ts`
- Create: `medusa-backend/src/api/admin/contact-submissions/[id]/route.ts`
- Create: `medusa-backend/src/api/admin/newsletter-subscribers/route.ts`
- Create: `medusa-backend/src/api/admin/newsletter-subscribers/[id]/route.ts`
- Create: `medusa-backend/src/api/admin/referrals/route.ts`
- Create: `medusa-backend/src/api/admin/commissions/route.ts`
- Create: `medusa-backend/src/api/admin/commissions/[id]/route.ts`

- [ ] **Step 1: Create contact submissions admin routes**

```typescript
// medusa-backend/src/api/admin/contact-submissions/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CONTACT_MODULE } from "../../../modules/contact"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const contactService = req.scope.resolve(CONTACT_MODULE)
  const { status, q, limit = "50", offset = "0" } = req.query as Record<string, string>

  const filters: Record<string, any> = {}
  if (status) filters.status = status

  const submissions = await contactService.listContactSubmissions(
    filters,
    { take: parseInt(limit), skip: parseInt(offset), order: { created_at: "DESC" } }
  )

  const [, count] = await contactService.listAndCountContactSubmissions(filters)

  res.json({ contact_submissions: submissions, count, limit: parseInt(limit), offset: parseInt(offset) })
}
```

```typescript
// medusa-backend/src/api/admin/contact-submissions/[id]/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CONTACT_MODULE } from "../../../../modules/contact"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const contactService = req.scope.resolve(CONTACT_MODULE)
  const submission = await contactService.retrieveContactSubmission(req.params.id)
  res.json({ contact_submission: submission })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const contactService = req.scope.resolve(CONTACT_MODULE)
  const updated = await contactService.updateContactSubmissions(
    req.params.id,
    req.body as { status?: string; admin_notes?: string }
  )
  res.json({ contact_submission: updated })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const contactService = req.scope.resolve(CONTACT_MODULE)
  await contactService.deleteContactSubmissions(req.params.id)
  res.json({ id: req.params.id, deleted: true })
}
```

- [ ] **Step 2: Create newsletter subscribers admin routes**

```typescript
// medusa-backend/src/api/admin/newsletter-subscribers/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { NEWSLETTER_MODULE } from "../../../modules/newsletter"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const newsletterService = req.scope.resolve(NEWSLETTER_MODULE)
  const { status, source, limit = "50", offset = "0" } = req.query as Record<string, string>

  const filters: Record<string, any> = {}
  if (status) filters.status = status
  if (source) filters.source = source

  const subscribers = await newsletterService.listNewsletterSubscribers(
    filters,
    { take: parseInt(limit), skip: parseInt(offset), order: { created_at: "DESC" } }
  )

  const [, count] = await newsletterService.listAndCountNewsletterSubscribers(filters)

  res.json({ newsletter_subscribers: subscribers, count, limit: parseInt(limit), offset: parseInt(offset) })
}
```

```typescript
// medusa-backend/src/api/admin/newsletter-subscribers/[id]/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { NEWSLETTER_MODULE } from "../../../../modules/newsletter"

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const newsletterService = req.scope.resolve(NEWSLETTER_MODULE)
  await newsletterService.deleteNewsletterSubscribers(req.params.id)
  res.json({ id: req.params.id, deleted: true })
}
```

- [ ] **Step 3: Create referrals admin route**

```typescript
// medusa-backend/src/api/admin/referrals/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { REFERRAL_MODULE } from "../../../modules/referral"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const referralService = req.scope.resolve(REFERRAL_MODULE)
  const { limit = "50", offset = "0" } = req.query as Record<string, string>

  const links = await referralService.listReferralLinks(
    {},
    { take: parseInt(limit), skip: parseInt(offset), order: { created_at: "DESC" } }
  )

  const [, count] = await referralService.listAndCountReferralLinks({})

  res.json({ referral_links: links, count, limit: parseInt(limit), offset: parseInt(offset) })
}
```

- [ ] **Step 4: Create commissions admin routes**

```typescript
// medusa-backend/src/api/admin/commissions/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { REFERRAL_MODULE } from "../../../modules/referral"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const referralService = req.scope.resolve(REFERRAL_MODULE)
  const { status, limit = "50", offset = "0" } = req.query as Record<string, string>

  const filters: Record<string, any> = {}
  if (status) filters.status = status

  const commissions = await referralService.listCommissions(
    filters,
    { take: parseInt(limit), skip: parseInt(offset), order: { created_at: "DESC" } }
  )

  const [, count] = await referralService.listAndCountCommissions(filters)

  // Calculate totals
  const allCommissions = await referralService.listCommissions({})
  const totalPending = allCommissions
    .filter((c: any) => c.status === "pending")
    .reduce((sum: number, c: any) => sum + c.commission_amount, 0)
  const totalPaid = allCommissions
    .filter((c: any) => c.status === "paid")
    .reduce((sum: number, c: any) => sum + c.commission_amount, 0)

  res.json({
    commissions,
    count,
    limit: parseInt(limit),
    offset: parseInt(offset),
    totals: { pending: totalPending, paid: totalPaid },
  })
}
```

```typescript
// medusa-backend/src/api/admin/commissions/[id]/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { REFERRAL_MODULE } from "../../../../modules/referral"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const referralService = req.scope.resolve(REFERRAL_MODULE)
  const { status } = req.body as { status: "pending" | "approved" | "paid" | "rejected" }

  const updated = await referralService.updateCommissions(req.params.id, { status })

  res.json({ commission: updated })
}
```

- [ ] **Step 5: Commit**

```bash
git add medusa-backend/src/api/admin/
git commit -m "feat(medusa): add admin API routes for contact, newsletter, referrals, commissions"
```

---

## Chunk 3: Email Notifications & Subscribers

### Task 8: Email Notification Setup

**Files:**
- Modify: `medusa-backend/medusa-config.ts` (add notification module)
- Modify: `medusa-backend/package.json` (add SendGrid dependency)
- Create: `medusa-backend/src/subscribers/contact-submitted.ts`
- Create: `medusa-backend/src/subscribers/order-placed.ts`
- Create: `medusa-backend/src/subscribers/customer-created.ts`

**Important:** If SendGrid is not desired, an alternative is to use Resend or nodemailer directly in subscribers. The approach below uses the `@sendgrid/mail` package directly for simplicity (Medusa v2's notification module with SendGrid provider is more complex to set up and may be overkill for this use case).

- [ ] **Step 1: Install SendGrid dependency**

```bash
cd medusa-backend
npm install @sendgrid/mail
```

Add to `.env.template` and `.env`:
```
SENDGRID_API_KEY=SG.xxxx
SENDGRID_FROM_EMAIL=info@orynlabs.com
ADMIN_NOTIFICATION_EMAIL=admin@oryn.com
```

- [ ] **Step 2: Create contact-submitted subscriber**

```typescript
// medusa-backend/src/subscribers/contact-submitted.ts
import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { CONTACT_MODULE } from "../modules/contact"
import sgMail from "@sendgrid/mail"

export default async function contactSubmittedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")
  const contactService = container.resolve(CONTACT_MODULE)

  try {
    const submission = await contactService.retrieveContactSubmission(data.id)

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

    // Notify admin
    await sgMail.send({
      to: process.env.ADMIN_NOTIFICATION_EMAIL || "admin@oryn.com",
      from: process.env.SENDGRID_FROM_EMAIL || "info@orynlabs.com",
      subject: `[ORYN] New Contact: ${submission.inquiry_type} from ${submission.first_name} ${submission.last_name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${submission.first_name} ${submission.last_name}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Organization:</strong> ${submission.organization || "N/A"}</p>
        <p><strong>Type:</strong> ${submission.inquiry_type}</p>
        <p><strong>Message:</strong></p>
        <p>${submission.message}</p>
      `,
    })

    // Auto-reply to customer
    await sgMail.send({
      to: submission.email,
      from: process.env.SENDGRID_FROM_EMAIL || "info@orynlabs.com",
      subject: "Thank you for contacting ORYN Peptides",
      html: `
        <h2>Thank you, ${submission.first_name}!</h2>
        <p>We have received your inquiry and will get back to you within 24-48 hours.</p>
        <p>Best regards,<br>The ORYN Peptides Team</p>
      `,
    })

    logger.info(`Contact form notification sent for submission ${data.id}`)
  } catch (error) {
    logger.error(`Failed to send contact notification: ${error}`)
  }
}

export const config: SubscriberConfig = {
  event: "contact.submitted",
}
```

- [ ] **Step 3: Create order-placed subscriber**

```typescript
// medusa-backend/src/subscribers/order-placed.ts
import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { REFERRAL_MODULE } from "../modules/referral"
import sgMail from "@sendgrid/mail"

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")

  try {
    // Retrieve order details from Medusa
    const query = container.resolve("query")
    const { data: [order] } = await query.graph({
      entity: "order",
      fields: [
        "id", "display_id", "email", "total", "currency_code",
        "items.*", "shipping_address.*", "customer_id",
      ],
      filters: { id: data.id },
    })

    if (!order) {
      logger.warn(`Order ${data.id} not found for notification`)
      return
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

    // Send order confirmation to customer
    await sgMail.send({
      to: order.email,
      from: process.env.SENDGRID_FROM_EMAIL || "info@orynlabs.com",
      subject: `ORYN Peptides - Order Confirmation #${order.display_id}`,
      html: `
        <h2>Order Confirmed!</h2>
        <p>Thank you for your order #${order.display_id}.</p>
        <p><strong>Total:</strong> ${order.total} ${order.currency_code?.toUpperCase()}</p>
        <p>We'll send you a shipping confirmation once your order is on its way.</p>
        <p>Best regards,<br>The ORYN Peptides Team</p>
      `,
    })

    // Generate referral commissions if customer has referrer
    if (order.customer_id) {
      const referralService = container.resolve(REFERRAL_MODULE)
      await referralService.generateCommissions(
        order.id,
        order.customer_id,
        order.total,
        order.currency_code || "eur"
      )
      logger.info(`Commissions generated for order ${order.id}`)
    }

    // Notify admin
    await sgMail.send({
      to: process.env.ADMIN_NOTIFICATION_EMAIL || "admin@oryn.com",
      from: process.env.SENDGRID_FROM_EMAIL || "info@orynlabs.com",
      subject: `[ORYN] New Order #${order.display_id} - ${order.total} ${order.currency_code?.toUpperCase()}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Order:</strong> #${order.display_id}</p>
        <p><strong>Customer:</strong> ${order.email}</p>
        <p><strong>Total:</strong> ${order.total} ${order.currency_code?.toUpperCase()}</p>
      `,
    })

    logger.info(`Order confirmation sent for order ${data.id}`)
  } catch (error) {
    logger.error(`Failed to handle order.placed: ${error}`)
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
```

- [ ] **Step 4: Create customer-created subscriber**

```typescript
// medusa-backend/src/subscribers/customer-created.ts
import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { REFERRAL_MODULE } from "../modules/referral"
import sgMail from "@sendgrid/mail"

export default async function customerCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")

  try {
    const query = container.resolve("query")
    const { data: [customer] } = await query.graph({
      entity: "customer",
      fields: ["id", "email", "first_name", "last_name", "metadata"],
      filters: { id: data.id },
    })

    if (!customer) return

    const referralService = container.resolve(REFERRAL_MODULE)

    // Generate a referral code for this new customer
    const referralCode = await referralService.generateReferralCode()

    // If customer was referred (referral_code in metadata), create referral link
    const referredByCode = customer.metadata?.referred_by_code as string | undefined
    if (referredByCode) {
      // Find the referrer by their referral code
      const [referrerLink] = await referralService.listReferralLinks({
        referral_code: referredByCode,
      })

      if (referrerLink) {
        await referralService.createReferralLinks({
          referrer_customer_id: referrerLink.referrer_customer_id,
          referred_customer_id: customer.id,
          referral_code: referredByCode,
          level: 1,
        })

        // Build multi-level chain (levels 2-5)
        const chain = await referralService.getReferralChain(referrerLink.referrer_customer_id)
        for (let i = 0; i < chain.length && i < 4; i++) {
          await referralService.createReferralLinks({
            referrer_customer_id: chain[i],
            referred_customer_id: customer.id,
            referral_code: referredByCode,
            level: i + 2,
          })
        }
      }
    }

    // Create the new customer's own referral link (for them to share)
    await referralService.createReferralLinks({
      referrer_customer_id: customer.id,
      referred_customer_id: customer.id, // self-reference as placeholder
      referral_code: referralCode,
      level: 0, // level 0 = own code
    })

    // Send welcome email
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
    await sgMail.send({
      to: customer.email,
      from: process.env.SENDGRID_FROM_EMAIL || "info@orynlabs.com",
      subject: "Welcome to ORYN Peptides!",
      html: `
        <h2>Welcome, ${customer.first_name || ""}!</h2>
        <p>Your account has been created successfully.</p>
        <p>Your personal referral code is: <strong>${referralCode}</strong></p>
        <p>Share it with friends and earn commissions on their purchases!</p>
        <p>Best regards,<br>The ORYN Peptides Team</p>
      `,
    })

    logger.info(`Welcome email sent and referral code generated for customer ${data.id}`)
  } catch (error) {
    logger.error(`Failed to handle customer.created: ${error}`)
  }
}

export const config: SubscriberConfig = {
  event: "customer.created",
}
```

- [ ] **Step 5: Commit**

```bash
git add medusa-backend/src/subscribers/ medusa-backend/package.json medusa-backend/package-lock.json
git commit -m "feat(medusa): add event subscribers for contact notifications, order confirmations, and customer welcome emails"
```

---

## Chunk 4: Admin UI Extensions

### Task 9: Contact Submissions Admin Page

**Files:**
- Create: `medusa-backend/src/admin/routes/contact-submissions/page.tsx`

- [ ] **Step 1: Create contact submissions admin page**

```tsx
// medusa-backend/src/admin/routes/contact-submissions/page.tsx
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { EnvelopeOpen } from "@medusajs/icons"
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
      const res = await fetch("/admin/contact-submissions", { credentials: "include" })
      const data = await res.json()
      setSubmissions(data.contact_submissions || [])
    } catch (e) {
      console.error("Failed to fetch contact submissions", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSubmissions() }, [])

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

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h1">Contact Submissions</Heading>
          <Text className="text-ui-fg-subtle mt-1">
            {submissions.length} total submissions
          </Text>
        </div>
      </div>

      {selected ? (
        <div className="p-6">
          <Button variant="secondary" onClick={() => setSelectedId(null)} className="mb-4">
            Back to list
          </Button>
          <div className="space-y-3">
            <Heading level="h2">{selected.first_name} {selected.last_name}</Heading>
            <Text><strong>Email:</strong> {selected.email}</Text>
            <Text><strong>Organization:</strong> {selected.organization || "N/A"}</Text>
            <Text><strong>Type:</strong> {selected.inquiry_type}</Text>
            <Text><strong>Date:</strong> {new Date(selected.created_at).toLocaleString()}</Text>
            <Badge color={statusColors[selected.status]}>{selected.status}</Badge>
            <div className="mt-4 rounded bg-ui-bg-subtle p-4">
              <Text>{selected.message}</Text>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="small" onClick={() => updateStatus(selected.id, "read")}>Mark Read</Button>
              <Button size="small" onClick={() => updateStatus(selected.id, "replied")}>Mark Replied</Button>
              <Button size="small" onClick={() => updateStatus(selected.id, "archived")}>Archive</Button>
              <Button size="small" variant="danger" onClick={() => { deleteSubmission(selected.id); setSelectedId(null) }}>Delete</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          {loading ? (
            <Text>Loading...</Text>
          ) : submissions.length === 0 ? (
            <Text>No contact submissions yet.</Text>
          ) : (
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
                    onClick={() => { setSelectedId(s.id); if (s.status === "new") updateStatus(s.id, "read") }}
                  >
                    <Table.Cell>{new Date(s.created_at).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>{s.first_name} {s.last_name}</Table.Cell>
                    <Table.Cell>{s.email}</Table.Cell>
                    <Table.Cell>{s.inquiry_type}</Table.Cell>
                    <Table.Cell><Badge color={statusColors[s.status]}>{s.status}</Badge></Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
      )}
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Contact Submissions",
  icon: EnvelopeOpen,
})

export default ContactSubmissionsPage
```

- [ ] **Step 2: Commit**

```bash
git add medusa-backend/src/admin/routes/contact-submissions/
git commit -m "feat(medusa-admin): add Contact Submissions management page"
```

---

### Task 10: Newsletter Admin Page

**Files:**
- Create: `medusa-backend/src/admin/routes/newsletter/page.tsx`

- [ ] **Step 1: Create newsletter admin page**

```tsx
// medusa-backend/src/admin/routes/newsletter/page.tsx
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { EnvelopeSolid } from "@medusajs/icons"
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
      const res = await fetch("/admin/newsletter-subscribers", { credentials: "include" })
      const data = await res.json()
      setSubscribers(data.newsletter_subscribers || [])
      setCount(data.count || 0)
    } catch (e) {
      console.error("Failed to fetch subscribers", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSubscribers() }, [])

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
      .map((s) => `${s.email},${s.first_name || ""},${s.last_name || ""},${s.source},${s.status},${s.created_at}`)
      .join("\n")
    const blob = new Blob([headers + rows], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `oryn-newsletter-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  const activeCount = subscribers.filter((s) => s.status === "active").length

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h1">Newsletter Subscribers</Heading>
          <Text className="text-ui-fg-subtle mt-1">
            {activeCount} active / {count} total
          </Text>
        </div>
        <Button variant="secondary" onClick={exportCSV}>Export CSV</Button>
      </div>

      <div className="p-6">
        {loading ? (
          <Text>Loading...</Text>
        ) : subscribers.length === 0 ? (
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
                  <Table.Cell>{[s.first_name, s.last_name].filter(Boolean).join(" ") || "-"}</Table.Cell>
                  <Table.Cell><Badge>{s.source}</Badge></Table.Cell>
                  <Table.Cell>
                    <Badge color={s.status === "active" ? "green" : "grey"}>{s.status}</Badge>
                  </Table.Cell>
                  <Table.Cell>{new Date(s.created_at).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Button size="small" variant="danger" onClick={() => deleteSubscriber(s.id)}>
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
  icon: EnvelopeSolid,
})

export default NewsletterPage
```

- [ ] **Step 2: Commit**

```bash
git add medusa-backend/src/admin/routes/newsletter/
git commit -m "feat(medusa-admin): add Newsletter Subscribers management page with CSV export"
```

---

### Task 11: Referrals & Commissions Admin Page

**Files:**
- Create: `medusa-backend/src/admin/routes/referrals/page.tsx`

- [ ] **Step 1: Create referrals admin page**

```tsx
// medusa-backend/src/admin/routes/referrals/page.tsx
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { UsersSolid } from "@medusajs/icons"
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

  useEffect(() => { fetchData() }, [])

  const updateCommissionStatus = async (id: string, status: string) => {
    await fetch(`/admin/commissions/${id}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    fetchData()
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h1">Referrals & Commissions</Heading>
          <Text className="text-ui-fg-subtle mt-1">
            Pending: {totals.pending.toFixed(2)}EUR | Paid: {totals.paid.toFixed(2)}EUR
          </Text>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Tabs defaultValue="commissions">
            <Tabs.List>
              <Tabs.Trigger value="commissions">Commissions ({commissions.length})</Tabs.Trigger>
              <Tabs.Trigger value="links">Referral Links ({links.filter(l => l.level === 1).length})</Tabs.Trigger>
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
                        <Table.Cell>{new Date(c.created_at).toLocaleDateString()}</Table.Cell>
                        <Table.Cell className="font-mono text-xs">{c.beneficiary_customer_id.slice(0, 12)}...</Table.Cell>
                        <Table.Cell className="font-mono text-xs">{c.order_id.slice(0, 12)}...</Table.Cell>
                        <Table.Cell>L{c.level}</Table.Cell>
                        <Table.Cell>{(c.rate * 100).toFixed(1)}%</Table.Cell>
                        <Table.Cell>{c.commission_amount.toFixed(2)} {c.currency_code.toUpperCase()}</Table.Cell>
                        <Table.Cell><Badge color={statusColors[c.status]}>{c.status}</Badge></Table.Cell>
                        <Table.Cell>
                          <div className="flex gap-1">
                            {c.status === "pending" && (
                              <Button size="small" onClick={() => updateCommissionStatus(c.id, "approved")}>Approve</Button>
                            )}
                            {(c.status === "pending" || c.status === "approved") && (
                              <Button size="small" onClick={() => updateCommissionStatus(c.id, "paid")}>Mark Paid</Button>
                            )}
                            {c.status !== "rejected" && c.status !== "paid" && (
                              <Button size="small" variant="danger" onClick={() => updateCommissionStatus(c.id, "rejected")}>Reject</Button>
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
              {links.filter(l => l.level === 1).length === 0 ? (
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
                    {links.filter(l => l.level === 1).map((l) => (
                      <Table.Row key={l.id}>
                        <Table.Cell>{new Date(l.created_at).toLocaleDateString()}</Table.Cell>
                        <Table.Cell className="font-mono text-xs">{l.referrer_customer_id.slice(0, 12)}...</Table.Cell>
                        <Table.Cell className="font-mono text-xs">{l.referred_customer_id.slice(0, 12)}...</Table.Cell>
                        <Table.Cell><Badge>{l.referral_code}</Badge></Table.Cell>
                        <Table.Cell>L{l.level}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
            </Tabs.Content>
          </Tabs>
        )}
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Referrals",
  icon: UsersSolid,
})

export default ReferralsPage
```

- [ ] **Step 2: Commit**

```bash
git add medusa-backend/src/admin/routes/referrals/
git commit -m "feat(medusa-admin): add Referrals & Commissions management page with approve/pay/reject actions"
```

---

## Chunk 5: Frontend Auth & Account Migration

### Task 12: Replace Custom Auth with Medusa Customer Auth

**Files:**
- Modify: `oryn-website/src/providers/auth.tsx` (or equivalent auth context)
- Modify: `oryn-website/src/app/[locale]/account/login/page.tsx`
- Modify: `oryn-website/src/app/[locale]/account/register/page.tsx`
- Delete: `oryn-website/src/app/api/auth/login/route.ts`
- Delete: `oryn-website/src/app/api/auth/register/route.ts`
- Delete: `oryn-website/src/lib/auth.ts`

- [ ] **Step 1: Create new Medusa-based auth provider**

The auth provider must use Medusa's customer auth endpoints:
- Register: `POST {MEDUSA_URL}/auth/customer/emailpass/register` → returns `{ token }`
- Then create customer: `POST {MEDUSA_URL}/store/customers` with `Authorization: Bearer {token}`
- Login: `POST {MEDUSA_URL}/auth/customer/emailpass` → returns `{ token }`
- Get profile: `GET {MEDUSA_URL}/store/customers/me` with `Authorization: Bearer {token}`
- Update profile: `POST {MEDUSA_URL}/store/customers/me`

Replace the current auth provider to use these Medusa endpoints instead of `/api/auth/login` and `/api/auth/register`. Store the Medusa auth token in localStorage as `oryn_medusa_auth_token`.

Key changes:
- `login(email, password)` → call Medusa auth endpoint
- `register(data)` → call Medusa auth register + create customer (pass `metadata.referred_by_code` if referral code used)
- `updateProfile(data)` → call Medusa `POST /store/customers/me`
- `changePassword(oldPass, newPass)` → Medusa doesn't expose this easily; use the auth endpoint to re-authenticate then update (or implement custom route if needed)
- `getUser()` → call Medusa `GET /store/customers/me`

- [ ] **Step 2: Update login page to use new auth provider**

- [ ] **Step 3: Update register page to use new auth provider**

Pass `metadata: { referred_by_code: referralCode }` when creating the customer if a referral code was captured.

- [ ] **Step 4: Update profile page for real password change**

Use Medusa's customer update endpoint. If Medusa v2 doesn't support password change via API, create a custom store route: `POST /store/customers/change-password` in the Medusa backend.

- [ ] **Step 5: Delete old auth files**

```bash
rm oryn-website/src/app/api/auth/login/route.ts
rm oryn-website/src/app/api/auth/register/route.ts
rm oryn-website/src/lib/auth.ts
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(frontend): replace custom auth with Medusa customer auth"
```

---

### Task 13: Replace Order History with Medusa Orders

**Files:**
- Modify: `oryn-website/src/app/[locale]/account/orders/page.tsx`
- Modify: `oryn-website/src/app/[locale]/account/orders/[id]/page.tsx` (if exists)
- Delete: `oryn-website/src/app/api/orders/route.ts`

- [ ] **Step 1: Update orders page to fetch from Medusa**

Use Medusa's store API: `GET {MEDUSA_URL}/store/orders` with the customer's auth token. This returns real orders from the Medusa database.

```typescript
const fetchOrders = async () => {
  const token = localStorage.getItem("oryn_medusa_auth_token")
  const res = await fetch(`${MEDUSA_URL}/store/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  return data.orders
}
```

- [ ] **Step 2: Update order detail page**

```typescript
const fetchOrder = async (id: string) => {
  const token = localStorage.getItem("oryn_medusa_auth_token")
  const res = await fetch(`${MEDUSA_URL}/store/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  return data.order
}
```

- [ ] **Step 3: Delete old orders API route**

```bash
rm oryn-website/src/app/api/orders/route.ts
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(frontend): replace order history with Medusa orders API"
```

---

## Chunk 6: Frontend Feature Migration

### Task 14: Contact Form → Medusa API

**Files:**
- Modify: `oryn-website/src/app/[locale]/contact/ContactClient.tsx`

- [ ] **Step 1: Update contact form to call Medusa store API**

Replace the fake `setTimeout` submission with a real API call:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  setError(null)

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        organization: formData.organization || undefined,
        inquiry_type: formData.inquiryType,
        message: formData.message,
      }),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || "Failed to submit")
    }

    setIsSubmitted(true)
    trackFormSubmitted("contact")
  } catch (err: any) {
    setError(err.message || "Something went wrong. Please try again.")
  } finally {
    setIsSubmitting(false)
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add oryn-website/src/app/*/contact/ContactClient.tsx
git commit -m "feat(frontend): connect contact form to Medusa backend"
```

---

### Task 15: Newsletter → Medusa API

**Files:**
- Modify: `oryn-website/src/components/layout/Footer.tsx`
- Modify: `oryn-website/src/components/ui/ExitIntentPopup.tsx`

- [ ] **Step 1: Update Footer newsletter to call Medusa API**

Replace localStorage storage with API call:

```typescript
const handleSubscribe = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!email) return
  setSubscribing(true)

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "footer" }),
    })

    if (!res.ok) throw new Error("Failed to subscribe")

    setSubscribed(true)
    trackNewsletterSignup("footer")
  } catch {
    // Show error to user
  } finally {
    setSubscribing(false)
  }
}
```

- [ ] **Step 2: Update ExitIntentPopup to call Medusa API**

Replace localStorage with:

```typescript
const handleSubmit = async () => {
  if (!email) return

  try {
    await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "exit_intent" }),
    })
    setSubmitted(true)
    trackExitIntentConverted("email_captured")
  } catch {
    // Silently fail - don't block user
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add oryn-website/src/components/layout/Footer.tsx oryn-website/src/components/ui/ExitIntentPopup.tsx
git commit -m "feat(frontend): connect newsletter & exit intent to Medusa backend"
```

---

### Task 16: Wishlist → Medusa API

**Files:**
- Modify: `oryn-website/src/providers/wishlist.tsx`

- [ ] **Step 1: Update wishlist provider to use Medusa API**

Replace localStorage with Medusa API calls. Keep localStorage as fallback for anonymous users, but sync with Medusa for authenticated users:

```typescript
// Key changes in wishlist provider:
// 1. If user is authenticated, fetch wishlist from Medusa on mount
// 2. addToWishlist → POST /store/wishlist (if authenticated)
// 3. removeFromWishlist → DELETE /store/wishlist/{id} (if authenticated)
// 4. Fall back to localStorage for anonymous users
// 5. On login, sync localStorage wishlist to Medusa
```

The provider should check for `oryn_medusa_auth_token` and use the appropriate storage mechanism.

- [ ] **Step 2: Commit**

```bash
git add oryn-website/src/providers/wishlist.tsx
git commit -m "feat(frontend): sync wishlist with Medusa backend for authenticated users"
```

---

### Task 17: Cookie Consent → Actually Functional

**Files:**
- Modify: `oryn-website/src/components/ui/CookieConsent.tsx`
- Modify: `oryn-website/src/components/seo/GoogleAnalytics.tsx`
- Modify: any PostHog initialization code

- [ ] **Step 1: Update CookieConsent to export consent state**

Create a cookie consent context or export a function that other components can check:

```typescript
// Add to CookieConsent or create a new context:
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("oryn_cookie_consent") === "accepted"
}
```

- [ ] **Step 2: Update GoogleAnalytics to respect consent**

Only load the GA script if consent is "accepted":

```typescript
// In GoogleAnalytics component:
const consent = hasAnalyticsConsent()
if (!consent) return null // Don't render GA script
```

- [ ] **Step 3: Update PostHog initialization to respect consent**

Only initialize PostHog if consent is "accepted". If consent changes, call `posthog.opt_out_capturing()` or `posthog.opt_in_capturing()`.

- [ ] **Step 4: Commit**

```bash
git add oryn-website/src/components/ui/CookieConsent.tsx oryn-website/src/components/seo/GoogleAnalytics.tsx
git commit -m "feat(frontend): make cookie consent actually control analytics loading (GDPR compliance)"
```

---

## Chunk 7: Cleanup & Deployment

### Task 18: Remove /tmp/oryn-db and All Related Code

**Files:**
- Delete: `oryn-website/src/lib/db.ts`
- Delete: `oryn-website/src/lib/auth.ts` (if not already deleted)
- Delete: `oryn-website/src/lib/referrals.ts`
- Delete: `oryn-website/src/app/api/auth/` (entire directory)
- Delete: `oryn-website/src/app/api/orders/route.ts` (if not already deleted)
- Delete: `oryn-website/src/app/api/referrals/` (entire directory)
- Delete: `oryn-website/src/app/api/promotions/` (entire directory, use Medusa native promotions)
- Delete: `oryn-website/src/app/api/payments/crypto/` (if crypto payments are deprecated)
- Delete: `oryn-website/src/app/api/admin/dashboard/route.ts` (replaced by Medusa admin)
- Delete: `oryn-website/src/app/api/admin/users/route.ts` (replaced by Medusa customers)
- Delete: `oryn-website/src/app/api/admin/orders/route.ts` (replaced by Medusa admin)
- Delete: `oryn-website/src/app/api/admin/promotions/route.ts` (replaced by Medusa admin)
- Delete: `oryn-website/src/app/api/admin/referrals/route.ts` (replaced by Medusa admin)
- Delete: `oryn-website/src/app/api/admin/commissions/route.ts` (replaced by Medusa admin)
- Delete: `oryn-website/src/app/api/admin/settings/route.ts`
- Delete: `oryn-website/src/app/api/admin/activity/route.ts`
- Delete: `oryn-website/src/app/api/admin/export/route.ts`
- Delete: `oryn-website/src/app/api/admin/products/route.ts` (use Medusa admin)
- Modify: `oryn-website/src/app/api/admin/medusa/route.ts` (keep this - it's the proxy)
- Keep: `oryn-website/src/app/api/stripe/` (Stripe routes still needed)

- [ ] **Step 1: Remove all files that depend on db.ts**

Search for all imports of `@/lib/db` and `@/lib/auth` and `@/lib/referrals` across the frontend codebase. Each file that imports these must be updated to use Medusa APIs instead or deleted if it's a route being replaced.

- [ ] **Step 2: Delete the files**

```bash
rm oryn-website/src/lib/db.ts
rm oryn-website/src/lib/auth.ts
rm oryn-website/src/lib/referrals.ts
rm -rf oryn-website/src/app/api/auth/
rm -rf oryn-website/src/app/api/orders/
rm -rf oryn-website/src/app/api/referrals/
rm -rf oryn-website/src/app/api/promotions/
rm -rf oryn-website/src/app/api/admin/dashboard/
rm -rf oryn-website/src/app/api/admin/users/
rm -rf oryn-website/src/app/api/admin/orders/
rm -rf oryn-website/src/app/api/admin/promotions/
rm -rf oryn-website/src/app/api/admin/referrals/
rm -rf oryn-website/src/app/api/admin/commissions/
rm -rf oryn-website/src/app/api/admin/settings/
rm -rf oryn-website/src/app/api/admin/activity/
rm -rf oryn-website/src/app/api/admin/export/
rm -rf oryn-website/src/app/api/admin/products/
```

- [ ] **Step 3: Update the frontend admin panel**

The frontend admin panel at `/admin` should be simplified. Since all management is now in Medusa admin, the frontend admin can either:
- Redirect to Medusa admin (`https://medusa.skyodoo.com/app`)
- Keep a lightweight dashboard that reads from `/api/admin/medusa` (already working)

- [ ] **Step 4: Verify no broken imports**

```bash
cd oryn-website
npx tsc --noEmit
# Fix any remaining import errors
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: remove /tmp/oryn-db and all custom backend logic, fully migrate to Medusa"
```

---

### Task 19: Update Medusa Backend CORS & Environment

**Files:**
- Modify: `medusa-backend/medusa-config.ts` (CORS settings)
- Modify: `medusa-backend/.env` (add new env vars)

- [ ] **Step 1: Update CORS to allow storefront domain**

In `medusa-config.ts`, ensure STORE_CORS includes the production domain:

```typescript
store_cors: process.env.STORE_CORS || "http://localhost:3000,https://oryn-psi.vercel.app",
auth_cors: process.env.AUTH_CORS || "http://localhost:3000,https://oryn-psi.vercel.app",
```

- [ ] **Step 2: Add new environment variables to server**

SSH to server and add to `.env`:

```bash
SENDGRID_API_KEY=SG.your_key_here
SENDGRID_FROM_EMAIL=info@orynlabs.com
ADMIN_NOTIFICATION_EMAIL=admin@oryn.com
STORE_CORS=http://localhost:3000,https://oryn-psi.vercel.app
AUTH_CORS=http://localhost:3000,https://oryn-psi.vercel.app
```

- [ ] **Step 3: Build and deploy Medusa backend**

```bash
# SSH to server
nvm use 20
cd /home/omegaserver02/oryn-peptides/medusa-backend
git pull
npm install
npm run build
npx medusa db:migrate
pm2 restart oryn-medusa
```

- [ ] **Step 4: Commit**

```bash
git add medusa-backend/medusa-config.ts medusa-backend/.env.template
git commit -m "chore: update CORS settings and env vars for production deployment"
```

---

### Task 20: End-to-End Verification

- [ ] **Step 1: Test contact form**
- Submit form on storefront → verify it appears in Medusa admin Contact Submissions page
- Verify admin receives email notification
- Verify customer receives auto-reply email

- [ ] **Step 2: Test newsletter**
- Subscribe via footer → verify in Medusa admin Newsletter page
- Subscribe via exit intent popup → verify source = "exit_intent"
- Try duplicate subscription → should show "already subscribed"

- [ ] **Step 3: Test user registration & auth**
- Register new customer → verify in Medusa admin Customers page
- Verify referral code generated
- Login → verify token works
- View profile → verify data from Medusa
- Test referral link registration (with `?ref=CODE`)

- [ ] **Step 4: Test wishlist**
- Add product to wishlist (authenticated) → verify persists across sessions
- Remove from wishlist → verify removed in Medusa

- [ ] **Step 5: Test orders**
- Complete a test purchase → verify order in Medusa admin
- Verify order confirmation email sent
- Verify order appears in customer's order history page
- If referral used, verify commissions generated in Medusa admin Referrals page

- [ ] **Step 6: Test cookie consent**
- Decline cookies → verify GA and PostHog do NOT load
- Accept cookies → verify analytics load normally

- [ ] **Step 7: Build verification**

```bash
cd oryn-website
npm run build
# Verify no build errors
```

---

## Dependency Graph

```
Task 1-4 (Modules)     → can run in parallel
     ↓
Task 5 (Validators)    → depends on modules existing
     ↓
Task 6-7 (API Routes)  → depends on validators
     ↓
Task 8 (Subscribers)   → depends on modules + API routes
Task 9-11 (Admin UI)   → depends on admin API routes
     ↓
Task 12-17 (Frontend)  → depends on all backend tasks
     ↓
Task 18 (Cleanup)      → depends on all frontend migration
     ↓
Task 19 (Deploy)       → depends on cleanup
     ↓
Task 20 (Verification) → last
```

## Risk Notes

1. **Medusa customer auth** is the most complex migration. The current system uses custom JWT tokens; Medusa uses its own auth system. Test thoroughly.
2. **Database migrations** on production server require `nvm use 20` first (server defaults to Node 12).
3. **SendGrid** requires domain verification and API key. If not available, subscribers can log to console as a temporary measure.
4. **CORS** must be configured correctly or store API calls will fail from the production domain.
5. **Stripe webhook** route in the frontend (`/api/stripe/webhook`) should remain — it processes Stripe payment events. Consider eventually moving this to a Medusa subscriber too.
