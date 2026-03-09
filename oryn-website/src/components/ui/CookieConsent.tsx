"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";

const COOKIE_KEY = "oryn_cookie_consent";

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const { t } = useLocale();
  const c = t.cookie;

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // Delay appearance slightly for better UX
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setShow(false);
  };

  const decline = useCallback(() => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setShow(false);
  }, []);

  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") decline();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [show, decline]);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:p-6" role="dialog" aria-label="Cookie consent">
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
            <div className="flex items-center gap-3">
              <button
                onClick={accept}
                className="px-4 py-2 bg-oryn-orange text-white text-[10px] font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors"
              >
                {c.acceptAll}
              </button>
              <button
                onClick={decline}
                className="px-4 py-2 border border-oryn-grey/30 text-[10px] font-medium text-oryn-black/50 tracking-[0.15em] hover:border-oryn-orange/30 hover:text-oryn-orange transition-colors"
              >
                {c.essentialOnly}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
