"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/LocaleContext";

export function ScienceSection() {
 const { t, formatPrice } = useLocale();

 const sciencePoints = [
 {
 number: "01",
 title: t.science.steps[0].title,
 description: t.science.steps[0].description,
 },
 {
 number: "02",
 title: t.science.steps[1].title,
 description: t.science.steps[1].description,
 },
 {
 number: "03",
 title: t.science.steps[2].title,
 description: t.science.steps[2].description,
 },
 {
 number: "04",
 title: t.science.steps[3].title,
 description: t.science.steps[3].description,
 },
 ];

 return (
 <section className="relative overflow-hidden">
 <div className="grid grid-cols-1 lg:grid-cols-2">
 {/* Left - Dark */}
 <div className="bg-oryn-dark-orange py-28 px-6 lg:px-16 relative">
 <div className="absolute inset-0 bg-molecular-grid-dark" />

 <div className="relative z-10 max-w-lg ml-auto">
 <div className="inline-flex items-center gap-3 mb-4">
 <div className="w-8 h-px bg-oryn-orange" />
 <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
 {t.science.label}
 </span>
 </div>
 <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
 {t.science.titleLine1}
 <span className="block text-gradient-orange">{t.science.titleLine2}</span>
 </h2>
 <p className="text-white/40 font-plex leading-relaxed max-w-md mb-12 text-sm">
 {t.science.description}
 </p>

 <div className="grid grid-cols-2 gap-px bg-oryn-orange/10">
 {[
 { label: t.science.specs.manufacturingLabel, value: t.science.specs.manufacturingValue },
 { label: t.science.specs.capacityLabel, value: t.science.specs.capacityValue },
 { label: t.science.specs.batchSizeLabel, value: t.science.specs.batchSizeValue },
 { label: t.science.specs.leadTimeLabel, value: t.science.specs.leadTimeValue },
 ].map((spec) => (
 <div
 key={spec.label}
 className="p-5 bg-oryn-black/80"
 >
 <div className="text-lg font-bold text-oryn-orange">
 {spec.value}
 </div>
 <div className="text-[9px] text-white/30 font-mono tracking-[0.15em] mt-1">
 {spec.label.toUpperCase()}
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Right - Orange gradient with steps */}
 <div className="bg-oryn-gradient py-28 px-6 lg:px-16 relative">
 <div className="absolute inset-0 bg-molecular-grid-orange opacity-30" />
 <div className="absolute inset-0 opacity-10">
 <Image src="/images/molecular-bg.png" alt="" fill className="object-cover" loading="lazy" />
 </div>

 <div className="relative z-10 max-w-lg">
 <div className="space-y-12">
 {sciencePoints.map((point) => (
 <div key={point.number} className="flex gap-8 group">
 <div className="shrink-0">
 <div className="w-12 h-12 bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors">
 <span className="text-sm font-bold text-white font-mono">
 {point.number}
 </span>
 </div>
 </div>
 <div className="pt-1">
 <h3 className="text-lg font-bold text-white mb-2">
 {point.title}
 </h3>
 <p className="text-sm text-white/60 font-plex leading-relaxed">
 {point.description}
 </p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}
