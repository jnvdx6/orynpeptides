"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";

export default function AboutPage() {
  const { t } = useLocale();
  const a = t.aboutPage;

  return (
    <div className="pt-[calc(1rem+4px)]">
      <section className="relative py-28 bg-oryn-gradient-radial overflow-hidden">
        {/* Breadcrumb */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 mb-8">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-white/30 tracking-[0.1em]">
            <Link href="/" className="hover:text-white/60 transition-colors">{t.productDetail.home}</Link>
            <span className="text-white/50">/</span>
            <span className="text-white/60">{t.nav.about.toUpperCase()}</span>
          </nav>
        </div>
        <div className="absolute inset-0 bg-molecular-grid-orange opacity-30" />
        <div className="absolute -right-20 -top-20 w-[500px] h-[500px] border border-white/5" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-white/40" />
            <span className="text-xs font-mono text-white/70 tracking-widest">
              {a.tagline}
            </span>
            <div className="w-8 h-[2px] bg-white/40" />
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            {a.heroTitle1}
            <span className="block">{a.heroTitle2}</span>
          </h1>
          <p className="text-white/70 font-plex max-w-2xl mx-auto leading-relaxed text-lg">
            {a.heroDescription}
          </p>
        </div>
      </section>

      <section className="py-24 bg-oryn-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex justify-center lg:justify-start mb-8">
                <Image
                  src="/images/oryn-logo-clean.png"
                  alt="ORYN"
                  width={240}
                  height={90}
                  className="h-auto drop-shadow-lg"
                />
              </div>
              <div className="accent-line-long mb-6 mx-auto lg:mx-0" />
              <p className="text-2xl font-bold leading-relaxed text-center lg:text-left">
                {a.brandStatement}{" "}
                <span className="text-oryn-orange">{a.brandHighlight}</span>
              </p>
            </div>
            <div className="space-y-6">
              {a.brandParagraphs.map((p, i) => (
                <p key={i} className="text-oryn-black/60 font-plex leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-oryn-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="accent-line" />
              <span className="text-xs font-mono text-oryn-orange tracking-widest">
                {a.valuesLabel}
              </span>
              <div className="accent-line" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              {a.valuesTitle} <span className="text-gradient-orange">ORYN</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {a.values.map((value) => (
              <div key={value.title} className="bg-white p-8 border border-oryn-orange/10 hover:border-oryn-orange/30 hover:shadow-lg hover:shadow-oryn-orange/5 transition-all">
                <div className="accent-line mb-5" />
                <h3 className="text-xl font-bold mb-3 text-oryn-orange">{value.title}</h3>
                <p className="text-sm text-oryn-black/50 font-plex leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-oryn-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="accent-line" />
              <span className="text-xs font-mono text-oryn-orange tracking-widest">
                {a.journeyLabel}
              </span>
              <div className="accent-line" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              {a.journeyTitle} <span className="text-gradient-orange">ORYN</span>
            </h2>
          </div>

          <div className="space-y-12">
            {a.timeline.map((item, i) => (
              <div key={item.year} className="flex gap-8 group">
                <div className="shrink-0 w-28 text-right">
                  <span className="text-sm font-bold text-oryn-orange font-mono px-3 py-1 bg-oryn-orange/10 ">
                    {item.year}
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute left-0 top-2 w-3 h-3 bg-oryn-orange group-hover:scale-125 transition-transform" />
                  <div className="absolute left-1.5 top-5 w-px h-full bg-oryn-orange/20" style={{ display: i === a.timeline.length - 1 ? "none" : "block" }} />
                </div>
                <div className="pl-6 pb-8">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-oryn-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-oryn-black/50 font-plex leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-oryn-black text-oryn-white relative overflow-hidden">
        <div className="absolute inset-0 bg-molecular-grid-dark" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-oryn-orange/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="accent-line" />
              <span className="text-xs font-mono text-oryn-orange tracking-widest">
                {a.manufacturingLabel}
              </span>
              <div className="accent-line" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              {a.manufacturingTitle}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {a.manufacturingSpecs.map((spec) => (
              <div
                key={spec.label}
                className="p-6 bg-oryn-orange/5 border border-oryn-orange/10 text-center hover:border-oryn-orange/30 transition-colors"
              >
                <div className="text-2xl font-bold text-oryn-orange mb-1">
                  {spec.value}
                </div>
                <div className="text-xs text-oryn-white/60 font-plex">
                  {spec.label}
                </div>
                <div className="text-[10px] text-oryn-white/30 font-mono mt-1">
                  {spec.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-oryn-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-molecular-grid-orange opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t.cta.titleLine1} <span className="opacity-60">{t.cta.titleLine2}</span>
          </h2>
          <p className="text-white/60 font-plex mb-8 max-w-lg mx-auto">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="px-8 py-4 bg-white text-oryn-orange font-bold text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors inline-flex items-center gap-2"
            >
              {t.cta.browseProducts}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-white/30 text-white font-bold text-xs tracking-[0.2em] hover:bg-white/10 transition-colors"
            >
              {t.cta.contactTeam}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
