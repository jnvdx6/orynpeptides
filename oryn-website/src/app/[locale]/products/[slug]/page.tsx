import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/data/products";
import { getProductDetail } from "@/data/product-details";
import { getEncyclopediaEntry } from "@/data/peptide-encyclopedia";
import {
  productSchema,
  faqSchema,
  breadcrumbSchema,
  chemicalSubstanceSchema,
  SITE_URL,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { MedicalDisclaimer } from "@/components/seo/MedicalDisclaimer";
import { locales, type Locale, markets, regions, isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { ProductPageClient } from "./ProductPageClient";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { ProtocolLinks } from "@/components/seo/ProtocolLinks";

export async function generateStaticParams() {
  const params = [];
  for (const locale of locales) {
    for (const product of products) {
      params.push({ locale, slug: product.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const market = isValidLocale(locale) ? markets[locale as Locale] : markets.en;
  const regionConfig = regions[market.defaultRegion];
  const currency = regionConfig.currencyCode.toUpperCase();
  const symbol = regionConfig.symbol;
  const title = `Buy ORYN ${product.name} ${product.dosage} | Peptide Pen UK — ${symbol}${product.price}`;
  const description = `Order ORYN ${product.name} (${product.subtitle}) — ${product.dosage} pre-mixed peptide pen. >99% purity, GMP manufactured, next-day UK delivery. ${product.description.slice(0, 120)}`;

  return {
    title,
    description,
    openGraph: {
      title: `ORYN ${product.name} — ${product.subtitle} | Peptide Pen`,
      description,
      url: `${SITE_URL}/${locale}/products/${slug}`,
      type: "website",
      images: [
        {
          url: `${SITE_URL}${product.image}`,
          width: 800,
          height: 800,
          alt: `ORYN ${product.name} Peptide Pen`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `ORYN ${product.name} — ${product.subtitle}`,
      description: `${product.dosage} pre-mixed peptide pen. >99% purity. From ${symbol}${product.price}.`,
      images: [`${SITE_URL}${product.image}`],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/products/${slug}`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/products/${slug}`])
        ),
        "x-default": `${SITE_URL}/en/products/${slug}`,
      },
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const detail = getProductDetail(product.slug);

  // Look up matching peptide encyclopedia entry for ChemicalSubstance schema
  const peptideEntry = getEncyclopediaEntry(product.slug)
    || (product.slug === "medit-tirzepatide" ? getEncyclopediaEntry("tirzepatide-pen") : undefined)
    || (product.slug === "novadose-nad" ? getEncyclopediaEntry("nad-plus") : undefined);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemaItems: Record<string, any>[] = [
    productSchema(product, locale),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/products/${product.slug}`,
      name: `Buy ORYN ${product.name} — ${product.subtitle}`,
      description: product.description,
      url: `${SITE_URL}/${locale}/products/${product.slug}`,
      isPartOf: { "@type": "WebSite", url: SITE_URL },
      mainEntity: {
        "@type": "Product",
        name: `ORYN ${product.name}`,
        url: `${SITE_URL}/${locale}/products/${product.slug}`,
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".product-description", ".product-specs"],
      },
      inLanguage: locale,
    },
    breadcrumbSchema([
      { name: dict.breadcrumbs.home, url: `/${locale}` },
      { name: dict.breadcrumbs.products, url: `/${locale}/products` },
      { name: product.name, url: `/${locale}/products/${product.slug}` },
    ]),
  ];

  // Add ChemicalSubstance schema for peptide products (links product to its molecular data)
  if (peptideEntry) {
    schemaItems.push(chemicalSubstanceSchema(peptideEntry, locale));
  }

  if (detail?.faq) {
    schemaItems.push(faqSchema(detail.faq));
  }

  return (
    <>
      <MultiJsonLd items={schemaItems} />
      <ProductPageClient />
      <MedicalDisclaimer />
      <RelatedContent productSlug={product.slug} locale={locale} />
      <ProtocolLinks productSlug={product.slug} locale={locale} />
    </>
  );
}
