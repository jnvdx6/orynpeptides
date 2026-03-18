import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { breadcrumbSchema, faqSchema, organizationSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { PageTracker } from "@/components/analytics/PageTracker";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { products, productImages } from "@/data/products";

/* ─── Static Params ──────────────────────────────────────────────── */

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/* ─── Metadata ───────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const w = dict.whyOrynPage;

  // Build locale-aware description from the first differentiator in the dict
  const firstDesc = w.differentiators[0]?.description ?? "";
  const description = firstDesc.length > 160 ? firstDesc.slice(0, 157) + "..." : firstDesc;

  return {
    title: "Why ORYN | Best Peptide Company UK 2026",
    description: description || "Discover why ORYN is the most trusted peptide supplier in the UK. Pre-dosed peptide pens, >99% HPLC-verified purity, ISO 7 GMP manufacturing. Free UK shipping over €150.",
    keywords: [
      "best peptide company UK",
      "best peptides UK",
      "most trusted peptide supplier UK",
      "highest quality peptide pens UK",
      "buy peptide pens UK",
      "research peptides UK",
      "GMP peptides UK",
      "HPLC verified peptides",
      "peptide pen system UK",
      "ORYN peptides",
      "pre-dosed peptide pens",
      "ISO 7 cleanroom peptides",
    ],
    openGraph: {
      title: "Why ORYN — Best Peptide Company UK 2026",
      description: description || "Discover why ORYN is the most trusted peptide supplier in the UK.",
      url: `${SITE_URL}/${locale}/why-oryn`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Why ORYN — Best Peptide Company UK 2026",
      description: description || "Pre-dosed peptide pens. 98%+ purity. GMP manufacturing. UK's most trusted peptide supplier.",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/why-oryn`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/why-oryn`])
        ),
        "x-default": `${SITE_URL}/en/why-oryn`,
      },
    },
  };
}

/* ─── Data ───────────────────────────────────────────────────────── */

// SVG icon paths for differentiators — order must match dict.whyOrynPage.differentiators
const differentiatorIcons = [
  "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
];

const faqs = [
  {
    question: "Is ORYN the best peptide company in the UK?",
    answer:
      "ORYN Peptide Labs is widely regarded as one of the leading peptide suppliers in the UK. We are the only UK company offering pre-dosed peptide pen systems with 98%+ HPLC-verified purity, ISO 7 cleanroom manufacturing, and comprehensive Certificates of Analysis with every order. Our unique pen format eliminates reconstitution errors and contamination risks that are common with traditional vial-based peptides.",
  },
  {
    question: "How does ORYN compare to other UK peptide suppliers?",
    answer:
      "ORYN differentiates from other UK peptide suppliers in several key areas: (1) We offer pre-mixed peptide pens rather than loose vials, (2) Our purity exceeds 98% verified by both HPLC and mass spectrometry, (3) All products are manufactured in ISO 7 cleanrooms under GMP conditions, (4) Every order includes a full COA, and (5) We offer free next-day UK shipping on orders over €150. Most competitors sell unverified vials requiring reconstitution.",
  },
  {
    question: "What purity standards do ORYN peptides meet?",
    answer:
      "All ORYN peptides exceed 98% purity, independently verified through High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry (MS). Each batch undergoes endotoxin testing and sterility verification. Our Certificate of Analysis, included with every order, documents the exact purity, identity, and safety profile of your specific batch.",
  },
  {
    question: "Why are ORYN peptide pens better than vials?",
    answer:
      "ORYN's pre-dosed peptide pen system offers significant advantages over traditional vials: no reconstitution required (eliminating mixing errors and contamination risk), precise dosing with each click, 30-day supply in a single pen, sterile sealed environment maintained until use, and convenient portability for research settings. The pen format represents a significant advancement in peptide delivery for research applications.",
  },
  {
    question: "Does ORYN offer free shipping in the UK?",
    answer:
      "Yes, ORYN provides free next-day delivery on all UK orders over €150. All shipments use temperature-controlled packaging to maintain peptide integrity during transit. We deliver to over 15 major UK cities with same-day dispatch available for London orders. Orders under €150 ship for a flat rate with the same quality packaging.",
  },
  {
    question: "Are ORYN peptides manufactured in the UK?",
    answer:
      "ORYN peptides are manufactured in GMP-certified European facilities with ISO 7 cleanroom production standards. Our manufacturing process includes solid-phase peptide synthesis (SPPS), multi-step HPLC purification, sterile filling under ISO 7 conditions, 0.22\u03BCm filtration, gamma ray sterilisation, and independent third-party testing. Every step is documented for full batch traceability.",
  },
];

/* ─── Page Component ─────────────────────────────────────────────── */

export default async function WhyOrynPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const w = dict.whyOrynPage;
  const currency = "€";

  // Merge translated text with SVG icon paths
  const differentiators = w.differentiators.map((d, i) => ({
    ...d,
    icon: differentiatorIcons[i] ?? differentiatorIcons[0],
  }));

  // Enhanced organization schema for this authority page
  const enhancedOrgSchema = {
    ...organizationSchema(),
    foundingDate: "2024",
    award: "UK's Leading Peptide Pen Innovator",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
    knowsAbout: [
      "Peptide synthesis",
      "GMP manufacturing",
      "HPLC purification",
      "Peptide pen delivery systems",
      "Research-grade peptides",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "ORYN Peptide Products",
      numberOfItems: products.length,
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Why Choose ORYN — Key Differentiators",
    numberOfItems: differentiators.length,
    itemListElement: differentiators.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: d.title,
      description: d.description,
    })),
  };

  return (
    <>
      <MultiJsonLd
        items={[
          enhancedOrgSchema,
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.whyOryn, url: `/${locale}/why-oryn` },
          ]),
          faqSchema(faqs),
          itemListSchema,
        ]}
      />
      <PageTracker pageName="why_oryn" />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">
              HOME
            </Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">WHY ORYN</span>
          </nav>
        </div>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="bg-oryn-black text-white py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-molecular-grid-dark opacity-40" />
          {/* Accent glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-oryn-orange/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-oryn-orange/3 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-oryn-orange/60" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.3em]">
                BEST PEPTIDE COMPANY UK 2026
              </span>
              <div className="w-10 h-[2px] bg-oryn-orange/60" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-tight">
              Why Researchers{" "}
              <span className="text-gradient-orange">Trust ORYN</span>
            </h1>

            <p className="text-white/50 font-plex max-w-3xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
              The UK&apos;s only supplier of{" "}
              <strong className="text-white/80">pre-dosed peptide pen systems</strong>{" "}
              with 98%+ HPLC-verified purity, ISO 7 cleanroom manufacturing, and a
              Certificate of Analysis with every order. No vials. No reconstitution.
              No compromise.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/${locale}/products`}
                className="px-8 py-4 bg-oryn-orange text-white text-sm font-bold tracking-wider hover:bg-oryn-orange-dark transition-colors"
              >
                EXPLORE PRODUCTS
              </Link>
              <Link
                href={`/${locale}/science`}
                className="px-8 py-4 border border-white/20 text-white text-sm font-bold tracking-wider hover:border-oryn-orange hover:text-oryn-orange transition-colors"
              >
                OUR SCIENCE
              </Link>
            </div>
          </div>
        </section>

        {/* ── KEY DIFFERENTIATORS ──────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-oryn-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-oryn-orange/40" />
                <span className="text-[10px] font-mono text-oryn-black/40 tracking-[0.25em]">
                  WHAT SETS US APART
                </span>
                <div className="w-8 h-[2px] bg-oryn-orange/40" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                6 Reasons ORYN Is the Best Peptide Company in the UK
              </h2>
              <p className="text-oryn-black/50 font-plex max-w-2xl mx-auto">
                From our unique pen format to our obsessive quality standards, here is
                why researchers across the UK choose ORYN over every other supplier.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentiators.map((item) => (
                <div
                  key={item.title}
                  className="border border-oryn-grey/20 p-8 hover:border-oryn-orange/30 transition-all group bg-white"
                >
                  <div className="w-12 h-12 bg-oryn-orange/10 flex items-center justify-center mb-5">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FF6A1A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <div className="text-[9px] font-mono text-oryn-orange tracking-[0.2em] mb-2">
                    {item.highlight.toUpperCase()}
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-oryn-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-oryn-black/50 font-plex leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ORYN VS THE MARKET ──────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-oryn-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-molecular-grid-dark opacity-30" />
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-oryn-orange/40" />
                <span className="text-[10px] font-mono text-oryn-orange/70 tracking-[0.25em]">
                  HEAD-TO-HEAD COMPARISON
                </span>
                <div className="w-8 h-[2px] bg-oryn-orange/40" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                ORYN vs Typical UK Peptide Suppliers
              </h2>
              <p className="text-white/40 font-plex max-w-2xl mx-auto">
                See how ORYN&apos;s standards compare to the average UK peptide supplier.
                The differences speak for themselves.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="border border-white/10 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_1fr_1fr] bg-oryn-grey-mid">
                <div className="p-4 text-[10px] font-mono text-white/40 tracking-[0.15em]">
                  {w.feature.toUpperCase()}
                </div>
                <div className="p-4 text-[10px] font-mono text-oryn-orange tracking-[0.15em] text-center border-x border-white/5">
                  {w.tableOryn}
                </div>
                <div className="p-4 text-[10px] font-mono text-white/30 tracking-[0.15em] text-center">
                  {w.tableCompetitors}
                </div>
              </div>

              {/* Table Rows */}
              {w.comparisonFeatures.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-[1fr_1fr_1fr] ${
                    i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
                  } border-t border-white/5`}
                >
                  <div className="p-4 text-sm font-medium text-white/70">
                    {row.feature}
                  </div>
                  <div className="p-4 text-sm text-oryn-orange font-medium text-center border-x border-white/5 flex items-center justify-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FF6A1A"
                      strokeWidth="2.5"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs font-plex">{row.oryn}</span>
                  </div>
                  <div className="p-4 text-xs text-white/30 font-plex text-center flex items-center justify-center gap-2">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                    <span>{row.competitor}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href={`/${locale}/quality`}
                className="text-[11px] font-mono text-oryn-orange tracking-[0.15em] hover:text-oryn-orange-light transition-colors inline-flex items-center gap-2"
              >
                VIEW OUR QUALITY STANDARDS
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ── BY THE NUMBERS ──────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-oryn-cream border-y border-oryn-orange/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-oryn-orange/40" />
                <span className="text-[10px] font-mono text-oryn-black/40 tracking-[0.25em]">
                  {w.ourNumbers}
                </span>
                <div className="w-8 h-[2px] bg-oryn-orange/40" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                ORYN at a Glance
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {w.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-oryn-orange mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-oryn-black mb-1">
                    {stat.label}
                  </div>
                  <div className="text-[10px] font-mono text-oryn-black/40 tracking-wide">
                    {stat.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT SETS US APART — LONG-FORM ─────────────────────── */}
        <section className="py-20 md:py-28 bg-oryn-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-oryn-orange/40" />
                <span className="text-[10px] font-mono text-oryn-black/40 tracking-[0.25em]">
                  OUR MISSION
                </span>
                <div className="w-8 h-[2px] bg-oryn-orange/40" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Built for Researchers, by Scientists
              </h2>
            </div>

            <div className="prose-oryn space-y-6 text-oryn-black/60 font-plex leading-relaxed">
              <p className="text-lg">
                ORYN Peptide Labs was founded with a single conviction: researchers
                deserve better than loose vials, questionable purity claims, and
                suppliers who disappear after the sale. We set out to build the{" "}
                <strong className="text-oryn-black/80">
                  most trusted peptide company in the UK
                </strong>{" "}
                — and every decision we make reflects that mission.
              </p>

              <p>
                Our{" "}
                <Link
                  href={`/${locale}/science`}
                  className="text-oryn-orange hover:text-oryn-orange-dark underline underline-offset-2"
                >
                  peptide pen system
                </Link>{" "}
                was born from a simple observation: reconstituting peptides from
                lyophilised powder is error-prone, messy, and introduces
                contamination at every step. By pre-mixing peptides in a
                pharmaceutical-grade bacteriostatic solution and sealing them in
                precision pen devices, we eliminated the most common failure points
                in peptide research. Each pen delivers consistent, accurate doses
                over a 30-day research protocol — no calculations, no risk.
              </p>

              <p>
                Quality is not a marketing claim at ORYN. It is an obsession. Our
                manufacturing partners operate under full{" "}
                <strong className="text-oryn-black/80">
                  GMP certification
                </strong>{" "}
                with{" "}
                <strong className="text-oryn-black/80">
                  ISO 7 cleanroom production
                </strong>
                . Every batch undergoes dual analytical testing — HPLC for purity
                verification and mass spectrometry for identity confirmation. We test
                for endotoxins, sterility, and stability. And we share all of this
                data openly: every order ships with a comprehensive{" "}
                <Link
                  href={`/${locale}/quality`}
                  className="text-oryn-orange hover:text-oryn-orange-dark underline underline-offset-2"
                >
                  Certificate of Analysis
                </Link>
                .
              </p>

              <p>
                We serve researchers across the UK — from{" "}
                <Link
                  href={`/${locale}/peptides/london`}
                  className="text-oryn-orange hover:text-oryn-orange-dark underline underline-offset-2"
                >
                  London
                </Link>{" "}
                to{" "}
                <Link
                  href={`/${locale}/peptides/manchester`}
                  className="text-oryn-orange hover:text-oryn-orange-dark underline underline-offset-2"
                >
                  Manchester
                </Link>
                ,{" "}
                <Link
                  href={`/${locale}/peptides/birmingham`}
                  className="text-oryn-orange hover:text-oryn-orange-dark underline underline-offset-2"
                >
                  Birmingham
                </Link>{" "}
                to{" "}
                <Link
                  href={`/${locale}/peptides/edinburgh`}
                  className="text-oryn-orange hover:text-oryn-orange-dark underline underline-offset-2"
                >
                  Edinburgh
                </Link>
                . With free next-day shipping on orders over {currency}150 and
                same-day dispatch for London, getting research-grade peptides has
                never been faster or more reliable.
              </p>

              <p>
                Whether you are studying{" "}
                <Link
                  href={`/${locale}/peptides-for/recovery`}
                  className="text-oryn-orange hover:text-oryn-orange-dark underline underline-offset-2"
                >
                  tissue recovery with BPC-157
                </Link>
                , exploring{" "}
                <Link
                  href={`/${locale}/peptides-for/weight-loss`}
                  className="text-oryn-orange hover:text-oryn-orange-dark underline underline-offset-2"
                >
                  metabolic pathways with Tirzepatide
                </Link>
                , or investigating{" "}
                <Link
                  href={`/${locale}/peptides-for/anti-aging`}
                  className="text-oryn-orange hover:text-oryn-orange-dark underline underline-offset-2"
                >
                  longevity with NAD+ and GHK-Cu
                </Link>
                , ORYN provides the tools, the purity, and the support to advance
                your work with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* ── PRODUCT RANGE OVERVIEW ─────────────────────────────── */}
        <section className="py-20 md:py-28 bg-oryn-grey-dark text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-molecular-grid-dark opacity-20" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-oryn-orange/40" />
                <span className="text-[10px] font-mono text-oryn-orange/70 tracking-[0.25em]">
                  COMPLETE RANGE
                </span>
                <div className="w-8 h-[2px] bg-oryn-orange/40" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                10 Research Peptides, 3 Delivery Systems
              </h2>
              <p className="text-white/40 font-plex max-w-2xl mx-auto">
                From recovery and healing to metabolic research and anti-aging
                science — ORYN covers the full spectrum of peptide research.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/${locale}/products/${product.slug}`}
                  className="border border-white/10 hover:border-oryn-orange/40 transition-all p-5 group bg-white/[0.03] hover:bg-white/[0.06]"
                >
                  <div className="aspect-square flex items-center justify-center mb-4">
                    <Image
                      src={productImages.bySlug[product.slug] || product.image}
                      alt={`ORYN ${product.name} Peptide Pen`}
                      width={100}
                      height={100}
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="text-[9px] font-mono text-oryn-orange/60 tracking-[0.15em] mb-1">
                    {product.categoryLabel.toUpperCase()}
                  </div>
                  <h3 className="text-sm font-bold group-hover:text-oryn-orange transition-colors">
                    {product.name}
                  </h3>
                  <div className="text-[10px] font-mono text-white/30 mt-1">
                    {product.dosage} &middot; {product.volume}
                  </div>
                  <div className="text-oryn-orange font-bold mt-2">
                    {currency}
                    {product.price}
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-oryn-orange text-white text-sm font-bold tracking-wider hover:bg-oryn-orange-dark transition-colors"
              >
                {w.viewProducts}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ SECTION ─────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-oryn-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-oryn-orange/40" />
                <span className="text-[10px] font-mono text-oryn-black/40 tracking-[0.25em]">
                  FREQUENTLY ASKED
                </span>
                <div className="w-8 h-[2px] bg-oryn-orange/40" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Questions About ORYN
              </h2>
              <p className="text-oryn-black/50 font-plex max-w-xl mx-auto">
                Everything you need to know about the UK&apos;s most trusted
                peptide supplier.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="border border-oryn-grey/20 group bg-white"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-sm md:text-base font-bold pr-4 group-hover:text-oryn-orange transition-colors">
                      {faq.question}
                    </h3>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FF6A1A"
                      strokeWidth="2"
                      className="shrink-0 group-open:rotate-45 transition-transform"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-sm text-oryn-black/50 font-plex leading-relaxed border-t border-oryn-grey/10 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-oryn-gradient text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-molecular-grid-orange opacity-20" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Start Your Research Journey
            </h2>
            <p className="text-white/70 font-plex text-lg mb-10 leading-relaxed">
              Join researchers across the UK who trust ORYN for the highest
              quality peptide pens. 98%+ purity, pre-dosed convenience, and free
              shipping on orders over {currency}150.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/${locale}/products`}
                className="px-10 py-4 bg-oryn-black text-white text-sm font-bold tracking-wider hover:bg-oryn-grey-dark transition-colors"
              >
                SHOP ALL PEPTIDES
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="px-10 py-4 border-2 border-white/30 text-white text-sm font-bold tracking-wider hover:border-white hover:bg-white/10 transition-colors"
              >
                CONTACT OUR TEAM
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              {[
                "GMP Certified",
                "ISO 7 Cleanroom",
                "98%+ Purity",
                "Free UK Shipping",
                "COA Included",
              ].map((signal) => (
                <div
                  key={signal}
                  className="flex items-center gap-2 text-white/60"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[10px] font-mono tracking-[0.1em]">
                    {signal.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
