"use client";

import Image from "next/image";
import { useCompare } from "@/providers/compare";
import { useCart } from "@/lib/cart-context";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import { productImages } from "@/data/products";

export default function CustomComparePage() {
  const { selectedProducts, toggleCompare, clearComparison } = useCompare();
  const { addItem } = useCart();
  const { t, formatPrice } = useLocale();

  if (selectedProducts.length < 2) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 bg-oryn-grey-light flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-oryn-black/30">
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
          </div>
          <h1 className="text-xl font-bold mb-2">{t.compare?.title || "Compare Products"}</h1>
          <p className="text-sm text-oryn-black/50 font-plex mb-6">
            {t.compare?.emptyMessage || "Select at least 2 products from the catalog to compare them side by side."}
          </p>
          <Link
            href="/products"
            className="px-6 py-3 bg-oryn-orange text-white text-sm font-medium hover:bg-oryn-orange-dark transition-colors"
          >
            {t.cart?.browseProducts || "BROWSE PRODUCTS"}
          </Link>
        </div>
      </div>
    );
  }

  // Collect all spec keys from selected products
  const allSpecKeys = Array.from(
    new Set(selectedProducts.flatMap((p) => Object.keys(p.specs)))
  );

  return (
    <div className="pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em] mb-8">
          <Link href="/" className="hover:text-oryn-orange transition-colors">{t.productDetail?.home || "Home"}</Link>
          <span className="text-oryn-orange">/</span>
          <Link href="/compare" className="hover:text-oryn-orange transition-colors">{t.compare?.title || "Compare"}</Link>
          <span className="text-oryn-orange">/</span>
          <span className="text-oryn-orange">{t.compare?.customTitle || "Custom"}</span>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">{t.compare?.title || "Compare Products"}</h1>
            <p className="text-sm text-oryn-black/50 font-plex mt-1">
              {selectedProducts.length} {t.compare?.productsSelected || "products selected"}
            </p>
          </div>
          <button
            onClick={clearComparison}
            className="text-[10px] font-mono text-oryn-black/30 hover:text-red-500 transition-colors px-3 py-2 border border-oryn-grey/20 hover:border-red-200"
          >
            {t.compare?.clearAll || "CLEAR ALL"}
          </button>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto border border-oryn-grey/10">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-oryn-grey/10">
                <th className="p-4 text-left text-[9px] font-mono text-oryn-black/30 tracking-[0.15em] w-36 bg-oryn-grey-light" />
                {selectedProducts.map((p) => (
                  <th key={p.id} className="p-4 text-center bg-white border-l border-oryn-grey/10">
                    <Link href={`/products/${p.slug}`} className="block group">
                      <div className="w-20 h-20 bg-oryn-cream flex items-center justify-center mx-auto mb-3">
                        <Image
                          src={productImages.bySlug[p.slug] || productImages.categoryCard[p.category] || "/images/products/bpc157-hero.png"}
                          alt={p.name}
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                      <p className="text-sm font-bold group-hover:text-oryn-orange transition-colors">
                        {p.name.startsWith("ORYN") ? p.name : `ORYN ${p.name}`}
                      </p>
                      <p className="text-[10px] text-oryn-black/40 font-plex mt-0.5">{p.subtitle}</p>
                    </Link>
                    <button
                      onClick={() => toggleCompare(p)}
                      className="mt-2 text-[9px] text-oryn-black/20 hover:text-red-500 transition-colors"
                    >
                      {t.compare?.remove || "Remove"}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-oryn-grey/10">
              {/* Price row */}
              <tr className="bg-oryn-orange/5">
                <td className="p-4 text-[9px] font-mono text-oryn-black/40 tracking-[0.1em] font-bold">
                  PRICE
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center border-l border-oryn-grey/10">
                    <span className="text-lg font-bold text-oryn-orange">{formatPrice(p.price)}</span>
                  </td>
                ))}
              </tr>

              {/* Category row */}
              <tr>
                <td className="p-4 text-[9px] font-mono text-oryn-black/40 tracking-[0.1em]">
                  CATEGORY
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center text-xs font-plex border-l border-oryn-grey/10">
                    {p.categoryLabel}
                  </td>
                ))}
              </tr>

              {/* Dosage row */}
              <tr className="bg-oryn-cream/30">
                <td className="p-4 text-[9px] font-mono text-oryn-black/40 tracking-[0.1em]">
                  DOSAGE
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center text-xs font-plex border-l border-oryn-grey/10">
                    {p.dosage}
                  </td>
                ))}
              </tr>

              {/* Volume row */}
              <tr>
                <td className="p-4 text-[9px] font-mono text-oryn-black/40 tracking-[0.1em]">
                  VOLUME
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center text-xs font-plex border-l border-oryn-grey/10">
                    {p.volume}
                  </td>
                ))}
              </tr>

              {/* Dynamic spec rows */}
              {allSpecKeys.map((key, idx) => {
                const values = selectedProducts.map((p) => p.specs[key] || "—");
                const allSame = values.every((v) => v === values[0]);
                return (
                  <tr key={key} className={idx % 2 === 0 ? "bg-oryn-cream/30" : ""}>
                    <td className="p-4 text-[9px] font-mono text-oryn-black/40 tracking-[0.1em]">
                      {key.toUpperCase()}
                    </td>
                    {selectedProducts.map((p) => {
                      const value = p.specs[key] || "—";
                      return (
                        <td
                          key={p.id}
                          className={`p-4 text-center text-xs font-plex border-l border-oryn-grey/10 ${
                            !allSame && value !== "—" ? "font-medium text-oryn-black" : ""
                          }`}
                        >
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Benefits row */}
              <tr className="bg-oryn-orange/5">
                <td className="p-4 text-[9px] font-mono text-oryn-black/40 tracking-[0.1em] font-bold">
                  BENEFITS
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center text-xs font-plex border-l border-oryn-grey/10">
                    {p.benefits.length} {t.productDetail?.bestFor || "areas"}
                  </td>
                ))}
              </tr>

              {/* Badge row */}
              <tr>
                <td className="p-4 text-[9px] font-mono text-oryn-black/40 tracking-[0.1em]">
                  BADGE
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center border-l border-oryn-grey/10">
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
                <td className="p-4" />
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center border-l border-oryn-grey/10">
                    <button
                      onClick={() => addItem(p)}
                      className="px-5 py-2.5 bg-oryn-orange text-white text-[10px] font-bold tracking-[0.1em] hover:bg-oryn-orange-dark transition-colors"
                    >
                      {t.productCard?.addToCart || "ADD TO CART"}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Back to products */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="text-sm text-oryn-black/40 hover:text-oryn-orange transition-colors"
          >
            {t.cart?.continueShopping || "Continue Shopping"}
          </Link>
        </div>
      </div>
    </div>
  );
}
