"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { useLocale } from "@/i18n/LocaleContext";
import { locales, markets, regions, regionKeys } from "@/i18n/config";
import type { Locale, RegionKey } from "@/i18n/config";

/* ─── Desktop version: single trigger → popover with language + currency ─── */
export function LocaleSwitcher() {
  const { locale, region, setRegion, currencySymbol, t } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"lang" | "currency">("lang");
  const ref = useRef<HTMLDivElement>(null);

  const currentMarket = markets[locale];
  const currentRegion = regions[region];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const getPathForLocale = (targetLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    return `/${targetLocale}${pathWithoutLocale}`;
  };

  const handleLocaleSwitch = (targetLocale: Locale) => {
    document.cookie = `ORYN_LOCALE=${targetLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
    setOpen(false);
  };

  const handleRegionSwitch = (newRegion: RegionKey) => {
    setRegion(newRegion);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      {/* Single combined trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 text-[11px] font-mono text-oryn-black/60 hover:text-oryn-orange border border-oryn-grey/20 hover:border-oryn-orange/30 transition-all tracking-[0.08em] rounded-sm"
        aria-label={t.aria.switchLanguage}
        aria-expanded={open}
      >
        <span className="text-base leading-none">{currentMarket.flag}</span>
        <span className="font-medium">{locale.toUpperCase()}</span>
        <span className="w-px h-3 bg-oryn-grey/30" />
        <span className="text-oryn-orange font-medium">{currencySymbol}</span>
        <span>{currentRegion.currencyCode.toUpperCase()}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Popover panel */}
      {open && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-oryn-grey/20 shadow-xl z-50 w-[320px] rounded-sm overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-oryn-grey/15">
            <button
              onClick={() => setTab("lang")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[10px] font-mono tracking-[0.15em] transition-colors ${
                tab === "lang"
                  ? "text-oryn-orange border-b-2 border-oryn-orange bg-oryn-orange/[0.03]"
                  : "text-oryn-black/40 hover:text-oryn-black/60"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              LANGUAGE
            </button>
            <button
              onClick={() => setTab("currency")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[10px] font-mono tracking-[0.15em] transition-colors ${
                tab === "currency"
                  ? "text-oryn-orange border-b-2 border-oryn-orange bg-oryn-orange/[0.03]"
                  : "text-oryn-black/40 hover:text-oryn-black/60"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
              CURRENCY
            </button>
          </div>

          {/* Tab content */}
          {tab === "lang" ? (
            <div className="p-2 max-h-[280px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-0.5">
                {locales.map((loc) => {
                  const market = markets[loc];
                  const isActive = loc === locale;
                  return (
                    <NextLink
                      key={loc}
                      href={getPathForLocale(loc)}
                      onClick={() => handleLocaleSwitch(loc)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-sm transition-colors ${
                        isActive
                          ? "bg-oryn-orange/8 text-oryn-orange"
                          : "text-oryn-black/60 hover:bg-oryn-grey-light/60 hover:text-oryn-black/80"
                      }`}
                    >
                      <span className="text-base leading-none">{market.flag}</span>
                      <span className="text-[11px] font-medium tracking-wide">{market.label}</span>
                      {isActive && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-auto shrink-0">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </NextLink>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-2 max-h-[280px] overflow-y-auto">
              {regionKeys.map((key) => {
                const reg = regions[key];
                const isActive = key === region;
                return (
                  <button
                    key={key}
                    onClick={() => handleRegionSwitch(key)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-sm transition-colors text-left ${
                      isActive
                        ? "bg-oryn-orange/8 text-oryn-orange"
                        : "text-oryn-black/60 hover:bg-oryn-grey-light/60 hover:text-oryn-black/80"
                    }`}
                  >
                    <span className="text-lg leading-none">{reg.flag}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-medium tracking-wide block">{reg.name}</span>
                      <span className="text-[10px] text-oryn-black/35 font-mono tracking-wider">
                        {reg.symbol} {reg.currencyCode.toUpperCase()}
                      </span>
                    </div>
                    {isActive && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Mobile version: full-width sections with large touch targets ─── */
export function MobileLocaleSwitcher() {
  const { locale, region, setRegion, currencySymbol, t } = useLocale();
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState<"lang" | "currency" | null>(null);

  const currentMarket = markets[locale];
  const currentRegion = regions[region];

  const getPathForLocale = (targetLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    return `/${targetLocale}${pathWithoutLocale}`;
  };

  const handleLocaleSwitch = (targetLocale: Locale) => {
    document.cookie = `ORYN_LOCALE=${targetLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
    setExpandedSection(null);
  };

  const handleRegionSwitch = useCallback((newRegion: RegionKey) => {
    setRegion(newRegion);
    setExpandedSection(null);
  }, [setRegion]);

  const toggleSection = (section: "lang" | "currency") => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-0">
      {/* Language selector */}
      <div className="border-b border-oryn-grey/10">
        <button
          onClick={() => toggleSection("lang")}
          className="flex items-center gap-3 w-full py-4 text-left"
          aria-expanded={expandedSection === "lang"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-oryn-black/40 shrink-0">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </svg>
          <div className="flex-1 min-w-0">
            <span className="text-sm text-oryn-black/70 font-medium">{t.aria.switchLanguage}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-base leading-none">{currentMarket.flag}</span>
            <span className="text-xs text-oryn-black/50 font-medium">{currentMarket.label}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className={`text-oryn-black/30 transition-transform duration-200 ${expandedSection === "lang" ? "rotate-180" : ""}`}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </button>

        {/* Language options — grid */}
        <div className={`overflow-hidden transition-all duration-300 ease-out ${
          expandedSection === "lang" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="pb-4 px-1">
            <div className="grid grid-cols-2 gap-1">
              {locales.map((loc) => {
                const market = markets[loc];
                const isActive = loc === locale;
                return (
                  <NextLink
                    key={loc}
                    href={getPathForLocale(loc)}
                    onClick={() => handleLocaleSwitch(loc)}
                    className={`flex items-center gap-2.5 px-3 py-3 rounded-sm transition-colors min-h-[44px] ${
                      isActive
                        ? "bg-oryn-orange/8 text-oryn-orange"
                        : "text-oryn-black/60 active:bg-oryn-orange/5"
                    }`}
                  >
                    <span className="text-lg leading-none">{market.flag}</span>
                    <span className="text-[13px] font-medium">{market.label}</span>
                    {isActive && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-auto shrink-0">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </NextLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Currency / Region selector */}
      <div className="border-b border-oryn-grey/10">
        <button
          onClick={() => toggleSection("currency")}
          className="flex items-center gap-3 w-full py-4 text-left"
          aria-expanded={expandedSection === "currency"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-oryn-black/40 shrink-0">
            <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
          <div className="flex-1 min-w-0">
            <span className="text-sm text-oryn-black/70 font-medium">{t.aria.switchRegion}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-base leading-none">{currentRegion.flag}</span>
            <span className="text-xs text-oryn-black/50 font-medium">
              {currentRegion.symbol} {currentRegion.currencyCode.toUpperCase()}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className={`text-oryn-black/30 transition-transform duration-200 ${expandedSection === "currency" ? "rotate-180" : ""}`}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </button>

        {/* Region options — list */}
        <div className={`overflow-hidden transition-all duration-300 ease-out ${
          expandedSection === "currency" ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="pb-4 px-1 space-y-0.5">
            {regionKeys.map((key) => {
              const reg = regions[key];
              const isActive = key === region;
              return (
                <button
                  key={key}
                  onClick={() => handleRegionSwitch(key)}
                  className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-sm transition-colors text-left min-h-[48px] ${
                    isActive
                      ? "bg-oryn-orange/8 text-oryn-orange"
                      : "text-oryn-black/60 active:bg-oryn-orange/5"
                  }`}
                >
                  <span className="text-xl leading-none">{reg.flag}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[13px] font-medium block">{reg.name}</span>
                    <span className={`text-[11px] font-mono tracking-wider ${isActive ? "text-oryn-orange/60" : "text-oryn-black/35"}`}>
                      {reg.symbol} {reg.currencyCode.toUpperCase()}
                    </span>
                  </div>
                  {isActive && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
