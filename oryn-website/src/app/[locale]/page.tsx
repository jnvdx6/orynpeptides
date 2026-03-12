import type { Metadata } from "next";
import { breadcrumbSchema, faqSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales } from "@/i18n/config";
import { products } from "@/data/products";
import { HomeClient } from "./HomeClient";

const HOME_FAQS = [
  { question: "What are ORYN Peptide Pens?", answer: "ORYN Peptide Pens are pre-mixed, ready-to-use research peptide delivery systems. Each pen contains pharmaceutical-grade peptides at >99% purity, manufactured in our ISO 7 cleanroom facility. The pen format eliminates the need for reconstitution, ensuring consistent dosing for research applications." },
  { question: "Are peptides legal in the UK and Europe?", answer: "Yes, research peptides are legal to purchase in the UK and across Europe for research purposes. ORYN Peptides are sold strictly for in-vitro research and laboratory use. They are not intended for human consumption." },
  { question: "How are your peptides manufactured?", answer: "All ORYN peptides are synthesised in our GMP-certified, ISO 7 cleanroom laboratory in Europe. Every batch undergoes rigorous HPLC and mass spectrometry testing to verify >99% purity. A Certificate of Analysis (COA) is included with every order." },
  { question: "How long does delivery take?", answer: "UK orders typically arrive within 2-4 business days. European orders take 3-7 business days depending on destination. All orders are shipped in discreet, temperature-controlled packaging. Orders over €150 qualify for free shipping." },
  { question: "What is the ORYN Referral Programme?", answer: "Our multi-level referral programme lets you earn 10% commission on purchases made by colleagues you refer. You also earn commissions up to 5 levels deep as your network grows. Sign up for a free account to get your unique referral code." },
  { question: "Do you offer bulk or wholesale pricing?", answer: "Yes, we offer volume discounts starting from 3+ units. The more you order, the bigger the discount — up to 15% off for large research orders. Contact us for custom wholesale pricing on bulk orders." },
];

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
    ? "ORYN Peptide Labs — Plumas de Péptidos de Grado Investigación | Entrega en Europa"
    : "ORYN Peptide Labs — Research-Grade Peptide Pens | Next-Day UK Delivery";
  const description = isEs
    ? "Compra plumas de péptidos de grado investigación de ORYN. BPC-157, Tirzepatide, GHK-Cu, NAD+ y más. Pureza >99%, fabricación GMP, premezclados y listos para usar."
    : "Buy research-grade peptide pens from ORYN. BPC-157, Tirzepatide, GHK-Cu, NAD+ & more. >99% purity, GMP manufactured, pre-mixed & ready to use. Next-day UK delivery.";

  return {
    title,
    description,
    openGraph: {
      title: "ORYN Peptide Labs — Precision Peptide Pen Systems",
      description,
      url: `${SITE_URL}/${locale}`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "ORYN Peptide Labs",
      description: "Research-grade peptide pens. >99% purity. Next-day UK delivery.",
      images: [`${SITE_URL}/opengraph-image`],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}`])
      ),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([{ name: "Home", url: `/${locale}` }]),
          faqSchema(HOME_FAQS),
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
              name: `ORYN ${p.name} ${p.dosage}`,
              url: `${SITE_URL}/${locale}/products/${p.slug}`,
              image: `${SITE_URL}${p.image}`,
            })),
          },
        ]}
      />
      <HomeClient />
    </>
  );
}
