"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";

function ProductsContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState<string>(urlCategory || "all");
  const { t } = useLocale();

  useEffect(() => {
    if (urlCategory) setActiveCategory(urlCategory);
  }, [urlCategory]);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-[calc(1rem+4px)] pb-16">
      <section className="bg-oryn-gradient py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-molecular-grid-orange opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-white/40" />
            <span className="text-[10px] font-mono text-white/70 tracking-[0.2em]">
              {t.productsPage.label}
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            {t.productsPage.title}
          </h1>
          <p className="text-white/60 font-plex max-w-lg text-sm mb-8">
            {t.productsPage.description}
          </p>
          {/* Trust badges in hero */}
          <div className="flex flex-wrap gap-3">
            {[
              t.showcase.trustShipping,
              t.showcase.trustPurity,
              t.showcase.trustCOA,
              t.showcase.trustReturn,
            ].map((label) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/10">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[9px] font-mono text-white/70 tracking-[0.1em]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em] mb-8">
          <Link href="/" className="hover:text-oryn-orange transition-colors">{t.productDetail.home}</Link>
          <span className="text-oryn-orange">/</span>
          <span className="text-oryn-orange">{t.productDetail.products}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2.5 text-[10px] font-medium tracking-[0.15em] transition-all ${
              activeCategory === "all"
                ? "bg-oryn-orange text-white"
                : "bg-transparent text-oryn-black/50 border border-oryn-orange/10 hover:border-oryn-orange/30"
            }`}
          >
            {t.productsPage.all} ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 text-[10px] font-medium tracking-[0.15em] transition-all ${
                activeCategory === cat.id
                  ? "bg-oryn-orange text-white"
                  : "bg-transparent text-oryn-black/50 border border-oryn-orange/10 hover:border-oryn-orange/30"
              }`}
            >
              {(t.categoryNames[cat.id] || cat.name).toUpperCase()} ({cat.count})
            </button>
          ))}
          <span className="ml-auto text-[10px] text-oryn-black/30 font-mono">
            {filtered.length} {t.productsPage.results}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-oryn-grey/20">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 p-6 bg-oryn-orange/5 border border-oryn-orange/10">
          <p className="text-[10px] text-oryn-black/30 font-mono leading-relaxed text-center tracking-wider">
            {t.productsPage.disclaimer}
          </p>
        </div>
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}
