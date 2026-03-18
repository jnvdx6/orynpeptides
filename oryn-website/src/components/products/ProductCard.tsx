"use client";

import Image from "next/image";
import type { Product } from "@/data/products";
import { productImages } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/providers/wishlist";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";

// Product.image is now populated by ProductsProvider (Medusa thumbnail or static fallback)

// Color-coded labels for peptide pens that share the same product image
const PEPTIDE_COLORS: Record<string, { bg: string; text: string }> = {
  "bpc-157":         { bg: "bg-blue-600",    text: "text-white" },
  "tb-500":          { bg: "bg-emerald-600", text: "text-white" },
  "cjc-1295":        { bg: "bg-violet-600",  text: "text-white" },
  "ipamorelin":      { bg: "bg-amber-500",   text: "text-white" },
  "tirzepatide-pen": { bg: "bg-rose-600",    text: "text-white" },
  "ghk-cu":          { bg: "bg-cyan-600",    text: "text-white" },
  "glutathione":     { bg: "bg-lime-600",    text: "text-white" },
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
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
      <div className="relative aspect-[4/3] bg-oryn-cream overflow-hidden flex items-center justify-center p-6 sm:p-8">
        <Image
          src={productImages.bySlug[product.slug] || productImages.categoryCard[product.category] || "/images/products/peptide-pen-black.png"}
          alt={`ORYN ${product.name}`}
          width={240}
          height={180}
          loading="lazy"
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

        {/* Color-coded label for peptide pens sharing the same image */}
        {PEPTIDE_COLORS[product.slug] && (
          <span className={`absolute bottom-3 left-3 px-2.5 py-1 ${PEPTIDE_COLORS[product.slug].bg} ${PEPTIDE_COLORS[product.slug].text} text-[10px] font-bold tracking-[0.08em] z-10 shadow-sm`}>
            {product.name}
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 transition-all z-10 active:scale-95 ${
            isInWishlist(product.id)
              ? "opacity-100"
              : "opacity-100 md:opacity-0 md:group-hover:opacity-100"
          }`}
          aria-label={t.productDetail.toggleWishlist}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? "#FF6A1A" : "none"} stroke={isInWishlist(product.id) ? "#FF6A1A" : "#999"} strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0 flex-1 mr-2">
            <h3 className="text-sm font-bold tracking-wide group-hover:text-oryn-orange transition-colors truncate">
              {product.name.startsWith("ORYN") ? product.name : `ORYN ${product.name}`}
            </h3>
            <p className="text-xs text-oryn-black/40 font-plex mt-1 truncate">
              {subtitle}
            </p>
          </div>
          <span className="text-[9px] font-mono text-oryn-orange bg-oryn-orange/5 px-2 py-1 tracking-[0.1em] shrink-0">
            {product.dosage}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4 mb-4 sm:mb-5">
          <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.05em] sm:tracking-[0.1em]">
            {t.productCard.purity}
          </span>
          <span className="w-px h-3 bg-oryn-grey" />
          <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.05em] sm:tracking-[0.1em]">
            {product.volume}
          </span>
          <span className="w-px h-3 bg-oryn-grey hidden sm:block" />
          <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.05em] sm:tracking-[0.1em] hidden sm:inline">
            {t.productCard.pharmaGrade}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-oryn-orange/10">
          <span className="text-lg sm:text-xl font-bold text-oryn-orange">{formatPrice(product.price)}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
            className="px-4 sm:px-5 py-2.5 text-[10px] font-medium text-white bg-oryn-orange hover:bg-oryn-orange-dark tracking-[0.1em] transition-colors flex items-center gap-1.5 sm:gap-2 active:scale-[0.97]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
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
