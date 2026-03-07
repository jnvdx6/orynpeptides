"use client";

import { ProductCard } from "@/components/products/ProductCard";
import { Link } from "@/components/ui/LocaleLink";
import { useLocale } from "@/i18n/LocaleContext";
import { useProducts } from "@/providers/products";

export function ProductsShowcase() {
 const { t, formatPrice } = useLocale();
 const { products } = useProducts();
 const featured = products.filter((p) => p.badge);

 return (
 <section className="py-28 bg-oryn-cream">
 <div className="max-w-7xl mx-auto px-6">
 <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
 <div>
 <div className="inline-flex items-center gap-3 mb-4">
 <div className="w-8 h-px bg-oryn-orange" />
 <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
 {t.showcase.label}
 </span>
 </div>
 <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
 {t.showcase.titleLine1}
 <span className="block text-gradient-orange">{t.showcase.titleLine2}</span>
 </h2>
 <p className="text-sm text-oryn-black/40 font-plex mt-3 max-w-md">
 {t.showcase.subtitle}
 </p>
 </div>
 <Link
 href="/products"
 className="group mt-6 md:mt-0 px-6 py-3 bg-oryn-orange text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors flex items-center gap-2"
 >
 {t.showcase.viewAll}
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
 <path d="M5 12h14M12 5l7 7-7 7" />
 </svg>
 </Link>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-oryn-grey/20">
 {featured.map((product) => (
 <ProductCard key={product.id} product={product} />
 ))}
 </div>

 {/* Trust bar below products */}
 <div className="mt-8 flex flex-wrap items-center justify-center gap-8 py-6 border-t border-b border-oryn-orange/10">
 {[
 { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: t.showcase.trustShipping },
 { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: t.showcase.trustPurity },
 { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", label: t.showcase.trustCOA },
 { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", label: t.showcase.trustReturn },
 ].map((item) => (
 <div key={item.label} className="flex items-center gap-2">
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0">
 <path d={item.icon} />
 </svg>
 <span className="text-[10px] font-mono text-oryn-black/40 tracking-[0.1em]">{item.label}</span>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
