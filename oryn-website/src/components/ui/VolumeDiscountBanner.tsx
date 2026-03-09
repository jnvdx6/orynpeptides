"use client";

import { getVolumeDiscount, getNextTier, VOLUME_TIERS } from "@/lib/discounts";
import { useLocale } from "@/i18n/LocaleContext";

interface Props {
  totalItems: number;
  compact?: boolean;
}

export function VolumeDiscountBanner({ totalItems, compact = false }: Props) {
  const currentTier = getVolumeDiscount(totalItems);
  const nextTier = getNextTier(totalItems);
  const { t } = useLocale();
  const v = t.volumeDiscount;

  if (compact) {
    // Inline version for cart slider
    if (currentTier) {
      return (
        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[10px] font-plex text-green-700">
            {v.applied} <span className="font-bold">{v.off.replace("{percent}", String(currentTier.percentage))}</span>
          </span>
        </div>
      );
    }
    if (nextTier) {
      return (
        <div className="flex items-center gap-2 px-3 py-2 bg-oryn-orange/5 border border-oryn-orange/10">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span className="text-[10px] font-plex text-oryn-black/50">
            {v.addMore.replace("{count}", String(nextTier.itemsNeeded)).replace("{percent}", String(nextTier.tier.percentage))}
          </span>
        </div>
      );
    }
    return null;
  }

  // Full version for cart page / checkout
  return (
    <div className="bg-oryn-orange/5 border border-oryn-orange/10 p-4">
      <div className="flex items-center gap-2 mb-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
        <span className="text-[10px] font-mono text-oryn-orange tracking-[0.15em] font-bold">
          {v.title}
        </span>
      </div>

      <div className="space-y-2">
        {[...VOLUME_TIERS].sort((a, b) => a.minItems - b.minItems).map((tier) => {
          const isActive = currentTier?.minItems === tier.minItems;
          const isReached = totalItems >= tier.minItems;

          return (
            <div
              key={tier.minItems}
              className={`flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                isActive
                  ? "bg-oryn-orange text-white"
                  : isReached
                  ? "bg-green-50 text-green-700"
                  : "bg-white text-oryn-black/40"
              }`}
            >
              <span className="font-plex">
                {v.items.replace("{count}", String(tier.minItems))}
              </span>
              <span className="font-bold font-mono">
                {v.off.replace("{percent}", String(tier.percentage))}
              </span>
              {isActive && (
                <span className="text-[9px] font-mono bg-white/20 px-2 py-0.5">
                  {v.active}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {nextTier && (
        <p className="text-[10px] text-oryn-black/40 font-plex mt-3">
          {v.unlockMore.replace("{count}", String(nextTier.itemsNeeded)).replace("{percent}", String(nextTier.tier.percentage))}
        </p>
      )}
    </div>
  );
}
