export interface PeptideEntry {
  slug: string;
  name: string;
  fullName: string;
  molecularFormula: string;
  molecularWeight: string;
  sequence: string;
  classification: string;
  mechanism: string;
  researchHistory: string;
  keyStudies: Array<{ title: string; year: string; finding: string }>;
  applications: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const PEPTIDE_ENTRIES: PeptideEntry[] = [
  {
    slug: "bpc-157",
    name: "BPC-157",
    fullName: "Body Protection Compound-157",
    molecularFormula: "C62H98N16O22",
    molecularWeight: "1419.53 Da",
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
    classification: "Gastric Pentadecapeptide",
    mechanism:
      "BPC-157 exerts its biological effects through multiple interconnected pathways. At the molecular level, it modulates the nitric oxide (NO) system, promoting vasodilation and angiogenesis — the formation of new blood vessels — in injured tissue. This enhanced blood supply is critical for delivering oxygen and nutrients to damaged areas, accelerating the healing process.\n\nThe peptide also interacts with the FAK-paxillin signalling pathway, which governs cell migration, adhesion, and proliferation. By upregulating growth factors such as EGF, VEGF, and FGF, BPC-157 stimulates fibroblast activity and collagen deposition, essential processes in tendon, ligament, and muscle repair.\n\nAdditionally, BPC-157 has demonstrated cytoprotective properties in the gastrointestinal tract, protecting mucosal integrity against damage from NSAIDs, alcohol, and stress-induced lesions. Its interaction with the dopaminergic and serotonergic systems also points to neuroprotective and mood-modulating potential, making it one of the most versatile peptides under active investigation.",
    researchHistory:
      "BPC-157 was first isolated from human gastric juice in the early 1990s by a research team at the University of Zagreb, led by Professor Predrag Sikiric. The discovery that a stable gastric peptide fragment could accelerate wound healing across multiple tissue types attracted significant scientific interest.\n\nSince its initial characterisation, BPC-157 has been the subject of over 100 peer-reviewed studies, primarily in animal models. These studies have investigated its effects on tendon healing, gastrointestinal protection, neurological recovery, and even bone fracture repair. While human clinical trials remain limited, the breadth and consistency of preclinical data have made BPC-157 one of the most widely researched peptides in regenerative medicine.",
    keyStudies: [
      {
        title: "Stable gastric pentadecapeptide BPC 157 in trials for inflammatory bowel disease",
        year: "2006",
        finding: "Demonstrated significant healing of inflammatory bowel lesions in animal models with oral and parenteral administration.",
      },
      {
        title: "Pentadecapeptide BPC 157 enhances the growth hormone receptor expression in tendon fibroblasts",
        year: "2014",
        finding: "Showed BPC-157 upregulates GH receptor expression, promoting tendon cell proliferation and collagen synthesis.",
      },
      {
        title: "BPC 157 and the NO system in the healing of damaged tissues",
        year: "2019",
        finding: "Established the central role of nitric oxide modulation in BPC-157's healing mechanism across multiple tissue types.",
      },
      {
        title: "BPC 157 counteracts the effect of NSAIDs on the gastrointestinal tract",
        year: "2010",
        finding: "Demonstrated complete reversal of NSAID-induced gastric lesions and intestinal damage in rat models.",
      },
    ],
    applications: [
      "Tendon and ligament repair research",
      "Gastrointestinal healing studies",
      "Neuroprotection and nerve regeneration",
      "Wound healing acceleration",
      "Anti-inflammatory response modulation",
      "Muscle tissue recovery research",
      "Bone fracture healing studies",
    ],
    faqs: [
      {
        question: "What is BPC-157 and where does it come from?",
        answer:
          "BPC-157 (Body Protection Compound-157) is a synthetic 15-amino acid peptide derived from a protective protein naturally found in human gastric juice. It was first isolated by researchers at the University of Zagreb and has been studied extensively for its regenerative and cytoprotective properties across multiple tissue types.",
      },
      {
        question: "What is the mechanism of action of BPC-157?",
        answer:
          "BPC-157 works through multiple pathways: it modulates the nitric oxide system to promote blood vessel formation, activates the FAK-paxillin pathway for cell migration and repair, upregulates growth factors (VEGF, EGF, FGF) for tissue regeneration, and provides cytoprotection in the gastrointestinal tract. It also interacts with dopaminergic and serotonergic systems.",
      },
      {
        question: "What research has been conducted on BPC-157?",
        answer:
          "Over 100 peer-reviewed studies have investigated BPC-157, primarily in animal models. Research spans tendon and ligament healing, gastrointestinal protection, neuroprotection, wound healing, bone repair, and inflammatory bowel disease. Human clinical trials are limited but preclinical results are consistently positive.",
      },
      {
        question: "How does ORYN deliver BPC-157?",
        answer:
          "ORYN BPC-157 is delivered via a precision peptide pen system containing 10mg in 3mL, formulated at pharmaceutical grade with >99% purity. The pen provides consistent dosing over 30 days, eliminating the need for reconstitution and reducing contamination risk compared to traditional vial-and-syringe methods.",
      },
    ],
  },
  {
    slug: "tb-500",
    name: "TB-500",
    fullName: "Thymosin Beta-4 Fragment",
    molecularFormula: "C212H350N56O78S",
    molecularWeight: "4963.44 Da",
    sequence: "Fragment of Thymosin Beta-4 (43-amino acid peptide, LKKTET active domain)",
    classification: "Thymic Peptide / Actin-Binding Protein Fragment",
    mechanism:
      "TB-500 is a synthetic version of the naturally occurring 43-amino acid peptide Thymosin Beta-4 (TB4), focusing on the active region responsible for actin binding and cell motility. Its primary mechanism involves binding to and sequestering monomeric actin (G-actin), which plays a central role in cellular migration, proliferation, and differentiation.\n\nBy modulating the actin cytoskeleton, TB-500 enables cells to move more efficiently to sites of injury. This enhanced cell migration is particularly relevant in wound healing, where keratinocytes, endothelial cells, and fibroblasts must travel to damaged tissue. TB-500 also promotes angiogenesis — new blood vessel formation — by upregulating VEGF and other angiogenic factors.\n\nBeyond structural repair, TB-500 exhibits potent anti-inflammatory properties, reducing the production of pro-inflammatory cytokines while promoting the expression of anti-inflammatory mediators. Research also suggests it can reduce fibrosis (scar tissue formation) and promote functional tissue regeneration rather than mere scarring, which is critical for outcomes in cardiac, muscular, and dermal repair.",
    researchHistory:
      "Thymosin Beta-4 was first isolated from the thymus gland in the 1960s by Allan Goldstein and colleagues. Initially studied for its role in immune regulation, researchers later discovered its profound effects on wound healing and tissue repair. The synthetic fragment TB-500 was developed to capture the most bioactive region of the full protein.\n\nResearch expanded significantly in the 2000s, with studies demonstrating TB-500's ability to promote cardiac repair following myocardial infarction, accelerate dermal wound healing, and reduce inflammation in various animal models. Its role in equine medicine, where it has been used extensively in racehorses for soft tissue repair, brought it to wider attention in the sports science community.",
    keyStudies: [
      {
        title: "Thymosin beta-4 promotes cardiac cell migration, survival and cardiac repair",
        year: "2004",
        finding: "Demonstrated TB4 activates cardiac progenitor cells and promotes heart tissue repair following myocardial infarction in mice.",
      },
      {
        title: "Thymosin beta-4 accelerates wound healing in diabetic mice",
        year: "2007",
        finding: "Showed significant acceleration of wound closure and re-epithelialisation in diabetic mouse models, a notoriously difficult healing context.",
      },
      {
        title: "Anti-inflammatory effects of thymosin beta-4",
        year: "2010",
        finding: "Established TB4's ability to downregulate NF-kB signalling and reduce pro-inflammatory cytokine production in multiple tissue models.",
      },
      {
        title: "Thymosin beta-4 reduces fibrosis and promotes tissue regeneration",
        year: "2012",
        finding: "Demonstrated reduced scar tissue formation and improved functional tissue recovery in cardiac and dermal injury models.",
      },
    ],
    applications: [
      "Wound healing and tissue repair studies",
      "Cardiac regeneration research",
      "Anti-inflammatory response research",
      "Soft tissue injury recovery",
      "Dermal healing and scarring reduction",
      "Muscle repair and regeneration",
      "Fibrosis reduction studies",
    ],
    faqs: [
      {
        question: "What is TB-500 and how is it related to Thymosin Beta-4?",
        answer:
          "TB-500 is a synthetic peptide that replicates the active region (LKKTET domain) of Thymosin Beta-4 (TB4), a naturally occurring 43-amino acid protein. While TB4 is produced throughout the body, TB-500 isolates the key fragment responsible for cell migration, wound healing, and anti-inflammatory effects.",
      },
      {
        question: "What is the mechanism of action of TB-500?",
        answer:
          "TB-500 works primarily by binding to G-actin, modulating the cytoskeleton to enhance cell migration to injury sites. It promotes angiogenesis (new blood vessel formation), reduces pro-inflammatory cytokines, and uniquely reduces fibrosis — promoting functional tissue regeneration rather than scar tissue formation.",
      },
      {
        question: "What does the research say about TB-500?",
        answer:
          "Extensive preclinical research shows TB-500 accelerates wound healing (including in diabetic models), promotes cardiac repair after myocardial infarction, reduces inflammation via NF-kB modulation, and decreases fibrosis. It has also been widely used in veterinary medicine for soft tissue injury in horses.",
      },
      {
        question: "How does ORYN deliver TB-500?",
        answer:
          "ORYN TB-500 is formulated at 15mg in a 3mL precision pen system with >99% purity. The pre-mixed pen eliminates reconstitution and provides consistent 30-day dosing, ensuring stability and reducing contamination risk during research protocols.",
      },
    ],
  },
  {
    slug: "cjc-1295",
    name: "CJC-1295",
    fullName: "CJC-1295 (Modified Growth Hormone Releasing Factor 1-29)",
    molecularFormula: "C152H252N44O42",
    molecularWeight: "3367.97 Da",
    sequence: "Modified GRF(1-29) with Drug Affinity Complex (DAC) technology",
    classification: "Growth Hormone-Releasing Hormone (GHRH) Analogue",
    mechanism:
      "CJC-1295 is a synthetic analogue of growth hormone-releasing hormone (GHRH) that binds to the GHRH receptor on somatotroph cells in the anterior pituitary gland. Upon receptor activation, it stimulates the synthesis and pulsatile release of growth hormone (GH) into the bloodstream.\n\nWhat distinguishes CJC-1295 from natural GHRH is its extended half-life. Through amino acid substitutions at positions 2, 8, 15, and 27 of the native GRF(1-29) sequence, CJC-1295 resists enzymatic degradation by dipeptidyl peptidase-IV (DPP-IV), which normally cleaves GHRH within minutes. Some formulations also incorporate Drug Affinity Complex (DAC) technology, which enables the peptide to bind to circulating albumin, further extending its duration of action to several days.\n\nThe resulting sustained GH elevation promotes downstream IGF-1 (Insulin-like Growth Factor-1) production in the liver, which mediates many of GH's anabolic, metabolic, and regenerative effects — including protein synthesis, fat oxidation, bone mineralisation, and tissue repair.",
    researchHistory:
      "CJC-1295 was developed in the mid-2000s by ConjuChem Biotechnologies (now Conjuchem LLC) as a long-acting GHRH analogue designed to overcome the ultra-short half-life of endogenous GHRH. The original formulation with DAC (Drug Affinity Complex) showed dramatic increases in mean GH and IGF-1 levels in human trials.\n\nA Phase II clinical trial published in 2006 demonstrated that a single subcutaneous injection of CJC-1295 DAC could elevate GH levels for 6-8 days and IGF-1 levels for up to 28 days. The no-DAC version (often called Mod GRF 1-29) has a shorter duration but remains one of the most studied GHRH analogues in peptide research, often combined with ghrelin mimetics like Ipamorelin for synergistic GH release.",
    keyStudies: [
      {
        title: "Prolonged stimulation of growth hormone and insulin-like growth factor I secretion by CJC-1295",
        year: "2006",
        finding: "A single dose elevated GH levels 2-10 fold and IGF-1 levels 1.5-3 fold for up to 28 days in healthy adults.",
      },
      {
        title: "Effects of a growth hormone-releasing hormone analog on sleep in healthy men",
        year: "2008",
        finding: "Demonstrated increased slow-wave (deep) sleep duration and improved sleep quality in subjects receiving GHRH analogue treatment.",
      },
      {
        title: "Synergistic effects of GHRH and GHRP on pulsatile GH secretion",
        year: "2009",
        finding: "Showed combining GHRH analogues with ghrelin-pathway peptides produces synergistic rather than merely additive GH release.",
      },
      {
        title: "CJC-1295 effects on body composition and metabolic markers",
        year: "2012",
        finding: "Reported improvements in lean body mass, fat reduction, and metabolic markers in subjects with sustained GH elevation.",
      },
    ],
    applications: [
      "Growth hormone secretion research",
      "Body composition and metabolism studies",
      "Sleep quality improvement research",
      "IGF-1 elevation protocols",
      "Anti-aging and longevity studies",
      "Synergistic GH release with ghrelin mimetics",
      "Recovery and regeneration research",
    ],
    faqs: [
      {
        question: "What is CJC-1295 and how does it work?",
        answer:
          "CJC-1295 is a synthetic analogue of Growth Hormone-Releasing Hormone (GHRH) that stimulates the pituitary gland to produce and release growth hormone. It has been modified with amino acid substitutions to resist enzymatic degradation, giving it a significantly longer half-life than natural GHRH.",
      },
      {
        question: "What is the difference between CJC-1295 with and without DAC?",
        answer:
          "CJC-1295 with DAC (Drug Affinity Complex) binds to circulating albumin, extending its half-life to several days and providing sustained GH elevation. CJC-1295 without DAC (Mod GRF 1-29) has a shorter duration of action, producing more natural pulsatile GH release patterns. Both versions stimulate the same GHRH receptor.",
      },
      {
        question: "What research supports CJC-1295?",
        answer:
          "Clinical trials have shown a single injection can elevate GH levels 2-10 fold and IGF-1 levels up to 3 fold for up to 28 days. Research also demonstrates improved sleep quality, enhanced body composition, and synergistic effects when combined with ghrelin-pathway peptides like Ipamorelin.",
      },
      {
        question: "How does ORYN deliver CJC-1295?",
        answer:
          "ORYN CJC-1295 is formulated at 5mg in a 3mL precision pen system with >99% purity. The pre-mixed pen ensures accurate dosing over 30 days, maintaining peptide stability and eliminating the reconstitution process required with traditional lyophilised vials.",
      },
    ],
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    fullName: "Ipamorelin Acetate",
    molecularFormula: "C38H49N9O5",
    molecularWeight: "711.85 Da",
    sequence: "Aib-His-D-2-Nal-D-Phe-Lys-NH2 (pentapeptide)",
    classification: "Growth Hormone Secretagogue / Ghrelin Receptor Agonist",
    mechanism:
      "Ipamorelin is a selective pentapeptide that acts as an agonist at the growth hormone secretagogue receptor (GHS-R1a), also known as the ghrelin receptor, located on somatotroph cells of the anterior pituitary. By mimicking the endogenous hunger hormone ghrelin at this receptor, it triggers a targeted pulse of growth hormone release.\n\nWhat makes Ipamorelin exceptional among GH secretagogues is its remarkable selectivity. Unlike GHRP-6, GHRP-2, and hexarelin — which also stimulate cortisol, prolactin, and ACTH release — Ipamorelin produces a clean GH pulse with minimal impact on other hormonal axes. This selectivity is attributed to its unique non-peptide backbone modifications that confer high receptor specificity.\n\nThe GH pulses stimulated by Ipamorelin follow a dose-dependent, saturable pattern that closely mimics physiological GH secretion. This means higher doses produce proportionally larger GH responses up to a ceiling, after which additional peptide has no further effect — a safety feature that prevents supraphysiological GH spikes.",
    researchHistory:
      "Ipamorelin was first described in 1998 by researchers at Novo Nordisk as part of a programme to develop selective GH secretagogues with fewer side effects than existing compounds. The initial characterisation demonstrated its remarkable selectivity — releasing GH without affecting cortisol, prolactin, FSH, LH, or TSH levels.\n\nSubsequent research throughout the 2000s and 2010s expanded the understanding of Ipamorelin's applications. Studies investigated its effects on bone density, body composition, gut motility (it became the first GHS-R agonist tested for post-operative ileus), and sleep quality. Its favourable side-effect profile has made it one of the most popular GH peptides in research settings, and it is frequently studied in combination with GHRH analogues like CJC-1295.",
    keyStudies: [
      {
        title: "Ipamorelin, the first selective growth hormone secretagogue",
        year: "1998",
        finding: "Demonstrated that Ipamorelin releases GH in a dose-dependent manner without affecting cortisol, prolactin, ACTH, FSH, LH, or TSH — the first GHS-R agonist to show this selectivity.",
      },
      {
        title: "Effects of ipamorelin on bone mineral content in rats",
        year: "2001",
        finding: "Showed significant increases in bone mineral content and bone strength in ovariectomised rats, suggesting applications in osteoporosis research.",
      },
      {
        title: "Ipamorelin for post-operative gastric ileus: Phase II trial",
        year: "2008",
        finding: "Demonstrated accelerated recovery of gastrointestinal motility following abdominal surgery, the first clinical trial of a GHS-R agonist for gut motility.",
      },
      {
        title: "Synergistic GH release from combined GHRH and GHS-R agonist administration",
        year: "2011",
        finding: "Confirmed that combining Ipamorelin with GHRH analogues produces synergistic GH release exceeding the sum of individual effects.",
      },
    ],
    applications: [
      "Selective GH secretion research",
      "Body composition and lean mass studies",
      "Bone density and osteoporosis research",
      "Sleep quality and recovery studies",
      "Gut motility and post-surgical recovery",
      "Synergistic protocols with CJC-1295",
      "Age-related GH decline research",
    ],
    faqs: [
      {
        question: "What is Ipamorelin and why is it considered selective?",
        answer:
          "Ipamorelin is a synthetic pentapeptide that stimulates growth hormone release by activating the ghrelin receptor (GHS-R1a). Unlike other GH secretagogues, it does not significantly affect cortisol, prolactin, ACTH, or other hormones — making it the most selective GH-releasing peptide discovered, with the cleanest side-effect profile.",
      },
      {
        question: "How does Ipamorelin differ from other GH peptides?",
        answer:
          "Ipamorelin's selectivity sets it apart. While GHRP-6 can increase cortisol by up to 50% and stimulate intense hunger, Ipamorelin produces a focused GH pulse with negligible effects on other hormones. It also has a dose-dependent, saturable response — meaning it cannot overshoot to supraphysiological GH levels.",
      },
      {
        question: "What research has been done on Ipamorelin?",
        answer:
          "Since its discovery in 1998 by Novo Nordisk, Ipamorelin has been studied for GH selectivity, bone density improvement, gut motility recovery (Phase II clinical trial for post-operative ileus), sleep quality, and synergistic GH release when combined with GHRH analogues like CJC-1295.",
      },
      {
        question: "How does ORYN deliver Ipamorelin?",
        answer:
          "ORYN Ipamorelin is formulated at 6mg in a 3mL precision pen system with >99% purity. The pre-mixed pen provides consistent dosing over 30 days. It is often used in research protocols alongside ORYN CJC-1295 for synergistic GH release studies.",
      },
    ],
  },
  {
    slug: "tirzepatide-pen",
    name: "Tirzepatide",
    fullName: "Tirzepatide (Dual GIP/GLP-1 Receptor Agonist)",
    molecularFormula: "C225H348N48O68",
    molecularWeight: "4813.45 Da",
    sequence: "39-amino acid peptide with C20 fatty diacid moiety (GIP-modified backbone)",
    classification: "Dual GIP/GLP-1 Receptor Agonist (Incretin Mimetic)",
    mechanism:
      "Tirzepatide represents a paradigm shift in metabolic peptide science as the first dual GIP (Glucose-dependent Insulinotropic Polypeptide) and GLP-1 (Glucagon-Like Peptide-1) receptor agonist. By activating both incretin pathways simultaneously, it produces metabolic effects that exceed what either pathway achieves alone.\n\nAt the GLP-1 receptor, tirzepatide slows gastric emptying, suppresses glucagon secretion, enhances glucose-dependent insulin release, and activates satiety centres in the hypothalamus — reducing appetite and food intake. At the GIP receptor, it enhances insulin sensitivity in adipose tissue, promotes fat metabolism, and may have direct effects on energy expenditure.\n\nThe 39-amino acid peptide is engineered with a C20 fatty diacid moiety that enables albumin binding, extending its half-life to approximately 5 days — allowing once-weekly dosing. Clinical trials have demonstrated unprecedented efficacy in both glycaemic control and weight reduction, with the SURMOUNT-1 trial showing mean weight loss of 22.5% at the highest dose, surpassing all previous pharmacological interventions.",
    researchHistory:
      "Tirzepatide was developed by Eli Lilly and Company, building on decades of incretin biology research. The concept of dual incretin receptor agonism emerged from observations that GIP and GLP-1 activate complementary metabolic pathways, and that simultaneous activation might produce synergistic benefits.\n\nThe SURPASS clinical trial programme (for type 2 diabetes) and SURMOUNT programme (for obesity) established tirzepatide as a breakthrough compound. SURPASS-2 (2021) demonstrated superiority over semaglutide 1mg for HbA1c reduction, while SURMOUNT-1 (2022) showed 22.5% mean body weight reduction — the largest weight loss achieved by any pharmacological agent in a Phase III trial. The FDA approved tirzepatide as Mounjaro (for T2D) in 2022 and Zepbound (for obesity) in 2023.",
    keyStudies: [
      {
        title: "SURPASS-2: Tirzepatide versus semaglutide in patients with type 2 diabetes",
        year: "2021",
        finding: "Tirzepatide demonstrated superior HbA1c reduction vs. semaglutide 1mg, with significantly greater weight loss at all three dose levels.",
      },
      {
        title: "SURMOUNT-1: Tirzepatide for treatment of obesity",
        year: "2022",
        finding: "72-week treatment achieved 22.5% mean weight reduction at the 15mg dose in participants with obesity, the highest ever recorded for a pharmaceutical agent.",
      },
      {
        title: "Dual GIP/GLP-1 receptor agonism: mechanisms and metabolic effects",
        year: "2020",
        finding: "Characterised the synergistic metabolic benefits of dual incretin activation, including enhanced insulin sensitivity, fat metabolism, and appetite regulation.",
      },
      {
        title: "SURMOUNT-4: Sustained weight loss maintenance with tirzepatide",
        year: "2023",
        finding: "Demonstrated that continued tirzepatide treatment maintained weight loss over 88 weeks, while discontinuation led to significant regain, underscoring the importance of sustained treatment.",
      },
    ],
    applications: [
      "Metabolic syndrome and obesity research",
      "Type 2 diabetes and glycaemic control studies",
      "Incretin biology and dual receptor agonism",
      "Appetite regulation and satiety research",
      "Cardiovascular risk reduction studies",
      "Body composition and fat metabolism research",
      "Comparative pharmacology with GLP-1 agonists",
    ],
    faqs: [
      {
        question: "What is tirzepatide and how is it different from semaglutide?",
        answer:
          "Tirzepatide is a dual GIP/GLP-1 receptor agonist — it activates both major incretin pathways simultaneously. Semaglutide is a GLP-1 receptor agonist only. Clinical trials show tirzepatide achieves greater weight loss (up to 22.5%) and superior glycaemic control compared to semaglutide, likely due to the synergistic effects of dual receptor activation.",
      },
      {
        question: "What is the mechanism of action of tirzepatide?",
        answer:
          "Tirzepatide activates GIP and GLP-1 receptors simultaneously. GLP-1 pathway activation slows gastric emptying, reduces appetite, and enhances insulin release. GIP pathway activation improves insulin sensitivity in fat tissue and promotes fat metabolism. The combined effect produces metabolic benefits exceeding either pathway alone.",
      },
      {
        question: "What clinical evidence supports tirzepatide?",
        answer:
          "The SURPASS trials demonstrated tirzepatide's superiority over semaglutide for diabetes management. The SURMOUNT trials showed 22.5% mean weight reduction at 15mg — the largest pharmacological weight loss ever recorded. Tirzepatide is FDA-approved as Mounjaro (diabetes) and Zepbound (obesity).",
      },
      {
        question: "How does ORYN deliver tirzepatide?",
        answer:
          "ORYN offers two tirzepatide delivery systems: the Peptide Pen (10mg, 30-day precision dosing) and the MediT Pen (40mg prefilled, once-weekly single-use injection). Both are >99% purity and GMP manufactured. The MediT Pen is designed for convenience with pre-set weekly dosing.",
      },
    ],
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    fullName: "Glycyl-L-Histidyl-L-Lysine Copper Complex",
    molecularFormula: "C14H24CuN6O4",
    molecularWeight: "403.92 Da",
    sequence: "Gly-His-Lys (copper-bound tripeptide)",
    classification: "Copper Tripeptide / Matrikine",
    mechanism:
      "GHK-Cu (glycyl-L-histidyl-L-lysine copper) is a naturally occurring tripeptide with a remarkably high affinity for copper(II) ions. It functions as a matrikine — a small peptide derived from extracellular matrix proteins that signals tissue repair and remodelling processes.\n\nThe peptide activates multiple regenerative pathways simultaneously. It stimulates collagen types I and III synthesis, increases elastin production, and promotes glycosaminoglycan (GAG) accumulation — including hyaluronic acid — in the extracellular matrix. Through TGF-beta modulation, it regulates the balance between tissue deposition and degradation, promoting remodelling rather than fibrosis.\n\nGHK-Cu also acts as a potent antioxidant by modulating superoxide dismutase (SOD) and serves as an anti-inflammatory agent by suppressing the production of TGF-beta 1 and other fibrotic cytokines. Recent genomic studies have shown it can reset the expression of over 4,000 genes toward a healthier, younger state — affecting DNA repair pathways, oxidative stress response, and stem cell biology. This broad gene-resetting capability is unique among peptides and underlies its diverse applications in skin science, wound healing, and hair follicle research.",
    researchHistory:
      "GHK-Cu was first identified in human plasma in 1973 by Dr. Loren Pickart, who observed that plasma from young individuals (age 20-25) could stimulate older liver cells to produce proteins characteristic of younger tissue. The active factor was isolated and identified as a tripeptide complexed with copper.\n\nSince its discovery, over 70 published studies have investigated GHK-Cu's properties. Research in the 1980s-1990s focused on wound healing and skin biology, establishing its role in collagen synthesis and tissue remodelling. The 2010s brought a revolution when broad gene expression studies revealed GHK-Cu could modulate thousands of genes — far more than expected for such a small molecule — opening new avenues in anti-aging, regenerative medicine, and cancer biology research.",
    keyStudies: [
      {
        title: "The human tripeptide GHK-Cu in the prevention of oxidative stress and degenerative conditions of aging",
        year: "2012",
        finding: "Demonstrated GHK-Cu resets the expression of 4,000+ human genes, with broad anti-aging effects on DNA repair, oxidative stress response, and tissue remodelling pathways.",
      },
      {
        title: "GHK-Cu promotes hair follicle growth and increases follicle size",
        year: "2007",
        finding: "Showed GHK-Cu enlarges hair follicles, extends the anagen (growth) phase, and stimulates dermal papilla cell proliferation — key findings for hair loss research.",
      },
      {
        title: "Copper peptide GHK-Cu and skin collagen synthesis",
        year: "2000",
        finding: "Established that GHK-Cu stimulates collagen I and III synthesis in human fibroblasts, with effects exceeding those of retinoic acid in controlled comparisons.",
      },
      {
        title: "Anti-inflammatory activity of the peptide GHK-Cu after acute lung injury",
        year: "2015",
        finding: "Demonstrated potent anti-inflammatory effects in lung tissue, reducing TNF-alpha and IL-6 while promoting tissue repair — expanding applications beyond dermatology.",
      },
    ],
    applications: [
      "Skin rejuvenation and anti-aging research",
      "Collagen and elastin synthesis studies",
      "Hair follicle growth and alopecia research",
      "Wound healing acceleration",
      "Anti-inflammatory and antioxidant research",
      "Gene expression and epigenetic studies",
      "Scar reduction and tissue remodelling",
    ],
    faqs: [
      {
        question: "What is GHK-Cu and why is it significant?",
        answer:
          "GHK-Cu is a naturally occurring copper tripeptide (Gly-His-Lys bound to copper) first discovered in human plasma. It is significant because it can reset the expression of over 4,000 genes toward a healthier state — affecting DNA repair, antioxidant defence, collagen synthesis, and stem cell biology. It is one of the most versatile peptides in regenerative research.",
      },
      {
        question: "How does GHK-Cu benefit skin and hair?",
        answer:
          "GHK-Cu stimulates collagen I and III synthesis, increases elastin production, promotes hyaluronic acid accumulation, and modulates tissue remodelling. For hair, it enlarges follicles, extends the growth (anagen) phase, and stimulates dermal papilla cells. Over 70 studies support these findings across dermatology and trichology.",
      },
      {
        question: "What is unique about GHK-Cu's gene expression effects?",
        answer:
          "Genomic studies have shown GHK-Cu modulates over 4,000 human genes — an extraordinary range for a tripeptide. It upregulates genes involved in DNA repair, antioxidant defence, and stem cell function, while suppressing genes associated with inflammation, fibrosis, and tissue degradation. This broad gene-resetting capability is unique among peptides.",
      },
      {
        question: "How does ORYN deliver GHK-Cu?",
        answer:
          "ORYN GHK-Cu is formulated at a potent 60mg dose in a 3mL precision pen system with >99% purity. This is one of the highest concentrations available for research, delivered in a pre-mixed pen that maintains copper peptide stability and provides consistent 30-day dosing.",
      },
    ],
  },
  {
    slug: "glutathione",
    name: "Glutathione",
    fullName: "L-Glutathione (Reduced Form, GSH)",
    molecularFormula: "C10H17N3O6S",
    molecularWeight: "307.32 Da",
    sequence: "L-Glutamate-L-Cysteine-Glycine (gamma-linked tripeptide)",
    classification: "Endogenous Antioxidant Tripeptide",
    mechanism:
      "Glutathione (GSH) is the body's most abundant intracellular antioxidant, present in virtually every cell at millimolar concentrations. Its mechanism centres on the reactive thiol (-SH) group of its cysteine residue, which can directly neutralise reactive oxygen species (ROS), reactive nitrogen species (RNS), and free radicals through electron donation.\n\nBeyond direct scavenging, glutathione functions as a cofactor for the glutathione peroxidase (GPx) family of enzymes, which reduce hydrogen peroxide and lipid hydroperoxides to water and alcohols respectively. It also powers the glutathione S-transferase (GST) family, which conjugates glutathione to electrophilic toxins, drugs, and xenobiotics — marking them for excretion. This Phase II detoxification pathway is essential for eliminating environmental pollutants, drug metabolites, and carcinogens.\n\nGlutathione also plays a critical role in immune function. It is required for the proliferation and activation of T lymphocytes and natural killer (NK) cells, and it regulates the redox state of immune cell signalling pathways. Melanin regulation is another documented effect — glutathione inhibits tyrosinase activity and shifts melanin production from darker eumelanin toward lighter pheomelanin, which underlies its researched skin brightening properties.",
    researchHistory:
      "Glutathione was first discovered in 1888 by French chemist J. de Rey-Pailhade, who identified a substance in yeast he called 'philothion' (from Greek, 'love of sulphur'). The molecule was formally characterised as the tripeptide gamma-glutamylcysteinylglycine by Sir Frederick Gowland Hopkins in 1921, earning him the Nobel Prize in Physiology in 1929.\n\nResearch into glutathione's biological roles expanded dramatically from the 1960s onward, with Alton Meister's work establishing the gamma-glutamyl cycle and the central role of GSH in cellular detoxification. Since then, over 180,000 published papers reference glutathione, making it one of the most studied molecules in biochemistry. Its roles in aging, cancer prevention, immune function, liver health, and skin biology continue to generate active research worldwide.",
    keyStudies: [
      {
        title: "Glutathione metabolism and its implications for health",
        year: "2004",
        finding: "Comprehensive review establishing glutathione's central role in antioxidant defence, immune function, detoxification, and cellular signalling across all organ systems.",
      },
      {
        title: "The effect of glutathione on melanin synthesis in human melanocytes",
        year: "2008",
        finding: "Demonstrated that glutathione inhibits tyrosinase and shifts melanogenesis toward pheomelanin, providing the biochemical basis for skin brightening effects.",
      },
      {
        title: "Glutathione and immune function",
        year: "2011",
        finding: "Established that intracellular glutathione levels directly regulate T lymphocyte proliferation and NK cell cytotoxic activity, with depleted GSH leading to impaired immunity.",
      },
      {
        title: "Age-related decline in glutathione and implications for neurodegeneration",
        year: "2018",
        finding: "Documented the progressive decline in brain glutathione with aging and its association with increased oxidative stress and neurodegenerative disease risk.",
      },
    ],
    applications: [
      "Antioxidant defence and oxidative stress research",
      "Liver detoxification and hepatoprotection studies",
      "Immune function and lymphocyte activation research",
      "Skin brightening and melanin regulation",
      "Neurodegenerative disease research",
      "Anti-aging and longevity studies",
      "Drug metabolism and toxicology research",
    ],
    faqs: [
      {
        question: "What is glutathione and why is it called the 'master antioxidant'?",
        answer:
          "Glutathione (GSH) is a tripeptide (glutamate-cysteine-glycine) present in every cell of the body. It earned the 'master antioxidant' title because it directly neutralises free radicals, recycles other antioxidants (vitamins C and E), powers the glutathione peroxidase enzyme system, and drives Phase II liver detoxification. No other single molecule performs all these functions.",
      },
      {
        question: "Why is injectable glutathione more effective than oral supplements?",
        answer:
          "Oral glutathione has extremely poor bioavailability — the tripeptide is broken down by digestive enzymes and gastric acid before absorption. Studies show less than 5% reaches the bloodstream intact. ORYN's pen-delivered glutathione bypasses the digestive system entirely, providing near-complete bioavailability of the active reduced form (GSH).",
      },
      {
        question: "What happens to glutathione levels as we age?",
        answer:
          "Intracellular glutathione levels decline progressively with age — by approximately 10-15% per decade after age 40. This decline is associated with increased oxidative stress, impaired immune function, reduced detoxification capacity, and higher susceptibility to age-related diseases. Maintaining glutathione levels is a focus of longevity research.",
      },
      {
        question: "How does ORYN deliver glutathione?",
        answer:
          "ORYN Glutathione is formulated at a potent 6g dose in a 3mL precision pen system with >99% purity. This high-concentration formulation delivers the reduced (active) form of glutathione directly, bypassing digestive degradation and providing consistent 30-day dosing for research protocols.",
      },
    ],
  },
  {
    slug: "nad-plus",
    name: "NAD+",
    fullName: "Nicotinamide Adenine Dinucleotide (Oxidised Form)",
    molecularFormula: "C21H27N7O14P2",
    molecularWeight: "663.43 Da",
    sequence: "Nicotinamide mononucleotide + Adenosine monophosphate (dinucleotide coenzyme)",
    classification: "Dinucleotide Coenzyme / Metabolic Cofactor",
    mechanism:
      "NAD+ (Nicotinamide Adenine Dinucleotide) is a coenzyme present in every living cell, functioning as a critical electron carrier in cellular metabolism. In its oxidised form (NAD+), it accepts electrons from metabolic reactions; in its reduced form (NADH), it donates them to the electron transport chain for ATP production. This redox cycling is fundamental to energy metabolism — without NAD+, cells cannot convert food into usable energy.\n\nBeyond energy metabolism, NAD+ serves as a substrate (not just a cofactor) for three major enzyme families: sirtuins (SIRT1-7), poly-ADP-ribose polymerases (PARPs), and CD38/CD157 ectoenzymes. Sirtuins are NAD+-dependent deacetylases that regulate gene expression, DNA repair, mitochondrial biogenesis, and inflammatory pathways — they are central to current theories of biological aging. PARPs consume NAD+ to repair DNA damage, and CD38 uses NAD+ in immune cell signalling.\n\nThe critical insight driving NAD+ research is that cellular NAD+ levels decline by approximately 50% between ages 40 and 60. This decline impairs sirtuin and PARP activity, leading to reduced DNA repair capacity, mitochondrial dysfunction, chronic inflammation (inflammaging), and metabolic decline. Replenishing NAD+ levels is therefore a primary target of geroscience research.",
    researchHistory:
      "NAD+ was discovered in 1906 by Arthur Harden and William Young during their studies of yeast fermentation, making it one of the oldest known biological molecules. Hans von Euler-Chelpin received the Nobel Prize in Chemistry in 1929 for elucidating its role in fermentation, and subsequent Nobel-winning work by Otto Warburg (1931) and Arthur Kornberg (1959) further characterised its metabolic functions.\n\nThe modern era of NAD+ research was catalysed by the discovery of sirtuins in the early 2000s. David Sinclair at Harvard Medical School demonstrated that declining NAD+ levels drive age-related metabolic dysfunction, and that replenishing NAD+ could reverse certain markers of aging in animal models. This work — published in landmark papers in Cell (2013) and Science (2017) — launched a global research effort into NAD+ biology and its therapeutic potential for aging, neurodegeneration, and metabolic disease.",
    keyStudies: [
      {
        title: "Declining NAD+ induces a pseudohypoxic state disrupting nuclear-mitochondrial communication during aging",
        year: "2013",
        finding: "Demonstrated that restoring NAD+ levels in aged mice reversed mitochondrial dysfunction and restored nuclear-mitochondrial communication to youthful levels.",
      },
      {
        title: "NAD+ repletion improves mitochondrial and stem cell function and enhances lifespan in mice",
        year: "2016",
        finding: "Showed NAD+ supplementation improved muscle stem cell function, increased mitochondrial activity, and extended lifespan in aged mice.",
      },
      {
        title: "NAD+ metabolism and its roles in cellular processes during ageing",
        year: "2021",
        finding: "Comprehensive review establishing the central role of NAD+ decline in age-related diseases and the therapeutic potential of NAD+ replenishment strategies.",
      },
      {
        title: "CD38 dictates age-related NAD+ decline and mitochondrial dysfunction",
        year: "2016",
        finding: "Identified the enzyme CD38 as the primary driver of age-related NAD+ depletion, increasing 2-3 fold with age and consuming cellular NAD+ stores.",
      },
    ],
    applications: [
      "Aging and longevity research",
      "Mitochondrial function and bioenergetics",
      "DNA repair and genomic stability studies",
      "Sirtuin biology and gene regulation",
      "Neurodegenerative disease research",
      "Metabolic syndrome and insulin sensitivity",
      "Stem cell function and regeneration",
    ],
    faqs: [
      {
        question: "What is NAD+ and why does it matter for aging?",
        answer:
          "NAD+ (Nicotinamide Adenine Dinucleotide) is a coenzyme in every cell that drives energy production, DNA repair, and gene regulation via sirtuins. Cellular NAD+ levels decline approximately 50% between ages 40-60, impairing these critical functions. Restoring NAD+ is a primary focus of longevity research, with studies showing reversal of age-related dysfunction in animal models.",
      },
      {
        question: "How does NAD+ affect cellular energy production?",
        answer:
          "NAD+ is an essential electron carrier in glycolysis, the citric acid cycle, and the mitochondrial electron transport chain — the three stages of cellular energy (ATP) production. Without adequate NAD+, cells cannot efficiently convert nutrients into energy, leading to mitochondrial dysfunction and metabolic decline.",
      },
      {
        question: "What is the relationship between NAD+ and sirtuins?",
        answer:
          "Sirtuins (SIRT1-7) are NAD+-dependent enzymes that regulate DNA repair, gene expression, mitochondrial health, and inflammatory pathways. They consume NAD+ as a substrate during their activity, meaning their function directly depends on NAD+ availability. Declining NAD+ levels with age impair sirtuin activity, contributing to age-related disease.",
      },
      {
        question: "How does ORYN deliver NAD+?",
        answer:
          "ORYN offers NAD+ in two delivery systems: the Peptide Pen (500mg, 30-day precision dosing) and the NovaDose cartridge system (500mg, daily microdosing). Both deliver pharmaceutical-grade NAD+ with near 100% bioavailability, providing a more affordable and convenient alternative to IV NAD+ infusions.",
      },
    ],
  },
  {
    slug: "semaglutide",
    name: "Semaglutide",
    fullName: "Semaglutide (GLP-1 Receptor Agonist)",
    molecularFormula: "C187H291N45O59",
    molecularWeight: "4113.58 Da",
    sequence: "Modified GLP-1(7-37) analogue with C18 fatty diacid chain (31-amino acid backbone)",
    classification: "GLP-1 Receptor Agonist (Incretin Mimetic)",
    mechanism:
      "Semaglutide is a long-acting analogue of human glucagon-like peptide-1 (GLP-1) that binds to and activates the GLP-1 receptor with high affinity. Endogenous GLP-1 is an incretin hormone secreted by intestinal L-cells following food intake, but its native form has a half-life of only 1-2 minutes due to rapid degradation by dipeptidyl peptidase-4 (DPP-4).\n\nSemaglutide overcomes this limitation through two key modifications: an amino acid substitution at position 8 (Ala8Aib) that confers DPP-4 resistance, and a C18 fatty diacid chain attached via a linker at position 26 that enables strong non-covalent binding to serum albumin. These modifications extend the half-life to approximately 7 days, enabling once-weekly dosing.\n\nUpon GLP-1 receptor activation, semaglutide exerts multiple physiological effects: it enhances glucose-dependent insulin secretion from pancreatic beta cells, suppresses glucagon release from alpha cells, delays gastric emptying, and — critically for weight management — acts on GLP-1 receptors in the hypothalamus and brainstem to reduce appetite and increase satiety. The central nervous system effects on appetite regulation are believed to be the primary driver of the substantial weight loss observed in clinical trials.",
    researchHistory:
      "Semaglutide was developed by Novo Nordisk, building on decades of incretin biology research that began with the discovery of GLP-1's insulinotropic effects in the 1980s. The first GLP-1 receptor agonist, exenatide, was approved in 2005, but its twice-daily dosing was a limitation. Liraglutide (once-daily) followed in 2010.\n\nSemaglutide represented a generational advance with once-weekly subcutaneous dosing (Ozempic, approved 2017 for type 2 diabetes) and later an oral formulation (Rybelsus, 2019) — the first oral GLP-1 agonist. The landmark STEP clinical trial programme then demonstrated unprecedented weight loss efficacy: the 2021 STEP 1 trial showed 14.9% mean body weight reduction at 68 weeks, leading to FDA approval of Wegovy for chronic weight management. Semaglutide has since become one of the most prescribed and publicly discussed pharmaceutical compounds worldwide.",
    keyStudies: [
      {
        title: "STEP 1: Once-weekly semaglutide 2.4 mg for weight management",
        year: "2021",
        finding: "Demonstrated 14.9% mean body weight reduction over 68 weeks in adults with obesity, with 86% of participants losing at least 5% of body weight.",
      },
      {
        title: "SUSTAIN-6: Cardiovascular outcomes with semaglutide in type 2 diabetes",
        year: "2016",
        finding: "Showed a 26% reduction in major adverse cardiovascular events (MACE) in patients with type 2 diabetes, establishing cardiovascular safety and benefit.",
      },
      {
        title: "SELECT: Semaglutide and cardiovascular outcomes in obesity",
        year: "2023",
        finding: "Demonstrated a 20% reduction in major cardiovascular events in overweight/obese adults without diabetes — the first weight-loss drug to show cardiovascular benefit independent of diabetes.",
      },
      {
        title: "OASIS 1: Oral semaglutide 50mg for weight management",
        year: "2023",
        finding: "Showed that higher-dose oral semaglutide achieved 15.1% weight loss at 68 weeks, approaching the efficacy of injectable formulations.",
      },
    ],
    applications: [
      "Weight management and obesity research",
      "Type 2 diabetes and glycaemic control",
      "Cardiovascular risk reduction studies",
      "Appetite regulation and satiety mechanisms",
      "Metabolic syndrome research",
      "Non-alcoholic steatohepatitis (NASH) studies",
      "Incretin biology and GLP-1 receptor pharmacology",
    ],
    faqs: [
      {
        question: "What is semaglutide and how does it work?",
        answer:
          "Semaglutide is a long-acting GLP-1 receptor agonist that mimics the incretin hormone GLP-1. It works by enhancing insulin secretion, suppressing glucagon, delaying gastric emptying, and — most significantly for weight management — acting on brain appetite centres to reduce hunger and increase feelings of fullness. Its half-life of approximately 7 days allows once-weekly dosing.",
      },
      {
        question: "What weight loss results has semaglutide achieved in clinical trials?",
        answer:
          "The STEP 1 trial demonstrated 14.9% mean body weight reduction over 68 weeks with semaglutide 2.4mg weekly. In STEP 2, participants with type 2 diabetes lost 9.6% of body weight. These results established semaglutide as one of the most effective pharmacological agents for weight management ever studied.",
      },
      {
        question: "What is the difference between Ozempic, Wegovy, and Rybelsus?",
        answer:
          "All three contain semaglutide but are approved for different indications and doses. Ozempic (0.5-2mg weekly injection) is for type 2 diabetes. Wegovy (2.4mg weekly injection) is for chronic weight management. Rybelsus (7-14mg daily oral tablet) is for type 2 diabetes and was the first oral GLP-1 agonist. The active compound and mechanism are identical.",
      },
      {
        question: "Does semaglutide have cardiovascular benefits?",
        answer:
          "Yes. The SUSTAIN-6 trial showed a 26% reduction in major cardiovascular events in diabetic patients. The SELECT trial (2023) demonstrated a 20% cardiovascular risk reduction in obese individuals without diabetes — making semaglutide the first weight management drug to show cardiovascular benefit independent of diabetes control.",
      },
    ],
  },
  {
    slug: "mk-677",
    name: "MK-677",
    fullName: "MK-677 / Ibutamoren Mesylate",
    molecularFormula: "C27H36N4O5S",
    molecularWeight: "528.66 Da",
    sequence: "Non-peptide small molecule (spiroindoline sulfonamide scaffold)",
    classification: "Growth Hormone Secretagogue / Ghrelin Receptor Agonist (Non-Peptide)",
    mechanism:
      "MK-677 (Ibutamoren) is a non-peptide, orally active agonist of the growth hormone secretagogue receptor (GHS-R1a), the same ghrelin receptor targeted by peptide secretagogues like GHRP-6 and Ipamorelin. However, unlike those peptides, MK-677 is a small molecule with full oral bioavailability, eliminating the need for injection.\n\nUpon binding to GHS-R1a on pituitary somatotroph cells, MK-677 triggers growth hormone (GH) release in a pulsatile fashion that mimics physiological secretion patterns. It increases both the amplitude and frequency of GH pulses without disrupting the normal circadian rhythm of GH release. This leads to sustained elevation of circulating GH and, consequently, insulin-like growth factor-1 (IGF-1) levels.\n\nMK-677 also has a distinctive mechanism regarding cortisol: while it causes a transient, modest increase in cortisol following initial dosing, this effect does not persist with continued administration. Its long half-life of approximately 24 hours allows once-daily oral dosing, and unlike exogenous GH administration, MK-677 preserves the negative feedback mechanisms that prevent excessive GH accumulation.",
    researchHistory:
      "MK-677 was developed by Merck & Co. in the 1990s as part of a programme to create orally available growth hormone secretagogues. The compound was designed through structure-activity relationship studies to mimic ghrelin's action at GHS-R1a while maintaining drug-like oral bioavailability — a significant pharmaceutical achievement.\n\nClinical trials in the late 1990s and 2000s demonstrated MK-677's ability to increase GH and IGF-1 levels in young and elderly subjects, improve nitrogen balance (an indicator of protein anabolism), enhance sleep quality, and increase bone mineral density over extended treatment periods. A notable 2-year study in elderly adults showed sustained IGF-1 elevation and increased bone mineral density at the femoral neck. Despite promising results, Merck did not pursue FDA approval, and MK-677 remains an investigational compound widely studied in research settings.",
    keyStudies: [
      {
        title: "MK-677, an orally active growth hormone secretagogue, reverses diet-induced catabolism",
        year: "1998",
        finding: "Demonstrated that MK-677 reversed nitrogen wasting in calorie-restricted subjects, suggesting potent anti-catabolic and anabolic properties mediated by increased GH/IGF-1.",
      },
      {
        title: "Two-year effects of MK-677 on bone mineral density in elderly adults",
        year: "2001",
        finding: "Showed that 2 years of daily MK-677 increased bone mineral density at the femoral neck in postmenopausal women, with sustained IGF-1 elevation throughout the study.",
      },
      {
        title: "Effects of MK-677 on sleep quality and nocturnal GH release",
        year: "1997",
        finding: "Demonstrated a 50% increase in stage IV (deep) sleep duration and a 20% increase in REM sleep, with enhanced nocturnal GH pulse amplitude in both young and elderly subjects.",
      },
      {
        title: "Oral administration of growth hormone secretagogue MK-677 increases IGF-1 in elderly subjects",
        year: "2008",
        finding: "Confirmed sustained IGF-1 elevation to youthful levels in subjects aged 60-81 with daily oral MK-677, without significant changes in cortisol or thyroid hormones.",
      },
    ],
    applications: [
      "Growth hormone secretion and IGF-1 research",
      "Body composition and muscle mass studies",
      "Bone density and osteoporosis research",
      "Sleep architecture and quality studies",
      "Age-related GH decline and sarcopenia",
      "Nitrogen balance and anti-catabolic research",
      "Oral GH secretagogue pharmacology",
    ],
    faqs: [
      {
        question: "What is MK-677 and how does it differ from peptide GH secretagogues?",
        answer:
          "MK-677 (Ibutamoren) is a non-peptide, orally active ghrelin receptor agonist that stimulates growth hormone release. Unlike peptide secretagogues (GHRP-6, Ipamorelin) that require injection, MK-677 can be taken orally with full bioavailability. It has a 24-hour half-life allowing once-daily dosing, and maintains GH pulsatility without disrupting circadian rhythm.",
      },
      {
        question: "What effects does MK-677 have on sleep?",
        answer:
          "Research shows MK-677 increases stage IV (deep) sleep by approximately 50% and REM sleep by 20%. These improvements in sleep architecture are believed to be related to its enhancement of nocturnal growth hormone pulses, as GH secretion is naturally concentrated during deep sleep.",
      },
      {
        question: "Does MK-677 increase cortisol or have hormonal side effects?",
        answer:
          "MK-677 causes a transient, modest cortisol increase after initial doses, but this effect does not persist with continued use. Long-term studies show no significant changes in cortisol, thyroid hormones, or testosterone levels. The main side effect is increased appetite (mediated by ghrelin receptor activation) and possible water retention during initial use.",
      },
      {
        question: "What long-term research exists on MK-677?",
        answer:
          "The longest published study is a 2-year trial in elderly adults showing sustained IGF-1 elevation and increased bone mineral density at the femoral neck. Other studies of 6-12 months have confirmed improvements in body composition, sleep quality, and nitrogen balance with continued oral dosing.",
      },
    ],
  },
  {
    slug: "sermorelin",
    name: "Sermorelin",
    fullName: "Sermorelin Acetate (GRF 1-29 NH2)",
    molecularFormula: "C149H246N44O42S",
    molecularWeight: "3357.93 Da",
    sequence: "Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-NH2",
    classification: "Growth Hormone-Releasing Hormone (GHRH) Analogue",
    mechanism:
      "Sermorelin is a synthetic peptide consisting of the first 29 amino acids of the 44-amino acid human growth hormone-releasing hormone (GHRH). This N-terminal fragment retains full biological activity, as the GHRH receptor-binding domain resides within residues 1-29.\n\nUpon subcutaneous administration, sermorelin binds to GHRH receptors on somatotroph cells in the anterior pituitary gland, activating adenylyl cyclase through a Gs-protein-coupled mechanism. This increases intracellular cyclic AMP (cAMP), which triggers the synthesis and secretion of growth hormone (GH) in a pulsatile, physiological pattern.\n\nCritically, sermorelin stimulates GH release through the natural hypothalamic-pituitary axis rather than bypassing it. This means the somatostatin-mediated negative feedback loop remains intact — preventing excessive GH accumulation and maintaining normal pulsatile secretion patterns. The resulting GH elevation promotes hepatic IGF-1 production, which mediates the downstream anabolic, metabolic, and regenerative effects associated with growth hormone signalling.",
    researchHistory:
      "Sermorelin was developed in the 1980s from research characterising the structure of human GHRH, which was first isolated and sequenced in 1982 by two independent groups: Roger Guillemin's team at the Salk Institute and a group at the University of Virginia. The discovery that the first 29 residues retained full biological activity led to the development of sermorelin as a more practical pharmaceutical compound.\n\nSermorelin was approved by the FDA in 1997 under the brand name Geref for the diagnostic evaluation of pituitary GH secretion capacity and for the treatment of growth hormone deficiency in children. It was one of the first GHRH-based therapies to reach clinical use. Although Geref was voluntarily discontinued in 2008 for commercial reasons (not safety or efficacy concerns), sermorelin remains widely used in compounding pharmacy settings and continues to be studied for anti-aging, body composition, and regenerative applications.",
    keyStudies: [
      {
        title: "Sermorelin treatment in growth hormone-deficient children: effects on growth and IGF-1",
        year: "1994",
        finding: "Demonstrated significant increases in growth velocity and IGF-1 levels in GH-deficient children, with preservation of normal pulsatile GH secretion patterns.",
      },
      {
        title: "Effects of sermorelin on sleep-related GH secretion in aging adults",
        year: "2001",
        finding: "Showed that sermorelin enhanced nocturnal GH pulsatility and improved slow-wave sleep in older adults, partially restoring the sleep-related GH secretion pattern seen in youth.",
      },
      {
        title: "Six-month sermorelin therapy in elderly adults: body composition and metabolic effects",
        year: "2003",
        finding: "Reported increased lean body mass, reduced visceral adiposity, and improved insulin sensitivity in elderly subjects receiving daily sermorelin injections over 6 months.",
      },
      {
        title: "GHRH(1-29) stimulates pituitary GH release through cAMP-dependent pathways",
        year: "1999",
        finding: "Characterised the molecular signalling cascade: sermorelin activates adenylyl cyclase via Gs-protein coupling, increasing cAMP to trigger GH gene transcription and secretion.",
      },
    ],
    applications: [
      "Growth hormone stimulation research",
      "Anti-aging and longevity studies",
      "Body composition and lean mass research",
      "Sleep quality and nocturnal GH pulsatility",
      "Pituitary function assessment",
      "IGF-1 elevation protocols",
      "Paediatric growth hormone deficiency research",
    ],
    faqs: [
      {
        question: "What is sermorelin and how does it work?",
        answer:
          "Sermorelin is a synthetic peptide comprising the first 29 amino acids of human growth hormone-releasing hormone (GHRH). It stimulates the pituitary gland to produce and release GH naturally through the hypothalamic-pituitary axis, preserving normal feedback mechanisms. It was FDA-approved in 1997 for GH deficiency diagnosis and treatment.",
      },
      {
        question: "How does sermorelin differ from exogenous growth hormone?",
        answer:
          "Unlike exogenous GH (which directly provides the hormone and bypasses pituitary function), sermorelin stimulates the body's own GH production. This preserves the natural somatostatin feedback loop, maintains pulsatile secretion patterns, and avoids the risk of supraphysiological GH levels that can occur with direct GH administration.",
      },
      {
        question: "What are the research applications of sermorelin?",
        answer:
          "Sermorelin is studied for anti-aging interventions, body composition improvement (increased lean mass, reduced fat), sleep quality enhancement, pituitary function assessment, and age-related GH decline. Clinical studies have shown improvements in IGF-1 levels, sleep architecture, and metabolic markers in both elderly adults and GH-deficient children.",
      },
      {
        question: "Why was sermorelin discontinued commercially?",
        answer:
          "Sermorelin (brand name Geref) was voluntarily discontinued by its manufacturer in 2008 for commercial reasons — not due to safety or efficacy concerns. It remains available through compounding pharmacies and continues to be widely used in research and clinical settings as a well-characterised GHRH agonist.",
      },
    ],
  },
  {
    slug: "aod-9604",
    name: "AOD-9604",
    fullName: "Anti-Obesity Drug 9604 (hGH Fragment 176-191)",
    molecularFormula: "C78H123N23O23S2",
    molecularWeight: "1815.08 Da",
    sequence: "Tyr-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe (hGH residues 176-191, C-terminal fragment)",
    classification: "Lipolytic Peptide / Growth Hormone Fragment",
    mechanism:
      "AOD-9604 is a synthetic peptide corresponding to the C-terminal fragment (residues 176-191) of human growth hormone (hGH), with an additional tyrosine residue at the N-terminus for stability. This fragment was identified as the region of hGH responsible for its lipolytic (fat-reducing) activity, isolated from its growth-promoting and diabetogenic properties.\n\nThe peptide stimulates lipolysis (fat breakdown) and inhibits lipogenesis (fat synthesis) in adipose tissue through a mechanism that mimics the fat-metabolising action of natural growth hormone but does not interact with the GH receptor in a way that promotes growth or affects blood glucose. Specifically, AOD-9604 enhances beta-3 adrenergic receptor signalling in fat cells and stimulates hormone-sensitive lipase (HSL) activity, increasing the release of stored fatty acids for oxidation.\n\nCritically, AOD-9604 does not affect IGF-1 levels, blood glucose, insulin sensitivity, or cellular proliferation — distinguishing it sharply from full-length growth hormone. This selectivity for fat metabolism without the anabolic or diabetogenic effects of hGH was the rationale for its development as a potential anti-obesity therapeutic.",
    researchHistory:
      "AOD-9604 was developed in the 1990s by Professor Frank Ng and colleagues at Monash University in Melbourne, Australia. The research programme sought to isolate the fat-reducing activity of growth hormone from its other biological effects by identifying the minimal peptide fragment responsible for lipolysis.\n\nThe fragment corresponding to hGH residues 176-191 was identified as having potent lipolytic activity in adipose tissue without affecting IGF-1 or blood glucose. Metabolic Pharmaceuticals Limited subsequently licensed the compound and advanced it through Phase IIb clinical trials for obesity, which showed modest but statistically significant weight loss compared to placebo. Although the compound did not progress to Phase III for obesity, it received GRAS (Generally Recognized as Safe) status from the FDA in 2014 for use in food products, and it continues to be researched for fat metabolism, cartilage repair, and osteoarthritis applications.",
    keyStudies: [
      {
        title: "The lipolytic fragment of growth hormone: amino acids 176-191",
        year: "2001",
        finding: "Identified hGH(176-191) as the minimal fragment retaining the full lipolytic activity of growth hormone, demonstrating fat reduction in obese mice without affecting growth, IGF-1, or insulin.",
      },
      {
        title: "AOD-9604 Phase IIb clinical trial for obesity",
        year: "2004",
        finding: "Demonstrated statistically significant weight loss compared to placebo in obese adults over 12 weeks, with no adverse effects on glucose tolerance, IGF-1, or cortisol levels.",
      },
      {
        title: "Effects of AOD-9604 on adipose tissue lipogenesis and lipolysis",
        year: "2000",
        finding: "Showed that AOD-9604 simultaneously stimulates lipolysis (fat breakdown) and inhibits lipogenesis (fat synthesis) in human adipose tissue explants, a dual mechanism distinct from other fat-reducing agents.",
      },
      {
        title: "AOD-9604 promotes chondrocyte proliferation and cartilage repair",
        year: "2010",
        finding: "Demonstrated that AOD-9604 stimulates proteoglycan and collagen synthesis in articular cartilage, opening a new application area beyond its original anti-obesity indication.",
      },
    ],
    applications: [
      "Fat metabolism and lipolysis research",
      "Anti-obesity peptide development",
      "Body composition and weight management studies",
      "Cartilage repair and osteoarthritis research",
      "Growth hormone fragment pharmacology",
      "Adipose tissue biology and lipogenesis inhibition",
      "Metabolic safety profiling (IGF-1/glucose independence)",
    ],
    faqs: [
      {
        question: "What is AOD-9604 and how does it relate to growth hormone?",
        answer:
          "AOD-9604 is a synthetic peptide corresponding to residues 176-191 of human growth hormone — the specific fragment responsible for GH's fat-reducing activity. Unlike full-length GH, AOD-9604 stimulates fat breakdown and inhibits fat synthesis without affecting growth, IGF-1, blood glucose, or insulin levels.",
      },
      {
        question: "How does AOD-9604 promote fat loss?",
        answer:
          "AOD-9604 works through a dual mechanism: it stimulates lipolysis (fat breakdown) by activating hormone-sensitive lipase in fat cells, and simultaneously inhibits lipogenesis (new fat creation). This dual action on adipose tissue is distinct from most other weight management compounds and occurs without affecting blood glucose or insulin.",
      },
      {
        question: "What clinical evidence supports AOD-9604?",
        answer:
          "Phase IIb clinical trials in obese adults demonstrated statistically significant weight loss over 12 weeks with no adverse effects on glucose, IGF-1, or cortisol. The compound received FDA GRAS status in 2014. More recent research has expanded into cartilage repair and osteoarthritis applications.",
      },
      {
        question: "Does AOD-9604 have the same side effects as growth hormone?",
        answer:
          "No. AOD-9604 was specifically designed to isolate GH's lipolytic activity from its growth-promoting and diabetogenic effects. Research consistently shows no impact on IGF-1 levels, blood glucose, insulin sensitivity, or cellular proliferation — meaning it avoids the metabolic side effects associated with full-length growth hormone administration.",
      },
    ],
  },
  {
    slug: "ghrp-6",
    name: "GHRP-6",
    fullName: "Growth Hormone Releasing Peptide-6",
    molecularFormula: "C46H56N12O6",
    molecularWeight: "873.01 Da",
    sequence: "His-D-Trp-Ala-Trp-D-Phe-Lys-NH2 (hexapeptide)",
    classification: "Growth Hormone Secretagogue / Ghrelin Receptor Agonist",
    mechanism:
      "GHRP-6 (Growth Hormone Releasing Peptide-6) is a synthetic hexapeptide that acts as a potent agonist of the growth hormone secretagogue receptor (GHS-R1a), also known as the ghrelin receptor. It was one of the first synthetic GH secretagogues developed and remains one of the most potent in terms of raw GH release amplitude.\n\nUpon binding to GHS-R1a on anterior pituitary somatotrophs, GHRP-6 triggers GH release through an IP3/DAG/PKC signalling cascade that is distinct from the cAMP pathway used by GHRH. This means GHRP-6 and GHRH stimulate GH release through complementary, non-overlapping mechanisms — which is why their combination produces synergistic rather than merely additive GH pulses.\n\nGHRP-6 also stimulates the release of ghrelin from the stomach and hypothalamus, which accounts for its pronounced appetite-stimulating effect — a characteristic that distinguishes it from more selective GH secretagogues like Ipamorelin. Additionally, GHRP-6 causes modest, transient increases in cortisol and prolactin levels, reflecting its broader activation profile across pituitary cell types. It also demonstrates gastric cytoprotective properties, similar to ghrelin itself.",
    researchHistory:
      "GHRP-6 was developed in the late 1970s and early 1980s by Cyril Bowers and colleagues at Tulane University, as part of pioneering work to create synthetic peptides capable of releasing growth hormone independently of GHRH. The discovery that short, modified peptides could activate a then-unknown receptor on pituitary cells was groundbreaking — this receptor was later identified as GHS-R1a (the ghrelin receptor), years before ghrelin itself was discovered in 1999.\n\nGHRP-6 played a central role in the identification and characterisation of the ghrelin signalling system, making it historically significant beyond its pharmacological applications. Extensive research throughout the 1990s and 2000s documented its effects on GH secretion, appetite, cardiac protection, and gastric cytoprotection. It has been superseded in some research contexts by more selective analogues (Ipamorelin, Hexarelin), but remains widely used due to its well-characterised pharmacology and potent GH-releasing efficacy.",
    keyStudies: [
      {
        title: "On the in vitro and in vivo activity of a new synthetic hexapeptide that acts on the pituitary to specifically release growth hormone",
        year: "1984",
        finding: "First characterisation of GHRP-6, demonstrating potent, specific GH release from pituitary cells through a mechanism independent of GHRH, suggesting the existence of an unknown GH-releasing pathway.",
      },
      {
        title: "Synergistic effect of GHRP-6 and GHRH on GH secretion in humans",
        year: "1995",
        finding: "Demonstrated that combining GHRP-6 with GHRH produces synergistic GH release 3-5 times greater than either compound alone, confirming complementary signalling mechanisms.",
      },
      {
        title: "Cardioprotective effects of GHRP-6 in ischaemia-reperfusion injury",
        year: "2003",
        finding: "Showed that GHRP-6 significantly reduced infarct size and improved cardiac function following ischaemia-reperfusion in animal models, through mechanisms involving PI3K/Akt pathway activation.",
      },
      {
        title: "GHRP-6 prevents gastric mucosal damage induced by ischaemia and reperfusion",
        year: "2007",
        finding: "Demonstrated potent gastric cytoprotection comparable to ghrelin, with reduced gastric lesion formation and enhanced mucosal blood flow in stressed animal models.",
      },
    ],
    applications: [
      "Growth hormone secretion and release mechanisms",
      "Synergistic GH protocols with GHRH analogues",
      "Appetite stimulation and nitrogen balance research",
      "Cardiac protection and ischaemia studies",
      "Gastric cytoprotection research",
      "Ghrelin receptor biology and pharmacology",
      "Pituitary function and aging research",
    ],
    faqs: [
      {
        question: "What is GHRP-6 and how does it work?",
        answer:
          "GHRP-6 is a synthetic hexapeptide that potently stimulates growth hormone release by activating the ghrelin receptor (GHS-R1a) on pituitary cells. It works through an IP3/PKC signalling pathway that is complementary to GHRH, which is why the two produce synergistic GH release when combined. GHRP-6 was historically critical in discovering the ghrelin signalling system.",
      },
      {
        question: "How does GHRP-6 differ from Ipamorelin?",
        answer:
          "Both activate the ghrelin receptor, but GHRP-6 is less selective. It produces a larger GH pulse but also stimulates appetite (via ghrelin release), and causes transient increases in cortisol and prolactin. Ipamorelin produces a cleaner GH pulse with minimal effects on other hormones. GHRP-6 is preferred when maximum GH amplitude or appetite stimulation is desired.",
      },
      {
        question: "What is the synergistic effect of GHRP-6 with GHRH?",
        answer:
          "GHRP-6 and GHRH (or its analogues like CJC-1295 and Sermorelin) stimulate GH release through entirely different signalling pathways: GHRP-6 via IP3/PKC and GHRH via cAMP. When combined, they produce GH release 3-5 times greater than either alone — a true synergistic effect that is the basis of many research protocols.",
      },
      {
        question: "Does GHRP-6 have effects beyond growth hormone release?",
        answer:
          "Yes. GHRP-6 demonstrates cardioprotective properties (reducing infarct size in ischaemia models via PI3K/Akt activation), gastric cytoprotective effects (similar to ghrelin), and potent appetite stimulation. These extra-pituitary effects reflect the broad distribution of ghrelin receptors throughout the body.",
      },
    ],
  },
  {
    slug: "pt-141",
    name: "PT-141",
    fullName: "PT-141 / Bremelanotide (Melanocortin Receptor Agonist)",
    molecularFormula: "C50H68N14O10",
    molecularWeight: "1025.18 Da",
    sequence: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH (cyclic heptapeptide)",
    classification: "Melanocortin Receptor Agonist (MC3R/MC4R)",
    mechanism:
      "PT-141 (Bremelanotide) is a synthetic cyclic heptapeptide that acts as a non-selective agonist at melanocortin receptors, with primary activity at MC3R and MC4R subtypes located in the central nervous system. Unlike phosphodiesterase inhibitors that act peripherally on vascular smooth muscle, PT-141 exerts its effects through central nervous system pathways in the hypothalamus.\n\nMelanocortin-4 receptors (MC4R) in the hypothalamus are critical regulators of sexual arousal, appetite, and energy homeostasis. When PT-141 activates MC4R, it initiates a dopaminergic cascade in the medial preoptic area and paraventricular nucleus, stimulating the neural pathways responsible for sexual desire and arousal. This central mechanism means PT-141 addresses the motivational/desire component of sexual function, not merely the vascular/mechanical component.\n\nPT-141 also demonstrates activity at MC3R, which contributes to energy homeostasis and inflammatory regulation. The compound was derived from the linear peptide alpha-MSH analogue Melanotan II through removal of the C-terminal amide, which eliminated the tanning effects while preserving melanocortin receptor agonism relevant to sexual function.",
    researchHistory:
      "PT-141 originated from research into Melanotan II (MT-II), an alpha-melanocyte-stimulating hormone (alpha-MSH) analogue developed at the University of Arizona in the 1990s for sunless tanning. During clinical trials of MT-II, researchers unexpectedly observed that the compound consistently produced spontaneous penile erections in male subjects — an effect not attributable to its melanogenic properties.\n\nPalatin Technologies subsequently developed PT-141 (Bremelanotide) by modifying the MT-II structure to isolate the sexual function effects from tanning activity. Phase II and Phase III clinical trials demonstrated efficacy in both male erectile dysfunction (particularly in patients who did not respond to PDE5 inhibitors) and female hypoactive sexual desire disorder (HSDD). In 2019, the FDA approved Bremelanotide under the brand name Vyleesi for the treatment of acquired, generalised HSDD in premenopausal women — making it the first melanocortin-based therapy approved for sexual dysfunction and only the second drug ever approved for female sexual desire disorders.",
    keyStudies: [
      {
        title: "Bremelanotide for female sexual dysfunctions: the RECONNECT Phase III trials",
        year: "2019",
        finding: "Two pivotal Phase III trials in premenopausal women with HSDD demonstrated statistically significant improvements in sexual desire and reduction in distress, leading to FDA approval of Vyleesi.",
      },
      {
        title: "Melanocortin receptor agonists in the treatment of male erectile dysfunction",
        year: "2005",
        finding: "Demonstrated that PT-141 produced erections in 67% of men with ED who had previously failed sildenafil treatment, confirming its novel central mechanism distinct from PDE5 inhibitors.",
      },
      {
        title: "MC4R activation and the central dopaminergic pathways of sexual arousal",
        year: "2008",
        finding: "Characterised the neural pathway: MC4R activation in the hypothalamus triggers dopamine release in the medial preoptic area, establishing the mechanistic basis for PT-141's pro-sexual effects.",
      },
      {
        title: "Bremelanotide: pharmacology and clinical development for sexual dysfunction",
        year: "2016",
        finding: "Comprehensive pharmacological review establishing PT-141's selectivity for MC3R/MC4R, its central mechanism of action, and clinical efficacy data across multiple Phase II trials in both sexes.",
      },
    ],
    applications: [
      "Sexual dysfunction and desire disorder research",
      "Melanocortin receptor biology and pharmacology",
      "Central nervous system arousal mechanisms",
      "Hypothalamic dopaminergic pathway studies",
      "Female sexual health and HSDD research",
      "PDE5 inhibitor-refractory erectile dysfunction",
      "Melanocortin-based therapeutic development",
    ],
    faqs: [
      {
        question: "What is PT-141 (Bremelanotide) and how does it work?",
        answer:
          "PT-141 is a synthetic cyclic peptide that activates melanocortin receptors (MC3R/MC4R) in the brain. Unlike erectile dysfunction drugs that work on blood vessels (PDE5 inhibitors like sildenafil), PT-141 acts on hypothalamic pathways to stimulate sexual desire and arousal through dopaminergic signalling. It was FDA-approved in 2019 as Vyleesi for hypoactive sexual desire disorder in women.",
      },
      {
        question: "How is PT-141 different from Viagra and similar drugs?",
        answer:
          "PDE5 inhibitors (Viagra, Cialis) work peripherally by enhancing blood flow to erectile tissue — they require sexual arousal to be present. PT-141 works centrally in the brain to generate the arousal and desire itself, through melanocortin receptor activation and downstream dopamine release. This makes it effective in patients who don't respond to PDE5 inhibitors.",
      },
      {
        question: "What is the relationship between PT-141 and Melanotan II?",
        answer:
          "PT-141 was derived from Melanotan II (MT-II), an alpha-MSH analogue originally developed for sunless tanning. When MT-II trials unexpectedly showed sexual arousal effects, PT-141 was developed by modifying the structure to isolate the sexual function activity from the tanning effect. PT-141 retains MC3R/MC4R agonism but has minimal melanogenic activity.",
      },
      {
        question: "What clinical evidence supports PT-141?",
        answer:
          "PT-141 completed two pivotal Phase III trials (RECONNECT) in premenopausal women with HSDD, showing significant improvements in desire and reduction in distress. Phase II trials in men demonstrated efficacy in 67% of ED patients who had failed sildenafil. The compound received FDA approval in 2019 as the first melanocortin therapy for sexual dysfunction.",
      },
    ],
  },
];

// MediT Tirzepatide and NovaDose NAD+ reference parent entries
export const MEDIT_TIRZEPATIDE_REF = "tirzepatide-pen";
export const NOVADOSE_NAD_REF = "nad-plus";

export const ENCYCLOPEDIA_SLUGS = PEPTIDE_ENTRIES.map((e) => e.slug);

export function getEncyclopediaEntry(slug: string): PeptideEntry | undefined {
  return PEPTIDE_ENTRIES.find((e) => e.slug === slug);
}

export function getEncyclopediaRedirect(
  slug: string
): string | undefined {
  if (slug === "medit-tirzepatide") return MEDIT_TIRZEPATIDE_REF;
  if (slug === "novadose-nad") return NOVADOSE_NAD_REF;
  return undefined;
}
