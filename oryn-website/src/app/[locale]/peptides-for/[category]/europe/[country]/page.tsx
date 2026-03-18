import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { EUROPEAN_COUNTRIES, type EuropeanCountry } from "@/data/european-countries";
import { productImages } from "@/data/products";
import {
  SEO_CATEGORIES,
  getCategoryBySlug,
  getProductsForCategory,
  faqSchema,
  breadcrumbSchema,
  SITE_URL,
  geoCategoryCountryMeta,
  pageAlternates,
  type SEOCategory,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import type { Product } from "@/data/products";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export const dynamicParams = true;
export async function generateStaticParams() {
  return [];
}

function getCountryBySlug(slug: string): EuropeanCountry | undefined {
  return EUROPEAN_COUNTRIES.find((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; country: string }>;
}): Promise<Metadata> {
  const { category: catSlug, country: countrySlug, locale } = await params;
  const category = getCategoryBySlug(catSlug);
  const country = getCountryBySlug(countrySlug);
  if (!category || !country) return {};

  const products = getProductsForCategory(category);
  const productNames = products.map((p) => p.name).join(", ");
  const { title, description } = geoCategoryCountryMeta(locale, category, country, productNames);
  const pagePath = `/peptides-for/${catSlug}/europe/${countrySlug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}${pagePath}`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    alternates: pageAlternates(pagePath, locale),
  };
}

function generateCountryCategoryFaqs(
  category: SEOCategory,
  country: EuropeanCountry,
  products: Product[]
): { question: string; answer: string }[] {
  const productNames = products.map((p) => p.name).join(", ");
  const cityNames = country.cities.slice(0, 4).map((c) => c.name).join(", ");

  return [
    {
      question: `Where can I buy ${category.name.toLowerCase()} peptides in ${country.name}?`,
      answer: `ORYN delivers research-grade ${category.name.toLowerCase()} peptide pens across ${country.name}, including ${cityNames}. Available products include ${productNames}. All orders are GMP manufactured in South Korea and ship with ${country.deliveryDays}-day tracked delivery.`,
    },
    {
      question: `How quickly can I get ${category.name.toLowerCase()} peptides delivered to ${country.name}?`,
      answer: `ORYN offers ${country.deliveryDays}-day tracked delivery to ${country.name}. As an EU-based supplier, orders to ${country.name} are intra-community transfers with no customs delays, no import duties, and no seizure risk. All peptides arrive in temperature-controlled packaging.`,
    },
    {
      question: `What ${category.name.toLowerCase()} peptides does ORYN offer for ${country.name} delivery?`,
      answer: `ORYN currently offers ${products.length} ${category.name.toLowerCase()} peptide${products.length > 1 ? "s" : ""} for delivery to ${country.name}: ${products.map((p) => `${p.name} (${p.dosage})`).join(", ")}. All products exceed 99% purity, are GMP manufactured, and come pre-mixed in precision pen systems.`,
    },
    {
      question: `Are ${category.name.toLowerCase()} peptides legal in ${country.name}?`,
      answer: `Research peptides are legal to purchase in ${country.name} for scientific and laboratory use. ORYN products are sold strictly for research purposes only, in compliance with EU regulations. Each product ships with full documentation and Certificate of Analysis.`,
    },
  ];
}

export default async function CategoryCountryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; country: string }>;
}) {
  const { category: catSlug, country: countrySlug, locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const category = getCategoryBySlug(catSlug);
  const country = getCountryBySlug(countrySlug);
  if (!category || !country) notFound();

  const categoryProducts = getProductsForCategory(category);
  const faqs = generateCountryCategoryFaqs(category, country, categoryProducts);
  const otherCategories = SEO_CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 5);
  const otherCountries = EUROPEAN_COUNTRIES.filter((c) => c.slug !== country.slug).slice(0, 6);
  const currency = country.currencySymbol;
  const pageUrl = `/${locale}/peptides-for/${catSlug}/europe/${countrySlug}`;

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.products, url: `/${locale}/products` },
            { name: category.name, url: `/${locale}/peptides-for/${category.slug}` },
            { name: country.name, url: pageUrl },
          ]),
          faqSchema(faqs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${category.name} Peptides in ${country.name} — ORYN`,
            description: `Research-grade ${category.name.toLowerCase()} peptide pens available for delivery to ${country.name}.`,
            numberOfItems: categoryProducts.length,
            itemListElement: categoryProducts.map((product, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/${locale}/products/${product.slug}`,
              name: `ORYN ${product.name}`,
              image: `${SITE_URL}${productImages.bySlug[product.slug] || product.image}`,
            })),
          },
        ]}
      />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">
              HOME
            </Link>
            <span className="text-oryn-orange">/</span>
            <Link href={`/${locale}/products`} className="hover:text-oryn-orange transition-colors">
              PRODUCTS
            </Link>
            <span className="text-oryn-orange">/</span>
            <Link
              href={`/${locale}/peptides-for/${category.slug}`}
              className="hover:text-oryn-orange transition-colors"
            >
              {category.name.toUpperCase()}
            </Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">{country.name.toUpperCase()}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                {category.name.toUpperCase()} &mdash; {country.name.toUpperCase()}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {category.name} Peptides
              <br />
              in {country.name}
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl mb-4">
              Research-grade {category.name.toLowerCase()} peptide pens delivered across{" "}
              {country.name}. {country.deliveryDays}-day tracked EU delivery, no customs delays.
              All products exceed 99% purity and come pre-mixed, ready to use.
            </p>
            <p className="text-sm text-white/40 font-plex max-w-2xl mb-8">
              {categoryProducts.length} product{categoryProducts.length !== 1 ? "s" : ""} available:{" "}
              {categoryProducts.map((p) => p.name).join(", ")}.{" "}
              From {currency}
              {Math.min(...categoryProducts.map((p) => p.price))}.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/products`}
                className="px-8 py-4 bg-oryn-orange text-white text-xs font-medium tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors"
              >
                SHOP {category.name.toUpperCase()} PEPTIDES
              </Link>
              <Link
                href={`/${locale}/peptides/europe/${country.slug}`}
                className="px-8 py-4 border border-white/20 text-white text-xs font-medium tracking-[0.2em] hover:border-oryn-orange hover:text-oryn-orange transition-colors"
              >
                ALL PEPTIDES IN {country.name.toUpperCase()}
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="border-b border-oryn-grey/20">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: `${country.deliveryDays}-Day Delivery`, sub: `To ${country.name}` },
              { label: ">99% Purity", sub: "HPLC Verified" },
              { label: "No Customs", sub: "EU-Based Shipping" },
              { label: "Pre-Mixed Pens", sub: "Ready to Use" },
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

        {/* Introduction */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {category.name} Peptide Research in {country.name}
              </h2>
              <p className="text-sm text-oryn-black/60 font-plex leading-relaxed mb-6">
                {country.name} is {country.description} For researchers across {country.name} seeking
                high-quality {category.name.toLowerCase()} peptide compounds, ORYN provides a trusted
                EU-based source with {country.deliveryDays}-day delivery nationwide. Our{" "}
                {category.name.toLowerCase()} range is manufactured to &gt;99% purity in GMP-certified
                facilities in South Korea, with every batch independently verified via HPLC and mass spectrometry.
              </p>
              <h3 className="text-lg font-bold mb-3">
                Why {country.name} Researchers Choose ORYN
              </h3>
              <p className="text-sm text-oryn-black/60 font-plex leading-relaxed">
                Researchers in {country.name} choose ORYN for {category.name.toLowerCase()} peptides
                because of our commitment to pharmaceutical-grade quality and reliable EU delivery.
                Every ORYN peptide pen arrives pre-mixed and precision-dosed, eliminating the
                reconstitution step that introduces contamination risk and dosing inconsistency. As an
                EU-based supplier, deliveries to {country.name} are intra-community transfers &mdash;
                no customs inspection, no import duties, no seizure risk.
              </p>
            </div>

            {/* Delivery Info Card */}
            <div className="bg-oryn-orange/5 border border-oryn-orange/10 p-8">
              <h3 className="text-lg font-bold mb-4">
                Delivery to {country.name}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0 mt-0.5">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-bold">Same-Day Dispatch</p>
                    <p className="text-xs text-oryn-black/50 font-plex">Orders before 3 PM ship the same day</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0 mt-0.5">
                    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <div>
                    <p className="text-sm font-bold">{country.deliveryDays}-Day Delivery</p>
                    <p className="text-xs text-oryn-black/50 font-plex">Tracked EU shipping across {country.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0 mt-0.5">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="text-sm font-bold">No Customs Delays</p>
                    <p className="text-xs text-oryn-black/50 font-plex">EU intra-community transfer — zero duties</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0 mt-0.5">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div>
                    <p className="text-sm font-bold">Temperature Controlled</p>
                    <p className="text-xs text-oryn-black/50 font-plex">Insulated packaging maintains cold chain</p>
                  </div>
                </div>
              </div>
              {country.cities.length > 0 && (
                <div className="mt-6 pt-4 border-t border-oryn-orange/10">
                  <p className="text-[10px] font-mono text-oryn-black/30 tracking-[0.1em] mb-2">
                    DELIVERING TO CITIES INCLUDING
                  </p>
                  <p className="text-xs text-oryn-black/50 font-plex">
                    {country.cities.map((c) => c.name).join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Category Benefits */}
        <section className="border-t border-oryn-grey/10">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-xl font-bold mb-2">
              {category.name} Research Benefits
            </h2>
            <p className="text-xs text-oryn-black/40 font-plex mb-6">
              Key areas of study for {category.name.toLowerCase()} peptides available in {country.name}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 p-4 bg-oryn-orange/5 border border-oryn-orange/10"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2" className="shrink-0 mt-0.5">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-oryn-black/70 font-plex">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="bg-oryn-cream py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                {category.name.toUpperCase()} &mdash; AVAILABLE IN {country.name.toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {category.name} Peptide Pens for {country.name}
            </h2>
            <div
              className={`grid grid-cols-1 ${categoryProducts.length === 1 ? "max-w-xl" : "md:grid-cols-2"} gap-8`}
            >
              {categoryProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/products/${product.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group flex flex-col md:flex-row"
                >
                  <div className="bg-oryn-cream/50 p-8 flex items-center justify-center min-w-[200px] min-h-[200px]">
                    <Image
                      src={productImages.bySlug[product.slug] || product.image}
                      alt={`ORYN ${product.name} — ${category.name} peptide pen in ${country.name}`}
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
                      <span className="text-2xl font-bold text-oryn-orange">
                        {currency}{product.price}
                      </span>
                      <span className="text-[9px] font-mono text-oryn-black/30">
                        {product.dosage} &middot; {product.volume}
                      </span>
                    </div>
                    <p className="text-[10px] text-oryn-black/30 font-plex mt-2">
                      {country.deliveryDays}-day delivery to {country.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* City Delivery Grid */}
        {country.cities.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-xl font-bold mb-2">
              {category.name} Peptide Delivery Across {country.name}
            </h2>
            <p className="text-xs text-oryn-black/40 font-plex mb-6">
              ORYN delivers to all major cities in {country.name}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {country.cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${locale}/peptides-for/${category.slug}/europe/${country.slug}/${city.slug}`}
                  className="p-4 border border-oryn-grey/20 hover:border-oryn-orange/30 transition-colors"
                >
                  <p className="text-sm font-bold">{city.name}</p>
                  <p className="text-[10px] text-oryn-black/40 font-mono tracking-[0.1em]">
                    {city.deliveryDays}-DAY DELIVERY
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="bg-oryn-cream/50 border-t border-oryn-grey/10">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold mb-2">
              {category.name} Peptides in {country.name} &mdash; FAQ
            </h2>
            <p className="text-xs text-oryn-black/40 font-plex mb-8">
              Common questions about buying {category.name.toLowerCase()} peptides in {country.name}
            </p>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group border border-oryn-grey/20 bg-white open:border-oryn-orange/20"
                >
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
          </div>
        </section>

        {/* Cross-links: Other Categories */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-xl font-bold mb-2">
              Other Peptide Categories in {country.name}
            </h2>
            <p className="text-[10px] text-white/30 font-mono tracking-[0.1em] mb-6">
              EXPLORE MORE RESEARCH AREAS WITH DELIVERY TO {country.name.toUpperCase()}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {otherCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${locale}/peptides-for/${cat.slug}/europe/${country.slug}`}
                  className="p-5 border border-white/10 hover:border-oryn-orange/50 transition-colors"
                >
                  <p className="text-sm font-bold">{cat.name}</p>
                  <p className="text-[10px] text-white/40 font-mono mt-1 tracking-[0.1em]">
                    {cat.productSlugs.length} PRODUCT{cat.productSlugs.length !== 1 ? "S" : ""} &middot;{" "}
                    {country.deliveryDays}-DAY DELIVERY
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-links: Same Category in Other Countries */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold mb-2">
            {category.name} Peptides in Other European Countries
          </h2>
          <p className="text-xs text-oryn-black/40 font-plex mb-6">
            ORYN delivers {category.name.toLowerCase()} peptides across Europe
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {otherCountries.map((c) => (
              <Link
                key={c.slug}
                href={`/${locale}/peptides-for/${category.slug}/europe/${c.slug}`}
                className="p-4 border border-oryn-grey/20 hover:border-oryn-orange/30 transition-colors"
              >
                <p className="text-sm font-bold">{c.name}</p>
                <p className="text-[10px] text-oryn-black/40 font-mono tracking-[0.1em]">
                  {c.deliveryDays}-DAY DELIVERY
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href={`/${locale}/peptides-for/${category.slug}`}
              className="text-xs text-oryn-orange font-mono tracking-[0.15em] hover:underline"
            >
              VIEW ALL {category.name.toUpperCase()} PRODUCTS &rarr;
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Order {category.name} Peptides in {country.name}
            </h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              Premium pre-mixed {category.name.toLowerCase()} peptide pens with{" "}
              {country.deliveryDays}-day delivery to {country.name}. GMP manufactured,
              &gt;99% purity guaranteed. From {currency}
              {Math.min(...categoryProducts.map((p) => p.price))}.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
              >
                SHOP ALL PEPTIDES
              </Link>
              <Link
                href={`/${locale}/peptides/europe/${country.slug}`}
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-medium text-xs tracking-[0.2em] hover:border-white transition-colors"
              >
                ALL PEPTIDES IN {country.name.toUpperCase()}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
