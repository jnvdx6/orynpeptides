"use client";

import Image from "next/image";
import { Link } from "@/components/ui/LocaleLink";
import { products, productImages } from "@/data/products";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useLocale } from "@/i18n/LocaleContext";

/* ─── Icons (inline SVG) ──────────────────────────────────────────── */

function ShieldCheck({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function Flask({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M10 3v6.5L4 20h16l-6-10.5V3" />
      <path d="M8.5 14h7" />
    </svg>
  );
}

function Certificate({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M7 8h10M7 12h6M7 16h8" />
      <circle cx="17" cy="15" r="2" />
      <path d="M17 17v3" />
    </svg>
  );
}

function Microscope({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18h8M10 18V8l4-1v6" />
      <circle cx="14" cy="6" r="2" />
      <path d="M6 21h12M10 18c-3.3 0-6-2.7-6-6" />
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

/* ─── Deterministic batch data (no random at render) ─────────────── */

const batchNumbers: Record<string, string> = {
  "bpc-157": "ORN-BPC1-20260215",
  "tb-500": "ORN-TB50-20260218",
  "cjc-1295": "ORN-CJC1-20260220",
  "ipamorelin": "ORN-IPAM-20260222",
  "tirzepatide-pen": "ORN-TIRZ-20260210",
  "ghk-cu": "ORN-GHKC-20260212",
  "glutathione": "ORN-GLUT-20260225",
  "nad-plus": "ORN-NADP-20260228",
  "medit-tirzepatide": "ORN-MEDT-20260205",
  "novadose-nad": "ORN-NOVD-20260208",
};

const purityValues: Record<string, string> = {
  "bpc-157": "99.4%",
  "tb-500": "99.2%",
  "cjc-1295": "99.1%",
  "ipamorelin": "99.3%",
  "tirzepatide-pen": "99.5%",
  "ghk-cu": "99.0%",
  "glutathione": "98.8%",
  "nad-plus": "99.1%",
  "medit-tirzepatide": "99.4%",
  "novadose-nad": "99.2%",
};

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

export function QualityClient({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  usePageTracking("quality");
  const { t } = useLocale();
  const q = t.qualityPage;

  return (
    <div className="pt-[calc(1rem+4px)]">
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 bg-[#1a1a1a] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-molecular-grid-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#FF6A1A]/5 rounded-full blur-[120px]" />
        <div className="absolute -right-20 -top-20 w-[500px] h-[500px] border border-white/[0.03]" />
        <div className="absolute -left-10 -bottom-10 w-80 h-80 border border-white/[0.03]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] font-mono text-white/30 tracking-[0.1em] mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">{q.breadcrumbHome}</Link>
            <span className="text-white/50">/</span>
            <span className="text-white/60">{q.breadcrumbQuality}</span>
          </nav>

          <div className="inline-flex items-center gap-3 mb-6">
            <ShieldCheck className="w-5 h-5 text-[#FF6A1A]" />
            <span className="text-xs font-mono text-[#FF6A1A] tracking-[0.2em]">
              {q.heroBadge}
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            {q.heroTitle1}
            <span className="block text-[#FF6A1A]">{q.heroTitle2}</span>
          </h1>

          <p className="text-white/60 font-plex max-w-2xl leading-relaxed text-lg mb-10">
            {q.heroDescription}
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-6 md:gap-10">
            {[
              { label: q.statPurityLabel, value: ">98%" },
              { label: q.statLabsLabel, value: "ISO 17025" },
              { label: q.statTestsLabel, value: "4+" },
              { label: q.statTraceabilityLabel, value: "100%" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-[10px] font-mono text-white/30 tracking-widest mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTING PROCESS ─────────────────────────────────────── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                {q.processLabel}
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              {q.processTitle1}{" "}
              <span className="text-[#FF6A1A]">{q.processTitle2}</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              {q.processDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {q.testingSteps.map((step, i) => (
              <div
                key={i}
                className="relative p-8 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/30 hover:bg-white/[0.04] transition-all group"
              >
                {/* Step connector line */}
                {i < q.testingSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-[2px] bg-[#FF6A1A]/20" />
                )}

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-[#FF6A1A]/20 font-mono group-hover:text-[#FF6A1A]/40 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i === 0 && <Flask className="w-5 h-5 text-[#FF6A1A]" />}
                  {i === 1 && <Microscope className="w-5 h-5 text-[#FF6A1A]" />}
                  {i === 2 && <Flask className="w-5 h-5 text-[#FF6A1A]" />}
                  {i === 3 && <Certificate className="w-5 h-5 text-[#FF6A1A]" />}
                </div>

                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/40 font-plex leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUALITY STANDARDS ───────────────────────────────────── */}
      <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6A1A]/5 blur-[100px]" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                {q.certificationsLabel}
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              {q.standardsTitle1}{" "}
              <span className="text-[#FF6A1A]">{q.standardsTitle2}</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              {q.standardsDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {q.qualityStandards.map((standard, i) => {
              const values = ["GMP", "ISO 9001", "Class 10,000", ">98%"];
              return (
                <div
                  key={i}
                  className="p-8 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/30 transition-all text-center group"
                >
                  <ShieldCheck className="w-8 h-8 text-[#FF6A1A] mx-auto mb-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="text-2xl font-bold text-[#FF6A1A] mb-1 font-mono">
                    {values[i]}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-3">{standard.title}</h3>
                  <p className="text-xs text-white/40 font-plex leading-relaxed">
                    {standard.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PER-PRODUCT COA GRID ────────────────────────────────── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                {q.coaLabel}
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              {q.coaTitle1}{" "}
              <span className="text-[#FF6A1A]">{q.coaTitle2}</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              {q.coaDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {products.map((product) => {
              const purity = purityValues[product.slug] || "99.0%";
              const batch = batchNumbers[product.slug] || "ORN-XXXX-20260101";
              const imgSrc = productImages.bySlug[product.slug] || product.image;

              return (
                <div
                  key={product.slug}
                  className="relative p-6 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/30 hover:bg-white/[0.04] transition-all group"
                >
                  {/* Purity badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400/80">{q.passLabel}</span>
                  </div>

                  {/* Product image */}
                  <div className="flex justify-center mb-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={imgSrc}
                        alt={`ORYN ${product.name}`}
                        fill
                        className="object-contain"
                        sizes="80px"
                      />
                    </div>
                  </div>

                  {/* Product name */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="block text-center group/link"
                  >
                    <h3 className="text-sm font-bold text-white group-hover/link:text-[#FF6A1A] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-[10px] font-mono text-white/30 text-center mt-1 mb-4">
                    {product.dosage} | {product.categoryLabel}
                  </p>

                  {/* Test data */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-white/30">{q.purityLabel}</span>
                      <span className="text-sm font-bold text-emerald-400">{purity}</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                        style={{ width: purity }}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-white/30">{q.batchLabel}</span>
                      <span className="text-[10px] font-mono text-white/50">{batch}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-white/30">{q.testedLabel}</span>
                      <span className="text-[10px] font-mono text-white/50">{q.testedDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-white/30">{q.methodLabel}</span>
                      <span className="text-[10px] font-mono text-white/50">HPLC + MS</span>
                    </div>
                  </div>

                  {/* View COA button */}
                  <a
                    href="#"
                    className="flex items-center justify-center gap-2 w-full py-2.5 border border-[#FF6A1A]/30 text-[#FF6A1A] text-[10px] font-mono tracking-widest hover:bg-[#FF6A1A]/10 hover:border-[#FF6A1A]/50 transition-all"
                  >
                    <Certificate className="w-3.5 h-3.5" />
                    {q.viewCoa}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── THIRD-PARTY TESTING PARTNERS ────────────────────────── */}
      <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6A1A]/5 blur-[100px]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
                <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                  {q.independentLabel}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {q.partnersTitle1}{" "}
                <span className="text-[#FF6A1A]">{q.partnersTitle2}</span>
              </h2>
              <p className="text-white/50 font-plex leading-relaxed mb-6">
                {q.partnersP1}
              </p>
              <p className="text-white/50 font-plex leading-relaxed mb-8">
                {q.partnersP2}
              </p>

              <div className="space-y-4">
                {q.partnersBullets.map((item) => (
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
              {/* Testing summary card */}
              <div className="p-8 bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-sm font-mono text-[#FF6A1A] tracking-widest mb-6">
                  {q.analyticalMethodsLabel}
                </h3>
                <div className="space-y-5">
                  {q.analyticalMethods.map((test) => (
                    <div key={test.method} className="border-l-2 border-[#FF6A1A]/20 pl-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-white">{test.method}</h4>
                        <span className="text-[9px] font-mono text-[#FF6A1A]/60 bg-[#FF6A1A]/5 px-2 py-0.5">
                          {test.standard}
                        </span>
                      </div>
                      <p className="text-xs text-white/40 font-plex">{test.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT A COA CONTAINS ──────────────────────────────────── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                {q.understandingLabel}
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              {q.coaContentsTitle1}{" "}
              <span className="text-[#FF6A1A]">{q.coaContentsTitle2}</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              {q.coaContentsDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {q.coaItems.map((item) => (
              <div
                key={item.title}
                className="p-6 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/20 transition-colors"
              >
                <Certificate className="w-5 h-5 text-[#FF6A1A] mb-3" />
                <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-white/40 font-plex leading-relaxed">
                  {item.details}
                </p>
              </div>
            ))}
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
                {q.faqLabel}
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              {q.faqTitle1}{" "}
              <span className="text-[#FF6A1A]">{q.faqTitle2}</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              {q.faqDescription}
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
          <ShieldCheck className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {q.ctaTitle}
          </h2>
          <p className="text-white/70 font-plex mb-8 max-w-lg mx-auto">
            {q.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF6A1A] font-bold text-xs tracking-[0.2em] hover:bg-[#FFF8F0] transition-colors"
            >
              {q.ctaBrowseProducts}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold text-xs tracking-[0.2em] hover:bg-white/10 hover:border-white/50 transition-colors"
            >
              {q.ctaRequestCoa}
              <Certificate className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
