import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { UK_CITIES, getCityBySlug, CITY_SLUGS } from "@/data/uk-cities";
import { LONDON_ZONES } from "@/data/london-areas";
import { products } from "@/data/products";
import { productImages } from "@/data/products";
import {
  cityMetadata,
  localBusinessSchema,
  faqSchema,
  breadcrumbSchema,
  SITE_URL,
} from "@/lib/seo";
import { JsonLd, MultiJsonLd } from "@/components/seo/JsonLd";
import { RelatedContent } from "@/components/seo/RelatedContent";

export async function generateStaticParams() {
  // UK city pages — EN only
  return CITY_SLUGS.map((slug) => ({ locale: "en", city: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}): Promise<Metadata> {
  const { city: citySlug, locale } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const { title, description } = cityMetadata(city);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/peptides/${citySlug}`,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/en/peptides/${citySlug}`,
    },
  };
}

const cityFaqs = (cityName: string, deliveryDays: string) => [
  {
    question: `Can I buy peptides in ${cityName}?`,
    answer: `Yes. ORYN delivers research-grade peptide pens to ${cityName} with ${deliveryDays}-day delivery. All products are >99% purity, GMP manufactured, and come pre-mixed and ready to use.`,
  },
  {
    question: `How fast is delivery to ${cityName}?`,
    answer: `ORYN ships same-day for orders placed before 3 PM. Delivery to ${cityName} typically takes ${deliveryDays} business day${deliveryDays === "1" ? "" : "s"}.`,
  },
  {
    question: `What peptide pens can I order in ${cityName}?`,
    answer: `ORYN offers 10 peptide pen products available for delivery to ${cityName}: BPC-157, TB-500, CJC-1295, Ipamorelin, Tirzepatide, GHK-Cu, Glutathione, NAD+, MediT Pen, and NovaDose NAD+.`,
  },
  {
    question: `Are peptides legal in ${cityName}?`,
    answer: `Research peptides are legal to purchase in the UK, including ${cityName}. ORYN products are sold strictly for research purposes only and are not intended for self-administration.`,
  },
  {
    question: `Do I need a prescription to buy peptides in ${cityName}?`,
    answer: `No prescription is needed for research peptides. ORYN sells peptide pen systems for research use only. All products ship discreetly with full documentation.`,
  },
];

export default async function CityPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { city: citySlug, locale } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const faqs = cityFaqs(city.name, city.deliveryDays);
  const otherCities = UK_CITIES.filter((c) => c.slug !== city.slug).slice(0, 8);
  const currency = locale === "es" ? "€" : "£";

  return (
    <>
      <MultiJsonLd
        items={[
          localBusinessSchema(city),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: `/${locale}` },
            { name: "Peptides", url: `/${locale}/products` },
            { name: city.name, url: `/${locale}/peptides/${city.slug}` },
          ]),
        ]}
      />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <Link href={`/${locale}/products`} className="hover:text-oryn-orange transition-colors">PRODUCTS</Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">{city.name.toUpperCase()}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                PEPTIDE DELIVERY — {city.name.toUpperCase()}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Buy Peptide Pens<br />in {city.name}
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl mb-8">
              Research-grade peptide pen systems delivered to {city.name}, {city.region}.
              {city.deliveryDays === "1"
                ? " Next-day delivery on orders before 3 PM."
                : ` ${city.deliveryDays}-day delivery across ${city.region}.`}{" "}
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
              { label: `${city.deliveryDays}-Day Delivery`, sub: `To ${city.name}` },
              { label: ">99% Purity", sub: "HPLC Verified" },
              { label: "GMP Manufactured", sub: "European Facility" },
              { label: "Pre-Mixed Pens", sub: "Ready to Use" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-sm font-bold">{item.label}</p>
                <p className="text-[10px] text-oryn-black/40 font-mono tracking-[0.1em] mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About the city + delivery */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Peptide Research in {city.name}</h2>
              <p className="text-sm text-oryn-black/60 font-plex leading-relaxed mb-4">
                {city.name} is {city.description}. ORYN is proud to serve the {city.name} research community with pharmaceutical-grade peptide pen systems that meet the highest standards of purity and precision.
              </p>
              {city.universities && city.universities.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold mb-2 text-oryn-black/80">Notable Research Institutions:</p>
                  <ul className="space-y-1">
                    {city.universities.map((uni) => (
                      <li key={uni} className="text-xs text-oryn-black/50 font-plex flex items-center gap-2">
                        <span className="w-1 h-1 bg-oryn-orange rounded-full shrink-0" />
                        {uni}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-sm text-oryn-black/60 font-plex leading-relaxed">
                Whether you&apos;re researching tissue repair with BPC-157, metabolic function with Tirzepatide, or cellular aging with NAD+, ORYN delivers to {city.name} with speed, discretion, and quality you can trust.
              </p>
            </div>
            <div className="bg-oryn-orange/5 border border-oryn-orange/10 p-8">
              <h3 className="text-lg font-bold mb-4">Delivery to {city.name}</h3>
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
                    <p className="text-sm font-bold">{city.deliveryDays}-Day Delivery</p>
                    <p className="text-xs text-oryn-black/50 font-plex">Express tracked shipping to {city.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0 mt-0.5">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div>
                    <p className="text-sm font-bold">Discreet Packaging</p>
                    <p className="text-xs text-oryn-black/50 font-plex">Plain packaging with no product description visible</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0 mt-0.5">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="text-sm font-bold">Temperature Controlled</p>
                    <p className="text-xs text-oryn-black/50 font-plex">Insulated packaging maintains cold chain integrity</p>
                  </div>
                </div>
              </div>
              {city.nearbyAreas.length > 0 && (
                <div className="mt-6 pt-4 border-t border-oryn-orange/10">
                  <p className="text-[10px] font-mono text-oryn-black/30 tracking-[0.1em] mb-2">ALSO SERVING</p>
                  <p className="text-xs text-oryn-black/50 font-plex">
                    {city.nearbyAreas.join(", ")}
                  </p>
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
                AVAILABLE IN {city.name.toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">All Peptide Pens</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/peptides/${city.slug}/${product.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                >
                  <div className="relative bg-oryn-cream/50 p-8 flex items-center justify-center min-h-[200px]">
                    <Image
                      src={productImages.bySlug[product.slug] || product.image}
                      alt={`ORYN ${product.name} — ${city.name}`}
                      width={160}
                      height={160}
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 bg-oryn-orange text-white text-[8px] font-bold tracking-[0.15em]">
                        {product.badge.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-[9px] font-mono text-oryn-orange tracking-[0.15em] mb-1">
                      {product.categoryLabel.toUpperCase()}
                    </p>
                    <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                    <p className="text-xs text-oryn-black/40 font-plex mb-3">{product.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-oryn-orange">
                        {currency}{product.price}
                      </span>
                      <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">
                        {product.dosage} · {product.volume}
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
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions — {city.name}</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-oryn-grey/20 open:border-oryn-orange/20">
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
                  <p className="text-xs text-oryn-black/60 font-plex leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Category Quick Links */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Browse by Research Area</h2>
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

        {/* Other Cities */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold mb-6">Also Delivering To</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/${locale}/peptides/${c.slug}`}
                className="p-4 border border-oryn-grey/20 hover:border-oryn-orange/30 transition-colors"
              >
                <p className="text-sm font-bold">{c.name}</p>
                <p className="text-[10px] text-oryn-black/40 font-mono tracking-[0.1em]">
                  {c.deliveryDays}-DAY DELIVERY
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* London Boroughs — only shown on London page */}
        {city.slug === "london" && (
          <section className="bg-oryn-cream py-16 border-t border-oryn-orange/10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="inline-flex items-center gap-3 mb-2">
                <div className="w-6 h-px bg-oryn-orange" />
                <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                  LONDON NEIGHBOURHOODS
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-8">Peptide Delivery Across London</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {(Object.entries(LONDON_ZONES) as [string, typeof LONDON_ZONES.central][]).map(([zone, areas]) => (
                  <div key={zone}>
                    <h3 className="text-[10px] font-mono font-bold text-oryn-orange tracking-[0.2em] mb-3">
                      {zone.toUpperCase()} LONDON
                    </h3>
                    <ul className="space-y-1.5">
                      {areas.map((a) => (
                        <li key={a.slug}>
                          <Link
                            href={`/${locale}/peptides/london/${a.slug}`}
                            className="text-xs text-oryn-black/50 hover:text-oryn-orange transition-colors font-plex"
                          >
                            {a.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
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
              Ready to Order in {city.name}?
            </h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              Premium pre-mixed peptide pens with {city.deliveryDays === "1" ? "next-day" : `${city.deliveryDays}-day`} delivery to {city.name}. GMP manufactured, &gt;99% purity guaranteed.
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
