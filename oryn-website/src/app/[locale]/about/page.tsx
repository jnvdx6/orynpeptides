import type { Metadata } from "next";
import { breadcrumbSchema, organizationSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales } from "@/i18n/config";
import { AboutClient } from "./AboutClient";

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
    ? "Sobre ORYN Peptide Labs | Ciencia, Pureza, Precisión"
    : "About ORYN Peptide Labs | Science, Purity & Precision Since 2024";
  const description = isEs
    ? "Descubre ORYN Peptide Labs: fabricación GMP europea, pureza >99%, y sistemas de plumas de péptidos de precisión. Conozca nuestra misión, valores e instalaciones."
    : "Discover ORYN Peptide Labs: European GMP manufacturing, >99% purity, and precision peptide pen systems. Learn about our mission, values, facilities & commitment to research-grade quality.";

  return {
    title,
    description,
    openGraph: {
      title: isEs ? "Sobre ORYN Peptide Labs" : "About ORYN Peptide Labs — Our Story & Mission",
      description,
      url: `${SITE_URL}/${locale}/about`,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: isEs ? "Sobre ORYN" : "About ORYN Peptide Labs",
      description: isEs
        ? "Fabricación GMP europea. Pureza >99%."
        : "European GMP manufacturing. >99% purity. Precision peptide pen systems.",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/about`])
      ),
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <MultiJsonLd
        items={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", url: `/${locale}` },
            { name: "About", url: `/${locale}/about` },
          ]),
        ]}
      />
      <AboutClient />
    </>
  );
}
