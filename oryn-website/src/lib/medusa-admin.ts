// Server-side Medusa admin API client
// Used by API routes to fetch data from Medusa backend

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
const ADMIN_EMAIL = "admin@oryn.com";
const ADMIN_PASSWORD = "OrynAdmin2026";

let cachedToken: string | null = null;
let tokenExpiry = 0;

async function getAdminToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const res = await fetch(`${MEDUSA_URL}/auth/user/emailpass`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });

  if (!res.ok) {
    throw new Error(`Medusa admin auth failed: ${res.status}`);
  }

  const data = await res.json();
  cachedToken = data.token;
  tokenExpiry = Date.now() + 3500 * 1000; // ~58 minutes
  return cachedToken!;
}

export async function medusaAdminGet<T = unknown>(path: string, params?: Record<string, string | number>): Promise<T> {
  const token = await getAdminToken();
  const url = new URL(`${MEDUSA_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Medusa admin GET ${path} failed: ${res.status} - ${text.substring(0, 200)}`);
  }

  return res.json();
}

// Fetch orders from Medusa
export async function getMedusaOrders(limit = 50, offset = 0) {
  return medusaAdminGet<{
    orders: Array<{
      id: string;
      display_id: number;
      status: string;
      email: string;
      total: number;
      subtotal: number;
      tax_total: number;
      shipping_total: number;
      currency_code: string;
      items: Array<{
        id: string;
        title: string;
        quantity: number;
        unit_price: number;
        total: number;
      }>;
      shipping_address?: {
        first_name: string;
        last_name: string;
        address_1: string;
        city: string;
        postal_code: string;
        country_code: string;
      };
      created_at: string;
      updated_at: string;
    }>;
    count: number;
  }>("/admin/orders", { limit, offset, order: "-created_at" });
}

// Fetch customers from Medusa
export async function getMedusaCustomers(limit = 50, offset = 0) {
  return medusaAdminGet<{
    customers: Array<{
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      phone?: string;
      has_account: boolean;
      created_at: string;
    }>;
    count: number;
  }>("/admin/customers", { limit, offset });
}

// Fetch products from Medusa
export async function getMedusaProducts(limit = 50) {
  return medusaAdminGet<{
    products: Array<{
      id: string;
      title: string;
      handle: string;
      status: string;
      variants: Array<{
        id: string;
        title: string;
        prices: Array<{
          amount: number;
          currency_code: string;
        }>;
      }>;
      created_at: string;
    }>;
    count: number;
  }>("/admin/products", { limit });
}

// Fetch payment collections (represents checkout sessions)
export async function getMedusaPayments(limit = 50) {
  return medusaAdminGet<{
    payments: Array<{
      id: string;
      amount: number;
      currency_code: string;
      provider_id: string;
      created_at: string;
    }>;
    count: number;
  }>("/admin/payments", { limit });
}

// Fetch regions
export async function getMedusaRegions() {
  return medusaAdminGet<{
    regions: Array<{
      id: string;
      name: string;
      currency_code: string;
    }>;
  }>("/admin/regions");
}

// Store analytics data (since Medusa doesn't track page views)
export interface AnalyticsEvent {
  type: "page_view" | "add_to_cart" | "checkout_started" | "payment_completed";
  page?: string;
  productId?: string;
  cartId?: string;
  amount?: number;
  timestamp: string;
  userAgent?: string;
  country?: string;
}
