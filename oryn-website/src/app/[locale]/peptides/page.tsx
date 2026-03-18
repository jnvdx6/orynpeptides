import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { UK_CITIES } from "@/data/uk-cities";
import { products, productImages } from "@/data/products";
import { breadcrumbSchema, faqSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
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

  const title = "Buy Peptides UK | Next-Day Delivery to 35+ Cities | ORYN Peptide Labs";
  const description = "Buy research-grade peptide pens with next-day UK delivery. BPC-157, Tirzepatide, GHK-Cu, NAD+ & more. >99% purity, GMP manufactured. Delivery to London, Manchester, Birmingham, Edinburgh & 30+ UK cities.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/peptides`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Buy Peptides UK — ORYN Next-Day Delivery",
      description: "Research-grade peptide pens delivered across 35+ UK cities. >99% purity.",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/peptides`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/peptides`])
        ),
        "x-default": `${SITE_URL}/en/peptides`,
      },
    },
  };
}

const ukDeliveryFaqs = [
  {
    question: "How fast is peptide delivery in the UK?",
    answer: "ORYN offers next-day delivery to most major UK cities including London, Manchester, Birmingham, and Edinburgh. Standard delivery takes 1-2 business days across mainland UK, with 2-3 day delivery to Scotland, Wales, and Northern Ireland.",
  },
  {
    question: "Is it legal to buy peptides in the UK?",
    answer: "Yes, research peptides are legal to purchase in the UK for research purposes. They are not controlled substances under the Misuse of Drugs Act. ORYN products are sold strictly for in-vitro research use only.",
  },
  {
    question: "How are peptides shipped?",
    answer: "ORYN peptides are shipped in temperature-controlled packaging to maintain stability. Each order includes cold chain handling where required, discreet packaging, and full tracking. Orders placed before 2pm ship same day.",
  },
  {
    question: "Do you deliver to my city?",
    answer: "ORYN delivers to all UK postcodes. We offer next-day delivery to major cities and 1-3 day delivery across the rest of the UK, including Scotland, Wales, and Northern Ireland.",
  },
  {
    question: "Is shipping free?",
    answer: "ORYN offers free shipping on all orders over €150. Standard shipping is available on smaller orders. All orders include full tracking and temperature-controlled packaging.",
  },
];

const featuredProducts = products.filter((p) =>
  ["bpc-157", "tirzepatide-pen", "ghk-cu", "nad-plus", "tb-500", "cjc-1295"].includes(p.slug)
);

export default async function PeptidesUKPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const currency = "€";

  const regions = {
    "London & South East": UK_CITIES.filter((c) => ["london", "brighton", "reading", "southampton", "oxford", "cambridge", "milton-keynes", "ipswich", "canterbury"].includes(c.slug)),
    "Midlands & East": UK_CITIES.filter((c) => ["birmingham", "nottingham", "leicester", "coventry", "derby", "stoke-on-trent", "norwich"].includes(c.slug)),
    "North England": UK_CITIES.filter((c) => ["manchester", "leeds", "liverpool", "sheffield", "newcastle", "york", "hull"].includes(c.slug)),
    "Scotland": UK_CITIES.filter((c) => ["edinburgh", "glasgow", "aberdeen", "dundee"].includes(c.slug)),
    "Wales & South West": UK_CITIES.filter((c) => ["cardiff", "bristol", "swansea", "bath", "exeter", "plymouth", "bournemouth", "cheltenham"].includes(c.slug)),
    "Northern Ireland": UK_CITIES.filter((c) => ["belfast"].includes(c.slug)),
  };

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.ukPeptideDelivery, url: `/${locale}/peptides` },
          ]),
          faqSchema(ukDeliveryFaqs),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "ORYN UK Peptide Delivery",
            description: "Next-day UK delivery of research-grade peptide pens to 35+ cities",
            provider: {
              "@type": "Organization",
              name: "ORYN Peptide Labs",
            },
            areaServed: {
              "@type": "Country",
              name: "United Kingdom",
            },
            serviceType: "Peptide Delivery",
          },
        ]}
      />

      <div className="pt-[calc(1rem+4px)]">
        {/* Hero */}
        <section className="bg-oryn-gradient py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-molecular-grid-orange opacity-20" />
          <div className="absolute -right-20 -top-20 w-[500px] h-[500px] border border-white/5" />

          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <nav className="flex items-center gap-2 text-[10px] font-mono text-white/30 tracking-[0.1em] mb-8">
              <Link href={`/${locale}`} className="hover:text-white/60 transition-colors">HOME</Link>
              <span className="text-white/50">/</span>
              <span className="text-white/60">UK PEPTIDE DELIVERY</span>
            </nav>

            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-white/40" />
              <span className="text-xs font-mono text-white/70 tracking-widest">
                NEXT-DAY UK DELIVERY
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Buy Peptides
              <span className="block">Across the UK</span>
            </h1>
            <p className="text-white/70 font-plex max-w-2xl text-lg leading-relaxed">
              Research-grade peptide pens delivered to 35+ UK cities. Next-day delivery to London, Manchester, Birmingham & Edinburgh. GMP manufactured, {">"}99% purity, pre-mixed & ready to use.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {[
                "NEXT-DAY DELIVERY",
                ">99% PURITY",
                "GMP MANUFACTURED",
                "FREE SHIPPING OVER €150",
              ].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/10">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[9px] font-mono text-white/70 tracking-[0.1em]">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-oryn-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-[2px] bg-oryn-orange/40" />
                <span className="text-xs font-mono text-oryn-orange tracking-widest">OUR RANGE</span>
                <div className="w-8 h-[2px] bg-oryn-orange/40" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Research-Grade Peptide Pens
              </h2>
              <p className="text-sm text-oryn-black/50 font-plex mt-3 max-w-xl mx-auto">
                Pre-mixed, ready-to-use peptide pen systems. No reconstitution needed. Available for next-day UK delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/products/${product.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                >
                  <div className="bg-oryn-cream/50 p-8 flex items-center justify-center min-h-[180px]">
                    <Image
                      src={productImages.bySlug[product.slug] || product.image}
                      alt={`ORYN ${product.name} Peptide Pen`}
                      width={140}
                      height={140}
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-1 group-hover:text-oryn-orange transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-oryn-black/40 font-plex mb-2">{product.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-oryn-orange">{currency}{product.price}</span>
                      <span className="text-[9px] font-mono text-oryn-black/30">{product.dosage}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-2 text-xs font-bold text-oryn-orange tracking-[0.15em] hover:underline underline-offset-4"
              >
                VIEW ALL 10 PEPTIDES
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* UK Delivery Map */}
        <section className="py-20 bg-oryn-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-[2px] bg-oryn-orange/40" />
                <span className="text-xs font-mono text-oryn-orange tracking-widest">COVERAGE</span>
                <div className="w-8 h-[2px] bg-oryn-orange/40" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Delivery to <span className="text-oryn-orange">35+ UK Cities</span>
              </h2>
              <p className="text-sm text-oryn-black/50 font-plex mt-3 max-w-xl mx-auto">
                Next-day and express delivery available across the United Kingdom. Temperature-controlled packaging ensures peptide integrity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(regions).map(([region, cities]) => (
                <div key={region} className="bg-white p-6 border border-oryn-orange/10">
                  <h3 className="text-sm font-bold text-oryn-orange mb-4">{region}</h3>
                  <div className="space-y-2">
                    {cities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/${locale}/peptides/${city.slug}`}
                        className="flex items-center justify-between group"
                      >
                        <span className="text-xs text-oryn-black/60 group-hover:text-oryn-orange transition-colors font-plex">
                          {city.name}
                        </span>
                        <span className="text-[9px] font-mono text-oryn-black/30">
                          {city.deliveryDays}-DAY
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-oryn-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">
                UK Delivery <span className="text-oryn-orange">FAQ</span>
              </h2>
            </div>

            <div className="space-y-4">
              {ukDeliveryFaqs.map((faq, i) => (
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
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-oryn-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-molecular-grid-orange opacity-20" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Order Today, <span className="opacity-60">Delivered Tomorrow</span>
            </h2>
            <p className="text-white/60 font-plex mb-8 max-w-lg mx-auto">
              Research-grade peptide pens with next-day UK delivery. Free shipping on orders over €150.
            </p>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-oryn-orange font-bold text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
            >
              SHOP ALL PEPTIDES
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
