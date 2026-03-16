import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products, getProductBySlug, productImages } from "@/data/products";
import { UK_COUNTIES, getCountyBySlug, COUNTY_SLUGS } from "@/data/uk-counties";
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

// ─── On-demand generation (ISR) to keep build output under Vercel limits ──
export const dynamicParams = true;
export async function generateStaticParams() {
  return [];
}

// ─── Metadata ─────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; county: string; slug: string }>;
}): Promise<Metadata> {
  const { county: countySlug, slug } = await params;
  const county = getCountyBySlug(countySlug);
  if (!county) return {};

  const product = getProductBySlug(slug);
  const category = getCategoryBySlug(slug);
  if (!product && !category) return {};

  let title: string;
  let description: string;

  if (product) {
    title = `Buy ${product.name} in ${county.name} | ORYN Peptide Pen — ${county.deliveryDays}-Day Delivery`;
    description = `Order ORYN ${product.name} ${product.dosage} peptide pen in ${county.name}, ${county.region}. ${county.deliveryDays}-day delivery, >99% purity, pre-mixed & ready to use. From €${product.price}.`;
  } else {
    const cat = category!;
    title = `${cat.name} Peptides in ${county.name} | ORYN — ${county.deliveryDays}-Day Delivery`;
    description = `Buy research-grade ${cat.name.toLowerCase()} peptide pens in ${county.name}, ${county.region}. ${county.deliveryDays}-day delivery. ${cat.productSlugs.length} products, >99% purity, GMP manufactured.`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/en/peptides/county/${countySlug}/${slug}`,
      type: "website",
      images: [
        { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 },
      ],
    },
    alternates: {
      canonical: `${SITE_URL}/en/peptides/county/${countySlug}/${slug}`,
    },
  };
}

// ─── Product FAQs ─────────────────────────────────────────────────
function productFaqs(
  productName: string,
  countyName: string,
  deliveryDays: string,
  dosage: string
) {
  return [
    {
      question: `Can I buy ${productName} in ${countyName}?`,
      answer: `Yes. ORYN delivers ${productName} across ${countyName} with ${deliveryDays}-day express tracked delivery. Our ${productName} peptide pen comes pre-mixed and ready to use, manufactured to >99% purity in GMP-certified facilities.`,
    },
    {
      question: `How fast is ${productName} delivery to ${countyName}?`,
      answer: `ORYN ships same-day for orders before 3 PM. ${productName} delivery to ${countyName} takes ${deliveryDays} business days via express tracked shipping with temperature-controlled packaging.`,
    },
    {
      question: `What dosage is the ${productName} pen?`,
      answer: `The ORYN ${productName} pen contains ${dosage} of pre-mixed peptide, providing approximately 30 days of supply. Each pen exceeds 99% purity as verified by HPLC and mass spectrometry.`,
    },
    {
      question: `Is ${productName} legal to buy in ${countyName}?`,
      answer: `Research peptides including ${productName} are legal to purchase across the UK. ORYN products are sold strictly for research purposes only.`,
    },
  ];
}

// ─── Category FAQs ────────────────────────────────────────────────
function categoryFaqs(
  catName: string,
  countyName: string,
  deliveryDays: string,
  productCount: number
) {
  return [
    {
      question: `What ${catName.toLowerCase()} peptides are available in ${countyName}?`,
      answer: `ORYN offers ${productCount} ${catName.toLowerCase()} peptide products available for delivery across ${countyName}. All come in pre-mixed pen format, >99% purity, with ${deliveryDays}-day tracked delivery.`,
    },
    {
      question: `How fast can I get ${catName.toLowerCase()} peptides delivered to ${countyName}?`,
      answer: `Orders placed before 3 PM ship same-day. Delivery to ${countyName} takes ${deliveryDays} business days via express tracked shipping with temperature-controlled packaging.`,
    },
    {
      question: `Why choose ORYN for ${catName.toLowerCase()} peptides in ${countyName}?`,
      answer: `ORYN offers >99% purity verified by HPLC, GMP manufacturing, pre-mixed pen delivery (no reconstitution needed), and ${deliveryDays}-day express delivery across ${countyName}. Every batch comes with a Certificate of Analysis.`,
    },
  ];
}

// ─── Page ─────────────────────────────────────────────────────────
export default async function CountySlugPage({
  params,
}: {
  params: Promise<{ locale: string; county: string; slug: string }>;
}) {
  const { county: countySlug, slug, locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const county = getCountyBySlug(countySlug);
  if (!county) notFound();

  const product = getProductBySlug(slug);
  const category = getCategoryBySlug(slug);
  if (!product && !category) notFound();

  const currency = "€";

  // ─── Product Page ───────────────────────────────────────────
  if (product) {
    const faqs = productFaqs(
      product.name,
      county.name,
      county.deliveryDays,
      product.dosage
    );

    return (
      <>
        <MultiJsonLd
          items={[
            breadcrumbSchema([
              { name: dict.breadcrumbs.home, url: `/${locale}` },
              { name: county.name, url: `/${locale}/peptides/county/${county.slug}` },
              { name: product.name, url: `/${locale}/peptides/county/${county.slug}/${product.slug}` },
            ]),
            productSchema(product, locale),
            faqSchema(faqs),
          ]}
        />

        <div className="pt-[calc(1rem+4px)]">
          {/* Breadcrumb */}
          <div className="max-w-7xl mx-auto px-6 py-4">
            <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
              <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
              <span className="text-oryn-orange">/</span>
              <Link href={`/${locale}/peptides/county/${county.slug}`} className="hover:text-oryn-orange transition-colors">
                {county.name.toUpperCase()}
              </Link>
              <span className="text-oryn-orange">/</span>
              <span className="text-oryn-orange">{product.name.toUpperCase()}</span>
            </nav>
          </div>

          {/* Hero */}
          <section className="bg-oryn-black text-white py-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-oryn-orange" />
                  <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                    {product.categoryLabel.toUpperCase()} — {county.name.toUpperCase()}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                  {product.name}
                  <br />
                  <span className="text-oryn-orange">in {county.name}</span>
                </h1>
                <p className="text-lg text-white/60 font-plex max-w-xl mb-6">
                  {product.subtitle}. {county.deliveryDays === "1" ? "Next-day" : `${county.deliveryDays}-day`} delivery
                  across {county.name}, {county.region}. Pre-mixed, {product.dosage}, &gt;99% purity.
                </p>
                <div className="flex items-center gap-6 mb-8">
                  <span className="text-3xl font-bold text-oryn-orange">
                    {currency}{product.price}
                  </span>
                  <span className="text-xs text-white/40 font-mono">{product.dosage} · 30-day supply</span>
                </div>
                <Link
                  href={`/${locale}/products/${product.slug}`}
                  className="px-8 py-4 bg-oryn-orange text-white text-xs font-medium tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors"
                >
                  VIEW PRODUCT
                </Link>
              </div>
              <div className="flex justify-center">
                <Image
                  src={productImages.bySlug[product.slug] || product.image}
                  alt={`ORYN ${product.name} — delivery to ${county.name}`}
                  width={300}
                  height={300}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </section>

          {/* Trust Signals */}
          <section className="border-b border-oryn-grey/20">
            <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: `${county.deliveryDays}-Day Delivery`, sub: county.name },
                { label: ">99% Purity", sub: "HPLC Verified" },
                { label: product.dosage, sub: "30-Day Supply" },
                { label: "Pre-Mixed", sub: "Ready to Use" },
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

          {/* FAQ */}
          <section className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold mb-8">
              {product.name} in {county.name} — FAQ
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

          {/* Other Products */}
          <section className="bg-oryn-cream py-16 border-t border-oryn-orange/10">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl font-bold mb-8">
                More Peptides Available in {county.name}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {products
                  .filter((p) => p.slug !== product.slug)
                  .map((p) => (
                    <Link
                      key={p.slug}
                      href={`/${locale}/peptides/county/${county.slug}/${p.slug}`}
                      className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group p-4"
                    >
                      <Image
                        src={productImages.bySlug[p.slug] || p.image}
                        alt={p.name}
                        width={80}
                        height={80}
                        className="object-contain mx-auto mb-2"
                      />
                      <h3 className="text-xs font-bold text-center group-hover:text-oryn-orange transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-center text-sm font-bold text-oryn-orange mt-1">
                        {currency}{p.price}
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
                Order {product.name} in {county.name}
              </h2>
              <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
                {county.deliveryDays === "1" ? "Next-day" : `${county.deliveryDays}-day`} tracked delivery.
                Pre-mixed, &gt;99% purity, GMP manufactured.
              </p>
              <Link
                href={`/${locale}/products/${product.slug}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
              >
                VIEW {product.name.toUpperCase()}
              </Link>
            </div>
          </section>
        </div>
      </>
    );
  }

  // ─── Category Page ──────────────────────────────────────────
  const cat = category!;
  const catProducts = getProductsForCategory(cat);
  const faqs = categoryFaqs(
    cat.name,
    county.name,
    county.deliveryDays,
    catProducts.length
  );

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: county.name, url: `/${locale}/peptides/county/${county.slug}` },
            { name: cat.name, url: `/${locale}/peptides/county/${county.slug}/${cat.slug}` },
          ]),
          faqSchema(faqs),
        ]}
      />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <Link href={`/${locale}/peptides/county/${county.slug}`} className="hover:text-oryn-orange transition-colors">
              {county.name.toUpperCase()}
            </Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">{cat.name.toUpperCase()}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                {cat.name.toUpperCase()} — {county.name.toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              {cat.name} Peptides
              <br />
              <span className="text-oryn-orange">in {county.name}</span>
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl mb-8">
              {catProducts.length} research-grade {cat.name.toLowerCase()} peptide pens
              available for {county.deliveryDays === "1" ? "next-day" : `${county.deliveryDays}-day`} delivery
              across {county.name}, {county.region}. All products &gt;99% purity, GMP manufactured.
            </p>
            <Link
              href={`/${locale}/peptides-for/${cat.slug}`}
              className="px-8 py-4 bg-oryn-orange text-white text-xs font-medium tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors"
            >
              VIEW ALL {cat.name.toUpperCase()} PEPTIDES
            </Link>
          </div>
        </section>

        {/* Products */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">
              {cat.name} Products Available in {county.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {catProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/${locale}/peptides/county/${county.slug}/${product.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                >
                  <div className="relative bg-oryn-cream/50 p-8 flex items-center justify-center min-h-[200px]">
                    <Image
                      src={productImages.bySlug[product.slug] || product.image}
                      alt={`${product.name} — ${county.name}`}
                      width={160}
                      height={160}
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-1 group-hover:text-oryn-orange transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-oryn-black/50 font-plex mb-3">
                      {product.subtitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-oryn-orange">
                        {currency}{product.price}
                      </span>
                      <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">
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
        <section className="bg-oryn-cream py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">
              {cat.name} Peptides in {county.name} — FAQ
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white border border-oryn-grey/20 open:border-oryn-orange/20">
                  <summary className="flex items-center justify-between p-5 cursor-pointer">
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
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {cat.name} Peptides — {county.name}
            </h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              {county.deliveryDays === "1" ? "Next-day" : `${county.deliveryDays}-day`} tracked delivery.
              {catProducts.length} products, &gt;99% purity, pre-mixed pen format.
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
