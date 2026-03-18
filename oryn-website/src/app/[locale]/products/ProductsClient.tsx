"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { useLocale } from "@/i18n/LocaleContext";
import { useProducts } from "@/providers/products";
import { Link } from "@/components/ui/LocaleLink";

type SortOption = "default" | "price-asc" | "price-desc" | "name";

function ProductsContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState<string>(urlCategory || "all");
  const [activeResearchArea, setActiveResearchArea] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const { t } = useLocale();
  const { products, categories } = useProducts();

  useEffect(() => {
    if (urlCategory) setActiveCategory(urlCategory);
  }, [urlCategory]);

  const filtered = useMemo(() => {
    let result =
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory);

    if (activeResearchArea !== "all") {
      result = result.filter((p) => p.researchAreas?.includes(activeResearchArea));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.benefits.some((b) => b.toLowerCase().includes(q))
      );
    }

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, activeCategory, activeResearchArea, searchQuery, sortBy]);

  return (
    <div className="pt-[calc(1rem+4px)] pb-16">
      <section className="bg-oryn-gradient py-16 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-molecular-grid-orange opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em] mb-8">
          <Link href="/" className="hover:text-oryn-orange transition-colors">{t.productDetail.home}</Link>
          <span className="text-oryn-orange">/</span>
          <span className="text-oryn-orange">{t.productDetail.products}</span>
        </nav>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" className="absolute left-3 top-1/2 -translate-y-1/2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.productsPage.searchPlaceholder}
              aria-label={t.productsPage.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2.5 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            aria-label={t.productsPage.sortBy}
            className="px-3 py-2.5 border border-oryn-grey/30 text-[10px] font-mono tracking-[0.1em] text-oryn-black/50 focus:outline-none focus:border-oryn-orange appearance-none bg-white pr-8"
          >
            <option value="default">{t.productsPage.sortBy}</option>
            <option value="price-asc">{t.productsPage.sortPriceAsc}</option>
            <option value="price-desc">{t.productsPage.sortPriceDesc}</option>
            <option value="name">{t.productsPage.sortName}</option>
          </select>
        </div>

        <div className="flex items-center gap-2 mb-8 md:mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap scrollbar-hide">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 sm:px-5 py-2.5 text-[10px] font-medium tracking-[0.15em] transition-all whitespace-nowrap shrink-0 ${
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
              className={`px-4 sm:px-5 py-2.5 text-[10px] font-medium tracking-[0.15em] transition-all whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? "bg-oryn-orange text-white"
                  : "bg-transparent text-oryn-black/50 border border-oryn-orange/10 hover:border-oryn-orange/30"
              }`}
            >
              {(t.categoryNames[cat.id] || cat.name).toUpperCase()} ({cat.count})
            </button>
          ))}
          <span className="ml-auto text-[10px] text-oryn-black/30 font-mono whitespace-nowrap shrink-0">
            {filtered.length} {t.productsPage.results}
          </span>
        </div>

        {/* Research area filter */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap scrollbar-hide">
          <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em] shrink-0 mr-1">RESEARCH:</span>
          <button
            onClick={() => setActiveResearchArea("all")}
            className={`px-3 py-1.5 text-[9px] font-medium tracking-[0.1em] transition-all whitespace-nowrap shrink-0 rounded-full ${
              activeResearchArea === "all"
                ? "bg-oryn-orange/10 text-oryn-orange border border-oryn-orange/30"
                : "bg-transparent text-oryn-black/40 border border-oryn-grey/15 hover:border-oryn-orange/20"
            }`}
          >
            ALL
          </button>
          {Array.from(new Set(products.flatMap((p) => p.researchAreas || []))).map((area) => (
            <button
              key={area}
              onClick={() => setActiveResearchArea(activeResearchArea === area ? "all" : area)}
              className={`px-3 py-1.5 text-[9px] font-medium tracking-[0.1em] transition-all whitespace-nowrap shrink-0 rounded-full ${
                activeResearchArea === area
                  ? "bg-oryn-orange/10 text-oryn-orange border border-oryn-orange/30"
                  : "bg-transparent text-oryn-black/40 border border-oryn-grey/15 hover:border-oryn-orange/20"
              }`}
            >
              {(t.researchCategories[area] || area).toUpperCase()}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5" className="mx-auto mb-4">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <p className="text-sm text-oryn-black/40 font-plex">
              {searchQuery ? `${t.productsPage.noResults} "${searchQuery}"` : t.productsPage.noCategory}
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); setActiveResearchArea("all"); }}
              className="mt-3 text-xs text-oryn-orange hover:underline"
            >
              {t.productsPage.clearFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-oryn-grey/20">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-16 p-6 bg-oryn-orange/5 border border-oryn-orange/10">
          <p className="text-[10px] text-oryn-black/30 font-mono leading-relaxed text-center tracking-wider">
            {t.productsPage.disclaimer}
          </p>
        </div>
      </section>
    </div>
  );
}

export function ProductsClient() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}
