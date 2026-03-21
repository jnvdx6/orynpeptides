import type { Metadata } from "next";
import { locales } from "@/i18n/config";
import { springCampaign } from "@/data/campaigns";
import { SITE_URL, breadcrumbSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { CampaignLandingPage } from "@/components/campaign/CampaignLandingPage";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = springCampaign;

  return {
    title: c.seo.title,
    description: c.seo.description,
    openGraph: {
      title: c.seo.title,
      description: c.seo.description,
      url: `${SITE_URL}/${locale}/${c.slug}`,
      type: "website",
      images: [
        {
          url: c.seo.ogImage || `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: c.seo.title,
      description: c.seo.description,
      images: [c.seo.ogImage || `${SITE_URL}/opengraph-image`],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/${c.slug}`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/${c.slug}`])
        ),
        "x-default": `${SITE_URL}/en/${c.slug}`,
      },
    },
  };
}

export default async function SpringRenewalPage({
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
            { name: springCampaign.name, url: `/${locale}/${springCampaign.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${SITE_URL}/${locale}/${springCampaign.slug}`,
            name: springCampaign.seo.title,
            description: springCampaign.seo.description,
            url: `${SITE_URL}/${locale}/${springCampaign.slug}`,
            isPartOf: { "@type": "WebSite", url: SITE_URL },
          },
          {
            "@context": "https://schema.org",
            "@type": "SaleEvent",
            name: `ORYN ${springCampaign.name} — ${springCampaign.subtitle}`,
            description: springCampaign.description,
            startDate: springCampaign.startDate,
            endDate: springCampaign.endDate,
            url: `${SITE_URL}/${locale}/${springCampaign.slug}`,
            organizer: {
              "@type": "Organization",
              name: "ORYN Peptide Labs",
              url: SITE_URL,
            },
            offers: springCampaign.promos.map((p) => ({
              "@type": "Offer",
              name: p.code,
              description: p.description,
              discount: `${p.discountValue}%`,
            })),
          },
        ]}
      />
      <CampaignLandingPage campaign={springCampaign} />
    </>
  );
}
