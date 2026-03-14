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
import { markets, currencyConfigs, defaultCurrency, isValidCurrency } from "./config";
import type { Dictionary } from "./types";

interface LocaleContextType {
  locale: Locale;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: Dictionary;
  formatPrice: (price: number) => string;
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

  // Initialize currency: cookie > market default
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const cookieCurrency = getCurrencyFromCookie();
    return cookieCurrency || market.currency;
  });

  // Sync from cookie on mount (SSR → client hydration)
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

  const currencyConfig = currencyConfigs[currency];

  const formatPrice = useCallback((priceInEur: number): string => {
    // All prices in the system are stored in EUR (Medusa base).
    // Convert to selected currency and display.
    const converted = Math.round(priceInEur * currencyConfig.rate);
    return `${currencyConfig.symbol}${converted}`;
  }, [currencyConfig]);

  const localePath = useCallback((path: string): string => {
    if (path.startsWith("/")) {
      return `/${locale}${path}`;
    }
    return path;
  }, [locale]);

  return (
    <LocaleContext.Provider
      value={{ locale, currency, setCurrency, t: dictionary, formatPrice, localePath }}
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
