"use client";

import {
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type { StripeExpressCheckoutElementConfirmEvent } from "@stripe/stripe-js";
import { useLocale } from "@/i18n/LocaleContext";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

interface ExpressCheckoutProps {
  onSuccess: (orderId: string, orderRef: string) => void;
  onError: (message: string) => void;
  totalItems?: number;
  amount?: number;
  dividerLabel?: string;
}

export function ExpressCheckout({ onSuccess, onError, totalItems, amount, dividerLabel }: ExpressCheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { locale, currencyCode } = useLocale();
  const { cart, completeCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const onConfirm = async (event: StripeExpressCheckoutElementConfirmEvent) => {
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      const returnUrl = new URL(`${window.location.origin}/${locale}/checkout/success`);
      if (amount) returnUrl.searchParams.set("total", String(amount));
      if (totalItems) returnUrl.searchParams.set("items_count", String(totalItems));
      const shippingCountry = (cart?.shipping_address?.country_code as string)?.toUpperCase();
      if (shippingCountry) returnUrl.searchParams.set("shipping_country", shippingCountry);
      returnUrl.searchParams.set("currency", currencyCode.toUpperCase());

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl.toString(),
        },
        redirect: "if_required",
      });

      if (error) {
        const pi = error.payment_intent;
        if (pi && (pi.status === "requires_capture" || pi.status === "succeeded")) {
          await handlePaymentCompleted();
          return;
        }
        onError(error.message || "Payment failed");
        setLoading(false);
        return;
      }

      if (paymentIntent && (paymentIntent.status === "succeeded" || paymentIntent.status === "requires_capture")) {
        await handlePaymentCompleted();
      } else {
        setLoading(false);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Payment failed";
      onError(message);
      setLoading(false);
    }
  };

  async function handlePaymentCompleted() {
    try {
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
    } catch {
      onError("Payment processed but order creation failed. Please contact support.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`express-checkout-wrapper ${!visible ? "hidden" : ""}`}>
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
              klarna: "pay",
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
              "amazonPay",
              "link",
            ],
          }}
        />
      </div>

      {/* Divider between express checkout and regular payment */}
      <div className="flex items-center gap-4 my-5">
        <div className="flex-1 h-px bg-oryn-grey/30" />
        <span className="text-[10px] font-mono text-oryn-black/30 tracking-wider">
          {dividerLabel || "OR PAY WITH CARD"}
        </span>
        <div className="flex-1 h-px bg-oryn-grey/30" />
      </div>
    </div>
  );
}
