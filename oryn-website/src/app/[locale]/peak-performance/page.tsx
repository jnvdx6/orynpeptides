import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, pageAlternates, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { PageTracker } from "@/components/analytics/PageTracker";
import { PEAK_CAMPAIGN, getCampaignProducts, PEAK_BUNDLES } from "@/data/campaign-peak-performance";
import { getProductBySlug } from "@/data/products";
import { PeakPerformanceClient } from "./PeakPerformanceClient";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = `${PEAK_CAMPAIGN.name} — Engineer Your Peak | ORYN Peptide Labs`;
  const description =
    "Pre-Summer Peak Performance campaign. Tirzepatide, NAD+, Growth Hormone peptides — tiered discounts up to 15% with code PEAK26. Free priority delivery on orders over €400.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/peak-performance`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    alternates: pageAlternates("/peak-performance", locale),
  };
}

export default async function PeakPerformancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const heroProducts = getCampaignProducts();
  const bundleData = PEAK_BUNDLES.map((b) => {
    const products = b.productSlugs
      .map((s) => getProductBySlug(s))
      .filter((p): p is NonNullable<typeof p> => !!p);
    const total = products.reduce((sum, p) => sum + p.price, 0);
    const discounted = Math.round(total * (1 - b.discountPercent / 100));
    return { ...b, products, totalPrice: total, discountedPrice: discounted };
  });

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: PEAK_CAMPAIGN.name, url: `/${locale}/peak-performance` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${PEAK_CAMPAIGN.name} — ORYN Peptide Labs`,
            description:
              "Pre-Summer Peak Performance campaign featuring tiered discounts and free priority delivery.",
            url: `${SITE_URL}/${locale}/peak-performance`,
          },
        ]}
      />

      <PageTracker
        pageName="peak_performance_campaign"
        properties={{ campaign: "peak-performance", promo_code: "PEAK26" }}
      />

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
            <span className="text-oryn-orange">PEAK PERFORMANCE</span>
          </nav>
        </div>

        <PeakPerformanceClient
          locale={locale}
          heroProducts={heroProducts}
          bundleData={bundleData}
        />
      </div>
    </>
  );
}
