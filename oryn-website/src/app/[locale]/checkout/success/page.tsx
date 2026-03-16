"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import { useCart } from "@/lib/cart-context";
import { trackPurchase } from "@/lib/analytics";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { t } = useLocale();
  const { clearCart } = useCart();
  const ch = t.checkoutPage;
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  const paymentIntentId = searchParams.get("payment_intent");
  const redirectStatus = searchParams.get("redirect_status");
  const orderRef = searchParams.get("order_ref");
  const orderTotal = searchParams.get("total");
  const itemsCount = searchParams.get("items_count");
  const shippingCountry = searchParams.get("shipping_country");
  const currency = searchParams.get("currency");
  const tracked = useRef(false);

  useEffect(() => {
    if (redirectStatus === "succeeded") {
      setStatus("success");
      clearCart();
    } else if (redirectStatus === "failed") {
      setStatus("error");
    } else if (paymentIntentId) {
      // Payment intent exists but no redirect_status — treat as success
      setStatus("success");
      clearCart();
    } else {
      // No payment info at all — user landed here directly
      setStatus("error");
    }
  }, [redirectStatus, paymentIntentId, clearCart]);

  // Track purchase event (once) on successful payment
  useEffect(() => {
    if (status === "success" && paymentIntentId && !tracked.current) {
      tracked.current = true;
      trackPurchase({
        orderId: paymentIntentId,
        orderRef: orderRef || "",
        total: parseFloat(orderTotal || "0"),
        itemCount: parseInt(itemsCount || "0", 10),
        currency: currency || "EUR",
        shippingCountry: shippingCountry || undefined,
      });
    }
  }, [status, paymentIntentId, orderRef, orderTotal, itemsCount, currency, shippingCountry]);

  if (status === "loading") {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg
            className="animate-spin h-6 w-6 text-oryn-orange"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span className="text-oryn-black/50 font-plex">
            {ch.verifyingPayment}
          </span>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-red-100 flex items-center justify-center mx-auto mb-6">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-3">{ch.paymentFailed}</h1>
          <p className="text-oryn-black/50 font-plex mb-6">
            {ch.paymentFailedDescription}
          </p>
          <Link
            href="/checkout"
            className="px-8 py-3.5 bg-oryn-orange text-white text-sm font-medium hover:bg-oryn-orange-dark transition-colors shadow-md shadow-oryn-orange/20"
          >
            {ch.tryAgain}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen pb-16">
      <div className="text-center max-w-lg mx-auto px-6 mb-12">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-oryn-orange/20 animate-ping" />
          <div className="relative w-24 h-24 bg-oryn-orange flex items-center justify-center shadow-xl shadow-oryn-orange/30">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            >
              <path d="M5 12l5 5L20 7" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-3">{ch.orderConfirmed}</h1>
        <p className="text-oryn-black/50 font-plex mb-4">
          {ch.orderConfirmedDescription}
        </p>

        {/* Order details summary */}
        {(orderRef || orderTotal || itemsCount) && (
          <div className="bg-oryn-grey-light border border-oryn-grey/20 p-5 mb-6">
            {orderRef && (
              <p className="text-sm font-mono font-bold tracking-wider text-oryn-black mb-2">
                {ch.orderRef}: {orderRef}
              </p>
            )}
            <div className="flex items-center justify-center gap-6">
              {orderTotal && (
                <div className="text-center">
                  <p className="text-[9px] font-mono text-oryn-black/40 tracking-wider mb-0.5">{ch.total}</p>
                  <p className="text-lg font-bold text-oryn-black">{"\u20AC"}{parseFloat(orderTotal).toFixed(2)}</p>
                </div>
              )}
              {itemsCount && (
                <div className="text-center">
                  <p className="text-[9px] font-mono text-oryn-black/40 tracking-wider mb-0.5">ITEMS</p>
                  <p className="text-lg font-bold text-oryn-black">{itemsCount}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {paymentIntentId && (
          <p className="text-[10px] font-mono text-oryn-black/30 mb-6">
            Payment ID: {paymentIntentId.slice(0, 28)}...
          </p>
        )}
        <div className="bg-green-50 border border-green-200 p-5 mb-8">
          <div className="flex items-center justify-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2"
            >
              <path d="M9 12l2 2 4-4" />
            </svg>
            <span className="text-sm font-mono tracking-wider text-green-700">
              {ch.paymentConfirmed}
            </span>
          </div>
        </div>

        {/* What happens next */}
        <div className="bg-oryn-orange/5 border border-oryn-orange/10 p-6 mb-8 text-left">
          <h3 className="text-xs font-bold text-oryn-orange mb-4 tracking-wide">{ch.whatHappensNext}</h3>
          <div className="space-y-3">
            {ch.nextSteps.map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-oryn-orange text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  {i + 1}
                </div>
                <span className="text-xs text-oryn-black/60 font-plex pt-0.5">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/products"
            className="px-8 py-3.5 bg-oryn-orange text-white text-sm font-medium hover:bg-oryn-orange-dark transition-colors shadow-md shadow-oryn-orange/20 inline-block"
          >
            {ch.continueShopping}
          </Link>
          <Link
            href="/account/orders"
            className="px-8 py-3.5 border border-oryn-grey/30 text-sm font-medium hover:border-oryn-orange/30 hover:text-oryn-orange transition-colors inline-block"
          >
            {ch.viewOrders}
          </Link>
        </div>

        {/* Referral CTA */}
        <div className="mt-8 p-5 bg-oryn-black text-white">
          <h3 className="text-sm font-bold mb-2">{ch.referralTitle}</h3>
          <p className="text-[10px] text-white/50 font-plex mb-4">
            {ch.referralDescription}
          </p>
          <Link
            href="/account/referrals"
            className="text-[10px] text-oryn-orange font-medium tracking-[0.15em] hover:underline"
          >
            {ch.getReferralLink}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  const { t } = useLocale();
  return (
    <Suspense
      fallback={
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-3">
            <svg
              className="animate-spin h-6 w-6 text-oryn-orange"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span className="text-oryn-black/50 font-plex">
              {t.checkoutPage.verifyingPayment}
            </span>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
