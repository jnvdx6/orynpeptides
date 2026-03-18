import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FAQ_HUBS, FAQ_HUB_SLUGS, getFAQHubBySlug } from "@/data/faq-hubs";
import { getLocalizedFAQHub } from "@/data/faq-hubs-i18n";
import { faqSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

// ─── Static Params ────────────────────────────────────────────────
export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    FAQ_HUB_SLUGS.map((slug) => ({ locale, slug }))
  );
}

// ─── Metadata ─────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const hub = getFAQHubBySlug(slug);
  if (!hub) return {};

  const t = getLocalizedFAQHub(slug, locale as Locale);
  const metaTitle = t?.metaTitle ?? hub.metaTitle;
  const metaDescription = t?.metaDescription ?? hub.metaDescription;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${SITE_URL}/${locale}/faq/${slug}`,
      type: "website",
      images: [
        { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 },
      ],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/faq/${slug}`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/faq/${slug}`])
        ),
        "x-default": `${SITE_URL}/en/faq/${slug}`,
      },
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────
export default async function FAQHubPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const hub = getFAQHubBySlug(slug);
  if (!hub) notFound();

  const t = getLocalizedFAQHub(slug, locale as Locale);
  const displayTitle = t?.title ?? hub.title;
  const displayIntroduction = t?.introduction ?? hub.introduction;
  const displayFaqs = t?.faqs ?? hub.faqs;

  const otherHubs = FAQ_HUBS.filter((h) => h.slug !== hub.slug).slice(0, 6);
  const isProduct = hub.type === "product";

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.faq, url: `/${locale}/faq` },
            { name: displayTitle, url: `/${locale}/faq/${slug}` },
          ]),
          faqSchema(displayFaqs),
        ]}
      />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <span className="hover:text-oryn-orange transition-colors">FAQ</span>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange truncate max-w-[250px]">
              {displayTitle.toUpperCase()}
            </span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                {isProduct ? "PRODUCT FAQ" : "TOPIC FAQ"}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              {displayTitle}
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl">
              {displayIntroduction}
            </p>
          </div>
        </section>

        {/* FAQ List */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-oryn-orange" />
            <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
              {displayFaqs.length} QUESTIONS ANSWERED
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-8">
            All Questions
          </h2>
          <div className="space-y-4">
            {displayFaqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-oryn-grey/20 open:border-oryn-orange/20"
                {...(i === 0 ? { open: true } : {})}
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-oryn-cream/50 transition-colors">
                  <h3 className="text-sm font-bold pr-4">{faq.question}</h3>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0 text-oryn-orange group-open:rotate-45 transition-transform"
                  >
                    <path d="M12 5v14m-7-7h14" />
                  </svg>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm text-oryn-black/60 font-plex leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related Links */}
        {(hub.relatedProductSlug || hub.relatedCategorySlug) && (
          <section className="bg-oryn-cream py-12 border-t border-oryn-orange/10">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-lg font-bold mb-4">Related</h2>
              <div className="flex flex-wrap gap-3">
                {hub.relatedProductSlug && (
                  <Link
                    href={`/${locale}/products/${hub.relatedProductSlug}`}
                    className="px-5 py-3 bg-white border border-oryn-grey/20 hover:border-oryn-orange/30 text-sm font-medium transition-all"
                  >
                    View {hub.relatedProductSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} Product →
                  </Link>
                )}
                {hub.relatedCategorySlug && (
                  <Link
                    href={`/${locale}/peptides-for/${hub.relatedCategorySlug}`}
                    className="px-5 py-3 bg-white border border-oryn-grey/20 hover:border-oryn-orange/30 text-sm font-medium transition-all"
                  >
                    Browse {hub.relatedCategorySlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} Peptides →
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Other FAQ Hubs */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">MORE FAQ TOPICS</span>
            </div>
            <h2 className="text-2xl font-bold mb-8">Explore Other FAQs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherHubs.map((h) => {
                const ht = getLocalizedFAQHub(h.slug, locale as Locale);
                return (
                  <Link
                    key={h.slug}
                    href={`/${locale}/faq/${h.slug}`}
                    className="p-5 border border-oryn-grey/15 hover:border-oryn-orange/30 transition-all group"
                  >
                    <span className="text-[8px] font-mono text-oryn-orange tracking-[0.15em]">
                      {h.type === "product" ? "PRODUCT" : "TOPIC"}
                    </span>
                    <h3 className="text-sm font-bold mt-1 mb-2 group-hover:text-oryn-orange transition-colors">
                      {ht?.title ?? h.title}
                    </h3>
                    <p className="text-xs text-oryn-black/50 font-plex line-clamp-2">
                      {ht?.metaDescription ?? h.metaDescription}
                    </p>
                    <span className="text-[9px] font-mono text-oryn-black/30 mt-2 inline-block">
                      {h.faqs.length} questions
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              Our team is here to help. Contact us for expert guidance on peptide research.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="px-8 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
              >
                CONTACT US
              </Link>
              <Link
                href={`/${locale}/products`}
                className="px-8 py-4 border border-white/30 text-white font-medium text-xs tracking-[0.2em] hover:border-white transition-colors"
              >
                SHOP PEPTIDES
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
