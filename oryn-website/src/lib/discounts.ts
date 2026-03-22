// Free shipping thresholds by currency (in major currency units)
const FREE_SHIPPING_BY_CURRENCY: Record<string, number> = {
  GBP: 130,
  USD: 175,
  EUR: 175,
  BRL: 750,
};

/** Get free shipping threshold for a given currency */
export function getFreeShippingThreshold(currency?: string): number {
  return FREE_SHIPPING_BY_CURRENCY[(currency || "EUR").toUpperCase()] ?? 175;
}

// Default threshold (EUR) for backward compatibility
export const FREE_SHIPPING_THRESHOLD = 175;

// Volume discount tiers
export interface VolumeDiscount {
  minItems: number;
  percentage: number;
  label: string;
}

export const VOLUME_TIERS: VolumeDiscount[] = [
  { minItems: 5, percentage: 15, label: "15% OFF" },
  { minItems: 3, percentage: 10, label: "10% OFF" },
  // 1-2 items = no discount
];

// First purchase discount
export const FIRST_PURCHASE_DISCOUNT = {
  percentage: 10,
  code: "WELCOME10",
  label: "10% off your first order",
};

// Referral discount for the referred user
export const REFERRAL_DISCOUNT = {
  percentage: 10,
  label: "10% off with referral",
};

/**
 * Calculate the volume discount for a given number of items.
 * Returns the best applicable tier or null.
 */
export function getVolumeDiscount(totalItems: number): VolumeDiscount | null {
  for (const tier of VOLUME_TIERS) {
    if (totalItems >= tier.minItems) {
      return tier;
    }
  }
  return null;
}

/**
 * Calculate the volume discount amount.
 */
export function calculateVolumeDiscount(
  subtotal: number,
  totalItems: number
): { discount: number; tier: VolumeDiscount } | null {
  const tier = getVolumeDiscount(totalItems);
  if (!tier) return null;
  const discount = Math.round((subtotal * tier.percentage) / 100 * 100) / 100;
  return { discount, tier };
}

/**
 * Get the next volume tier the user can reach.
 */
export function getNextTier(
  totalItems: number
): { itemsNeeded: number; tier: VolumeDiscount } | null {
  // Find the next tier they haven't reached
  const sortedTiers = [...VOLUME_TIERS].sort((a, b) => a.minItems - b.minItems);
  for (const tier of sortedTiers) {
    if (totalItems < tier.minItems) {
      return { itemsNeeded: tier.minItems - totalItems, tier };
    }
  }
  return null;
}

// Cookie keys
export const FIRST_VISIT_KEY = "oryn_first_visit";
export const FIRST_PURCHASE_KEY = "oryn_has_purchased";
export const REFERRAL_CODE_KEY = "oryn_ref_code";
export const EXIT_INTENT_SHOWN_KEY = "oryn_exit_shown";
export const CHECKOUT_EXIT_INTENT_SHOWN_KEY = "oryn_checkout_exit_shown";
