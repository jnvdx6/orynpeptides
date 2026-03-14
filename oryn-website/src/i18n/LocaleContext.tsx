"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Locale, Currency } from "./config";
import { markets, currencyConfigs, isValidCurrency } from "./config";
import type { Dictionary } from "./types";

interface LocaleContextType {
  locale: Locale;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: Dictionary;
  /** Format price in selected currency. Input is always EUR (base). */
  formatPrice: (priceInEur: number) => string;
  /** Format price with USD equivalent for LATAM currencies. */
  formatPriceFull: (priceInEur: number) => { main: string; equivalent: string | null };
  localePath: (path: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

function getCurrencyFromCookie(): Currency | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/ORYN_CURRENCY=([^;]+)/);
  if (match && isValidCurrency(match[1])) {
    return match[1] as Currency;
  }
  return null;
}

function formatNumber(n: number, sep: string): string {
  if (n >= 1000) {
    // Add thousands separator
    const parts = Math.round(n).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep === "," ? "." : ",");
    return parts.join(sep);
  }
  return Math.round(n).toString();
}

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) {
  const market = markets[locale];

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const cookieCurrency = getCurrencyFromCookie();
    return cookieCurrency || market.currency;
  });

  useEffect(() => {
    const cookieCurrency = getCurrencyFromCookie();
    if (cookieCurrency && cookieCurrency !== currency) {
      setCurrencyState(cookieCurrency);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCurrency = useCallback((newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    document.cookie = `ORYN_CURRENCY=${newCurrency};path=/;max-age=${60 * 60 * 24 * 365}`;
  }, []);

  const config = currencyConfigs[currency];
  const usdConfig = currencyConfigs.USD;

  const formatPrice = useCallback((priceInEur: number): string => {
    const converted = priceInEur * config.rate;
    return `${config.symbol}${formatNumber(converted, config.decimalSep)}`;
  }, [config]);

  const formatPriceFull = useCallback((priceInEur: number): { main: string; equivalent: string | null } => {
    const converted = priceInEur * config.rate;
    const main = `${config.symbol}${formatNumber(converted, config.decimalSep)}`;

    if (config.showUsdEquivalent) {
      const usdConverted = priceInEur * usdConfig.rate;
      return { main, equivalent: `~$${formatNumber(usdConverted, ".")} USD` };
    }
    return { main, equivalent: null };
  }, [config, usdConfig]);

  const localePath = useCallback((path: string): string => {
    if (path.startsWith("/")) {
      return `/${locale}${path}`;
    }
    return path;
  }, [locale]);

  return (
    <LocaleContext.Provider
      value={{ locale, currency, setCurrency, t: dictionary, formatPrice, formatPriceFull, localePath }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
