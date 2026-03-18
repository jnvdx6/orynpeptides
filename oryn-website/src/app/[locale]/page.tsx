import type { Metadata } from "next";
import { breadcrumbSchema, faqSchema, productSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { products } from "@/data/products";
import { HomeClient } from "./HomeClient";

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

  const title = dict.meta.title;
  const description = dict.meta.description;

  return {
    title,
    description,
    openGraph: {
      title: "Buy Peptides UK | Peptide Pen Systems from €99 | ORYN Peptide Labs",
      description,
      url: `${SITE_URL}/${locale}`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Buy Peptides UK | ORYN Peptide Labs",
      description: "UK's leading peptide pen supplier. >99% purity. Next-day delivery from €99.",
      images: [`${SITE_URL}/opengraph-image`],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}`])
        ),
        "x-default": `${SITE_URL}/en`,
      },
    },
  };
}

export default async function HomePage({
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
          breadcrumbSchema([{ name: dict.breadcrumbs.home, url: `/${locale}` }]),
          faqSchema(dict.homeFaq.items.map(f => ({ question: f.q, answer: f.a }))),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${SITE_URL}/${locale}`,
            name: "ORYN Peptide Labs — Research-Grade Peptide Pens",
            description: "Buy research-grade peptide pens from ORYN. BPC-157, Tirzepatide, GHK-Cu, NAD+ & more. >99% purity, GMP manufactured.",
            url: `${SITE_URL}/${locale}`,
            isPartOf: { "@type": "WebSite", url: SITE_URL },
            about: {
              "@type": "Thing",
              name: "Research Peptide Pens",
              sameAs: "https://en.wikipedia.org/wiki/Peptide",
            },
            significantLink: [
              `${SITE_URL}/${locale}/products`,
              `${SITE_URL}/${locale}/science`,
              `${SITE_URL}/${locale}/quality`,
              `${SITE_URL}/${locale}/learn`,
              `${SITE_URL}/${locale}/protocols`,
            ],
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["h1", ".hero-subtitle"],
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "ORYN Peptide Pens — Featured Products",
            description: "Research-grade peptide pen systems available for next-day UK delivery",
            numberOfItems: products.length,
            itemListElement: products.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: productSchema(p, locale),
            })),
          },
        ]}
      />
      <HomeClient />
    </>
  );
}
