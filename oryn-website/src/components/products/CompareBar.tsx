"use client";

import Image from "next/image";
import { useCompare } from "@/providers/compare";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import { productImages } from "@/data/products";

export function CompareBar() {
  const { selectedProducts, toggleCompare, clearComparison } = useCompare();
  const { t } = useLocale();

  if (selectedProducts.length === 0) return null;

  const canCompare = selectedProducts.length >= 2;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-oryn-grey/30 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] animate-[slideUp_0.3s_ease-out]"
      style={{ animationFillMode: "forwards" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-4">
        {/* Selected products */}
        <div className="flex items-center gap-2 flex-1 min-w-0 overflow-x-auto">
          {selectedProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-2 px-2 py-1.5 bg-oryn-grey-light shrink-0 group"
            >
              <div className="w-8 h-8 bg-oryn-cream flex items-center justify-center shrink-0">
                <Image
                  src={
                    productImages.bySlug[product.slug] ||
                    productImages.categoryCard[product.category] ||
                    "/images/products/peptide-pen-black.png"
                  }
                  alt={product.name}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-[10px] font-bold truncate max-w-[80px] sm:max-w-[120px]">
                {product.name}
              </span>
              <button
                onClick={() => toggleCompare(product)}
                className="text-oryn-black/20 hover:text-red-500 transition-colors shrink-0"
                aria-label={`Remove ${product.name} from comparison`}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearComparison}
            className="text-[9px] font-mono text-oryn-black/30 hover:text-oryn-black/60 transition-colors px-2 py-1"
          >
            {t.compare?.clearAll || "CLEAR"}
          </button>
          {canCompare ? (
            <Link
              href="/compare/custom"
              className="px-4 py-2.5 bg-oryn-orange text-white text-[10px] font-bold tracking-[0.1em] hover:bg-oryn-orange-dark transition-colors flex items-center gap-1.5"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
              {t.compare?.compareNow || "COMPARE"}
            </Link>
          ) : (
            <span className="text-[9px] font-mono text-oryn-black/30 px-3 py-2">
              {t.compare?.selectMore || "Select 1 more"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
