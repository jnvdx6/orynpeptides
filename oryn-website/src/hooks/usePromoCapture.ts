"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const PROMO_CODE_KEY = "oryn_promo_code";

/**
 * Captures ?promo=CODE from URL and stores it in localStorage.
 * Used to auto-apply promo codes when the user reaches checkout.
 */
export function usePromoCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const promoCode = searchParams.get("promo");
    if (promoCode) {
      localStorage.setItem(PROMO_CODE_KEY, promoCode.trim().toUpperCase());
    }
  }, [searchParams]);
}

export function getCapturedPromoCode(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(PROMO_CODE_KEY);
}

export function clearCapturedPromoCode(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(PROMO_CODE_KEY);
  }
}
