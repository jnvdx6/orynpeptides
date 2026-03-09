import type { Metadata } from "next";
import { breadcrumbSchema, faqSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales } from "@/i18n/config";
import { ContactClient } from "./ContactClient";

const CONTACT_FAQS = [
  { question: "How long does delivery take?", answer: "UK orders: 2-4 business days. Europe: 3-7 business days. All orders ship in discreet, temperature-controlled packaging." },
  { question: "Can I track my order?", answer: "Yes! Once dispatched, you'll receive a tracking number via email. You can also track orders in your account dashboard." },
  { question: "What is your return policy?", answer: "We offer a 30-day money-back guarantee on unopened products. Contact us at info@orynlabs.com to initiate a return." },
  { question: "Do you offer wholesale pricing?", answer: "Yes, contact wholesale@orynlabs.com for bulk pricing. We offer tiered discounts for research institutions and resellers." },
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
    ? "Contacto | ORYN Peptide Labs — Consultas y Wholesale"
    : "Contact ORYN Peptide Labs | Enquiries, Wholesale & Support";
  const description = isEs
    ? "Contacta con ORYN Peptide Labs para consultas generales, pedidos mayoristas o soporte técnico. Equipo de atención al cliente basado en Europa."
    : "Contact ORYN Peptide Labs for general enquiries, wholesale orders, or technical support. European-based customer support team. info@orynlabs.com";

  return {
    title,
    description,
    openGraph: {
      title: isEs ? "Contacto — ORYN Peptide Labs" : "Contact ORYN Peptide Labs",
      description,
      url: `${SITE_URL}/${locale}/contact`,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary",
      title: isEs ? "Contacto ORYN" : "Contact ORYN Peptide Labs",
      description: isEs
        ? "Consultas, wholesale y soporte técnico."
        : "General enquiries, wholesale orders & technical support.",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/contact`])
      ),
    },
  };
}

export default async function ContactPage({
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
            { name: "Contact", url: `/${locale}/contact` },
          ]),
          faqSchema(CONTACT_FAQS),
        ]}
      />
      <ContactClient />
    </>
  );
}
