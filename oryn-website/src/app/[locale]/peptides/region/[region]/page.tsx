import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { UK_REGIONS, getRegionBySlug, REGION_SLUGS } from "@/data/uk-regions";
import { getCityBySlug } from "@/data/uk-cities";
import { products, productImages } from "@/data/products";
import { faqSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";

export async function generateStaticParams() {
  return REGION_SLUGS.map((region) => ({ locale: "en", region }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; region: string }>;
}): Promise<Metadata> {
  const { region: regionSlug, locale } = await params;
  const region = getRegionBySlug(regionSlug);
  if (!region) return {};

  const title = `Buy Peptides in ${region.name} | ORYN — ${region.deliveryDays}-Day UK Delivery`;
  const description = `Order research-grade peptide pens in ${region.name}, UK. ${region.deliveryDays}-day delivery to ${region.cities.length} cities including ${region.cities.slice(0, 3).map((s) => getCityBySlug(s)?.name).filter(Boolean).join(", ")}. >99% purity, GMP manufactured.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/peptides/region/${regionSlug}`,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/en/peptides/region/${regionSlug}`,
    },
  };
}

function regionFaqs(regionName: string, deliveryDays: string, cityCount: number) {
  return [
    {
      question: `Can I buy peptides in ${regionName}?`,
      answer: `Yes. ORYN delivers research-grade peptide pens across ${regionName} with ${deliveryDays}-day delivery. We serve ${cityCount} major cities in the region, offering 10 peptide products at >99% purity, all pre-mixed and ready to use.`,
    },
    {
      question: `How fast is peptide delivery to ${regionName}?`,
      answer: `ORYN ships same-day for orders placed before 3 PM. Delivery across ${regionName} typically takes ${deliveryDays} business days via express tracked shipping with temperature-controlled packaging.`,
    },
    {
      question: `What peptides are available for delivery to ${regionName}?`,
      answer: `All 10 ORYN peptide products are available across ${regionName}: BPC-157 (healing), TB-500 (tissue repair), CJC-1295 and Ipamorelin (GH), Tirzepatide (metabolic), GHK-Cu (skin), Glutathione (antioxidant), NAD+ (anti-aging), MediT Pen (weekly tirzepatide), and NovaDose NAD+ (daily microdosing).`,
    },
    {
      question: `Are research peptides legal in ${regionName}?`,
      answer: `Research peptides are legal to purchase across the UK, including ${regionName}. ORYN products are sold strictly for research purposes only and are not intended for self-administration. No prescription is required.`,
    },
  ];
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ locale: string; region: string }>;
}) {
  const { region: regionSlug, locale } = await params;
  const region = getRegionBySlug(regionSlug);
  if (!region) notFound();

  const cities = region.cities
    .map((slug) => getCityBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => !!c);
  const faqs = regionFaqs(region.name, region.deliveryDays, cities.length);
  const otherRegions = UK_REGIONS.filter((r) => r.slug !== region.slug);
  const currency = locale === "es" ? "\u20ac" : "\u00a3";

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: "Home", url: `/${locale}` },
            { name: "Peptides", url: `/${locale}/products` },
            { name: region.name, url: `/${locale}/peptides/region/${region.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "OnlineBusiness",
            name: `ORYN Peptide Labs \u2014 ${region.name}`,
            url: `${SITE_URL}/en/peptides/region/${region.slug}`,
            description: `Buy research-grade peptide pens in ${region.name}. ${region.deliveryDays}-day UK delivery, >99% purity, GMP manufactured.`,
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
          faqSchema(faqs),
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
            <span className="text-oryn-orange">{region.name.toUpperCase()}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                PEPTIDE DELIVERY \u2014 {region.name.toUpperCase()}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Buy Peptide Pens
              <br />
              in {region.name}
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl mb-8">
              Research-grade peptide pen systems delivered across {region.name}.{" "}
              {region.deliveryDays === "1"
                ? "Next-day delivery on orders before 3 PM."
                : `${region.deliveryDays}-day delivery to ${cities.length} cities across the region.`}{" "}
              All products exceed 99% purity and come pre-mixed, ready to use.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/products`}
                className="px-8 py-4 bg-oryn-orange text-white text-xs font-medium tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors"
              >
                SHOP ALL PEPTIDES
              </Link>
              <Link
                href={`/${locale}/learn/are-peptides-legal-in-the-uk`}
                className="px-8 py-4 border border-white/20 text-white text-xs font-medium tracking-[0.2em] hover:border-oryn-orange hover:text-oryn-orange transition-colors"
              >
                LEARN MORE
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="border-b border-oryn-grey/20">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: `${region.deliveryDays}-Day Delivery`, sub: `Across ${region.name}` },
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

        {/* Region description + delivery info */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Peptide Research in {region.name}
              </h2>
              <p className="text-sm text-oryn-black/60 font-plex leading-relaxed mb-4">
                {region.description}
              </p>
              <p className="text-sm text-oryn-black/60 font-plex leading-relaxed">
                ORYN delivers pharmaceutical-grade peptide pen systems across{" "}
                {region.name}, supporting researchers with the highest standards of
                purity, precision dosing, and reliable supply. Whether you&apos;re
                studying tissue repair, metabolic function, or cellular aging, our full
                range of 10 peptide products is available with{" "}
                {region.deliveryDays === "1"
                  ? "next-day"
                  : `${region.deliveryDays}-day`}{" "}
                delivery.
              </p>
            </div>
            <div className="bg-oryn-orange/5 border border-oryn-orange/10 p-8">
              <h3 className="text-lg font-bold mb-4">
                Delivery Across {region.name}
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
        </section>

        {/* Cities in this region */}
        <section className="bg-oryn-cream py-16 border-t border-oryn-orange/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                CITIES IN {region.name.toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Peptide Delivery to {cities.length} Cities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${locale}/peptides/${city.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all p-6 group"
                >
                  <h3 className="text-lg font-bold mb-1 group-hover:text-oryn-orange transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-xs text-oryn-black/40 font-plex mb-3">
                    {city.region}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-oryn-orange tracking-[0.1em]">
                      {city.deliveryDays}-DAY DELIVERY
                    </span>
                    <span className="text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
                      POP. {city.population}
                    </span>
                  </div>
                  {city.universities && city.universities.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-oryn-grey/10">
                      <p className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em] mb-1">
                        RESEARCH INSTITUTIONS
                      </p>
                      <p className="text-xs text-oryn-black/50 font-plex line-clamp-2">
                        {city.universities.slice(0, 2).join(", ")}
                      </p>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                AVAILABLE ACROSS {region.name.toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              All Peptide Pens
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/products/${product.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                >
                  <div className="relative bg-oryn-cream/50 p-6 flex items-center justify-center min-h-[160px]">
                    <Image
                      src={productImages.bySlug[product.slug] || product.image}
                      alt={`ORYN ${product.name} \u2014 ${region.name}`}
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

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8">
            Frequently Asked Questions \u2014 {region.name}
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
              Other Regions We Deliver To
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherRegions.map((r) => {
                const rCities = r.cities
                  .map((s) => getCityBySlug(s)?.name)
                  .filter(Boolean);
                return (
                  <Link
                    key={r.slug}
                    href={`/${locale}/peptides/region/${r.slug}`}
                    className="p-6 border border-white/10 hover:border-oryn-orange/50 transition-colors group"
                  >
                    <h3 className="text-lg font-bold group-hover:text-oryn-orange transition-colors">
                      {r.name}
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
              Ready to Order in {region.name}?
            </h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              Premium pre-mixed peptide pens with{" "}
              {region.deliveryDays === "1"
                ? "next-day"
                : `${region.deliveryDays}-day`}{" "}
              delivery across {region.name}. GMP manufactured, &gt;99% purity
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
