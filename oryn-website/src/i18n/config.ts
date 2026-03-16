export const locales = ["en", "es", "fr", "de", "it", "pt", "nl", "pl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

// ── Medusa Regions ───────────────────────────────────────────────
// These map to the regions configured in Medusa admin (Settings → Regions)
export interface RegionConfig {
  id: string;
  name: string;
  currencyCode: string;
  symbol: string;
  flag: string;
}

export const regions: Record<string, RegionConfig> = {
  uk: {
    id: "reg_01KK4KPBQPT26E7XP9HCK4J6HW",
    name: "United Kingdom",
    currencyCode: "gbp",
    symbol: "\u00a3",
    flag: "\ud83c\uddec\ud83c\udde7",
  },
  europe: {
    id: "reg_01KK4KPBQ5WS8DH601007ZBCAW",
    name: "Europe",
    currencyCode: "eur",
    symbol: "\u20ac",
    flag: "\ud83c\uddea\ud83c\uddfa",
  },
  americas: {
    id: "reg_01KK4KPBR10Y4BX9G40JAV4ZFF",
    name: "Americas",
    currencyCode: "usd",
    symbol: "$",
    flag: "\ud83c\uddfa\ud83c\uddf8",
  },
};

export type RegionKey = keyof typeof regions;
export const regionKeys = Object.keys(regions) as RegionKey[];
export const defaultRegion: RegionKey = "europe";

// ── Markets (language config) ────────────────────────────────────
export interface Market {
  locale: Locale;
  defaultRegion: RegionKey;
  label: string;
  flag: string;
}

export const markets: Record<Locale, Market> = {
  en: { locale: "en", defaultRegion: "uk", label: "English", flag: "\ud83c\uddec\ud83c\udde7" },
  es: { locale: "es", defaultRegion: "europe", label: "Espa\u00f1ol", flag: "\ud83c\uddea\ud83c\uddf8" },
  fr: { locale: "fr", defaultRegion: "europe", label: "Fran\u00e7ais", flag: "\ud83c\uddeb\ud83c\uddf7" },
  de: { locale: "de", defaultRegion: "europe", label: "Deutsch", flag: "\ud83c\udde9\ud83c\uddea" },
  it: { locale: "it", defaultRegion: "europe", label: "Italiano", flag: "\ud83c\uddee\ud83c\uddf9" },
  pt: { locale: "pt", defaultRegion: "europe", label: "Portugu\u00eas", flag: "\ud83c\uddf5\ud83c\uddf9" },
  nl: { locale: "nl", defaultRegion: "europe", label: "Nederlands", flag: "\ud83c\uddf3\ud83c\uddf1" },
  pl: { locale: "pl", defaultRegion: "europe", label: "Polski", flag: "\ud83c\uddf5\ud83c\uddf1" },
};

// ── Country → region mapping ─────────────────────────────────────
export const countryToRegion: Record<string, RegionKey> = {
  GB: "uk",
  // Europe
  AT: "europe", BE: "europe", BG: "europe", CH: "europe", CY: "europe",
  CZ: "europe", DE: "europe", DK: "europe", EE: "europe", ES: "europe",
  FI: "europe", FR: "europe", GR: "europe", HR: "europe", HU: "europe",
  IE: "europe", IS: "europe", IT: "europe", LT: "europe", LU: "europe",
  LV: "europe", MT: "europe", NL: "europe", NO: "europe", PL: "europe",
  PT: "europe", RO: "europe", SE: "europe", SI: "europe", SK: "europe",
  // Americas
  US: "americas", CA: "americas", MX: "americas", BR: "americas",
  AR: "americas", CL: "americas", CO: "americas", PE: "americas",
  EC: "americas", VE: "americas", UY: "americas", PY: "americas",
  BO: "americas", CR: "americas", PA: "americas", DO: "americas",
  GT: "americas", AU: "americas", NZ: "americas",
};

// ── Country → locale mapping (for Vercel geo-detection) ─────────
// Maps ISO 3166-1 alpha-2 country codes to their most likely locale
export const countryToLocale: Record<string, Locale> = {
  // English
  GB: "en", IE: "en", US: "en", CA: "en", AU: "en", NZ: "en",
  // Spanish
  ES: "es", MX: "es", AR: "es", CL: "es", CO: "es", PE: "es",
  EC: "es", VE: "es", UY: "es", PY: "es", BO: "es", CR: "es",
  PA: "es", DO: "es", GT: "es", HN: "es", SV: "es", NI: "es", CU: "es",
  // French
  FR: "fr", BE: "fr", CH: "fr", LU: "fr", MC: "fr",
  // German
  DE: "de", AT: "de", LI: "de",
  // Italian
  IT: "it", SM: "it", VA: "it",
  // Portuguese
  PT: "pt", BR: "pt", AO: "pt", MZ: "pt",
  // Dutch
  NL: "nl",
  // Polish
  PL: "pl",
};

// ── Locale → Intl locale tag (for Intl.NumberFormat) ────────────
export const localeToIntlTag: Record<Locale, string> = {
  en: "en-GB",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  pt: "pt-PT",
  nl: "nl-NL",
  pl: "pl-PL",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function isValidRegion(region: string): region is RegionKey {
  return region in regions;
}
