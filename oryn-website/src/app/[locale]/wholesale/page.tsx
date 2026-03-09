import type { Metadata } from "next";
import { breadcrumbSchema, faqSchema, organizationSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales } from "@/i18n/config";
import { WholesaleClient } from "./WholesaleClient";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const wholesaleFaqs = [
  {
    question: "What is the minimum order quantity for wholesale pricing?",
    answer:
      "Our wholesale pricing tiers start at just 3 units. Orders of 3-5 units receive 5% off, 6-9 units receive 10% off, and 10 or more units receive 15% off retail pricing. For orders of 50+ units, we offer custom quotes tailored to your specific requirements.",
  },
  {
    question: "How does wholesale pricing work at ORYN?",
    answer:
      "ORYN wholesale pricing is based on volume discount tiers applied to our standard retail prices. Discounts are calculated automatically at checkout for qualifying orders. You can mix and match any products across our Peptide Pen, MediT Pen, and NovaDose ranges to reach your tier. For ongoing supply agreements, contact our wholesale team for tailored pricing.",
  },
  {
    question: "How do I set up a wholesale account?",
    answer:
      "Setting up a wholesale account is straightforward. Contact our team at info@orynpeptides.com or use the wholesale enquiry form on our contact page. We will verify your organisation details, assign a dedicated account manager, and activate volume pricing on your account within 1-2 business days.",
  },
  {
    question: "What payment terms are available for wholesale customers?",
    answer:
      "Standard wholesale orders are payable by bank transfer, credit card, or purchase order (for approved accounts). We offer NET-30 payment terms for established wholesale customers with a verified trading history. All first orders are prepaid. Contact our team to discuss payment arrangements for large-volume contracts.",
  },
  {
    question: "What are delivery times for bulk peptide orders?",
    answer:
      "Wholesale orders ship within 1-2 business days from our UK distribution centre. Standard UK delivery takes 2-4 business days. For large orders (50+ units), we may require up to 5 business days for preparation. All wholesale shipments include temperature-controlled packaging at no extra cost, with full tracking provided.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  const title = isEs
    ? "Pedidos al Por Mayor de Peptidos | Precios por Volumen | ORYN Peptides"
    : "Wholesale Peptide Orders UK | Bulk Pricing & Volume Discounts | ORYN Peptide Labs";
  const description = isEs
    ? "Pedidos al por mayor de peptidos con descuentos por volumen. Desde 5% de descuento en 3+ unidades hasta 15% en 10+. Gestor de cuenta dedicado, envio prioritario y COA incluido."
    : "Wholesale research peptide orders with volume discounts from 5% to 15%. Bulk peptide pens for universities, research labs, clinics & distributors. Dedicated account manager, priority shipping, COA included. UK peptide supplier.";

  return {
    title,
    description,
    openGraph: {
      title: isEs
        ? "Pedidos al Por Mayor — ORYN Peptides"
        : "Wholesale & Bulk Peptide Orders — ORYN Peptide Labs",
      description,
      url: `${SITE_URL}/${locale}/wholesale`,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: isEs
        ? "Pedidos al Por Mayor — ORYN"
        : "Wholesale Peptide Orders UK — ORYN Peptide Labs",
      description: isEs
        ? "Descuentos por volumen en peptidos de grado farmaceutico. Desde 5% hasta 15% de descuento."
        : "Volume discounts on research-grade peptide pens. 5-15% off bulk orders. Dedicated wholesale accounts for labs & clinics.",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/wholesale`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/wholesale`])
      ),
    },
  };
}

export default async function WholesalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: "Home", url: `/${locale}` },
            { name: "Wholesale", url: `/${locale}/wholesale` },
          ]),
          faqSchema(wholesaleFaqs),
          organizationSchema(),
        ]}
      />
      <WholesaleClient faqs={wholesaleFaqs} locale={locale} />
    </>
  );
}
