"use client";

import { useCart } from "@/lib/cart-context";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import StripeCheckout from "@/components/checkout/StripeCheckout";
import { OrderBump } from "@/components/checkout/OrderBump";
import { VolumeDiscountBanner } from "@/components/ui/VolumeDiscountBanner";
import { getFreeShippingThreshold } from "@/lib/discounts";
import { useSavedAddresses } from "@/components/account/SavedAddresses";
import { useAuth } from "@/providers/auth";
import { sdk } from "@/lib/medusa";
import { productImages } from "@/data/products";
import { trackCheckoutStep, trackCheckoutStarted, trackPurchase, trackPromoApplied, trackPaymentInfoEntered } from "@/lib/analytics";
import { usePageTracking } from "@/hooks/usePageTracking";
import { getCapturedPromoCode, clearCapturedPromoCode } from "@/hooks/usePromoCapture";

type CheckoutStep = "information" | "shipping" | "payment";

interface ShippingOption {
  id: string;
  name: string;
  amount: number;
  is_tax_inclusive?: boolean;
  region_id?: string;
}

const COUNTRY_CODES = [
  "es", "gb", "us", "de", "fr", "it", "pt", "nl", "be", "at",
  "ie", "se", "dk", "fi", "no", "pl", "cz", "gr", "ch", "ro",
  "hu", "bg", "hr", "sk", "si", "lt", "lv", "ee", "cy", "lu", "mt",
] as const;

function getCountryName(code: string, locale: string): string {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "region" });
    return displayNames.of(code.toUpperCase()) || code.toUpperCase();
  } catch {
    return code.toUpperCase();
  }
}

/** Parse "X-Y business days" from a shipping option name and return estimated delivery range string */
function getEstimatedDelivery(optionName: string): string | null {
  const match = optionName.match(/(\d+)\s*-\s*(\d+)\s*business\s*days/i)
    || optionName.match(/(\d+)\s*-\s*(\d+)\s*días\s*hábiles/i);
  if (!match) return null;
  const minDays = parseInt(match[1], 10);
  const maxDays = parseInt(match[2], 10);

  function addBusinessDays(start: Date, days: number): Date {
    const result = new Date(start);
    let added = 0;
    while (added < days) {
      result.setDate(result.getDate() + 1);
      const dow = result.getDay();
      if (dow !== 0 && dow !== 6) added++;
    }
    return result;
  }

  const today = new Date();
  const earliest = addBusinessDays(today, minDays);
  const latest = addBusinessDays(today, maxDays);

  const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  if (earliest.getMonth() === latest.getMonth()) {
    return `Est. ${fmt(earliest).replace(/\d+/, "")}${earliest.getDate()}\u2013${latest.getDate()}`;
  }
  return `Est. ${fmt(earliest)}\u2013${fmt(latest)}`;
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Spinner({ size = 16 }: { size?: number }) {
  return (
    <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export default function CheckoutPage() {
  const {
    items,
    totalPrice,
    totalItems,
    clearCart,
    appliedPromotion,
    applyPromotion,
    removePromotion,
    discountedPrice,
    volumeDiscount,
    finalPrice,
    cart,
    medusaConnected,
    setCartEmail,
    setCartAddress,
    addShippingMethod,
    initPaymentSession,
    refreshCart,
    loading: cartLoading,
    cartLoaded,
  } = useCart();

  const { t, formatPrice, locale, currencyCode } = useLocale();
  const router = useRouter();
  const { user } = useAuth();
  usePageTracking("checkout");

  // Redirect to products if cart is empty
  useEffect(() => {
    if (cartLoaded && (!items || items.length === 0)) {
      router.push(`/${locale}/products`);
    }
  }, [cartLoaded, items, locale, router]);
  // Steps
  const [activeStep, setActiveStep] = useState<CheckoutStep>("information");
  const [completedSteps, setCompletedSteps] = useState<Set<CheckoutStep>>(new Set());

  // Form data
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  // Shipping
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState("");
  const [shippingLoading, setShippingLoading] = useState(false);

  // Promo
  const [promoCode, setPromoCode] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState("");

  // Referral — pre-fill from URL capture
  const [referralCode, setReferralCode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("oryn_ref_code") || "";
    }
    return "";
  });

  // Auto-apply promo code from URL params (?promo=CODE)
  const searchParams = useSearchParams();
  const [autoPromoMessage, setAutoPromoMessage] = useState("");
  const autoPromoAttempted = useRef(false);

  useEffect(() => {
    if (autoPromoAttempted.current) return;
    if (!cartLoaded || items.length === 0) return;
    if (appliedPromotion) return; // Already has a promo applied

    // Check URL param first, then localStorage
    const promoParam = searchParams.get("promo") || getCapturedPromoCode();
    if (!promoParam) return;

    autoPromoAttempted.current = true;
    const code = promoParam.trim().toUpperCase();
    clearCapturedPromoCode();

    handleApplyPromoFromUrl(code);
  }, [searchParams, cartLoaded, items.length, appliedPromotion]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleApplyPromoFromUrl = async (code: string) => {
    setPromoLoading(true);
    setPromoError("");

    try {
      if (medusaConnected && cart) {
        try {
          await sdk.store.cart.update(cart.id, { promo_codes: [code] });
          await refreshCart();
          const discountTotal = (cart.discount_total as number) || 0;
          if (discountTotal > 0) {
            applyPromotion({
              code,
              label: code,
              discountAmount: discountTotal,
              discountType: "fixed",
              discountValue: discountTotal,
            });
            trackPromoApplied(code, "fixed", discountTotal);
            setAutoPromoMessage(code);
            setPromoLoading(false);
            return;
          }
        } catch {
          // Fall through to local validation
        }
      }

      const res = await fetch("/api/promotions/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, subtotal: totalPrice, productIds: items.map((i) => i.product.id) }),
      });
      const data = await res.json();
      if (data.valid) {
        applyPromotion({
          code: data.promotion.code,
          label: data.promotion.label,
          discountAmount: data.discountAmount,
          discountType: data.promotion.discountType,
          discountValue: data.promotion.discountValue,
        });
        trackPromoApplied(code, data.promotion.discountType, data.discountAmount);
        setAutoPromoMessage(code);
      }
    } catch {
      // Silent fail for auto-apply
    }
    setPromoLoading(false);
  };

  // Pre-fill email for logged-in users
  useEffect(() => {
    if (user?.email && !email) {
      setEmail(user.email);
    }
  }, [user?.email]); // eslint-disable-line react-hooks/exhaustive-deps

  // Saved addresses
  const { addresses: savedAddresses, getDefault: getDefaultAddress } = useSavedAddresses();

  // State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);

  // Mobile summary toggle
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  // Currency-aware free shipping threshold
  const freeShippingThreshold = getFreeShippingThreshold(currencyCode);

  // Shipping cost from selected option (free if subtotal >= threshold)
  const shippingCost = useMemo(() => {
    if (!selectedShipping) return 0;
    const option = shippingOptions.find((o) => o.id === selectedShipping);
    const rawCost = option ? option.amount : 0;
    // Free shipping for orders over threshold
    if (totalPrice >= freeShippingThreshold) return 0;
    return rawCost;
  }, [selectedShipping, shippingOptions, totalPrice, freeShippingThreshold]);

  const qualifiesForFreeShipping = totalPrice >= freeShippingThreshold;
  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - totalPrice);

  const finalTotal = finalPrice + shippingCost;

  // Step labels
  const stepLabels = t.checkoutPage.steps;

  const stepKeys: CheckoutStep[] = ["information", "shipping", "payment"];

  // Track checkout start
  useEffect(() => {
    if (items.length > 0) {
      trackCheckoutStarted({ itemCount: totalItems, total: totalPrice, currency: currencyCode.toUpperCase() });
      trackCheckoutStep("information", { item_count: totalItems, total: totalPrice });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Validate information step
  const validateInformation = (): boolean => {
    const errs: Record<string, string> = {};
    const req = t.checkoutPage.required;
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = t.checkoutPage.validEmailRequired;
    if (!firstName.trim()) errs.firstName = req;
    if (!lastName.trim()) errs.lastName = req;
    if (!address.trim()) errs.address = req;
    if (!city.trim()) errs.city = req;
    if (!postalCode.trim()) errs.postalCode = req;
    if (!country) errs.country = req;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Fetch shipping options from Medusa
  const fetchShippingOptions = useCallback(async () => {
    if (!cart || !medusaConnected) {
      // Fallback: free shipping
      setShippingOptions([{
        id: "free_shipping",
        name: t.checkoutPage.freeStandardShipping,
        amount: 0,
      }]);
      setSelectedShipping("free_shipping");
      return;
    }

    setShippingLoading(true);
    try {
      // Try Medusa SDK for shipping options
      const response = await sdk.store.fulfillment.listCartOptions({ cart_id: cart.id });
      const options = (response as unknown as { shipping_options: Array<{ id: string; name: string; amount: number; is_tax_inclusive?: boolean; region_id?: string }> }).shipping_options;

      if (options && options.length > 0) {
        const mappedOptions = options.map((o) => ({
          id: o.id,
          name: o.name,
          amount: o.amount || 0,
          is_tax_inclusive: o.is_tax_inclusive,
          region_id: o.region_id,
        }));
        setShippingOptions(mappedOptions);
        // Pre-select the cheapest option that matches the cart's region
        const regionFiltered = mappedOptions.filter(
          (opt) => !opt.region_id || opt.region_id === cart?.region_id
        );
        const pool = regionFiltered.length > 0 ? regionFiltered : mappedOptions;
        const cheapest = [...pool].sort((a, b) => a.amount - b.amount)[0];
        setSelectedShipping(cheapest.id);
      } else {
        setShippingOptions([{
          id: "free_shipping",
          name: t.checkoutPage.freeStandardShipping,
          amount: 0,
        }]);
        setSelectedShipping("free_shipping");
      }
    } catch (err) {
      void err;
      setShippingOptions([{
        id: "free_shipping",
        name: t.checkoutPage.freeStandardShipping,
        amount: 0,
      }]);
      setSelectedShipping("free_shipping");
    } finally {
      setShippingLoading(false);
    }
  }, [cart, medusaConnected, t.checkoutPage.freeStandardShipping]);

  // Handle continue from Information step
  const handleContinueToShipping = async () => {
    if (!validateInformation()) return;
    setIsSubmitting(true);

    try {
      if (medusaConnected) {
        const cartEmail = user?.email || email;
        await setCartEmail(cartEmail);
        // Ensure email state is in sync
        if (user?.email && !email) setEmail(user.email);
        await setCartAddress({
          firstName,
          lastName,
          address: address + (apartment ? `, ${apartment}` : ""),
          city,
          postalCode,
          country,
          phone,
        });
        // Refresh cart to get updated data
        await refreshCart();
      }

      setCompletedSteps((prev) => new Set([...prev, "information"]));
      setActiveStep("shipping");
      trackCheckoutStep("shipping", { item_count: totalItems, total: totalPrice });
      await fetchShippingOptions();
    } catch (err) {
      void err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle continue from Shipping step
  const handleContinueToPayment = async () => {
    if (!selectedShipping) return;
    setIsSubmitting(true);

    try {
      if (medusaConnected && cart && selectedShipping !== "free_shipping") {
        await addShippingMethod(selectedShipping);
      }

      // Initialize payment session (this already retrieves and updates cart state)
      if (medusaConnected) {
        await initPaymentSession("pp_stripe_stripe");
      }

      setCompletedSteps((prev) => new Set([...prev, "shipping"]));
      setActiveStep("payment");
      trackCheckoutStep("payment", { item_count: totalItems, total: finalPrice, shipping_cost: shippingCost });
      trackPaymentInfoEntered("stripe");
    } catch (err) {
      void err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle promo code - try Medusa first, then fall back to local system
  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    setPromoError("");

    const code = promoCode.trim().toUpperCase();

    try {
      // Try Medusa native promotions first
      if (medusaConnected && cart) {
        try {
          await sdk.store.cart.update(cart.id, {
            promo_codes: [code],
          });
          // Refresh cart to get updated totals from Medusa
          await refreshCart();
          // Check the refreshed cart for discount
          const discountTotal = (cart.discount_total as number) || 0;
          if (discountTotal > 0) {
            applyPromotion({
              code,
              label: code,
              discountAmount: discountTotal,
              discountType: "fixed",
              discountValue: discountTotal,
            });
            trackPromoApplied(code, "fixed", discountTotal);
            setPromoCode("");
            return;
          }
        } catch (err) {
          void err;
          // Fall through to local validation
        }
      }

      // Fallback: try local promotion system
      const res = await fetch("/api/promotions/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          subtotal: totalPrice,
          productIds: items.map((i) => i.product.id),
        }),
      });
      const data = await res.json();
      if (data.valid && data.promotion) {
        applyPromotion({
          code: data.promotion.code,
          label: data.promotion.label,
          discountAmount: data.discountAmount,
          discountType: data.promotion.discountType,
          discountValue: data.promotion.discountValue,
        });
        trackPromoApplied(data.promotion.code, data.promotion.discountType, data.promotion.discountValue);
        setPromoCode("");
      } else {
        setPromoError(data.error || t.checkoutPage.invalidCode);
      }
    } catch {
      setPromoError(t.checkoutPage.failedToValidate);
    } finally {
      setPromoLoading(false);
    }
  };

  // Handle payment success
  const handlePaymentSuccess = (orderId: string, ref: string) => {
    setOrderRef(ref);
    trackPurchase({
      orderId,
      orderRef: ref,
      total: cart?.total != null ? cart.total : finalTotal,
      itemCount: totalItems,
      currency: currencyCode.toUpperCase(),
      promoCode: appliedPromotion?.code,
      shippingCountry: country,
      items: items.map((i) => ({
        name: i.product.name,
        slug: i.product.slug,
        price: i.product.price,
        quantity: i.quantity,
      })),
    });
    // Record order with referral if applicable
    if (referralCode) {
      fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product.id,
            productName: i.product.name,
            quantity: i.quantity,
            price: i.product.price,
          })),
          shipping: { firstName, lastName, email, phone, address, city, postalCode, country },
          paymentMethod: "card",
          referralCode,
          promoCode: appliedPromotion?.code || undefined,
          medusaOrderId: orderId,
        }),
      }).catch(() => {});
    }
    clearCart();
    setOrderComplete(true);
  };

  const handlePaymentError = (_message: string) => {
    // Payment errors are shown in the Stripe UI
  };

  // Edit a completed step
  const editStep = (step: CheckoutStep) => {
    setActiveStep(step);
    // Remove this step and all subsequent steps from completed
    const idx = stepKeys.indexOf(step);
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      for (let i = idx; i < stepKeys.length; i++) {
        next.delete(stepKeys[i]);
      }
      return next;
    });
  };

  // Empty cart — only show after cart has finished loading
  if (items.length === 0 && !orderComplete && cartLoaded) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-oryn-grey-light flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-oryn-black/30">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">{t.checkoutPage.emptyCart}</h1>
          <p className="text-oryn-black/50 font-plex mb-6">{t.checkoutPage.emptyCartDescription}</p>
          <Link href="/products" className="px-6 py-3 bg-oryn-orange text-white text-sm font-medium hover:bg-oryn-orange-dark transition-colors">
            {t.checkoutPage.browseProducts}
          </Link>
        </div>
      </div>
    );
  }

  // Order confirmation
  if (orderComplete) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-500 flex items-center justify-center mx-auto mb-8 rounded-full">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-3">{t.checkoutPage.orderConfirmed}</h1>
          <p className="text-oryn-black/50 font-plex mb-2">
            {t.checkoutPage.orderConfirmedDescription}
          </p>
          {orderRef && (
            <p className="text-xs font-mono text-oryn-black/30 mb-6 mt-4 py-2 px-4 bg-oryn-grey-light inline-block">
              {t.checkoutPage.orderRef}: {orderRef}
            </p>
          )}
          <div className="bg-green-50 border border-green-200 p-4 mb-6">
            <div className="flex items-center justify-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm font-mono tracking-wider text-green-700">
                {t.checkoutPage.paymentConfirmed}
              </span>
            </div>
          </div>
          {referralCode && (
            <p className="text-xs font-mono text-oryn-orange mb-4">
              {t.checkoutPage.referralApplied}: {referralCode.toUpperCase()}
            </p>
          )}
          <Link
            href="/products"
            className="px-8 py-3 bg-oryn-orange text-white text-sm font-medium hover:bg-oryn-orange-dark transition-colors inline-block"
          >
            {t.checkoutPage.continueShopping}
          </Link>
        </div>
      </div>
    );
  }

  // Main checkout
  return (
    <div className="pt-20 pb-16 min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-oryn-grey/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight">ORYN</Link>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-xs font-mono text-oryn-black/40 tracking-wider">
              {t.checkoutPage.secureCheckout}
            </span>
          </div>
        </div>
      </div>

      {/* Auto-applied promo banner */}
      {autoPromoMessage && (
        <div className="bg-emerald-50 border-b border-emerald-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm font-medium text-emerald-700">
                Promo code <span className="font-mono font-bold">{autoPromoMessage}</span> applied!
              </span>
            </div>
            <button
              onClick={() => setAutoPromoMessage("")}
              className="text-emerald-400 hover:text-emerald-600 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Step indicator */}
      <div className="border-b border-oryn-grey/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs">
            {stepLabels.map((label, i) => {
              const stepKey = stepKeys[i];
              const isActive = activeStep === stepKey;
              const isCompleted = completedSteps.has(stepKey);
              return (
                <div key={label} className="flex items-center gap-2">
                  {i > 0 && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-oryn-black/20"><polyline points="9 18 15 12 9 6" /></svg>}
                  <button
                    onClick={() => isCompleted ? editStep(stepKey) : undefined}
                    className={`font-medium transition-colors ${
                      isActive ? "text-oryn-orange" : isCompleted ? "text-oryn-black cursor-pointer hover:text-oryn-orange" : "text-oryn-black/30"
                    }`}
                  >
                    {label}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Mobile order summary toggle */}
        <button
          onClick={() => setShowMobileSummary(!showMobileSummary)}
          className="lg:hidden w-full flex items-center justify-between p-4 bg-oryn-grey-light mb-6 border border-oryn-grey/20 active:bg-oryn-grey-light/80"
        >
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
            </svg>
            <span className="text-sm font-medium">
              {showMobileSummary
                ? t.checkoutPage.hideOrderSummary
                : t.checkoutPage.showOrderSummary}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className={`transition-transform ${showMobileSummary ? "rotate-180" : ""}`}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          <span className="font-bold">{formatPrice(finalTotal)}</span>
        </button>

        {/* Mobile order summary */}
        {showMobileSummary && (
          <div className="lg:hidden mb-6">
            <OrderSummary
              items={items}
              totalPrice={totalPrice}
              discountedPrice={discountedPrice}
              volumeDiscount={volumeDiscount}
              shippingCost={shippingCost}
              finalTotal={finalTotal}
              appliedPromotion={appliedPromotion}
              removePromotion={removePromotion}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              promoError={promoError}
              setPromoError={setPromoError}
              promoLoading={promoLoading}
              handleApplyPromo={handleApplyPromo}
              referralCode={referralCode}
              setReferralCode={setReferralCode}
              formatPrice={formatPrice}
              activeStep={activeStep}
              totalItems={totalItems}
              selectedCountry={country}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Checkout steps */}
          <div className="lg:col-span-7 space-y-0">

            {/* Step 1: Information */}
            <div className="border border-oryn-grey/20">
              <div
                className={`px-6 py-4 flex items-center justify-between cursor-pointer ${
                  activeStep === "information" ? "bg-white" : "bg-oryn-grey-light/50"
                }`}
                onClick={() => completedSteps.has("information") ? editStep("information") : undefined}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 flex items-center justify-center text-xs font-bold ${
                    completedSteps.has("information") ? "bg-oryn-black text-white" : activeStep === "information" ? "bg-oryn-orange text-white" : "bg-oryn-grey-light text-oryn-black/30"
                  }`}>
                    {completedSteps.has("information") ? <CheckIcon /> : "1"}
                  </div>
                  <span className="font-medium text-sm">{t.checkoutPage.contactShipping}</span>
                </div>
                {completedSteps.has("information") && activeStep !== "information" && (
                  <button onClick={() => editStep("information")} className="text-xs text-oryn-orange font-medium hover:underline">
                    {t.checkoutPage.change}
                  </button>
                )}
              </div>

              {/* Completed summary */}
              {completedSteps.has("information") && activeStep !== "information" && (
                <div className="px-6 pb-4 text-sm text-oryn-black/60 space-y-0.5 bg-oryn-grey-light/50">
                  <p>{email}</p>
                  <p>{firstName} {lastName}, {address}{apartment ? `, ${apartment}` : ""}, {city} {postalCode}, {getCountryName(country, locale)}</p>
                  {phone && <p>{phone}</p>}
                </div>
              )}

              {/* Active form */}
              {activeStep === "information" && (
                <div className="px-6 pb-6 space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-mono text-oryn-black/40 tracking-wider mb-1.5 mt-2">EMAIL *</label>
                    <input
                      type="email"
                      value={user?.email || email}
                      onChange={(e) => { if (!user?.email) { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); } }}
                      placeholder={t.checkoutPage.emailPlaceholder}
                      className={`w-full px-4 py-3 bg-oryn-grey-light/50 border text-sm focus:outline-none focus:border-oryn-orange transition-colors ${errors.email ? "border-red-300" : "border-oryn-grey/30"} ${user?.email ? "bg-oryn-grey-light text-oryn-black/60 cursor-not-allowed" : ""}`}
                      autoComplete="email"
                      readOnly={!!user?.email}
                    />
                    {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
                    <p className="text-[9px] text-oryn-black/30 font-plex mt-1">
                      {t.checkoutPage.emailHint}
                    </p>
                  </div>

                  {/* Shipping address */}
                  <div className="pt-2">
                    <p className="text-[10px] font-mono text-oryn-black/40 tracking-wider mb-3">
                      {t.checkoutPage.shippingAddress}
                    </p>

                    {/* Saved address selector */}
                    {savedAddresses.length > 0 && (
                      <div className="mb-4 p-3 bg-oryn-orange/5 border border-oryn-orange/10">
                        <p className="text-[9px] font-mono text-oryn-black/40 tracking-[0.1em] mb-2">
                          {t.checkoutPage.useSavedAddress}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {savedAddresses.map((addr) => (
                            <button
                              key={addr.id}
                              type="button"
                              onClick={() => {
                                setFirstName(addr.firstName);
                                setLastName(addr.lastName);
                                setAddress(addr.address);
                                setCity(addr.city);
                                setPostalCode(addr.postcode);
                                setCountry(addr.country.toLowerCase());
                                setPhone(addr.phone);
                                setErrors({});
                              }}
                              className="px-3 py-1.5 text-[10px] font-medium border border-oryn-orange/20 hover:border-oryn-orange hover:bg-oryn-orange hover:text-white transition-colors"
                            >
                              {addr.label}
                              {addr.isDefault && " *"}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Country */}
                    <div className="mb-3">
                      <select
                        value={country}
                        onChange={(e) => { setCountry(e.target.value); setErrors((p) => ({ ...p, country: "" })); }}
                        className={`w-full px-4 py-3 bg-oryn-grey-light/50 border text-sm focus:outline-none focus:border-oryn-orange transition-colors appearance-none ${
                          errors.country ? "border-red-300" : "border-oryn-grey/30"
                        } ${!country ? "text-oryn-black/40" : ""}`}
                      >
                        <option value="">{t.checkoutPage.selectCountry}</option>
                        {COUNTRY_CODES.map((code) => (
                          <option key={code} value={code}>{getCountryName(code, locale)}</option>
                        ))}
                      </select>
                      {errors.country && <p className="text-[10px] text-red-500 mt-1">{errors.country}</p>}
                    </div>

                    {/* Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => { setFirstName(e.target.value); setErrors((p) => ({ ...p, firstName: "" })); }}
                          placeholder={t.checkoutPage.firstNamePlaceholder}
                          className={`w-full px-4 py-3 bg-oryn-grey-light/50 border text-sm focus:outline-none focus:border-oryn-orange transition-colors ${errors.firstName ? "border-red-300" : "border-oryn-grey/30"}`}
                          autoComplete="given-name"
                        />
                        {errors.firstName && <p className="text-[10px] text-red-500 mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => { setLastName(e.target.value); setErrors((p) => ({ ...p, lastName: "" })); }}
                          placeholder={t.checkoutPage.lastNamePlaceholder}
                          className={`w-full px-4 py-3 bg-oryn-grey-light/50 border text-sm focus:outline-none focus:border-oryn-orange transition-colors ${errors.lastName ? "border-red-300" : "border-oryn-grey/30"}`}
                          autoComplete="family-name"
                        />
                        {errors.lastName && <p className="text-[10px] text-red-500 mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    {/* Address */}
                    <div className="mb-3">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value); setErrors((p) => ({ ...p, address: "" })); }}
                        placeholder={t.checkoutPage.addressPlaceholder}
                        className={`w-full px-4 py-3 bg-oryn-grey-light/50 border text-sm focus:outline-none focus:border-oryn-orange transition-colors ${errors.address ? "border-red-300" : "border-oryn-grey/30"}`}
                        autoComplete="address-line1"
                      />
                      {errors.address && <p className="text-[10px] text-red-500 mt-1">{errors.address}</p>}
                    </div>

                    {/* Apartment */}
                    <div className="mb-3">
                      <input
                        type="text"
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                        placeholder={t.checkoutPage.apartmentPlaceholder}
                        className="w-full px-4 py-3 bg-oryn-grey-light/50 border border-oryn-grey/30 text-sm focus:outline-none focus:border-oryn-orange transition-colors"
                        autoComplete="address-line2"
                      />
                    </div>

                    {/* City + Postal */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => { setCity(e.target.value); setErrors((p) => ({ ...p, city: "" })); }}
                          placeholder={t.checkoutPage.cityPlaceholder}
                          className={`w-full px-4 py-3 bg-oryn-grey-light/50 border text-sm focus:outline-none focus:border-oryn-orange transition-colors ${errors.city ? "border-red-300" : "border-oryn-grey/30"}`}
                          autoComplete="address-level2"
                        />
                        {errors.city && <p className="text-[10px] text-red-500 mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => { setPostalCode(e.target.value); setErrors((p) => ({ ...p, postalCode: "" })); }}
                          placeholder={t.checkoutPage.postalCodePlaceholder}
                          className={`w-full px-4 py-3 bg-oryn-grey-light/50 border text-sm focus:outline-none focus:border-oryn-orange transition-colors ${errors.postalCode ? "border-red-300" : "border-oryn-grey/30"}`}
                          autoComplete="postal-code"
                        />
                        {errors.postalCode && <p className="text-[10px] text-red-500 mt-1">{errors.postalCode}</p>}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.checkoutPage.phonePlaceholder}
                        className="w-full px-4 py-3 bg-oryn-grey-light/50 border border-oryn-grey/30 text-sm focus:outline-none focus:border-oryn-orange transition-colors"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  {/* Continue button */}
                  <button
                    onClick={handleContinueToShipping}
                    disabled={isSubmitting}
                    className="w-full py-4 bg-oryn-orange text-white font-bold text-sm tracking-wide hover:bg-oryn-orange-dark transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2"><Spinner size={16} /> {t.checkoutPage.processing}</span>
                    ) : (
                      t.checkoutPage.continueToShipping
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Shipping */}
            <div className="border border-t-0 border-oryn-grey/20">
              <div
                className={`px-6 py-4 flex items-center justify-between ${
                  activeStep === "shipping" ? "bg-white" : "bg-oryn-grey-light/50"
                } ${!completedSteps.has("information") && activeStep !== "shipping" ? "opacity-40" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 flex items-center justify-center text-xs font-bold ${
                    completedSteps.has("shipping") ? "bg-oryn-black text-white" : activeStep === "shipping" ? "bg-oryn-orange text-white" : "bg-oryn-grey-light text-oryn-black/30"
                  }`}>
                    {completedSteps.has("shipping") ? <CheckIcon /> : "2"}
                  </div>
                  <span className="font-medium text-sm">{t.checkoutPage.shippingMethod}</span>
                </div>
                {completedSteps.has("shipping") && activeStep !== "shipping" && (
                  <button onClick={() => editStep("shipping")} className="text-xs text-oryn-orange font-medium hover:underline">
                    {t.checkoutPage.change}
                  </button>
                )}
              </div>

              {/* Completed summary */}
              {completedSteps.has("shipping") && activeStep !== "shipping" && (
                <div className="px-6 pb-4 text-sm text-oryn-black/60 bg-oryn-grey-light/50">
                  <p>{shippingOptions.find((o) => o.id === selectedShipping)?.name} — {
                    shippingCost === 0 ? t.checkoutPage.free : formatPrice(shippingCost)
                  }</p>
                </div>
              )}

              {/* Active form */}
              {activeStep === "shipping" && (
                <div className="px-6 pb-6">
                  {/* Address summary */}
                  <div className="p-3 bg-oryn-grey-light/70 border border-oryn-grey/20 mb-4 text-sm text-oryn-black/60">
                    <p className="font-medium text-oryn-black">{firstName} {lastName}</p>
                    <p>{address}{apartment ? `, ${apartment}` : ""}, {city} {postalCode}</p>
                    <p>{getCountryName(country, locale)}</p>
                  </div>

                  {shippingLoading ? (
                    <div className="flex items-center justify-center py-8 gap-3">
                      <Spinner size={20} />
                      <span className="text-sm text-oryn-black/50">{t.checkoutPage.loadingShipping}</span>
                    </div>
                  ) : (
                    <>
                    {/* Free shipping progress */}
                    {!qualifiesForFreeShipping && (() => {
                      const cheapestPaid = shippingOptions
                        .filter((o) => o.amount > 0 && (!o.region_id || o.region_id === cart?.region_id))
                        .sort((a, b) => a.amount - b.amount)[0];
                      const savingsText = cheapestPaid
                        ? ` to save ${formatPrice(cheapestPaid.amount)} on shipping`
                        : ` for FREE shipping`;
                      return (
                        <div className="mb-4 p-3 bg-oryn-orange/5 border border-oryn-orange/20">
                          <div className="flex items-center gap-2 mb-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
                              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span className="text-xs font-mono text-oryn-orange tracking-wider">
                              {`Add ${formatPrice(amountUntilFreeShipping)} more${savingsText}`}
                            </span>
                          </div>
                          <div className="w-full bg-oryn-grey/20 h-1.5">
                            <div
                              className="bg-oryn-orange h-1.5 transition-all duration-500"
                              style={{ width: `${Math.min(100, (totalPrice / freeShippingThreshold) * 100)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })()}

                    {qualifiesForFreeShipping && (() => {
                      const selectedOpt = shippingOptions.find((o) => o.id === selectedShipping);
                      const savingsAmount = selectedOpt && selectedOpt.amount > 0 ? selectedOpt.amount : 0;
                      return (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200">
                          <div className="flex items-center gap-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span className="text-xs font-mono text-green-700 tracking-wider">
                              {t.checkoutPage.freeShippingApplied}
                            </span>
                          </div>
                          {savingsAmount > 0 && (
                            <p className="text-xs text-green-600 mt-1.5 ml-[22px]">
                              {`You're saving ${formatPrice(savingsAmount)} on shipping!`}
                            </p>
                          )}
                        </div>
                      );
                    })()}

                    <div className="space-y-3 mb-6">
                      {shippingOptions.filter(
                        (opt) => !opt.region_id || opt.region_id === cart?.region_id
                      ).map((option) => {
                        const displayAmount = qualifiesForFreeShipping ? 0 : option.amount;
                        return (
                          <label
                            key={option.id}
                            onClick={async () => {
                              if (option.id === selectedShipping) return;
                              setSelectedShipping(option.id);
                              // Update Medusa cart immediately
                              if (medusaConnected && cart && option.id !== "free_shipping") {
                                try {
                                  await addShippingMethod(option.id);
                                } catch (err) {
                                  void err;
                                }
                              }
                            }}
                            className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                              selectedShipping === option.id
                                ? "border-oryn-orange bg-oryn-orange/5"
                                : "border-oryn-grey/30 hover:border-oryn-orange/40"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                selectedShipping === option.id ? "border-oryn-orange" : "border-oryn-grey"
                              }`}>
                                {selectedShipping === option.id && <div className="w-2 h-2 rounded-full bg-oryn-orange" />}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{option.name}</p>
                                {(() => {
                                  const est = getEstimatedDelivery(option.name);
                                  return est ? (
                                    <p className="text-[11px] text-oryn-black/45 mt-0.5">{est}</p>
                                  ) : null;
                                })()}
                              </div>
                            </div>
                            <span className="text-sm font-bold">
                              {displayAmount === 0 ? (
                                <span className="text-oryn-orange">
                                  {qualifiesForFreeShipping && option.amount > 0 ? (
                                    <span className="flex items-center gap-1.5">
                                      <span className="line-through text-oryn-black/30 text-xs">{formatPrice(option.amount)}</span>
                                      <span>{t.checkoutPage.free}</span>
                                    </span>
                                  ) : (
                                    t.checkoutPage.free
                                  )}
                                </span>
                              ) : formatPrice(displayAmount)}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    </>
                  )}

                  <button
                    onClick={handleContinueToPayment}
                    disabled={isSubmitting || !selectedShipping || shippingLoading}
                    className="w-full py-4 bg-oryn-orange text-white font-bold text-sm tracking-wide hover:bg-oryn-orange-dark transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2"><Spinner size={16} /> {t.checkoutPage.processing}</span>
                    ) : (
                      t.checkoutPage.continueToPayment
                    )}
                  </button>

                  <button
                    onClick={() => editStep("information")}
                    className="w-full mt-2 py-2 text-xs text-oryn-black/40 hover:text-oryn-orange transition-colors"
                  >
                    {t.checkoutPage.returnToInformation}
                  </button>
                </div>
              )}
            </div>

            {/* Order Bump — before payment */}
            {activeStep === "shipping" && (
              <div className="border border-t-0 border-oryn-grey/20 p-4">
                <OrderBump />
              </div>
            )}

            {/* Step 3: Payment */}
            <div className="border border-t-0 border-oryn-grey/20">
              <div
                className={`px-6 py-4 flex items-center justify-between ${
                  activeStep === "payment" ? "bg-white" : "bg-oryn-grey-light/50"
                } ${!completedSteps.has("shipping") && activeStep !== "payment" ? "opacity-40" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 flex items-center justify-center text-xs font-bold ${
                    activeStep === "payment" ? "bg-oryn-orange text-white" : "bg-oryn-grey-light text-oryn-black/30"
                  }`}>
                    3
                  </div>
                  <span className="font-medium text-sm">{t.checkoutPage.paymentTitle}</span>
                </div>
              </div>

              {activeStep === "payment" && (
                <div className="px-6 pb-6">
                  {/* Summaries */}
                  <div className="space-y-2 mb-6">
                    <div className="p-3 bg-oryn-grey-light/70 border border-oryn-grey/20 text-sm text-oryn-black/60">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-mono text-oryn-black/30 tracking-wider mb-0.5">{t.checkoutPage.contact}</p>
                          <p>{email}</p>
                        </div>
                        <button onClick={() => editStep("information")} className="text-xs text-oryn-orange hover:underline">{t.checkoutPage.change}</button>
                      </div>
                    </div>
                    <div className="p-3 bg-oryn-grey-light/70 border border-oryn-grey/20 text-sm text-oryn-black/60">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-mono text-oryn-black/30 tracking-wider mb-0.5">{t.checkoutPage.shipTo}</p>
                          <p>{address}, {city} {postalCode}, {getCountryName(country, locale)}</p>
                        </div>
                        <button onClick={() => editStep("information")} className="text-xs text-oryn-orange hover:underline">{t.checkoutPage.change}</button>
                      </div>
                    </div>
                    <div className="p-3 bg-oryn-grey-light/70 border border-oryn-grey/20 text-sm text-oryn-black/60">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-mono text-oryn-black/30 tracking-wider mb-0.5">{t.checkoutPage.method}</p>
                          <p>{shippingOptions.find((o) => o.id === selectedShipping)?.name} — {
                            shippingCost === 0 ? t.checkoutPage.free : formatPrice(shippingCost)
                          }</p>
                        </div>
                        <button onClick={() => editStep("shipping")} className="text-xs text-oryn-orange hover:underline">{t.checkoutPage.change}</button>
                      </div>
                    </div>
                  </div>

                  {/* Trust badges before payment */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {[
                      { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: t.checkoutPage.sslEncrypted, sub: "256-bit" },
                      { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: t.checkoutPage.purity99, sub: t.checkoutPage.guaranteed },
                      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: t.checkoutPage.gmpCertifiedBadge, sub: "ISO 7" },
                      { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", label: t.checkoutPage.guarantee30, sub: t.checkoutPage.noQuestions },
                    ].map((badge) => (
                      <div key={badge.label} className="flex items-center gap-2.5 p-3 bg-green-50/80 border border-green-200/50">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5" className="shrink-0">
                          <path d={badge.icon} />
                        </svg>
                        <div>
                          <p className="text-[10px] font-bold text-green-800 leading-tight">{badge.label}</p>
                          <p className="text-[8px] text-green-600/70 font-plex">{badge.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment form */}
                  <div className="mb-4">
                    <p className="text-[10px] font-mono text-oryn-black/40 tracking-wider mb-4">
                      {t.checkoutPage.allSecure}
                    </p>

                    {medusaConnected ? (
                      <StripeCheckout
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                        amount={cart?.total != null ? cart.total : finalTotal}
                        formatPrice={formatPrice}
                        disabled={isSubmitting || cartLoading}
                        totalItems={totalItems}
                      />
                    ) : (
                      <div className="p-6 bg-yellow-50 border border-yellow-200 text-yellow-800">
                        <p className="font-mono font-bold text-sm mb-1">{t.checkoutPage.backendRequired}</p>
                        <p className="text-xs font-plex">{t.checkoutPage.backendDescription}</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => editStep("shipping")}
                    className="w-full mt-2 py-2 text-xs text-oryn-black/40 hover:text-oryn-orange transition-colors"
                  >
                    {t.checkoutPage.returnToShipping}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order summary (desktop) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-24">
              <OrderSummary
                items={items}
                totalPrice={totalPrice}
                discountedPrice={discountedPrice}
                volumeDiscount={volumeDiscount}
                shippingCost={shippingCost}
                finalTotal={finalTotal}
                appliedPromotion={appliedPromotion}
                removePromotion={removePromotion}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                promoError={promoError}
                setPromoError={setPromoError}
                promoLoading={promoLoading}
                handleApplyPromo={handleApplyPromo}
                referralCode={referralCode}
                setReferralCode={setReferralCode}
                formatPrice={formatPrice}
                activeStep={activeStep}
                totalItems={totalItems}
                selectedCountry={country}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Order Summary Component
function OrderSummary({
  items,
  totalPrice,
  discountedPrice,
  volumeDiscount,
  shippingCost,
  finalTotal,
  appliedPromotion,
  removePromotion,
  promoCode,
  setPromoCode,
  promoError,
  setPromoError,
  promoLoading,
  handleApplyPromo,
  referralCode,
  setReferralCode,
  formatPrice,
  activeStep,
  totalItems,
  selectedCountry,
}: {
  items: Array<{ product: { id: string; name: string; slug: string; category: string; image: string; price: number }; quantity: number }>;
  totalPrice: number;
  discountedPrice: number;
  volumeDiscount: { discount: number; tier: { percentage: number; label: string; minItems: number } } | null;
  shippingCost: number;
  finalTotal: number;
  appliedPromotion: { code: string; label: string; discountAmount: number } | null;
  removePromotion: () => void;
  promoCode: string;
  setPromoCode: (v: string) => void;
  promoError: string;
  setPromoError: (v: string) => void;
  promoLoading: boolean;
  handleApplyPromo: () => void;
  referralCode: string;
  setReferralCode: (v: string) => void;
  formatPrice: (n: number) => string;
  activeStep: CheckoutStep;
  totalItems: number;
  selectedCountry?: string;
}) {
  const { t, locale, currencyCode } = useLocale();
  const freeShippingThreshold = getFreeShippingThreshold(currencyCode);

  // Estimate shipping based on selected country before actual rates are fetched
  const shippingEstimate = (() => {
    if (activeStep !== "information") return null;
    if (totalPrice >= freeShippingThreshold) return { amount: 0, isFree: true };
    if (!selectedCountry) {
      // Show default estimate based on locale's region before country is selected
      const defaultAmount = currencyCode === "gbp" ? 3.99 : currencyCode === "usd" ? 7.99 : currencyCode === "brl" ? 49.99 : 4.99;
      return { amount: defaultAmount, isFree: false };
    }
    // UK gets GBP rates, rest of Europe gets EUR rates
    const isUK = selectedCountry === "gb";
    return { amount: isUK ? 3.99 : 4.99, isFree: false };
  })();
  return (
    <div className="bg-oryn-grey-light/50 border border-oryn-grey/20 p-6">
      {/* Cart items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center gap-3">
            <div className="w-14 h-14 bg-oryn-cream border border-oryn-grey/20 flex items-center justify-center shrink-0 relative">
              <Image src={productImages.bySlug[item.product.slug] || productImages.categoryCard[item.product.category] || "/images/products/bpc157-hero.png"} alt={item.product.name} width={48} height={48} className="object-contain" />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-oryn-black/70 text-white text-[10px] flex items-center justify-center rounded-full">
                {item.quantity}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.product.name}</p>
            </div>
            <span className="text-sm font-medium shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      {/* Discount code */}
      <div className="border-t border-oryn-grey/20 pt-4 mb-4">
        {appliedPromotion ? (
          <div className="flex items-center gap-2 px-3 py-2 bg-oryn-orange/5 border border-oryn-orange/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2"><path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /></svg>
            <span className="text-xs font-mono font-bold text-oryn-orange flex-1">{appliedPromotion.code}</span>
            <span className="text-xs font-bold text-oryn-orange">-{formatPrice(appliedPromotion.discountAmount)}</span>
            <button onClick={removePromotion} className="text-oryn-black/30 hover:text-red-500 transition-colors ml-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
        ) : (
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setPromoError(""); }}
                placeholder={t.checkoutPage.promoCodePlaceholder}
                className={`flex-1 px-3 py-2.5 bg-white border text-sm focus:outline-none focus:border-oryn-orange transition-colors font-mono ${
                  promoError ? "border-red-300" : "border-oryn-grey/30"
                }`}
              />
              <button
                onClick={handleApplyPromo}
                disabled={promoLoading || !promoCode.trim()}
                className="px-4 py-2.5 bg-oryn-grey-dark text-white text-xs font-bold tracking-wider hover:bg-oryn-black transition-colors disabled:opacity-40"
              >
                {promoLoading ? "..." : t.checkoutPage.apply}
              </button>
            </div>
            {promoError && <p className="text-[10px] text-red-500 mt-1">{promoError}</p>}
          </div>
        )}
      </div>

      {/* Referral code */}
      <div className="mb-4">
        <input
          type="text"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
          placeholder={t.checkoutPage.referralPlaceholder}
          className="w-full px-3 py-2.5 bg-white border border-oryn-grey/30 text-sm focus:outline-none focus:border-oryn-orange transition-colors font-mono"
        />
      </div>

      {/* Volume discount info */}
      <div className="mb-4">
        <VolumeDiscountBanner totalItems={totalItems} compact />
      </div>

      {/* Free shipping progress */}
      {totalPrice > 0 && totalPrice < freeShippingThreshold && (
        <div className="border-t border-oryn-grey/20 pt-3 pb-1">
          <div className="flex items-center gap-2 mb-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span className="text-[10px] font-mono text-oryn-orange tracking-wider">
              {t.cart.freeShippingAway.replace("{amount}", formatPrice(freeShippingThreshold - totalPrice))}
            </span>
          </div>
          <div className="w-full bg-oryn-grey/20 h-1">
            <div
              className="bg-oryn-orange h-1 transition-all duration-500"
              style={{ width: `${Math.min(100, (totalPrice / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Totals */}
      <div className="border-t border-oryn-grey/20 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-oryn-black/50">Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        {appliedPromotion && (
          <div className="flex justify-between text-sm">
            <span className="text-oryn-orange">{t.checkoutPage.discount}</span>
            <span className="text-oryn-orange">-{formatPrice(appliedPromotion.discountAmount)}</span>
          </div>
        )}
        {volumeDiscount && (
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1.5">
              <span className="text-green-600">{t.checkoutPage.volumeDiscountLabel}</span>
              <span className="text-[9px] font-mono bg-green-100 text-green-700 px-1.5 py-0.5">{volumeDiscount.tier.label}</span>
            </div>
            <span className="text-green-600">-{formatPrice(volumeDiscount.discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-oryn-black/50">{t.checkoutPage.shipping}</span>
          <span>
            {activeStep === "information"
              ? shippingEstimate
                ? shippingEstimate.isFree
                  ? <span className="text-green-600 text-xs font-mono">{t.checkoutPage.free.toUpperCase()}</span>
                  : <span className="text-xs text-oryn-black/60">{t.cart.estimatedShippingFrom || "Est."} {formatPrice(shippingEstimate.amount)}</span>
                : <span className="text-xs text-oryn-black/30">{t.checkoutPage.selectCountryForShipping || "Select country for estimate"}</span>
              : shippingCost === 0
                ? <span className="text-green-600 text-xs font-mono">{t.checkoutPage.free.toUpperCase()}</span>
                : formatPrice(shippingCost)
            }
          </span>
        </div>
        {totalPrice >= freeShippingThreshold && activeStep !== "information" && (
          <div className="flex items-center gap-1.5 text-[10px] text-green-600 font-mono">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {t.checkoutPage.freeShippingLabel.replace("{threshold}", formatPrice(freeShippingThreshold))}
          </div>
        )}
        <div className="flex justify-between text-base font-bold pt-3 border-t border-oryn-grey/20">
          <span>Total</span>
          <span>{formatPrice(finalTotal)}</span>
        </div>
      </div>

      {/* Trust signals */}
      <div className="mt-6 pt-4 border-t border-oryn-grey/20 space-y-2">
        {[
          { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: t.checkoutPage.securePayment },
          { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", label: t.checkoutPage.discreetShipping },
          { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: t.checkoutPage.coaIncluded },
          { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", label: t.checkoutPage.gmpCertified },
        ].map((trust) => (
          <div key={trust.label} className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0"><path d={trust.icon} /></svg>
            <span className="text-[9px] font-mono text-oryn-black/40 tracking-[0.05em]">{trust.label}</span>
          </div>
        ))}
      </div>

      {/* Accepted payment methods */}
      <div className="mt-4 pt-4 border-t border-oryn-grey/20">
        <p className="text-[8px] font-mono text-oryn-black/25 tracking-wider mb-2">{t.cart.weAccept || "ACCEPTED PAYMENT METHODS"}</p>
        <div className="flex flex-wrap gap-1.5">
          {["Visa", "Mastercard", "Klarna", "iDEAL", "Apple Pay", "Google Pay"].map((m) => (
            <span key={m} className="text-[9px] font-mono text-oryn-black/40 px-2 py-1 border border-oryn-grey/20 bg-white">{m}</span>
          ))}
        </div>
      </div>

      <p className="text-[9px] text-oryn-black/25 font-mono mt-4 text-center">
        {t.checkoutPage.researchOnly}
      </p>
    </div>
  );
}
