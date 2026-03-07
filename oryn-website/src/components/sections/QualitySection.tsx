"use client";

import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import type { ReactNode } from "react";

const pillarIcons: ReactNode[] = [
 (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
 </svg>
 ),
 (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
 <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
 ),
 (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
 <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
 </svg>
 ),
 (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
 <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
 </svg>
 ),
 (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
 <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
 </svg>
 ),
 (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
 <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
 ),
];

export function QualitySection() {
 const { t } = useLocale();

 const qualityPillars = t.quality.pillars.map((pillar, i) => ({
 icon: pillarIcons[i],
 title: pillar.title,
 description: pillar.description,
 }));

 return (
 <section className="py-28 bg-oryn-cream">
 <div className="absolute top-0 left-0 right-0 h-px bg-oryn-orange/20" />

 <div className="max-w-7xl mx-auto px-6">
 <div className="text-center mb-20">
 <div className="inline-flex items-center gap-3 mb-4">
 <div className="w-8 h-px bg-oryn-orange" />
 <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
 {t.quality.label}
 </span>
 <div className="w-8 h-px bg-oryn-orange" />
 </div>
 <h2 className="text-3xl md:text-5xl font-bold mt-2 tracking-tight">
 {t.quality.titleLine1}
 <span className="text-gradient-orange"> {t.quality.titleLine2}</span>
 </h2>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-oryn-orange/10">
 {qualityPillars.map((pillar) => (
 <div
 key={pillar.title}
 className="group p-8 bg-white hover:bg-oryn-orange/5 transition-colors duration-300"
 >
 <div className="w-10 h-10 bg-oryn-orange/10 flex items-center justify-center mb-6 text-oryn-orange group-hover:bg-oryn-orange group-hover:text-white transition-all duration-300">
 {pillar.icon}
 </div>
 <h3 className="text-sm font-bold mb-2 tracking-wide">{pillar.title}</h3>
 <p className="text-xs text-oryn-black/40 font-plex leading-relaxed">
 {pillar.description}
 </p>
 </div>
 ))}
 </div>

 {/* CTA */}
 <div className="mt-12 text-center">
 <Link
 href="/products"
 className="group inline-flex items-center gap-2 px-8 py-4 bg-oryn-orange text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors"
 >
 {t.showcase.viewAll}
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
 <path d="M5 12h14M12 5l7 7-7 7" />
 </svg>
 </Link>
 </div>
 </div>
 </section>
 );
}
