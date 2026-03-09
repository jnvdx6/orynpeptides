import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products, getProductBySlug, productImages } from "@/data/products";
import { UK_REGIONS, getRegionBySlug, REGION_SLUGS } from "@/data/uk-regions";
import { getCityBySlug } from "@/data/uk-cities";
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

// ─── On-demand generation (ISR) to keep build output under Vercel limits ──
export const dynamicParams = true;
export async function generateStaticParams() {
  return [];
}

// ─── Metadata ───────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; region: string; slug: string }>;
}): Promise<Metadata> {
  const { region: regionSlug, slug, locale } = await params;
  const region = getRegionBySlug(regionSlug);
  if (!region) return {};

  const product = getProductBySlug(slug);
  const category = getCategoryBySlug(slug);
  if (!product && !category) return {};

  const topCities = region.cities
    .slice(0, 3)
    .map((s) => getCityBySlug(s)?.name)
    .filter(Boolean)
    .join(", ");

  let title: string;
  let description: string;

  if (product) {
    title = `Buy ${product.name} in ${region.name} | ORYN Peptide Pen — ${region.deliveryDays}-Day Delivery`;
    description = `Order ORYN ${product.name} ${product.dosage} peptide pen in ${region.name}. ${region.deliveryDays}-day delivery to ${topCities} & more. >99% purity, pre-mixed & ready to use. From \u00a3${product.price}.`;
  } else {
    const cat = category!;
    title = `${cat.name} Peptides in ${region.name} | ORYN — ${region.deliveryDays}-Day UK Delivery`;
    description = `Buy research-grade ${cat.name.toLowerCase()} peptide pens in ${region.name}. ${region.deliveryDays}-day delivery to ${topCities} & more. ${cat.productSlugs.length} products, >99% purity, GMP manufactured.`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/peptides/region/${regionSlug}/${slug}`,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/en/peptides/region/${regionSlug}/${slug}`,
    },
  };
}

// ─── Region-specific product FAQs ───────────────────────────────────

function productFaqs(
  productName: string,
  regionName: string,
  deliveryDays: string,
  dosage: string,
) {
  return [
    {
      question: `Can I buy ${productName} in ${regionName}?`,
      answer: `Yes. ORYN delivers ${productName} across ${regionName} with ${deliveryDays}-day express tracked delivery. Our ${productName} peptide pen comes pre-mixed and ready to use, manufactured to >99% purity in GMP-certified facilities.`,
    },
    {
      question: `How fast is ${productName} delivery to ${regionName}?`,
      answer: `ORYN ships same-day for orders placed before 3 PM. ${productName} delivery across ${regionName} typically takes ${deliveryDays} business days via express tracked shipping with temperature-controlled packaging to maintain cold chain integrity.`,
    },
    {
      question: `What dosage of ${productName} does ORYN offer?`,
      answer: `ORYN ${productName} contains ${dosage} per pen in a precision dosing system. Each pen provides consistent, research-grade administration over a 30-day period. All batches exceed 99% purity and include a Certificate of Analysis.`,
    },
    {
      question: `Is ${productName} legal to purchase in ${regionName}?`,
      answer: `Research peptides including ${productName} are legal to purchase across the UK, including ${regionName}. ORYN products are sold strictly for research purposes only and are not intended for self-administration. No prescription is required.`,
    },
  ];
}

// ─── Region-specific category FAQs ──────────────────────────────────

function categoryFaqs(
  categoryName: string,
  regionName: string,
  deliveryDays: string,
  productCount: number,
) {
  return [
    {
      question: `What ${categoryName.toLowerCase()} peptides are available in ${regionName}?`,
      answer: `ORYN offers ${productCount} ${categoryName.toLowerCase()} peptide products with delivery across ${regionName}. All products come in our precision pen system, pre-mixed and ready to use with >99% purity and GMP certification.`,
    },
    {
      question: `How fast is ${categoryName.toLowerCase()} peptide delivery to ${regionName}?`,
      answer: `ORYN ships same-day for orders placed before 3 PM. Delivery of ${categoryName.toLowerCase()} peptides across ${regionName} typically takes ${deliveryDays} business days via express tracked shipping with temperature-controlled packaging.`,
    },
    {
      question: `Why choose ORYN for ${categoryName.toLowerCase()} peptides in ${regionName}?`,
      answer: `ORYN delivers pharmaceutical-grade ${categoryName.toLowerCase()} peptides to all major cities in ${regionName}. Every product exceeds 99% purity, is manufactured in GMP-certified European facilities, and comes with a Certificate of Analysis. Our pen system eliminates reconstitution and dosing errors.`,
    },
    {
      question: `Are ${categoryName.toLowerCase()} peptides legal in ${regionName}?`,
      answer: `Research peptides are legal to purchase across the UK, including ${regionName}. ORYN ${categoryName.toLowerCase()} peptides are sold strictly for research purposes only and are not intended for self-administration. No prescription is required.`,
    },
  ];
}

// ─── Page Component ─────────────────────────────────────────────────

export default async function RegionSlugPage({
  params,
}: {
  params: Promise<{ locale: string; region: string; slug: string }>;
}) {
  const { region: regionSlug, slug, locale } = await params;
  const region = getRegionBySlug(regionSlug);
  if (!region) notFound();

  const product = getProductBySlug(slug);
  const category = getCategoryBySlug(slug);
  if (!product && !category) notFound();

  const currency = locale === "es" ? "\u20ac" : "\u00a3";
  const cities = region.cities
    .map((s) => getCityBySlug(s))
    .filter((c): c is NonNullable<typeof c> => !!c);
  const otherRegions = UK_REGIONS.filter((r) => r.slug !== region.slug);

  // ─── Product Page ───────────────────────────────────────────────
  if (product) {
    const faqs = productFaqs(
      product.name,
      region.name,
      region.deliveryDays,
      product.dosage,
    );

    const otherProducts = products.filter((p) => p.slug !== product.slug);
    const relatedProducts = otherProducts.slice(0, 4);

    // Categories this product belongs to
    const relatedCategories = SEO_CATEGORIES.filter((c) =>
      c.productSlugs.includes(product.slug),
    ).slice(0, 4);

    return (
      <>
        <MultiJsonLd
          items={[
            breadcrumbSchema([
              { name: "Home", url: `/${locale}` },
              { name: "Peptides", url: `/${locale}/products` },
              {
                name: region.name,
                url: `/${locale}/peptides/region/${region.slug}`,
              },
              {
                name: product.name,
                url: `/${locale}/peptides/region/${region.slug}/${product.slug}`,
              },
            ]),
            productSchema(product, locale),
            faqSchema(faqs),
            {
              "@context": "https://schema.org",
              "@type": "OnlineBusiness",
              name: `ORYN Peptide Labs \u2014 ${product.name} in ${region.name}`,
              url: `${SITE_URL}/en/peptides/region/${region.slug}/${product.slug}`,
              description: `Buy ORYN ${product.name} peptide pen in ${region.name}. ${region.deliveryDays}-day delivery, >99% purity, GMP manufactured.`,
              areaServed: {
                "@type": "AdministrativeArea",
                name: region.name,
                containedInPlace: {
                  "@type": "Country",
                  name: "United Kingdom",
                },
              },
              brand: { "@type": "Brand", name: "ORYN" },
              priceRange: "\u00a3169 - \u00a3399",
            },
          ]}
        />

        <div className="pt-[calc(1rem+4px)]">
          {/* Breadcrumb */}
          <div className="max-w-7xl mx-auto px-6 py-4">
            <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
              <Link
                href={`/${locale}`}
                className="hover:text-oryn-orange transition-colors"
              >
                HOME
              </Link>
              <span className="text-oryn-orange">/</span>
              <Link
                href={`/${locale}/products`}
                className="hover:text-oryn-orange transition-colors"
              >
                PRODUCTS
              </Link>
              <span className="text-oryn-orange">/</span>
              <Link
                href={`/${locale}/peptides/region/${region.slug}`}
                className="hover:text-oryn-orange transition-colors"
              >
                {region.name.toUpperCase()}
              </Link>
              <span className="text-oryn-orange">/</span>
              <span className="text-oryn-orange">
                {product.name.toUpperCase()}
              </span>
            </nav>
          </div>

          {/* Hero */}
          <section className="bg-oryn-black text-white py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-oryn-orange" />
                <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                  {product.categoryLabel.toUpperCase()} \u2014{" "}
                  {region.name.toUpperCase()}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Buy {product.name}
                <br />
                in {region.name}
              </h1>
              <p className="text-lg text-white/60 font-plex max-w-2xl mb-8">
                Order ORYN {product.name} {product.dosage} peptide pen with{" "}
                {region.deliveryDays === "1"
                  ? "next-day"
                  : `${region.deliveryDays}-day`}{" "}
                delivery across {region.name}. Pre-mixed, precision-dosed, and
                manufactured to &gt;99% purity in GMP-certified facilities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/products/${product.slug}`}
                  className="px-8 py-4 bg-oryn-orange text-white text-xs font-medium tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors"
                >
                  VIEW {product.name.toUpperCase()} DETAILS
                </Link>
                <Link
                  href={`/${locale}/peptides/region/${region.slug}`}
                  className="px-8 py-4 border border-white/20 text-white text-xs font-medium tracking-[0.2em] hover:border-oryn-orange hover:text-oryn-orange transition-colors"
                >
                  ALL PEPTIDES IN {region.name.toUpperCase()}
                </Link>
              </div>
            </div>
          </section>

          {/* Trust Signals */}
          <section className="border-b border-oryn-grey/20">
            <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  label: `${region.deliveryDays}-Day Delivery`,
                  sub: `Across ${region.name}`,
                },
                { label: ">99% Purity", sub: "HPLC Verified" },
                { label: product.dosage, sub: "Precision Dosed" },
                { label: "GMP Certified", sub: "European Facility" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-sm font-bold">{item.label}</p>
                  <p className="text-[10px] text-oryn-black/40 font-mono tracking-[0.1em] mt-1">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Product Detail */}
          <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="bg-oryn-cream/50 border border-oryn-grey/10 flex items-center justify-center p-12 relative">
                <Image
                  src={
                    productImages.bySlug[product.slug] || product.image
                  }
                  alt={`ORYN ${product.name} peptide pen \u2014 ${region.name}`}
                  width={300}
                  height={300}
                  className="object-contain"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-oryn-orange text-white text-[8px] font-bold tracking-[0.15em]">
                    {product.badge.toUpperCase()}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div>
                <p className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-2">
                  {product.categoryLabel.toUpperCase()}
                </p>
                <h2 className="text-3xl font-bold mb-2">
                  ORYN {product.name}
                </h2>
                <p className="text-sm text-oryn-black/50 font-plex mb-4">
                  {product.subtitle} \u2014 {product.dosage} /{" "}
                  {product.volume}
                </p>
                <p className="text-3xl font-bold text-oryn-orange mb-6">
                  {currency}
                  {product.price}
                </p>
                <p className="text-sm text-oryn-black/60 font-plex leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Benefits */}
                <div className="mb-6">
                  <h3 className="text-xs font-mono text-oryn-black/40 tracking-[0.15em] mb-3">
                    KEY BENEFITS
                  </h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2 text-sm text-oryn-black/70 font-plex"
                      >
                        <span className="text-oryn-orange mt-0.5">
                          +
                        </span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specs */}
                <div className="border-t border-oryn-grey/20 pt-4">
                  <h3 className="text-xs font-mono text-oryn-black/40 tracking-[0.15em] mb-3">
                    SPECIFICATIONS
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">
                          {key.toUpperCase()}
                        </p>
                        <p className="text-xs font-bold">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <Link
                    href={`/${locale}/products/${product.slug}`}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-oryn-orange text-white text-xs font-medium tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors"
                  >
                    ORDER {product.name.toUpperCase()} NOW
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Delivery Info */}
          <section className="bg-oryn-cream py-16 border-t border-oryn-orange/10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="inline-flex items-center gap-3 mb-2">
                    <div className="w-6 h-px bg-oryn-orange" />
                    <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                      DELIVERY INFO
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    {product.name} Delivery to {region.name}
                  </h2>
                  <p className="text-sm text-oryn-black/60 font-plex leading-relaxed mb-4">
                    ORYN delivers {product.name} across {region.name} with{" "}
                    {region.deliveryDays === "1"
                      ? "next-day"
                      : `${region.deliveryDays}-day`}{" "}
                    express tracked shipping. All orders placed before 3 PM are
                    dispatched the same day in temperature-controlled, discreet
                    packaging.
                  </p>
                  <p className="text-sm text-oryn-black/60 font-plex leading-relaxed">
                    We deliver to {cities.length} cities across {region.name},
                    including{" "}
                    {cities
                      .slice(0, 4)
                      .map((c) => c.name)
                      .join(", ")}
                    . Every shipment includes insulated packaging to maintain cold
                    chain integrity for your {product.name} peptide pen.
                  </p>
                </div>
                <div className="bg-white border border-oryn-grey/10 p-8">
                  <h3 className="text-lg font-bold mb-4">
                    Shipping Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FF6A1A"
                        strokeWidth="1.5"
                        className="shrink-0 mt-0.5"
                      >
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-bold">Same-Day Dispatch</p>
                        <p className="text-xs text-oryn-black/50 font-plex">
                          Orders before 3 PM ship the same day
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FF6A1A"
                        strokeWidth="1.5"
                        className="shrink-0 mt-0.5"
                      >
                        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <div>
                        <p className="text-sm font-bold">
                          {region.deliveryDays}-Day Delivery
                        </p>
                        <p className="text-xs text-oryn-black/50 font-plex">
                          Express tracked shipping across {region.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FF6A1A"
                        strokeWidth="1.5"
                        className="shrink-0 mt-0.5"
                      >
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <div>
                        <p className="text-sm font-bold">Discreet Packaging</p>
                        <p className="text-xs text-oryn-black/50 font-plex">
                          Plain packaging with no product description visible
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FF6A1A"
                        strokeWidth="1.5"
                        className="shrink-0 mt-0.5"
                      >
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <p className="text-sm font-bold">Temperature Controlled</p>
                        <p className="text-xs text-oryn-black/50 font-plex">
                          Insulated packaging maintains cold chain integrity
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cities in region */}
          <section className="py-16 border-t border-oryn-grey/10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="inline-flex items-center gap-3 mb-2">
                <div className="w-6 h-px bg-oryn-orange" />
                <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                  {product.name.toUpperCase()} DELIVERY CITIES
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Get {product.name} in {cities.length} Cities Across{" "}
                {region.name}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${locale}/peptides/${city.slug}/${product.slug}`}
                    className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all p-5 group"
                  >
                    <h3 className="text-sm font-bold mb-1 group-hover:text-oryn-orange transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-[10px] font-mono text-oryn-orange tracking-[0.1em]">
                      {city.deliveryDays}-DAY DELIVERY
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Related Categories */}
          {relatedCategories.length > 0 && (
            <section className="bg-oryn-cream py-16 border-t border-oryn-orange/10">
              <div className="max-w-7xl mx-auto px-6">
                <div className="inline-flex items-center gap-3 mb-2">
                  <div className="w-6 h-px bg-oryn-orange" />
                  <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                    RELATED CATEGORIES
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8">
                  {product.name} Research Categories in {region.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {relatedCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/${locale}/peptides/region/${region.slug}/${cat.slug}`}
                      className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all p-6 group"
                    >
                      <h3 className="text-sm font-bold mb-2 group-hover:text-oryn-orange transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-oryn-black/50 font-plex line-clamp-2 mb-3">
                        {cat.description}
                      </p>
                      <span className="text-[10px] font-mono text-oryn-orange tracking-[0.1em]">
                        {cat.productSlugs.length} PRODUCTS
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Related Products */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="inline-flex items-center gap-3 mb-2">
                <div className="w-6 h-px bg-oryn-orange" />
                <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                  MORE PEPTIDES IN {region.name.toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Other Peptide Pens Available
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/${locale}/peptides/region/${region.slug}/${p.slug}`}
                    className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                  >
                    <div className="relative bg-oryn-cream/50 p-6 flex items-center justify-center min-h-[140px]">
                      <Image
                        src={productImages.bySlug[p.slug] || p.image}
                        alt={`ORYN ${p.name} \u2014 ${region.name}`}
                        width={100}
                        height={100}
                        className="object-contain group-hover:scale-105 transition-transform"
                      />
                      {p.badge && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-oryn-orange text-white text-[7px] font-bold tracking-[0.15em]">
                          {p.badge.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-[8px] font-mono text-oryn-orange tracking-[0.15em] mb-1">
                        {p.categoryLabel.toUpperCase()}
                      </p>
                      <h3 className="text-sm font-bold mb-1">{p.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-oryn-orange">
                          {currency}
                          {p.price}
                        </span>
                        <span className="text-[8px] font-mono text-oryn-black/30 tracking-[0.1em]">
                          {p.dosage}
                        </span>
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
              {product.name} in {region.name} \u2014 Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
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

          {/* Other Regions */}
          <section className="bg-oryn-black text-white py-16">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl font-bold mb-8">
                Get {product.name} in Other Regions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherRegions.map((r) => {
                  const rCities = r.cities
                    .map((s) => getCityBySlug(s)?.name)
                    .filter(Boolean);
                  return (
                    <Link
                      key={r.slug}
                      href={`/${locale}/peptides/region/${r.slug}/${product.slug}`}
                      className="p-6 border border-white/10 hover:border-oryn-orange/50 transition-colors group"
                    >
                      <h3 className="text-lg font-bold group-hover:text-oryn-orange transition-colors">
                        {product.name} in {r.name}
                      </h3>
                      <p className="text-xs text-white/40 font-plex mt-1 mb-3">
                        {rCities.join(", ")}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-oryn-orange tracking-[0.1em]">
                          {r.deliveryDays}-DAY DELIVERY
                        </span>
                        <span className="text-[10px] font-mono text-white/30 tracking-[0.1em]">
                          {r.cities.length} CITIES
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-oryn-orange py-16">
            <div className="max-w-4xl mx-auto px-6 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Order {product.name} in {region.name}
              </h2>
              <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
                Premium pre-mixed {product.name} {product.dosage} peptide pen
                with{" "}
                {region.deliveryDays === "1"
                  ? "next-day"
                  : `${region.deliveryDays}-day`}{" "}
                delivery across {region.name}. GMP manufactured, &gt;99% purity
                guaranteed.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={`/${locale}/products/${product.slug}`}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
                >
                  ORDER {product.name.toUpperCase()} NOW
                </Link>
                <Link
                  href={`/${locale}/peptides/region/${region.slug}`}
                  className="inline-flex items-center gap-3 px-8 py-4 border border-white/40 text-white font-medium text-xs tracking-[0.2em] hover:bg-white/10 transition-colors"
                >
                  ALL PEPTIDES IN {region.name.toUpperCase()}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  // ─── Category Page ──────────────────────────────────────────────
  const cat = category!;
  const categoryProducts = getProductsForCategory(cat);
  const faqs = categoryFaqs(
    cat.name,
    region.name,
    region.deliveryDays,
    categoryProducts.length,
  );

  // Other categories for linking
  const otherCategories = SEO_CATEGORIES.filter(
    (c) => c.slug !== cat.slug,
  ).slice(0, 6);

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: "Home", url: `/${locale}` },
            { name: "Peptides", url: `/${locale}/products` },
            {
              name: region.name,
              url: `/${locale}/peptides/region/${region.slug}`,
            },
            {
              name: cat.name,
              url: `/${locale}/peptides/region/${region.slug}/${cat.slug}`,
            },
          ]),
          faqSchema(faqs),
          {
            "@context": "https://schema.org",
            "@type": "OnlineBusiness",
            name: `ORYN Peptide Labs \u2014 ${cat.name} in ${region.name}`,
            url: `${SITE_URL}/en/peptides/region/${region.slug}/${cat.slug}`,
            description: `Buy ${cat.name.toLowerCase()} peptide pens in ${region.name}. ${region.deliveryDays}-day UK delivery, >99% purity, GMP manufactured.`,
            areaServed: {
              "@type": "AdministrativeArea",
              name: region.name,
              containedInPlace: {
                "@type": "Country",
                name: "United Kingdom",
              },
            },
            brand: { "@type": "Brand", name: "ORYN" },
            priceRange: "\u00a3169 - \u00a3399",
          },
        ]}
      />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link
              href={`/${locale}`}
              className="hover:text-oryn-orange transition-colors"
            >
              HOME
            </Link>
            <span className="text-oryn-orange">/</span>
            <Link
              href={`/${locale}/products`}
              className="hover:text-oryn-orange transition-colors"
            >
              PRODUCTS
            </Link>
            <span className="text-oryn-orange">/</span>
            <Link
              href={`/${locale}/peptides/region/${region.slug}`}
              className="hover:text-oryn-orange transition-colors"
            >
              {region.name.toUpperCase()}
            </Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">
              {cat.name.toUpperCase()}
            </span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                {cat.name.toUpperCase()} \u2014 {region.name.toUpperCase()}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {cat.name} Peptides
              <br />
              in {region.name}
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl mb-8">
              {cat.description} Available with{" "}
              {region.deliveryDays === "1"
                ? "next-day"
                : `${region.deliveryDays}-day`}{" "}
              delivery across {region.name}.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/products`}
                className="px-8 py-4 bg-oryn-orange text-white text-xs font-medium tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors"
              >
                SHOP ALL PEPTIDES
              </Link>
              <Link
                href={`/${locale}/peptides/region/${region.slug}`}
                className="px-8 py-4 border border-white/20 text-white text-xs font-medium tracking-[0.2em] hover:border-oryn-orange hover:text-oryn-orange transition-colors"
              >
                ALL PEPTIDES IN {region.name.toUpperCase()}
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="border-b border-oryn-grey/20">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: `${region.deliveryDays}-Day Delivery`,
                sub: `Across ${region.name}`,
              },
              { label: ">99% Purity", sub: "HPLC Verified" },
              {
                label: `${categoryProducts.length} Products`,
                sub: cat.name,
              },
              { label: "GMP Certified", sub: "European Facility" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-sm font-bold">{item.label}</p>
                <p className="text-[10px] text-oryn-black/40 font-mono tracking-[0.1em] mt-1">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Category Description + Benefits */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {cat.name} Research in {region.name}
              </h2>
              <p className="text-sm text-oryn-black/60 font-plex leading-relaxed mb-4">
                {cat.description}
              </p>
              <p className="text-sm text-oryn-black/60 font-plex leading-relaxed">
                ORYN delivers all {categoryProducts.length}{" "}
                {cat.name.toLowerCase()} peptide products across {region.name},
                supporting researchers with the highest standards of purity,
                precision dosing, and reliable supply. Available with{" "}
                {region.deliveryDays === "1"
                  ? "next-day"
                  : `${region.deliveryDays}-day`}{" "}
                delivery to {cities.length} cities.
              </p>
            </div>
            <div className="bg-oryn-orange/5 border border-oryn-orange/10 p-8">
              <h3 className="text-lg font-bold mb-4">
                {cat.name} Benefits
              </h3>
              <ul className="space-y-3">
                {cat.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-sm text-oryn-black/70 font-plex"
                  >
                    <span className="text-oryn-orange font-bold mt-0.5">
                      +
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Category Products Grid */}
        <section className="bg-oryn-cream py-16 border-t border-oryn-orange/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                {cat.name.toUpperCase()} PRODUCTS
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {cat.name} Peptide Pens in {region.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/${locale}/peptides/region/${region.slug}/${p.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                >
                  <div className="relative bg-oryn-cream/30 p-8 flex items-center justify-center min-h-[200px]">
                    <Image
                      src={productImages.bySlug[p.slug] || p.image}
                      alt={`ORYN ${p.name} \u2014 ${cat.name} in ${region.name}`}
                      width={160}
                      height={160}
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                    {p.badge && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 bg-oryn-orange text-white text-[7px] font-bold tracking-[0.15em]">
                        {p.badge.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-[8px] font-mono text-oryn-orange tracking-[0.15em] mb-1">
                      {p.categoryLabel.toUpperCase()}
                    </p>
                    <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                    <p className="text-xs text-oryn-black/50 font-plex mb-3">
                      {p.subtitle} \u2014 {p.dosage}
                    </p>
                    <p className="text-xs text-oryn-black/40 font-plex line-clamp-2 mb-4">
                      {p.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-oryn-orange">
                        {currency}
                        {p.price}
                      </span>
                      <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">
                        {region.deliveryDays}-DAY DELIVERY
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cities in region */}
        <section className="py-16 border-t border-oryn-grey/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                CITIES IN {region.name.toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {cat.name} Peptide Delivery to {cities.length} Cities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${locale}/peptides/${city.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all p-5 group"
                >
                  <h3 className="text-sm font-bold mb-1 group-hover:text-oryn-orange transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-xs text-oryn-black/40 font-plex mb-2">
                    {city.region}
                  </p>
                  <span className="text-[10px] font-mono text-oryn-orange tracking-[0.1em]">
                    {city.deliveryDays}-DAY DELIVERY
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8">
            {cat.name} Peptides in {region.name} \u2014 FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
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

        {/* Other Categories */}
        <section className="bg-oryn-cream py-16 border-t border-oryn-orange/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                MORE CATEGORIES IN {region.name.toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Explore Other Peptide Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherCategories.map((c) => {
                const cProducts = getProductsForCategory(c);
                return (
                  <Link
                    key={c.slug}
                    href={`/${locale}/peptides/region/${region.slug}/${c.slug}`}
                    className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all p-6 group"
                  >
                    <h3 className="text-lg font-bold mb-2 group-hover:text-oryn-orange transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-xs text-oryn-black/50 font-plex line-clamp-2 mb-3">
                      {c.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-oryn-orange tracking-[0.1em]">
                        {cProducts.length} PRODUCTS
                      </span>
                      <span className="text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
                        {region.deliveryDays}-DAY DELIVERY
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Other Regions */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">
              {cat.name} Peptides in Other Regions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherRegions.map((r) => {
                const rCities = r.cities
                  .map((s) => getCityBySlug(s)?.name)
                  .filter(Boolean);
                return (
                  <Link
                    key={r.slug}
                    href={`/${locale}/peptides/region/${r.slug}/${cat.slug}`}
                    className="p-6 border border-white/10 hover:border-oryn-orange/50 transition-colors group"
                  >
                    <h3 className="text-lg font-bold group-hover:text-oryn-orange transition-colors">
                      {cat.name} in {r.name}
                    </h3>
                    <p className="text-xs text-white/40 font-plex mt-1 mb-3">
                      {rCities.join(", ")}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-oryn-orange tracking-[0.1em]">
                        {r.deliveryDays}-DAY DELIVERY
                      </span>
                      <span className="text-[10px] font-mono text-white/30 tracking-[0.1em]">
                        {r.cities.length} CITIES
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {cat.name} Peptides in {region.name}
            </h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              {categoryProducts.length} premium {cat.name.toLowerCase()} peptide
              pens with{" "}
              {region.deliveryDays === "1"
                ? "next-day"
                : `${region.deliveryDays}-day`}{" "}
              delivery across {region.name}. GMP manufactured, &gt;99% purity
              guaranteed.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
              >
                SHOP ALL PEPTIDES
              </Link>
              <Link
                href={`/${locale}/peptides/region/${region.slug}`}
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/40 text-white font-medium text-xs tracking-[0.2em] hover:bg-white/10 transition-colors"
              >
                ALL PEPTIDES IN {region.name.toUpperCase()}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
