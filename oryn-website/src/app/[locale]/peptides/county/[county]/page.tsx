import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  UK_COUNTIES,
  getCountyBySlug,
  COUNTY_SLUGS,
} from "@/data/uk-counties";
import { products, productImages } from "@/data/products";
import {
  SEO_CATEGORIES,
  faqSchema,
  breadcrumbSchema,
  SITE_URL,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

// ─── On-demand generation (ISR) to keep build output under Vercel limits ──
export const dynamicParams = true;
export async function generateStaticParams() {
  return [];
}

// ─── Metadata ─────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; county: string }>;
}): Promise<Metadata> {
  const { county: countySlug, locale } = await params;
  const county = getCountyBySlug(countySlug);
  if (!county) return {};

  const title = `Buy Peptides in ${county.name} | ORYN — ${county.deliveryDays}-Day UK Delivery`;
  const description = `Order research-grade peptide pens in ${county.name}, ${county.region}. ${county.deliveryDays}-day delivery to ${county.majorCities.slice(0, 3).join(", ")} & across the county. >99% purity, GMP manufactured.`;

  return {
    title,
    description,
    robots: locale === "en" ? undefined : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/peptides/county/${countySlug}`,
      type: "website",
      images: [
        { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 },
      ],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/peptides/county/${countySlug}`,
    },
  };
}

// ─── FAQs ─────────────────────────────────────────────────────────
function countyFaqs(
  countyName: string,
  region: string,
  deliveryDays: string,
  cities: string[]
) {
  return [
    {
      question: `Can I buy peptides in ${countyName}?`,
      answer: `Yes. ORYN delivers research-grade peptide pens across ${countyName}, ${region}. We offer ${deliveryDays}-day delivery to ${cities.slice(0, 3).join(", ")} and all surrounding areas. 10 peptide products at >99% purity, all pre-mixed and ready to use.`,
    },
    {
      question: `How fast is peptide delivery to ${countyName}?`,
      answer: `ORYN ships same-day for orders placed before 3 PM. Delivery across ${countyName} typically takes ${deliveryDays} business days via express tracked shipping with temperature-controlled packaging.`,
    },
    {
      question: `What peptides can I order in ${countyName}?`,
      answer: `All 10 ORYN peptide products are available across ${countyName}: BPC-157, TB-500, CJC-1295, Ipamorelin, Tirzepatide, GHK-Cu, Glutathione, NAD+, MediT Pen, and NovaDose NAD+. All come pre-mixed in precision pen delivery systems.`,
    },
    {
      question: `Are research peptides legal in ${countyName}?`,
      answer: `Research peptides are legal to purchase across the UK, including ${countyName}. ORYN products are sold strictly for research purposes only and are not intended for self-administration.`,
    },
    {
      question: `Is delivery to ${countyName} temperature-controlled?`,
      answer: `Yes. All ORYN shipments to ${countyName} use insulated packaging with ice packs to maintain cold chain integrity. Our ${deliveryDays}-day express service ensures peptides arrive in optimal condition.`,
    },
  ];
}

// ─── Page ─────────────────────────────────────────────────────────
export default async function CountyPage({
  params,
}: {
  params: Promise<{ locale: string; county: string }>;
}) {
  const { county: countySlug, locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const county = getCountyBySlug(countySlug);
  if (!county) notFound();

  const faqs = countyFaqs(
    county.name,
    county.region,
    county.deliveryDays,
    county.majorCities
  );
  const otherCounties = UK_COUNTIES.filter(
    (c) => c.slug !== county.slug && c.region === county.region
  ).slice(0, 6);
  const currency = "€";

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.peptides, url: `/${locale}/products` },
            {
              name: county.name,
              url: `/${locale}/peptides/county/${county.slug}`,
            },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "OnlineBusiness",
            name: `ORYN Peptide Labs — ${county.name}`,
            url: `${SITE_URL}/${locale}/peptides/county/${county.slug}`,
            description: `Buy research-grade peptide pens in ${county.name}. ${county.deliveryDays}-day UK delivery, >99% purity, GMP manufactured.`,
            areaServed: {
              "@type": "AdministrativeArea",
              name: county.name,
              containedInPlace: {
                "@type": "Country",
                name: "United Kingdom",
              },
            },
            brand: { "@type": "Brand", name: "ORYN" },
            priceRange: "€99 - €299",
          },
          faqSchema(faqs),
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
            <span className="text-oryn-orange">
              {county.name.toUpperCase()}
            </span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                PEPTIDE DELIVERY — {county.name.toUpperCase()}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Buy Peptide Pens
              <br />
              in {county.name}
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl mb-8">
              Research-grade peptide pen systems delivered across {county.name},{" "}
              {county.region}.{" "}
              {county.deliveryDays === "1"
                ? "Next-day delivery on orders before 3 PM."
                : `${county.deliveryDays}-day delivery to ${county.majorCities.join(", ")} and surrounding areas.`}{" "}
              All products exceed 99% purity and come pre-mixed, ready to use.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/products`}
                className="px-8 py-4 bg-oryn-orange text-white text-xs font-medium tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors"
              >
                SHOP ALL PEPTIDES
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="border-b border-oryn-grey/20">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: `${county.deliveryDays}-Day Delivery`,
                sub: `Across ${county.name}`,
              },
              { label: ">99% Purity", sub: "HPLC Verified" },
              { label: "GMP Manufactured", sub: "European Facility" },
              { label: "10 Products", sub: "Full Range Available" },
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

        {/* County Info */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Peptide Research in {county.name}
              </h2>
              <p className="text-sm text-oryn-black/60 font-plex leading-relaxed mb-4">
                ORYN delivers pharmaceutical-grade peptide pen systems across{" "}
                {county.name}, {county.region}. Whether you&apos;re based in{" "}
                {county.majorCities.join(", ")} or elsewhere in the county, our
                full range of 10 peptide products is available with{" "}
                {county.deliveryDays === "1"
                  ? "next-day"
                  : `${county.deliveryDays}-day`}{" "}
                tracked delivery.
              </p>
              <p className="text-sm text-oryn-black/60 font-plex leading-relaxed">
                With a population of {county.population}, {county.name} is home
                to a growing peptide research community. ORYN supports
                researchers with the highest standards of purity, precision
                dosing, and reliable supply — all manufactured in GMP-certified
                European facilities.
              </p>
            </div>
            <div className="bg-oryn-orange/5 border border-oryn-orange/10 p-8">
              <h3 className="text-lg font-bold mb-4">
                Delivery to {county.name}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0 mt-0.5">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-bold">Same-Day Dispatch</p>
                    <p className="text-xs text-oryn-black/50 font-plex">Orders before 3 PM ship same day</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0 mt-0.5">
                    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <div>
                    <p className="text-sm font-bold">{county.deliveryDays}-Day Delivery</p>
                    <p className="text-xs text-oryn-black/50 font-plex">Express tracked to {county.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0 mt-0.5">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="text-sm font-bold">Temperature Controlled</p>
                    <p className="text-xs text-oryn-black/50 font-plex">Cold chain maintained to your door</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-oryn-orange/10">
                <p className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em] mb-2">
                  MAJOR TOWNS & CITIES
                </p>
                <p className="text-xs text-oryn-black/50 font-plex">
                  {county.majorCities.join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="bg-oryn-cream py-16 border-t border-oryn-orange/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                AVAILABLE IN {county.name.toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              All Peptide Pens
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/peptides/county/${county.slug}/${product.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                >
                  <div className="relative bg-oryn-cream/50 p-6 flex items-center justify-center min-h-[160px]">
                    <Image
                      src={productImages.bySlug[product.slug] || product.image}
                      alt={`ORYN ${product.name} — ${county.name}`}
                      width={120}
                      height={120}
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                    {product.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-oryn-orange text-white text-[7px] font-bold tracking-[0.15em]">
                        {product.badge.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-[8px] font-mono text-oryn-orange tracking-[0.15em] mb-1">
                      {product.categoryLabel.toUpperCase()}
                    </p>
                    <h3 className="text-sm font-bold mb-1">{product.name}</h3>
                    <p className="text-[10px] text-oryn-black/40 font-plex mb-2">
                      {product.subtitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-oryn-orange">
                        {currency}
                        {product.price}
                      </span>
                      <span className="text-[8px] font-mono text-oryn-black/30 tracking-[0.1em]">
                        {product.dosage}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                BROWSE BY CATEGORY
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Peptides by Research Focus in {county.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {SEO_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${locale}/peptides/county/${county.slug}/${cat.slug}`}
                  className="p-4 border border-oryn-grey/15 hover:border-oryn-orange/30 transition-all group"
                >
                  <h3 className="text-sm font-bold group-hover:text-oryn-orange transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-oryn-black/40 font-plex mt-1">
                    {cat.productSlugs.length} products
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8">
            Frequently Asked Questions — {county.name}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-oryn-grey/20 open:border-oryn-orange/20"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-oryn-cream/50 transition-colors">
                  <h3 className="text-sm font-bold pr-4">{faq.question}</h3>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-oryn-orange group-open:rotate-45 transition-transform">
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

        {/* Other Counties in Same Region */}
        {otherCounties.length > 0 && (
          <section className="bg-oryn-black text-white py-16">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl font-bold mb-8">
                Other Counties in {county.region}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherCounties.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${locale}/peptides/county/${c.slug}`}
                    className="p-6 border border-white/10 hover:border-oryn-orange/50 transition-colors group"
                  >
                    <h3 className="text-lg font-bold group-hover:text-oryn-orange transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-xs text-white/40 font-plex mt-1 mb-3">
                      {c.majorCities.join(", ")}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-oryn-orange tracking-[0.1em]">
                        {c.deliveryDays}-DAY DELIVERY
                      </span>
                      <span className="text-[10px] font-mono text-white/30 tracking-[0.1em]">
                        POP. {c.population}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Content */}
        <RelatedContent categorySlug="recovery" locale={locale} />

        {/* CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Order in {county.name}?
            </h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              Premium pre-mixed peptide pens with{" "}
              {county.deliveryDays === "1"
                ? "next-day"
                : `${county.deliveryDays}-day`}{" "}
              delivery across {county.name}. GMP manufactured, &gt;99% purity
              guaranteed.
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
