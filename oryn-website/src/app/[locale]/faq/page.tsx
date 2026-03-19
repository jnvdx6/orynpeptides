import type { Metadata } from "next";
import Link from "next/link";
import { FAQ_HUBS } from "@/data/faq-hubs";
import { getLocalizedFAQHub } from "@/data/faq-hubs-i18n";
import { breadcrumbSchema, faqSchema, COMPREHENSIVE_PEPTIDE_FAQS, SITE_URL } from "@/lib/seo";
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
  const title = "Frequently Asked Questions | ORYN Peptide Labs";
  const description =
    "Browse all FAQ hubs covering ORYN peptide products and research topics. Find answers about BPC-157, TB-500, Tirzepatide, peptide storage, dosing protocols, and more.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/faq`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/faq`])
        ),
        "x-default": `${SITE_URL}/en/faq`,
      },
    },
  };
}

const productHubs = FAQ_HUBS.filter((h) => h.type === "product");
const topicHubs = FAQ_HUBS.filter((h) => h.type === "topic");

const sections = [
  { label: "PRODUCT FAQS", hubs: productHubs },
  { label: "TOPIC FAQS", hubs: topicHubs },
];

export default async function FAQIndexPage({
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
            { name: dict.breadcrumbs.faq, url: `/${locale}/faq` },
          ]),
          faqSchema(COMPREHENSIVE_PEPTIDE_FAQS),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${SITE_URL}/${locale}/faq`,
            name: "Frequently Asked Questions — ORYN Peptide Labs",
            description: "Browse all FAQ hubs covering ORYN peptide products and research topics.",
            url: `${SITE_URL}/${locale}/faq`,
            isPartOf: { "@type": "WebSite", url: SITE_URL },
            mainEntity: {
              "@type": "FAQPage",
              name: "ORYN Peptide Labs FAQ",
            },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["h1", ".hero-subtitle"],
            },
          },
        ]}
      />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">FAQ</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                KNOWLEDGE BASE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Frequently Asked
              <br />
              Questions
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl">
              Browse our FAQ hubs for detailed answers about ORYN peptide products,
              research protocols, storage, quality testing, and more.
            </p>
          </div>
        </section>

        {/* FAQ Hubs by Type */}
        {sections.map((section) => (
          <section key={section.label} className="py-12 border-b border-oryn-grey/10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[9px] font-mono px-2.5 py-1 rounded-full tracking-[0.1em] bg-oryn-orange/10 text-oryn-orange">
                  {section.label}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.hubs.map((hub) => {
                  const t = getLocalizedFAQHub(hub.slug, locale as Locale);
                  return (
                    <Link
                      key={hub.slug}
                      href={`/${locale}/faq/${hub.slug}`}
                      className="group border border-oryn-grey/15 hover:border-oryn-orange/30 transition-all p-6"
                    >
                      <h3 className="text-lg font-bold mb-2 group-hover:text-oryn-orange transition-colors">
                        {t?.title ?? hub.title}
                      </h3>
                      <p className="text-xs text-oryn-black/50 font-plex mb-4 line-clamp-2">
                        {t?.metaDescription ?? hub.metaDescription}
                      </p>
                      <div className="flex items-center gap-4 text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">
                        <span>{hub.faqs.length} QUESTION{hub.faqs.length !== 1 ? "S" : ""}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-[10px] text-white/40 font-mono tracking-[0.1em] mb-8">
              FOR RESEARCH PURPOSES ONLY
            </p>
            <Link
              href={`/${locale}/products`}
              className="px-8 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
            >
              EXPLORE OUR PEPTIDES
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
