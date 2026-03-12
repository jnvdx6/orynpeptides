import { track } from "@vercel/analytics";
import posthog from "posthog-js";

// ─── Helpers ──────────────────────────────────────────────────
function ph(event: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    posthog.capture(event, properties);
  }
}

// ─── E-commerce Events ────────────────────────────────────────

export function trackAddToCart(product: {
  name: string;
  slug: string;
  price: number;
  category?: string;
}) {
  const props = {
    product_name: product.name,
    product_slug: product.slug,
    price: product.price,
    category: product.category || "unknown",
    currency: "EUR",
  };
  track("add_to_cart", props);
  ph("add_to_cart", {
    ...props,
    $set: { last_cart_activity: new Date().toISOString() },
  });
}

export function trackRemoveFromCart(product: {
  name: string;
  slug: string;
  price: number;
}) {
  const props = {
    product_name: product.name,
    product_slug: product.slug,
    price: product.price,
  };
  track("remove_from_cart", props);
  ph("remove_from_cart", props);
}

export function trackCheckoutStep(
  step: "information" | "shipping" | "payment",
  extras?: Record<string, string | number | boolean>
) {
  const props = { step, ...extras };
  track("checkout_step", props);
  ph("checkout_step_completed", {
    ...props,
    checkout_step: step,
    checkout_step_number: step === "information" ? 1 : step === "shipping" ? 2 : 3,
  });
}

export function trackPurchase(data: {
  orderId: string;
  orderRef: string;
  total: number;
  itemCount: number;
  currency: string;
  promoCode?: string;
  shippingCountry?: string;
  items?: Array<{ name: string; slug: string; price: number; quantity: number }>;
}) {
  const vercelProps = {
    order_id: data.orderId,
    order_ref: data.orderRef,
    total: data.total,
    item_count: data.itemCount,
    currency: data.currency,
    promo_code: data.promoCode || "none",
    shipping_country: data.shippingCountry || "unknown",
  };
  track("purchase", vercelProps);

  // PostHog: rich purchase event with revenue tracking
  ph("purchase", {
    ...vercelProps,
    // PostHog revenue tracking
    revenue: data.total,
    items: data.items || [],
    $set: {
      last_purchase_date: new Date().toISOString(),
      last_order_value: data.total,
      preferred_currency: data.currency,
      shipping_country: data.shippingCountry,
    },
    $set_once: {
      first_purchase_date: new Date().toISOString(),
    },
  });
}

export function trackProductView(product: {
  name: string;
  slug: string;
  price: number;
  category?: string;
}) {
  const props = {
    product_name: product.name,
    product_slug: product.slug,
    price: product.price,
    category: product.category || "unknown",
  };
  track("product_viewed", props);
  ph("product_viewed", {
    ...props,
    $set: { last_viewed_product: product.slug },
  });
}

// ─── Promo & Engagement Events ───────────────────────────────

export function trackPromoApplied(code: string, discountType: string, discountValue: number) {
  const props = { code, discount_type: discountType, discount_value: discountValue };
  track("promo_applied", props);
  ph("promo_applied", props);
}

export function trackNewsletterSignup(source: string) {
  track("newsletter_signup", { source });
  ph("newsletter_signup", {
    source,
    $set: { newsletter_subscriber: true, newsletter_signup_date: new Date().toISOString() },
  });
}

export function trackSearch(query: string, resultCount: number) {
  track("search", { query, result_count: resultCount });
  ph("search", { query, result_count: resultCount });
}

export function trackCartOpened() {
  track("cart_opened");
  ph("cart_opened");
}

export function trackWishlistAdd(productSlug: string) {
  track("wishlist_add", { product_slug: productSlug });
  ph("wishlist_add", { product_slug: productSlug });
}

export function trackWishlistRemove(productSlug: string) {
  track("wishlist_remove", { product_slug: productSlug });
  ph("wishlist_remove", { product_slug: productSlug });
}

export function trackCTAClick(ctaName: string, location: string) {
  track("cta_click", { cta_name: ctaName, location });
  ph("cta_click", { cta_name: ctaName, location });
}

// ─── Auth & Identity Events ──────────────────────────────────

export function identifyUser(user: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  referralCode?: string;
}) {
  if (typeof window === "undefined") return;
  posthog.identify(user.id, {
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName,
    name: `${user.firstName} ${user.lastName}`,
    role: user.role || "customer",
    referral_code: user.referralCode || "",
  });
}

export function trackLogin(method: string) {
  ph("user_logged_in", { method });
}

export function trackSignup(method: string, referralCode?: string) {
  ph("user_signed_up", {
    method,
    referral_code: referralCode || "none",
    $set_once: { signup_date: new Date().toISOString() },
  });
}

export function trackLogout() {
  ph("user_logged_out");
  if (typeof window !== "undefined") {
    posthog.reset();
  }
}

// ─── Checkout Funnel Events ──────────────────────────────────

export function trackCheckoutStarted(data: {
  itemCount: number;
  total: number;
  currency: string;
}) {
  ph("checkout_started", {
    item_count: data.itemCount,
    total: data.total,
    currency: data.currency,
  });
}

export function trackPaymentInfoEntered(paymentMethod: string) {
  ph("payment_info_entered", { payment_method: paymentMethod });
}

export function trackCheckoutAbandoned(step: string, total: number) {
  ph("checkout_abandoned", { last_step: step, cart_total: total });
}

// ─── Page & Content Events ───────────────────────────────────

export function trackExitIntentShown() {
  ph("exit_intent_popup_shown");
}

export function trackExitIntentConverted(action: string) {
  ph("exit_intent_popup_converted", { action });
}

export function trackBlogRead(slug: string, title: string) {
  ph("blog_article_read", { slug, title });
}

export function trackToolUsed(toolName: string) {
  ph("tool_used", { tool_name: toolName });
}
