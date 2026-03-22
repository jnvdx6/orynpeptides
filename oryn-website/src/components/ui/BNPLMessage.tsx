"use client";

import { useLocale } from "@/i18n/LocaleContext";

interface BNPLMessageProps {
  price: number;
  /** Compact mode for product cards — single line, smaller text */
  compact?: boolean;
}

const COPY = {
  en: { or: "or", payments: "interest-free payments of", with: "with" },
  es: { or: "o", payments: "pagos sin intereses de", with: "con" },
} as const;

/**
 * Shows "Pay in 3 installments of €X.XX" messaging below prices.
 * Supports Klarna (EU) and Clearpay (UK) based on locale/currency.
 */
export function BNPLMessage({ price, compact = false }: BNPLMessageProps) {
  const { formatPrice, currencyCode, locale } = useLocale();

  // Only show for prices >= 30 (Klarna/Clearpay minimum thresholds)
  if (price < 30) return null;

  const installments = 3;
  const perInstallment = Math.ceil((price / installments) * 100) / 100;
  const providerName = currencyCode === "GBP" ? "Clearpay" : "Klarna";
  const copy = COPY[locale as keyof typeof COPY] || COPY.en;

  if (compact) {
    return (
      <p className="text-[10px] text-oryn-black/40 font-plex">
        {installments}x {formatPrice(perInstallment)} {copy.with} {providerName}
      </p>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF6A1A"
        strokeWidth="1.5"
        className="shrink-0"
      >
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
      <p className="text-xs text-oryn-black/50 font-plex">
        {copy.or} {installments} {copy.payments}{" "}
        <span className="font-medium text-oryn-orange">{formatPrice(perInstallment)}</span>{" "}
        {copy.with} {providerName}
      </p>
    </div>
  );
}
