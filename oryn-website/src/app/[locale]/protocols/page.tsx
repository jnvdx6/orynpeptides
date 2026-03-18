import type { Metadata } from "next";
import Link from "next/link";
import { PROTOCOLS } from "@/data/protocols";
import { getLocalizedProtocol } from "@/data/protocols-i18n";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
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
  const title = "Peptide Research Protocols | ORYN";
  const description =
    "Explore evidence-based peptide research protocol guides. Recovery stacks, anti-aging protocols, GH optimisation, metabolic research and more.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/protocols`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/protocols`])
        ),
        "x-default": `${SITE_URL}/en/protocols`,
      },
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  recovery: "bg-green-100 text-green-700",
  "anti-aging": "bg-purple-100 text-purple-700",
  performance: "bg-blue-100 text-blue-700",
  metabolic: "bg-amber-100 text-amber-700",
  wellness: "bg-cyan-100 text-cyan-700",
};

export default async function ProtocolsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const categories = ["recovery", "anti-aging", "performance", "metabolic", "wellness"];

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.protocols, url: `/${locale}/protocols` },
          ]),
        ]}
      />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">PROTOCOLS</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                RESEARCH PROTOCOLS
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Peptide Research
              <br />
              Protocol Guides
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl">
              Evidence-based research protocol guides for ORYN peptide pens.
              From recovery stacks to longevity protocols — understand how peptides
              work together for optimal research outcomes.
            </p>
          </div>
        </section>

        {/* Protocols by Category */}
        {categories.map((cat) => {
          const catProtocols = PROTOCOLS.filter((p) => p.category === cat);
          if (catProtocols.length === 0) return null;
          const catColor = CATEGORY_COLORS[cat] || "bg-gray-100 text-gray-700";
          return (
            <section key={cat} className="py-12 border-b border-oryn-grey/10">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`text-[9px] font-mono px-2.5 py-1 rounded-full tracking-[0.1em] ${catColor}`}>
                    {cat.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catProtocols.map((protocol) => {
                    const localized = getLocalizedProtocol(protocol.slug, locale as Locale);
                    return (
                    <Link
                      key={protocol.slug}
                      href={`/${locale}/protocols/${protocol.slug}`}
                      className="group border border-oryn-grey/15 hover:border-oryn-orange/30 transition-all p-6"
                    >
                      <h3 className="text-lg font-bold mb-2 group-hover:text-oryn-orange transition-colors">
                        {localized?.name ?? protocol.name}
                      </h3>
                      <p className="text-xs text-oryn-black/50 font-plex mb-4 line-clamp-2">
                        {localized?.subtitle ?? protocol.subtitle}
                      </p>
                      <div className="flex items-center gap-4 text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">
                        <span>{protocol.duration}</span>
                        <span>·</span>
                        <span>{protocol.productSlugs.length} PRODUCT{protocol.productSlugs.length > 1 ? "S" : ""}</span>
                      </div>
                    </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Explore All Peptide Pens</h2>
            <p className="text-[10px] text-white/40 font-mono tracking-[0.1em] mb-8">
              FOR RESEARCH PURPOSES ONLY
            </p>
            <Link
              href={`/${locale}/products`}
              className="px-8 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
            >
              SHOP ALL PEPTIDES
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
