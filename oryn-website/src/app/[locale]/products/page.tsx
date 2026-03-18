import type { Metadata } from "next";
import { products } from "@/data/products";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { ProductsClient } from "./ProductsClient";
import { PageTracker } from "@/components/analytics/PageTracker";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const title = `${dict.breadcrumbs.products} — ORYN Peptide Labs`;
  const description = dict.meta.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/products`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/products`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/products`])
        ),
        "x-default": `${SITE_URL}/en/products`,
      },
    },
  };
}

function itemListSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ORYN Peptide Pens",
    description: "Research-grade peptide pen collection",
    url: `${SITE_URL}/${locale}/products`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/${locale}/products/${product.slug}`,
      name: `ORYN ${product.name}`,
      image: `${SITE_URL}${product.image}`,
    })),
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <MultiJsonLd
        items={[
          itemListSchema(locale),
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.products, url: `/${locale}/products` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "ORYN Peptide Pens — Full Product Range",
            description: "Research-grade peptide pen systems. 10 peptides, >99% purity, GMP manufactured in ISO 7 cleanrooms.",
            url: `${SITE_URL}/${locale}/products`,
            isPartOf: { "@type": "WebSite", url: SITE_URL },
            about: {
              "@type": "Thing",
              name: "Research Peptide Pens",
              description: "Pre-mixed, ready-to-use peptide delivery systems for research applications",
            },
            numberOfItems: products.length,
            provider: {
              "@type": "Organization",
              name: "ORYN Peptide Labs",
              url: SITE_URL,
            },
          },
        ]}
      />
      <ProductsClient />
      <PageTracker pageName="products_listing" />
    </>
  );
}
