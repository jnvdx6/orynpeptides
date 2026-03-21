"use client";

import { useState, useMemo } from "react";
import { useLocale } from "@/i18n/LocaleContext";
import { SHIPPING_REGIONS, getRegionFreeThreshold, type ShippingRegion } from "@/lib/shipping";

interface ShippingEstimatorProps {
  cartTotal: number;
}

export function ShippingEstimator({ cartTotal }: ShippingEstimatorProps) {
  const { formatPrice, currencyCode, t } = useLocale();
  const [selectedRegionId, setSelectedRegionId] = useState<string>("europe");

  const region = useMemo(
    () => SHIPPING_REGIONS.find((r) => r.id === selectedRegionId) || SHIPPING_REGIONS[2],
    [selectedRegionId]
  );

  const freeThreshold = region.freeThreshold;
  const amountToFree = Math.max(0, freeThreshold - cartTotal);
  const qualifiesForFree = cartTotal >= freeThreshold;
  const progress = Math.min((cartTotal / freeThreshold) * 100, 100);

  // Format price in region's currency
  const formatRegionPrice = (amount: number): string => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: region.currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      const symbols: Record<string, string> = { GBP: "£", USD: "$", EUR: "€" };
      return `${symbols[region.currency] || "€"}${amount.toFixed(2)}`;
    }
  };

  return (
    <div className="p-4 bg-oryn-grey-light border border-oryn-grey/20">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono text-oryn-black/40 tracking-[0.1em] uppercase">
          {t.cart.shipping || "Shipping estimate"}
        </span>
        <select
          value={selectedRegionId}
          onChange={(e) => setSelectedRegionId(e.target.value)}
          className="text-xs font-medium text-oryn-orange bg-transparent border-none cursor-pointer focus:outline-none appearance-none pr-4"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23FF6A1A' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
          }}
        >
          {SHIPPING_REGIONS.map((r: ShippingRegion) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {qualifiesForFree ? (
        <div className="flex items-center gap-2 p-2.5 bg-green-50 border border-green-200/50">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <div>
            <p className="text-xs font-medium text-green-700">
              {t.cart.freeShippingUnlocked || "Free shipping unlocked!"}
            </p>
            <p className="text-[10px] text-green-600/70 font-plex">
              {region.standard.days} · {formatRegionPrice(0)}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-oryn-black/60 font-plex">
              Standard · {region.standard.days}
            </span>
            <span className="font-medium">{formatRegionPrice(region.standard.amount)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-oryn-black/60 font-plex">
              Express · {region.express.days}
            </span>
            <span className="font-medium">{formatRegionPrice(region.express.amount)}</span>
          </div>
          <div className="mt-2 p-2.5 bg-oryn-orange/5 border border-oryn-orange/10">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] text-oryn-black/50 font-plex">
                {t.cart.freeShippingAway?.replace("{amount}", formatRegionPrice(amountToFree)) ||
                  `${formatRegionPrice(amountToFree)} away from free shipping`}
              </p>
              <span className="text-[9px] font-mono text-oryn-orange">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-oryn-grey/30 overflow-hidden">
              <div
                className="h-full bg-oryn-orange transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
