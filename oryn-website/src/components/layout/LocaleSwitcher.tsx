"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { useLocale } from "@/i18n/LocaleContext";
import { locales, markets } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

export function LocaleSwitcher() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentMarket = markets[locale];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get the path without the current locale prefix
  const getPathForLocale = (targetLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    return `/${targetLocale}${pathWithoutLocale}`;
  };

  const handleLocaleSwitch = (targetLocale: Locale) => {
    // Set cookie so middleware remembers preference
    document.cookie = `ORYN_LOCALE=${targetLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-mono text-oryn-black/50 hover:text-oryn-orange border border-oryn-orange/10 hover:border-oryn-orange/30 transition-all tracking-[0.1em]"
        aria-label="Switch market"
      >
        <span>{currentMarket.flag}</span>
        <span>{currentMarket.label}</span>
        <span className="text-oryn-orange">{currentMarket.symbol}</span>
        <svg
          width="8"
          height="8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-oryn-grey/30 shadow-lg z-50 min-w-[140px]">
          {locales.map((loc) => {
            const market = markets[loc];
            const isActive = loc === locale;

            return (
              <NextLink
                key={loc}
                href={getPathForLocale(loc)}
                onClick={() => handleLocaleSwitch(loc)}
                className={`flex items-center gap-2 px-4 py-2.5 text-[10px] font-mono tracking-[0.1em] transition-colors ${
                  isActive
                    ? "bg-oryn-orange/5 text-oryn-orange"
                    : "text-oryn-black/50 hover:bg-oryn-orange/5 hover:text-oryn-orange"
                }`}
              >
                <span>{market.flag}</span>
                <span>{market.label}</span>
                <span className="ml-auto text-oryn-orange/60">
                  {market.symbol}
                </span>
              </NextLink>
            );
          })}
        </div>
      )}
    </div>
  );
}
