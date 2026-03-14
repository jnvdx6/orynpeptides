"use client";

import { Link } from "@/components/ui/LocaleLink";
import { useLocale } from "@/i18n/LocaleContext";

export function CTASection() {
 const { t } = useLocale();

 return (
 <section className="relative overflow-hidden bg-oryn-gradient py-20 md:py-32">
 <div className="absolute inset-0 bg-molecular-grid-orange opacity-20" />

 <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
 <div className="inline-flex items-center gap-3 mb-8">
 <div className="w-8 h-px bg-white/40" />
 <span className="text-[10px] font-mono text-white/70 tracking-[0.2em]">
 {t.cta.label}
 </span>
 <div className="w-8 h-px bg-white/40" />
 </div>

 <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
 {t.cta.titleLine1}
 <span className="block">{t.cta.titleLine2}</span>
 </h2>

 <p className="text-white/50 font-plex max-w-lg mx-auto mb-8 leading-relaxed text-sm">
 {t.cta.description}
 </p>

 {/* Value proposition bullets */}
 <div className="flex flex-wrap justify-center gap-4 mb-12">
 {[t.cta.valueProp1, t.cta.valueProp2, t.cta.valueProp3].map((prop) => (
 <div key={prop} className="flex items-center gap-2">
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
 <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
 <span className="text-[10px] font-medium text-white/80 tracking-[0.1em]">{prop}</span>
 </div>
 ))}
 </div>

 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
 <Link
 href="/products"
 className="group px-10 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.15em] hover:bg-oryn-black hover:text-white transition-all duration-300 flex items-center gap-2"
 >
 {t.cta.browseProducts}
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
 <path d="M5 12h14M12 5l7 7-7 7" />
 </svg>
 </Link>
 <Link
 href="/contact"
 className="px-10 py-4 text-white border border-white/20 font-medium text-xs tracking-[0.15em] hover:bg-white/5 hover:border-white/40 transition-all"
 >
 {t.cta.contactTeam}
 </Link>
 </div>

 <div className="mt-16 md:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
 {t.cta.badges.map((badge) => (
 <div key={badge.value} className="text-center">
 <div className="text-xl font-bold text-white/80">{badge.value}</div>
 <div className="text-[8px] font-mono tracking-[0.2em] text-white/30 mt-1">
 {badge.label}
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}

