import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GLOSSARY_TERMS, getTermBySlug, GLOSSARY_TERM_SLUGS } from "@/data/glossary-terms";
import type { GlossaryTerm } from "@/data/glossary-terms";
import { SITE_URL, breadcrumbSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

/* ─── On-demand generation (ISR) to keep build output under Vercel limits ── */
export const dynamicParams = true;
export async function generateStaticParams() {
  return [];
}

/* ─── Category Styling ───────────────────────────────────────────── */

const CATEGORY_COLORS: Record<GlossaryTerm["category"], string> = {
  peptide: "bg-orange-100 text-orange-700",
  science: "bg-blue-100 text-blue-700",
  testing: "bg-green-100 text-green-700",
  delivery: "bg-purple-100 text-purple-700",
  biology: "bg-cyan-100 text-cyan-700",
  product: "bg-amber-100 text-amber-700",
};

const CATEGORY_LABELS: Record<GlossaryTerm["category"], string> = {
  peptide: "PEPTIDE",
  science: "SCIENCE",
  testing: "TESTING & QC",
  delivery: "DELIVERY",
  biology: "BIOLOGY",
  product: "PRODUCT",
};

/* ─── Metadata ───────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; term: string }>;
}): Promise<Metadata> {
  const { locale, term } = await params;
  const entry = getTermBySlug(term);
  if (!entry) return {};

  const title = `What is ${entry.term}? | Peptide Glossary | ORYN`;
  const description = entry.shortDefinition;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/peptides/glossary/${term}`,
      type: "article",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/peptides/glossary/${term}`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/peptides/glossary/${term}`])
        ),
        "x-default": `${SITE_URL}/en/peptides/glossary/${term}`,
      },
    },
  };
}

/* ─── Related Terms Logic ────────────────────────────────────────── */

function getRelatedTerms(entry: GlossaryTerm): GlossaryTerm[] {
  // Prefer explicitly linked terms from relatedTermSlugs
  const explicit: GlossaryTerm[] = [];
  if (entry.relatedTermSlugs) {
    for (const slug of entry.relatedTermSlugs) {
      const found = GLOSSARY_TERMS.find((t) => t.slug === slug);
      if (found) explicit.push(found);
    }
  }
  if (explicit.length >= 6) return explicit.slice(0, 6);

  // Fill remaining slots with same-category terms
  const slugsUsed = new Set([entry.slug, ...explicit.map((t) => t.slug)]);
  const fallback = GLOSSARY_TERMS.filter(
    (t) => !slugsUsed.has(t.slug) && t.category === entry.category
  );
  return [...explicit, ...fallback].slice(0, 6);
}

/* ─── Page Component ─────────────────────────────────────────────── */

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ locale: string; term: string }>;
}) {
  const { locale, term } = await params;
  const dict = await getDictionary(locale as Locale);
  const entry = getTermBySlug(term);
  if (!entry) notFound();

  const relatedTerms = getRelatedTerms(entry);
  const catColor = CATEGORY_COLORS[entry.category];
  const catLabel = CATEGORY_LABELS[entry.category];

  /* ─── JSON-LD ────────────────────────────────────────────────── */

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${SITE_URL}/${locale}/peptides/glossary/${term}`,
    name: entry.term,
    description: entry.fullDefinition,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      "@id": `${SITE_URL}/${locale}/peptides/glossary`,
      name: "ORYN Peptide Glossary",
    },
  };

  const breadcrumb = breadcrumbSchema([
    { name: dict.breadcrumbs.home, url: `/${locale}` },
    { name: dict.breadcrumbs.peptides, url: `/${locale}/peptides/glossary` },
    { name: dict.breadcrumbs.glossary, url: `/${locale}/peptides/glossary` },
    { name: entry.term, url: `/${locale}/peptides/glossary/${term}` },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const faqItems: Record<string, any>[] = [
    {
      "@type": "Question",
      name: `What is ${entry.term}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.fullDefinition,
      },
    },
  ];

  if (entry.relatedProductSlug) {
    faqItems.push({
      "@type": "Question",
      name: `Which ORYN products are related to ${entry.term}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `Explore our ${entry.relatedProductSlug.toUpperCase()} peptide pen for research related to ${entry.term}. All ORYN peptide pens are pre-mixed, >99% purity, and available with next-day UK delivery.`,
      },
    });
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };

  return (
    <>
      <MultiJsonLd items={[definedTermSchema, breadcrumb, faqSchema]} />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <Link href={`/${locale}/peptides/glossary`} className="hover:text-oryn-orange transition-colors">GLOSSARY</Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange truncate max-w-[200px]">{entry.term.toUpperCase()}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                GLOSSARY TERM
              </span>
              <span className="w-1 h-1 bg-oryn-orange rounded-full" />
              <span className={`text-[9px] font-mono px-2.5 py-1 rounded-full tracking-[0.1em] ${catColor}`}>
                {catLabel}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              {entry.term}
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl leading-relaxed">
              {entry.shortDefinition}
            </p>
          </div>
        </section>

        {/* Full Definition */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-oryn-orange" />
            <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">FULL DEFINITION</span>
          </div>
          <div className="p-8 bg-oryn-cream/50 border border-oryn-grey/10">
            <p className="text-sm md:text-base text-oryn-black/70 font-plex leading-[1.9]">
              {entry.fullDefinition}
            </p>
          </div>
        </section>

        {/* Key Facts Sidebar & Related Resources */}
        <section className="bg-oryn-cream py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">KEY FACTS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category */}
              <div className="bg-white p-6 border border-oryn-grey/10">
                <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.15em]">CATEGORY</span>
                <p className="text-sm font-bold mt-2">{catLabel}</p>
              </div>

              {/* Related Product */}
              {entry.relatedProductSlug ? (
                <Link
                  href={`/${locale}/products/${entry.relatedProductSlug}`}
                  className="bg-white p-6 border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                >
                  <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.15em]">RELATED PRODUCT</span>
                  <p className="text-sm font-bold mt-2 group-hover:text-oryn-orange transition-colors">
                    {entry.relatedProductSlug
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}{" "}
                    Pen
                  </p>
                  <span className="text-[9px] font-mono text-oryn-orange tracking-[0.1em] mt-1 inline-block">
                    VIEW PRODUCT &rarr;
                  </span>
                </Link>
              ) : (
                <div className="bg-white p-6 border border-oryn-grey/10">
                  <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.15em]">RELATED PRODUCT</span>
                  <p className="text-xs text-oryn-black/40 font-plex mt-2">General research term</p>
                </div>
              )}

              {/* Related Article */}
              {entry.relatedArticleSlug ? (
                <Link
                  href={`/${locale}/learn/${entry.relatedArticleSlug}`}
                  className="bg-white p-6 border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                >
                  <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.15em]">LEARN MORE</span>
                  <p className="text-sm font-bold mt-2 group-hover:text-oryn-orange transition-colors">
                    Read Article
                  </p>
                  <span className="text-[9px] font-mono text-oryn-orange tracking-[0.1em] mt-1 inline-block">
                    READ NOW &rarr;
                  </span>
                </Link>
              ) : (
                <div className="bg-white p-6 border border-oryn-grey/10">
                  <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.15em]">LEARN MORE</span>
                  <p className="text-xs text-oryn-black/40 font-plex mt-2">No related article</p>
                </div>
              )}
            </div>

            {/* Related Category Link */}
            {entry.relatedCategorySlug && (
              <div className="mt-6">
                <Link
                  href={`/${locale}/peptides-for/${entry.relatedCategorySlug}`}
                  className="inline-flex items-center gap-3 px-5 py-3 bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                >
                  <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.15em]">PEPTIDES FOR</span>
                  <span className="text-sm font-bold group-hover:text-oryn-orange transition-colors">
                    {entry.relatedCategorySlug
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-oryn-orange">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Related Glossary Terms */}
        {relatedTerms.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">RELATED TERMS</span>
            </div>
            <h2 className="text-xl font-bold mb-8">Explore Related Glossary Terms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTerms.map((rt) => (
                <Link
                  key={rt.slug}
                  href={`/${locale}/peptides/glossary/${rt.slug}`}
                  className="group block p-5 border border-oryn-grey/10 hover:border-oryn-orange/20 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[7px] font-mono px-1.5 py-0.5 rounded-full tracking-[0.1em] ${CATEGORY_COLORS[rt.category]}`}>
                      {rt.category.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold group-hover:text-oryn-orange transition-colors mb-1">
                    {rt.term}
                  </h3>
                  <p className="text-[11px] text-oryn-black/50 font-plex leading-relaxed line-clamp-2">
                    {rt.shortDefinition}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Glossary */}
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <Link
            href={`/${locale}/peptides/glossary`}
            className="inline-flex items-center gap-2 text-xs font-mono text-oryn-orange tracking-[0.15em] hover:text-oryn-black transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            BACK TO FULL GLOSSARY
          </Link>
        </div>

        {/* Related Content */}
        <RelatedContent locale={locale} />

        {/* CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Explore ORYN Peptide Pens</h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              Premium pre-mixed peptide pens with next-day UK delivery. GMP manufactured, &gt;99% purity guaranteed.
            </p>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
            >
              SHOP ALL PEPTIDES
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
