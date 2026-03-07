"use client";

import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "@/providers/cart";
import { useState } from "react";
import { sdk } from "@/lib/medusa";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface StripeCheckoutProps {
  onSuccess: (orderId: string, orderRef: string) => void;
  onError: (message: string) => void;
  disabled?: boolean;
}

function StripeForm({ onSuccess, onError, disabled }: StripeCheckoutProps) {
  const { cart, completeCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  async function handlePayment(e: React.FormEvent) {
    e.preventDefault();
    const card = elements?.getElement(CardElement);

    if (!stripe || !elements || !card || !cart) {
      onError("Payment system not ready. Please try again.");
      return;
    }

    const clientSecret = cart.payment_collection?.payment_sessions?.[0]?.data
      ?.client_secret as string;

    if (!clientSecret) {
      onError("Payment session not initialized. Please refresh and try again.");
      return;
    }

    setLoading(true);

    try {
      // Confirm the card payment with Stripe
      const { error: stripeError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
            billing_details: {
              name: [
                cart.billing_address?.first_name as string,
                cart.billing_address?.last_name as string,
              ]
                .filter(Boolean)
                .join(" "),
              email: cart.email as string,
              phone: cart.billing_address?.phone as string,
              address: {
                city: cart.billing_address?.city as string,
                country: cart.billing_address?.country_code as string,
                line1: cart.billing_address?.address_1 as string,
                line2: (cart.billing_address?.address_2 as string) || undefined,
                postal_code: cart.billing_address?.postal_code as string,
              },
            },
          },
        }
      );

      if (stripeError) {
        onError(stripeError.message || "Payment failed. Please try again.");
        setLoading(false);
        return;
      }

      // Payment confirmed by Stripe - now complete the cart in Medusa
      const result = await completeCart();

      if (result.type === "order" && result.order) {
        const order = result.order as { id: string; display_id?: number };
        const orderId = order.id;
        const orderRef = order.display_id
          ? `ORY-${order.display_id}`
          : `ORY-${orderId.slice(-6).toUpperCase()}`;
        onSuccess(orderId, orderRef);
      } else {
        onError(
          "Payment was processed but order creation failed. Contact support."
        );
      }
    } catch (err) {
      console.error("Payment error:", err);
      onError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handlePayment}>
      <div className="p-6 bg-oryn-grey-light border border-oryn-grey/30">
        <label className="block text-[10px] font-mono text-oryn-black/40 tracking-wider mb-4">
          CARD DETAILS
        </label>
        <div className="bg-white p-4 border border-oryn-grey/30">
          <CardElement
            onChange={(e) => setCardComplete(e.complete)}
            options={{
              style: {
                base: {
                  fontSize: "14px",
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "#1a1a1a",
                  letterSpacing: "0.05em",
                  "::placeholder": {
                    color: "#9ca3af",
                  },
                },
                invalid: {
                  color: "#ef4444",
                },
              },
              hidePostalCode: true,
            }}
          />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF6A1A"
            strokeWidth="1.5"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="text-[9px] font-mono text-oryn-black/40 tracking-wider">
            SECURED BY STRIPE - PCI DSS COMPLIANT
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || disabled || !cardComplete || !stripe}
        className="w-full mt-4 py-4 bg-oryn-orange text-white font-bold text-sm tracking-wide hover:bg-oryn-orange-dark transition-colors shadow-lg shadow-oryn-orange/20 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
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
            PROCESSING PAYMENT...
          </span>
        ) : (
          "PAY NOW"
        )}
      </button>
    </form>
  );
}

export default function StripeCheckout(props: StripeCheckoutProps) {
  const { cart } = useCart();

  const clientSecret = cart?.payment_collection?.payment_sessions?.[0]?.data
    ?.client_secret as string | undefined;

  if (!clientSecret) {
    return (
      <div className="p-6 bg-oryn-grey-light border border-oryn-grey/30 text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-oryn-grey/30 rounded w-3/4 mx-auto mb-2" />
          <div className="h-4 bg-oryn-grey/30 rounded w-1/2 mx-auto" />
        </div>
        <p className="text-[10px] font-mono text-oryn-black/30 mt-3">
          INITIALIZING SECURE PAYMENT...
        </p>
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
            fontFamily: "'IBM Plex Mono', monospace",
          },
        },
      }}
    >
      <StripeForm {...props} />
    </Elements>
  );
}
