"use client";

import { ProductCard } from "@/components/products/ProductCard";
import { useProducts } from "@/providers/products";
import type { Campaign } from "@/data/campaigns";

export function CampaignProducts({ campaign }: { campaign: Campaign }) {
  const { products } = useProducts();
  const { theme } = campaign;

  const heroProducts = campaign.heroProductSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as typeof products;

  if (heroProducts.length === 0) return null;

  return (
    <section id="products" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-oryn-orange/30" />
            <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] uppercase">
              {campaign.subtitle}
            </span>
            <div className="w-8 h-px bg-oryn-orange/30" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-oryn-black tracking-tight mb-3">
            Hero Products
          </h2>
          <p className="text-sm text-oryn-black/50 font-plex max-w-lg mx-auto">
            Our curated selection of research-grade peptides for this campaign.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {heroProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
