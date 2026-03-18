import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  PROTOCOL_SLUGS,
  getProtocolBySlug,
} from "@/data/protocols";
import { getLocalizedProtocol } from "@/data/protocols-i18n";
import { getProductBySlug, productImages } from "@/data/products";
import {
  faqSchema,
  breadcrumbSchema,
  SITE_URL,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

// ─── Static Params ────────────────────────────────────────────────
export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    PROTOCOL_SLUGS.map((slug) => ({ locale, slug }))
  );
}

// ─── Metadata ─────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const protocol = getProtocolBySlug(slug);
  if (!protocol) return {};

  const localized = getLocalizedProtocol(slug, locale as Locale);
  const name = localized?.name ?? protocol.name;
  const metaDescription = localized?.metaDescription ?? protocol.metaDescription;
  const title = `${name} | Research Protocol Guide | ORYN`;

  return {
    title,
    description: metaDescription,
    openGraph: {
      title,
      description: metaDescription,
      url: `${SITE_URL}/${locale}/protocols/${slug}`,
      type: "article",
      images: [
        { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 },
      ],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/protocols/${slug}`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/protocols/${slug}`])
        ),
        "x-default": `${SITE_URL}/en/protocols/${slug}`,
      },
    },
  };
}

// ─── Category Styling ─────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  recovery: "bg-green-100 text-green-700",
  "anti-aging": "bg-purple-100 text-purple-700",
  performance: "bg-blue-100 text-blue-700",
  metabolic: "bg-amber-100 text-amber-700",
  wellness: "bg-cyan-100 text-cyan-700",
};

// ─── Page ─────────────────────────────────────────────────────────
export default async function ProtocolPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const protocol = getProtocolBySlug(slug);
  if (!protocol) notFound();

  const localized = getLocalizedProtocol(slug, locale as Locale);
  const displayName = localized?.name ?? protocol.name;
  const displaySubtitle = localized?.subtitle ?? protocol.subtitle;
  const displayOverview = localized?.overview ?? protocol.overview;
  const displayHowItWorks = localized?.howItWorks ?? protocol.howItWorks;
  const displayIdealFor = localized?.idealFor ?? protocol.idealFor;
  const displayResearchHighlights = localized?.researchHighlights ?? protocol.researchHighlights;
  const displayFaqs = localized?.faqs ?? protocol.faqs;

  const protocolProducts = protocol.productSlugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const catColor = CATEGORY_COLORS[protocol.category] || "bg-gray-100 text-gray-700";
  const currency = "€";

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.protocols, url: `/${locale}/protocols` },
            { name: displayName, url: `/${locale}/protocols/${slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: displayName,
            description: localized?.metaDescription ?? protocol.metaDescription,
            totalTime: protocol.duration,
            step: [
              {
                "@type": "HowToStep",
                name: "Research Overview",
                text: displayOverview,
              },
              {
                "@type": "HowToStep",
                name: "Mechanism of Action",
                text: displayHowItWorks,
              },
            ],
            supply: protocolProducts.map((p) => ({
              "@type": "HowToSupply",
              name: `ORYN ${p.name} Peptide Pen`,
            })),
          },
          faqSchema(displayFaqs),
        ]}
      />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <Link href={`/${locale}/protocols`} className="hover:text-oryn-orange transition-colors">PROTOCOLS</Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange truncate max-w-[250px]">
              {displayName.toUpperCase()}
            </span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                RESEARCH PROTOCOL
              </span>
              <span className={`text-[9px] font-mono px-2.5 py-1 rounded-full tracking-[0.1em] ${catColor}`}>
                {protocol.category.toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {displayName}
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl mb-8">
              {displaySubtitle}
            </p>
            <div className="flex flex-wrap gap-6">
              <div>
                <span className="text-[9px] font-mono text-white/30 tracking-[0.15em]">DURATION</span>
                <p className="text-sm font-bold mt-1">{protocol.duration}</p>
              </div>
              <div>
                <span className="text-[9px] font-mono text-white/30 tracking-[0.15em]">FREQUENCY</span>
                <p className="text-sm font-bold mt-1">{protocol.frequency}</p>
              </div>
              <div>
                <span className="text-[9px] font-mono text-white/30 tracking-[0.15em]">PRODUCTS</span>
                <p className="text-sm font-bold mt-1">{protocolProducts.length} peptide{protocolProducts.length > 1 ? "s" : ""}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-oryn-orange" />
            <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">OVERVIEW</span>
          </div>
          <p className="text-sm text-oryn-black/70 font-plex leading-[1.9] mb-8">
            {displayOverview}
          </p>

          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-oryn-orange" />
            <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">MECHANISM OF ACTION</span>
          </div>
          <p className="text-sm text-oryn-black/70 font-plex leading-[1.9]">
            {displayHowItWorks}
          </p>
        </section>

        {/* Products in Protocol */}
        <section className="bg-oryn-cream py-16 border-t border-oryn-orange/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">PRODUCTS IN THIS PROTOCOL</span>
            </div>
            <h2 className="text-2xl font-bold mb-8">Required Peptide Pens</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {protocolProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/${locale}/products/${product.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                >
                  <div className="bg-white p-8 flex items-center justify-center min-h-[180px]">
                    <Image
                      src={productImages.bySlug[product.slug] || product.image}
                      alt={product.name}
                      width={140}
                      height={140}
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-5 border-t border-oryn-grey/10">
                    <h3 className="text-lg font-bold mb-1 group-hover:text-oryn-orange transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-oryn-black/50 font-plex mb-3">{product.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-oryn-orange">
                        {currency}{product.price}
                      </span>
                      <span className="text-[9px] font-mono text-oryn-black/30">{product.dosage}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Ideal For + Research Highlights */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-oryn-orange" />
                <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">IDEAL FOR</span>
              </div>
              <ul className="space-y-3">
                {displayIdealFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2" className="shrink-0 mt-0.5">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-oryn-black/70 font-plex">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-oryn-orange" />
                <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">RESEARCH HIGHLIGHTS</span>
              </div>
              <ul className="space-y-3">
                {displayResearchHighlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2" className="shrink-0 mt-0.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4M12 16h.01" />
                    </svg>
                    <span className="text-sm text-oryn-black/70 font-plex">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-oryn-cream py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {displayFaqs.map((faq, i) => (
                <details key={i} className="group bg-white border border-oryn-grey/20 open:border-oryn-orange/20">
                  <summary className="flex items-center justify-between p-5 cursor-pointer">
                    <h3 className="text-sm font-bold pr-4">{faq.question}</h3>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-oryn-orange group-open:rotate-45 transition-transform">
                      <path d="M12 5v14m-7-7h14" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-xs text-oryn-black/60 font-plex leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related Content */}
        <RelatedContent productSlug={protocol.productSlugs[0]} locale={locale} />

        {/* Disclaimer + CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Start This Protocol
            </h2>
            <p className="text-sm text-white/70 font-plex mb-4 max-w-lg mx-auto">
              All ORYN peptide pens are pre-mixed, &gt;99% purity, GMP manufactured with next-day UK delivery.
            </p>
            <p className="text-[10px] text-white/40 font-mono tracking-[0.1em] mb-8">
              FOR RESEARCH PURPOSES ONLY. NOT INTENDED FOR SELF-ADMINISTRATION.
            </p>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
            >
              SHOP PEPTIDE PENS
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
