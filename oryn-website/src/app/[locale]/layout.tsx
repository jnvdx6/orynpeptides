import type { Metadata } from "next";
import "../globals.css";
import { LocaleProvider } from "@/i18n/LocaleContext";
import { getDictionary } from "@/i18n/getDictionary";
import { isValidLocale, defaultLocale, locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { LayoutShell } from "@/components/layout/LayoutShell";

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
    keywords:
      "ORYN peptides, research peptides, peptide labs, BPC-157, TB-500, NAD+, tirzepatide, peptide pen, European biotech, GLP-1, GHK-CU, CJC-1295, Ipamorelin, Glutathione",
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      siteName: "ORYN Peptide Labs",
      type: "website",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "ORYN - Precision Peptide Science",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      images: ["/images/og-image.png"],
    },
    icons: {
      icon: "/images/favicon-source.png",
      apple: "/images/favicon-source.png",
    },
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
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
      <body className="font-grotesk antialiased bg-oryn-white text-oryn-black">
        <LocaleProvider locale={locale} dictionary={dictionary}>
          <LayoutShell>{children}</LayoutShell>
        </LocaleProvider>
      </body>
    </html>
  );
}
