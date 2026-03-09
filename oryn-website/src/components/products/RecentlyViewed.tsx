"use client";

import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useProducts } from "@/providers/products";
import { useLocale } from "@/i18n/LocaleContext";
import { ProductCard } from "@/components/products/ProductCard";

interface Props {
  currentSlug?: string;
}

export function RecentlyViewed({ currentSlug }: Props) {
  const { viewed } = useRecentlyViewed();
  const { products } = useProducts();
  const { t } = useLocale();

  // Exclude current product, map slugs to products
  const recentProducts = viewed
    .filter((slug) => slug !== currentSlug)
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean)
    .slice(0, 4);

  if (recentProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-px bg-oryn-orange" />
        <h3 className="text-lg font-bold tracking-wide">{t.recentlyViewed.title}</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-oryn-grey/20">
        {recentProducts.map((p) => (
          <ProductCard key={p!.id} product={p!} />
        ))}
      </div>
    </section>
  );
}
