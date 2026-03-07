"use client";

import Image from "next/image";
import type { Product } from "@/data/products";
import { productImages } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { t, formatPrice } = useLocale();

  const productT = t.products[product.slug];
  const subtitle = productT?.subtitle || product.subtitle;
  const categoryLabel = productT?.categoryLabel || product.categoryLabel;
  const badge = productT?.badge || product.badge;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card group bg-white border border-oryn-orange/10 overflow-hidden hover:border-oryn-orange/30 block cursor-pointer"
    >
      <div className="relative aspect-[4/3] bg-oryn-cream overflow-hidden flex items-center justify-center p-8">
        <Image
          src={productImages.bySlug[product.slug] || productImages.categoryCard[product.category] || "/images/products/pen-bpc157.png"}
          alt={`ORYN ${product.name}`}
          width={240}
          height={180}
          className="object-contain group-hover:scale-105 transition-transform duration-500"
        />

        {badge && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-oryn-orange text-white text-[9px] font-bold tracking-[0.15em] uppercase z-10">
            {badge}
          </span>
        )}

        <span className="absolute top-4 right-4 px-2 py-1 bg-white/90 text-oryn-orange text-[9px] font-mono tracking-[0.1em] z-10">
          {categoryLabel}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold tracking-wide group-hover:text-oryn-orange transition-colors">
              {product.name.startsWith("ORYN") ? product.name : `ORYN ${product.name}`}
            </h3>
            <p className="text-xs text-oryn-black/40 font-plex mt-1">
              {subtitle}
            </p>
          </div>
          <span className="text-[9px] font-mono text-oryn-orange bg-oryn-orange/5 px-2 py-1 tracking-[0.1em]">
            {product.dosage}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-4 mb-5">
          <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">
            {t.productCard.purity}
          </span>
          <span className="w-px h-3 bg-oryn-grey" />
          <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">
            {product.volume}
          </span>
          <span className="w-px h-3 bg-oryn-grey" />
          <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">
            {t.productCard.pharmaGrade}
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-oryn-orange/10">
          <span className="text-xl font-bold text-oryn-orange">{formatPrice(product.price)}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
            className="px-5 py-2.5 text-[10px] font-medium text-white bg-oryn-orange hover:bg-oryn-orange-dark tracking-[0.1em] transition-colors flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {t.productCard.addToCart}
          </button>
        </div>
      </div>
    </Link>
  );
}
