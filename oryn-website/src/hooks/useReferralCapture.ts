"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { REFERRAL_CODE_KEY } from "@/lib/discounts";

/**
 * Captures ?ref=CODE from URL and stores it in localStorage.
 * Used to pre-fill referral code in registration and apply referral discount at checkout.
 */
export function useReferralCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const refCode = searchParams.get("ref");
    if (refCode) {
      localStorage.setItem(REFERRAL_CODE_KEY, refCode.toUpperCase());
    }
  }, [searchParams]);

  return {
    getCapturedCode: () => {
      if (typeof window === "undefined") return null;
      return localStorage.getItem(REFERRAL_CODE_KEY);
    },
    clearCapturedCode: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(REFERRAL_CODE_KEY);
      }
    },
  };
}
