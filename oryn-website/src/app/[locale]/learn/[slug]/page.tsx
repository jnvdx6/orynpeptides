import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BLOG_ARTICLES, getArticleBySlug, ARTICLE_SLUGS } from "@/data/blog-articles";
import { products, productImages } from "@/data/products";
import {
  articleSchema,
  faqSchema,
  breadcrumbSchema,
  howToSchema,
  SITE_URL,
  webPageSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { MedicalDisclaimer } from "@/components/seo/MedicalDisclaimer";
import { getAuthorForArticle, getReviewerForArticle } from "@/data/authors";
import { PageTracker } from "@/components/analytics/PageTracker";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import type { ReactNode } from "react";

function parseMarkdown(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-oryn-black">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export async function generateStaticParams() {
  const params = [];
  for (const locale of locales) {
    for (const slug of ARTICLE_SLUGS) {
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
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: `${SITE_URL}/${locale}/learn/${slug}`,
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      images: [{ url: `${SITE_URL}${article.heroImage}`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/learn/${slug}`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/learn/${slug}`])
        ),
        "x-default": `${SITE_URL}/en/learn/${slug}`,
      },
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedProducts = article.relatedProducts
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p) => p !== undefined);
  const otherArticles = BLOG_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);
  const currency = "€";

  const author = getAuthorForArticle(article);
  const reviewer = getReviewerForArticle(article);

  const isHowTo = article.slug === "how-to-use-peptide-pen" || article.slug === "peptide-storage-guide";
  const isResearch = article.category === "Peptide Research" || article.category === "Research Guides";

  // Build article schema — upgrade to ScholarlyArticle for research content
  const baseArticle = articleSchema(article, locale);
  const articleSchemaItem = isResearch
    ? { ...baseArticle, "@type": "ScholarlyArticle" }
    : baseArticle;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemaItems: Record<string, any>[] = [
    articleSchemaItem,
    faqSchema(article.faqs),
    breadcrumbSchema([
      { name: dict.breadcrumbs.home, url: `/${locale}` },
      { name: dict.breadcrumbs.learn, url: `/${locale}/learn` },
      { name: article.title, url: `/${locale}/learn/${article.slug}` },
    ]),
    // Person schema for E-E-A-T
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: author.name,
      jobTitle: author.title,
      description: author.bio,
      image: `${SITE_URL}${author.image}`,
      worksFor: {
        "@type": "Organization",
        name: "ORYN Peptide Labs",
        url: SITE_URL,
      },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: author.credentials,
      },
    },
    // WebPage with mainEntity + speakable for AI visibility
    webPageSchema({
      url: `/${locale}/learn/${article.slug}`,
      name: article.title,
      description: article.metaDescription,
      mainEntityType: isResearch ? "ScholarlyArticle" : "Article",
      mainEntityName: article.title,
      speakableSelectors: ["h1", ".article-intro", ".article-content h2"],
      locale,
    }),
  ];

  if (isHowTo) {
    schemaItems.push(howToSchema(article, locale));
  }

  return (
    <>
      <MultiJsonLd items={schemaItems} />
      <PageTracker pageName="blog_article" properties={{ slug: article.slug, title: article.title, category: article.category }} />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <Link href={`/${locale}/learn`} className="hover:text-oryn-orange transition-colors">LEARN</Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange truncate max-w-[200px]">{article.title.toUpperCase()}</span>
          </nav>
        </div>

        {/* Article Header */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                {article.category.toUpperCase()}
              </span>
              <span className="w-1 h-1 bg-oryn-orange rounded-full" />
              <span className="text-[10px] font-mono text-white/40 tracking-[0.1em]">
                {article.readTime.toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              {article.title}
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl">
              {article.excerpt}
            </p>

            {/* Author byline — E-E-A-T */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
              <div className="w-10 h-10 bg-oryn-orange/20 rounded-full flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-oryn-orange">
                  {author.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-white">{author.name}</span>
                  <span className="text-[9px] font-mono text-oryn-orange tracking-[0.1em]">{author.credentials}</span>
                </div>
                <p className="text-[10px] text-white/40 font-plex">{author.title}</p>
                <p className="text-[10px] text-white/30 font-plex mt-0.5">
                  Reviewed by <span className="text-white/50">{reviewer.name}</span>, {reviewer.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 text-[10px] font-mono text-white/30 tracking-[0.1em]">
              <span>Published: {article.datePublished}</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>Updated: {article.dateModified}</span>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-6 py-16">
          <div className="space-y-12">
            {article.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl md:text-2xl font-bold mb-4">{section.heading}</h2>
                <div className="text-sm text-oryn-black/70 font-plex leading-relaxed whitespace-pre-line">
                  {section.content.split("\n\n").map((paragraph, j) => (
                    <p key={j} className="mb-4">
                      {parseMarkdown(paragraph)}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* About the Author — E-E-A-T */}
        <section className="max-w-4xl mx-auto px-6 pb-12">
          <div className="border border-oryn-orange/15 bg-oryn-cream/60 p-6 md:p-8">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-oryn-orange/10 rounded-full flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-oryn-orange">
                  {author.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-1">ABOUT THE AUTHOR</p>
                <h3 className="text-base font-bold mb-0.5">{author.name}</h3>
                <p className="text-xs text-oryn-black/50 font-plex mb-3">
                  {author.title} &middot; {author.credentials}
                </p>
                <p className="text-xs text-oryn-black/60 font-plex leading-relaxed">
                  {author.bio}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Medical Disclaimer */}
        <MedicalDisclaimer />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="bg-oryn-cream py-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="inline-flex items-center gap-3 mb-2">
                <div className="w-6 h-px bg-oryn-orange" />
                <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">RELATED PRODUCTS</span>
              </div>
              <h2 className="text-xl font-bold mb-8">Featured Peptide Pens</h2>
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
                      <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                      <p className="text-xs text-oryn-black/40 font-plex mb-2">{product.subtitle}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-oryn-orange">{currency}{product.price}</span>
                        <span className="text-[9px] font-mono text-oryn-black/30">{product.dosage}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {article.faqs.length > 0 && (
          <section className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {article.faqs.map((faq, i) => (
                <details key={i} className="group border border-oryn-grey/20 open:border-oryn-orange/20">
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-oryn-cream/50 transition-colors">
                    <h3 className="text-sm font-bold pr-4">{faq.question}</h3>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-oryn-orange group-open:rotate-45 transition-transform">
                      <path d="M12 5v14m-7-7h14" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-xs text-oryn-black/60 font-plex leading-relaxed">{parseMarkdown(faq.answer)}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Other Articles */}
        {otherArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-oryn-grey/20">
            <h2 className="text-xl font-bold mb-6">Continue Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/${locale}/learn/${a.slug}`}
                  className="border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                >
                  <div className="p-5">
                    <span className="text-[9px] font-mono text-oryn-orange tracking-[0.2em]">
                      {a.category.toUpperCase()}
                    </span>
                    <h3 className="text-sm font-bold mt-2 mb-2 group-hover:text-oryn-orange transition-colors line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="text-[10px] text-oryn-black/40 font-mono tracking-[0.1em]">
                      {a.readTime.toUpperCase()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

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
