import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products, getProductBySlug, productImages } from "@/data/products";
import { SITE_URL, breadcrumbSchema, faqSchema, productSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { bundles, BUNDLE_SLUGS, getBundleBySlug } from "@/data/bundles";
import { getLocalizedBundle } from "@/data/bundles-i18n";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { BundleAddToCart } from "@/components/bundles/BundleAddToCart";

// ─── Static Params ──────────────────────────────────────────────────

export async function generateStaticParams() {
  const params = [];
  for (const locale of locales) {
    for (const slug of BUNDLE_SLUGS) {
      params.push({ locale, slug });
    }
  }
  return params;
}

// ─── Metadata ───────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const bundle = getBundleBySlug(slug);
  if (!bundle) return {};

  const bundleProducts = bundle.productSlugs
    .map((s) => getProductBySlug(s))
    .filter(Boolean);
  const productNames = bundleProducts.map((p) => p!.name).join(" + ");
  const title = `${productNames} ${bundle.name} | ORYN Bundles UK`;
  const description = `Save ${bundle.savingsPercent}% on the ORYN ${bundle.name}. ${bundle.tagline}. ${bundleProducts.map((p) => `${p!.name} ${p!.dosage}`).join(", ")}. >99% purity, next-day UK delivery.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/bundles/${slug}`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/bundles/${slug}`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/bundles/${slug}`])
        ),
        "x-default": `${SITE_URL}/en/bundles/${slug}`,
      },
    },
  };
}

// ─── Helpers ────────────────────────────────────────────────────────

function calculateBundlePrice(
  productSlugs: string[],
  savingsPercent: number
) {
  const total = productSlugs.reduce((sum, slug) => {
    const product = getProductBySlug(slug);
    return sum + (product?.price ?? 0);
  }, 0);
  const discounted = Math.round(total * (1 - savingsPercent / 100));
  return { original: total, discounted, savings: total - discounted };
}

// ─── Page ───────────────────────────────────────────────────────────

export default async function BundlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const bundle = getBundleBySlug(slug);
  if (!bundle) notFound();

  const t = getLocalizedBundle(slug, locale as Locale);

  const bundleProducts = bundle.productSlugs
    .map((s) => getProductBySlug(s))
    .filter(Boolean)
    .map((p) => p!);

  const currencyMap: Record<string, string> = { en: "£", "pt-br": "R$" };
  const currency = currencyMap[locale] || "€";
  const { original, discounted, savings } = calculateBundlePrice(
    bundle.productSlugs,
    bundle.savingsPercent
  );

  const otherBundles = bundles.filter((b) => b.slug !== bundle.slug);

  return (
    <>
      {/* ─── JSON-LD ─────────────────────────────────────────── */}
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.bundles, url: `/${locale}/bundles/${bundle.slug}` },
            {
              name: t?.name ?? bundle.name,
              url: `/${locale}/bundles/${bundle.slug}`,
            },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `ORYN ${t?.name ?? bundle.name}`,
            description: t?.tagline ?? bundle.tagline,
            numberOfItems: bundleProducts.length,
            itemListElement: bundleProducts.map((product, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/${locale}/products/${product.slug}`,
              name: `ORYN ${product.name}`,
            })),
          },
          faqSchema(t?.faqs ?? bundle.faqs),
        ]}
      />

      <div className="pt-[calc(1rem+4px)]">
        {/* ─── Breadcrumb ──────────────────────────────────── */}
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
              {(t?.name ?? bundle.name).toUpperCase()}
            </span>
          </nav>
        </div>

        {/* ─── Hero ────────────────────────────────────────── */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                PEPTIDE BUNDLE
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              {t?.name ?? bundle.name}
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-3xl mb-8">
              {t?.tagline ?? bundle.tagline}
            </p>

            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl md:text-5xl font-bold text-oryn-orange">
                  {currency}{discounted}
                </span>
                <span className="text-xl text-white/30 line-through">
                  {currency}{original}
                </span>
              </div>
              <div className="px-4 py-2 bg-oryn-orange/20 border border-oryn-orange/40">
                <span className="text-sm font-bold text-oryn-orange">
                  SAVE {bundle.savingsPercent}% &mdash; {currency}{savings} OFF
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4 text-[10px] font-mono text-white/30 tracking-[0.15em]">
              <span>{bundleProducts.length} PRODUCTS</span>
              <span className="w-1 h-1 bg-oryn-orange rounded-full" />
              <span>FREE UK DELIVERY</span>
              <span className="w-1 h-1 bg-oryn-orange rounded-full" />
              <span>&gt;99% PURITY</span>
            </div>

            <div className="mt-8">
              <BundleAddToCart productSlugs={bundle.productSlugs} />
            </div>
          </div>
        </section>

        {/* ─── What's Included ─────────────────────────────── */}
        <section className="bg-oryn-cream py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                BUNDLE CONTENTS
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-8">
              What&apos;s Included
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {bundleProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/products/${product.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group flex flex-col md:flex-row"
                >
                  <div className="bg-oryn-cream/50 p-8 flex items-center justify-center min-w-[200px] min-h-[200px]">
                    <Image
                      src={
                        productImages.bySlug[product.slug] || product.image
                      }
                      alt={`ORYN ${product.name}`}
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
                    <h3 className="text-xl font-bold mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-oryn-black/40 font-plex mb-3">
                      {product.subtitle}
                    </p>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl font-bold text-oryn-orange">
                        {currency}{product.price}
                      </span>
                      <span className="text-[9px] font-mono text-oryn-black/30">
                        {product.dosage} &middot; {product.volume}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(product.specs)
                        .slice(0, 3)
                        .map(([key, value]) => (
                          <span
                            key={key}
                            className="px-2 py-1 bg-oryn-cream text-[8px] font-mono text-oryn-black/40 tracking-[0.1em]"
                          >
                            {key.toUpperCase()}: {value}
                          </span>
                        ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Benefits ────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-oryn-orange" />
            <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
              STACK BENEFITS
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-8">Why This Stack Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(t?.benefits ?? bundle.benefits).map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-oryn-orange/5 border border-oryn-orange/10"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FF6A1A"
                  strokeWidth="2"
                  className="shrink-0 mt-0.5"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-oryn-black/70 font-plex">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Research Protocol ───────────────────────────── */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                RESEARCH PROTOCOL
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-6">Protocol Overview</h2>
            <p className="text-sm text-white/60 font-plex leading-relaxed mb-8">
              {t?.protocol ?? bundle.protocol}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 border border-white/10">
                <p className="text-[10px] font-mono text-oryn-orange tracking-[0.15em] mb-1">
                  PRODUCTS
                </p>
                <p className="text-lg font-bold">
                  {bundleProducts.length}
                </p>
              </div>
              <div className="p-4 border border-white/10">
                <p className="text-[10px] font-mono text-oryn-orange tracking-[0.15em] mb-1">
                  DURATION
                </p>
                <p className="text-lg font-bold">30 Days</p>
              </div>
              <div className="p-4 border border-white/10">
                <p className="text-[10px] font-mono text-oryn-orange tracking-[0.15em] mb-1">
                  PURITY
                </p>
                <p className="text-lg font-bold">&gt;99%</p>
              </div>
              <div className="p-4 border border-white/10">
                <p className="text-[10px] font-mono text-oryn-orange tracking-[0.15em] mb-1">
                  SAVINGS
                </p>
                <p className="text-lg font-bold">
                  {bundle.savingsPercent}%
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Description ─────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-6">About This Bundle</h2>
          <p className="text-sm text-oryn-black/60 font-plex leading-relaxed">
            {t?.description ?? bundle.description}
          </p>
        </section>

        {/* ─── FAQs ────────────────────────────────────────── */}
        <section className="bg-oryn-cream py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">
              {t?.name ?? bundle.name} &mdash; Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {(t?.faqs ?? bundle.faqs).map((faq, i) => (
                <details
                  key={i}
                  className="group border border-oryn-grey/20 bg-white open:border-oryn-orange/20"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-oryn-cream/50 transition-colors">
                    <h3 className="text-sm font-bold pr-4">
                      {faq.question}
                    </h3>
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
          </div>
        </section>

        {/* ─── Related Bundles ─────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-oryn-orange" />
            <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
              MORE STACKS
            </span>
          </div>
          <h2 className="text-xl font-bold mb-6">
            Explore Other Bundles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherBundles.slice(0, 4).map((b) => {
              const bT = getLocalizedBundle(b.slug, locale as Locale);
              const bProducts = b.productSlugs
                .map((s) => getProductBySlug(s))
                .filter(Boolean)
                .map((p) => p!);
              const { discounted: bPrice } = calculateBundlePrice(
                b.productSlugs,
                b.savingsPercent
              );

              return (
                <Link
                  key={b.slug}
                  href={`/${locale}/bundles/${b.slug}`}
                  className="p-5 border border-oryn-grey/10 hover:border-oryn-orange/30 transition-colors group"
                >
                  <div className="flex -space-x-4 mb-4">
                    {bProducts.slice(0, 3).map((p) => (
                      <div
                        key={p.slug}
                        className="w-12 h-12 bg-oryn-cream rounded-full border-2 border-white flex items-center justify-center overflow-hidden"
                      >
                        <Image
                          src={
                            productImages.bySlug[p.slug] || p.image
                          }
                          alt={p.name}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-bold group-hover:text-oryn-orange transition-colors">
                    {bT?.name ?? b.name}
                  </p>
                  <p className="text-[10px] text-oryn-black/40 font-plex mt-1 line-clamp-2">
                    {bT?.tagline ?? b.tagline}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-lg font-bold text-oryn-orange">
                      {currency}{bPrice}
                    </span>
                    <span className="text-[8px] font-mono text-white bg-oryn-orange px-1.5 py-0.5 tracking-[0.1em]">
                      SAVE {b.savingsPercent}%
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ─── Related Content ─────────────────────────────── */}
        <RelatedContent locale={locale} />

        {/* ─── CTA ─────────────────────────────────────────── */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Get the {t?.name ?? bundle.name}
            </h2>
            <p className="text-sm text-white/70 font-plex mb-4 max-w-lg mx-auto">
              Save {currency}{savings} with this bundle. GMP manufactured,
              &gt;99% purity guaranteed. Next-day UK delivery.
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-3xl font-bold">
                {currency}{discounted}
              </span>
              <span className="text-lg text-white/50 line-through">
                {currency}{original}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <BundleAddToCart productSlugs={bundle.productSlugs} />
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white font-medium text-xs tracking-[0.2em] hover:bg-white/10 transition-colors"
              >
                VIEW ALL PRODUCTS
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
