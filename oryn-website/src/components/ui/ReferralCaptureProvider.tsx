"use client";

import { useReferralCapture } from "@/hooks/useReferralCapture";

/**
 * Invisible component that captures ?ref=CODE from URL params
 * and stores it in localStorage for use during registration/checkout.
 */
export function ReferralCaptureProvider() {
  useReferralCapture();
  return null;
}
