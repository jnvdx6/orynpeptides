import type { Metadata } from "next";
import Link from "next/link";
import { bundles } from "@/data/bundles";
import { getProductBySlug, productImages } from "@/data/products";
import Image from "next/image";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getLocalizedBundle } from "@/data/bundles-i18n";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Peptide Stacks & Bundles | ORYN Peptide Labs";
  const description =
    "Save up to 15% with curated peptide stacks. Recovery, anti-aging, GH optimisation, metabolic, and wellness bundles — all pre-mixed, >99% purity, next-day UK delivery.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/bundles`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/bundles`])
        ),
        "x-default": `${SITE_URL}/en/bundles`,
      },
    },
  };
}

export default async function BundlesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const currency = "€";

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.bundles, url: `/${locale}/bundles` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "ORYN Peptide Stacks & Bundles",
            numberOfItems: bundles.length,
            itemListElement: bundles.map((b, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: b.name,
              url: `${SITE_URL}/${locale}/bundles/${b.slug}`,
            })),
          },
        ]}
      />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">BUNDLES</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                CURATED STACKS
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Peptide Stacks
              <br />
              &amp; Bundles
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl">
              Save up to 15% with expertly curated peptide stacks.
              Each bundle combines complementary peptides for synergistic
              research outcomes. All products pre-mixed, &gt;99% purity,
              next-day UK delivery.
            </p>
          </div>
        </section>

        {/* Bundle Cards */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bundles.map((bundle) => {
              const t = getLocalizedBundle(bundle.slug, locale as Locale);
              const bundleProducts = bundle.productSlugs
                .map((s) => getProductBySlug(s))
                .filter((p): p is NonNullable<typeof p> => !!p);
              const totalPrice = bundleProducts.reduce((sum, p) => sum + p.price, 0);
              const discountedPrice = Math.round(totalPrice * (1 - bundle.savingsPercent / 100));

              return (
                <Link
                  key={bundle.slug}
                  href={`/${locale}/bundles/${bundle.slug}`}
                  className="group border border-oryn-grey/15 hover:border-oryn-orange/30 transition-all"
                >
                  {/* Product Images */}
                  <div className="bg-oryn-cream/50 p-6 flex items-center justify-center gap-4 min-h-[180px]">
                    {bundleProducts.slice(0, 3).map((p) => (
                      <Image
                        key={p.slug}
                        src={productImages.bySlug[p.slug] || p.image}
                        alt={p.name}
                        width={80}
                        height={80}
                        className="object-contain group-hover:scale-105 transition-transform"
                      />
                    ))}
                    {bundleProducts.length > 3 && (
                      <span className="text-xs font-mono text-oryn-black/30">
                        +{bundleProducts.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[8px] font-mono text-oryn-orange tracking-[0.15em]">
                        {bundle.productSlugs.length} PEPTIDES
                      </span>
                      <span className="text-[8px] font-mono px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                        SAVE {bundle.savingsPercent}%
                      </span>
                    </div>
                    <h2 className="text-lg font-bold mb-2 group-hover:text-oryn-orange transition-colors">
                      {t?.name ?? bundle.name}
                    </h2>
                    <p className="text-xs text-oryn-black/50 font-plex mb-4 line-clamp-2">
                      {t?.tagline ?? bundle.tagline}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-oryn-orange">
                        {currency}{discountedPrice}
                      </span>
                      <span className="text-sm text-oryn-black/30 line-through">
                        {currency}{totalPrice}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Or Build Your Own Stack
            </h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              Browse all 10 peptide pens individually and create a custom
              research stack tailored to your protocol.
            </p>
            <Link
              href={`/${locale}/products`}
              className="px-8 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
            >
              SHOP ALL PEPTIDES
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
