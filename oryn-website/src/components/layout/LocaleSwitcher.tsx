"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { useLocale } from "@/i18n/LocaleContext";
import { locales, markets, currencyGroups, currencyConfigs } from "@/i18n/config";
import type { Locale, Currency } from "@/i18n/config";

export function LocaleSwitcher() {
  const { locale, currency, setCurrency } = useLocale();
  const pathname = usePathname();
  const [openLang, setOpenLang] = useState(false);
  const [openCurrency, setOpenCurrency] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const currRef = useRef<HTMLDivElement>(null);

  const currentMarket = markets[locale];
  const currentCurrency = currencyConfigs[currency];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setOpenLang(false);
      if (currRef.current && !currRef.current.contains(e.target as Node)) setOpenCurrency(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPathForLocale = (targetLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    return `/${targetLocale}${pathWithoutLocale}`;
  };

  const handleLocaleSwitch = (targetLocale: Locale) => {
    document.cookie = `ORYN_LOCALE=${targetLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
    setOpenLang(false);
  };

  const handleCurrencySwitch = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    setOpenCurrency(false);
  };

  const btnClass =
    "flex items-center gap-1.5 px-2 py-1.5 text-[10px] font-mono text-oryn-black/50 hover:text-oryn-orange border border-oryn-orange/10 hover:border-oryn-orange/30 transition-all tracking-[0.1em]";

  return (
    <div className="flex items-center gap-1">
      {/* Language selector */}
      <div className="relative" ref={langRef}>
        <button
          onClick={() => { setOpenLang(!openLang); setOpenCurrency(false); }}
          className={btnClass}
          aria-label="Switch language"
        >
          <span>{currentMarket.flag}</span>
          <span className="hidden sm:inline">{currentMarket.label}</span>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`transition-transform ${openLang ? "rotate-180" : ""}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {openLang && (
          <div className="absolute top-full right-0 mt-1 bg-white border border-oryn-grey/30 shadow-lg z-50 min-w-[160px] max-h-[320px] overflow-y-auto">
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
                  <span className="text-sm">{market.flag}</span>
                  <span>{market.label}</span>
                </NextLink>
              );
            })}
          </div>
        )}
      </div>

      {/* Currency selector — grouped */}
      <div className="relative" ref={currRef}>
        <button
          onClick={() => { setOpenCurrency(!openCurrency); setOpenLang(false); }}
          className={btnClass}
          aria-label="Switch currency"
        >
          <span className="text-oryn-orange">{currentCurrency.symbol}</span>
          <span>{currentCurrency.label}</span>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`transition-transform ${openCurrency ? "rotate-180" : ""}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {openCurrency && (
          <div className="absolute top-full right-0 mt-1 bg-white border border-oryn-grey/30 shadow-lg z-50 min-w-[140px] max-h-[400px] overflow-y-auto">
            {currencyGroups.map((group) => (
              <div key={group.label}>
                <div className="px-4 py-1.5 text-[8px] font-mono text-oryn-black/30 tracking-[0.15em] bg-oryn-grey/10 border-b border-oryn-grey/20">
                  {group.label.toUpperCase()}
                </div>
                {group.currencies.map((cur) => {
                  const config = currencyConfigs[cur];
                  const isActive = cur === currency;
                  return (
                    <button
                      key={cur}
                      onClick={() => handleCurrencySwitch(cur)}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-[10px] font-mono tracking-[0.1em] transition-colors text-left ${
                        isActive
                          ? "bg-oryn-orange/5 text-oryn-orange"
                          : "text-oryn-black/50 hover:bg-oryn-orange/5 hover:text-oryn-orange"
                      }`}
                    >
                      <span className="text-sm">{config.flag}</span>
                      <span className="text-oryn-orange/70">{config.symbol}</span>
                      <span>{config.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
