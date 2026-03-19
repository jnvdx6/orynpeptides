import { track } from "@vercel/analytics";
import posthog from "posthog-js";
import { markets, regions, type Locale, isValidLocale } from "@/i18n/config";

// ─── Helpers ──────────────────────────────────────────────────
function ph(event: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    posthog.capture(event, properties);
  }
}

/** Extract UTM params + referrer from current URL */
export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  if (document.referrer && !document.referrer.includes(window.location.hostname)) {
    utm.referrer = document.referrer;
    try {
      utm.referrer_domain = new URL(document.referrer).hostname;
    } catch { /* ignore */ }
  }
  return utm;
}

/** Get device type from viewport */
function getDeviceType(): string {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

/** Get geo context from URL locale for event enrichment */
function getGeoContext(): { locale: string; country: string; currency: string; market_region: string } {
  if (typeof window === "undefined") return { locale: "en", country: "GB", currency: "GBP", market_region: "UK" };
  const pathLocale = window.location.pathname.split("/")[1] || "en";
  const countryMap: Record<string, string> = { en: "GB", es: "ES", de: "DE", fr: "FR", it: "IT", pt: "PT", "pt-br": "BR", nl: "NL", pl: "PL" };
  const marketMap: Record<string, string> = { en: "UK", es: "EU", de: "EU", fr: "EU", it: "EU", pt: "EU", "pt-br": "LATAM", nl: "EU", pl: "EU" };

  // Derive currency from config rather than hardcoding
  let currency = "EUR";
  if (isValidLocale(pathLocale)) {
    const market = markets[pathLocale as Locale];
    const region = regions[market.defaultRegion];
    currency = region.currencyCode.toUpperCase();
  }

  return {
    locale: pathLocale,
    country: countryMap[pathLocale] || "GB",
    currency,
    market_region: marketMap[pathLocale] || "Other",
  };
}

/** Update PostHog geo properties when real country is known (e.g. from shipping address) */
export function updateGeoFromShipping(countryCode: string) {
  if (typeof window === "undefined") return;
  const marketMap: Record<string, string> = {
    GB: "UK", ES: "EU", DE: "EU", FR: "EU", IT: "EU", PT: "EU", NL: "EU",
    BE: "EU", AT: "EU", IE: "EU", SE: "EU", DK: "EU", FI: "EU", CY: "EU",
    GR: "EU", PL: "EU", CZ: "EU", HU: "EU", RO: "EU", BG: "EU", HR: "EU",
    US: "US", BR: "LATAM", MX: "LATAM", CO: "LATAM", AR: "LATAM", CL: "LATAM", PE: "LATAM",
  };
  const market = marketMap[countryCode] || "Other";
  posthog.register({ country: countryCode, market_region: market });
  posthog.setPersonProperties({ country: countryCode, market_region: market });
}

// ─── Page & Navigation Events ─────────────────────────────────

export function trackPageView(pageName: string, properties?: Record<string, unknown>) {
  const base = {
    page_name: pageName,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
    device_type: getDeviceType(),
    ...getUtmParams(),
    ...properties,
  };
  track("page_viewed", { page_name: pageName, ...properties });
  ph("page_viewed", base);
}

export function trackScrollDepth(pageName: string, depth: number) {
  ph("scroll_depth", { page_name: pageName, depth_percent: depth });
}

export function trackEngagementTime(pageName: string, seconds: number) {
  ph("engagement_time", { page_name: pageName, duration_seconds: seconds });
}

// ─── E-commerce Events ────────────────────────────────────────

export function trackAddToCart(product: {
  name: string;
  slug: string;
  price: number;
  category?: string;
  quantity?: number;
}) {
  const geo = getGeoContext();
  const props = {
    product_name: product.name,
    product_slug: product.slug,
    price: product.price,
    quantity: product.quantity || 1,
    category: product.category || "unknown",
    currency: geo.currency,
    country: geo.country,
    market_region: geo.market_region,
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

export function trackQuantityChanged(product: {
  name: string;
  slug: string;
  price: number;
  oldQuantity: number;
  newQuantity: number;
}) {
  ph("cart_quantity_changed", {
    product_name: product.name,
    product_slug: product.slug,
    price: product.price,
    old_quantity: product.oldQuantity,
    new_quantity: product.newQuantity,
    direction: product.newQuantity > product.oldQuantity ? "increase" : "decrease",
  });
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

  const geo = getGeoContext();
  ph("purchase", {
    ...vercelProps,
    revenue: data.total,
    items: data.items || [],
    country: data.shippingCountry || geo.country,
    market_region: geo.market_region,
    $set: {
      last_purchase_date: new Date().toISOString(),
      last_order_value: data.total,
      preferred_currency: data.currency,
      shipping_country: data.shippingCountry || geo.country,
      country: data.shippingCountry || geo.country,
    },
    $set_once: {
      first_purchase_date: new Date().toISOString(),
      first_purchase_country: data.shippingCountry || geo.country,
    },
  });
}

export function trackProductView(product: {
  name: string;
  slug: string;
  price: number;
  category?: string;
}) {
  const geo = getGeoContext();
  const props = {
    product_name: product.name,
    product_slug: product.slug,
    price: product.price,
    category: product.category || "unknown",
    country: geo.country,
    currency: geo.currency,
    market_region: geo.market_region,
  };
  track("product_viewed", props);
  ph("product_viewed", {
    ...props,
    $set: { last_viewed_product: product.slug },
  });
}

export function trackProductListViewed(listName: string, products: Array<{ name: string; slug: string }>) {
  ph("product_list_viewed", {
    list_name: listName,
    product_count: products.length,
    products: products.map((p) => p.slug),
  });
}

// ─── Cart Events ────────────────────────────────────────────

export function trackCartOpened() {
  track("cart_opened");
  ph("cart_opened");
}

export function trackCartViewed(data: { itemCount: number; total: number }) {
  ph("cart_viewed", {
    item_count: data.itemCount,
    cart_total: data.total,
  });
}

export function trackOrderBumpClicked(product: { name: string; slug: string; price: number }) {
  ph("order_bump_clicked", {
    product_name: product.name,
    product_slug: product.slug,
    price: product.price,
  });
}

// ─── Promo & Engagement Events ───────────────────────────────

export function trackPromoApplied(code: string, discountType: string, discountValue: number) {
  const props = { code, discount_type: discountType, discount_value: discountValue };
  track("promo_applied", props);
  ph("promo_applied", props);
}

export function trackCampaignPromoCopied(code: string, campaignSlug: string) {
  const props = { code, campaign_slug: campaignSlug };
  track("campaign_promo_copied", props);
  ph("campaign_promo_copied", props);
}

export function trackCampaignPageViewed(slug: string, name: string) {
  const props = { campaign_slug: slug, campaign_name: name };
  track("campaign_page_viewed", props);
  ph("campaign_page_viewed", props);
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

export function trackSocialClick(platform: string, location: string) {
  ph("social_click", { platform, location });
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
  const geo = getGeoContext();
  ph("checkout_started", {
    item_count: data.itemCount,
    total: data.total,
    currency: data.currency,
    country: geo.country,
    market_region: geo.market_region,
  });
}

export function trackPaymentInfoEntered(paymentMethod: string) {
  ph("payment_info_entered", { payment_method: paymentMethod });
}

export function trackCheckoutAbandoned(step: string, total: number) {
  ph("checkout_abandoned", { last_step: step, cart_total: total });
}

// ─── Content & Page Events ──────────────────────────────────

export function trackExitIntentShown() {
  ph("exit_intent_popup_shown");
}

export function trackExitIntentConverted(action: string) {
  ph("exit_intent_popup_converted", { action });
}

export function trackPopupShown(popupType: string) {
  ph("popup_shown", { popup_type: popupType });
}

export function trackPopupInteracted(popupType: string, action: string) {
  ph("popup_interacted", { popup_type: popupType, action });
}

export function trackBlogRead(slug: string, title: string, category?: string) {
  const props = { slug, title, category: category || "unknown" };
  track("blog_article_read", props);
  ph("blog_article_read", {
    ...props,
    $set: { last_article_read: slug },
  });
}

export function trackCategoryBrowsed(category: string, source: string) {
  const props = { category, source };
  track("category_browsed", props);
  ph("category_browsed", props);
}

export function trackGeoPageViewed(data: {
  type: "country" | "city" | "region" | "county" | "area";
  location: string;
  country?: string;
}) {
  ph("geo_page_viewed", {
    geo_type: data.type,
    location: data.location,
    country: data.country || "uk",
  });
}

export function trackEncyclopediaRead(slug: string, peptideName: string) {
  ph("encyclopedia_read", {
    slug,
    peptide_name: peptideName,
    $set: { last_encyclopedia_read: slug },
  });
}

export function trackComparisonViewed(items: string[]) {
  ph("comparison_viewed", {
    items,
    item_count: items.length,
  });
}

export function trackFAQExpanded(question: string, pageName: string) {
  ph("faq_expanded", { question, page_name: pageName });
}

export function trackFormSubmitted(formName: string, properties?: Record<string, unknown>) {
  const props = { form_name: formName, ...properties };
  track("form_submitted", props);
  ph("form_submitted", props);
}

export function trackToolUsed(toolName: string, properties?: Record<string, unknown>) {
  const props = { tool_name: toolName, ...properties };
  track("tool_used", props);
  ph("tool_used", props);
}

export function trackInternalLinkClick(linkName: string, destination: string, section: string) {
  ph("internal_link_click", {
    link_name: linkName,
    destination,
    section,
  });
}

export function trackErrorOccurred(errorType: string, message: string, pageName?: string) {
  ph("error_occurred", {
    error_type: errorType,
    error_message: message,
    page_name: pageName || (typeof window !== "undefined" ? window.location.pathname : ""),
  });
}
