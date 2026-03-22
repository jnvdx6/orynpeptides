"use client";

import { Link } from "@/components/ui/LocaleLink";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useLocale } from "@/i18n/LocaleContext";

/* ─── Icons (inline SVG) ──────────────────────────────────────────── */

function Truck({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function Thermometer({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
    </svg>
  );
}

function Globe({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function Package({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function MapPin({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function Clock({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ShieldCheck({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function RefreshCcw({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <polyline points="23 20 23 14 17 14" />
      <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
    </svg>
  );
}

function ChevronDown({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ─── Static data (country list — proper nouns, not translated) ──── */

const euCountries = [
  "Germany", "France", "Spain", "Italy", "Netherlands",
  "Belgium", "Austria", "Ireland", "Portugal", "Sweden",
  "Denmark", "Finland", "Poland", "Czech Republic", "Greece",
];

/* ─── FAQ Accordion ───────────────────────────────────────────────── */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border border-white/10 bg-white/[0.02] hover:border-[#FF6A1A]/30 transition-colors">
      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
        <h3 className="text-sm md:text-base font-bold text-white pr-4">{question}</h3>
        <ChevronDown className="w-5 h-5 text-[#FF6A1A] shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-6 pb-6 -mt-2">
        <p className="text-sm text-white/60 font-plex leading-relaxed">{answer}</p>
      </div>
    </details>
  );
}

/* ─── Main Component ──────────────────────────────────────────────── */

export function ShippingClient({
  faqs,
  locale,
}: {
  faqs: { question: string; answer: string }[];
  locale: string;
}) {
  usePageTracking("shipping");
  const { t } = useLocale();
  const sp = t.shippingPage;

  const symbol = locale === "en" ? "£" : "€";
  const freeThreshold = locale === "en" ? "130" : "175";

  // Replace {threshold} placeholder in translated strings
  const th = (str: string) => str.replace("{threshold}", freeThreshold);

  return (
    <div className="pt-[calc(1rem+4px)]">
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 bg-molecular-grid-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#FF6A1A]/5 rounded-full blur-[120px]" />
        <div className="absolute -right-20 -top-20 w-[500px] h-[500px] border border-white/[0.03]" />
        <div className="absolute -left-10 -bottom-10 w-80 h-80 border border-white/[0.03]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] font-mono text-white/30 tracking-[0.1em] mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">{sp.breadcrumbHome}</Link>
            <span className="text-white/50">/</span>
            <span className="text-white/60">{sp.breadcrumbShipping}</span>
          </nav>

          <div className="inline-flex items-center gap-3 mb-6">
            <Truck className="w-5 h-5 text-[#FF6A1A]" />
            <span className="text-xs font-mono text-[#FF6A1A] tracking-[0.2em]">
              {sp.heroTagline}
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            {sp.heroTitle1}
            <span className="block text-[#FF6A1A]">{sp.heroTitle2}</span>
          </h1>

          <p className="text-white/60 font-plex max-w-2xl leading-relaxed text-lg mb-10">
            {th(sp.heroDescription)}
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-6 md:gap-10">
            {[
              { label: sp.statUkDeliveryLabel, value: sp.statUkDeliveryValue },
              { label: sp.statDispatchLabel, value: sp.statDispatchValue },
              { label: sp.statFreeOverLabel, value: `${symbol}${freeThreshold}` },
              { label: sp.statPackagingLabel, value: sp.statPackagingValue },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-[10px] font-mono text-white/30 tracking-widest mt-1">
                  {stat.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UK DELIVERY ZONES ──────────────────────────────────── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                {sp.ukZonesSectionLabel}
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              {sp.ukZonesSectionTitle1}{" "}
              <span className="text-[#FF6A1A]">{sp.ukZonesSectionTitle2}</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              {sp.ukZonesSectionDescription}
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {sp.ukZones.map((zone, idx) => (
              <div
                key={zone.region}
                className={`flex items-center justify-between p-5 border transition-colors ${
                  idx === 0
                    ? "bg-[#FF6A1A]/10 border-[#FF6A1A]/30"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-[#FF6A1A]/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className={`w-4 h-4 ${idx === 0 ? "text-[#FF6A1A]" : "text-white/30"}`} />
                  <span className="text-sm font-bold text-white">{zone.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-white/30" />
                  <span className={`text-sm font-mono ${idx === 0 ? "text-[#FF6A1A] font-bold" : "text-white/60"}`}>
                    {zone.days}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto mt-6 p-4 border border-white/[0.06] bg-white/[0.02]">
            <p className="text-xs text-white/40 font-plex text-center">
              {sp.ukDeliveryNote}
            </p>
          </div>
        </div>
      </section>

      {/* ── TEMPERATURE-CONTROLLED PACKAGING ───────────────────── */}
      <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6A1A]/5 blur-[100px]" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
                <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                  {sp.coldChainSectionLabel}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {sp.packagingTitle1}{" "}
                <span className="text-[#FF6A1A]">{sp.packagingTitle2}</span>
              </h2>
              <p className="text-white/50 font-plex leading-relaxed mb-8">
                {sp.packagingDescription}
              </p>

              <div className="space-y-4">
                {sp.packagingBullets.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 w-4 h-4 border border-[#FF6A1A]/40 flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-[#FF6A1A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-white/60 font-plex">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {sp.coldChainFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/20 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Thermometer className="w-4 h-4 text-[#FF6A1A]" />
                    <h3 className="text-sm font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-xs text-white/40 font-plex leading-relaxed pl-7">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EUROPEAN DELIVERY ──────────────────────────────────── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                {sp.euSectionLabel}
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              {sp.euSectionTitle1}{" "}
              <span className="text-[#FF6A1A]">{sp.euSectionTitle2}</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              {sp.euSectionDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* EU countries grid */}
            <div className="p-8 bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-5 h-5 text-[#FF6A1A]" />
                <h3 className="text-sm font-mono text-[#FF6A1A] tracking-widest">
                  {sp.euCountriesHeader}
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {euCountries.map((country) => (
                  <div
                    key={country}
                    className="flex items-center gap-2 text-sm text-white/60 font-plex"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A1A]/40" />
                    {country}
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/30 font-plex mt-4 pt-4 border-t border-white/[0.06]">
                {sp.euCountriesNotListed}
              </p>
            </div>

            {/* EU shipping details */}
            <div className="space-y-4">
              <div className="p-6 bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-white">{sp.euDeliveryTimeTitle}</h3>
                  <span className="text-sm font-mono text-[#FF6A1A]">{sp.euDeliveryTimeValue}</span>
                </div>
                <p className="text-xs text-white/40 font-plex">
                  {sp.euDeliveryTimeDescription}
                </p>
              </div>
              <div className="p-6 bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-white">{sp.euShippingCostTitle}</h3>
                  <span className="text-sm font-mono text-[#FF6A1A]">{sp.euShippingCostValue}</span>
                </div>
                <p className="text-xs text-white/40 font-plex">
                  {sp.euShippingCostDescription}
                </p>
              </div>
              <div className="p-6 bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-white">{sp.euCustomsTitle}</h3>
                  <span className="text-sm font-mono text-white/40">{sp.euCustomsValue}</span>
                </div>
                <p className="text-xs text-white/40 font-plex">
                  {sp.euCustomsDescription}
                </p>
              </div>
              <div className="p-6 bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-white">{sp.euTrackingTitle}</h3>
                  <span className="text-sm font-mono text-[#FF6A1A]">{sp.euTrackingValue}</span>
                </div>
                <p className="text-xs text-white/40 font-plex">
                  {sp.euTrackingDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FREE SHIPPING THRESHOLD ────────────────────────────── */}
      <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6A1A]/5 blur-[100px]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                {sp.freeShippingSectionLabel}
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              {sp.freeShippingTitle1}{" "}
              <span className="text-[#FF6A1A]">{th(sp.freeShippingTitle2)}</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              {th(sp.freeShippingDescription)}
            </p>
          </div>

          {/* Progress bar example */}
          <div className="max-w-lg mx-auto p-8 bg-white/[0.02] border border-white/[0.06]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-mono text-white/40">{sp.freeShippingExampleLabel}</span>
              <span className="text-xs font-mono text-[#FF6A1A]">{sp.freeShippingExampleAway}</span>
            </div>
            <div className="w-full h-2 bg-white/5 overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-[#FF6A1A]/60 to-[#FF6A1A]"
                style={{ width: "80%" }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-white/20">
              <span>{symbol}0</span>
              <span>{symbol}{freeThreshold} FREE SHIPPING</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCREET PACKAGING & TRACKING ──────────────────────── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Discreet Packaging */}
            <div className="p-8 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/30 transition-all group">
              <Package className="w-8 h-8 text-[#FF6A1A] mb-4 opacity-60 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-lg font-bold text-white mb-3">{sp.discreetTitle}</h3>
              <p className="text-sm text-white/40 font-plex leading-relaxed mb-4">
                {sp.discreetDescription}
              </p>
              <ul className="space-y-2">
                {sp.discreetItems.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-white/50 font-plex">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A1A]/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Tracking */}
            <div className="p-8 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/30 transition-all group">
              <MapPin className="w-8 h-8 text-[#FF6A1A] mb-4 opacity-60 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-lg font-bold text-white mb-3">{sp.trackingTitle}</h3>
              <p className="text-sm text-white/40 font-plex leading-relaxed mb-4">
                {sp.trackingDescription}
              </p>
              <ul className="space-y-2">
                {sp.trackingItems.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-white/50 font-plex">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A1A]/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Returns & Refunds */}
            <div className="p-8 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/30 transition-all group">
              <RefreshCcw className="w-8 h-8 text-[#FF6A1A] mb-4 opacity-60 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-lg font-bold text-white mb-3">{sp.returnsTitle}</h3>
              <p className="text-sm text-white/40 font-plex leading-relaxed mb-4">
                {sp.returnsDescription}
              </p>
              <ul className="space-y-2">
                {sp.returnsItems.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-white/50 font-plex">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A1A]/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ─────────────────────────────────────────── */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                {sp.faqSectionLabel}
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              {sp.faqSectionTitle1}{" "}
              <span className="text-[#FF6A1A]">{sp.faqSectionTitle2}</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              {sp.faqSectionDescription}
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#FF6A1A] to-[#e55a10] relative overflow-hidden">
        <div className="absolute inset-0 bg-molecular-grid-orange opacity-20" />
        <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Truck className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {sp.ctaTitle}
          </h2>
          <p className="text-white/70 font-plex mb-8 max-w-lg mx-auto">
            {th(sp.ctaDescription)}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF6A1A] font-bold text-xs tracking-[0.2em] hover:bg-[#FFF8F0] transition-colors"
            >
              {sp.ctaShopNow}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold text-xs tracking-[0.2em] hover:bg-white/10 hover:border-white/50 transition-colors"
            >
              {sp.ctaContactUs}
              <ShieldCheck className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
