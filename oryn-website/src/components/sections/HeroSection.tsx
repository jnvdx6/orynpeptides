"use client";

import { Link } from "@/components/ui/LocaleLink";
import Image from "next/image";
import { useLocale } from "@/i18n/LocaleContext";
import { trackCTAClick } from "@/lib/analytics";

export function HeroSection() {
 const { t, formatPrice } = useLocale();

 return (
 <section className="relative min-h-screen flex items-center overflow-hidden bg-oryn-gradient-radial">
 <div className="absolute inset-0 bg-molecular-grid-orange" />

 <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20 w-full">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

 {/* --- LEFT: Copy & CTA --- */}
 <div className="order-2 lg:order-1">
 <div className="inline-flex items-center gap-3 mb-5 sm:mb-6">
 <div className="w-8 h-px bg-white/40" />
 <span className="text-[10px] font-mono text-white/70 tracking-[0.2em]">
 {t.hero.tagline}
 </span>
 </div>

 <h1 className="text-white mb-2">
 <span className="block text-7xl sm:text-8xl md:text-[10rem] font-bold tracking-[-0.04em] leading-[0.85]">ORYN</span>
 <span className="sr-only"> — </span>
 <span className="block text-base sm:text-lg md:text-xl font-light text-white/60 tracking-wide mt-2">
 {t.hero.brandDescriptor}
 </span>
 </h1>

 <p className="text-lg sm:text-xl md:text-2xl font-light text-white/80 mb-6 sm:mb-8 tracking-wide">
 {t.hero.subtitle}
 </p>

 <div className="w-16 h-px bg-white/30 mb-6 sm:mb-8" />

 <p className="text-sm text-white/50 font-plex max-w-md mb-8 leading-relaxed">
 {t.hero.description}
 </p>

 {/* CTA buttons — primary + secondary */}
 <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 mb-8">
 <Link
 href="/products"
 onClick={() => trackCTAClick("hero_shop_peptides", "hero")}
 className="group/btn px-8 py-4 bg-white text-oryn-orange font-semibold text-xs tracking-[0.15em] hover:bg-oryn-black hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-black/10"
 >
 {t.hero.explorePeptides}
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/btn:translate-x-1 transition-transform">
 <path d="M5 12h14M12 5l7 7-7 7" />
 </svg>
 </Link>
 <Link
 href="/science"
 onClick={() => trackCTAClick("hero_our_science", "hero")}
 className="px-8 py-4 text-white border border-white/20 font-medium text-xs tracking-[0.15em] hover:bg-white/5 hover:border-white/40 transition-all text-center"
 >
 {t.hero.ourScience}
 </Link>
 </div>

 {/* Trust badges — below CTAs, clickable links to policy pages */}
 <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
 {[
 { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: t.hero.trustFreeShipping, href: "/shipping" },
 { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: t.hero.trustSecure, href: "/faq" },
 { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", label: t.hero.trustCOA, href: "/quality" },
 ].map((trust) => (
 <Link key={trust.label} href={trust.href} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-sm hover:bg-white/20 hover:border-white/20 transition-all duration-200">
 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 shrink-0">
 <path d={trust.icon} />
 </svg>
 <span className="text-[9px] font-mono text-white/70 tracking-[0.1em] whitespace-nowrap">{trust.label}</span>
 </Link>
 ))}
 </div>

 {/* Stats */}
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 pt-8 border-t border-white/10">
 {[
 { value: t.hero.stats.productsValue, label: t.hero.stats.productsLabel },
 { value: t.hero.stats.purityValue, label: t.hero.stats.purityLabel },
 { value: t.hero.stats.cleanroomValue, label: t.hero.stats.cleanroomLabel },
 { value: t.hero.stats.certifiedValue, label: t.hero.stats.certifiedLabel },
 ].map((stat) => (
 <div key={stat.label}>
 <div className="text-lg font-bold text-white mb-1">{stat.value}</div>
 <div className="text-[9px] text-white/30 font-mono tracking-[0.15em]">
 {stat.label.toUpperCase()}
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* --- RIGHT: Product image --- */}
 <div className="relative order-1 lg:order-2 flex items-center justify-center py-8 lg:py-0">
 {/* Decorative glow behind product */}
 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
 <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-white/5 blur-3xl" />
 </div>

 <div className="relative w-full max-w-md lg:max-w-none mx-auto">
 <Image
 src="/images/products/bpc157-hero.png"
 alt="ORYN Peptide Pen System"
 width={600}
 height={200}
 priority
 className="w-full h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.3)] rotate-[-15deg] scale-100 lg:scale-110"
 />
 </div>

 {/* Purity badge — bottom-left, inside container, no overlap */}
 <div className="absolute bottom-0 left-0 sm:bottom-2 sm:left-2 bg-oryn-black/90 backdrop-blur-sm text-white px-4 py-2.5 sm:px-5 sm:py-3 border border-white/10 rounded-sm">
 <div className="text-[9px] font-mono text-oryn-orange tracking-[0.15em] mb-0.5">{t.hero.purityLabel}</div>
 <div className="text-base sm:text-lg font-bold">&gt;99%</div>
 </div>

 {/* Dosing badge — top-right, inside container, no overlap */}
 <div className="absolute top-0 right-0 sm:top-2 sm:right-2 bg-white/95 backdrop-blur-sm px-4 py-2.5 sm:px-5 sm:py-3 shadow-lg rounded-sm">
 <div className="text-[9px] font-mono text-oryn-black/60 tracking-[0.15em] mb-0.5">{t.hero.dosingLabel}</div>
 <div className="text-base sm:text-lg font-bold text-oryn-orange">{t.hero.dosingValue}</div>
 </div>

 {/* Social proof — below image on mobile, bottom-right on desktop */}
 <div className="absolute -bottom-12 sm:-bottom-10 right-0 bg-white/95 backdrop-blur-sm px-4 py-2.5 shadow-lg border border-oryn-orange/10 animate-fade-in-up rounded-sm">
 <div className="flex items-center gap-2">
 <div className="flex -space-x-1.5">
 {[...Array(4)].map((_, i) => (
 <div key={i} className="w-5 h-5 rounded-full bg-oryn-orange/20 border border-white flex items-center justify-center">
 <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
 <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
 <circle cx="12" cy="7" r="4" />
 </svg>
 </div>
 ))}
 </div>
 <div>
 <p className="text-[9px] font-bold text-oryn-black">{t.hero.socialProofCount}</p>
 <p className="text-[8px] text-oryn-black/60 font-plex">{t.hero.socialProofLabel}</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}
