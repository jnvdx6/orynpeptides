import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { COMPARISONS } from "@/data/comparisons";
import { getProductBySlug as getProduct, productImages } from "@/data/products";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { PageTracker } from "@/components/analytics/PageTracker";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  const title = isEs
    ? "Comparaciones de Péptidos | ORYN — Guías de Investigación"
    : "Peptide Comparisons | ORYN — Head-to-Head Research Guides";
  const description = isEs
    ? "Compara péptidos de investigación lado a lado. BPC-157 vs TB-500, Tirzepatide vs Semaglutide, CJC-1295 vs Ipamorelin y más. Datos clínicos y precios."
    : "Compare research peptides head-to-head. BPC-157 vs TB-500, Tirzepatide vs Semaglutide, CJC-1295 vs Ipamorelin & more. Clinical data, mechanisms & pricing.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/compare`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/compare`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/compare`])
      ),
    },
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const currency = "€";

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.compare, url: `/${locale}/compare` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "ORYN Peptide Comparisons",
            numberOfItems: COMPARISONS.length,
            itemListElement: COMPARISONS.map((comp, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/${locale}/compare/${comp.slug}`,
              name: comp.title,
            })),
          },
        ]}
      />

      <PageTracker pageName="compare" />
      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">COMPARE PEPTIDES</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-gradient text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-molecular-grid-orange opacity-20" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-white/40" />
              <span className="text-[10px] font-mono text-white/70 tracking-[0.25em]">
                HEAD-TO-HEAD GUIDES
              </span>
              <div className="w-8 h-[2px] bg-white/40" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Peptide Comparisons
            </h1>
            <p className="text-white/60 font-plex max-w-2xl mx-auto text-lg">
              In-depth, side-by-side analysis of the most popular research peptides.
              Mechanisms, clinical data, pricing, and which to choose for your research.
            </p>
          </div>
        </section>

        {/* Comparison Cards */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="space-y-8">
            {COMPARISONS.map((comp) => {
              const pA = getProduct(comp.productA);
              const pB = getProduct(comp.productB);
              if (!pA || !pB) return null;

              const winsA = comp.categories.filter((c) => c.winner === "A").length;
              const winsB = comp.categories.filter((c) => c.winner === "B").length;
              const ties = comp.categories.filter((c) => c.winner === "tie").length;

              return (
                <Link
                  key={comp.slug}
                  href={`/${locale}/compare/${comp.slug}`}
                  className="block border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch">
                    {/* Product A */}
                    <div className="flex items-center gap-4 p-6">
                      <div className="w-20 h-20 bg-oryn-cream/50 flex items-center justify-center shrink-0">
                        <Image
                          src={productImages.bySlug[pA.slug] || pA.image}
                          alt={`ORYN ${pA.name}`}
                          width={56}
                          height={56}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">ORYN {pA.name}</h3>
                        <p className="text-[10px] font-mono text-oryn-black/40 mt-0.5">{pA.dosage} · {pA.volume}</p>
                        <p className="text-lg font-bold text-oryn-orange mt-1">{currency}{pA.price}</p>
                      </div>
                    </div>

                    {/* VS Badge */}
                    <div className="flex items-center justify-center px-6 py-3 md:py-0">
                      <div className="w-12 h-12 bg-oryn-black flex items-center justify-center">
                        <span className="text-xs font-bold text-white tracking-widest">VS</span>
                      </div>
                    </div>

                    {/* Product B */}
                    <div className="flex items-center gap-4 p-6">
                      <div className="w-20 h-20 bg-oryn-cream/50 flex items-center justify-center shrink-0">
                        <Image
                          src={productImages.bySlug[pB.slug] || pB.image}
                          alt={`ORYN ${pB.name}`}
                          width={56}
                          height={56}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">ORYN {pB.name}</h3>
                        <p className="text-[10px] font-mono text-oryn-black/40 mt-0.5">{pB.dosage} · {pB.volume}</p>
                        <p className="text-lg font-bold text-oryn-orange mt-1">{currency}{pB.price}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="border-t border-oryn-grey/10 px-6 py-4 flex items-center justify-between bg-oryn-cream/30 group-hover:bg-oryn-cream/60 transition-colors">
                    <div>
                      <h2 className="text-sm font-bold group-hover:text-oryn-orange transition-colors">{comp.title}</h2>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-[9px] font-mono text-oryn-black/30">
                          {pA.name}: {winsA} wins
                        </span>
                        <span className="text-[9px] font-mono text-oryn-black/30">
                          {pB.name}: {winsB} wins
                        </span>
                        <span className="text-[9px] font-mono text-oryn-black/30">
                          {ties} ties
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-oryn-orange">
                      <span className="text-[10px] font-mono tracking-[0.1em]">READ COMPARISON</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Why Compare Section */}
        <section className="py-16 bg-oryn-cream border-t border-oryn-orange/10">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Why Compare Peptides?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                  title: "Evidence-Based",
                  desc: "Every comparison is backed by published clinical research and peer-reviewed data.",
                },
                {
                  icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                  title: "Price Transparent",
                  desc: "Clear pricing breakdowns so you know exactly what each research protocol costs.",
                },
                {
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                  title: "Actionable",
                  desc: "Clear verdicts and recommendations based on your specific research goals.",
                },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="w-12 h-12 bg-oryn-orange/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold mb-2">{item.title}</h3>
                  <p className="text-xs text-oryn-black/50 font-plex">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-oryn-black text-white text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
            <p className="text-sm text-white/50 font-plex mb-8">
              Our team can help you select the right peptides for your research. Contact us for personalised guidance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/${locale}/products`}
                className="px-8 py-3 bg-oryn-orange text-white text-sm font-bold tracking-wide hover:bg-oryn-orange-dark transition-colors"
              >
                VIEW ALL PRODUCTS
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="px-8 py-3 border border-white/20 text-white text-sm font-bold tracking-wide hover:border-oryn-orange transition-colors"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
