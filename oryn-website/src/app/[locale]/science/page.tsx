import type { Metadata } from "next";
import { breadcrumbSchema, faqSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales } from "@/i18n/config";
import { ScienceClient } from "./ScienceClient";

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
    ? "Ciencia de los Péptidos | Mecanismos, Pureza y Proceso de Fabricación | ORYN"
    : "Peptide Science | Mechanisms, Purity & Manufacturing Process | ORYN UK";
  const description = isEs
    ? "Explora la ciencia detrás de BPC-157, Tirzepatide, GHK-Cu, NAD+ y más. Mecanismos de acción, procesos de fabricación GMP y estándares de pureza >99%."
    : "Explore the science behind BPC-157, TB-500, CJC-1295, Tirzepatide, GHK-Cu, NAD+ & Glutathione. Mechanisms of action, GMP manufacturing process & >99% purity standards.";

  return {
    title,
    description,
    openGraph: {
      title: isEs ? "Ciencia de los Péptidos — ORYN" : "Peptide Science — ORYN Peptide Labs",
      description,
      url: `${SITE_URL}/${locale}/science`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: isEs ? "Ciencia de los Péptidos" : "Peptide Science — ORYN",
      description: isEs
        ? "Mecanismos de acción, pureza >99%, fabricación GMP."
        : "Mechanisms of action, >99% purity, GMP manufacturing. Research-grade peptide science.",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/science`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/science`])
      ),
    },
  };
}

export default async function SciencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const scienceFaqs = [
    { question: "What purity standards do ORYN peptides meet?", answer: "All ORYN peptides exceed 99% purity, verified by independent HPLC testing. Each batch comes with a Certificate of Analysis confirming purity, identity, and sterility." },
    { question: "How are ORYN peptides manufactured?", answer: "ORYN peptides are synthesised in GMP-certified European laboratories using solid-phase peptide synthesis (SPPS). The process includes raw material verification, synthesis, purification, lyophilisation, sterile filling, and independent third-party testing." },
    { question: "What is a peptide pen system?", answer: "ORYN's peptide pen is a pre-mixed, pre-loaded delivery system that eliminates the need for reconstitution. Each pen contains a precise amount of peptide in bacteriostatic solution, ready for immediate research use with consistent dosing." },
    { question: "Are ORYN peptides legal in the UK?", answer: "Research peptides are legal to purchase in the UK for research purposes. ORYN products are sold strictly for in-vitro research and are not intended for human consumption or self-administration." },
  ];

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: "Home", url: `/${locale}` },
            { name: "Science", url: `/${locale}/science` },
          ]),
          faqSchema(scienceFaqs),
        ]}
      />
      <ScienceClient />
    </>
  );
}
