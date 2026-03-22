"use client";

import { useReferralCapture } from "@/hooks/useReferralCapture";
import { usePromoCapture } from "@/hooks/usePromoCapture";

/**
 * Invisible component that captures ?ref=CODE and ?promo=CODE from URL params
 * and stores them in localStorage for use during registration/checkout.
 */
export function ReferralCaptureProvider() {
  useReferralCapture();
  usePromoCapture();
  return null;
}
