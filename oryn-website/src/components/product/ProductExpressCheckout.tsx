"use client";

import { useState, useCallback } from "react";
import {
  Elements,
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe, type StripeExpressCheckoutElementConfirmEvent } from "@stripe/stripe-js";
import { useLocale } from "@/i18n/LocaleContext";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const STRIPE_LOCALE_MAP: Record<string, string> = {
  en: "en", es: "es", fr: "fr", de: "de", it: "it",
  pt: "pt", "pt-br": "pt-BR", nl: "nl", pl: "pl",
};

interface ProductExpressCheckoutProps {
  product: { id: string; name: string; price: number; slug: string };
  quantity: number;
  dividerLabel?: string;
}

function ExpressCheckoutInner({
  product,
  quantity,
  dividerLabel,
}: ProductExpressCheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { locale, localePath, currencyCode } = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onConfirm = useCallback(
    async (_event: StripeExpressCheckoutElementConfirmEvent) => {
      if (!stripe || !elements) return;
      setLoading(true);
      setError(null);

      try {
        // Step 1: Validate payment method via elements
        const { error: submitError } = await elements.submit();
        if (submitError) {
          setError(submitError.message || "Payment validation failed");
          setLoading(false);
          return;
        }

        // Step 2: Create PaymentIntent on server
        const response = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: product.price * quantity,
            currency: currencyCode.toLowerCase(),
            items: [{ id: product.id, name: product.name, quantity, price: product.price }],
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create payment");
        }

        const { clientSecret } = await response.json();

        // Step 3: Confirm payment with the client secret
        const returnUrl = new URL(`${window.location.origin}/${locale}/checkout/success`);
        returnUrl.searchParams.set("total", String(product.price * quantity));
        returnUrl.searchParams.set("items_count", String(quantity));
        returnUrl.searchParams.set("currency", currencyCode.toUpperCase());

        const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url: returnUrl.toString(),
          },
          redirect: "if_required",
        });

        if (confirmError) {
          const pi = confirmError.payment_intent;
          if (pi && (pi.status === "requires_capture" || pi.status === "succeeded")) {
            handleSuccess();
            return;
          }
          setError(confirmError.message || "Payment failed");
          setLoading(false);
          return;
        }

        if (paymentIntent && (paymentIntent.status === "succeeded" || paymentIntent.status === "requires_capture")) {
          handleSuccess();
        } else {
          setLoading(false);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Payment failed";
        setError(message);
        setLoading(false);
      }
    },
    [stripe, elements, product, quantity, currencyCode, locale]
  );

  function handleSuccess() {
    const params = new URLSearchParams({
      total: String(product.price * quantity),
      items_count: String(quantity),
      currency: currencyCode.toUpperCase(),
    });
    router.push(localePath(`/checkout/success?${params.toString()}`));
  }

  return (
    <div className={`product-express-checkout ${!visible ? "hidden" : ""}`}>
      {/* Divider */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 h-px bg-oryn-grey/30" />
        <span className="text-[9px] font-mono text-oryn-black/30 tracking-wider uppercase">
          {dividerLabel}
        </span>
        <div className="flex-1 h-px bg-oryn-grey/30" />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 mb-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4m0 4h.01" />
          </svg>
          <span className="text-xs text-red-600 font-plex">{error}</span>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-4">
          <svg className="animate-spin h-5 w-5 text-oryn-orange" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      )}

      <div className={loading ? "opacity-50 pointer-events-none" : ""}>
        <ExpressCheckoutElement
          onConfirm={onConfirm}
          onReady={({ availablePaymentMethods }) => {
            if (availablePaymentMethods) {
              setVisible(true);
            }
          }}
          options={{
            buttonType: {
              applePay: "buy",
              googlePay: "buy",
              paypal: "buynow",
            },
            buttonTheme: {
              applePay: "black",
              googlePay: "black",
            },
            buttonHeight: 48,
            layout: {
              maxColumns: 2,
              maxRows: 2,
              overflow: "auto",
            },
            paymentMethodOrder: [
              "applePay",
              "googlePay",
              "klarna",
              "paypal",
              "link",
            ],
          }}
        />
      </div>
    </div>
  );
}

export function ProductExpressCheckout(props: ProductExpressCheckoutProps) {
  const { locale, currencyCode } = useLocale();

  // Amount in smallest currency unit (cents for EUR)
  const amountInCents = Math.round(props.product.price * props.quantity * 100);

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: amountInCents,
        currency: currencyCode.toLowerCase(),
        appearance: {
          theme: "flat",
          variables: {
            colorPrimary: "#FF6A1A",
            colorBackground: "#FAFAF8",
            borderRadius: "0px",
          },
        },
        locale: (STRIPE_LOCALE_MAP[locale] ?? "auto") as "auto",
      }}
    >
      <ExpressCheckoutInner {...props} />
    </Elements>
  );
}
