"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";

const FLASH_SALE_KEY = "oryn_flash_sale_dismissed";

// Configure flash sales here — no external service needed
function getActiveSale(flash: string, weekend: string) {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon...

  // Active Mon-Tue each week
  if (dayOfWeek === 1 || dayOfWeek === 2) {
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + (2 - dayOfWeek));
    endDate.setHours(23, 59, 59, 999);
    return {
      enabled: true,
      message: flash,
      code: "FLASH15",
      endsAt: endDate.toISOString(),
    };
  }

  // Active Fri-Sat each week
  if (dayOfWeek === 5 || dayOfWeek === 6) {
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + (6 - dayOfWeek));
    endDate.setHours(23, 59, 59, 999);
    return {
      enabled: true,
      message: weekend,
      code: "WEEKEND10",
      endsAt: endDate.toISOString(),
    };
  }

  return null;
}

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export function FlashSaleBanner() {
  const [dismissed, setDismissed] = useState(true);
  const { t } = useLocale();
  const sale = getActiveSale(t.flashSale.flash, t.flashSale.weekend);
  const countdown = useCountdown(sale?.endsAt || new Date().toISOString());

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(FLASH_SALE_KEY);
    setDismissed(!!wasDismissed);
  }, []);

  if (!sale || dismissed) return null;
  if (countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="bg-oryn-orange text-white">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-4 relative">
        <Link href="/products" className="flex items-center gap-3 group">
          <span className="text-[10px] font-mono tracking-[0.1em] opacity-90">
            {sale.message}
          </span>
          <div className="flex items-center gap-1">
            <span className="bg-white/20 px-1.5 py-0.5 text-[10px] font-mono font-bold">
              {pad(countdown.hours)}h
            </span>
            <span className="text-[10px] opacity-60">:</span>
            <span className="bg-white/20 px-1.5 py-0.5 text-[10px] font-mono font-bold">
              {pad(countdown.minutes)}m
            </span>
            <span className="text-[10px] opacity-60">:</span>
            <span className="bg-white/20 px-1.5 py-0.5 text-[10px] font-mono font-bold">
              {pad(countdown.seconds)}s
            </span>
          </div>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
        <button
          onClick={() => {
            setDismissed(true);
            sessionStorage.setItem(FLASH_SALE_KEY, "1");
          }}
          className="absolute right-4 p-1 opacity-50 hover:opacity-100 transition-opacity"
          aria-label={t.aria.dismiss}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
