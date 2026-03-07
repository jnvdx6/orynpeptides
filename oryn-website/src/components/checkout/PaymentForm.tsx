"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

interface PaymentFormProps {
  amount: number;
  formatPrice: (n: number) => string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (message: string) => void;
  onBack: () => void;
  backLabel: string;
  payLabel: string;
  processingLabel: string;
}

export function PaymentForm({
  amount,
  formatPrice,
  onSuccess,
  onError,
  onBack,
  backLabel,
  payLabel,
  processingLabel,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/en/checkout/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      onError(error.message || "Payment failed");
      setIsProcessing(false);
    } else if (paymentIntent) {
      if (paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent.id);
      } else if (paymentIntent.status === "requires_action") {
        // 3D Secure or other authentication is handled automatically
        setIsProcessing(false);
      } else {
        setErrorMessage("Payment was not completed. Please try again.");
        setIsProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: {
            type: "accordion",
            defaultCollapsed: false,
            radios: true,
            spacedAccordionItems: true,
          },
          business: {
            name: "ORYN Peptide Labs",
          },
        }}
      />

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isProcessing}
          className="px-6 py-4 border border-oryn-grey text-sm font-medium hover:border-oryn-orange transition-colors disabled:opacity-40"
        >
          {backLabel}
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 py-4 bg-oryn-orange text-white font-bold text-sm tracking-wide hover:bg-oryn-orange-dark transition-all shadow-lg shadow-oryn-orange/20 disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-3">
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
              {processingLabel}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              {formatPrice(amount)} — {payLabel}
            </span>
          )}
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
        </button>
      </div>

      {/* Security badges */}
      <div className="flex items-center justify-center gap-6 pt-2">
        <div className="flex items-center gap-1.5">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#999"
            strokeWidth="1.5"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="text-[9px] font-mono text-oryn-black/30 tracking-wider">
            SSL ENCRYPTED
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#999"
            strokeWidth="1.5"
          >
            <rect x="1" y="4" width="22" height="16" rx="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
          <span className="text-[9px] font-mono text-oryn-black/30 tracking-wider">
            PCI COMPLIANT
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="40" height="16" viewBox="0 0 80 32" fill="none">
            <text
              x="0"
              y="22"
              fill="#635BFF"
              fontSize="20"
              fontWeight="700"
              fontFamily="system-ui"
            >
              stripe
            </text>
          </svg>
        </div>
      </div>
    </form>
  );
}
