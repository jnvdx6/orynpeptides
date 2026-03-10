import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  PEPTIDE_ENTRIES,
  ENCYCLOPEDIA_SLUGS,
  getEncyclopediaEntry,
  getEncyclopediaRedirect,
} from "@/data/peptide-encyclopedia";
import { products, productImages } from "@/data/products";
import {
  articleSchema,
  faqSchema,
  breadcrumbSchema,
  SITE_URL,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { locales } from "@/i18n/config";

export async function generateStaticParams() {
  const params = [];
  for (const locale of locales) {
    for (const slug of ENCYCLOPEDIA_SLUGS) {
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

  const redirectSlug = getEncyclopediaRedirect(slug);
  if (redirectSlug) return {};

  const entry = getEncyclopediaEntry(slug);
  if (!entry) return {};

  const title = `What is ${entry.name}? | ${entry.fullName} — Mechanism, Research & Science | ORYN`;
  const description = `${entry.name} (${entry.fullName}) — molecular formula ${entry.molecularFormula}, MW ${entry.molecularWeight}. Mechanism of action, published research, key studies, and FAQs. ORYN Peptide Encyclopedia.`;

  return {
    title,
    description,
    keywords: [
      `what is ${entry.name}`,
      `${entry.name} research`,
      `${entry.name} mechanism of action`,
      `${entry.name} peptide`,
      `${entry.name} molecular weight`,
      `${entry.name} studies`,
      entry.fullName,
    ],
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/peptides/encyclopedia/${slug}`,
      type: "article",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/peptides/encyclopedia/${slug}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/peptides/encyclopedia/${slug}`])
      ),
    },
  };
}

export default async function EncyclopediaEntryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;

  // Handle redirects for MediT and NovaDose
  const redirectSlug = getEncyclopediaRedirect(slug);
  if (redirectSlug) {
    redirect(`/${locale}/peptides/encyclopedia/${redirectSlug}`);
  }

  const entry = getEncyclopediaEntry(slug);
  if (!entry) notFound();

  // Find the matching ORYN product(s)
  const relatedProducts = products.filter(
    (p) =>
      p.slug === entry.slug ||
      (entry.slug === "tirzepatide-pen" && p.slug === "medit-tirzepatide") ||
      (entry.slug === "nad-plus" && p.slug === "novadose-nad")
  );

  const otherEntries = PEPTIDE_ENTRIES.filter((e) => e.slug !== entry.slug).slice(0, 4);
  const currency = locale === "es" ? "\u20ac" : "\u00a3";

  const articleData = {
    title: `${entry.name} — ${entry.fullName}`,
    metaDescription: `Scientific profile of ${entry.name}. Molecular formula, mechanism of action, research history, and published studies.`,
    slug: `peptides/encyclopedia/${entry.slug}`,
    category: "Peptide Research",
    datePublished: "2025-01-15",
    dateModified: "2026-03-09",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemaItems: Record<string, any>[] = [
    {
      ...articleSchema(articleData, locale),
      url: `${SITE_URL}/${locale}/peptides/encyclopedia/${entry.slug}`,
    },
    faqSchema(entry.faqs),
    breadcrumbSchema([
      { name: "Home", url: `/${locale}` },
      { name: "Peptide Encyclopedia", url: `/${locale}/peptides/encyclopedia` },
      { name: entry.name, url: `/${locale}/peptides/encyclopedia/${entry.slug}` },
    ]),
  ];

  return (
    <>
      <MultiJsonLd items={schemaItems} />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">
              HOME
            </Link>
            <span className="text-oryn-orange">/</span>
            <Link
              href={`/${locale}/peptides/encyclopedia`}
              className="hover:text-oryn-orange transition-colors"
            >
              ENCYCLOPEDIA
            </Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange truncate max-w-[200px]">
              {entry.name.toUpperCase()}
            </span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                {entry.classification.toUpperCase()}
              </span>
              <span className="w-1 h-1 bg-oryn-orange rounded-full" />
              <span className="text-[10px] font-mono text-white/40 tracking-[0.1em]">
                PEPTIDE ENCYCLOPEDIA
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
              {entry.name}
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl mb-4">{entry.fullName}</p>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-[10px] font-mono text-white/30 tracking-[0.1em]">
              <span>{entry.molecularFormula}</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>{entry.molecularWeight}</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>{entry.keyStudies.length} studies cited</span>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <div className="border-b border-oryn-grey/20">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <nav className="flex flex-wrap gap-4 text-[10px] font-mono tracking-[0.1em]">
              {[
                { id: "overview", label: "OVERVIEW" },
                { id: "molecular", label: "MOLECULAR PROFILE" },
                { id: "mechanism", label: "MECHANISM" },
                { id: "history", label: "RESEARCH HISTORY" },
                { id: "studies", label: "KEY STUDIES" },
                { id: "applications", label: "APPLICATIONS" },
                { id: "product", label: "ORYN PRODUCT" },
                { id: "faq", label: "FAQ" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-oryn-black/40 hover:text-oryn-orange transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-6 py-16">
          <div className="space-y-16">
            {/* Overview */}
            <section id="overview">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                What is {entry.name}?
              </h2>
              <p className="text-sm text-oryn-black/70 font-plex leading-relaxed mb-4">
                {entry.name} ({entry.fullName}) is classified as a{" "}
                <strong className="text-oryn-black">{entry.classification.toLowerCase()}</strong>.
                With a molecular weight of{" "}
                <strong className="text-oryn-black">{entry.molecularWeight}</strong> and formula{" "}
                <strong className="text-oryn-black font-mono">{entry.molecularFormula}</strong>, it
                is one of the most studied compounds in its class.
              </p>
              <p className="text-sm text-oryn-black/70 font-plex leading-relaxed">
                This encyclopedia entry covers the molecular profile, mechanism of action, research
                history, key published studies, and research applications of {entry.name}. It is
                part of the{" "}
                <Link
                  href={`/${locale}/peptides/encyclopedia`}
                  className="text-oryn-orange hover:underline"
                >
                  ORYN Peptide Encyclopedia
                </Link>
                , a scientific reference for researchers working with peptide compounds.
              </p>
            </section>

            {/* Molecular Profile */}
            <section id="molecular">
              <h2 className="text-xl md:text-2xl font-bold mb-6">Molecular Profile</h2>
              <div className="bg-oryn-cream/50 border border-oryn-grey/10 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[9px] font-mono text-oryn-black/30 tracking-[0.15em] mb-1">
                      MOLECULAR FORMULA
                    </p>
                    <p className="text-sm font-mono font-bold">{entry.molecularFormula}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-oryn-black/30 tracking-[0.15em] mb-1">
                      MOLECULAR WEIGHT
                    </p>
                    <p className="text-sm font-mono font-bold">{entry.molecularWeight}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-oryn-black/30 tracking-[0.15em] mb-1">
                      CLASSIFICATION
                    </p>
                    <p className="text-sm font-bold">{entry.classification}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-oryn-black/30 tracking-[0.15em] mb-1">
                      AMINO ACID SEQUENCE / STRUCTURE
                    </p>
                    <p className="text-xs font-mono text-oryn-black/70 break-all">
                      {entry.sequence}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Mechanism of Action */}
            <section id="mechanism">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Mechanism of Action</h2>
              <div className="text-sm text-oryn-black/70 font-plex leading-relaxed">
                {entry.mechanism.split("\n\n").map((paragraph, j) => (
                  <p key={j} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Research History */}
            <section id="history">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Research History</h2>
              <div className="text-sm text-oryn-black/70 font-plex leading-relaxed">
                {entry.researchHistory.split("\n\n").map((paragraph, j) => (
                  <p key={j} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Key Published Studies */}
            <section id="studies">
              <h2 className="text-xl md:text-2xl font-bold mb-6">Key Published Studies</h2>
              <div className="space-y-4">
                {entry.keyStudies.map((study, i) => (
                  <div
                    key={i}
                    className="border border-oryn-grey/20 p-5 hover:border-oryn-orange/20 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-2xl font-bold text-oryn-orange/30 shrink-0 leading-none mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold mb-1">{study.title}</h3>
                        <p className="text-[10px] font-mono text-oryn-black/30 tracking-[0.1em] mb-2">
                          {study.year}
                        </p>
                        <p className="text-xs text-oryn-black/60 font-plex leading-relaxed">
                          {study.finding}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Research Applications */}
            <section id="applications">
              <h2 className="text-xl md:text-2xl font-bold mb-6">Research Applications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {entry.applications.map((app) => (
                  <div key={app} className="flex items-center gap-3 p-3 bg-oryn-cream/30">
                    <span className="w-1.5 h-1.5 bg-oryn-orange rounded-full shrink-0" />
                    <p className="text-sm text-oryn-black/70 font-plex">{app}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>

        {/* Related ORYN Product */}
        {relatedProducts.length > 0 && (
          <section id="product" className="bg-oryn-cream py-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="inline-flex items-center gap-3 mb-2">
                <div className="w-6 h-px bg-oryn-orange" />
                <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                  AVAILABLE FROM ORYN
                </span>
              </div>
              <h2 className="text-xl font-bold mb-8">
                {entry.name} — ORYN Product{relatedProducts.length > 1 ? "s" : ""}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/${locale}/products/${product.slug}`}
                    className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                  >
                    <div className="bg-oryn-cream/50 p-8 flex items-center justify-center min-h-[180px]">
                      <Image
                        src={productImages.bySlug[product.slug] || product.image}
                        alt={`ORYN ${product.name}`}
                        width={140}
                        height={140}
                        className="object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-[9px] font-mono text-oryn-orange tracking-[0.15em] mb-1">
                        {product.categoryLabel.toUpperCase()}
                      </p>
                      <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                      <p className="text-xs text-oryn-black/40 font-plex mb-2">
                        {product.subtitle}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-oryn-orange">
                          {currency}
                          {product.price}
                        </span>
                        <span className="text-[9px] font-mono text-oryn-black/30">
                          {product.dosage}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section id="faq" className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8">
            Frequently Asked Questions — {entry.name}
          </h2>
          <div className="space-y-4">
            {entry.faqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-oryn-grey/20 open:border-oryn-orange/20"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-oryn-cream/50 transition-colors">
                  <h3 className="text-sm font-bold pr-4">{faq.question}</h3>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0 text-oryn-orange group-open:rotate-45 transition-transform"
                  >
                    <path d="M12 5v14m-7-7h14" />
                  </svg>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-xs text-oryn-black/60 font-plex leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Other Encyclopedia Entries */}
        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-oryn-grey/20">
          <h2 className="text-xl font-bold mb-6">Explore More Peptides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherEntries.map((e) => (
              <Link
                key={e.slug}
                href={`/${locale}/peptides/encyclopedia/${e.slug}`}
                className="p-5 border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
              >
                <span className="text-[9px] font-mono text-oryn-orange tracking-[0.2em]">
                  {e.classification.toUpperCase()}
                </span>
                <h3 className="text-lg font-bold mt-2 mb-1 group-hover:text-oryn-orange transition-colors">
                  {e.name}
                </h3>
                <p className="text-[10px] text-oryn-black/40 font-mono tracking-[0.1em]">
                  {e.molecularWeight}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href={`/${locale}/peptides/encyclopedia`}
              className="text-xs font-mono text-oryn-orange tracking-[0.1em] hover:underline"
            >
              VIEW ALL ENCYCLOPEDIA ENTRIES
            </Link>
          </div>
        </section>

        {/* Internal Links */}
        <section className="bg-oryn-black text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href={`/${locale}/products`}
                className="p-5 border border-white/10 hover:border-oryn-orange/50 transition-colors"
              >
                <p className="text-sm font-bold">All Products</p>
                <p className="text-[10px] text-white/40 font-mono mt-1 tracking-[0.1em]">
                  BROWSE THE FULL RANGE
                </p>
              </Link>
              <Link
                href={`/${locale}/compare`}
                className="p-5 border border-white/10 hover:border-oryn-orange/50 transition-colors"
              >
                <p className="text-sm font-bold">Compare Peptides</p>
                <p className="text-[10px] text-white/40 font-mono mt-1 tracking-[0.1em]">
                  SIDE-BY-SIDE COMPARISON
                </p>
              </Link>
              <Link
                href={`/${locale}/learn`}
                className="p-5 border border-white/10 hover:border-oryn-orange/50 transition-colors"
              >
                <p className="text-sm font-bold">Learn Hub</p>
                <p className="text-[10px] text-white/40 font-mono mt-1 tracking-[0.1em]">
                  GUIDES &amp; ARTICLES
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <RelatedContent productSlug={slug} locale={locale} />

        {/* CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Get ORYN {entry.name}
            </h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              Pharmaceutical-grade {entry.name} in a precision pen system. &gt;99% purity, GMP
              manufactured, next-day UK delivery.
            </p>
            <Link
              href={`/${locale}/products/${relatedProducts[0]?.slug || ""}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
            >
              VIEW {entry.name.toUpperCase()} PRODUCT
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
