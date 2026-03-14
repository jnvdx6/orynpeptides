export const locales = ["en", "es", "fr", "de", "it", "pt", "nl", "pl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

// ── Currencies (independent of language) ─────────────────────────
export const currencies = [
  "GBP", "EUR", "USD",
  "MXN", "BRL", "COP", "ARS", "CLP", "PEN",
] as const;
export type Currency = (typeof currencies)[number];
export const defaultCurrency: Currency = "EUR";

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  label: string;
  flag: string;
  // Conversion rate from EUR (base). EUR = 1.0
  rate: number;
  // Show USD equivalent alongside local price
  showUsdEquivalent: boolean;
  // Decimal separator for display
  decimalSep: string;
}

export const currencyConfigs: Record<Currency, CurrencyConfig> = {
  GBP: { code: "GBP", symbol: "\u00a3", label: "GBP", flag: "\ud83c\uddec\ud83c\udde7", rate: 0.86, showUsdEquivalent: false, decimalSep: "." },
  EUR: { code: "EUR", symbol: "\u20ac", label: "EUR", flag: "\ud83c\uddea\ud83c\uddfa", rate: 1.0, showUsdEquivalent: false, decimalSep: "," },
  USD: { code: "USD", symbol: "$", label: "USD", flag: "\ud83c\uddfa\ud83c\uddf8", rate: 1.08, showUsdEquivalent: false, decimalSep: "." },
  MXN: { code: "MXN", symbol: "MX$", label: "MXN", flag: "\ud83c\uddf2\ud83c\uddfd", rate: 18.5, showUsdEquivalent: true, decimalSep: "." },
  BRL: { code: "BRL", symbol: "R$", label: "BRL", flag: "\ud83c\udde7\ud83c\uddf7", rate: 5.9, showUsdEquivalent: true, decimalSep: "," },
  COP: { code: "COP", symbol: "COL$", label: "COP", flag: "\ud83c\udde8\ud83c\uddf4", rate: 4500, showUsdEquivalent: true, decimalSep: "." },
  ARS: { code: "ARS", symbol: "AR$", label: "ARS", flag: "\ud83c\udde6\ud83c\uddf7", rate: 1100, showUsdEquivalent: true, decimalSep: "," },
  CLP: { code: "CLP", symbol: "CLP$", label: "CLP", flag: "\ud83c\udde8\ud83c\uddf1", rate: 1020, showUsdEquivalent: true, decimalSep: "." },
  PEN: { code: "PEN", symbol: "S/", label: "PEN", flag: "\ud83c\uddf5\ud83c\uddea", rate: 4.0, showUsdEquivalent: true, decimalSep: "." },
};

// Currencies grouped for the selector UI
export const currencyGroups = [
  { label: "Main", currencies: ["GBP", "EUR", "USD"] as Currency[] },
  { label: "Americas", currencies: ["MXN", "BRL", "COP", "ARS", "CLP", "PEN"] as Currency[] },
];

// ── Markets (language + default currency mapping) ────────────────
export interface Market {
  locale: Locale;
  currency: Currency;
  label: string;
  flag: string;
  region: string;
}

export const markets: Record<Locale, Market> = {
  en: { locale: "en", currency: "GBP", label: "English", flag: "\ud83c\uddec\ud83c\udde7", region: "Europe" },
  es: { locale: "es", currency: "EUR", label: "Espa\u00f1ol", flag: "\ud83c\uddea\ud83c\uddf8", region: "Europe" },
  fr: { locale: "fr", currency: "EUR", label: "Fran\u00e7ais", flag: "\ud83c\uddeb\ud83c\uddf7", region: "Europe" },
  de: { locale: "de", currency: "EUR", label: "Deutsch", flag: "\ud83c\udde9\ud83c\uddea", region: "Europe" },
  it: { locale: "it", currency: "EUR", label: "Italiano", flag: "\ud83c\uddee\ud83c\uddf9", region: "Europe" },
  pt: { locale: "pt", currency: "EUR", label: "Portugu\u00eas", flag: "\ud83c\uddf5\ud83c\uddf9", region: "Europe" },
  nl: { locale: "nl", currency: "EUR", label: "Nederlands", flag: "\ud83c\uddf3\ud83c\uddf1", region: "Europe" },
  pl: { locale: "pl", currency: "EUR", label: "Polski", flag: "\ud83c\uddf5\ud83c\uddf1", region: "Europe" },
};

// ── Country → language + currency mapping ────────────────────────
export const countryDefaults: Record<string, { locale: Locale; currency: Currency }> = {
  // UK & Ireland
  GB: { locale: "en", currency: "GBP" },
  IE: { locale: "en", currency: "EUR" },
  // Americas
  US: { locale: "en", currency: "USD" },
  CA: { locale: "en", currency: "USD" },
  MX: { locale: "es", currency: "MXN" },
  CO: { locale: "es", currency: "COP" },
  AR: { locale: "es", currency: "ARS" },
  CL: { locale: "es", currency: "CLP" },
  PE: { locale: "es", currency: "PEN" },
  EC: { locale: "es", currency: "USD" },
  VE: { locale: "es", currency: "USD" },
  UY: { locale: "es", currency: "USD" },
  PY: { locale: "es", currency: "USD" },
  BO: { locale: "es", currency: "USD" },
  CR: { locale: "es", currency: "USD" },
  PA: { locale: "es", currency: "USD" },
  DO: { locale: "es", currency: "USD" },
  GT: { locale: "es", currency: "USD" },
  HN: { locale: "es", currency: "USD" },
  SV: { locale: "es", currency: "USD" },
  NI: { locale: "es", currency: "USD" },
  CU: { locale: "es", currency: "USD" },
  PR: { locale: "es", currency: "USD" },
  BR: { locale: "pt", currency: "BRL" },
  // Europe
  FR: { locale: "fr", currency: "EUR" },
  DE: { locale: "de", currency: "EUR" },
  AT: { locale: "de", currency: "EUR" },
  CH: { locale: "de", currency: "EUR" },
  IT: { locale: "it", currency: "EUR" },
  PT: { locale: "pt", currency: "EUR" },
  ES: { locale: "es", currency: "EUR" },
  NL: { locale: "nl", currency: "EUR" },
  BE: { locale: "nl", currency: "EUR" },
  PL: { locale: "pl", currency: "EUR" },
  LU: { locale: "fr", currency: "EUR" },
  MC: { locale: "fr", currency: "EUR" },
  SE: { locale: "en", currency: "EUR" },
  DK: { locale: "en", currency: "EUR" },
  NO: { locale: "en", currency: "EUR" },
  FI: { locale: "en", currency: "EUR" },
  IS: { locale: "en", currency: "EUR" },
  CZ: { locale: "en", currency: "EUR" },
  SK: { locale: "en", currency: "EUR" },
  HU: { locale: "en", currency: "EUR" },
  RO: { locale: "en", currency: "EUR" },
  BG: { locale: "en", currency: "EUR" },
  HR: { locale: "en", currency: "EUR" },
  SI: { locale: "en", currency: "EUR" },
  LT: { locale: "en", currency: "EUR" },
  LV: { locale: "en", currency: "EUR" },
  EE: { locale: "en", currency: "EUR" },
  GR: { locale: "en", currency: "EUR" },
  CY: { locale: "en", currency: "EUR" },
  MT: { locale: "en", currency: "EUR" },
  // Oceania
  AU: { locale: "en", currency: "USD" },
  NZ: { locale: "en", currency: "USD" },
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function isValidCurrency(currency: string): currency is Currency {
  return currencies.includes(currency as Currency);
}
