import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_ARTICLES } from "@/data/blog-articles";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { PageTracker } from "@/components/analytics/PageTracker";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const title = `${dict.breadcrumbs.learn} — ORYN Peptide Labs`;
  const description = dict.meta.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/learn`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/learn`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/learn`])
      ),
    },
  };
}

function groupByCategory(articles: typeof BLOG_ARTICLES) {
  const groups: Record<string, typeof BLOG_ARTICLES> = {};
  for (const article of articles) {
    if (!groups[article.category]) groups[article.category] = [];
    groups[article.category].push(article);
  }
  return groups;
}

const CATEGORY_ORDER = [
  "Peptide Research",
  "Guides",
  "Buying Guides",
  "Education",
  "Product Guides",
  "Research Guides",
  "Legal & Compliance",
  "Shipping & Delivery",
  "Industry News",
];

export default async function LearnPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const grouped = groupByCategory(BLOG_ARTICLES);
  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a);
    const bi = CATEGORY_ORDER.indexOf(b);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.learn, url: `/${locale}/learn` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Peptide Research Guides & Articles",
            description:
              "Expert guides on research peptides — legality, protocols, comparisons, buying guides.",
            url: `${SITE_URL}/${locale}/learn`,
            publisher: {
              "@type": "Organization",
              name: "ORYN Peptide Labs",
              url: SITE_URL,
            },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: BLOG_ARTICLES.length,
              itemListElement: BLOG_ARTICLES.map((article, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${SITE_URL}/${locale}/learn/${article.slug}`,
                name: article.title,
              })),
            },
          },
        ]}
      />
      <PageTracker pageName="learn_hub" properties={{ article_count: BLOG_ARTICLES.length }} />

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
              Expert-written articles covering peptide science, UK &amp; EU regulations,
              product comparisons, and research protocols. {BLOG_ARTICLES.length} articles and growing.
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <div className="bg-oryn-cream border-b border-oryn-grey/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-oryn-orange">{BLOG_ARTICLES.length}</div>
              <div className="text-[9px] font-mono text-oryn-black/40 tracking-[0.1em]">ARTICLES</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-oryn-orange">{sortedCategories.length}</div>
              <div className="text-[9px] font-mono text-oryn-black/40 tracking-[0.1em]">CATEGORIES</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-oryn-orange">2026</div>
              <div className="text-[9px] font-mono text-oryn-black/40 tracking-[0.1em]">UPDATED</div>
            </div>
          </div>
        </div>

        {/* Featured Article */}
        {BLOG_ARTICLES.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-16">
            <Link
              href={`/${locale}/learn/${BLOG_ARTICLES[0].slug}`}
              className="block bg-oryn-cream border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group p-8 md:p-12"
            >
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                FEATURED &middot; {BLOG_ARTICLES[0].category.toUpperCase()}
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
                <span>{BLOG_ARTICLES[0].dateModified}</span>
              </div>
            </Link>
          </section>
        )}

        {/* Articles by Category */}
        {sortedCategories.map((category) => (
          <section key={category} className="max-w-7xl mx-auto px-6 pb-12">
            <div className="flex items-center gap-3 mb-5 border-b border-oryn-grey/10 pb-3">
              <div className="w-4 h-px bg-oryn-orange" />
              <h2 className="text-[11px] font-mono text-oryn-orange tracking-[0.2em]">
                {category.toUpperCase()}
              </h2>
              <span className="text-[10px] font-mono text-oryn-black/20">
                ({grouped[category].length})
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {grouped[category].map((article) => (
                <Link
                  key={article.slug}
                  href={`/${locale}/learn/${article.slug}`}
                  className="group border border-oryn-grey/10 hover:border-oryn-orange/20 transition-all bg-white"
                >
                  <div className="p-5">
                    <h3 className="text-sm font-bold group-hover:text-oryn-orange transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-oryn-black/40 font-plex line-clamp-2 mt-2 mb-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">
                        {article.readTime.toUpperCase()}
                      </span>
                      <span className="w-1 h-1 bg-oryn-black/10 rounded-full" />
                      <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">
                        {article.dateModified}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Browse by Research Area */}
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

        {/* European Delivery CTA */}
        <section className="bg-oryn-cream py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-lg font-bold mb-1">Shipping Across Europe</h2>
                <p className="text-xs text-oryn-black/50 font-plex">
                  Fast tracked delivery to 30 European countries. No customs, no delays.
                </p>
              </div>
              <Link
                href={`/${locale}/peptides/europe`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-oryn-orange text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange/90 transition-colors shrink-0"
              >
                EUROPEAN DELIVERY INFO
              </Link>
            </div>
          </div>
        </section>

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
