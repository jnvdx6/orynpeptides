"use client";

import { useCart } from "@/lib/cart-context";
import { useLocale } from "@/i18n/LocaleContext";
import Image from "next/image";

export function AddToCartToast() {
  const { lastAdded } = useCart();
  const { formatPrice } = useLocale();

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        lastAdded
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      {lastAdded && (
        <div className="flex items-center gap-3 bg-white border border-oryn-orange/20 shadow-lg shadow-oryn-orange/10 px-4 py-3 max-w-xs">
          <div className="w-10 h-10 bg-oryn-cream flex items-center justify-center shrink-0">
            <Image
              src={lastAdded.image}
              alt={lastAdded.name}
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-mono text-oryn-orange tracking-[0.1em] mb-0.5">
              ADDED TO CART
            </p>
            <p className="text-xs font-bold truncate">{lastAdded.name}</p>
            <p className="text-[10px] text-oryn-black/40 font-mono">
              {formatPrice(lastAdded.price)}
            </p>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF6A1A"
            strokeWidth="2"
            className="shrink-0"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )}
    </div>
  );
}
