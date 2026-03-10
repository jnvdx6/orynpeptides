import type { Metadata } from "next";
import { products, getProductBySlug } from "@/data/products";
import { getProductDetail } from "@/data/product-details";
import {
  productSchema,
  faqSchema,
  breadcrumbSchema,
  SITE_URL,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { TrustBanner } from "@/components/seo/TrustBanner";
import { MedicalDisclaimer } from "@/components/seo/MedicalDisclaimer";
import { locales } from "@/i18n/config";
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

  const currency = locale === "es" ? "EUR" : "GBP";
  const symbol = locale === "es" ? "€" : "£";
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
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/products/${slug}`])
      ),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const product = getProductBySlug(slug);
  if (!product) return <ProductPageClient />;

  const detail = getProductDetail(product.slug);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemaItems: Record<string, any>[] = [
    productSchema(product, locale),
    breadcrumbSchema([
      { name: "Home", url: `/${locale}` },
      { name: "Products", url: `/${locale}/products` },
      { name: product.name, url: `/${locale}/products/${product.slug}` },
    ]),
  ];

  if (detail?.faq) {
    schemaItems.push(faqSchema(detail.faq));
  }

  return (
    <>
      <MultiJsonLd items={schemaItems} />
      <TrustBanner />
      <ProductPageClient />
      <MedicalDisclaimer />
      <RelatedContent productSlug={product.slug} locale={locale} />
      <ProtocolLinks productSlug={product.slug} locale={locale} />
    </>
  );
}
