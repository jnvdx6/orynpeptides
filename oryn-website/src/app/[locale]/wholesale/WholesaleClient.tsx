"use client";

import Image from "next/image";
import { Link } from "@/components/ui/LocaleLink";
import { products, productImages } from "@/data/products";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useLocale } from "@/i18n/LocaleContext";

/* ─── Icons (inline SVG) ──────────────────────────────────────────── */

function Package({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function Users({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

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

function Tag({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
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

function CheckMark({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────── */

const discountTiers = [
  { range: "3 – 5 units", discount: "5%", labelKey: "tierLabelStarter" as const },
  { range: "6 – 9 units", discount: "10%", labelKey: "tierLabelProfessional" as const },
  { range: "10+ units", discount: "15%", labelKey: "tierLabelEnterprise" as const },
  { range: "50+ units", discount: "Custom", labelKey: "tierLabelCustom" as const },
];

/* ─── Featured wholesale products (top 6 by price variety) ─────── */
const wholesaleProducts = [
  products.find((p) => p.slug === "bpc-157")!,
  products.find((p) => p.slug === "tirzepatide-pen")!,
  products.find((p) => p.slug === "ghk-cu")!,
  products.find((p) => p.slug === "nad-plus")!,
  products.find((p) => p.slug === "medit-tirzepatide")!,
  products.find((p) => p.slug === "novadose-nad")!,
].filter(Boolean);

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

export function WholesaleClient({
  faqs,
  locale,
}: {
  faqs: { question: string; answer: string }[];
  locale: string;
}) {
  usePageTracking("wholesale");
  const { t } = useLocale();
  const w = t.wholesalePage;
  const symbol = "€";

  const wholesaleBenefits = [
    { icon: "users", title: w.benefitAccountManagerTitle, description: w.benefitAccountManagerDesc },
    { icon: "truck", title: w.benefitShippingTitle, description: w.benefitShippingDesc },
    { icon: "tag", title: w.benefitVolumePricingTitle, description: w.benefitVolumePricingDesc },
    { icon: "shield", title: w.benefitCOATitle, description: w.benefitCOADesc },
    { icon: "package", title: w.benefitCustomLabellingTitle, description: w.benefitCustomLabellingDesc },
    { icon: "flask", title: w.benefitTechSupportTitle, description: w.benefitTechSupportDesc },
  ];

  const customerTypes = [
    { title: w.customerUniversitiesTitle, description: w.customerUniversitiesDesc },
    { title: w.customerResearchLabsTitle, description: w.customerResearchLabsDesc },
    { title: w.customerPharmaTitle, description: w.customerPharmaDesc },
    { title: w.customerClinicsTitle, description: w.customerClinicsDesc },
    { title: w.customerDistributorsTitle, description: w.customerDistributorsDesc },
    { title: w.customerBiotechTitle, description: w.customerBiotechDesc },
  ];

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
            <Link href="/" className="hover:text-white/60 transition-colors">{w.breadcrumbHome}</Link>
            <span className="text-white/50">/</span>
            <span className="text-white/60">{w.breadcrumbWholesale}</span>
          </nav>

          <div className="inline-flex items-center gap-3 mb-6">
            <Package className="w-5 h-5 text-[#FF6A1A]" />
            <span className="text-xs font-mono text-[#FF6A1A] tracking-[0.2em]">
              {w.heroBulkOrders}
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            {w.heroTitle1}
            <span className="block text-[#FF6A1A]">{w.heroTitle2}</span>
          </h1>

          <p className="text-white/60 font-plex max-w-2xl leading-relaxed text-lg mb-10">
            {w.heroDescription}
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-6 md:gap-10">
            {[
              { label: w.statMinOrderLabel, value: w.statMinOrderValue },
              { label: w.statMaxDiscountLabel, value: w.statMaxDiscountValue },
              { label: w.statPurityLabel, value: w.statPurityValue },
              { label: w.statDispatchLabel, value: w.statDispatchValue },
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

      {/* ── DISCOUNT TIERS ─────────────────────────────────────── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                {w.tiersLabel}
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              {w.tiersTitle1}{" "}
              <span className="text-[#FF6A1A]">{w.tiersTitle2}</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              {w.tiersDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {discountTiers.map((tier, i) => (
              <div
                key={tier.range}
                className={`relative p-8 border transition-all text-center group ${
                  i === 2
                    ? "bg-[#FF6A1A]/10 border-[#FF6A1A]/40 hover:border-[#FF6A1A]/60"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-[#FF6A1A]/30"
                }`}
              >
                {i === 2 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FF6A1A] text-white text-[9px] font-mono tracking-widest">
                    {w.tierMostPopular}
                  </div>
                )}
                <span className="text-[10px] font-mono text-white/30 tracking-widest block mb-3">
                  {w[tier.labelKey]}
                </span>
                <div className="text-4xl md:text-5xl font-bold text-[#FF6A1A] mb-2">
                  {tier.discount}
                </div>
                <span className="text-xs font-mono text-white/30 tracking-wider block mb-1">
                  {tier.discount !== "Custom" ? w.tierOffRetail : w.tierPricing}
                </span>
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <span className="text-sm font-bold text-white">{tier.range}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHOLESALE BENEFITS ─────────────────────────────────── */}
      <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6A1A]/5 blur-[100px]" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                {w.benefitsLabel}
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              {w.benefitsTitle1}{" "}
              <span className="text-[#FF6A1A]">{w.benefitsTitle2}</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              {w.benefitsDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wholesaleBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-8 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/30 hover:bg-white/[0.04] transition-all group"
              >
                <div className="mb-4">
                  {benefit.icon === "users" && <Users className="w-6 h-6 text-[#FF6A1A] opacity-60 group-hover:opacity-100 transition-opacity" />}
                  {benefit.icon === "truck" && <Truck className="w-6 h-6 text-[#FF6A1A] opacity-60 group-hover:opacity-100 transition-opacity" />}
                  {benefit.icon === "tag" && <Tag className="w-6 h-6 text-[#FF6A1A] opacity-60 group-hover:opacity-100 transition-opacity" />}
                  {benefit.icon === "shield" && <ShieldCheck className="w-6 h-6 text-[#FF6A1A] opacity-60 group-hover:opacity-100 transition-opacity" />}
                  {benefit.icon === "package" && <Package className="w-6 h-6 text-[#FF6A1A] opacity-60 group-hover:opacity-100 transition-opacity" />}
                  {benefit.icon === "flask" && (
                    <svg className="w-6 h-6 text-[#FF6A1A] opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 3h6M10 3v6.5L4 20h16l-6-10.5V3" />
                      <path d="M8.5 14h7" />
                    </svg>
                  )}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-white/40 font-plex leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ───────────────────────────────────────── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                {w.whoWeServeLabel}
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              {w.whoWeServeTitle1}{" "}
              <span className="text-[#FF6A1A]">{w.whoWeServeTitle2}</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              {w.whoWeServeDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customerTypes.map((customer) => (
              <div
                key={customer.title}
                className="p-6 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/20 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="mt-0.5 w-4 h-4 border border-[#FF6A1A]/40 flex items-center justify-center shrink-0">
                    <CheckMark className="w-2.5 h-2.5 text-[#FF6A1A]" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{customer.title}</h3>
                </div>
                <p className="text-xs text-white/40 font-plex leading-relaxed pl-7">
                  {customer.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHOLESALE PRODUCTS GRID ────────────────────────────── */}
      <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6A1A]/5 blur-[100px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                {w.productsLabel}
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              {w.productsTitle1}{" "}
              <span className="text-[#FF6A1A]">{w.productsTitle2}</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              {w.productsDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wholesaleProducts.map((product) => {
              const imgSrc = productImages.bySlug[product.slug] || product.image;
              const price5 = (product.price * 0.95).toFixed(0);
              const price10 = (product.price * 0.9).toFixed(0);
              const price15 = (product.price * 0.85).toFixed(0);

              return (
                <div
                  key={product.slug}
                  className="p-6 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/30 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-16 h-16 shrink-0">
                      <Image
                        src={imgSrc}
                        alt={`ORYN ${product.name}`}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-sm font-bold text-white hover:text-[#FF6A1A] transition-colors"
                      >
                        {product.name}
                      </Link>
                      <p className="text-[10px] font-mono text-white/30 mt-1">
                        {product.dosage} | {product.categoryLabel}
                      </p>
                      <p className="text-sm font-bold text-white/60 mt-1">
                        <span className="text-[10px] font-mono text-white/30 mr-1">{w.productRetailLabel}</span>
                        {symbol}{product.price}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-white/[0.06] pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-white/30">3-5 UNITS (5%)</span>
                      <span className="text-sm font-bold text-white">{symbol}{price5}/unit</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-white/30">6-9 UNITS (10%)</span>
                      <span className="text-sm font-bold text-white">{symbol}{price10}/unit</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-[#FF6A1A]/60">10+ UNITS (15%)</span>
                      <span className="text-sm font-bold text-[#FF6A1A]">{symbol}{price15}/unit</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-[#FF6A1A] font-mono tracking-wider hover:underline"
            >
              {w.productViewAll.replace("{count}", String(products.length))}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ─────────────────────────────────────────── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                {w.faqLabel}
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              {w.faqTitle1}{" "}
              <span className="text-[#FF6A1A]">{w.faqTitle2}</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              {w.faqDescription}
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
          <Package className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {w.ctaTitle}
          </h2>
          <p className="text-white/70 font-plex mb-8 max-w-lg mx-auto">
            {w.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF6A1A] font-bold text-xs tracking-[0.2em] hover:bg-[#FFF8F0] transition-colors"
            >
              {w.ctaEnquiry}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold text-xs tracking-[0.2em] hover:bg-white/10 hover:border-white/50 transition-colors"
            >
              {w.ctaBrowseProducts}
              <Package className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
