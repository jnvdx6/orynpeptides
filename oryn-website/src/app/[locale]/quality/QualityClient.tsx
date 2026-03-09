"use client";

import Image from "next/image";
import { Link } from "@/components/ui/LocaleLink";
import { products, productImages } from "@/data/products";

/* ─── Icons (inline SVG) ──────────────────────────────────────────── */

function ShieldCheck({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function Flask({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M10 3v6.5L4 20h16l-6-10.5V3" />
      <path d="M8.5 14h7" />
    </svg>
  );
}

function Certificate({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M7 8h10M7 12h6M7 16h8" />
      <circle cx="17" cy="15" r="2" />
      <path d="M17 17v3" />
    </svg>
  );
}

function Microscope({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18h8M10 18V8l4-1v6" />
      <circle cx="14" cy="6" r="2" />
      <path d="M6 21h12M10 18c-3.3 0-6-2.7-6-6" />
    </svg>
  );
}

function ChevronDown({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ─── Deterministic batch data (no random at render) ─────────────── */

const batchNumbers: Record<string, string> = {
  "bpc-157": "ORN-BPC1-20260215",
  "tb-500": "ORN-TB50-20260218",
  "cjc-1295": "ORN-CJC1-20260220",
  "ipamorelin": "ORN-IPAM-20260222",
  "tirzepatide-pen": "ORN-TIRZ-20260210",
  "ghk-cu": "ORN-GHKC-20260212",
  "glutathione": "ORN-GLUT-20260225",
  "nad-plus": "ORN-NADP-20260228",
  "medit-tirzepatide": "ORN-MEDT-20260205",
  "novadose-nad": "ORN-NOVD-20260208",
};

const purityValues: Record<string, string> = {
  "bpc-157": "99.4%",
  "tb-500": "99.2%",
  "cjc-1295": "99.1%",
  "ipamorelin": "99.3%",
  "tirzepatide-pen": "99.5%",
  "ghk-cu": "99.0%",
  "glutathione": "98.8%",
  "nad-plus": "99.1%",
  "medit-tirzepatide": "99.4%",
  "novadose-nad": "99.2%",
};

/* ─── Testing process steps ───────────────────────────────────────── */

const testingSteps = [
  {
    step: "01",
    title: "Peptide Synthesis",
    description: "Solid-phase peptide synthesis (SPPS) in GMP-certified European facilities under ISO 9001 quality management.",
    icon: "synthesis",
  },
  {
    step: "02",
    title: "HPLC Analysis",
    description: "High-Performance Liquid Chromatography separates and quantifies peptide purity, confirming >98% for every batch.",
    icon: "hplc",
  },
  {
    step: "03",
    title: "Mass Spectrometry",
    description: "LC-MS/MS identity confirmation verifies exact molecular weight and amino acid sequence integrity.",
    icon: "mass-spec",
  },
  {
    step: "04",
    title: "Certificate Generation",
    description: "Independent lab issues batch-specific Certificate of Analysis with full analytical data and pass/fail criteria.",
    icon: "certificate",
  },
];

/* ─── Quality standards ───────────────────────────────────────────── */

const qualityStandards = [
  {
    title: "GMP Manufacturing",
    value: "GMP",
    description: "Good Manufacturing Practice certified production facilities across the EU, ensuring pharmaceutical-grade consistency.",
  },
  {
    title: "ISO 9001 Quality",
    value: "ISO 9001",
    description: "Internationally recognised quality management system governing every step from raw materials to finished product.",
  },
  {
    title: "ISO 7 Cleanroom",
    value: "Class 10,000",
    description: "Sterile filling performed in ISO 7 classified cleanrooms with HEPA filtration and continuous environmental monitoring.",
  },
  {
    title: "HPLC Verified Purity",
    value: ">98%",
    description: "Every batch verified by independent HPLC testing. Most batches exceed 99% purity — among the highest in the UK market.",
  },
];

/* ─── FAQ Accordion ───────────────────────────────────────────────── */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border border-white/10 bg-white/[0.02] hover:border-[#FF6A1A]/30 transition-colors">
      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
        <h3 className="text-sm md:text-base font-bold text-white pr-4">{question}</h3>
        <ChevronDown className="w-5 h-5 text-[#FF6A1A] shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-6 pb-6 -mt-2">
        <p className="text-sm text-white/60 font-plex leading-relaxed">{answer}</p>
      </div>
    </details>
  );
}

/* ─── Main Component ──────────────────────────────────────────────── */

export function QualityClient({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <div className="pt-[calc(1rem+4px)]">
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 bg-[#1a1a1a] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-molecular-grid-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#FF6A1A]/5 rounded-full blur-[120px]" />
        <div className="absolute -right-20 -top-20 w-[500px] h-[500px] border border-white/[0.03]" />
        <div className="absolute -left-10 -bottom-10 w-80 h-80 border border-white/[0.03]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] font-mono text-white/30 tracking-[0.1em] mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">HOME</Link>
            <span className="text-white/50">/</span>
            <span className="text-white/60">QUALITY & TESTING</span>
          </nav>

          <div className="inline-flex items-center gap-3 mb-6">
            <ShieldCheck className="w-5 h-5 text-[#FF6A1A]" />
            <span className="text-xs font-mono text-[#FF6A1A] tracking-[0.2em]">
              THIRD-PARTY VERIFIED
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Transparency in
            <span className="block text-[#FF6A1A]">Every Batch</span>
          </h1>

          <p className="text-white/60 font-plex max-w-2xl leading-relaxed text-lg mb-10">
            Every ORYN peptide is independently tested by ISO-accredited laboratories.
            We publish Certificates of Analysis for every product because we believe
            you deserve to see exactly what you&apos;re getting — purity, identity, and
            sterility, verified by science, not marketing.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-6 md:gap-10">
            {[
              { label: "Batch Purity", value: ">98%" },
              { label: "Independent Labs", value: "ISO 17025" },
              { label: "Tests Per Batch", value: "4+" },
              { label: "Traceability", value: "100%" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-[10px] font-mono text-white/30 tracking-widest mt-1">
                  {stat.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTING PROCESS ─────────────────────────────────────── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                OUR PROCESS
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              From Synthesis to{" "}
              <span className="text-[#FF6A1A]">Certificate</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              A rigorous four-step quality assurance pipeline ensures every ORYN
              peptide meets the highest analytical standards before release.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {testingSteps.map((step, i) => (
              <div
                key={step.step}
                className="relative p-8 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/30 hover:bg-white/[0.04] transition-all group"
              >
                {/* Step connector line */}
                {i < testingSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-[2px] bg-[#FF6A1A]/20" />
                )}

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-[#FF6A1A]/20 font-mono group-hover:text-[#FF6A1A]/40 transition-colors">
                    {step.step}
                  </span>
                  {i === 0 && <Flask className="w-5 h-5 text-[#FF6A1A]" />}
                  {i === 1 && <Microscope className="w-5 h-5 text-[#FF6A1A]" />}
                  {i === 2 && <Flask className="w-5 h-5 text-[#FF6A1A]" />}
                  {i === 3 && <Certificate className="w-5 h-5 text-[#FF6A1A]" />}
                </div>

                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/40 font-plex leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUALITY STANDARDS ───────────────────────────────────── */}
      <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6A1A]/5 blur-[100px]" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                CERTIFICATIONS
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              Quality Standards That{" "}
              <span className="text-[#FF6A1A]">Define Us</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              Our manufacturing and testing infrastructure meets the most demanding
              pharmaceutical quality benchmarks in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {qualityStandards.map((standard) => (
              <div
                key={standard.title}
                className="p-8 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/30 transition-all text-center group"
              >
                <ShieldCheck className="w-8 h-8 text-[#FF6A1A] mx-auto mb-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="text-2xl font-bold text-[#FF6A1A] mb-1 font-mono">
                  {standard.value}
                </div>
                <h3 className="text-sm font-bold text-white mb-3">{standard.title}</h3>
                <p className="text-xs text-white/40 font-plex leading-relaxed">
                  {standard.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PER-PRODUCT COA GRID ────────────────────────────────── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                CERTIFICATES OF ANALYSIS
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              COA for Every{" "}
              <span className="text-[#FF6A1A]">Product</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              Each of our {products.length} peptide products is independently verified.
              Below are the latest batch test results — updated with every new production run.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {products.map((product) => {
              const purity = purityValues[product.slug] || "99.0%";
              const batch = batchNumbers[product.slug] || "ORN-XXXX-20260101";
              const imgSrc = productImages.bySlug[product.slug] || product.image;

              return (
                <div
                  key={product.slug}
                  className="relative p-6 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/30 hover:bg-white/[0.04] transition-all group"
                >
                  {/* Purity badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400/80">PASS</span>
                  </div>

                  {/* Product image */}
                  <div className="flex justify-center mb-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={imgSrc}
                        alt={`ORYN ${product.name}`}
                        fill
                        className="object-contain"
                        sizes="80px"
                      />
                    </div>
                  </div>

                  {/* Product name */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="block text-center group/link"
                  >
                    <h3 className="text-sm font-bold text-white group-hover/link:text-[#FF6A1A] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-[10px] font-mono text-white/30 text-center mt-1 mb-4">
                    {product.dosage} | {product.categoryLabel}
                  </p>

                  {/* Test data */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-white/30">PURITY</span>
                      <span className="text-sm font-bold text-emerald-400">{purity}</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                        style={{ width: purity }}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-white/30">BATCH</span>
                      <span className="text-[10px] font-mono text-white/50">{batch}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-white/30">TESTED</span>
                      <span className="text-[10px] font-mono text-white/50">Feb 2026</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-white/30">METHOD</span>
                      <span className="text-[10px] font-mono text-white/50">HPLC + MS</span>
                    </div>
                  </div>

                  {/* View COA button */}
                  <a
                    href="#"
                    className="flex items-center justify-center gap-2 w-full py-2.5 border border-[#FF6A1A]/30 text-[#FF6A1A] text-[10px] font-mono tracking-widest hover:bg-[#FF6A1A]/10 hover:border-[#FF6A1A]/50 transition-all"
                  >
                    <Certificate className="w-3.5 h-3.5" />
                    VIEW COA
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── THIRD-PARTY TESTING PARTNERS ────────────────────────── */}
      <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6A1A]/5 blur-[100px]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
                <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                  INDEPENDENT VERIFICATION
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Third-Party Testing{" "}
                <span className="text-[#FF6A1A]">Partners</span>
              </h2>
              <p className="text-white/50 font-plex leading-relaxed mb-6">
                ORYN does not test its own products. Every Certificate of Analysis
                is generated by independent, ISO 17025-accredited analytical laboratories
                that have no financial relationship with our manufacturing operation.
              </p>
              <p className="text-white/50 font-plex leading-relaxed mb-8">
                This separation ensures unbiased, scientifically rigorous verification
                of purity, identity, and sterility. Our testing partners use validated
                analytical methods including reverse-phase HPLC, LC-MS/MS, LAL endotoxin
                testing, and membrane filtration sterility testing.
              </p>

              <div className="space-y-4">
                {[
                  "ISO 17025 accredited analytical laboratories",
                  "No financial ties to ORYN manufacturing",
                  "Validated HPLC and mass spectrometry methods",
                  "Endotoxin and sterility verification",
                  "Full batch traceability from synthesis to certificate",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 w-4 h-4 border border-[#FF6A1A]/40 flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-[#FF6A1A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-white/60 font-plex">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* Testing summary card */}
              <div className="p-8 bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-sm font-mono text-[#FF6A1A] tracking-widest mb-6">
                  ANALYTICAL METHODS
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      method: "HPLC Purity Testing",
                      description: "Reverse-phase C18 column, UV detection at 220nm. Quantifies peptide purity and detects impurities.",
                      standard: "USP <621>",
                    },
                    {
                      method: "Mass Spectrometry (LC-MS)",
                      description: "Electrospray ionisation with high-resolution mass detection. Confirms molecular identity.",
                      standard: "ISO 13528",
                    },
                    {
                      method: "Endotoxin Testing",
                      description: "Limulus Amebocyte Lysate (LAL) kinetic turbidimetric assay. Ensures bacterial endotoxin levels below limits.",
                      standard: "USP <85>",
                    },
                    {
                      method: "Sterility Testing",
                      description: "Membrane filtration method with 14-day incubation in TSB and FTM media.",
                      standard: "USP <71>",
                    },
                  ].map((test) => (
                    <div key={test.method} className="border-l-2 border-[#FF6A1A]/20 pl-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-white">{test.method}</h4>
                        <span className="text-[9px] font-mono text-[#FF6A1A]/60 bg-[#FF6A1A]/5 px-2 py-0.5">
                          {test.standard}
                        </span>
                      </div>
                      <p className="text-xs text-white/40 font-plex">{test.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT A COA CONTAINS ──────────────────────────────────── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                UNDERSTANDING YOUR COA
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              What Every COA{" "}
              <span className="text-[#FF6A1A]">Contains</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              Each ORYN Certificate of Analysis provides complete analytical transparency.
              Here is what you will find in every document.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Peptide Identity",
                details: "Compound name, molecular formula, molecular weight, amino acid sequence, and CAS number.",
              },
              {
                title: "HPLC Purity Data",
                details: "Chromatogram, retention time, peak area percentage, and impurity profile with acceptance criteria.",
              },
              {
                title: "Mass Spectrum",
                details: "LC-MS identity confirmation showing observed vs. theoretical molecular weight and charge states.",
              },
              {
                title: "Endotoxin Results",
                details: "LAL test results in EU/mL with specification limits. All ORYN products test below 0.5 EU/mL.",
              },
              {
                title: "Sterility Report",
                details: "14-day incubation results in TSB and FTM media confirming no microbial growth detected.",
              },
              {
                title: "Batch Information",
                details: "Unique batch number, manufacturing date, test date, expiry date, and analyst identification.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/20 transition-colors"
              >
                <Certificate className="w-5 h-5 text-[#FF6A1A] mb-3" />
                <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-white/40 font-plex leading-relaxed">
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ─────────────────────────────────────────── */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                FAQ
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              Quality &amp; Testing{" "}
              <span className="text-[#FF6A1A]">FAQ</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              Common questions about our quality assurance process,
              peptide purity testing, and Certificates of Analysis.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#FF6A1A] to-[#e55a10] relative overflow-hidden">
        <div className="absolute inset-0 bg-molecular-grid-orange opacity-20" />
        <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <ShieldCheck className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Quality You Can Verify
          </h2>
          <p className="text-white/70 font-plex mb-8 max-w-lg mx-auto">
            Every ORYN peptide ships with a batch number you can trace back to
            an independent Certificate of Analysis. See the science for yourself.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF6A1A] font-bold text-xs tracking-[0.2em] hover:bg-[#FFF8F0] transition-colors"
            >
              BROWSE PRODUCTS
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold text-xs tracking-[0.2em] hover:bg-white/10 hover:border-white/50 transition-colors"
            >
              REQUEST A COA
              <Certificate className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
