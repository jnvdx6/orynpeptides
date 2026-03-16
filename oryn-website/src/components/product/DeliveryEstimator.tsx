"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/i18n/LocaleContext";
import { localeToIntlTag } from "@/i18n/config";
import { getFreeShippingThreshold } from "@/lib/discounts";

const CUTOFF_HOUR = 14; // 2pm cutoff
const MIN_BUSINESS_DAYS_BEFORE = 2; // before cutoff
const MIN_BUSINESS_DAYS_AFTER = 3; // after cutoff
const EXTRA_BUSINESS_DAYS = 3; // added to min for max range

/** Add N business days to a date (skips Sat/Sun) */
function addBusinessDays(from: Date, days: number): Date {
  const result = new Date(from);
  let remaining = days;
  while (remaining > 0) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) remaining--;
  }
  return result;
}

/** Format a date for display (short month + day) */
function formatDeliveryDate(date: Date, dateLocale: string): string {
  return date.toLocaleDateString(dateLocale, {
    day: "numeric",
    month: "short",
  });
}

const i18n = {
  en: {
    orderWithin: "Order within",
    forDeliveryBy: "for delivery by",
    estDelivery: "Est. delivery",
    freeShipping: (amount: number) => `Free shipping on orders over €${amount}`,
  },
  es: {
    orderWithin: "Pide en las próximas",
    forDeliveryBy: "para entrega el",
    estDelivery: "Entrega est.",
    freeShipping: (amount: number) => `Envío gratis en pedidos superiores a €${amount}`,
  },
} as const;

function getStrings(locale: string) {
  return locale === "es" ? i18n.es : i18n.en;
}

export function DeliveryEstimator() {
  const { locale } = useLocale();
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    function calcTimeLeft() {
      const now = new Date();
      const hour = now.getHours();
      if (hour >= CUTOFF_HOUR) return null;
      const cutoff = new Date(now);
      cutoff.setHours(CUTOFF_HOUR, 0, 0, 0);
      const diffMs = cutoff.getTime() - now.getTime();
      if (diffMs <= 0) return null;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return { hours, minutes };
    }

    setTimeLeft(calcTimeLeft());
    const interval = setInterval(() => setTimeLeft(calcTimeLeft()), 30_000);
    return () => clearInterval(interval);
  }, []);

  // Calculate delivery range
  const now = new Date();
  const isBeforeCutoff = now.getHours() < CUTOFF_HOUR;
  const minDays = isBeforeCutoff ? MIN_BUSINESS_DAYS_BEFORE : MIN_BUSINESS_DAYS_AFTER;

  const minDate = addBusinessDays(now, minDays);
  const maxDate = addBusinessDays(minDate, EXTRA_BUSINESS_DAYS);

  const dateLocale = localeToIntlTag[locale as keyof typeof localeToIntlTag] || "en-GB";
  const minFormatted = formatDeliveryDate(minDate, dateLocale);
  const maxFormatted = formatDeliveryDate(maxDate, dateLocale);

  const strings = getStrings(locale);
  const threshold = getFreeShippingThreshold("EUR");

  // Before mount, render static range only (no countdown) to avoid hydration mismatch
  const showCountdown = mounted && timeLeft !== null;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200/50">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#16a34a"
          strokeWidth="1.5"
          className="shrink-0"
        >
          <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
        <div className="flex flex-col">
          {showCountdown ? (
            <span className="text-[10px] font-mono text-green-700 tracking-[0.05em]">
              {strings.orderWithin}{" "}
              <strong className="text-green-800">
                {timeLeft.hours}h {timeLeft.minutes.toString().padStart(2, "0")}m
              </strong>{" "}
              {strings.forDeliveryBy} <strong>{minFormatted}</strong>
            </span>
          ) : null}
          <span className="text-[10px] font-mono text-green-700 tracking-[0.05em]">
            {strings.estDelivery}{" "}
            <strong>
              {minFormatted} – {maxFormatted}
            </strong>
          </span>
        </div>
      </div>
      <span className="text-[9px] font-mono text-neutral-400 tracking-[0.04em] px-3">
        {strings.freeShipping(threshold)}
      </span>
    </div>
  );
}
