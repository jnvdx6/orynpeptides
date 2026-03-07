"use client";

import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";

const peptideSlugMap: Record<string, string> = {
  "BPC-157": "bpc-157",
  "TB-500": "tb-500",
  "CJC-1295": "cjc-1295",
  "Ipamorelin": "ipamorelin",
  "Tirzepatide": "tirzepatide-pen",
  "GHK-CU": "ghk-cu",
  "Glutathione": "glutathione",
  "NAD+": "nad-plus",
};

const peptideScience = [
  {
    name: "BPC-157",
    fullName: "Body Protection Compound-157",
    type: "Pentadecapeptide",
    mechanism: "Upregulates growth factor expression (VEGF, EGF), modulates nitric oxide system",
    research: "Tissue healing, gut integrity, tendon/ligament repair, neuroprotection",
    category: "Healing & Recovery",
  },
  {
    name: "TB-500",
    fullName: "Thymosin Beta-4 Fragment",
    type: "43-amino acid peptide",
    mechanism: "Sequesters G-actin, promotes cell migration, reduces inflammation via NF-kB modulation",
    research: "Wound healing, cardiac repair, tissue regeneration, angiogenesis",
    category: "Tissue Repair",
  },
  {
    name: "CJC-1295",
    fullName: "Modified GRF(1-29)",
    type: "GHRH analogue",
    mechanism: "Sustained GH release via pituitary GHRH receptor agonism with DAC for extended half-life",
    research: "Growth hormone axis, body composition, sleep architecture, recovery",
    category: "GH Stimulation",
  },
  {
    name: "Ipamorelin",
    fullName: "Ipamorelin Acetate",
    type: "Pentapeptide GH secretagogue",
    mechanism: "Selective ghrelin receptor agonist, stimulates GH without affecting cortisol/prolactin",
    research: "Selective GH release, bone density, lean tissue, metabolic regulation",
    category: "GH Stimulation",
  },
  {
    name: "Tirzepatide",
    fullName: "Tirzepatide",
    type: "Dual incretin receptor agonist",
    mechanism: "Simultaneous GIP and GLP-1 receptor activation, glucose-dependent insulin secretion",
    research: "Metabolic function, glycemic control, appetite regulation, body composition",
    category: "Metabolic",
  },
  {
    name: "GHK-CU",
    fullName: "Glycyl-L-histidyl-L-lysine:copper(II)",
    type: "Copper tripeptide",
    mechanism: "Gene expression modulation, copper delivery, TGF-beta and collagen synthesis activation",
    research: "Skin remodeling, wound repair, antioxidant defense, anti-inflammatory",
    category: "Skin Repair",
  },
  {
    name: "Glutathione",
    fullName: "L-Glutathione (reduced)",
    type: "Tripeptide (Glu-Cys-Gly)",
    mechanism: "Phase II conjugation, ROS neutralization, vitamin C/E recycling, detoxification",
    research: "Antioxidant defense, cellular detoxification, immune modulation, skin health",
    category: "Antioxidant",
  },
  {
    name: "NAD+",
    fullName: "Nicotinamide Adenine Dinucleotide",
    type: "Dinucleotide coenzyme",
    mechanism: "Electron carrier in redox reactions, SIRT1-7 activation, PARP substrate for DNA repair",
    research: "Cellular energy, DNA repair, sirtuin activation, healthy aging, neuroprotection",
    category: "Metabolic & Anti-Aging",
  },
];

export default function SciencePage() {
  const { t } = useLocale();
  const s = t.sciencePage;

  return (
    <div className="pt-[calc(1rem+4px)]">
      <section className="relative py-28 bg-oryn-gradient overflow-hidden">
        <div className="absolute inset-0 bg-molecular-grid-orange opacity-30" />
        <div className="absolute -right-20 -top-20 w-[500px] h-[500px] border border-white/5" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 border border-white/5" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] font-mono text-white/30 tracking-[0.1em] mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">{t.productDetail.home}</Link>
            <span className="text-white/50">/</span>
            <span className="text-white/60">{t.nav.science.toUpperCase()}</span>
          </nav>
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-white/40" />
            <span className="text-xs font-mono text-white/70 tracking-widest">
              {s.tagline}
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            {s.heroTitle1}
            <span className="block">{s.heroTitle2}</span>
          </h1>
          <p className="text-white/70 font-plex max-w-2xl leading-relaxed text-lg">
            {s.heroDescription}
          </p>
        </div>
      </section>

      <section className="py-24 bg-oryn-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="accent-line" />
              <span className="text-xs font-mono text-oryn-orange tracking-widest">
                {s.processLabel}
              </span>
              <div className="accent-line" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
              {s.processTitle1}
              <span className="text-gradient-orange"> {s.processTitle2}</span>
            </h2>
            <p className="text-oryn-black/50 font-plex max-w-xl mx-auto">
              {s.processDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {s.processSteps.map((stage) => (
              <div
                key={stage.step}
                className="p-6 bg-oryn-orange/5 text-center border border-oryn-orange/10 hover:border-oryn-orange/30 hover:bg-oryn-orange/10 transition-all"
              >
                <span className="text-2xl font-bold text-oryn-orange font-mono">
                  {stage.step}
                </span>
                <h3 className="text-sm font-bold mt-2 mb-1">{stage.label}</h3>
                <span className="text-[10px] font-mono text-oryn-black/40">
                  {stage.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-oryn-warm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="accent-line" />
              <span className="text-xs font-mono text-oryn-orange tracking-widest">
                {s.libraryLabel}
              </span>
              <div className="accent-line" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              {s.libraryTitle1}
              <span className="text-gradient-orange"> {s.libraryTitle2}</span>
            </h2>
          </div>

          <div className="space-y-5">
            {peptideScience.map((peptide) => (
              <div
                key={peptide.name}
                className="bg-white border border-oryn-orange/10 p-8 hover:border-oryn-orange/30 hover:shadow-lg hover:shadow-oryn-orange/5 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="lg:w-48 shrink-0">
                    <Link href={`/products/${peptideSlugMap[peptide.name] || ""}`} className="group/link">
                      <h3 className="text-2xl font-bold text-oryn-orange group-hover/link:underline underline-offset-4">
                        {peptide.name}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline ml-1.5 opacity-0 group-hover/link:opacity-100 transition-opacity">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </h3>
                    </Link>
                    <span className="text-xs font-mono text-oryn-black/40 bg-oryn-orange/5 px-2 py-0.5 ">
                      {peptide.category}
                    </span>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <span className="text-[10px] font-mono text-oryn-orange tracking-wider block mb-1">
                        {s.classification}
                      </span>
                      <p className="text-sm text-oryn-black/70 font-plex">
                        {peptide.fullName}
                      </p>
                      <p className="text-xs text-oryn-black/40 font-plex mt-1">
                        {peptide.type}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-oryn-orange tracking-wider block mb-1">
                        {s.mechanism}
                      </span>
                      <p className="text-sm text-oryn-black/70 font-plex">
                        {peptide.mechanism}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-oryn-orange tracking-wider block mb-1">
                        {s.researchAreas}
                      </span>
                      <p className="text-sm text-oryn-black/70 font-plex">
                        {peptide.research}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-oryn-black text-oryn-white relative overflow-hidden">
        <div className="absolute inset-0 bg-molecular-grid-dark" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-oryn-orange/10 blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="accent-line" />
            <span className="text-xs font-mono text-oryn-orange tracking-widest">
              {s.specsLabel}
            </span>
            <div className="accent-line" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-12">
            {s.specsTitle}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {s.specsItems.map((spec) => (
              <div key={spec.label} className="p-6 bg-oryn-orange/5 border border-oryn-orange/10 hover:border-oryn-orange/30 transition-colors">
                <div className="text-xl font-bold text-oryn-orange mb-1">
                  {spec.value}
                </div>
                <div className="text-xs text-oryn-white/40 font-mono tracking-wider">
                  {spec.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-oryn-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-molecular-grid-orange opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t.cta.titleLine1} <span className="opacity-60">{t.cta.titleLine2}</span>
          </h2>
          <p className="text-white/60 font-plex mb-8 max-w-lg mx-auto">
            {t.cta.description}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-oryn-orange font-bold text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
          >
            {t.cta.browseProducts}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
