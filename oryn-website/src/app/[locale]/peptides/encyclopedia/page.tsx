import type { Metadata } from "next";
import Link from "next/link";
import { PEPTIDE_ENTRIES } from "@/data/peptide-encyclopedia";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales } from "@/i18n/config";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Peptide Encyclopedia | Scientific Guide to Research Peptides | ORYN";
  const description =
    "Comprehensive scientific encyclopedia of research peptides. Molecular profiles, mechanisms of action, published studies, and FAQs for BPC-157, TB-500, Tirzepatide, NAD+, GHK-Cu and more.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/peptides/encyclopedia`,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/peptides/encyclopedia`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/peptides/encyclopedia`])
      ),
    },
  };
}

export default async function EncyclopediaHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ORYN Peptide Encyclopedia",
    description:
      "Scientific encyclopedia covering the molecular profiles, mechanisms, and research behind ORYN peptide products.",
    numberOfItems: PEPTIDE_ENTRIES.length,
    itemListElement: PEPTIDE_ENTRIES.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.fullName,
      url: `${SITE_URL}/${locale}/peptides/encyclopedia/${entry.slug}`,
    })),
  };

  return (
    <>
      <MultiJsonLd
        items={[
          itemListSchema,
          breadcrumbSchema([
            { name: "Home", url: `/${locale}` },
            { name: "Peptide Encyclopedia", url: `/${locale}/peptides/encyclopedia` },
          ]),
        ]}
      />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">
              HOME
            </Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">PEPTIDE ENCYCLOPEDIA</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                SCIENTIFIC REFERENCE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Peptide Encyclopedia
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl">
              Comprehensive scientific profiles for every ORYN peptide. Molecular data, mechanisms
              of action, published research, and frequently asked questions — all in one reference.
            </p>
          </div>
        </section>

        {/* Peptide Grid */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PEPTIDE_ENTRIES.map((entry) => (
              <Link
                key={entry.slug}
                href={`/${locale}/peptides/encyclopedia/${entry.slug}`}
                className="group border border-oryn-grey/20 hover:border-oryn-orange/40 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-mono text-oryn-orange tracking-[0.2em]">
                      {entry.classification.toUpperCase()}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-oryn-black/20 group-hover:text-oryn-orange group-hover:translate-x-1 transition-all"
                    >
                      <path d="M5 12h14m-7-7l7 7-7 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-1 group-hover:text-oryn-orange transition-colors">
                    {entry.name}
                  </h2>
                  <p className="text-xs text-oryn-black/40 font-plex mb-4">{entry.fullName}</p>

                  {/* Molecular Info */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-oryn-grey/10">
                    <div>
                      <p className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em] mb-1">
                        FORMULA
                      </p>
                      <p className="text-xs font-mono text-oryn-black/70">
                        {entry.molecularFormula}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em] mb-1">
                        WEIGHT
                      </p>
                      <p className="text-xs font-mono text-oryn-black/70">
                        {entry.molecularWeight}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em] mb-1">
                        STUDIES
                      </p>
                      <p className="text-xs font-mono text-oryn-black/70">
                        {entry.keyStudies.length} cited
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse Products CTA */}
        <section className="bg-oryn-cream py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-3 mb-2">
                  <div className="w-6 h-px bg-oryn-orange" />
                  <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                    FROM SCIENCE TO PRODUCT
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  Explore ORYN Peptide Products
                </h2>
                <p className="text-sm text-oryn-black/60 font-plex leading-relaxed mb-6">
                  Every peptide in this encyclopedia is available as a precision-dosed ORYN pen
                  system. GMP manufactured, &gt;99% purity, pre-mixed and ready to use.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`/${locale}/products`}
                    className="px-8 py-4 bg-oryn-orange text-white text-xs font-medium tracking-[0.2em] hover:bg-oryn-orange/90 transition-colors"
                  >
                    SHOP ALL PEPTIDES
                  </Link>
                  <Link
                    href={`/${locale}/compare`}
                    className="px-8 py-4 border border-oryn-black/20 text-oryn-black text-xs font-medium tracking-[0.2em] hover:border-oryn-orange hover:text-oryn-orange transition-colors"
                  >
                    COMPARE PRODUCTS
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "8", sub: "Unique Molecules" },
                  { label: "10", sub: "Product Formats" },
                  { label: ">99%", sub: "Purity Standard" },
                  { label: "30+", sub: "Studies Cited" },
                ].map((stat) => (
                  <div
                    key={stat.sub}
                    className="bg-white p-5 border border-oryn-grey/10 text-center"
                  >
                    <p className="text-2xl font-bold text-oryn-orange">{stat.label}</p>
                    <p className="text-[10px] font-mono text-oryn-black/40 tracking-[0.1em] mt-1">
                      {stat.sub.toUpperCase()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Learn More */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold mb-6">Continue Your Research</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Learn Hub",
                desc: "Guides, dosing protocols, and peptide science articles.",
                href: `/${locale}/learn`,
              },
              {
                name: "Compare Peptides",
                desc: "Side-by-side comparison of ORYN peptide products.",
                href: `/${locale}/compare`,
              },
              {
                name: "Quality & Science",
                desc: "GMP manufacturing, purity testing, and quality assurance.",
                href: `/${locale}/quality`,
              },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="p-5 border border-oryn-grey/20 hover:border-oryn-orange/30 transition-colors group"
              >
                <h3 className="text-sm font-bold group-hover:text-oryn-orange transition-colors mb-2">
                  {link.name}
                </h3>
                <p className="text-xs text-oryn-black/50 font-plex">{link.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Science-Backed Peptide Pens</h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              Every ORYN peptide is supported by published research. Explore our full product range
              with next-day UK delivery.
            </p>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
            >
              SHOP ALL PEPTIDES
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
