import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_ARTICLES } from "@/data/blog-articles";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { locales } from "@/i18n/config";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Peptide Research Hub | Guides, Science & UK Legal Info | ORYN",
    description:
      "Expert guides on peptide research, UK legality, pen vs vial comparisons, BPC-157, tirzepatide, and more. Your complete peptide knowledge base.",
    openGraph: {
      title: "Peptide Research Hub | ORYN",
      description: "Expert guides on peptide research, UK legality, and product comparisons.",
      url: `${SITE_URL}/${locale}/learn`,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/learn`,
    },
  };
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `/${locale}` },
          { name: "Learn", url: `/${locale}/learn` },
        ])}
      />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">LEARN</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">KNOWLEDGE BASE</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Peptide Research Hub
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl">
              Expert guides on peptide science, UK regulations, product comparisons, and research protocols. Everything you need to make informed decisions.
            </p>
          </div>
        </section>

        {/* Featured Article */}
        {BLOG_ARTICLES.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-16">
            <Link
              href={`/${locale}/learn/${BLOG_ARTICLES[0].slug}`}
              className="block bg-oryn-cream border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group p-8 md:p-12"
            >
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                FEATURED · {BLOG_ARTICLES[0].category.toUpperCase()}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-3 group-hover:text-oryn-orange transition-colors">
                {BLOG_ARTICLES[0].title}
              </h2>
              <p className="text-sm text-oryn-black/50 font-plex max-w-2xl mb-4">
                {BLOG_ARTICLES[0].excerpt}
              </p>
              <div className="flex items-center gap-4 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
                <span>{BLOG_ARTICLES[0].readTime.toUpperCase()}</span>
                <span className="w-1 h-1 bg-oryn-orange rounded-full" />
                <span>{BLOG_ARTICLES[0].datePublished}</span>
              </div>
            </Link>
          </section>
        )}

        {/* All Articles */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <h2 className="text-xl font-bold mb-8">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_ARTICLES.slice(1).map((article) => (
              <Link
                key={article.slug}
                href={`/${locale}/learn/${article.slug}`}
                className="border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
              >
                <div className="p-6">
                  <span className="text-[9px] font-mono text-oryn-orange tracking-[0.2em]">
                    {article.category.toUpperCase()}
                  </span>
                  <h3 className="text-lg font-bold mt-2 mb-2 group-hover:text-oryn-orange transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-oryn-black/50 font-plex leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
                    <span>{article.readTime.toUpperCase()}</span>
                    <span className="w-1 h-1 bg-oryn-orange rounded-full" />
                    <span>{article.datePublished}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse by Category Links */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-xl font-bold mb-6">Browse by Research Area</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: "Recovery & Healing", slug: "recovery" },
                { name: "Weight Loss", slug: "weight-loss" },
                { name: "Anti-Aging", slug: "anti-aging" },
                { name: "Muscle Growth", slug: "muscle-growth" },
                { name: "Skin Rejuvenation", slug: "skin-rejuvenation" },
              ].map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${locale}/peptides-for/${cat.slug}`}
                  className="p-5 border border-white/10 hover:border-oryn-orange/50 transition-colors text-center"
                >
                  <p className="text-sm font-bold">{cat.name}</p>
                  <p className="text-[10px] text-white/40 font-mono mt-1 tracking-[0.1em]">VIEW PRODUCTS</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
