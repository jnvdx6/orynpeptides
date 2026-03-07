# ORYN Peptide Labs - Production Setup Guide

## Architecture

```
oryn-website/          -> Next.js 16 Storefront (port 3000)
medusa-backend/        -> Medusa v2 Backend (port 9000)
                          - PostgreSQL database
                          - Redis for events
                          - Stripe Payment Provider
```

## Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- Stripe account with API keys

## 1. Setup PostgreSQL

```bash
# macOS (Homebrew)
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb oryn_medusa
```

## 2. Setup Redis

```bash
# macOS (Homebrew)
brew install redis
brew services start redis
```

## 3. Setup Medusa Backend

```bash
cd medusa-backend

# Copy environment template
cp .env.template .env

# Edit .env with your real values:
# - DATABASE_URL (your PostgreSQL connection)
# - STRIPE_API_KEY (from Stripe Dashboard > Developers > API Keys)
# - STRIPE_WEBHOOK_SECRET (from Stripe Dashboard > Webhooks)

# Install dependencies
npm install

# Run database migrations
npm run db:migrate

# Seed products, regions, and collections
npm run seed

# Create admin user
npx medusa user -e admin@oryn.com -p YourSecurePassword123

# Start the backend
npm run dev
```

The Medusa backend will be available at http://localhost:9000
The Medusa Admin dashboard will be at http://localhost:9000/app

## 4. Configure Medusa Admin (via Dashboard)

After starting the backend, open http://localhost:9000/app and:

1. **API Keys**: Go to Settings > API Key Management
   - Create a publishable API key
   - Copy the key value

2. **Payment Providers**: Go to Settings > Regions
   - For each region (Europe, UK, US):
     - Click Edit
     - Enable "Stripe" as payment provider
     - Save

3. **Shipping Options**: Go to Settings > Shipping
   - Create "Standard Research Shipping" (EUR 15.00)
   - Create "Priority Lab Delivery" (EUR 35.00)
   - Assign to the Europe/UK/US regions

4. **Sales Channels**: Verify the "ORYN Online Store" sales channel exists

## 5. Setup Storefront

```bash
cd oryn-website

# Edit .env.local with your values:
# NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_xxxxxxx  (from step 4.1)
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx  (from Stripe Dashboard)
# STRIPE_SECRET_KEY=sk_live_xxx
# STRIPE_WEBHOOK_SECRET=whsec_xxx

# Install dependencies
npm install

# Start development server
npm run dev
```

## 6. Setup Stripe Webhook

For production, configure a Stripe webhook endpoint:

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.succeeded`
   - `charge.refunded`
4. Copy the webhook signing secret to your `.env.local`

For local development, use Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Checkout Flow (How It Works)

### With Medusa (Production):
1. Customer adds products to cart -> Medusa creates server-side cart
2. Customer fills shipping info -> Medusa updates cart with address
3. Customer proceeds to payment -> Medusa initializes Stripe payment session
4. Customer enters card in Stripe Elements -> PCI-compliant, card data never touches your server
5. Stripe confirms payment -> Medusa completes cart and creates order
6. Webhook receives confirmation -> commissions generated, order status updated

### Crypto Payments:
1. Customer selects crypto and currency
2. System displays wallet address from admin settings
3. Customer sends payment and provides TX hash
4. Order created with "pending" status
5. Admin manually verifies and confirms payment

## Key Differences from Previous Setup

| Before (Mock) | After (Production) |
|---|---|
| JSON files in /tmp/ | PostgreSQL database |
| Fake card inputs | Stripe Elements (PCI compliant) |
| No real payment processing | Real Stripe PaymentIntents |
| Products hardcoded | Products managed via Medusa Admin |
| Client-side cart only | Server-side cart (Medusa) |
| Webhook with TODO comments | Full webhook handling |
| Hardcoded crypto wallets | Admin-configurable wallets |
