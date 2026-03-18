"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { type ReactNode } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const STRIPE_LOCALE_MAP: Record<string, string> = {
  en: "en", es: "es", fr: "fr", de: "de", it: "it",
  pt: "pt", "pt-br": "pt-BR", nl: "nl", pl: "pl",
};

interface StripeProviderProps {
  clientSecret: string;
  children: ReactNode;
  locale?: string;
}

export function StripeProvider({ clientSecret, children, locale }: StripeProviderProps) {
  const options: StripeElementsOptions = {
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
          textTransform: "uppercase",
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
    locale: (locale ? STRIPE_LOCALE_MAP[locale] ?? "auto" : "auto") as "auto",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
