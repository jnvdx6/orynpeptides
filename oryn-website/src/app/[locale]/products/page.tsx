import type { Metadata } from "next";
import { products } from "@/data/products";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales } from "@/i18n/config";
import { ProductsClient } from "./ProductsClient";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  const title = isEs
    ? "Comprar Plumas de Péptidos | BPC-157, Tirzepatide, GHK-Cu, NAD+ | ORYN"
    : "Buy Peptide Pens UK | BPC-157, Tirzepatide, GHK-Cu, NAD+ & More | ORYN";
  const description = isEs
    ? "Explora la gama completa de plumas de péptidos ORYN. 10 péptidos de grado investigación, pureza >99%, fabricación GMP. Desde £169."
    : "Explore the full range of ORYN research-grade peptide pens. BPC-157, TB-500, CJC-1295, Ipamorelin, Tirzepatide, GHK-Cu, NAD+, Glutathione. >99% purity, GMP manufactured. From £169.";

  return {
    title,
    description,
    openGraph: {
      title: isEs ? "Plumas de Péptidos — ORYN" : "Peptide Pens — ORYN Peptide Labs",
      description,
      url: `${SITE_URL}/${locale}/products`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: isEs ? "Plumas de Péptidos ORYN" : "ORYN Peptide Pens — Full Range",
      description: isEs
        ? "10 péptidos, pureza >99%, fabricación GMP."
        : "10 research-grade peptides. >99% purity. GMP manufactured. Next-day UK delivery.",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/products`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/products`])
      ),
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

  return (
    <>
      <MultiJsonLd
        items={[
          itemListSchema(locale),
          breadcrumbSchema([
            { name: "Home", url: `/${locale}` },
            { name: "Products", url: `/${locale}/products` },
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
    </>
  );
}
