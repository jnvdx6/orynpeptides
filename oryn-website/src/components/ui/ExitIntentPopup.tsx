"use client";

import { useState, useEffect, useCallback } from "react";
import { EXIT_INTENT_SHOWN_KEY, FIRST_PURCHASE_KEY } from "@/lib/discounts";
import { useLocale } from "@/i18n/LocaleContext";
import { trackExitIntentShown, trackExitIntentConverted } from "@/lib/analytics";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLocale();
  const p = t.popups.exitIntent;

  const handleClose = useCallback(() => {
    setShow(false);
    sessionStorage.setItem(EXIT_INTENT_SHOWN_KEY, "1");
  }, []);

  useEffect(() => {
    // Don't show if already shown this session, or if user has purchased before
    if (sessionStorage.getItem(EXIT_INTENT_SHOWN_KEY)) return;
    if (localStorage.getItem(FIRST_PURCHASE_KEY)) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !show) {
        setShow(true);
        trackExitIntentShown();
      }
    };

    // Delay adding listener to avoid triggering immediately
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [show, handleClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Store email for potential follow-up (no external service needed)
    try {
      const emails = JSON.parse(localStorage.getItem("oryn_captured_emails") || "[]");
      emails.push({ email, source: "exit_intent", date: new Date().toISOString() });
      localStorage.setItem("oryn_captured_emails", JSON.stringify(emails));
    } catch { /* ignore */ }
    setSubmitted(true);
    trackExitIntentConverted("email_captured");
    setTimeout(handleClose, 3000);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-label={p.title}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 text-oryn-black/30 hover:text-oryn-black transition-colors z-10"
          aria-label={t.productDetail.closePopup}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Orange top bar */}
        <div className="h-1 bg-oryn-orange" />

        <div className="p-8">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-oryn-orange/10 flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">{p.welcomeTitle}</h3>
              <p className="text-xs text-oryn-black/40 font-plex">
                {p.welcomeMessage}
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <span className="text-[9px] font-mono text-oryn-orange tracking-[0.2em]">
                  {p.tagline}
                </span>
                <h3 className="text-2xl font-bold mt-2 mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-oryn-black/40 font-plex">
                  {p.description}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={p.placeholder}
                  required
                  className="w-full px-4 py-3.5 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 bg-oryn-orange text-white text-xs font-medium tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors"
                >
                  {p.claimDiscount}
                </button>
              </form>

              <p className="text-[9px] text-oryn-black/20 font-plex text-center mt-4">
                {p.noSpam}
              </p>

              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-oryn-grey/10">
                <div className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span className="text-[8px] text-oryn-black/30 font-mono">{t.productDetail.purityBadge}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[8px] text-oryn-black/30 font-mono">{t.productDetail.gmpBadge}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
                    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="text-[8px] text-oryn-black/30 font-mono">{t.productDetail.freeShippingBadge}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
