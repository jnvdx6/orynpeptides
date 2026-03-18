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
    title: "Research Disclaimer | ORYN Peptide Labs — For Research Use Only",
    description: "ORYN Peptide Labs research disclaimer. All products are sold for in-vitro research and laboratory use only. Not for human or animal consumption.",
    alternates: {
      canonical: `${SITE_URL}/${locale}/disclaimer`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/disclaimer`])
        ),
        "x-default": `${SITE_URL}/en/disclaimer`,
      },
    },
  };
}

export default async function DisclaimerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.disclaimerPage;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.breadcrumbs.home, url: `/${locale}` },
          { name: dict.breadcrumbs.disclaimer, url: `/${locale}/disclaimer` },
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
            <div className="p-6 bg-oryn-orange/5 border border-oryn-orange/10 mb-8">
              <h2 className="text-lg font-bold text-oryn-orange mb-2">{t.alertTitle}</h2>
              <p className="text-sm text-oryn-black/70">{t.alertContent}</p>
            </div>

            {t.sections.map((section, idx) => (
              <div key={section.heading}>
                <h2 className="text-lg font-bold text-oryn-black mt-8">{section.heading}</h2>
                {idx === 1 ? (
                  <>
                    <p>{t.buyerResponsibilityIntro}</p>
                    <ul className="list-disc pl-6 space-y-2">
                      {t.buyerResponsibilityItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>{section.content}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
