import type { Metadata } from "next";
import { breadcrumbSchema, faqSchema, organizationSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { ShippingClient } from "./ShippingClient";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const shippingFaqs = [
  {
    question: "How long does UK peptide delivery take?",
    answer:
      "UK delivery times depend on your location. London and the South East receive orders in 1-2 business days, the Midlands, East, North England, and Wales in 2-3 business days, Scotland in 3-4 business days, and the Highlands and Islands in 4-5 business days. All orders placed before 2pm are dispatched the same day.",
  },
  {
    question: "Is peptide shipping temperature-controlled?",
    answer:
      "Yes. All ORYN peptide shipments are packed in insulated boxes with gel ice packs to maintain a temperature range of 2-8 degrees Celsius during transit. During summer months (June-September), we add additional cold chain protection including extra ice packs and insulated liners to ensure product integrity.",
  },
  {
    question: "How do I qualify for free shipping?",
    answer:
      "Free standard UK shipping is available on all orders over 150 pounds. This threshold applies to the order subtotal before any discount codes. International orders to Europe are subject to a flat shipping fee regardless of order value. Your cart will show a progress bar indicating how close you are to the free shipping threshold.",
  },
  {
    question: "Do you ship peptides internationally to Europe?",
    answer:
      "Yes, ORYN ships to most European Union countries. European delivery typically takes 3-7 business days depending on the destination country. All international shipments include temperature-controlled packaging and full tracking. Customs duties and import taxes are the responsibility of the customer.",
  },
  {
    question: "How is my peptide order packaged?",
    answer:
      "All ORYN orders are shipped in plain, unmarked boxes with no product descriptions or branding visible on the outside. Inside, peptide pens are secured in custom foam inserts within an insulated container with gel ice packs. A packing slip and Certificate of Analysis are included inside the box.",
  },
  {
    question: "Can I track my peptide order?",
    answer:
      "Yes. All orders receive a tracking number via email within 2 hours of dispatch. You can track your shipment in real time through our courier partner portal. For wholesale orders of 10+ units, we provide enhanced tracking with estimated delivery windows and delivery confirmation signatures.",
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
    ? "Envio y Entrega de Peptidos | Entrega en 2-4 Dias | ORYN Peptides"
    : "Peptide Shipping & Delivery UK | Next-Day Dispatch, Free Over €150 | ORYN Peptide Labs";
  const description = isEs
    ? "Envio con temperatura controlada en 2-4 dias laborables. Envio gratuito en pedidos superiores a 150 euros. Embalaje discreto, seguimiento completo y entrega en toda Europa."
    : "Temperature-controlled peptide delivery across the UK in 2-4 business days. Same-day dispatch, free shipping over €150, discreet packaging. Insulated boxes with gel ice packs. European delivery 3-7 days.";

  return {
    title,
    description,
    openGraph: {
      title: isEs
        ? "Envio y Entrega — ORYN Peptides"
        : "Shipping & Delivery — ORYN Peptide Labs",
      description,
      url: `${SITE_URL}/${locale}/shipping`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: isEs
        ? "Envio y Entrega — ORYN"
        : "Peptide Shipping & Delivery — ORYN Peptide Labs",
      description: isEs
        ? "Entrega en 2-4 dias. Envio con temperatura controlada. Gratis en pedidos de mas de 150 euros."
        : "2-4 day UK delivery. Temperature-controlled shipping. Free over €150. Same-day dispatch before 2pm.",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/shipping`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/shipping`])
      ),
    },
  };
}

export default async function ShippingPage({
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
            { name: dict.breadcrumbs.shipping, url: `/${locale}/shipping` },
          ]),
          faqSchema(shippingFaqs),
          organizationSchema(),
        ]}
      />
      <ShippingClient faqs={shippingFaqs} locale={locale} />
    </>
  );
}
