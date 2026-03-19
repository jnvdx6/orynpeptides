"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { useLocale } from "@/i18n/LocaleContext";
import { products as allProducts, productImages, type Product } from "@/data/products";
import { Link } from "@/components/ui/LocaleLink";

interface Props {
  currentProduct: Product;
}

export function ProductComparison({ currentProduct }: Props) {
  const { addItem } = useCart();
  const { formatPrice, t } = useLocale();
  const [showComparison, setShowComparison] = useState(false);

  // Get products from same category for comparison
  const comparables = allProducts
    .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 2);

  if (comparables.length === 0) return null;

  const compareProducts = [currentProduct, ...comparables];

  // Collect all spec keys from all products
  const allSpecKeys = Array.from(
    new Set(compareProducts.flatMap((p) => Object.keys(p.specs)))
  );

  if (!showComparison) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={() => setShowComparison(true)}
          className="w-full p-4 border border-dashed border-oryn-grey/30 hover:border-oryn-orange/30 transition-colors group flex items-center justify-center gap-3"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" className="group-hover:stroke-oryn-orange transition-colors">
            <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM21 16c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
          </svg>
          <span className="text-xs text-oryn-black/40 group-hover:text-oryn-orange transition-colors font-medium tracking-[0.1em]">
            {t.productDetail.compareWith}
          </span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" className="group-hover:stroke-oryn-orange transition-colors">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-oryn-orange" />
          <h3 className="text-lg font-bold tracking-wide">{t.productDetail.sideBy}</h3>
        </div>
        <button
          onClick={() => setShowComparison(false)}
          className="text-[10px] text-oryn-black/30 hover:text-oryn-black transition-colors"
        >
          {t.productDetail.vsLabel}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="p-3 text-left text-[9px] font-mono text-oryn-black/30 tracking-[0.15em] w-32" />
              {compareProducts.map((p) => (
                <th key={p.id} className="p-3 text-center">
                  <Link href={`/products/${p.slug}`} className="block group">
                    <div className="w-16 h-16 bg-oryn-cream flex items-center justify-center mx-auto mb-2">
                      <Image
                        src={productImages.bySlug[p.slug] || "/images/products/bpc157-hero.png"}
                        alt={p.name}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm font-bold group-hover:text-oryn-orange transition-colors">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-oryn-black/40 font-plex">{p.subtitle}</p>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-oryn-grey/10">
            {/* Price row */}
            <tr className="bg-oryn-orange/5">
              <td className="p-3 text-[9px] font-mono text-oryn-black/40 tracking-[0.1em]">{t.productDetail.comparisonDisclaimer}</td>
              {compareProducts.map((p) => (
                <td key={p.id} className="p-3 text-center">
                  <span className="text-lg font-bold text-oryn-orange">{formatPrice(p.price)}</span>
                </td>
              ))}
            </tr>

            {/* Dynamic spec rows */}
            {allSpecKeys.map((key) => (
              <tr key={key}>
                <td className="p-3 text-[9px] font-mono text-oryn-black/40 tracking-[0.1em]">
                  {key.toUpperCase()}
                </td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-3 text-center text-xs font-plex">
                    {p.specs[key] || "—"}
                  </td>
                ))}
              </tr>
            ))}

            {/* Benefits count */}
            <tr className="bg-oryn-orange/5">
              <td className="p-3 text-[9px] font-mono text-oryn-black/40 tracking-[0.1em]">{t.productDetail.keyDifferences}</td>
              {compareProducts.map((p) => (
                <td key={p.id} className="p-3 text-center text-xs font-plex">
                  {p.benefits.length} {t.productDetail.bestFor}
                </td>
              ))}
            </tr>

            {/* Badge row */}
            <tr>
              <td className="p-3 text-[9px] font-mono text-oryn-black/40 tracking-[0.1em]">BADGE</td>
              {compareProducts.map((p) => (
                <td key={p.id} className="p-3 text-center">
                  {p.badge ? (
                    <span className="px-2 py-0.5 bg-oryn-orange text-white text-[9px] font-bold tracking-[0.1em]">
                      {p.badge}
                    </span>
                  ) : (
                    <span className="text-oryn-black/20">—</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Add to cart row */}
            <tr className="bg-oryn-grey-light">
              <td className="p-3" />
              {compareProducts.map((p) => (
                <td key={p.id} className="p-3 text-center">
                  <button
                    onClick={() => addItem(p)}
                    className="px-4 py-2 bg-oryn-orange text-white text-[9px] font-bold tracking-[0.1em] hover:bg-oryn-orange-dark transition-colors"
                  >
                    {t.productDetail.viewProduct}
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
