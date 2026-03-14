import type { Metadata } from "next";
import "../globals.css";
import { LocaleProvider } from "@/i18n/LocaleContext";
import { getDictionary } from "@/i18n/getDictionary";
import { isValidLocale, defaultLocale, locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { organizationSchema, websiteSchema, SITE_URL } from "@/lib/seo";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;
  const dict = await getDictionary(locale);

  return {
    title: {
      default: dict.meta.title,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.description,
    keywords: [
      "ORYN peptides", "buy peptides Europe", "peptide pen system", "research peptides UK",
      "BPC-157 pen", "TB-500 pen", "NAD+ injection pen", "tirzepatide pen", "GLP-1 peptide",
      "GHK-CU copper peptide", "CJC-1295 Ipamorelin", "Glutathione injection",
      "NovaDose NAD+", "NovaNAD", "MediT Pen tirzepatide",
      "pre-mixed peptide pen", "reusable injection pen", "peptide pen Europe",
      "GMP certified peptides", "pharmaceutical grade peptides",
      "buy peptides online", "peptide delivery Europe UK USA",
      "acheter peptides", "Peptide kaufen", "comprare peptidi", "comprar péptidos",
      "peptiden kopen", "peptydy kupić",
      "weight loss peptides", "anti-aging peptides", "recovery peptides",
    ],
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      siteName: "ORYN Peptide Labs",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.ogDescription,
    },
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}`])),
        "x-default": `${SITE_URL}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#FF6A1A" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="author" content="ORYN Peptide Labs" />
        <meta name="geo.region" content="150" />
        <meta name="geo.placename" content="Europe" />
        <meta name="rating" content="general" />
        <meta name="robots" content="max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="preconnect" href="https://medusa.skyodoo.com" />
        <link rel="dns-prefetch" href="https://medusa.skyodoo.com" />
        <link rel="preconnect" href="https://js.stripe.com" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="manifest" href="/manifest.json" />
        <MultiJsonLd items={[
          organizationSchema(),
          websiteSchema(),
          {
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            name: [
              "Products", "Bundles", "Protocols", "Compare", "Science",
              "Learn", "Encyclopedia", "Glossary", "FAQ",
              "Quality", "Why ORYN", "About", "Contact",
            ],
            url: [
              `${SITE_URL}/en/products`,
              `${SITE_URL}/en/bundles`,
              `${SITE_URL}/en/protocols`,
              `${SITE_URL}/en/compare`,
              `${SITE_URL}/en/science`,
              `${SITE_URL}/en/learn`,
              `${SITE_URL}/en/peptides/encyclopedia`,
              `${SITE_URL}/en/peptides/glossary`,
              `${SITE_URL}/en/faq`,
              `${SITE_URL}/en/quality`,
              `${SITE_URL}/en/why-oryn`,
              `${SITE_URL}/en/about`,
              `${SITE_URL}/en/contact`,
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "MerchantReturnPolicy",
            "@id": `${SITE_URL}/#return-policy`,
            applicableCountry: "GB",
            returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 30,
            returnMethod: "https://schema.org/ReturnByMail",
            returnFees: "https://schema.org/FreeReturn",
          },
          {
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "ORYN Peptide Range",
            numberOfItems: 10,
            itemListElement: [
              { "@type": "OfferCatalog", name: "Peptide Pens", numberOfItems: 8 },
              { "@type": "OfferCatalog", name: "MediT Pen", numberOfItems: 1 },
              { "@type": "OfferCatalog", name: "NovaDose System", numberOfItems: 1 },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "OnlineBusiness",
            name: "ORYN Peptide Labs",
            url: SITE_URL,
            logo: `${SITE_URL}/opengraph-image`,
            description: "Research-grade peptide pen systems with >99% purity. GMP certified, ISO 7 cleanroom manufactured. Next-day UK delivery.",
            priceRange: "€99-€299",
            currenciesAccepted: "GBP, EUR, USD",
            paymentAccepted: "Credit Card, Debit Card, Cryptocurrency",
            areaServed: {
              "@type": "GeoCircle",
              geoMidpoint: { "@type": "GeoCoordinates", latitude: 51.5074, longitude: -0.1278 },
              geoRadius: "3000",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Peptide Pens",
              numberOfItems: 10,
            },
          },
        ]} />
        <GoogleAnalytics />
      </head>
      <body className="font-grotesk antialiased bg-oryn-white text-oryn-black">
        <LocaleProvider locale={locale} dictionary={dictionary}>
          <LayoutShell>{children}</LayoutShell>
        </LocaleProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
