import type { Metadata } from "next";
import Link from "next/link";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { breadcrumbSchema, faqSchema, SITE_URL } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { PeptideCalculator } from "@/components/tools/PeptideCalculator";
import { products } from "@/data/products";
import { PageTracker } from "@/components/analytics/PageTracker";

/* ─── Static Params ────────────────────────────────────────────────── */

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/* ─── Metadata ─────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  const title = isEs
    ? "Calculadora de Dosis de Peptidos | Reconstitution & Dosificacion | ORYN"
    : "Peptide Dosage Calculator | Reconstitution & Dosing Tool | ORYN UK";
  const description = isEs
    ? "Calculadora gratuita de reconstitution de peptidos. Calcula la concentracion, volumen de inyeccion y unidades de jeringa de insulina. Compatible con BPC-157, TB-500, CJC-1295 y mas."
    : "Free peptide reconstitution calculator. Work out concentration, injection volume and insulin syringe units for any peptide. Works with BPC-157, TB-500, Tirzepatide, CJC-1295 & more.";

  return {
    title,
    description,
    keywords: [
      "peptide calculator",
      "peptide reconstitution calculator",
      "peptide dosage calculator",
      "peptide dosage calculator UK",
      "how to reconstitute peptides",
      "peptide mixing calculator",
      "bac water calculator",
      "bacteriostatic water calculator",
      "insulin syringe units calculator",
      "peptide concentration calculator",
      "BPC-157 dosage calculator",
      "peptide injection calculator",
    ],
    openGraph: {
      title: isEs
        ? "Calculadora de Peptidos | ORYN"
        : "Peptide Dosage Calculator | ORYN UK",
      description,
      url: `${SITE_URL}/${locale}/tools/peptide-calculator`,
      type: "website",
      images: [
        { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isEs
        ? "Calculadora de Peptidos | ORYN"
        : "Peptide Dosage Calculator | ORYN UK",
      description: isEs
        ? "Calcula la dosis, concentracion y volumen de inyeccion de cualquier peptido."
        : "Calculate dose, concentration and injection volume for any peptide. Free online tool.",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/tools/peptide-calculator`,
      languages: Object.fromEntries(
        locales.map((l) => [
          l,
          `${SITE_URL}/${l}/tools/peptide-calculator`,
        ])
      ),
    },
  };
}

/* ─── FAQ Data ─────────────────────────────────────────────────────── */

const calculatorFaqs = [
  {
    question: "How do I reconstitute a peptide vial?",
    answer:
      "To reconstitute a peptide vial: (1) Clean the vial stopper with an alcohol swab. (2) Draw bacteriostatic water into a syringe. (3) Inject the water slowly down the inside wall of the vial - never spray directly onto the powder. (4) Gently swirl (do not shake) until the powder is fully dissolved. (5) Store the reconstituted peptide at 2-8 degrees Celsius and use within 30 days.",
  },
  {
    question: "How many units on an insulin syringe equal 1 mL?",
    answer:
      "A standard U-100 insulin syringe has 100 units per 1 mL. So 10 units = 0.1 mL, 25 units = 0.25 mL, 50 units = 0.5 mL, and 100 units = 1.0 mL. This is the most common syringe used for subcutaneous peptide injections.",
  },
  {
    question:
      "How much bacteriostatic water should I add to a peptide vial?",
    answer:
      "The amount of bacteriostatic water depends on the peptide amount and your desired concentration. Common choices are 1 mL, 2 mL, or 3 mL. More water means a lower concentration and a larger injection volume per dose, while less water means a higher concentration and smaller injection volume. Use the calculator above to find the optimal volume for your protocol.",
  },
  {
    question: "What is the difference between mg and mcg in peptide dosing?",
    answer:
      "1 milligram (mg) equals 1,000 micrograms (mcg). Peptide vials are typically labelled in milligrams (e.g. 5 mg, 10 mg), while individual doses are usually measured in micrograms (e.g. 250 mcg, 500 mcg). Always check whether your dose is in mg or mcg to avoid dosing errors.",
  },
  {
    question:
      "How do I calculate the concentration of a reconstituted peptide?",
    answer:
      "Divide the total peptide amount (in mcg) by the total water volume (in mL). For example, a 10 mg vial (10,000 mcg) reconstituted with 2 mL of bacteriostatic water gives a concentration of 5,000 mcg/mL. To find the injection volume for a 250 mcg dose: 250 / 5,000 = 0.05 mL = 5 units on an insulin syringe.",
  },
];

/* ─── HowTo Schema ─────────────────────────────────────────────────── */

function reconstitutionHowToSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Reconstitute Peptides with Bacteriostatic Water",
    description:
      "Step-by-step guide to reconstituting lyophilised peptide powder with bacteriostatic water for research use.",
    url: `${SITE_URL}/${locale}/tools/peptide-calculator`,
    image: `${SITE_URL}/opengraph-image`,
    totalTime: "PT5M",
    supply: [
      { "@type": "HowToSupply", name: "Lyophilised peptide vial" },
      {
        "@type": "HowToSupply",
        name: "Bacteriostatic water (BAC water)",
      },
      { "@type": "HowToSupply", name: "Alcohol swabs" },
      { "@type": "HowToSupply", name: "Insulin syringe (U-100)" },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Sharps container for safe needle disposal",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Gather your supplies",
        text: "Collect your lyophilised peptide vial, bacteriostatic water, alcohol swabs, and an insulin syringe. Ensure everything is sterile and within its expiry date.",
        url: `${SITE_URL}/${locale}/tools/peptide-calculator#step-1`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Clean the vial stoppers",
        text: "Wipe the rubber stoppers of both the peptide vial and the bacteriostatic water vial with alcohol swabs. Allow to air dry for 10 seconds.",
        url: `${SITE_URL}/${locale}/tools/peptide-calculator#step-2`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Draw bacteriostatic water",
        text: "Using the calculator above, determine how much BAC water you need. Draw that amount into an insulin syringe from the bacteriostatic water vial.",
        url: `${SITE_URL}/${locale}/tools/peptide-calculator#step-3`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Add water to the peptide vial",
        text: "Insert the needle into the peptide vial and slowly release the water down the inside wall of the vial. Do not spray directly onto the lyophilised powder as this can damage the peptide.",
        url: `${SITE_URL}/${locale}/tools/peptide-calculator#step-4`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Mix gently and store",
        text: "Gently swirl the vial until the powder is fully dissolved. Do not shake vigorously. Label the vial with the date and concentration, then store at 2-8 degrees Celsius. Use within 30 days of reconstitution.",
        url: `${SITE_URL}/${locale}/tools/peptide-calculator#step-5`,
      },
    ],
  };
}

/* ─── Page Component ───────────────────────────────────────────────── */

export default async function PeptideCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  // Select a few featured products to link to
  const featuredSlugs = [
    "bpc-157",
    "tb-500",
    "cjc-1295",
    "ipamorelin",
    "tirzepatide-pen",
    "ghk-cu",
  ];
  const featuredProducts = products.filter((p) =>
    featuredSlugs.includes(p.slug)
  );

  return (
    <>
      {/* ─── JSON-LD Schemas ──────────────────────────── */}
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.tools, url: `/${locale}/tools/peptide-calculator` },
            {
              name: dict.breadcrumbs.peptideCalculator,
              url: `/${locale}/tools/peptide-calculator`,
            },
          ]),
          faqSchema(calculatorFaqs),
          reconstitutionHowToSchema(locale),
        ]}
      />

      <PageTracker pageName="peptide_calculator" />
      <div className="pt-[calc(1rem+4px)]">
        {/* ─── Breadcrumb ─────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link
              href={`/${locale}`}
              className="hover:text-oryn-orange transition-colors"
            >
              HOME
            </Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">PEPTIDE CALCULATOR</span>
          </nav>
        </div>

        {/* ─── Hero ───────────────────────────────────── */}
        <section className="bg-oryn-black text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                FREE ONLINE TOOL
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Peptide Reconstitution
              <br />
              <span className="text-gradient-orange">
                &amp; Dosage Calculator
              </span>
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl leading-relaxed">
              Calculate the exact concentration, injection volume and insulin
              syringe units for any peptide. Works with BPC-157, TB-500,
              CJC-1295, Ipamorelin, Tirzepatide, GHK-Cu and more.
            </p>
          </div>
        </section>

        {/* ─── Calculator ─────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-10 mb-16">
          <PeptideCalculator />
        </section>

        {/* ─── How Reconstitution Works ───────────────── */}
        <section className="max-w-5xl mx-auto px-6 py-16" id="how-to-reconstitute">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-oryn-orange" />
            <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
              STEP-BY-STEP GUIDE
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            How to Reconstitute Peptides
          </h2>
          <p className="text-base text-oryn-black/50 font-plex max-w-2xl mb-10">
            Reconstitution is the process of dissolving lyophilised (freeze-dried)
            peptide powder with bacteriostatic water (BAC water) to create an
            injectable solution. Follow these steps for a safe, sterile process.
          </p>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Gather Your Supplies",
                desc: "You will need your lyophilised peptide vial, a vial of bacteriostatic water, alcohol swabs, and a U-100 insulin syringe. Make sure everything is sealed, sterile and within its use-by date.",
              },
              {
                step: 2,
                title: "Clean the Vial Stoppers",
                desc: "Wipe the rubber stoppers of both the peptide vial and the BAC water vial with alcohol swabs. Allow the alcohol to air dry for approximately 10 seconds before proceeding.",
              },
              {
                step: 3,
                title: "Draw the Bacteriostatic Water",
                desc: "Using the calculator above, determine the correct amount of BAC water. Draw that amount into the syringe from the bacteriostatic water vial. Common amounts are 1 mL, 2 mL or 3 mL.",
              },
              {
                step: 4,
                title: "Add Water to the Peptide Vial",
                desc: "Insert the syringe needle into the peptide vial at an angle. Release the water slowly down the inside wall of the vial. Never spray directly onto the lyophilised powder - this can denature and damage the peptide.",
              },
              {
                step: 5,
                title: "Gently Swirl and Store",
                desc: "Gently swirl the vial in a circular motion until the powder is completely dissolved. Never shake vigorously. Label the vial with the date, peptide name and concentration, then refrigerate at 2-8 degrees C. Use within 30 days.",
              },
            ].map((item) => (
              <div
                key={item.step}
                id={`step-${item.step}`}
                className="flex gap-5 items-start bg-oryn-cream border border-oryn-grey/10 p-6"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-oryn-orange text-white flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-oryn-black/60 font-plex leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Understanding Insulin Syringes ─────────── */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                ESSENTIAL KNOWLEDGE
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Understanding Insulin Syringe Units
            </h2>
            <p className="text-base text-white/50 font-plex max-w-2xl mb-10">
              Insulin syringes are the standard tool for measuring and
              administering reconstituted peptides. Here is how the unit markings
              translate to volume.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="border border-white/10 p-6 bg-white/5">
                <h3 className="font-bold text-lg mb-4">
                  U-100 Syringe Conversion Table
                </h3>
                <div className="space-y-2 font-mono text-sm">
                  {[
                    { units: 5, ml: "0.05" },
                    { units: 10, ml: "0.10" },
                    { units: 15, ml: "0.15" },
                    { units: 20, ml: "0.20" },
                    { units: 25, ml: "0.25" },
                    { units: 30, ml: "0.30" },
                    { units: 40, ml: "0.40" },
                    { units: 50, ml: "0.50" },
                    { units: 100, ml: "1.00" },
                  ].map((row) => (
                    <div
                      key={row.units}
                      className="flex justify-between items-center py-1 border-b border-white/5"
                    >
                      <span className="text-white/70">
                        {row.units} units
                      </span>
                      <span className="text-oryn-orange">
                        {row.ml} mL
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 p-6 bg-white/5 space-y-4">
                <h3 className="font-bold text-lg mb-2">Key Points</h3>
                <div className="space-y-3 text-sm text-white/60 font-plex leading-relaxed">
                  <p>
                    <strong className="text-white/90">100 units = 1 mL.</strong>{" "}
                    This is the universal standard for U-100 insulin syringes,
                    which are the most commonly used type for subcutaneous
                    peptide research.
                  </p>
                  <p>
                    <strong className="text-white/90">
                      Syringe sizes vary.
                    </strong>{" "}
                    Common sizes are 0.3 mL (30 units), 0.5 mL (50 units) and
                    1.0 mL (100 units). Choose the smallest syringe that fits
                    your calculated dose for the most accurate measurement.
                  </p>
                  <p>
                    <strong className="text-white/90">
                      Needle gauge matters.
                    </strong>{" "}
                    31G or 30G needles are recommended for subcutaneous
                    injections. Shorter needles (6 mm or 8 mm) are standard for
                    peptide administration.
                  </p>
                  <p>
                    <strong className="text-white/90">
                      Units are NOT milligrams.
                    </strong>{" "}
                    The unit markings on an insulin syringe measure volume, not
                    weight. The actual mcg of peptide per unit depends on your
                    reconstitution concentration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Storage Guidelines ─────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-oryn-orange" />
            <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
              STORAGE & STABILITY
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Peptide Storage Guidelines
          </h2>
          <p className="text-base text-oryn-black/50 font-plex max-w-2xl mb-10">
            Proper storage is essential for maintaining peptide stability and
            effectiveness. Follow these guidelines to protect your research
            compounds.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Before Reconstitution",
                items: [
                  "Store lyophilised powder at -20 degrees C for long-term storage",
                  "Room temperature (below 25 degrees C) is acceptable for short periods",
                  "Keep away from direct sunlight and moisture",
                  "Sealed vials can remain stable for 24+ months",
                ],
              },
              {
                title: "After Reconstitution",
                items: [
                  "Refrigerate immediately at 2-8 degrees C",
                  "Use within 30 days of reconstitution",
                  "Never freeze reconstituted peptides",
                  "Use bacteriostatic water (not sterile water) for the preservative effect",
                ],
              },
              {
                title: "Handling Best Practices",
                items: [
                  "Always swab vial stoppers with alcohol before each use",
                  "Use a fresh needle for every draw to prevent contamination",
                  "Avoid repeated freeze-thaw cycles",
                  "Label vials clearly with date, name and concentration",
                ],
              },
            ].map((section) => (
              <div
                key={section.title}
                className="bg-oryn-cream border border-oryn-grey/10 p-6"
              >
                <h3 className="font-bold text-lg mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm text-oryn-black/60 font-plex leading-relaxed"
                    >
                      <span className="text-oryn-orange mt-0.5 flex-shrink-0">
                        &bull;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Product Links ──────────────────────────── */}
        <section className="bg-oryn-black text-white py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                ORYN PEPTIDE PENS
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Skip the Reconstitution
            </h2>
            <p className="text-base text-white/50 font-plex max-w-2xl mb-10">
              ORYN peptide pens come pre-mixed and ready to use. No vials, no
              bacteriostatic water, no reconstitution needed. Precision dosing in
              every click.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/${locale}/products/${product.slug}`}
                  className="border border-white/10 hover:border-oryn-orange/50 transition-all p-5 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono text-oryn-orange tracking-[0.2em]">
                      {product.categoryLabel.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono text-white/30">
                      {product.dosage}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg group-hover:text-oryn-orange transition-colors">
                    ORYN {product.name}
                  </h3>
                  <p className="text-xs text-white/40 font-plex mt-1 mb-3 line-clamp-2">
                    {product.subtitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-oryn-orange font-bold font-mono">
                      From &pound;{product.price}
                    </span>
                    <span className="text-[10px] font-mono text-white/20 tracking-[0.1em] group-hover:text-oryn-orange/60 transition-colors">
                      VIEW &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-oryn-orange text-white font-bold text-sm hover:bg-oryn-orange-dark transition-colors"
              >
                View All Products
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── FAQs ───────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-oryn-orange" />
            <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">
            Peptide Calculator FAQ
          </h2>

          <div className="space-y-4">
            {calculatorFaqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-oryn-grey/10 bg-oryn-cream"
              >
                <summary className="cursor-pointer p-6 flex items-start gap-4 list-none">
                  <span className="flex-shrink-0 w-6 h-6 bg-oryn-orange text-white flex items-center justify-center text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <span className="font-bold text-base flex-1 pr-8">
                    {faq.question}
                  </span>
                  <span className="text-oryn-orange font-mono text-lg flex-shrink-0 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 pl-16">
                  <p className="text-sm text-oryn-black/60 font-plex leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ─── SEO Content / Long-form ────────────────── */}
        <section className="bg-oryn-grey-light py-16">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-6 tracking-tight">
              The Complete Guide to Peptide Dosage Calculations
            </h2>
            <div className="prose-sm text-oryn-black/60 font-plex space-y-4 leading-relaxed">
              <p>
                Accurately calculating peptide dosages is one of the most
                important steps in peptide research. Whether you are working with
                BPC-157 for tissue repair studies, CJC-1295 and Ipamorelin for
                growth hormone research, or Tirzepatide for metabolic
                investigations, getting the reconstitution and dosing right is
                essential for consistent, reproducible results.
              </p>
              <p>
                <strong>
                  Why reconstitution calculations matter:
                </strong>{" "}
                Lyophilised peptides are shipped as a freeze-dried powder to
                preserve stability. Before use, they must be reconstituted with
                bacteriostatic water (BAC water) to create an injectable
                solution. The amount of water you add directly determines the
                concentration of the solution, which in turn determines how much
                liquid you need to draw for each dose.
              </p>
              <p>
                <strong>The core formula is simple:</strong> Peptide amount (mcg)
                divided by water volume (mL) equals concentration (mcg/mL). Then,
                desired dose (mcg) divided by concentration (mcg/mL) equals
                injection volume (mL). Multiply the injection volume by 100 to
                convert to insulin syringe units.
              </p>
              <p>
                <strong>A practical example:</strong> You have a 10 mg vial of
                BPC-157 (10,000 mcg) and add 2 mL of bacteriostatic water. Your
                concentration is 10,000 / 2 = 5,000 mcg/mL. For a 250 mcg dose,
                you need 250 / 5,000 = 0.05 mL, which equals 5 units on a
                standard U-100 insulin syringe.
              </p>
              <p>
                <strong>
                  ORYN peptide pens eliminate this complexity entirely.
                </strong>{" "}
                Each pen comes pre-mixed at the correct concentration with
                precision click-dosing, so there is no reconstitution, no
                calculations, and no risk of dosing errors. But for researchers
                working with traditional vial-and-syringe protocols, this
                calculator provides the accuracy you need.
              </p>
              <p>
                Our peptide dosage calculator supports any peptide amount and
                water volume combination, with common presets for the most
                popular research protocols. Whether you are in the UK, Europe, or
                anywhere else, this tool gives you instant, accurate results for
                your peptide reconstitution calculations.
              </p>
            </div>
          </div>
        </section>

        {/* ─── CTA Banner ─────────────────────────────── */}
        <section className="bg-oryn-gradient text-white py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Skip the Calculations?
            </h2>
            <p className="text-lg text-white/80 font-plex max-w-xl mx-auto mb-8">
              ORYN peptide pens come pre-mixed, precision-dosed and ready to
              use. No reconstitution required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/${locale}/products`}
                className="px-8 py-4 bg-white text-oryn-orange font-bold text-sm hover:bg-oryn-cream transition-colors"
              >
                Shop Peptide Pens
              </Link>
              <Link
                href={`/${locale}/science`}
                className="px-8 py-4 border-2 border-white/30 text-white font-bold text-sm hover:border-white transition-colors"
              >
                Learn the Science
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
