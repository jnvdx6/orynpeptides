import type { Metadata } from "next";
import { breadcrumbSchema, faqSchema, organizationSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { QualityClient } from "./QualityClient";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const qualityFaqs = [
  {
    question: "What is a Certificate of Analysis (COA)?",
    answer:
      "A Certificate of Analysis is a document issued by a qualified testing laboratory that confirms the identity, purity, and composition of a peptide product. Each ORYN COA includes HPLC purity data, mass spectrometry identity confirmation, endotoxin testing results, sterility verification, and batch-specific manufacturing details.",
  },
  {
    question: "How do I read an HPLC purity result?",
    answer:
      "HPLC (High-Performance Liquid Chromatography) results show a chromatogram with peaks representing different components. The main peak area percentage indicates purity — for example, 99.2% means 99.2% of the detected material is the target peptide. All ORYN peptides consistently achieve greater than 98% purity, with most batches exceeding 99%.",
  },
  {
    question: "Who performs your third-party testing?",
    answer:
      "ORYN peptides are tested by independent, ISO 17025-accredited analytical laboratories. These labs operate independently from our manufacturing facilities, ensuring unbiased verification of purity, identity, and sterility for every batch we produce.",
  },
  {
    question: "How often are ORYN peptides tested?",
    answer:
      "Every single batch of every ORYN product is tested before release. We operate a strict batch-release protocol: no product leaves our facility without a passing Certificate of Analysis from an independent laboratory. Testing includes HPLC purity analysis, mass spectrometry identity confirmation, endotoxin screening, and sterility verification.",
  },
  {
    question: "What purity standards do ORYN peptides meet?",
    answer:
      "All ORYN peptides are manufactured to exceed 98% purity, with most batches achieving greater than 99%. This is verified by independent HPLC testing and confirmed via mass spectrometry. Our manufacturing facilities are GMP-certified and operate under ISO 9001 quality management systems in ISO 7 cleanroom environments.",
  },
  {
    question: "Can I request a COA for my specific batch?",
    answer:
      "Yes. Every ORYN product ships with a batch number printed on the packaging. You can request the specific COA for your batch by contacting our support team at info@orynpeptides.com with your batch number. We maintain full traceability records for every batch manufactured.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const title = `${dict.breadcrumbs.quality} — ORYN Peptide Labs`;
  const description = dict.meta.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/quality`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/quality`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/quality`])
      ),
    },
  };
}

export default async function QualityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const qualityOrgSchema = {
    ...organizationSchema(),
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "GMP Manufacturing Certification",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "ISO 9001 Quality Management",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "ISO 7 Cleanroom Certification",
      },
    ],
  };

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.quality, url: `/${locale}/quality` },
          ]),
          faqSchema(qualityFaqs),
          qualityOrgSchema,
        ]}
      />
      <QualityClient faqs={qualityFaqs} />
    </>
  );
}
