"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useLocale } from "@/i18n/LocaleContext";

export function PromoCodeInput({ compact = false }: { compact?: boolean }) {
  const {
    appliedPromotion,
    removePromotion,
    validateAndApplyPromoCode,
  } = useCart();
  const { t, formatPrice } = useLocale();

  const [expanded, setExpanded] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError("");

    const result = await validateAndApplyPromoCode(code.trim().toUpperCase());
    if (result.success) {
      setCode("");
      setExpanded(false);
    } else {
      setError(result.error || t.checkoutPage.invalidCode);
    }
    setLoading(false);
  };

  // Show applied promo badge
  if (appliedPromotion) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-oryn-orange/5 border border-oryn-orange/20">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
          <path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        </svg>
        <span className="text-xs font-mono font-bold text-oryn-orange flex-1">
          {appliedPromotion.code}
        </span>
        <span className="text-xs font-bold text-oryn-orange">
          -{formatPrice(appliedPromotion.discountAmount)}
        </span>
        <button
          onClick={removePromotion}
          className="text-oryn-black/30 hover:text-red-500 transition-colors ml-1"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  // Collapsed state — clickable toggle
  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className={`flex items-center gap-2 text-oryn-black/40 hover:text-oryn-orange transition-colors group w-full ${
          compact ? "text-[10px]" : "text-xs"
        }`}
      >
        <svg
          width={compact ? "12" : "14"}
          height={compact ? "12" : "14"}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="group-hover:stroke-oryn-orange transition-colors"
        >
          <path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        </svg>
        <span className="font-plex">
          {t.cart.havePromoCode || "Have a promo code?"}
        </span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    );
  }

  // Expanded state — input + apply
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
          placeholder={t.checkoutPage.promoCodePlaceholder}
          autoFocus
          className={`flex-1 px-3 py-2 bg-white border text-sm focus:outline-none focus:border-oryn-orange transition-colors font-mono ${
            error ? "border-red-300" : "border-oryn-grey/30"
          }`}
        />
        <button
          onClick={handleApply}
          disabled={loading || !code.trim()}
          className="px-4 py-2 bg-oryn-grey-dark text-white text-[10px] font-bold tracking-wider hover:bg-oryn-black transition-colors disabled:opacity-40"
        >
          {loading ? "..." : t.checkoutPage.apply}
        </button>
      </div>
      {error && <p className="text-[10px] text-red-500">{error}</p>}
      <button
        onClick={() => {
          setExpanded(false);
          setCode("");
          setError("");
        }}
        className="text-[10px] text-oryn-black/30 hover:text-oryn-black/50 transition-colors"
      >
        {t.cart.cancel || "Cancel"}
      </button>
    </div>
  );
}
