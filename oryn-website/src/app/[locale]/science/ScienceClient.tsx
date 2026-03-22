"use client";

import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import { usePageTracking } from "@/hooks/usePageTracking";

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
    references: [
      { authors: "Sikiric P et al.", year: 2018, journal: "J Physiol Pharmacol", title: "Stable gastric pentadecapeptide BPC 157 — from Robert's cytoprotection/adaptive cytoprotection to peptidergic pharmacology/endogenous gastrointestinal tract peptide", doi: "10.26402/jpp.2018.6.01" },
      { authors: "Chang CH et al.", year: 2011, journal: "J Appl Physiol", title: "The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth, cell survival, and cell migration", doi: "10.1152/japplphysiol.00945.2010" },
      { authors: "Sikiric P et al.", year: 2006, journal: "J Physiol Paris", title: "Pentadecapeptide BPC 157 and its effects on a nitric oxide system", doi: "10.1016/j.jphysparis.2006.05.006" },
    ],
  },
  {
    name: "TB-500",
    fullName: "Thymosin Beta-4 Fragment",
    type: "43-amino acid peptide",
    mechanism: "Sequesters G-actin, promotes cell migration, reduces inflammation via NF-kB modulation",
    research: "Wound healing, cardiac repair, tissue regeneration, angiogenesis",
    category: "Tissue Repair",
    references: [
      { authors: "Goldstein AL et al.", year: 2012, journal: "Expert Opin Biol Ther", title: "Thymosin β4: a multi-functional regenerative peptide. Basic properties and clinical applications", doi: "10.1517/14712598.2012.687045" },
      { authors: "Sosne G et al.", year: 2010, journal: "Vitam Horm", title: "Thymosin beta 4: a potential novel therapy for neurotrophic keratopathy, dry eye, and ocular surface diseases", doi: "10.1016/S0083-6729(10)85010-6" },
      { authors: "Bock-Marquette I et al.", year: 2004, journal: "Nature", title: "Thymosin β4 activates integrin-linked kinase and promotes cardiac cell migration, survival and cardiac repair", doi: "10.1038/nature02582" },
    ],
  },
  {
    name: "CJC-1295",
    fullName: "Modified GRF(1-29)",
    type: "GHRH analogue",
    mechanism: "Sustained GH release via pituitary GHRH receptor agonism with DAC for extended half-life",
    research: "Growth hormone axis, body composition, sleep architecture, recovery",
    category: "GH Stimulation",
    references: [
      { authors: "Teichman SL et al.", year: 2006, journal: "J Clin Endocrinol Metab", title: "Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I secretion by CJC-1295, a long-acting analog of GH-releasing hormone, in healthy adults", doi: "10.1210/jc.2005-1536" },
      { authors: "Ionescu M, Bhatt DL", year: 2004, journal: "Growth Horm IGF Res", title: "Modified GRF(1-29) analogue — CJC-1295 stimulates GH secretion with extended pharmacokinetics", doi: "10.1016/j.ghir.2004.06.003" },
    ],
  },
  {
    name: "Ipamorelin",
    fullName: "Ipamorelin Acetate",
    type: "Pentapeptide GH secretagogue",
    mechanism: "Selective ghrelin receptor agonist, stimulates GH without affecting cortisol/prolactin",
    research: "Selective GH release, bone density, lean tissue, metabolic regulation",
    category: "GH Stimulation",
    references: [
      { authors: "Raun K et al.", year: 1998, journal: "Eur J Endocrinol", title: "Ipamorelin, the first selective growth hormone secretagogue", doi: "10.1530/eje.0.1390552" },
      { authors: "Johansen PB et al.", year: 1999, journal: "Growth Horm IGF Res", title: "Ipamorelin, a new growth-hormone-releasing peptide, induces longitudinal bone growth in rats", doi: "10.1054/ghir.1999.9998" },
    ],
  },
  {
    name: "Tirzepatide",
    fullName: "Tirzepatide",
    type: "Dual incretin receptor agonist",
    mechanism: "Simultaneous GIP and GLP-1 receptor activation, glucose-dependent insulin secretion",
    research: "Metabolic function, glycemic control, appetite regulation, body composition",
    category: "Metabolic",
    references: [
      { authors: "Jastreboff AM et al.", year: 2022, journal: "N Engl J Med", title: "Tirzepatide once weekly for the treatment of obesity", doi: "10.1056/NEJMoa2206038" },
      { authors: "Frías JP et al.", year: 2021, journal: "N Engl J Med", title: "Tirzepatide versus semaglutide once weekly in patients with type 2 diabetes", doi: "10.1056/NEJMoa2107519" },
      { authors: "Willard FS et al.", year: 2020, journal: "JCI Insight", title: "Tirzepatide is an imbalanced and biased dual GIP and GLP-1 receptor agonist", doi: "10.1172/jci.insight.140532" },
    ],
  },
  {
    name: "GHK-CU",
    fullName: "Glycyl-L-histidyl-L-lysine:copper(II)",
    type: "Copper tripeptide",
    mechanism: "Gene expression modulation, copper delivery, TGF-beta and collagen synthesis activation",
    research: "Skin remodeling, wound repair, antioxidant defense, anti-inflammatory",
    category: "Skin Repair",
    references: [
      { authors: "Pickart L et al.", year: 2012, journal: "Biomed Res Int", title: "GHK peptide as a natural modulator of multiple cellular pathways in skin regeneration", doi: "10.1155/2012/973426" },
      { authors: "Pickart L, Margolina A", year: 2018, journal: "Int J Mol Sci", title: "Regenerative and protective actions of the GHK-Cu peptide in the light of the new gene data", doi: "10.3390/ijms19071987" },
    ],
  },
  {
    name: "Glutathione",
    fullName: "L-Glutathione (reduced)",
    type: "Tripeptide (Glu-Cys-Gly)",
    mechanism: "Phase II conjugation, ROS neutralization, vitamin C/E recycling, detoxification",
    research: "Antioxidant defense, cellular detoxification, immune modulation, skin health",
    category: "Antioxidant",
    references: [
      { authors: "Forman HJ et al.", year: 2009, journal: "Mol Aspects Med", title: "Glutathione: overview of its protective roles, measurement, and biosynthesis", doi: "10.1016/j.mam.2008.08.006" },
      { authors: "Meister A", year: 1999, journal: "FASEB J", title: "Glutathione metabolism and its selective modification", doi: "10.1096/fasebj.13.9.1007" },
      { authors: "Weschawalit S et al.", year: 2017, journal: "Clin Cosmet Investig Dermatol", title: "Glutathione and its antiaging and antimelanogenic effects", doi: "10.2147/CCID.S128339" },
    ],
  },
  {
    name: "NAD+",
    fullName: "Nicotinamide Adenine Dinucleotide",
    type: "Dinucleotide coenzyme",
    mechanism: "Electron carrier in redox reactions, SIRT1-7 activation, PARP substrate for DNA repair",
    research: "Cellular energy, DNA repair, sirtuin activation, healthy aging, neuroprotection",
    category: "Metabolic & Anti-Aging",
    references: [
      { authors: "Verdin E", year: 2015, journal: "Science", title: "NAD+ in aging, metabolism, and neurodegeneration", doi: "10.1126/science.aac4854" },
      { authors: "Rajman L et al.", year: 2018, journal: "Cell Metab", title: "Therapeutic potential of NAD-boosting molecules: the in vivo evidence", doi: "10.1016/j.cmet.2018.02.011" },
      { authors: "Yoshino J et al.", year: 2018, journal: "Cell Metab", title: "NAD+ intermediates: the biology and therapeutic potential of NMN and NR", doi: "10.1016/j.cmet.2017.11.002" },
    ],
  },
];

export function ScienceClient() {
  const { t } = useLocale();
  const s = t.sciencePage;
  usePageTracking("science");

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
                {peptide.references && peptide.references.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-oryn-orange/10">
                    <span className="text-[10px] font-mono text-oryn-orange tracking-wider block mb-2">
                      REFERENCES
                    </span>
                    <ul className="space-y-1">
                      {peptide.references.map((ref, idx) => (
                        <li key={idx}>
                          <a
                            href={`https://doi.org/${ref.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-oryn-black/60 hover:text-oryn-orange transition-colors font-plex"
                          >
                            {ref.authors}, {ref.year}, <em>{ref.journal}</em>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline ml-1 opacity-40">
                              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                            </svg>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
