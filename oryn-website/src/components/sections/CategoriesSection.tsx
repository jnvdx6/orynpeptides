"use client";

import { Link } from "@/components/ui/LocaleLink";
import Image from "next/image";
import { useLocale } from "@/i18n/LocaleContext";

const categoryStaticData = [
 {
 id: "peptide-pen",
 specs: ["3 mL", "30 Days", "8 Peptides"],
 image: "/images/peptide-pen-real.png",
 href: "/products?category=peptide-pen",
 fromPrice: 169,
 },
 {
 id: "medit-pen",
 specs: ["40 mg", "Weekly", "Prefilled"],
 image: "/images/medit-box.png",
 href: "/products?category=medit-pen",
 fromPrice: 349,
 },
 {
 id: "novadose",
 specs: ["500 mg", "Daily", "Cartridge"],
 image: "/images/novadose-pen-real.png",
 href: "/products?category=novadose",
 fromPrice: 399,
 },
];

export function CategoriesSection() {
 const { t, formatPrice } = useLocale();

 const categoryData = categoryStaticData.map((cat, i) => ({
 ...cat,
 name: t.categories.items[i].name,
 tagline: t.categories.items[i].tagline,
 description: t.categories.items[i].description,
 }));

 return (
 <section className="py-28 bg-oryn-white">
 <div className="max-w-7xl mx-auto px-6">
 <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
 <div>
 <div className="inline-flex items-center gap-3 mb-4">
 <div className="w-8 h-px bg-oryn-orange" />
 <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
 {t.categories.label}
 </span>
 </div>
 <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
 {t.categories.titleLine1}
 <span className="block text-gradient-orange">{t.categories.titleLine2}</span>
 </h2>
 </div>
 <p className="text-oryn-black/40 font-plex max-w-sm text-sm leading-relaxed">
 {t.categories.description}
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-oryn-grey/30">
 {categoryData.map((cat) => (
 <Link
 key={cat.id}
 href={cat.href}
 className="group relative bg-oryn-black overflow-hidden hover:bg-oryn-orange transition-colors duration-500"
 >
 <div className="relative p-10 min-h-[440px] flex flex-col justify-between">
 <div className="relative h-48 flex items-center justify-center mb-8">
 <Image
 src={cat.image}
 alt={cat.name}
 width={240}
 height={180}
 className="object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
 />
 </div>

 <div>
 <p className="text-[10px] font-mono text-oryn-orange group-hover:text-white/70 tracking-[0.15em] mb-2 transition-colors">
 {cat.tagline}
 </p>
 <h3 className="text-xl font-bold text-white mb-3">{cat.name}</h3>
 <p className="text-sm text-white/40 group-hover:text-white/60 font-plex leading-relaxed mb-6 transition-colors">
 {cat.description}
 </p>

 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 {cat.specs.map((spec) => (
 <span
 key={spec}
 className="text-[9px] font-mono text-white/30 group-hover:text-white/50 px-2 py-1 border border-white/10 tracking-[0.1em] transition-colors"
 >
 {spec}
 </span>
 ))}
 </div>
 <span className="text-sm font-bold text-oryn-orange group-hover:text-white transition-colors">
 {t.categories.from} {formatPrice(cat.fromPrice)}
 </span>
 </div>
 </div>

 <div className="absolute top-10 right-10 text-white/10 group-hover:text-white/30 transition-colors">
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
 <path d="M7 17L17 7M17 7H7M17 7v10" />
 </svg>
 </div>
 </div>
 </Link>
 ))}
 </div>
 </div>
 </section>
 );
}
