import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProductBySlug as getProduct, productImages } from "@/data/products";
import { COMPARISONS, getComparisonBySlug, COMPARISON_SLUGS } from "@/data/comparisons";
import { faqSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export async function generateStaticParams() {
  const params = [];
  for (const locale of locales) {
    for (const slug of COMPARISON_SLUGS) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return {};

  return {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      url: `${SITE_URL}/${locale}/compare/${slug}`,
      type: "article",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/compare/${slug}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/compare/${slug}`])
      ),
    },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  const productA = getProduct(comparison.productA);
  const productB = getProduct(comparison.productB);
  if (!productA || !productB) notFound();

  const currency = "€";
  const otherComparisons = COMPARISONS.filter((c) => c.slug !== comparison.slug);

  return (
    <>
      <MultiJsonLd
        items={[
          faqSchema(comparison.faqs),
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.compare, url: `/${locale}/compare` },
            { name: comparison.title, url: `/${locale}/compare/${slug}` },
          ]),
        ]}
      />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <Link href={`/${locale}/compare`} className="hover:text-oryn-orange transition-colors">COMPARE</Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">{comparison.productA.toUpperCase()} VS {comparison.productB.toUpperCase()}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">PEPTIDE COMPARISON</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
              {comparison.title}
            </h1>
            <p className="text-sm text-white/50 font-plex max-w-2xl mx-auto">
              {comparison.introduction}
            </p>
          </div>
        </section>

        {/* Product Cards Side by Side */}
        <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[productA, productB].map((product) => (
              <Link
                key={product.id}
                href={`/${locale}/products/${product.slug}`}
                className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all shadow-lg group"
              >
                <div className="bg-oryn-cream/50 p-8 flex items-center justify-center min-h-[200px]">
                  <Image
                    src={productImages.bySlug[product.slug] || product.image}
                    alt={`ORYN ${product.name}`}
                    width={160}
                    height={160}
                    className="object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-6 text-center">
                  <h2 className="text-xl font-bold mb-1">ORYN {product.name}</h2>
                  <p className="text-xs text-oryn-black/40 font-plex mb-2">{product.subtitle}</p>
                  <p className="text-2xl font-bold text-oryn-orange mb-1">{currency}{product.price}</p>
                  <p className="text-[9px] font-mono text-oryn-black/30">{product.dosage} · {product.volume} · 30 DAYS</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Head-to-Head Comparison</h2>
          <div className="border border-oryn-grey/20 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-oryn-black text-white">
              <div className="p-4 text-[10px] font-mono tracking-[0.15em]">CATEGORY</div>
              <div className="p-4 text-[10px] font-mono tracking-[0.15em] text-center border-l border-white/10">{productA.name}</div>
              <div className="p-4 text-[10px] font-mono tracking-[0.15em] text-center border-l border-white/10">{productB.name}</div>
            </div>
            {/* Rows */}
            {comparison.categories.map((cat, i) => (
              <div
                key={cat.name}
                className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white" : "bg-oryn-cream/30"}`}
              >
                <div className="p-4 text-xs font-bold border-t border-oryn-grey/10">
                  {cat.name}
                </div>
                <div className={`p-4 text-xs text-oryn-black/60 font-plex border-t border-l border-oryn-grey/10 text-center ${
                  cat.winner === "A" ? "bg-oryn-orange/5 font-semibold text-oryn-orange" : ""
                }`}>
                  {cat.productA}
                  {cat.winner === "A" && <span className="ml-1 text-oryn-orange">&#10003;</span>}
                </div>
                <div className={`p-4 text-xs text-oryn-black/60 font-plex border-t border-l border-oryn-grey/10 text-center ${
                  cat.winner === "B" ? "bg-oryn-orange/5 font-semibold text-oryn-orange" : ""
                }`}>
                  {cat.productB}
                  {cat.winner === "B" && <span className="ml-1 text-oryn-orange">&#10003;</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-oryn-orange/5 border border-oryn-orange/10 p-8">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              The Verdict
            </h2>
            <p className="text-sm text-oryn-black/70 font-plex leading-relaxed">
              {comparison.verdict}
            </p>
          </div>
        </section>

        {/* Detailed Sections */}
        <article className="max-w-4xl mx-auto px-6 py-8">
          <div className="space-y-12">
            {comparison.detailedSections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl md:text-2xl font-bold mb-4">{section.heading}</h2>
                <div className="text-sm text-oryn-black/70 font-plex leading-relaxed">
                  {section.content.split("\n\n").map((paragraph, j) => {
                    const parts = paragraph.split(/\*\*(.*?)\*\*/g);
                    return (
                      <p key={j} className="mb-4">
                        {parts.map((part, k) =>
                          k % 2 === 1 ? (
                            <strong key={k} className="font-bold text-oryn-black">{part}</strong>
                          ) : (
                            <span key={k}>{part}</span>
                          )
                        )}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {comparison.faqs.map((faq, i) => (
              <details key={i} className="group border border-oryn-grey/20 open:border-oryn-orange/20">
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-oryn-cream/50 transition-colors">
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
        </section>

        {/* CTA */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-8">Ready to Start Your Research?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[productA, productB].map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/products/${product.slug}`}
                  className="flex items-center gap-4 p-6 border border-white/10 hover:border-oryn-orange/50 transition-colors"
                >
                  <div className="w-16 h-16 bg-white/5 flex items-center justify-center shrink-0">
                    <Image
                      src={productImages.bySlug[product.slug] || product.image}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">ORYN {product.name}</p>
                    <p className="text-xs text-white/40 font-plex">{product.dosage} · {product.subtitle}</p>
                  </div>
                  <span className="text-lg font-bold text-oryn-orange">{currency}{product.price}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Other Comparisons */}
        {otherComparisons.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-xl font-bold mb-6">More Comparisons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherComparisons.map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/${locale}/compare/${comp.slug}`}
                  className="border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all p-5"
                >
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">{comp.title}</h3>
                  <span className="text-[10px] font-mono text-oryn-orange tracking-[0.1em]">READ COMPARISON</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
