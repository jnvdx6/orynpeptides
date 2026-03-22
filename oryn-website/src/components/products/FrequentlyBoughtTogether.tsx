"use client";

import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { useLocale } from "@/i18n/LocaleContext";
import { products as allProducts, productImages, type Product } from "@/data/products";

// Curated "bought together" pairs based on complementary use cases
const PAIR_MAP: Record<string, string[]> = {
  "bpc-157": ["tb-500", "glutathione"],     // Recovery stack
  "tb-500": ["bpc-157", "ghk-cu"],          // Repair stack
  "cjc-1295": ["ipamorelin", "nad-plus"],   // GH stack
  "ipamorelin": ["cjc-1295", "nad-plus"],   // GH stack
  "tirzepatide-pen": ["glutathione", "nad-plus"], // Metabolic stack
  "ghk-cu": ["bpc-157", "glutathione"],     // Skin + recovery
  "glutathione": ["nad-plus", "ghk-cu"],    // Antioxidant stack
  "nad-plus": ["glutathione", "cjc-1295"],  // Anti-aging stack
  "medit-tirzepatide": ["glutathione", "nad-plus"],
  "novadose-nad": ["glutathione", "bpc-157"],
};

interface Props {
  currentProduct: Product;
}

export function FrequentlyBoughtTogether({ currentProduct }: Props) {
  const { addItem, items } = useCart();
  const { formatPrice, t } = useLocale();
  const fb = t.frequentlyBought;

  const pairSlugs = PAIR_MAP[currentProduct.slug] || [];
  const cartSlugs = new Set(items.map((i) => i.product.slug));

  // Get paired products, exclude those already in cart
  const paired = pairSlugs
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter((p): p is Product => !!p && !cartSlugs.has(p.slug));

  if (paired.length === 0) return null;

  const bundlePrice = currentProduct.price + paired.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscount = Math.round(bundlePrice * 0.1 * 100) / 100; // 10% bundle discount
  const bundleFinal = Math.round((bundlePrice - bundleDiscount) * 100) / 100;

  const addBundle = () => {
    // Add current product and all paired products
    addItem(currentProduct);
    paired.forEach((p) => addItem(p));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-oryn-orange/5 border border-oryn-orange/10 p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-6 bg-oryn-orange flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold tracking-wide">{fb.title}</h3>
          <span className="text-[9px] font-mono bg-oryn-orange text-white px-2 py-0.5 tracking-[0.1em]">
            {fb.save}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-6 flex-wrap mb-6">
          {/* Current product */}
          <div className="flex items-center gap-3 p-3 bg-white border border-oryn-grey/15 min-w-0 flex-1 sm:flex-initial sm:min-w-[160px]">
            <div className="w-12 h-12 bg-oryn-cream flex items-center justify-center shrink-0">
              <Image
                src={productImages.bySlug[currentProduct.slug] || "/images/products/bpc157-hero.png"}
                alt={currentProduct.name}
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold truncate">{currentProduct.name}</p>
              <p className="text-xs text-oryn-orange font-bold">{formatPrice(currentProduct.price)}</p>
            </div>
          </div>

          {paired.map((product) => (
            <div key={product.slug} className="contents">
              <span className="text-oryn-orange text-xl font-bold shrink-0">+</span>
              <div className="flex items-center gap-3 p-3 bg-white border border-oryn-grey/15 min-w-0 flex-1 sm:flex-initial sm:min-w-[160px]">
                <div className="w-12 h-12 bg-oryn-cream flex items-center justify-center shrink-0">
                  <Image
                    src={productImages.bySlug[product.slug] || "/images/products/bpc157-hero.png"}
                    alt={product.name}
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate">{product.name}</p>
                  <p className="text-xs text-oryn-orange font-bold">{formatPrice(product.price)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-oryn-black/40 line-through">{formatPrice(bundlePrice)}</span>
              <span className="text-xl font-bold text-oryn-orange">{formatPrice(bundleFinal)}</span>
            </div>
            <p className="text-[10px] text-oryn-black/40 font-plex">
              {fb.bundlePrice.replace("{amount}", formatPrice(bundleDiscount))}
            </p>
          </div>
          <button
            onClick={addBundle}
            className="w-full sm:w-auto px-6 py-3.5 bg-oryn-orange text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {fb.addAll}
          </button>
        </div>
      </div>
    </section>
  );
}
