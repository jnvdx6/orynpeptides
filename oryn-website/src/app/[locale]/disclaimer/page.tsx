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
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/disclaimer`])
      ),
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
            <span className="text-xs font-mono text-white/70 tracking-widest">LEGAL</span>
            <h1 className="text-4xl font-bold mt-4">Research Disclaimer</h1>
          </div>
        </section>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <div className="prose prose-sm max-w-none font-plex text-oryn-black/70 space-y-6">
            <div className="p-6 bg-oryn-orange/5 border border-oryn-orange/10 mb-8">
              <h2 className="text-lg font-bold text-oryn-orange mb-2">Important Notice</h2>
              <p className="text-sm text-oryn-black/70">
                All products sold by ORYN Peptide Labs are strictly intended for
                laboratory research and scientific study. They are NOT intended for
                human or veterinary use, food additives, drugs, cosmetics, household
                chemicals, or any other form of consumption.
              </p>
            </div>

            <h2 className="text-lg font-bold text-oryn-black mt-8">Research Use Statement</h2>
            <p>ORYN Peptide Labs manufactures and distributes peptide compounds exclusively for in-vitro research, laboratory experimentation, and scientific investigation. All compounds are supplied as research chemicals with accompanying Certificates of Analysis (COA) for batch verification.</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">Buyer Responsibility</h2>
            <p>By purchasing from ORYN Peptide Labs, the buyer acknowledges and agrees that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Products will be used solely for legitimate research purposes</li>
              <li>The buyer is familiar with and compliant with all applicable regulations</li>
              <li>Products will not be resold for human consumption</li>
              <li>The buyer assumes all responsibility for proper handling and use</li>
              <li>The buyer is of legal age and represents a legitimate research entity</li>
            </ul>

            <h2 className="text-lg font-bold text-oryn-black mt-8">No Medical Claims</h2>
            <p>ORYN Peptide Labs makes no claims regarding the therapeutic, diagnostic, or preventive properties of any product. Product descriptions reference published scientific literature for informational purposes only and do not constitute medical advice or claims of efficacy.</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">Quality Assurance</h2>
            <p>All ORYN products are manufactured in GMP-certified, ISO Class 7 cleanroom facilities with third-party analytical validation. Purity levels exceed 99% as verified by HPLC analysis. Full batch documentation including COA, stability data, and DMF documentation is available upon request.</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">Regulatory Compliance</h2>
            <p>It is the buyer&apos;s responsibility to ensure compliance with all local, national, and international regulations regarding the purchase, import, possession, and use of research peptides. ORYN Peptide Labs operates under European regulatory frameworks.</p>
          </div>
        </section>
      </div>
    </>
  );
}
