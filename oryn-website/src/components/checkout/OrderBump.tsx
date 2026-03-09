"use client";

import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { useProducts } from "@/providers/products";
import { useLocale } from "@/i18n/LocaleContext";
import { productImages } from "@/data/products";

export function OrderBump() {
  const { items, addItem } = useCart();
  const { products } = useProducts();
  const { formatPrice } = useLocale();

  // Find a good product to suggest — prefer popular items not in cart
  const cartSlugs = new Set(items.map((i) => i.product.slug));
  const suggestions = products
    .filter((p) => !cartSlugs.has(p.slug))
    .sort((a, b) => {
      // Prioritize products with badges (Best Seller, Popular, etc.)
      if (a.badge && !b.badge) return -1;
      if (!a.badge && b.badge) return 1;
      return 0;
    });

  const bump = suggestions[0];
  if (!bump) return null;

  return (
    <div className="border-2 border-dashed border-oryn-orange/30 bg-oryn-orange/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 bg-oryn-orange flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <span className="text-[10px] font-mono text-oryn-orange tracking-[0.15em] font-bold">
          ADD TO YOUR ORDER
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-oryn-cream flex items-center justify-center shrink-0">
          <Image
            src={productImages.bySlug[bump.slug] || "/images/products/pen-bpc157.png"}
            alt={bump.name}
            width={48}
            height={48}
            className="object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold truncate">
            {bump.name.startsWith("ORYN") ? bump.name : `ORYN ${bump.name}`}
          </p>
          <p className="text-[10px] text-oryn-black/40 font-plex">
            {bump.dosage} &middot; {bump.subtitle}
          </p>
          <p className="text-sm font-bold text-oryn-orange mt-0.5">
            + {formatPrice(bump.price)}
          </p>
        </div>

        <button
          onClick={() => addItem(bump)}
          className="shrink-0 px-4 py-2.5 bg-oryn-orange text-white text-[9px] font-bold tracking-[0.1em] hover:bg-oryn-orange-dark transition-colors"
        >
          YES, ADD IT
        </button>
      </div>
    </div>
  );
}
