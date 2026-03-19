"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";

const COOKIE_KEY = "oryn_cookie_consent";
const COOKIE_PREFS_KEY = "oryn_cookie_preferences";

export type CookiePreferences = {
  essential: true; // always on
  analytics: boolean;
  marketing: boolean;
};

/** Get current cookie preferences */
export function getCookiePreferences(): CookiePreferences {
  if (typeof window === "undefined") return { essential: true, analytics: false, marketing: false };
  try {
    const prefs = localStorage.getItem(COOKIE_PREFS_KEY);
    if (prefs) return JSON.parse(prefs);
  } catch { /* ignore */ }
  // Legacy fallback
  const legacy = localStorage.getItem(COOKIE_KEY);
  if (legacy === "accepted") return { essential: true, analytics: true, marketing: true };
  return { essential: true, analytics: false, marketing: false };
}

/** Check if user has accepted analytics cookies */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  return getCookiePreferences().analytics;
}

/** Check if user has made a cookie choice at all */
export function hasCookieChoice(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(COOKIE_KEY) !== null;
}

/** Open cookie settings programmatically (called from footer link) */
let openCookieSettingsFn: (() => void) | null = null;
export function openCookieSettings() {
  openCookieSettingsFn?.();
}

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({ essential: true, analytics: false, marketing: false });
  const { t } = useLocale();
  const c = t.cookie;

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
    // Load existing preferences for manage mode
    setPrefs(getCookiePreferences());
  }, []);

  // Register the open function for external callers
  useEffect(() => {
    openCookieSettingsFn = () => {
      setPrefs(getCookiePreferences());
      setShowDetails(true);
      setShow(true);
    };
    return () => { openCookieSettingsFn = null; };
  }, []);

  const savePreferences = useCallback((newPrefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_PREFS_KEY, JSON.stringify(newPrefs));
    localStorage.setItem(COOKIE_KEY, newPrefs.analytics ? "accepted" : "declined");
    setShow(false);
    setShowDetails(false);
    // Opt out of PostHog if analytics declined
    if (!newPrefs.analytics) {
      try {
        const posthog = (window as any).posthog;
        if (posthog?.opt_out_capturing) posthog.opt_out_capturing();
      } catch { /* ignore */ }
    }
    // Reload if analytics was just enabled (to init PostHog)
    const hadAnalytics = getCookiePreferences().analytics;
    if (newPrefs.analytics && !hadAnalytics) {
      window.location.reload();
    }
  }, []);

  const acceptAll = () => {
    savePreferences({ essential: true, analytics: true, marketing: true });
  };

  const declineAll = useCallback(() => {
    savePreferences({ essential: true, analytics: false, marketing: false });
  }, [savePreferences]);

  const saveCustom = () => {
    savePreferences(prefs);
  };

  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") declineAll();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [show, declineAll]);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:p-6" role="dialog" aria-label={t.aria.cookieConsent}>
      <div className="max-w-2xl mx-auto bg-white border border-oryn-grey/20 shadow-[0_-4px_30px_rgba(0,0,0,0.1)] p-5">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-oryn-orange/10 flex items-center justify-center shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-oryn-black/60 font-plex leading-relaxed mb-3">
              {c.message}{" "}
              <Link href="/privacy" className="text-oryn-orange hover:underline">
                {c.privacyPolicy}
              </Link>.
            </p>

            {showDetails && (
              <div className="mb-3 space-y-2">
                {/* Essential — always on */}
                <label className="flex items-center gap-2 text-xs font-plex text-oryn-black/70">
                  <input type="checkbox" checked disabled className="accent-oryn-orange" />
                  <span>{c.essential} <span className="text-oryn-black/40">({c.alwaysOn})</span></span>
                </label>
                {/* Analytics */}
                <label className="flex items-center gap-2 text-xs font-plex text-oryn-black/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                    className="accent-oryn-orange"
                  />
                  <span>{c.analyticsLabel}</span>
                </label>
                {/* Marketing */}
                <label className="flex items-center gap-2 text-xs font-plex text-oryn-black/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.marketing}
                    onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
                    className="accent-oryn-orange"
                  />
                  <span>{c.marketingLabel}</span>
                </label>
              </div>
            )}

            <div className="flex items-center gap-3 flex-wrap">
              {showDetails ? (
                <button
                  onClick={saveCustom}
                  className="px-5 py-3 bg-oryn-orange text-white text-[11px] font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors active:scale-[0.98]"
                >
                  {c.savePreferences}
                </button>
              ) : (
                <>
                  <button
                    onClick={acceptAll}
                    className="px-5 py-3 bg-oryn-orange text-white text-[11px] font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors active:scale-[0.98]"
                  >
                    {c.acceptAll}
                  </button>
                  <button
                    onClick={declineAll}
                    className="px-5 py-3 border border-oryn-grey/30 text-[11px] font-medium text-oryn-black/50 tracking-[0.15em] hover:border-oryn-orange/30 hover:text-oryn-orange transition-colors active:scale-[0.98]"
                  >
                    {c.essentialOnly}
                  </button>
                </>
              )}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-[11px] font-medium text-oryn-black/40 tracking-[0.1em] hover:text-oryn-orange transition-colors"
              >
                {showDetails ? c.hideSettings : c.manageSettings}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
