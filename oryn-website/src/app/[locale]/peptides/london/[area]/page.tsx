import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products, productImages } from "@/data/products";
import {
  LONDON_AREAS,
  getLondonAreaBySlug,
  LONDON_AREA_SLUGS,
  LONDON_ZONES,
} from "@/data/london-areas";
import { faqSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

// ─── On-demand generation (ISR) to keep build output under Vercel limits ──
export const dynamicParams = true;
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; area: string }>;
}): Promise<Metadata> {
  const { area: areaSlug, locale } = await params;
  const area = getLondonAreaBySlug(areaSlug);
  if (!area) return {};

  const title = `Buy Peptide Pens in ${area.name}, London | ORYN — Same-Day Delivery`;
  const description = `Order research-grade peptide pens in ${area.name}, ${area.borough}. Same-day dispatch, next-day delivery to ${area.postcode}. BPC-157, Tirzepatide, NAD+ & more. >99% purity, GMP manufactured.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/peptides/london/${areaSlug}`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/peptides/london/${areaSlug}`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/peptides/london/${areaSlug}`])
        ),
        "x-default": `${SITE_URL}/en/peptides/london/${areaSlug}`,
      },
    },
  };
}

function areaFaqs(area: { name: string; postcode: string; borough: string }) {
  return [
    {
      question: `Can I buy peptides in ${area.name}?`,
      answer: `Yes. ORYN delivers research-grade peptide pens to ${area.name} (${area.postcode}), ${area.borough} with next-day delivery. All products are >99% purity, GMP manufactured, and come pre-mixed and ready to use.`,
    },
    {
      question: `How fast is delivery to ${area.name}, London?`,
      answer: `ORYN offers same-day dispatch for orders placed before 3 PM, with next-day delivery to ${area.name} and all ${area.postcode} postcodes. All orders ship in discreet, temperature-controlled packaging.`,
    },
    {
      question: `What peptide pens can I order in ${area.name}?`,
      answer: `ORYN offers 10 peptide pen products for delivery to ${area.name}: BPC-157, TB-500, CJC-1295, Ipamorelin, Tirzepatide, GHK-Cu, Glutathione, NAD+, MediT Pen, and NovaDose NAD+. All available for next-day London delivery.`,
    },
    {
      question: `Is there free shipping to ${area.name}?`,
      answer: `Orders over €150 qualify for free shipping to ${area.name} and all London postcodes. Standard tracked delivery is available on all orders.`,
    },
    {
      question: `Are peptides legal to buy in ${area.name}?`,
      answer: `Research peptides are legal to purchase in the UK, including ${area.name}, London. ORYN products are sold strictly for in-vitro research and laboratory use.`,
    },
  ];
}

export default async function LondonAreaPage({
  params,
}: {
  params: Promise<{ locale: string; area: string }>;
}) {
  const { area: areaSlug, locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const area = getLondonAreaBySlug(areaSlug);
  if (!area) notFound();

  const faqs = areaFaqs(area);
  const currency = "€";

  const zoneLabel =
    area.zone === "central" ? "Central" :
    area.zone === "north" ? "North" :
    area.zone === "east" ? "East" :
    area.zone === "south" ? "South" : "West";

  const nearbyLondonAreas = LONDON_AREAS.filter(
    (a) => a.slug !== area.slug && a.zone === area.zone
  ).slice(0, 4);

  const otherZoneAreas = LONDON_AREAS.filter(
    (a) => a.slug !== area.slug && a.zone !== area.zone
  ).slice(0, 4);

  return (
    <>
      <MultiJsonLd
        items={[
          {
            "@context": "https://schema.org",
            "@type": "OnlineBusiness",
            name: `ORYN Peptide Labs — ${area.name}, London`,
            url: `${SITE_URL}/${locale}/peptides/london/${area.slug}`,
            description: `Buy research-grade peptide pens in ${area.name}, London. Next-day delivery to ${area.postcode}, >99% purity, GMP manufactured.`,
            areaServed: {
              "@type": "Place",
              name: `${area.name}, London`,
              containedInPlace: {
                "@type": "City",
                name: "London",
              },
            },
            brand: { "@type": "Brand", name: "ORYN" },
            priceRange: "€99 - €299",
          },
          faqSchema(faqs),
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.peptides, url: `/${locale}/products` },
            { name: dict.breadcrumbs.london, url: `/${locale}/peptides/london` },
            { name: area.name, url: `/${locale}/peptides/london/${area.slug}` },
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
            <span className="text-oryn-orange">{area.name.toUpperCase()}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                {zoneLabel.toUpperCase()} LONDON · {area.postcode}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Buy Peptide Pens<br />in {area.name}
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl mb-8">
              Research-grade peptide pen systems delivered to {area.name}, {area.borough}.
              Same-day dispatch with next-day delivery to all {area.postcode} postcodes.
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
                href={`/${locale}/peptides/london`}
                className="px-8 py-4 border border-white/20 text-white text-xs font-medium tracking-[0.2em] hover:border-oryn-orange hover:text-oryn-orange transition-colors"
              >
                ALL LONDON AREAS
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

        {/* About the area */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Peptide Delivery in {area.name}</h2>
              <p className="text-sm text-oryn-black/60 font-plex leading-relaxed mb-4">
                {area.name} is {area.description}. ORYN is proud to deliver premium peptide pen systems to researchers and professionals in {area.name} and the surrounding {area.borough} area.
              </p>
              {area.landmarks.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold mb-2 text-oryn-black/80">Notable Institutions & Landmarks:</p>
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
              <p className="text-sm text-oryn-black/60 font-plex leading-relaxed">
                Whether you&apos;re researching tissue repair with BPC-157, metabolic function with Tirzepatide, or cellular aging with NAD+, ORYN delivers to {area.name} with next-day speed, discretion, and quality you can trust.
              </p>
            </div>
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
              {area.nearbyAreas.length > 0 && (
                <div className="mt-6 pt-4 border-t border-oryn-orange/10">
                  <p className="text-[10px] font-mono text-oryn-black/30 tracking-[0.1em] mb-2">ALSO SERVING</p>
                  <p className="text-xs text-oryn-black/50 font-plex">
                    {area.nearbyAreas.join(", ")}
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
                AVAILABLE IN {area.name.toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">All Peptide Pens</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/peptides/london/${area.slug}/${product.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                >
                  <div className="relative bg-oryn-cream/50 p-8 flex items-center justify-center min-h-[200px]">
                    <Image
                      src={productImages.bySlug[product.slug] || product.image}
                      alt={`ORYN ${product.name} — ${area.name}, London`}
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
                      <span className="text-xl font-bold text-oryn-orange">{currency}{product.price}</span>
                      <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">{product.dosage} · {product.volume}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions — {area.name}</h2>
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

        {/* Nearby Areas */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-xl font-bold mb-2">More {zoneLabel} London Areas</h2>
            <p className="text-xs text-white/40 font-plex mb-8">Also delivering to nearby neighbourhoods</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {nearbyLondonAreas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/${locale}/peptides/london/${a.slug}`}
                  className="p-4 border border-white/10 hover:border-oryn-orange/50 transition-colors"
                >
                  <p className="text-sm font-bold">{a.name}</p>
                  <p className="text-[10px] text-white/40 font-mono tracking-[0.1em]">{a.postcode}</p>
                </Link>
              ))}
            </div>
            {otherZoneAreas.length > 0 && (
              <>
                <h3 className="text-sm font-bold mb-4 text-white/60">Other London Areas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {otherZoneAreas.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/${locale}/peptides/london/${a.slug}`}
                      className="p-4 border border-white/5 hover:border-oryn-orange/30 transition-colors"
                    >
                      <p className="text-sm font-bold text-white/80">{a.name}</p>
                      <p className="text-[10px] text-white/30 font-mono tracking-[0.1em]">{a.postcode}</p>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Order in {area.name}?
            </h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              Premium pre-mixed peptide pens with next-day delivery to {area.name}, {area.postcode}. GMP manufactured, &gt;99% purity guaranteed.
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
