"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/i18n/LocaleContext";

export function BackToTop() {
  const [show, setShow] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-4 z-30 w-10 h-10 bg-oryn-orange text-white flex items-center justify-center shadow-lg hover:bg-oryn-orange-dark transition-colors lg:bottom-6"
      aria-label={t.aria.backToTop}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
