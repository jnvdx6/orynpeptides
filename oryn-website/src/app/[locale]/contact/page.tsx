import type { Metadata } from "next";
import { breadcrumbSchema, faqSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
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
  const dict = await getDictionary(locale as Locale);

  const title = `${dict.contactPage.heroTitle} | ORYN Peptide Labs`;
  const description = dict.contactPage.heroDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/contact`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/contact`])
        ),
        "x-default": `${SITE_URL}/en/contact`,
      },
    },
  };
}

export default async function ContactPage({
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
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.contact, url: `/${locale}/contact` },
          ]),
          faqSchema(CONTACT_FAQS),
        ]}
      />
      <ContactClient />
    </>
  );
}
