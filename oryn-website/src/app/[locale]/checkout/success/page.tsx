"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import { useCart } from "@/lib/cart-context";

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

  useEffect(() => {
    if (redirectStatus === "succeeded") {
      setStatus("success");
      clearCart();
    } else if (redirectStatus === "failed") {
      setStatus("error");
    } else if (paymentIntentId) {
      setStatus("success");
      clearCart();
    } else {
      setStatus("success");
    }
  }, [redirectStatus, paymentIntentId, clearCart]);

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
            Verifying payment...
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
          <h1 className="text-2xl font-bold mb-3">Payment Failed</h1>
          <p className="text-oryn-black/50 font-plex mb-6">
            Your payment could not be processed. Please try again or use a
            different payment method.
          </p>
          <Link
            href="/checkout"
            className="px-8 py-3.5 bg-oryn-orange text-white text-sm font-medium hover:bg-oryn-orange-dark transition-colors shadow-md shadow-oryn-orange/20"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-6">
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
        <Link
          href="/products"
          className="px-8 py-3.5 bg-oryn-orange text-white text-sm font-medium hover:bg-oryn-orange-dark transition-colors shadow-md shadow-oryn-orange/20 inline-block"
        >
          {ch.continueShopping}
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
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
              Verifying payment...
            </span>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
