import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { productImages } from "@/data/products";
import {
  SEO_CATEGORIES,
  getCategoryBySlug,
  getProductsForCategory,
  categoryMetadata,
  faqSchema,
  breadcrumbSchema,
  SITE_URL,
} from "@/lib/seo";
import { JsonLd, MultiJsonLd } from "@/components/seo/JsonLd";
import { PageTracker } from "@/components/analytics/PageTracker";
import { locales } from "@/i18n/config";
import { RelatedContent } from "@/components/seo/RelatedContent";

export async function generateStaticParams() {
  const params = [];
  for (const locale of locales) {
    for (const cat of SEO_CATEGORIES) {
      params.push({ locale, category: cat.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { category: catSlug, locale } = await params;
  const category = getCategoryBySlug(catSlug);
  if (!category) return {};

  const { title, description } = categoryMetadata(category, locale);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/peptides-for/${catSlug}`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/peptides-for/${catSlug}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/peptides-for/${catSlug}`])
      ),
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { category: catSlug, locale } = await params;
  const category = getCategoryBySlug(catSlug);
  if (!category) notFound();

  const categoryProducts = getProductsForCategory(category);
  const otherCategories = SEO_CATEGORIES.filter((c) => c.slug !== category.slug);
  const currency = "€";

  return (
    <>
      <MultiJsonLd
        items={[
          faqSchema(category.faqs),
          breadcrumbSchema([
            { name: "Home", url: `/${locale}` },
            { name: "Products", url: `/${locale}/products` },
            { name: category.name, url: `/${locale}/peptides-for/${category.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `ORYN ${category.name} Peptides`,
            numberOfItems: categoryProducts.length,
            itemListElement: categoryProducts.map((product, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/${locale}/products/${product.slug}`,
              name: `ORYN ${product.name}`,
            })),
          },
        ]}
      />
      <PageTracker pageName="peptides_for_category" properties={{ category: catSlug }} />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <Link href={`/${locale}/products`} className="hover:text-oryn-orange transition-colors">PRODUCTS</Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">{category.name.toUpperCase()}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">RESEARCH CATEGORY</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {category.headline}
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-3xl">
              {category.description}
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold mb-6">Key Research Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 p-4 bg-oryn-orange/5 border border-oryn-orange/10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2" className="shrink-0 mt-0.5">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-oryn-black/70 font-plex">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="bg-oryn-cream py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                {category.name.toUpperCase()} PRODUCTS
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-8">Available Peptide Pens</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categoryProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/products/${product.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group flex flex-col md:flex-row"
                >
                  <div className="bg-oryn-cream/50 p-8 flex items-center justify-center min-w-[200px] min-h-[200px]">
                    <Image
                      src={productImages.bySlug[product.slug] || product.image}
                      alt={`ORYN ${product.name}`}
                      width={160}
                      height={160}
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    {product.badge && (
                      <span className="self-start px-2 py-0.5 bg-oryn-orange text-white text-[8px] font-bold tracking-[0.15em] mb-2">
                        {product.badge.toUpperCase()}
                      </span>
                    )}
                    <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                    <p className="text-xs text-oryn-black/40 font-plex mb-3">{product.subtitle}</p>
                    <p className="text-xs text-oryn-black/50 font-plex leading-relaxed mb-4 line-clamp-3">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-oryn-orange">{currency}{product.price}</span>
                      <span className="text-[9px] font-mono text-oryn-black/30">{product.dosage} · {product.volume}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8">{category.name} — Frequently Asked Questions</h2>
          <div className="space-y-4">
            {category.faqs.map((faq, i) => (
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

        {/* Other Categories */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-xl font-bold mb-6">Explore Other Research Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${locale}/peptides-for/${cat.slug}`}
                  className="p-5 border border-white/10 hover:border-oryn-orange/50 transition-colors"
                >
                  <p className="text-sm font-bold">{cat.name}</p>
                  <p className="text-[10px] text-white/40 font-mono mt-1 tracking-[0.1em]">
                    {cat.productSlugs.length} PRODUCTS
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Related Content */}
        <RelatedContent categorySlug={catSlug} locale={locale} />

        {/* CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Start Your {category.name} Research</h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              Premium pre-mixed peptide pens. GMP manufactured, &gt;99% purity guaranteed. Next-day UK delivery.
            </p>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
            >
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
