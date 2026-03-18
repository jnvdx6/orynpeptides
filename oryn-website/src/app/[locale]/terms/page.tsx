import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Terms of Service | ORYN Peptide Labs",
    description: "ORYN Peptide Labs terms of service. Research use only policy, ordering, shipping, returns, and legal information for peptide purchases in the UK and Europe.",
    alternates: {
      canonical: `${SITE_URL}/${locale}/terms`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/terms`])
        ),
        "x-default": `${SITE_URL}/en/terms`,
      },
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.termsPage;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.breadcrumbs.home, url: `/${locale}` },
          { name: dict.breadcrumbs.terms, url: `/${locale}/terms` },
        ])}
      />
      <div className="pt-32 pb-16">
        <section className="py-16 bg-oryn-gradient text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-molecular-grid-orange opacity-20" />
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <span className="text-xs font-mono text-white/70 tracking-widest">{t.tagline}</span>
            <h1 className="text-4xl font-bold mt-4">{t.title}</h1>
          </div>
        </section>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <div className="prose prose-sm max-w-none font-plex text-oryn-black/70 space-y-6">
            <p className="text-xs font-mono text-oryn-black/40">{t.lastUpdated}</p>
            {t.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-lg font-bold text-oryn-black mt-8">{section.heading}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
