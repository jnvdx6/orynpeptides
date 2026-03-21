/**
 * Shipping rates and regions for the cart estimator.
 * These match the Medusa backend shipping setup.
 */

export interface ShippingRegion {
  id: string;
  name: string;
  countries: string[];
  currency: string;
  standard: { amount: number; days: string };
  express: { amount: number; days: string };
  freeThreshold: number;
}

export const SHIPPING_REGIONS: ShippingRegion[] = [
  {
    id: "uk",
    name: "United Kingdom",
    countries: ["gb"],
    currency: "GBP",
    standard: { amount: 4.99, days: "2-4 business days" },
    express: { amount: 9.99, days: "1-2 business days" },
    freeThreshold: 130,
  },
  {
    id: "us",
    name: "United States",
    countries: ["us"],
    currency: "USD",
    standard: { amount: 5.99, days: "3-5 business days" },
    express: { amount: 14.99, days: "1-3 business days" },
    freeThreshold: 175,
  },
  {
    id: "europe",
    name: "Europe",
    countries: ["de", "fr", "es", "it", "nl", "be", "at", "ch", "pt", "ie"],
    currency: "EUR",
    standard: { amount: 8.99, days: "3-7 business days" },
    express: { amount: 15.99, days: "2-5 business days" },
    freeThreshold: 175,
  },
  {
    id: "brazil",
    name: "Brazil",
    countries: ["br"],
    currency: "EUR",
    standard: { amount: 14.99, days: "7-14 business days" },
    express: { amount: 24.99, days: "5-8 business days" },
    freeThreshold: 0,
  },
  {
    id: "row",
    name: "Rest of World",
    countries: [],
    currency: "EUR",
    standard: { amount: 17.99, days: "7-14 business days" },
    express: { amount: 29.99, days: "5-8 business days" },
    freeThreshold: 300,
  },
];

/** Get shipping region by country code */
export function getShippingRegion(countryCode: string): ShippingRegion {
  const code = countryCode.toLowerCase();
  const region = SHIPPING_REGIONS.find((r) => r.countries.includes(code));
  return region || SHIPPING_REGIONS[SHIPPING_REGIONS.length - 1]; // fallback to ROW
}

/** Get free shipping threshold for a region */
export function getRegionFreeThreshold(regionId: string): number {
  return SHIPPING_REGIONS.find((r) => r.id === regionId)?.freeThreshold ?? 175;
}
