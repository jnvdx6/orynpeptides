export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export interface Market {
  locale: Locale;
  currency: string;
  currencyCode: string;
  symbol: string;
  label: string;
  flag: string;
}

export const markets: Record<Locale, Market> = {
  en: {
    locale: "en",
    currency: "GBP",
    currencyCode: "GBP",
    symbol: "\u00a3",
    label: "UK",
    flag: "\ud83c\uddec\ud83c\udde7",
  },
  es: {
    locale: "es",
    currency: "EUR",
    currencyCode: "EUR",
    symbol: "\u20ac",
    label: "EU",
    flag: "\ud83c\uddea\ud83c\uddfa",
  },
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
