"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import type { Locale } from "./config";
import { markets } from "./config";
import type { Dictionary } from "./types";

interface LocaleContextType {
  locale: Locale;
  t: Dictionary;
  formatPrice: (price: number) => string;
  localePath: (path: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

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

  const formatPrice = (price: number): string => {
    return `${market.symbol}${price}`;
  };

  const localePath = (path: string): string => {
    if (path.startsWith("/")) {
      return `/${locale}${path}`;
    }
    return path;
  };

  return (
    <LocaleContext.Provider
      value={{ locale, t: dictionary, formatPrice, localePath }}
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
