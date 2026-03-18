import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/* ─── Glossary Term Type ─────────────────────────────────────────── */

interface GlossaryTerm {
  term: string;
  definition: string;
  related?: { label: string; href: string };
}

/* ─── 45 Peptide Research Terms A-Z ──────────────────────────────── */

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Amino Acid",
    definition:
      "The fundamental building blocks of peptides and proteins. There are 20 standard amino acids that combine in different sequences to create peptides with distinct biological functions. Each amino acid has an amino group, a carboxyl group, and a unique side chain that determines its chemical properties.",
    related: { label: "Peptide Science", href: "/science" },
  },
  {
    term: "Anagen Phase",
    definition:
      "The active growth phase of the hair follicle cycle, during which the hair bulb is fully formed and the hair shaft elongates. Peptides such as GHK-Cu have been researched for their ability to extend the anagen phase, promoting longer and thicker hair growth by stimulating dermal papilla cell activity.",
    related: { label: "GHK-Cu Pen", href: "/products/ghk-cu" },
  },
  {
    term: "Bioavailability",
    definition:
      "The proportion of an administered compound that reaches systemic circulation in its active form. Subcutaneous peptide pen delivery achieves significantly higher bioavailability than oral administration, which is subject to first-pass metabolism and enzymatic degradation in the digestive tract. ORYN's pen system bypasses the GI tract entirely.",
    related: { label: "Pen vs Vial Guide", href: "/learn/peptide-pen-vs-vial" },
  },
  {
    term: "BPC-157",
    definition:
      "Body Protection Compound-157 is a synthetic 15-amino acid peptide derived from a naturally occurring protein found in human gastric juice. It is one of the most extensively studied peptides for tissue repair, gut healing, and neuroprotection. BPC-157 is stable in gastric conditions, unlike most peptides that degrade in acidic environments.",
    related: { label: "BPC-157 Pen", href: "/products/bpc-157" },
  },
  {
    term: "CJC-1295",
    definition:
      "A synthetic analogue of growth hormone-releasing hormone (GHRH) composed of 29 amino acids. CJC-1295 stimulates the pituitary gland to produce sustained growth hormone elevation. It is often researched alongside Ipamorelin for synergistic GH release through complementary pathways.",
    related: { label: "CJC-1295 Pen", href: "/products/cjc-1295" },
  },
  {
    term: "COA (Certificate of Analysis)",
    definition:
      "An official document issued by an independent testing laboratory that certifies the identity, purity, and composition of a peptide product. A complete COA typically includes HPLC chromatogram data, mass spectrometry identity results, endotoxin testing, sterility verification, and batch-specific manufacturing details. Every ORYN batch ships with a COA.",
    related: { label: "Quality & Testing", href: "/quality" },
  },
  {
    term: "Collagen",
    definition:
      "The most abundant structural protein in the human body, providing tensile strength to skin, tendons, ligaments, and bones. Collagen synthesis naturally declines with age. Peptides such as GHK-Cu have been shown in research to stimulate collagen production, supporting tissue integrity and skin elasticity.",
    related: { label: "GHK-Cu Skin Guide", href: "/learn/ghk-cu-skin-peptide-guide" },
  },
  {
    term: "Copper Peptide",
    definition:
      "A peptide with a high binding affinity for copper ions. GHK-Cu (glycyl-L-histidyl-L-lysine copper) is the most studied copper peptide, naturally occurring in human plasma, saliva, and urine. It promotes collagen synthesis, wound healing, and has antioxidant and anti-inflammatory properties relevant to skin, hair, and tissue repair research.",
    related: { label: "GHK-Cu Pen", href: "/products/ghk-cu" },
  },
  {
    term: "Dermal Papilla",
    definition:
      "A cluster of specialised cells at the base of each hair follicle that regulate hair growth. Dermal papilla cells signal the hair matrix to produce new hair during the anagen phase. GHK-Cu has been shown in research to stimulate dermal papilla cell proliferation, making it a key target for hair growth studies.",
    related: { label: "Hair Growth Peptides", href: "/peptides-for/hair-growth" },
  },
  {
    term: "Dosing Protocol",
    definition:
      "A structured schedule defining the dose, frequency, route, and duration of peptide administration in a research setting. ORYN peptide pens are designed for 30-day dosing protocols with consistent, precision-measured amounts, eliminating the variability associated with manual syringe preparation from vials.",
    related: { label: "Dosing Guide", href: "/learn/peptide-dosing-guide-beginners" },
  },
  {
    term: "Endotoxin Testing",
    definition:
      "A quality control assay that detects bacterial endotoxins (lipopolysaccharides) in peptide products. Endotoxin contamination can cause fever, inflammation, and immune reactions. The Limulus Amebocyte Lysate (LAL) test is the gold standard method. All ORYN batches undergo endotoxin testing as part of the COA process.",
    related: { label: "Quality Standards", href: "/quality" },
  },
  {
    term: "GHK-Cu",
    definition:
      "Glycyl-L-histidyl-L-lysine copper is a naturally occurring tripeptide-copper complex found in human plasma, saliva, and urine. It declines with age and has been extensively researched for promoting collagen synthesis, wound healing, hair follicle stimulation, antioxidant defence, and anti-inflammatory effects. ORYN offers a potent 60mg GHK-Cu pen formulation.",
    related: { label: "GHK-Cu Pen", href: "/products/ghk-cu" },
  },
  {
    term: "GHRH (Growth Hormone-Releasing Hormone)",
    definition:
      "A hypothalamic peptide hormone that stimulates the anterior pituitary gland to synthesise and secrete growth hormone. CJC-1295 is a synthetic GHRH analogue that provides longer-lasting GH stimulation than natural GHRH due to its extended half-life and resistance to enzymatic degradation.",
    related: { label: "CJC-1295 Pen", href: "/products/cjc-1295" },
  },
  {
    term: "GIP (Glucose-Dependent Insulinotropic Polypeptide)",
    definition:
      "An incretin hormone secreted by K-cells in the duodenum in response to nutrient intake. GIP stimulates insulin secretion, promotes fat storage, and influences appetite. Tirzepatide is a dual GIP/GLP-1 receptor agonist, activating both incretin pathways simultaneously for enhanced metabolic effects compared to GLP-1-only compounds.",
    related: { label: "Tirzepatide Pen", href: "/products/tirzepatide-pen" },
  },
  {
    term: "GLP-1 (Glucagon-Like Peptide-1)",
    definition:
      "An incretin hormone produced by L-cells in the intestine that regulates blood glucose by stimulating insulin secretion and suppressing glucagon release. GLP-1 also slows gastric emptying and reduces appetite. Semaglutide and tirzepatide are synthetic GLP-1 receptor agonists studied for metabolic and weight management research.",
    related: { label: "Tirzepatide vs Semaglutide", href: "/learn/tirzepatide-vs-semaglutide" },
  },
  {
    term: "GMP (Good Manufacturing Practice)",
    definition:
      "A regulatory framework ensuring pharmaceutical products are consistently produced and controlled according to quality standards. GMP covers facility design, equipment calibration, personnel training, raw material testing, manufacturing processes, and record keeping. All ORYN peptides are manufactured in GMP-certified facilities in South Korea.",
    related: { label: "Quality & Testing", href: "/quality" },
  },
  {
    term: "Glutathione",
    definition:
      "A tripeptide (glutamate-cysteine-glycine) that serves as the body's master antioxidant. Glutathione neutralises free radicals, supports cellular detoxification, and plays a critical role in immune function. Injectable glutathione has significantly higher bioavailability than oral supplements, which are largely degraded during digestion.",
    related: { label: "Glutathione Pen", href: "/products/glutathione" },
  },
  {
    term: "Growth Hormone (GH)",
    definition:
      "A 191-amino acid peptide hormone secreted by the anterior pituitary gland that stimulates growth, cell reproduction, and regeneration. GH levels peak during deep sleep and decline with age. Secretagogues such as CJC-1295 and Ipamorelin stimulate the body's own GH production rather than introducing exogenous hormone.",
    related: { label: "Muscle Growth Peptides", href: "/peptides-for/muscle-growth" },
  },
  {
    term: "Half-Life",
    definition:
      "The time required for the concentration of a peptide in the body to decrease by half. Half-life determines dosing frequency and protocol design. For example, CJC-1295 has a half-life of approximately 6-8 days due to albumin binding, whereas natural GHRH has a half-life of only 7 minutes.",
    related: { label: "Science", href: "/science" },
  },
  {
    term: "HPLC (High-Performance Liquid Chromatography)",
    definition:
      "An analytical technique used to separate, identify, and quantify components in a mixture. In peptide manufacturing, HPLC is the gold standard for purity analysis. It produces a chromatogram showing peaks that correspond to the target peptide and any impurities. ORYN peptides are verified to exceed 99% purity via independent HPLC testing.",
    related: { label: "Quality Standards", href: "/quality" },
  },
  {
    term: "Ipamorelin",
    definition:
      "A selective pentapeptide growth hormone secretagogue that stimulates GH release by binding to the ghrelin receptor on pituitary somatotroph cells. Unlike other GH-releasing peptides, Ipamorelin does not significantly elevate cortisol, prolactin, or ACTH, making it one of the most selective GH secretagogues available for research.",
    related: { label: "Ipamorelin Pen", href: "/products/ipamorelin" },
  },
  {
    term: "ISO 7 Cleanroom",
    definition:
      "A controlled environment classified under ISO 14644-1 that permits no more than 352,000 particles per cubic metre at 0.5 micrometres. ISO 7 (Class 10,000) cleanrooms are used for sterile pharmaceutical manufacturing, including peptide pen filling. ORYN's fill operations take place in HEPA-filtered ISO 7 cleanrooms with continuous environmental monitoring.",
    related: { label: "Quality & Testing", href: "/quality" },
  },
  {
    term: "Lyophilisation",
    definition:
      "Also known as freeze-drying, this preservation technique removes water from a peptide solution by sublimation under vacuum. Lyophilised peptides are stored as stable powders that require reconstitution before use. ORYN's pre-mixed pen system eliminates the reconstitution step, reducing contamination risk and dosing variability.",
    related: { label: "Pen vs Vial", href: "/learn/peptide-pen-vs-vial" },
  },
  {
    term: "Mass Spectrometry",
    definition:
      "An analytical technique that measures the mass-to-charge ratio of ions to identify and characterise molecules. In peptide quality control, mass spectrometry confirms peptide identity by verifying that the observed molecular weight matches the theoretical weight. ORYN uses mass spectrometry alongside HPLC for comprehensive batch analysis.",
    related: { label: "Quality Standards", href: "/quality" },
  },
  {
    term: "Metabolic Peptide",
    definition:
      "A class of peptides that interact with metabolic signalling pathways, influencing processes such as glucose regulation, lipid metabolism, appetite, and energy expenditure. Tirzepatide is a leading example, acting as a dual GIP/GLP-1 receptor agonist to modulate multiple metabolic pathways simultaneously.",
    related: { label: "Weight Loss Peptides", href: "/peptides-for/weight-loss" },
  },
  {
    term: "Microdosing",
    definition:
      "An administration strategy involving very small, precisely measured doses of a compound, typically delivered daily. Microdosing aims to maintain steady-state levels while minimising side effects. ORYN's NovaDose system is specifically designed for daily NAD+ microdosing through its cartridge-based pen delivery.",
    related: { label: "NovaDose NAD+", href: "/products/novadose-nad" },
  },
  {
    term: "NAD+ (Nicotinamide Adenine Dinucleotide)",
    definition:
      "A coenzyme present in every living cell that is essential for over 500 enzymatic reactions, including energy metabolism, DNA repair, and sirtuin activation. NAD+ levels decline by up to 50% between ages 40 and 60. Research into NAD+ supplementation explores restoring cellular energy, cognitive function, and healthy aging pathways.",
    related: { label: "NAD+ Pen", href: "/products/nad-plus" },
  },
  {
    term: "Neuroprotection",
    definition:
      "The mechanisms and strategies aimed at preserving neuronal structure and function in the brain and nervous system. Several peptides demonstrate neuroprotective properties in research: BPC-157 supports nerve healing, GHK-Cu has antioxidant effects in neural tissue, and NAD+ supports DNA repair in neurons.",
    related: { label: "BPC-157 Guide", href: "/learn/bpc-157-complete-guide" },
  },
  {
    term: "Peptide Bond",
    definition:
      "A covalent chemical bond formed between the carboxyl group of one amino acid and the amino group of another through a condensation reaction. Peptide bonds are the linkages that hold amino acids together in a chain. The sequence and number of peptide bonds determine a peptide's structure, stability, and biological activity.",
    related: { label: "Peptide Science", href: "/science" },
  },
  {
    term: "Peptide Pen",
    definition:
      "A pre-loaded, precision-dosed delivery device containing a reconstituted peptide solution ready for subcutaneous administration. ORYN peptide pens eliminate the need for vial reconstitution, providing consistent dosing, sterile delivery, and 30-day convenience. They represent a significant advancement over traditional vial-and-syringe formats.",
    related: { label: "What Is a Peptide Pen?", href: "/learn/what-is-a-peptide-pen" },
  },
  {
    term: "Peptide Synthesis",
    definition:
      "The process of creating peptides by linking amino acids in a specific sequence. Solid-Phase Peptide Synthesis (SPPS) is the dominant manufacturing method, building the peptide chain from C-terminus to N-terminus on a solid resin support. After synthesis, peptides are cleaved from the resin, purified by HPLC, and verified by mass spectrometry.",
    related: { label: "Science", href: "/science" },
  },
  {
    term: "Pharmacokinetics",
    definition:
      "The study of how the body absorbs, distributes, metabolises, and excretes a drug or compound over time. Pharmacokinetic parameters for peptides include bioavailability, half-life, volume of distribution, and clearance rate. These factors determine optimal dosing protocols and administration frequency.",
    related: { label: "Dosing Guide", href: "/learn/peptide-dosing-guide-beginners" },
  },
  {
    term: "Pituitary Gland",
    definition:
      "A pea-sized endocrine gland at the base of the brain that produces and secretes critical hormones including growth hormone, thyroid-stimulating hormone, and adrenocorticotropic hormone. Growth hormone secretagogues such as CJC-1295 and Ipamorelin act on the anterior pituitary to stimulate natural GH release.",
    related: { label: "CJC-1295 vs Ipamorelin", href: "/learn/ipamorelin-vs-cjc-1295" },
  },
  {
    term: "Purity",
    definition:
      "The percentage of a peptide sample that consists of the target compound, as opposed to impurities such as truncated sequences, deletion products, or residual solvents. Purity is measured by HPLC and is the most critical quality metric for research peptides. ORYN peptides are independently verified to exceed 99% purity.",
    related: { label: "Quality & Testing", href: "/quality" },
  },
  {
    term: "Reconstitution",
    definition:
      "The process of dissolving a lyophilised (freeze-dried) peptide powder in a sterile solvent such as bacteriostatic water to create an injectable solution. Reconstitution introduces risks of contamination, incorrect concentration, and peptide degradation. ORYN pens arrive pre-reconstituted and ready to use, eliminating these risks entirely.",
    related: { label: "Pen vs Vial", href: "/learn/peptide-pen-vs-vial" },
  },
  {
    term: "Research Peptide",
    definition:
      "A synthetic peptide manufactured for scientific research and laboratory use. Research peptides are sold strictly for in-vitro study and are not licensed for human self-administration. They must meet stringent purity and quality standards, with each batch accompanied by a Certificate of Analysis from an independent laboratory.",
    related: { label: "UK Peptide Legality", href: "/learn/are-peptides-legal-in-the-uk" },
  },
  {
    term: "Secretagogue",
    definition:
      "A substance that stimulates the secretion of a specific hormone from an endocrine gland. Growth hormone secretagogues, such as CJC-1295 (GHRH analogue) and Ipamorelin (ghrelin mimetic), promote the body's natural GH production rather than introducing exogenous hormone, preserving the pulsatile pattern of GH release.",
    related: { label: "Ipamorelin Pen", href: "/products/ipamorelin" },
  },
  {
    term: "Semaglutide",
    definition:
      "A GLP-1 receptor agonist originally developed for type 2 diabetes management, now extensively researched for weight management. Semaglutide activates a single incretin pathway (GLP-1), whereas tirzepatide activates two pathways (GIP + GLP-1). Clinical studies have shown tirzepatide may offer enhanced metabolic benefits due to its dual mechanism of action.",
    related: { label: "Semaglutide vs Tirzepatide", href: "/learn/semaglutide-vs-tirzepatide-2026" },
  },
  {
    term: "Subcutaneous Injection",
    definition:
      "An injection administered into the layer of fat tissue between the skin and muscle, typically in the abdomen, thigh, or upper arm. Subcutaneous delivery is the standard route for peptide pen administration, providing slower and more sustained absorption compared to intravenous or intramuscular injection.",
    related: { label: "How to Use a Peptide Pen", href: "/learn/how-to-use-peptide-pen" },
  },
  {
    term: "TB-500",
    definition:
      "A synthetic 43-amino acid fragment of Thymosin Beta-4, a naturally occurring protein involved in tissue repair and regeneration. TB-500 promotes cell migration, blood vessel formation, and reduces inflammation. It is one of the most studied peptides for wound healing, cardiac tissue repair, and recovery from musculoskeletal injuries.",
    related: { label: "TB-500 Pen", href: "/products/tb-500" },
  },
  {
    term: "Thymosin Beta-4",
    definition:
      "A 43-amino acid protein that is the primary G-actin sequestering molecule in eukaryotic cells. Thymosin Beta-4 plays essential roles in cell motility, wound healing, and anti-inflammatory processes. TB-500 is a synthetic version of the full Thymosin Beta-4 protein, retaining its key regenerative properties for research applications.",
    related: { label: "BPC-157 vs TB-500", href: "/learn/bpc-157-vs-tb-500" },
  },
  {
    term: "Tirzepatide",
    definition:
      "A dual GIP/GLP-1 receptor agonist that simultaneously activates two incretin hormone pathways involved in glucose regulation, appetite control, and energy metabolism. Tirzepatide represents the cutting edge of metabolic peptide science, with clinical research showing significant effects on body weight, HbA1c, and metabolic markers.",
    related: { label: "Tirzepatide Pen", href: "/products/tirzepatide-pen" },
  },
  {
    term: "Tripeptide",
    definition:
      "A peptide consisting of exactly three amino acids linked by two peptide bonds. GHK-Cu is a prominent example — composed of glycine, histidine, and lysine with a bound copper ion. Glutathione is another tripeptide, composed of glutamate, cysteine, and glycine. Despite their small size, tripeptides can have potent biological activities.",
    related: { label: "GHK-Cu Pen", href: "/products/ghk-cu" },
  },
  {
    term: "Vasodilation",
    definition:
      "The widening of blood vessels caused by relaxation of vascular smooth muscle. Increased vasodilation improves blood flow and nutrient delivery to tissues. BPC-157 has been shown in research to promote nitric oxide-mediated vasodilation, which supports tissue healing by enhancing blood supply to damaged areas.",
    related: { label: "Recovery Peptides", href: "/peptides-for/recovery" },
  },
];

/* ─── Group terms by first letter ────────────────────────────────── */

function groupByLetter(terms: GlossaryTerm[]): Record<string, GlossaryTerm[]> {
  const groups: Record<string, GlossaryTerm[]> = {};
  for (const t of terms) {
    const letter = t.term[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(t);
  }
  return groups;
}

const grouped = groupByLetter(glossaryTerms);
const activeLetters = Object.keys(grouped).sort();
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/* ─── Build FAQ schema items from glossary terms ─────────────────── */

const glossaryFaqs = glossaryTerms.map((t) => ({
  question: `What is ${t.term}?`,
  answer: t.definition,
}));

/* ─── DefinedTermSet JSON-LD ─────────────────────────────────────── */

function definedTermSetSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Peptide Research Glossary",
    description:
      "Comprehensive glossary of peptide research terminology including definitions for BPC-157, tirzepatide, GHK-Cu, NAD+, and 40+ more terms.",
    url: `${SITE_URL}/${locale}/peptides/glossary`,
    hasDefinedTerm: glossaryTerms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      inDefinedTermSet: `${SITE_URL}/${locale}/peptides/glossary`,
    })),
  };
}

/* ─── Metadata ───────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const title = `${dict.breadcrumbs.glossary} — ORYN Peptide Labs`;
  const description = dict.meta.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/peptides/glossary`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/peptides/glossary`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/peptides/glossary`])
        ),
        "x-default": `${SITE_URL}/en/peptides/glossary`,
      },
    },
  };
}

/* ─── Page Component ─────────────────────────────────────────────── */

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      {/* ── JSON-LD Structured Data ─────────────────────────────── */}
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: dict.breadcrumbs.peptides, url: `/${locale}/peptides` },
            { name: dict.breadcrumbs.glossary, url: `/${locale}/peptides/glossary` },
          ]),
          definedTermSetSchema(locale),
          faqSchema(glossaryFaqs.slice(0, 10)),
        ]}
      />

      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="relative bg-oryn-black pt-32 pb-20 overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,106,26,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,26,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-mono tracking-[0.15em] text-white/40 mb-10">
            <Link
              href={`/${locale}`}
              className="hover:text-oryn-orange transition-colors"
            >
              HOME
            </Link>
            <span>/</span>
            <Link
              href={`/${locale}/peptides`}
              className="hover:text-oryn-orange transition-colors"
            >
              PEPTIDES
            </Link>
            <span>/</span>
            <span className="text-oryn-orange">GLOSSARY</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-oryn-orange/30 bg-oryn-orange/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-oryn-orange animate-pulse" />
            <span className="text-xs font-mono tracking-[0.2em] text-oryn-orange uppercase">
              Research Reference
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
            Peptide{" "}
            <span className="text-oryn-orange">Glossary</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-4">
            A comprehensive A-Z reference of peptide research terminology.
            Over 45 terms covering peptide science, manufacturing, quality
            testing, and research protocols.
          </p>

          <p className="text-sm font-mono tracking-[0.1em] text-white/30">
            USE THE LETTER NAVIGATION BELOW TO JUMP TO A SECTION
          </p>
        </div>
      </section>

      {/* ── Letter Navigation Bar ───────────────────────────────── */}
      <nav className="sticky top-0 z-40 bg-oryn-black/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-3">
          <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
            {alphabet.map((letter) => {
              const isActive = activeLetters.includes(letter);
              return (
                <a
                  key={letter}
                  href={isActive ? `#letter-${letter}` : undefined}
                  className={`
                    w-9 h-9 flex items-center justify-center rounded-md text-sm font-mono font-bold
                    transition-all duration-200
                    ${
                      isActive
                        ? "text-white hover:bg-oryn-orange hover:text-white cursor-pointer"
                        : "text-white/15 cursor-default"
                    }
                  `}
                  aria-label={
                    isActive
                      ? `Jump to terms starting with ${letter}`
                      : `No terms starting with ${letter}`
                  }
                >
                  {letter}
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── Glossary Terms by Letter ────────────────────────────── */}
      <section className="bg-oryn-cream min-h-screen">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            {activeLetters.map((letter) => (
              <div
                key={letter}
                id={`letter-${letter}`}
                className="mb-16 scroll-mt-20"
              >
                {/* Letter Heading */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-oryn-orange flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {letter}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-oryn-black/10" />
                  <span className="text-xs font-mono tracking-[0.2em] text-oryn-black/30 uppercase">
                    {grouped[letter].length}{" "}
                    {grouped[letter].length === 1 ? "term" : "terms"}
                  </span>
                </div>

                {/* Terms */}
                <div className="space-y-6">
                  {grouped[letter].map((item) => (
                    <article
                      key={item.term}
                      id={item.term
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "")}
                      className="group bg-white rounded-2xl p-6 md:p-8 border border-oryn-black/5 hover:border-oryn-orange/20 transition-colors scroll-mt-20"
                    >
                      <h3 className="text-xl md:text-2xl font-bold text-oryn-black mb-3">
                        {item.term}
                      </h3>
                      <p className="text-oryn-black/70 leading-relaxed font-plex">
                        {item.definition}
                      </p>
                      {item.related && (
                        <div className="mt-4 pt-4 border-t border-oryn-black/5">
                          <Link
                            href={`/${locale}${item.related.href}`}
                            className="inline-flex items-center gap-2 text-sm font-mono tracking-[0.1em] text-oryn-orange hover:text-oryn-orange/80 transition-colors"
                          >
                            <span className="uppercase">
                              Related: {item.related.label}
                            </span>
                            <svg
                              className="w-4 h-4 transition-transform group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </Link>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ─────────────────────────────────────────── */}
      <section className="bg-oryn-black py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs font-mono tracking-[0.25em] text-oryn-orange uppercase mb-6">
            From Research to Results
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Explore Our Peptide Range
          </h2>
          <p className="text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
            Every ORYN peptide pen is manufactured in GMP-certified facilities,
            independently tested to exceed 99% purity, and delivered in our
            precision pen system. Browse our full catalogue of research-grade
            peptides.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-3 bg-oryn-orange hover:bg-oryn-orange/90 text-white font-bold px-8 py-4 rounded-full transition-colors text-lg"
            >
              Browse All Products
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href={`/${locale}/learn`}
              className="inline-flex items-center gap-3 border border-white/20 hover:border-oryn-orange/50 text-white font-bold px-8 py-4 rounded-full transition-colors text-lg"
            >
              Research Hub
            </Link>
          </div>
        </div>
      </section>

      {/* ── Back to Top ─────────────────────────────────────────── */}
      <div className="bg-oryn-cream py-6 text-center">
        <a
          href="#letter-A"
          className="text-xs font-mono tracking-[0.2em] text-oryn-black/40 hover:text-oryn-orange transition-colors uppercase"
        >
          Back to top
        </a>
      </div>
    </>
  );
}
