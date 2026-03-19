"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Locale, RegionKey } from "./config";
import { markets, regions, defaultRegion, isValidRegion, localeToIntlTag } from "./config";
import type { Dictionary } from "./types";

interface LocaleContextType {
  locale: Locale;
  region: RegionKey;
  regionId: string;
  currencyCode: string;
  currencySymbol: string;
  setRegion: (region: RegionKey) => void;
  t: Dictionary;
  /** Format a price amount (already in the correct currency from Medusa). */
  formatPrice: (amount: number) => string;
  localePath: (path: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

function getRegionFromCookie(locale: Locale): RegionKey | null {
  if (typeof document === "undefined") return null;
  // First try locale-specific cookie (set by this version)
  const localeMatch = document.cookie.match(new RegExp(`ORYN_REGION_${locale}=([^;]+)`));
  if (localeMatch && isValidRegion(localeMatch[1])) {
    return localeMatch[1] as RegionKey;
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

  // Always initialize with defaultRegion to avoid SSR/client hydration mismatch.
  // Cookie-based region is synced in useEffect after hydration.
  const [region, setRegionState] = useState<RegionKey>(market.defaultRegion);

  useEffect(() => {
    const cookieRegion = getRegionFromCookie(locale);
    if (cookieRegion && cookieRegion !== market.defaultRegion) {
      setRegionState(cookieRegion);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setRegion = useCallback((newRegion: RegionKey) => {
    setRegionState(newRegion);
    document.cookie = `ORYN_REGION_${locale}=${newRegion};path=/;max-age=${60 * 60 * 24 * 365}`;
  }, [locale]);

  const regionConfig = regions[region];

  // Prices from Medusa are already in the region's currency — format with Intl.
  const formatPrice = useCallback((amount: number): string => {
    const intlTag = localeToIntlTag[locale];
    try {
      return new Intl.NumberFormat(intlTag, {
        style: "currency",
        currency: regionConfig.currencyCode.toUpperCase(),
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      // Fallback if Intl fails
      return `${regionConfig.symbol}${amount.toFixed(2)}`;
    }
  }, [regionConfig, locale]);

  const localePath = useCallback((path: string): string => {
    if (path.startsWith("/")) {
      return `/${locale}${path}`;
    }
    return path;
  }, [locale]);

  return (
    <LocaleContext.Provider
      value={{
        locale,
        region,
        regionId: regionConfig.id,
        currencyCode: regionConfig.currencyCode,
        currencySymbol: regionConfig.symbol,
        setRegion,
        t: dictionary,
        formatPrice,
        localePath,
      }}
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
