"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { EXIT_INTENT_SHOWN_KEY, FIRST_PURCHASE_KEY } from "@/lib/discounts";
import { useLocale } from "@/i18n/LocaleContext";
import { trackExitIntentShown, trackExitIntentConverted } from "@/lib/analytics";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [minutesLeft, setMinutesLeft] = useState(15);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
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

    // Mobile: detect scroll-up reversal after scrolling 60%+ of page
    const isMobile = window.innerWidth < 1024;
    let lastScrollY = window.scrollY;
    let hasScrolledDeep = false;

    const handleMobileScrollExit = () => {
      const scrollDepth = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollDepth > 0.6) hasScrolledDeep = true;
      if (hasScrolledDeep && window.scrollY < lastScrollY - 100 && window.scrollY < document.body.scrollHeight * 0.3) {
        setShow(true);
        trackExitIntentShown();
        window.removeEventListener("scroll", handleMobileScrollExit);
      }
      lastScrollY = window.scrollY;
    };

    // Delay adding listener to avoid triggering immediately
    const timer = setTimeout(() => {
      if (isMobile) {
        window.addEventListener("scroll", handleMobileScrollExit, { passive: true });
      } else {
        document.addEventListener("mouseleave", handleMouseLeave);
      }
    }, 10000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleMobileScrollExit);
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

  // Countdown timer for urgency
  useEffect(() => {
    if (!show || submitted) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 0) {
          setMinutesLeft((m) => Math.max(0, m - 1));
          return 59;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [show, submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Send to Medusa newsletter module (source: exit_intent)
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY) {
        headers["x-publishable-api-key"] = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
      }
      await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/newsletter`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email, source: "exit_intent" }),
      });
    } catch { /* silently fail - don't block user */ }
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
      <div className="relative bg-white max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300">
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
              {/* Top section: Product image + headline side by side */}
              <div className="flex items-center gap-5 mb-5">
                {/* Product image */}
                <div className="flex-shrink-0 w-28 h-28 relative">
                  <Image
                    src="/images/products/bpc157-hero.png"
                    alt="ORYN Peptide Pen"
                    fill
                    className="object-contain"
                    sizes="112px"
                  />
                </div>

                {/* Headline area */}
                <div className="flex-1 text-left">
                  <span className="text-[9px] font-mono text-oryn-orange tracking-[0.2em]">
                    {p.tagline}
                  </span>
                  <h3 className="text-3xl font-bold mt-1 leading-tight">
                    <span className="text-oryn-orange">10% OFF</span>
                    <br />
                    <span className="text-xl">YOUR FIRST ORDER</span>
                  </h3>
                </div>
              </div>

              <p className="text-xs text-oryn-black/50 font-plex text-center mb-4">
                {p.description}
              </p>

              {/* Urgency countdown */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span className="text-[11px] font-mono text-oryn-orange tracking-wide">
                  Offer expires in {String(minutesLeft).padStart(2, "0")}:{String(secondsLeft).padStart(2, "0")}
                </span>
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
                  className="w-full py-4 bg-oryn-orange text-white text-sm font-bold tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors"
                >
                  GET MY 10% OFF
                </button>
              </form>

              {/* Social proof */}
              <div className="flex items-center justify-center gap-1.5 mt-3">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#FF6A1A" stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[10px] text-oryn-black/40 font-plex">
                  Join 500+ researchers who trust ORYN
                </span>
              </div>

              <p className="text-[9px] text-oryn-black/20 font-plex text-center mt-3">
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
