import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCityBySlug, CITY_SLUGS } from "@/data/uk-cities";
import { products, getProductBySlug, productImages } from "@/data/products";
import { getProductDetail } from "@/data/product-details";
import {
  productCityMetadata,
  productSchema,
  faqSchema,
  breadcrumbSchema,
  SITE_URL,
} from "@/lib/seo";
import { JsonLd, MultiJsonLd } from "@/components/seo/JsonLd";

export async function generateStaticParams() {
  const params = [];
  // City × product pages are UK-focused — EN only
  for (const citySlug of CITY_SLUGS) {
    for (const product of products) {
      params.push({ locale: "en", city: citySlug, product: product.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string; product: string }>;
}): Promise<Metadata> {
  const { city: citySlug, product: productSlug, locale } = await params;
  const city = getCityBySlug(citySlug);
  const product = getProductBySlug(productSlug);
  if (!city || !product) return {};

  const { title, description } = productCityMetadata(product, city);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/peptides/${citySlug}/${productSlug}`,
      type: "website",
      images: [{ url: `${SITE_URL}${product.image}`, width: 800, height: 800 }],
    },
    alternates: {
      canonical: `${SITE_URL}/en/peptides/${citySlug}/${productSlug}`,
    },
  };
}

export default async function ProductCityPage({
  params,
}: {
  params: Promise<{ locale: string; city: string; product: string }>;
}) {
  const { city: citySlug, product: productSlug, locale } = await params;
  const city = getCityBySlug(citySlug);
  const product = getProductBySlug(productSlug);
  if (!city || !product) notFound();

  const detail = getProductDetail(product.slug);
  const currency = locale === "es" ? "€" : "£";
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const faqs = [
    {
      question: `Where can I buy ${product.name} in ${city.name}?`,
      answer: `ORYN delivers ${product.name} peptide pens directly to ${city.name} with ${city.deliveryDays}-day tracked delivery. Order online at orynpeptides.com and receive your pre-mixed, research-grade pen at your door.`,
    },
    {
      question: `How much does ${product.name} cost in the UK?`,
      answer: `ORYN ${product.name} is priced at ${currency}${product.price} per pen, which contains a 30-day supply of ${product.dosage} in a pre-mixed, ready-to-use pen system. Free UK delivery on orders over £150.`,
    },
    {
      question: `Is ${product.name} legal in ${city.name}?`,
      answer: `Yes, ${product.name} is legal to purchase for research purposes in ${city.name} and across the UK. ORYN products are sold strictly for research use only.`,
    },
    {
      question: `What purity is ORYN ${product.name}?`,
      answer: `ORYN ${product.name} exceeds 99% purity, verified by independent HPLC analysis. Each batch comes with a Certificate of Analysis from a third-party laboratory.`,
    },
    ...(detail?.faq?.slice(0, 2) || []),
  ];

  return (
    <>
      <MultiJsonLd
        items={[
          productSchema(product, locale),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: `/${locale}` },
            { name: "Peptides", url: `/${locale}/products` },
            { name: city.name, url: `/${locale}/peptides/${city.slug}` },
            { name: product.name, url: `/${locale}/peptides/${city.slug}/${product.slug}` },
          ]),
        ]}
      />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <Link href={`/${locale}/peptides/${city.slug}`} className="hover:text-oryn-orange transition-colors">{city.name.toUpperCase()}</Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">{product.name.toUpperCase()}</span>
          </nav>
        </div>

        {/* Product Hero */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Image */}
            <div className="bg-oryn-cream overflow-hidden relative flex items-center justify-center p-16 min-h-[400px]">
              <Image
                src={productImages.bySlug[product.slug] || product.image}
                alt={`Buy ORYN ${product.name} in ${city.name}`}
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

            {/* Info */}
            <div>
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-oryn-orange" />
                <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                  {product.categoryLabel.toUpperCase()} — {city.name.toUpperCase()}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mt-1 mb-2 tracking-tight">
                Buy {product.name} in {city.name}
              </h1>
              <p className="text-sm text-oryn-black/40 font-plex mb-4">
                {product.subtitle} · {city.deliveryDays}-Day Delivery to {city.name}
              </p>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-oryn-orange">
                  {currency}{product.price}
                </span>
                <span className="text-xs text-oryn-black/30 font-plex font-normal">per pen</span>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  `${city.deliveryDays}-Day to ${city.name}`,
                  ">99% Purity",
                  "COA Included",
                  "Pre-Mixed",
                ].map((trust) => (
                  <span key={trust} className="flex items-center gap-1.5 px-3 py-1.5 bg-oryn-orange/5 border border-oryn-orange/10 text-[9px] font-mono text-oryn-black/50 tracking-[0.05em]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {trust}
                  </span>
                ))}
              </div>

              {/* Specs */}
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

              {/* Benefits */}
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

              {/* CTA */}
              <Link
                href={`/${locale}/products/${product.slug}`}
                className="w-full py-4 bg-oryn-orange text-white font-medium text-xs tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors flex items-center justify-center gap-3"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                VIEW PRODUCT & ADD TO CART — {currency}{product.price}
              </Link>
            </div>
          </div>
        </section>

        {/* Specifications Table */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-xl font-bold mb-4">{product.name} Specifications</h2>
          <div className="bg-oryn-orange/5 divide-y divide-oryn-orange/10 border border-oryn-orange/10">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between px-5 py-3">
                <span className="text-[9px] text-oryn-black/30 font-mono tracking-[0.1em]">{key.toUpperCase()}</span>
                <span className="text-xs font-medium">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Science snippet */}
        {detail?.science && (
          <section className="max-w-7xl mx-auto px-6 py-8">
            <h2 className="text-xl font-bold mb-4">{product.name} — Science & Research</h2>
            <p className="text-sm text-oryn-black/60 font-plex leading-relaxed mb-4">
              {detail.science.mechanism}
            </p>
            <div className="flex flex-wrap gap-2">
              {detail.science.researchAreas.map((area) => (
                <span key={area} className="px-3 py-1 bg-oryn-cream text-[9px] font-mono text-oryn-black/50 tracking-[0.05em]">
                  {area}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-xl font-bold mb-6">{product.name} in {city.name} — FAQ</h2>
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
            <h2 className="text-xl font-bold mb-6">Related Peptides in {city.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/${locale}/peptides/${city.slug}/${p.slug}`}
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

        {/* Other Cities CTA */}
        <section className="bg-oryn-black text-white py-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Order {product.name} for Delivery to {city.name}
            </h2>
            <p className="text-sm text-white/50 font-plex mb-6">
              {city.deliveryDays === "1" ? "Next-day" : `${city.deliveryDays}-day`} tracked delivery. Pre-mixed &amp; ready to use. &gt;99% purity guaranteed.
            </p>
            <Link
              href={`/${locale}/products/${product.slug}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-oryn-orange text-white font-medium text-xs tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors"
            >
              ORDER {product.name.toUpperCase()} — {currency}{product.price}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
