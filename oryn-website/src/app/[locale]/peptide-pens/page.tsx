import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products, productImages } from "@/data/products";
import { EUROPEAN_COUNTRIES } from "@/data/european-countries";
import { SITE_URL, breadcrumbSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { TrustBanner } from "@/components/seo/TrustBanner";
import { PageTracker } from "@/components/analytics/PageTracker";
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
  const isEs = locale === "es";

  const title = isEs
    ? "Comprar Plumas de Péptidos en Europa | Envío Rápido EU | ORYN"
    : "Buy Peptide Pens Online — UK & Europe Delivery | ORYN Peptide Labs";
  const description = isEs
    ? "Plumas de péptidos premezcladas con pureza >99%. BPC-157, TB-500, Tirzepatide, NAD+, GHK-Cu. Fabricación GMP, envío rápido a toda Europa. Desde €99."
    : "Pre-mixed peptide pens with >99% purity. BPC-157, TB-500, Tirzepatide, NAD+, GHK-Cu & more. GMP manufactured, next-day UK & fast EU delivery. From €99.";

  return {
    title,
    description,
    openGraph: {
      title: isEs
        ? "Plumas de Péptidos — ORYN"
        : "Peptide Pens — Buy Online UK & Europe | ORYN",
      description,
      url: `${SITE_URL}/${locale}/peptide-pens`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/peptide-pens`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/peptide-pens`])
      ),
    },
  };
}

const PEN_ADVANTAGES = [
  {
    title: "No Reconstitution",
    desc: "Pre-mixed and ready to use. No bacteriostatic water, no calculations, no syringes.",
  },
  {
    title: "Precise Dosing",
    desc: "Factory-calibrated dial mechanism with <2% variance. Every click delivers the exact same dose.",
  },
  {
    title: "30-Day Supply",
    desc: "Each pen contains a full 30-day research protocol. One pen, one month, zero waste.",
  },
  {
    title: ">99% Purity",
    desc: "Every batch independently verified by HPLC and mass spectrometry. GMP manufactured in EU facilities.",
  },
  {
    title: "Next-Day UK Delivery",
    desc: "Order before 2pm for next business day delivery. 3-5 days across Europe with tracked shipping.",
  },
  {
    title: "Temperature-Controlled",
    desc: "Shipped in insulated packaging to maintain peptide integrity from our facility to your door.",
  },
];

const TOP_EU_COUNTRIES = EUROPEAN_COUNTRIES.filter((c) =>
  ["germany", "france", "spain", "netherlands", "italy", "sweden", "austria", "belgium", "portugal", "ireland"].includes(c.slug)
);

export default async function PeptidePensPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currency = "€";

  const peptidePens = products.filter((p) => p.category === "peptide-pen");
  const meditPens = products.filter((p) => p.category === "medit-pen");
  const novadose = products.filter((p) => p.category === "novadose");

  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: `/${locale}` },
      { name: "Peptide Pens", url: `/${locale}/peptide-pens` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "ORYN Peptide Pens",
      description:
        "Pre-mixed research-grade peptide pens with >99% purity. Next-day UK delivery, fast EU shipping.",
      url: `${SITE_URL}/${locale}/peptide-pens`,
      publisher: {
        "@type": "Organization",
        name: "ORYN Peptide Labs",
        url: SITE_URL,
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: products.length,
        itemListElement: products.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: `${SITE_URL}/${locale}/products/${p.slug}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a peptide pen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A peptide pen is a pre-mixed, dial-a-dose injection device containing research-grade peptides. Unlike traditional vials that require reconstitution with bacteriostatic water and syringe measurement, peptide pens come ready to use with factory-calibrated dosing.",
          },
        },
        {
          "@type": "Question",
          name: "How do peptide pens work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ORYN peptide pens use a dial-a-dose mechanism similar to insulin pens. You attach a sterile needle, turn the dose selector to your desired amount (each click is calibrated), inject subcutaneously, and hold for 10 seconds. The entire process takes about 90 seconds.",
          },
        },
        {
          "@type": "Question",
          name: "Are peptide pens better than vials?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For most researchers, yes. Peptide pens eliminate reconstitution errors, provide more accurate dosing (<2% variance vs ~10% with manual syringes), reduce contamination risk, and are significantly more convenient. Each ORYN pen contains a 30-day supply.",
          },
        },
        {
          "@type": "Question",
          name: "Does ORYN deliver peptide pens to Europe?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. ORYN delivers to 30+ European countries with tracked shipping. UK orders arrive next business day, and European deliveries take 3-5 business days. As an EU-based operation, there are no customs fees or import duties for EU customers.",
          },
        },
      ],
    },
  ];

  return (
    <>
      <MultiJsonLd items={schemas} />
      <PageTracker pageName="peptide_pens" />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">PEPTIDE PENS</span>
          </nav>
        </div>

        <TrustBanner />

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                PRE-MIXED &middot; READY TO USE &middot; PRECISION DOSED
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.1]">
              Peptide Pens
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl mb-8">
              The modern standard for peptide research. Pre-mixed, GMP
              manufactured, &gt;99% purity. No reconstitution, no
              calculations — just precise, reliable dosing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-oryn-orange text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange/90 transition-colors"
              >
                SHOP ALL PENS
              </Link>
              <Link
                href={`/${locale}/learn/what-is-a-peptide-pen`}
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-xs font-medium tracking-[0.15em] hover:border-oryn-orange/50 transition-colors"
              >
                LEARN MORE
              </Link>
            </div>
          </div>
        </section>

        {/* Why Peptide Pens */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-oryn-orange" />
            <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
              THE PEN ADVANTAGE
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-10">
            Why Choose Peptide Pens Over Vials?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PEN_ADVANTAGES.map((adv) => (
              <div
                key={adv.title}
                className="border border-oryn-grey/10 p-6 hover:border-oryn-orange/20 transition-colors"
              >
                <h3 className="text-sm font-bold mb-2">{adv.title}</h3>
                <p className="text-xs text-oryn-black/50 font-plex leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Peptide Pen Range */}
        <section className="bg-oryn-cream py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                ORYN PEPTIDE PENS
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-8">
              Standard Peptide Pen Range
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {peptidePens.map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/products/${product.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                >
                  <div className="bg-white p-6 flex items-center justify-center min-h-[160px]">
                    <Image
                      src={productImages.bySlug[product.slug] || product.image}
                      alt={`ORYN ${product.name} Peptide Pen`}
                      width={120}
                      height={120}
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4 border-t border-oryn-grey/5">
                    <h3 className="text-base font-bold mb-0.5">{product.name}</h3>
                    <p className="text-[10px] text-oryn-black/40 font-plex mb-2">
                      {product.subtitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-oryn-orange">
                        {currency}{product.price}
                      </span>
                      <span className="text-[9px] font-mono text-oryn-black/30">
                        {product.dosage}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* MediT + NovaDose */}
        {(meditPens.length > 0 || novadose.length > 0) && (
          <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                ADVANCED SYSTEMS
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-8">
              MediT &amp; NovaDose Pens
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...meditPens, ...novadose].map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/products/${product.slug}`}
                  className="border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group flex items-center gap-6 p-6"
                >
                  <div className="w-24 h-24 flex items-center justify-center shrink-0">
                    <Image
                      src={productImages.bySlug[product.slug] || product.image}
                      alt={`ORYN ${product.name}`}
                      width={90}
                      height={90}
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono text-oryn-orange tracking-[0.15em]">
                      {product.categoryLabel.toUpperCase()}
                    </span>
                    <h3 className="text-lg font-bold mt-1 mb-1">{product.name}</h3>
                    <p className="text-xs text-oryn-black/40 font-plex mb-2">
                      {product.subtitle}
                    </p>
                    <span className="text-xl font-bold text-oryn-orange">
                      {currency}{product.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* European Delivery */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                EU-WIDE SHIPPING
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-3">
              Peptide Pens Delivered Across Europe
            </h2>
            <p className="text-sm text-white/50 font-plex mb-8 max-w-2xl">
              ORYN ships from EU GMP-certified facilities to 30+ countries with
              tracked delivery. No customs fees, no import duties for EU customers.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {TOP_EU_COUNTRIES.map((country) => (
                <Link
                  key={country.slug}
                  href={`/${locale}/peptides/europe/${country.slug}`}
                  className="p-4 border border-white/10 hover:border-oryn-orange/40 transition-colors"
                >
                  <div className="text-sm font-bold">{country.name}</div>
                  <div className="text-[9px] font-mono text-white/30 mt-1">
                    {country.deliveryDays} DAYS
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href={`/${locale}/peptides/europe`}
                className="text-xs font-mono text-oryn-orange tracking-[0.1em] hover:text-white transition-colors"
              >
                VIEW ALL 30 EUROPEAN COUNTRIES &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8">
            Frequently Asked Questions About Peptide Pens
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What is a peptide pen?",
                a: "A peptide pen is a pre-mixed, dial-a-dose injection device containing research-grade peptides. Unlike traditional vials that require reconstitution with bacteriostatic water and syringe measurement, peptide pens come ready to use with factory-calibrated dosing. ORYN peptide pens are manufactured in EU GMP-certified facilities with >99% purity.",
              },
              {
                q: "How do I use a peptide pen?",
                a: "Remove the pen from refrigerator 15 minutes before use. Attach a sterile needle, prime by dialling 2 units and pressing until a droplet appears. Dial your desired dose, clean the injection site, insert at 45-90° angle, press the plunger, hold 10 seconds, then withdraw. The entire process takes about 90 seconds.",
              },
              {
                q: "Are peptide pens better than vials?",
                a: "For most researchers, yes. Peptide pens eliminate reconstitution errors, provide more accurate dosing (<2% variance vs ~10% with manual syringes), reduce contamination risk through a sealed cartridge system, and are far more convenient. Each ORYN pen contains a 30-day supply.",
              },
              {
                q: "How long does a peptide pen last?",
                a: "Each ORYN peptide pen contains a 30-day supply when used at the standard daily research dose. Unopened pens should be stored refrigerated (2-8°C). Once in use, pens remain stable for the full 30-day period when stored correctly.",
              },
              {
                q: "Can I buy peptide pens in Europe?",
                a: "Yes. ORYN delivers peptide pens to 30+ European countries from EU-based facilities. UK orders arrive next business day, EU orders within 3-5 business days. No customs fees or import duties apply for EU customers.",
              },
              {
                q: "How much do peptide pens cost?",
                a: "ORYN peptide pens range from €99 (Glutathione) to €299 (NovaDose NAD+). Standard peptide pens start at €99-€139. Each pen contains a full 30-day supply, making the per-dose cost very competitive with traditional vials.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group border border-oryn-grey/20 open:border-oryn-orange/20"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-oryn-cream/50 transition-colors">
                  <h3 className="text-sm font-bold pr-4">{faq.q}</h3>
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
                  <p className="text-xs text-oryn-black/60 font-plex leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related Guides */}
        <section className="bg-oryn-cream py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-lg font-bold mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "What Is a Peptide Pen?",
                  slug: "what-is-a-peptide-pen",
                },
                {
                  title: "Peptide Pen vs Vial: Complete Comparison",
                  slug: "peptide-pen-vs-vial",
                },
                {
                  title: "How to Use a Peptide Pen",
                  slug: "how-to-use-peptide-pen",
                },
              ].map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/${locale}/learn/${guide.slug}`}
                  className="p-5 border border-oryn-grey/10 bg-white hover:border-oryn-orange/20 transition-all group"
                >
                  <span className="text-[9px] font-mono text-oryn-orange tracking-[0.15em]">
                    GUIDE
                  </span>
                  <h3 className="text-sm font-bold mt-1 group-hover:text-oryn-orange transition-colors">
                    {guide.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Try Peptide Pens?
            </h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              Premium pre-mixed peptide pens. Next-day UK delivery. Fast EU
              shipping. GMP manufactured with &gt;99% purity guaranteed.
            </p>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
            >
              SHOP ALL PEPTIDE PENS
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
