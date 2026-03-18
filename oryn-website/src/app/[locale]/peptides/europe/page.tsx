import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { EUROPEAN_COUNTRIES } from "@/data/european-countries";
import { products, productImages } from "@/data/products";
import { SITE_URL, breadcrumbSchema } from "@/lib/seo";
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
  const title = "Buy Peptides in Europe | ORYN — Fast EU Delivery";
  const description =
    "Order research-grade peptide pens across Europe. Fast tracked delivery to 30 countries, >99% purity, GMP manufactured. BPC-157, Tirzepatide, NAD+ & more.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/peptides/europe`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/peptides/europe`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/peptides/europe`])
        ),
        "x-default": `${SITE_URL}/en/peptides/europe`,
      },
    },
  };
}

export default async function EuropeHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const totalCities = EUROPEAN_COUNTRIES.reduce(
    (sum, c) => sum + c.cities.length,
    0
  );

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.peptides, url: `/${locale}/products` },
            { name: dict.breadcrumbs.europe, url: `/${locale}/peptides/europe` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "ORYN Peptides — European Delivery",
            description: `Research-grade peptide pens delivered across ${EUROPEAN_COUNTRIES.length} European countries.`,
            numberOfItems: EUROPEAN_COUNTRIES.length,
            itemListElement: EUROPEAN_COUNTRIES.map((country, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/${locale}/peptides/europe/${country.slug}`,
              name: `Peptides in ${country.name}`,
            })),
          },
        ]}
      />
      <PageTracker pageName="europe_hub" />

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
            <span className="text-oryn-orange">EUROPE</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                EUROPEAN DELIVERY
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Buy Peptides
              <br />
              <span className="text-oryn-orange">Across Europe</span>
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl mb-4">
              ORYN delivers research-grade peptide pens to {totalCities}+ cities
              across {EUROPEAN_COUNTRIES.length} European countries. Fast
              tracked shipping, temperature-controlled packaging, &gt;99%
              purity guaranteed.
            </p>
            <p className="text-sm text-white/40 font-plex max-w-2xl mb-8">
              {products.length} products available. GMP manufactured in European
              facilities. Every batch independently verified via HPLC and mass
              spectrometry.
            </p>
            <Link
              href={`/${locale}/products`}
              className="px-8 py-4 bg-oryn-orange text-white text-xs font-medium tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors"
            >
              SHOP ALL PEPTIDES
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-oryn-grey/20">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: `${EUROPEAN_COUNTRIES.length} Countries`,
                sub: "Pan-European Coverage",
              },
              { label: `${totalCities}+ Cities`, sub: "Direct Delivery" },
              { label: ">99% Purity", sub: "HPLC Verified" },
              { label: "3-7 Day Delivery", sub: "Tracked & Insured" },
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

        {/* Countries Grid */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-oryn-orange" />
            <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
              SELECT YOUR COUNTRY
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Peptide Delivery Across Europe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EUROPEAN_COUNTRIES.map((country) => (
              <Link
                key={country.slug}
                href={`/${locale}/peptides/europe/${country.slug}`}
                className="group border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold group-hover:text-oryn-orange transition-colors">
                      {country.name}
                    </h3>
                    <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em] bg-oryn-cream px-2 py-1">
                      {country.code}
                    </span>
                  </div>
                  <p className="text-xs text-oryn-black/50 font-plex mb-4 line-clamp-2">
                    {country.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-oryn-black/40 tracking-[0.1em]">
                      {country.cities.length} CITIES &middot;{" "}
                      {country.deliveryDays} DAYS
                    </span>
                    <span className="text-[10px] font-mono text-oryn-orange tracking-[0.1em]">
                      VIEW &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Links — Popular Cities */}
        <section className="border-t border-oryn-grey/10 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                POPULAR DESTINATIONS
              </span>
            </div>
            <h2 className="text-xl font-bold mb-6">
              Quick Links — Top European Cities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { city: "Berlin", country: "germany", code: "DE" },
                { city: "Paris", country: "france", code: "FR" },
                { city: "Madrid", country: "spain", code: "ES" },
                { city: "Amsterdam", country: "netherlands", code: "NL" },
                { city: "Milan", country: "italy", code: "IT" },
                { city: "Dublin", country: "ireland", code: "IE" },
                { city: "Stockholm", country: "sweden", code: "SE" },
                { city: "Copenhagen", country: "denmark", code: "DK" },
                { city: "Warsaw", country: "poland", code: "PL" },
                { city: "Zurich", country: "switzerland", code: "CH" },
              ].map((link) => (
                <Link
                  key={link.city}
                  href={`/${locale}/peptides/europe/${link.country}/${link.city.toLowerCase()}`}
                  className="flex items-center justify-between gap-2 px-4 py-3 border border-oryn-grey/10 hover:border-oryn-orange/30 bg-white transition-all group"
                >
                  <span className="text-sm font-bold group-hover:text-oryn-orange transition-colors">
                    {link.city}
                  </span>
                  <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em] bg-oryn-cream px-2 py-0.5">
                    {link.code}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Products Available */}
        <section className="bg-oryn-cream py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">
              Products Available for European Delivery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/${locale}/products/${product.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group p-4"
                >
                  <Image
                    src={productImages.bySlug[product.slug] || product.image}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="object-contain mx-auto mb-2"
                  />
                  <h3 className="text-xs font-bold text-center group-hover:text-oryn-orange transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-center text-sm font-bold text-oryn-orange mt-1">
                    &euro;{product.price}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Order Peptides for European Delivery
            </h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              Premium pre-mixed peptide pens shipped to{" "}
              {EUROPEAN_COUNTRIES.length} countries. GMP manufactured, &gt;99%
              purity guaranteed. Tracked, temperature-controlled delivery.
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
