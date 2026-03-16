"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { useLocale } from "@/i18n/LocaleContext";
import { locales, markets, regions, regionKeys } from "@/i18n/config";
import type { Locale, RegionKey } from "@/i18n/config";

export function LocaleSwitcher() {
  const { locale, region, setRegion, currencySymbol, t } = useLocale();
  const pathname = usePathname();
  const [openLang, setOpenLang] = useState(false);
  const [openRegion, setOpenRegion] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const regRef = useRef<HTMLDivElement>(null);

  const currentMarket = markets[locale];
  const currentRegion = regions[region];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setOpenLang(false);
      if (regRef.current && !regRef.current.contains(e.target as Node)) setOpenRegion(false);
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

  const handleRegionSwitch = (newRegion: RegionKey) => {
    setRegion(newRegion);
    setOpenRegion(false);
  };

  const btnClass =
    "flex items-center gap-1.5 px-2 py-1.5 text-[10px] font-mono text-oryn-black/50 hover:text-oryn-orange border border-oryn-orange/10 hover:border-oryn-orange/30 transition-all tracking-[0.1em]";

  return (
    <div className="flex items-center gap-1">
      {/* Language selector */}
      <div className="relative" ref={langRef}>
        <button
          onClick={() => { setOpenLang(!openLang); setOpenRegion(false); }}
          className={btnClass}
          aria-label={t.aria.switchLanguage}
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

      {/* Region / Currency selector */}
      <div className="relative" ref={regRef}>
        <button
          onClick={() => { setOpenRegion(!openRegion); setOpenLang(false); }}
          className={btnClass}
          aria-label={t.aria.switchRegion}
        >
          <span>{currentRegion.flag}</span>
          <span className="text-oryn-orange">{currencySymbol}</span>
          <span className="hidden sm:inline">{currentRegion.currencyCode.toUpperCase()}</span>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`transition-transform ${openRegion ? "rotate-180" : ""}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {openRegion && (
          <div className="absolute top-full right-0 mt-1 bg-white border border-oryn-grey/30 shadow-lg z-50 min-w-[180px]">
            {regionKeys.map((key) => {
              const reg = regions[key];
              const isActive = key === region;
              return (
                <button
                  key={key}
                  onClick={() => handleRegionSwitch(key)}
                  className={`w-full flex items-center gap-2 px-4 py-2.5 text-[10px] font-mono tracking-[0.1em] transition-colors text-left ${
                    isActive
                      ? "bg-oryn-orange/5 text-oryn-orange"
                      : "text-oryn-black/50 hover:bg-oryn-orange/5 hover:text-oryn-orange"
                  }`}
                >
                  <span className="text-sm">{reg.flag}</span>
                  <span>{reg.name}</span>
                  <span className="ml-auto text-oryn-orange/60">{reg.symbol} {reg.currencyCode.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
