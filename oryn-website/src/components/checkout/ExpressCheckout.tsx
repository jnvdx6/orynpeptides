"use client";

import {
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type { StripeExpressCheckoutElementConfirmEvent } from "@stripe/stripe-js";

interface ExpressCheckoutProps {
  onSuccess: (paymentIntentId: string) => void;
  onError: (message: string) => void;
}

export function ExpressCheckout({ onSuccess, onError }: ExpressCheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();

  const onConfirm = async (event: StripeExpressCheckoutElementConfirmEvent) => {
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/en/checkout/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      onError(error.message || "Payment failed");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent.id);
    }
  };

  return (
    <div className="express-checkout-wrapper">
      <ExpressCheckoutElement
        onConfirm={onConfirm}
        options={{
          buttonType: {
            applePay: "buy",
            googlePay: "buy",
          },
          buttonTheme: {
            applePay: "black",
            googlePay: "black",
          },
          layout: {
            maxColumns: 3,
            maxRows: 1,
            overflow: "auto",
          },
        }}
      />
    </div>
  );
}
