import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products, getProductBySlug, productImages } from "@/data/products";
import { getProductDetail } from "@/data/product-details";
import {
  LONDON_AREAS,
  getLondonAreaBySlug,
  LONDON_AREA_SLUGS,
} from "@/data/london-areas";
import {
  SEO_CATEGORIES,
  getCategoryBySlug,
  getProductsForCategory,
  productSchema,
  faqSchema,
  breadcrumbSchema,
  SITE_URL,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import type { Dictionary } from "@/i18n/types";

// ─── On-demand generation (ISR) to keep build output under Vercel limits ──
export const dynamicParams = true;
export async function generateStaticParams() {
  return [];
}

// ─── Metadata ────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; area: string; slug: string }>;
}): Promise<Metadata> {
  const { area: areaSlug, slug, locale } = await params;
  const area = getLondonAreaBySlug(areaSlug);
  if (!area) return {};

  // Check if slug is a category
  const category = getCategoryBySlug(slug);
  if (category) {
    const title = `${category.name} Peptides in ${area.name}, London | ORYN Peptide Labs`;
    const description = `Buy ${category.name.toLowerCase()} peptides in ${area.name}, ${area.borough}. ${category.productSlugs.length} research-grade products with next-day delivery to ${area.postcode}. >99% purity, GMP manufactured.`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/${locale}/peptides/london/${areaSlug}/${slug}`,
        type: "website",
        images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
      },
      alternates: {
        canonical: `${SITE_URL}/${locale}/peptides/london/${areaSlug}/${slug}`,
      },
    };
  }

  // Check if slug is a product
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = `Buy ${product.name} in ${area.name}, London | ORYN Peptide Pen — Next-Day Delivery`;
  const description = `Order ORYN ${product.name} ${product.dosage} peptide pen in ${area.name}, ${area.borough}. Next-day delivery to ${area.postcode}, >99% purity, pre-mixed & ready to use. From €${product.price}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/peptides/london/${areaSlug}/${slug}`,
      type: "website",
      images: [{ url: `${SITE_URL}${product.image}`, width: 800, height: 800 }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/peptides/london/${areaSlug}/${slug}`,
    },
  };
}

// ─── Page Component ──────────────────────────────────────────────────

export default async function LondonAreaSlugPage({
  params,
}: {
  params: Promise<{ locale: string; area: string; slug: string }>;
}) {
  const { area: areaSlug, slug, locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const area = getLondonAreaBySlug(areaSlug);
  if (!area) notFound();

  // Dispatch: category page or product page
  const category = getCategoryBySlug(slug);
  if (category) {
    return <CategoryInAreaPage area={area} category={category} locale={locale} dict={dict} />;
  }

  const product = getProductBySlug(slug);
  if (product) {
    return <ProductInAreaPage area={area} product={product} locale={locale} dict={dict} />;
  }

  notFound();
}

// =====================================================================
// CATEGORY IN AREA PAGE
// =====================================================================

function CategoryInAreaPage({
  area,
  category,
  locale,
  dict,
}: {
  area: ReturnType<typeof getLondonAreaBySlug> & {};
  category: ReturnType<typeof getCategoryBySlug> & {};
  locale: string;
  dict: Dictionary;
}) {
  const categoryProducts = getProductsForCategory(category);
  const currency = "€";
  const otherCategories = SEO_CATEGORIES.filter((c) => c.slug !== category.slug);

  const zoneLabel =
    area.zone === "central" ? "Central" :
    area.zone === "north" ? "North" :
    area.zone === "east" ? "East" :
    area.zone === "south" ? "South" : "West";

  // Nearby areas for cross-linking
  const nearbyAreas = LONDON_AREAS.filter(
    (a) => a.slug !== area.slug && area.nearbyAreas.some(
      (n) => n.toLowerCase() === a.name.toLowerCase()
    )
  ).slice(0, 6);

  const sameCategoryOtherAreas = LONDON_AREAS.filter(
    (a) => a.slug !== area.slug && a.zone === area.zone
  ).slice(0, 4);

  // Category + Area specific FAQs
  const faqs = [
    ...category.faqs.slice(0, 2),
    {
      question: `Can I buy ${category.name.toLowerCase()} peptides in ${area.name}?`,
      answer: `Yes. ORYN delivers ${category.name.toLowerCase()} peptides to ${area.name} (${area.postcode}), ${area.borough} with next-day delivery. Products include ${categoryProducts.map((p) => p.name).join(", ")} — all >99% purity, GMP manufactured, and pre-mixed.`,
    },
    {
      question: `How fast is delivery of ${category.name.toLowerCase()} peptides to ${area.name}?`,
      answer: `ORYN offers same-day dispatch for orders placed before 3 PM, with next-day delivery to ${area.name} and all ${area.postcode} postcodes. All peptides ship in discreet, temperature-controlled packaging.`,
    },
    ...category.faqs.slice(2),
  ];

  return (
    <>
      <MultiJsonLd
        items={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.peptides, url: `/${locale}/products` },
            { name: dict.breadcrumbs.london, url: `/${locale}/peptides/london` },
            { name: area.name, url: `/${locale}/peptides/london/${area.slug}` },
            { name: category.name, url: `/${locale}/peptides/london/${area.slug}/${category.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${category.name} Peptides in ${area.name}, London`,
            numberOfItems: categoryProducts.length,
            itemListElement: categoryProducts.map((product, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/${locale}/products/${product.slug}`,
              name: `ORYN ${product.name}`,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "OnlineBusiness",
            name: `ORYN Peptide Labs — ${category.name} in ${area.name}`,
            url: `${SITE_URL}/${locale}/peptides/london/${area.slug}/${category.slug}`,
            description: `Buy ${category.name.toLowerCase()} peptides in ${area.name}, London. Next-day delivery, >99% purity.`,
            areaServed: {
              "@type": "Place",
              name: `${area.name}, London`,
              containedInPlace: { "@type": "City", name: "London" },
            },
            brand: { "@type": "Brand", name: "ORYN" },
            priceRange: "€99 - €299",
          },
        ]}
      />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em] flex-wrap">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <Link href={`/${locale}/peptides/london`} className="hover:text-oryn-orange transition-colors">LONDON</Link>
            <span className="text-oryn-orange">/</span>
            <Link href={`/${locale}/peptides/london/${area.slug}`} className="hover:text-oryn-orange transition-colors">{area.name.toUpperCase()}</Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">{category.name.toUpperCase()}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                {zoneLabel.toUpperCase()} LONDON &middot; {area.postcode} &middot; {category.name.toUpperCase()}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {category.name} Peptides<br />in {area.name}
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-3xl mb-8">
              {category.description} Delivered to {area.name}, {area.borough} with next-day tracked shipping to all {area.postcode} postcodes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/peptides-for/${category.slug}`}
                className="px-8 py-4 bg-oryn-orange text-white text-xs font-medium tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors"
              >
                VIEW ALL {category.name.toUpperCase()} PEPTIDES
              </Link>
              <Link
                href={`/${locale}/peptides/london/${area.slug}`}
                className="px-8 py-4 border border-white/20 text-white text-xs font-medium tracking-[0.2em] hover:border-oryn-orange hover:text-oryn-orange transition-colors"
              >
                ALL PEPTIDES IN {area.name.toUpperCase()}
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="border-b border-oryn-grey/20">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Next-Day Delivery", sub: `To ${area.postcode}` },
              { label: ">99% Purity", sub: "HPLC Verified" },
              { label: `${categoryProducts.length} Products`, sub: category.name },
              { label: "Pre-Mixed Pens", sub: "Ready to Use" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-sm font-bold">{item.label}</p>
                <p className="text-[10px] text-oryn-black/40 font-mono tracking-[0.1em] mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Category Description + Area Info */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {category.name} in {area.name}
              </h2>
              <p className="text-sm text-oryn-black/60 font-plex leading-relaxed mb-6">
                {area.name} is {area.description}. ORYN delivers our full range of {category.name.toLowerCase()} peptide pens to researchers and professionals in {area.name} and the surrounding {area.borough} area.
              </p>
              <h3 className="text-sm font-bold mb-3">Key Research Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {category.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2 p-3 bg-oryn-orange/5 border border-oryn-orange/10">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2" className="shrink-0 mt-0.5">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs text-oryn-black/70 font-plex">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-oryn-orange/5 border border-oryn-orange/10 p-8">
              <h3 className="text-lg font-bold mb-4">Delivery to {area.name}</h3>
              <div className="space-y-4">
                {[
                  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Same-Day Dispatch", desc: "Orders before 3 PM ship the same day" },
                  { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", title: "Next-Day Delivery", desc: `Express tracked shipping to ${area.postcode}` },
                  { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title: "Discreet Packaging", desc: "Plain packaging, no product description" },
                  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Temperature Controlled", desc: "Insulated packaging, cold chain integrity" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0 mt-0.5">
                      <path d={item.icon} />
                    </svg>
                    <div>
                      <p className="text-sm font-bold">{item.title}</p>
                      <p className="text-xs text-oryn-black/50 font-plex">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              {area.landmarks.length > 0 && (
                <div className="mt-6 pt-4 border-t border-oryn-orange/10">
                  <p className="text-[10px] font-mono text-oryn-black/30 tracking-[0.1em] mb-2">NOTABLE INSTITUTIONS</p>
                  <ul className="space-y-1">
                    {area.landmarks.map((l) => (
                      <li key={l} className="flex items-center gap-2 text-xs text-oryn-black/50 font-plex">
                        <span className="w-1 h-1 bg-oryn-orange rounded-full shrink-0" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="bg-oryn-cream py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                {category.name.toUpperCase()} IN {area.name.toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {category.name} Peptide Pens
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categoryProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/peptides/london/${area.slug}/${product.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group flex flex-col md:flex-row"
                >
                  <div className="bg-oryn-cream/50 p-8 flex items-center justify-center min-w-[200px] min-h-[200px]">
                    <Image
                      src={productImages.bySlug[product.slug] || product.image}
                      alt={`ORYN ${product.name} — ${category.name} in ${area.name}, London`}
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
                    <p className="text-[9px] font-mono text-oryn-orange tracking-[0.15em] mb-1">
                      {product.categoryLabel.toUpperCase()}
                    </p>
                    <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                    <p className="text-xs text-oryn-black/40 font-plex mb-3">{product.subtitle}</p>
                    <p className="text-xs text-oryn-black/50 font-plex leading-relaxed mb-4 line-clamp-3">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-oryn-orange">{currency}{product.price}</span>
                      <span className="text-[9px] font-mono text-oryn-black/30">{product.dosage} &middot; {product.volume}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8">
            {category.name} in {area.name} &mdash; Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
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

        {/* Other Categories in Same Area */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-xl font-bold mb-2">Other Categories in {area.name}</h2>
            <p className="text-xs text-white/40 font-plex mb-8">Explore more peptide research areas available in {area.name}, London</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
              {otherCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${locale}/peptides/london/${area.slug}/${cat.slug}`}
                  className="p-4 border border-white/10 hover:border-oryn-orange/50 transition-colors"
                >
                  <p className="text-sm font-bold">{cat.name}</p>
                  <p className="text-[10px] text-white/40 font-mono tracking-[0.1em] mt-1">
                    {cat.productSlugs.length} PRODUCTS &middot; {area.postcode}
                  </p>
                </Link>
              ))}
            </div>

            {/* Same Category in Nearby Areas */}
            <h2 className="text-xl font-bold mb-2">
              {category.name} in Nearby Areas
            </h2>
            <p className="text-xs text-white/40 font-plex mb-8">
              {category.name} peptides also delivered to these {zoneLabel} London neighbourhoods
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sameCategoryOtherAreas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/${locale}/peptides/london/${a.slug}/${category.slug}`}
                  className="p-4 border border-white/10 hover:border-oryn-orange/50 transition-colors"
                >
                  <p className="text-sm font-bold">{a.name}</p>
                  <p className="text-[10px] text-white/40 font-mono tracking-[0.1em]">{a.postcode} &middot; {category.name.toUpperCase()}</p>
                </Link>
              ))}
            </div>
            {nearbyAreas.length > 0 && (
              <div className="mt-6">
                <p className="text-[10px] font-mono text-white/20 tracking-[0.1em] mb-3">ALSO SERVING NEARBY</p>
                <div className="flex flex-wrap gap-2">
                  {nearbyAreas.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/${locale}/peptides/london/${a.slug}/${category.slug}`}
                      className="px-3 py-1.5 border border-white/5 hover:border-oryn-orange/30 text-xs text-white/50 hover:text-oryn-orange transition-colors font-plex"
                    >
                      {a.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Individual Product Links */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold mb-6">Shop {category.name} Products in {area.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryProducts.map((product) => (
              <Link
                key={product.id}
                href={`/${locale}/products/${product.slug}`}
                className="flex items-center gap-4 p-4 border border-oryn-grey/10 hover:border-oryn-orange/30 transition-colors group"
              >
                <Image
                  src={productImages.bySlug[product.slug] || product.image}
                  alt={`Buy ORYN ${product.name} in ${area.name}`}
                  width={60}
                  height={60}
                  className="object-contain group-hover:scale-105 transition-transform"
                />
                <div>
                  <p className="text-sm font-bold group-hover:text-oryn-orange transition-colors">{product.name}</p>
                  <p className="text-[10px] text-oryn-black/40 font-plex">{product.dosage} &middot; {product.volume}</p>
                  <p className="text-lg font-bold text-oryn-orange mt-1">{currency}{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Order {category.name} Peptides in {area.name}
            </h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              Premium pre-mixed peptide pens with next-day delivery to {area.name}, {area.postcode}. GMP manufactured, &gt;99% purity guaranteed.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
              >
                SHOP ALL PEPTIDES
              </Link>
              <Link
                href={`/${locale}/peptides-for/${category.slug}`}
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white font-medium text-xs tracking-[0.2em] hover:bg-white/10 transition-colors"
              >
                ALL {category.name.toUpperCase()} PRODUCTS
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

// =====================================================================
// PRODUCT IN AREA PAGE (original [product] page, preserved)
// =====================================================================

function ProductInAreaPage({
  area,
  product,
  locale,
  dict,
}: {
  area: ReturnType<typeof getLondonAreaBySlug> & {};
  product: ReturnType<typeof getProductBySlug> & {};
  locale: string;
  dict: Dictionary;
}) {
  const detail = getProductDetail(product.slug);
  const currency = "€";
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const faqs = [
    {
      question: `Where can I buy ${product.name} in ${area.name}?`,
      answer: `ORYN delivers ${product.name} peptide pens directly to ${area.name}, ${area.borough} (${area.postcode}) with next-day tracked delivery. Order online and receive your pre-mixed, research-grade pen at your door.`,
    },
    {
      question: `How much does ${product.name} cost?`,
      answer: `ORYN ${product.name} is priced at ${currency}${product.price} per pen, containing a 30-day supply of ${product.dosage} in a pre-mixed, ready-to-use pen system. Free delivery on orders over €150.`,
    },
    {
      question: `How fast is delivery to ${area.name}?`,
      answer: `ORYN ships same-day for orders placed before 3 PM with next-day delivery to ${area.name} and all ${area.postcode} postcodes. All orders ship in discreet, temperature-controlled packaging.`,
    },
    {
      question: `What purity is ORYN ${product.name}?`,
      answer: `ORYN ${product.name} exceeds 99% purity, verified by independent HPLC analysis. Each batch comes with a Certificate of Analysis from a third-party laboratory.`,
    },
  ];

  const nearbyWithProduct = LONDON_AREAS.filter(
    (a) => a.slug !== area.slug && a.zone === area.zone
  ).slice(0, 4);

  return (
    <>
      <MultiJsonLd
        items={[
          productSchema(product, locale),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.london, url: `/${locale}/peptides/london` },
            { name: area.name, url: `/${locale}/peptides/london/${area.slug}` },
            { name: product.name, url: `/${locale}/peptides/london/${area.slug}/${product.slug}` },
          ]),
        ]}
      />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <Link href={`/${locale}/peptides/london`} className="hover:text-oryn-orange transition-colors">LONDON</Link>
            <span className="text-oryn-orange">/</span>
            <Link href={`/${locale}/peptides/london/${area.slug}`} className="hover:text-oryn-orange transition-colors">{area.name.toUpperCase()}</Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">{product.name.toUpperCase()}</span>
          </nav>
        </div>

        {/* Product Hero */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-oryn-cream overflow-hidden relative flex items-center justify-center p-16 min-h-[400px]">
              <Image
                src={productImages.bySlug[product.slug] || product.image}
                alt={`Buy ORYN ${product.name} in ${area.name}, London`}
                width={350}
                height={350}
                className="object-contain"
                priority
              />
              {product.badge && (
                <span className="absolute top-6 left-6 px-3 py-1 bg-oryn-orange text-white text-[9px] font-bold tracking-[0.15em] uppercase">
                  {product.badge}
                </span>
              )}
            </div>

            <div>
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-oryn-orange" />
                <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                  {product.categoryLabel.toUpperCase()} &mdash; {area.name.toUpperCase()}, LONDON
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mt-1 mb-2 tracking-tight">
                Buy {product.name} in {area.name}
              </h1>
              <p className="text-sm text-oryn-black/40 font-plex mb-4">
                {product.subtitle} &middot; Next-Day Delivery to {area.postcode}
              </p>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-oryn-orange">{currency}{product.price}</span>
                <span className="text-xs text-oryn-black/30 font-plex">per pen</span>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {[`Next-Day to ${area.postcode}`, ">99% Purity", "COA Included", "Pre-Mixed"].map((trust) => (
                  <span key={trust} className="flex items-center gap-1.5 px-3 py-1.5 bg-oryn-orange/5 border border-oryn-orange/10 text-[9px] font-mono text-oryn-black/50 tracking-[0.05em]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {trust}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {[product.dosage, product.volume, ">99% PURITY", "PHARMA GRADE"].map((spec) => (
                  <span key={spec} className="px-3 py-1.5 bg-oryn-orange/5 text-[9px] font-mono text-oryn-orange tracking-[0.1em] border border-oryn-orange/10">
                    {spec}
                  </span>
                ))}
              </div>

              <p className="text-xs text-oryn-black/50 font-plex leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="mb-8">
                <h3 className="text-xs font-bold mb-3 tracking-wide">KEY BENEFITS</h3>
                <ul className="space-y-2">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-oryn-black/60 font-plex">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2" className="shrink-0 mt-0.5">
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/${locale}/products/${product.slug}`}
                className="w-full py-4 bg-oryn-orange text-white font-medium text-xs tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors flex items-center justify-center gap-3"
              >
                VIEW PRODUCT &amp; ADD TO CART &mdash; {currency}{product.price}
              </Link>
            </div>
          </div>
        </section>

        {/* Science snippet */}
        {detail?.science && (
          <section className="max-w-7xl mx-auto px-6 py-8">
            <h2 className="text-xl font-bold mb-4">{product.name} &mdash; Science &amp; Research</h2>
            <p className="text-sm text-oryn-black/60 font-plex leading-relaxed mb-4">
              {detail.science.mechanism}
            </p>
            <div className="flex flex-wrap gap-2">
              {detail.science.researchAreas.map((ra) => (
                <span key={ra} className="px-3 py-1 bg-oryn-cream text-[9px] font-mono text-oryn-black/50 tracking-[0.05em]">
                  {ra}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-xl font-bold mb-6">{product.name} in {area.name} &mdash; FAQ</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-oryn-grey/20 open:border-oryn-orange/20">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-oryn-cream/50 transition-colors">
                  <h3 className="text-sm font-bold pr-4">{faq.question}</h3>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-oryn-orange group-open:rotate-45 transition-transform">
                    <path d="M12 5v14m-7-7h14" />
                  </svg>
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-xs text-oryn-black/60 font-plex leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-xl font-bold mb-6">Related Peptides in {area.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/${locale}/peptides/london/${area.slug}/${p.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                >
                  <div className="bg-oryn-cream/50 p-6 flex items-center justify-center min-h-[160px]">
                    <Image
                      src={productImages.bySlug[p.slug] || p.image}
                      alt={`ORYN ${p.name}`}
                      width={120}
                      height={120}
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold">{p.name}</h3>
                    <p className="text-xs text-oryn-black/40 font-plex">{p.subtitle}</p>
                    <p className="text-lg font-bold text-oryn-orange mt-2">{currency}{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Buy in nearby areas */}
        {nearbyWithProduct.length > 0 && (
          <section className="bg-oryn-cream py-12">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-lg font-bold mb-4">Buy {product.name} in Nearby London Areas</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {nearbyWithProduct.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/${locale}/peptides/london/${a.slug}/${product.slug}`}
                    className="p-4 bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-colors"
                  >
                    <p className="text-sm font-bold">{product.name} in {a.name}</p>
                    <p className="text-[10px] text-oryn-black/40 font-mono tracking-[0.1em]">{a.postcode} &middot; NEXT-DAY</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-oryn-black text-white py-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Order {product.name} in {area.name}
            </h2>
            <p className="text-sm text-white/50 font-plex mb-6">
              Next-day tracked delivery to {area.postcode}. Pre-mixed &amp; ready to use. &gt;99% purity guaranteed.
            </p>
            <Link
              href={`/${locale}/products/${product.slug}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-oryn-orange text-white font-medium text-xs tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors"
            >
              ORDER {product.name.toUpperCase()} &mdash; {currency}{product.price}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
