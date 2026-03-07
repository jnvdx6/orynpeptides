"use client";

import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "@/providers/cart";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface StripeCheckoutProps {
  onSuccess: (orderId: string, orderRef: string) => void;
  onError: (message: string) => void;
  amount: number;
  formatPrice: (n: number) => string;
  disabled?: boolean;
}

function PaymentFormInner({
  onSuccess,
  onError,
  amount,
  formatPrice,
  disabled,
}: StripeCheckoutProps) {
  const { cart, completeCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements || !cart) {
      onError("Payment system not ready. Please try again.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      // Validate the form
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message || "Please check your payment details.");
        setLoading(false);
        return;
      }

      // Confirm the payment
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: "if_required",
      });

      if (confirmError) {
        setErrorMessage(confirmError.message || "Payment failed. Please try again.");
        onError(confirmError.message || "Payment failed.");
        setLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        // Payment confirmed - complete the cart in Medusa
        const result = await completeCart();

        if (result.type === "order" && result.order) {
          const order = result.order as { id: string; display_id?: number };
          const orderId = order.id;
          const orderRef = order.display_id
            ? `ORY-${order.display_id}`
            : `ORY-${orderId.slice(-6).toUpperCase()}`;
          onSuccess(orderId, orderRef);
        } else {
          onError("Payment processed but order creation failed. Please contact support.");
        }
      } else if (paymentIntent && paymentIntent.status === "requires_action") {
        // 3D Secure handled automatically by Stripe
        setLoading(false);
      } else {
        setErrorMessage("Payment was not completed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setErrorMessage("An unexpected error occurred. Please try again.");
      onError("An unexpected error occurred.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement
        options={{
          layout: {
            type: "accordion",
            defaultCollapsed: false,
            radios: true,
            spacedAccordionItems: true,
          },
          business: { name: "ORYN Peptide Labs" },
        }}
      />

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || disabled || !stripe || !elements}
        className="w-full py-4 bg-oryn-orange text-white font-bold text-sm tracking-wide hover:bg-oryn-orange-dark transition-all shadow-lg shadow-oryn-orange/20 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            PROCESSING...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            {formatPrice(amount)} — COMPLETE ORDER
          </span>
        )}
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
      </button>

      <div className="flex items-center justify-center gap-6 pt-1">
        <div className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="text-[9px] font-mono text-oryn-black/30 tracking-wider">SSL ENCRYPTED</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
            <rect x="1" y="4" width="22" height="16" rx="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
          <span className="text-[9px] font-mono text-oryn-black/30 tracking-wider">PCI COMPLIANT</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="40" height="16" viewBox="0 0 80 32" fill="none">
            <text x="0" y="22" fill="#635BFF" fontSize="20" fontWeight="700" fontFamily="system-ui">stripe</text>
          </svg>
        </div>
      </div>
    </form>
  );
}

export default function StripeCheckout(props: StripeCheckoutProps) {
  const { cart } = useCart();

  const clientSecret = cart?.payment_collection?.payment_sessions?.[0]?.data
    ?.client_secret as string | undefined;

  if (!clientSecret) {
    return (
      <div className="p-8 bg-oryn-grey-light border border-oryn-grey/30 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <svg className="animate-spin h-5 w-5 text-oryn-orange" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm font-medium text-oryn-black/50">Preparing secure payment...</span>
        </div>
        <p className="text-[10px] font-mono text-oryn-black/30">INITIALIZING STRIPE PAYMENT SESSION</p>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "flat",
          variables: {
            colorPrimary: "#FF6A1A",
            colorBackground: "#FAFAF8",
            colorText: "#1A1A1A",
            colorDanger: "#ef4444",
            fontFamily: "Space Grotesk, system-ui, sans-serif",
            fontSizeBase: "14px",
            spacingUnit: "4px",
            borderRadius: "0px",
            colorTextSecondary: "#1A1A1A80",
            colorTextPlaceholder: "#1A1A1A40",
          },
          rules: {
            ".Input": {
              border: "1px solid #E5E5E3",
              boxShadow: "none",
              padding: "12px 16px",
              transition: "border-color 0.2s ease",
            },
            ".Input:focus": {
              border: "1px solid #FF6A1A",
              boxShadow: "0 0 0 1px #FF6A1A20",
            },
            ".Input:hover": {
              border: "1px solid #FF6A1A60",
            },
            ".Label": {
              fontSize: "10px",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: "#1A1A1A66",
              marginBottom: "8px",
            },
            ".Tab": {
              border: "1px solid #E5E5E3",
              boxShadow: "none",
              padding: "10px 16px",
            },
            ".Tab--selected": {
              border: "1px solid #FF6A1A",
              backgroundColor: "#FF6A1A08",
              color: "#FF6A1A",
            },
            ".Tab:hover": {
              border: "1px solid #FF6A1A60",
            },
            ".Error": {
              fontSize: "11px",
              marginTop: "4px",
            },
          },
        },
        locale: "auto",
      }}
    >
      <PaymentFormInner {...props} />
    </Elements>
  );
}
