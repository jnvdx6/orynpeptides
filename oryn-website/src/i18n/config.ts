export const locales = ["en", "es", "fr", "de", "it", "pt", "nl", "pl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export interface Market {
  locale: Locale;
  currency: string;
  currencyCode: string;
  symbol: string;
  label: string;
  flag: string;
  region: string;
}

export const markets: Record<Locale, Market> = {
  en: {
    locale: "en",
    currency: "GBP",
    currencyCode: "GBP",
    symbol: "\u00a3",
    label: "UK",
    flag: "\ud83c\uddec\ud83c\udde7",
    region: "Europe",
  },
  es: {
    locale: "es",
    currency: "EUR",
    currencyCode: "EUR",
    symbol: "\u20ac",
    label: "Espa\u00f1a",
    flag: "\ud83c\uddea\ud83c\uddf8",
    region: "Europe",
  },
  fr: {
    locale: "fr",
    currency: "EUR",
    currencyCode: "EUR",
    symbol: "\u20ac",
    label: "France",
    flag: "\ud83c\uddeb\ud83c\uddf7",
    region: "Europe",
  },
  de: {
    locale: "de",
    currency: "EUR",
    currencyCode: "EUR",
    symbol: "\u20ac",
    label: "Deutschland",
    flag: "\ud83c\udde9\ud83c\uddea",
    region: "Europe",
  },
  it: {
    locale: "it",
    currency: "EUR",
    currencyCode: "EUR",
    symbol: "\u20ac",
    label: "Italia",
    flag: "\ud83c\uddee\ud83c\uddf9",
    region: "Europe",
  },
  pt: {
    locale: "pt",
    currency: "EUR",
    currencyCode: "EUR",
    symbol: "\u20ac",
    label: "Portugal",
    flag: "\ud83c\uddf5\ud83c\uddf9",
    region: "Europe",
  },
  nl: {
    locale: "nl",
    currency: "EUR",
    currencyCode: "EUR",
    symbol: "\u20ac",
    label: "Nederland",
    flag: "\ud83c\uddf3\ud83c\uddf1",
    region: "Europe",
  },
  pl: {
    locale: "pl",
    currency: "EUR",
    currencyCode: "EUR",
    symbol: "\u20ac",
    label: "Polska",
    flag: "\ud83c\uddf5\ud83c\uddf1",
    region: "Europe",
  },
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
