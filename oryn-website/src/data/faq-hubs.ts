// ─── FAQ Hub Data for Programmatic SEO ─────────────────────────────
// Research-focused FAQ hubs for product and topic pages.
// All content is intended for research purposes only and does not
// constitute medical advice. ORYN products are sold strictly for
// laboratory and research use.

export interface FAQHub {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  type: "product" | "topic";
  relatedProductSlug?: string;
  relatedCategorySlug?: string;
  introduction: string;
  faqs: { question: string; answer: string }[];
}

// ─── Product FAQ Hubs ──────────────────────────────────────────────

const productFAQHubs: FAQHub[] = [
  // ── BPC-157 ────────────────────────────────────────────────────
  {
    slug: "bpc-157-faq",
    title: "BPC-157 Frequently Asked Questions",
    metaTitle: "BPC-157 FAQ | Research Questions Answered | ORYN Peptides",
    metaDescription:
      "Answers to frequently asked questions about BPC-157 peptide research. Learn about purity, storage, administration, and research applications of ORYN BPC-157 pens.",
    type: "product",
    relatedProductSlug: "bpc-157",
    relatedCategorySlug: "recovery",
    introduction:
      "BPC-157 (Body Protection Compound-157) is one of the most widely studied peptides in regenerative research. Derived from a protein found naturally in gastric juice, it has attracted significant interest for its tissue-protective properties. Below are the most common questions researchers ask about BPC-157 and ORYN's pharmaceutical-grade pen formulation.",
    faqs: [
      {
        question: "What is BPC-157?",
        answer:
          "BPC-157 is a synthetic pentadecapeptide (15 amino acids) derived from a protective protein found in human gastric juice. It has been extensively studied in preclinical research for its potential role in tissue healing, gut protection, and anti-inflammatory activity. ORYN BPC-157 is formulated at >99% purity in a precision-dosed pen system.",
      },
      {
        question: "How does BPC-157 work?",
        answer:
          "Research suggests BPC-157 may modulate multiple biological pathways including nitric oxide synthesis, growth factor expression (such as VEGF and EGF), and the FAK-paxillin signalling cascade. These mechanisms are thought to contribute to its observed effects on angiogenesis, tendon healing, and gastrointestinal protection in preclinical models. Note: these findings are from research studies and do not constitute medical claims.",
      },
      {
        question: "What is BPC-157 used for in research?",
        answer:
          "BPC-157 is studied across a broad range of research applications including gastric ulcer healing, tendon and ligament repair, muscle injury recovery, bone fracture healing, neuroprotection, and inflammatory bowel conditions. It is one of the most versatile peptides in regenerative medicine research.",
      },
      {
        question: "How is ORYN BPC-157 administered?",
        answer:
          "ORYN BPC-157 is delivered via a pre-mixed peptide pen system. Each pen contains 10 mg of BPC-157 in 3 mL, designed for subcutaneous injection. The pen system eliminates the need for manual reconstitution, reducing contamination risk and ensuring precise, consistent dosing throughout the 30-day protocol.",
      },
      {
        question: "What purity is ORYN's BPC-157?",
        answer:
          "ORYN BPC-157 is manufactured to >99% purity in GMP-certified, ISO 7 cleanroom facilities. Every batch is verified by third-party HPLC and mass spectrometry testing. A Certificate of Analysis (CoA) is available for each batch, confirming identity, purity, and sterility.",
      },
      {
        question: "How should BPC-157 be stored?",
        answer:
          "BPC-157 pens should be stored refrigerated at 2-8°C (standard refrigerator temperature). Keep the pen away from direct light and do not freeze. When stored correctly, ORYN BPC-157 pens have a shelf life of 24 months. Once in use, the pen should remain refrigerated between doses.",
      },
      {
        question: "Can BPC-157 be combined with other peptides?",
        answer:
          "BPC-157 is frequently studied alongside TB-500 in research protocols focused on tissue repair and recovery. The two peptides are thought to act through complementary mechanisms — BPC-157 primarily through the nitric oxide pathway and TB-500 through actin regulation. Researchers should design protocols based on published literature and consult relevant guidelines. This is not medical advice.",
      },
      {
        question: "How long does a BPC-157 pen last?",
        answer:
          "Each ORYN BPC-157 pen is designed for a 30-day dosing period. The pen contains 10 mg of BPC-157 in 3 mL of solution, with each click delivering a precise, pre-calibrated dose. The multi-dose design means one pen covers a full monthly research cycle.",
      },
      {
        question: "What makes ORYN BPC-157 different from vials?",
        answer:
          "Traditional BPC-157 vials require manual reconstitution with bacteriostatic water, syringe drawing, and careful dose calculation. ORYN's pen system is pre-mixed and ready to use, eliminating reconstitution errors, reducing contamination risk, and providing consistent dosing. The pen also features 0.22um filtration and gamma ray sterilisation for pharmaceutical-grade sterility.",
      },
      {
        question: "Is BPC-157 legal to purchase in the UK?",
        answer:
          "BPC-157 is legal to purchase in the UK for research purposes. It is not approved as a medicine by the MHRA and is not intended for human therapeutic use. ORYN supplies BPC-157 strictly for laboratory and research applications in accordance with UK regulations.",
      },
    ],
  },

  // ── TB-500 ─────────────────────────────────────────────────────
  {
    slug: "tb-500-faq",
    title: "TB-500 Frequently Asked Questions",
    metaTitle: "TB-500 FAQ | Thymosin Beta-4 Research Questions | ORYN Peptides",
    metaDescription:
      "Answers to common TB-500 research questions. Learn about Thymosin Beta-4, tissue repair mechanisms, storage, purity, and ORYN's pen delivery system.",
    type: "product",
    relatedProductSlug: "tb-500",
    relatedCategorySlug: "recovery",
    introduction:
      "TB-500 is a synthetic fragment of Thymosin Beta-4, a naturally occurring protein involved in tissue repair and cell migration. It is one of the most studied peptides for wound healing and regeneration research. Here we address the most common questions about TB-500 and the ORYN pen formulation.",
    faqs: [
      {
        question: "What is TB-500?",
        answer:
          "TB-500 is a synthetic peptide consisting of the active region of Thymosin Beta-4, a 43-amino acid protein produced naturally by the thymus gland. It plays a role in actin regulation, cell migration, and new blood vessel formation. ORYN TB-500 is formulated at >99% purity with a 15 mg dose in a precision pen system.",
      },
      {
        question: "How does TB-500 work?",
        answer:
          "TB-500 is thought to function primarily through the regulation of actin, a cell-building protein critical for cell movement and tissue repair. By sequestering actin monomers and promoting their polymerisation at wound sites, TB-500 may facilitate cell migration to damaged tissue, promote angiogenesis, and reduce inflammation. These mechanisms have been observed in preclinical research models.",
      },
      {
        question: "What is TB-500 used for in research?",
        answer:
          "TB-500 is studied in research related to wound healing, cardiac tissue repair, muscle injury recovery, corneal healing, hair regrowth, and neuroinflammation. Its ability to upregulate cell migration makes it a key compound in tissue regeneration and repair research.",
      },
      {
        question: "How is ORYN TB-500 administered?",
        answer:
          "ORYN TB-500 is delivered through a pre-mixed pen containing 15 mg in 3 mL of solution. The pen is designed for subcutaneous injection with precise click-based dosing. No reconstitution is required, and the pen provides consistent delivery across the full 30-day dosing period.",
      },
      {
        question: "What purity is ORYN's TB-500?",
        answer:
          "ORYN TB-500 is manufactured to >99% purity in GMP-certified facilities with ISO 7 cleanroom standards. Each batch undergoes independent HPLC and mass spectrometry verification. Certificates of Analysis are available for every production batch.",
      },
      {
        question: "How should TB-500 be stored?",
        answer:
          "TB-500 pens should be refrigerated at 2-8°C and protected from direct light. Do not freeze. Under proper storage conditions, ORYN TB-500 has a shelf life of 24 months. Keep the pen refrigerated between uses once the dosing period has begun.",
      },
      {
        question: "Can TB-500 be combined with other peptides?",
        answer:
          "TB-500 is commonly studied in combination with BPC-157 for tissue repair research. The two peptides are believed to work through complementary pathways — TB-500 via actin regulation and cell migration, BPC-157 via nitric oxide and growth factor modulation. This combination is one of the most widely researched peptide stacks in the regenerative field. This information is for research reference only.",
      },
      {
        question: "How long does a TB-500 pen last?",
        answer:
          "Each ORYN TB-500 pen is designed for a 30-day protocol. The 15 mg / 3 mL formulation provides consistent daily dosing throughout the entire period with no need for refills or reconstitution.",
      },
      {
        question: "What is the difference between TB-500 and Thymosin Beta-4?",
        answer:
          "TB-500 refers to the synthetic active fragment of Thymosin Beta-4 (TB4), the full-length naturally occurring protein. TB-500 contains the key amino acid sequence responsible for the biological activity attributed to TB4, particularly the actin-binding domain. In research contexts, the two terms are sometimes used interchangeably, though TB-500 technically refers to the shorter synthetic version.",
      },
      {
        question: "Is TB-500 legal to purchase in the UK?",
        answer:
          "TB-500 is legal to buy in the UK for research purposes. It is classified as a research chemical and is not a controlled substance. ORYN supplies TB-500 exclusively for laboratory and research use, not for human therapeutic application.",
      },
    ],
  },

  // ── CJC-1295 ───────────────────────────────────────────────────
  {
    slug: "cjc-1295-faq",
    title: "CJC-1295 Frequently Asked Questions",
    metaTitle: "CJC-1295 FAQ | Growth Hormone Research Questions | ORYN Peptides",
    metaDescription:
      "Common CJC-1295 research questions answered. Learn about GHRH analogue mechanisms, GH stimulation, purity, dosing, and ORYN's pen delivery system.",
    type: "product",
    relatedProductSlug: "cjc-1295",
    relatedCategorySlug: "growth-hormone",
    introduction:
      "CJC-1295 is a synthetic analogue of growth hormone-releasing hormone (GHRH) that has been extensively studied for its ability to stimulate sustained growth hormone release. It is a cornerstone compound in GH-related peptide research. Below are frequently asked questions about CJC-1295 and ORYN's pen formulation.",
    faqs: [
      {
        question: "What is CJC-1295?",
        answer:
          "CJC-1295 is a synthetic 30-amino acid peptide analogue of growth hormone-releasing hormone (GHRH). It is designed to provide sustained stimulation of GH release from the pituitary gland. ORYN CJC-1295 is formulated at >99% purity with a 5 mg dose in a precision pen system for consistent research-grade administration.",
      },
      {
        question: "How does CJC-1295 work?",
        answer:
          "CJC-1295 binds to the GHRH receptor on pituitary somatotroph cells, stimulating the release of growth hormone in a pulsatile manner. Its modified structure resists enzymatic degradation, resulting in a longer half-life compared to native GHRH. This sustained activity allows for prolonged GH elevation in research subjects. These observations come from preclinical and clinical research studies.",
      },
      {
        question: "What is CJC-1295 used for in research?",
        answer:
          "CJC-1295 is studied in research contexts related to growth hormone secretion, body composition, sleep quality, metabolic function, bone density, and age-related GH decline. It is one of the primary peptides used in growth hormone axis research.",
      },
      {
        question: "How is ORYN CJC-1295 administered?",
        answer:
          "ORYN CJC-1295 is delivered via a pre-mixed pen containing 5 mg in 3 mL. The pen is designed for subcutaneous injection, typically administered in the evening to align with natural GH release patterns. No reconstitution is required.",
      },
      {
        question: "What purity is ORYN's CJC-1295?",
        answer:
          "ORYN CJC-1295 is manufactured to >99% purity in GMP-certified, ISO 7 cleanroom facilities. Independent HPLC and mass spectrometry testing verify each batch. A Certificate of Analysis is provided with every order.",
      },
      {
        question: "How should CJC-1295 be stored?",
        answer:
          "CJC-1295 pens must be stored refrigerated at 2-8°C, away from direct sunlight. Do not freeze the product. Shelf life is 24 months under proper storage conditions. The pen should remain refrigerated between doses throughout the 30-day protocol.",
      },
      {
        question: "Can CJC-1295 be combined with other peptides?",
        answer:
          "CJC-1295 is frequently studied in combination with Ipamorelin. This pairing is one of the most researched GH-stimulating peptide combinations, as CJC-1295 acts on the GHRH receptor while Ipamorelin acts on the ghrelin receptor — creating complementary stimulation of GH release through two distinct pathways. This is research information only and not medical advice.",
      },
      {
        question: "How long does a CJC-1295 pen last?",
        answer:
          "Each ORYN CJC-1295 pen provides a full 30-day dosing period. The 5 mg / 3 mL formulation is calibrated for daily dosing over the complete monthly cycle.",
      },
      {
        question: "What is the difference between CJC-1295 with and without DAC?",
        answer:
          "CJC-1295 can be formulated with or without a Drug Affinity Complex (DAC). The DAC modification extends the peptide's half-life by allowing it to bind to albumin in the bloodstream. CJC-1295 without DAC (also known as Mod GRF 1-29) has a shorter half-life and produces more natural, pulsatile GH release patterns. ORYN's formulation is optimised for research applications requiring consistent, sustained activity.",
      },
      {
        question: "Is CJC-1295 legal to purchase in the UK?",
        answer:
          "CJC-1295 is legal to purchase in the UK for research purposes. It is not classified as a controlled substance and is not approved as a medicine. ORYN supplies CJC-1295 strictly for laboratory and research use.",
      },
    ],
  },

  // ── Ipamorelin ─────────────────────────────────────────────────
  {
    slug: "ipamorelin-faq",
    title: "Ipamorelin Frequently Asked Questions",
    metaTitle: "Ipamorelin FAQ | GH Secretagogue Research Questions | ORYN Peptides",
    metaDescription:
      "Ipamorelin research FAQ. Learn about this selective growth hormone secretagogue, its mechanisms, research applications, purity, and ORYN's pen system.",
    type: "product",
    relatedProductSlug: "ipamorelin",
    relatedCategorySlug: "growth-hormone",
    introduction:
      "Ipamorelin is a highly selective growth hormone secretagogue that stimulates GH release without significantly affecting other hormones such as cortisol or prolactin. Its favourable selectivity profile makes it one of the most studied peptides in GH research. Here are the most common questions about Ipamorelin and ORYN's formulation.",
    faqs: [
      {
        question: "What is Ipamorelin?",
        answer:
          "Ipamorelin is a synthetic pentapeptide (5 amino acids) that acts as a selective growth hormone secretagogue. It stimulates the pituitary gland to release growth hormone by activating the ghrelin/GHS receptor. ORYN Ipamorelin is formulated at >99% purity with 6 mg in a precision pen system.",
      },
      {
        question: "How does Ipamorelin work?",
        answer:
          "Ipamorelin binds to the growth hormone secretagogue receptor (GHS-R) on pituitary cells, triggering a calcium-dependent signalling cascade that promotes GH release. Unlike other GH secretagogues, Ipamorelin is highly selective — it does not significantly stimulate ACTH, cortisol, or prolactin release, which is a key advantage noted in published research.",
      },
      {
        question: "What is Ipamorelin used for in research?",
        answer:
          "Ipamorelin is researched for GH stimulation, body composition studies, bone density, sleep architecture, post-operative recovery models, and age-related growth hormone decline. Its selectivity makes it particularly valuable in studies requiring isolated GH elevation without broader hormonal disruption.",
      },
      {
        question: "How is ORYN Ipamorelin administered?",
        answer:
          "ORYN Ipamorelin is delivered through a pre-mixed pen containing 6 mg in 3 mL of solution. The pen is designed for subcutaneous injection with click-based dosing precision. Administration is typically timed for the evening or pre-sleep to complement natural GH secretion patterns.",
      },
      {
        question: "What purity is ORYN's Ipamorelin?",
        answer:
          "ORYN Ipamorelin is produced to >99% purity in GMP-certified manufacturing facilities with ISO 7 cleanroom standards. Independent third-party HPLC and mass spectrometry testing validate every batch. Certificates of Analysis are available on request.",
      },
      {
        question: "How should Ipamorelin be stored?",
        answer:
          "Ipamorelin pens should be stored at 2-8°C in a refrigerator, protected from light. Do not freeze. Shelf life is 24 months when stored correctly. Once in use, continue to refrigerate the pen between doses.",
      },
      {
        question: "Can Ipamorelin be combined with other peptides?",
        answer:
          "Ipamorelin is most commonly studied alongside CJC-1295 in what researchers refer to as the 'Ipamorelin + CJC-1295 stack.' This combination targets two different GH-stimulating pathways — Ipamorelin through the ghrelin receptor and CJC-1295 through the GHRH receptor — for synergistic GH release. This information is for research purposes only.",
      },
      {
        question: "How long does an Ipamorelin pen last?",
        answer:
          "Each ORYN Ipamorelin pen is calibrated for a 30-day dosing period. The 6 mg / 3 mL formulation delivers precise daily doses throughout the full monthly research cycle.",
      },
      {
        question: "What makes Ipamorelin different from other GH peptides?",
        answer:
          "Ipamorelin's defining characteristic is its selectivity. While other GH secretagogues like GHRP-6 can increase appetite (via ghrelin mimicry) and elevate cortisol and prolactin, Ipamorelin produces a cleaner GH release without these secondary hormonal effects. This makes it one of the preferred compounds for researchers studying isolated GH pathways.",
      },
      {
        question: "Is Ipamorelin legal to purchase in the UK?",
        answer:
          "Ipamorelin is legal to purchase in the UK for research purposes. It is not a controlled substance and is not approved for medical use. ORYN supplies Ipamorelin exclusively for laboratory and research applications.",
      },
    ],
  },

  // ── Tirzepatide Pen ────────────────────────────────────────────
  {
    slug: "tirzepatide-faq",
    title: "Tirzepatide Frequently Asked Questions",
    metaTitle: "Tirzepatide FAQ | Dual GIP/GLP-1 Research Questions | ORYN Peptides",
    metaDescription:
      "Tirzepatide research FAQ. Learn about dual GIP/GLP-1 agonist mechanisms, metabolic research, purity, dosing, and ORYN's peptide pen system.",
    type: "product",
    relatedProductSlug: "tirzepatide-pen",
    relatedCategorySlug: "weight-loss",
    introduction:
      "Tirzepatide is a first-in-class dual GIP/GLP-1 receptor agonist that has generated significant interest in metabolic peptide research. It represents one of the most important developments in metabolic science in recent years. Below are common research questions about Tirzepatide and ORYN's pen delivery system.",
    faqs: [
      {
        question: "What is Tirzepatide?",
        answer:
          "Tirzepatide is a synthetic peptide that acts as a dual agonist on both the glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptors. This dual mechanism is unique among metabolic peptides and has been the subject of extensive clinical research. ORYN's Tirzepatide pen contains 10 mg at >99% purity.",
      },
      {
        question: "How does Tirzepatide work?",
        answer:
          "Tirzepatide simultaneously activates GIP and GLP-1 receptors, which are involved in insulin secretion, glucose metabolism, appetite regulation, and gastric emptying. The dual-agonist mechanism is believed to produce synergistic metabolic effects beyond what single-receptor agonists achieve. Published clinical trials have documented significant outcomes in metabolic research endpoints.",
      },
      {
        question: "What is Tirzepatide used for in research?",
        answer:
          "Tirzepatide is studied in research related to metabolic function, body weight regulation, insulin sensitivity, blood glucose control, appetite physiology, and cardiovascular metabolic health. It has been the subject of the SURPASS and SURMOUNT clinical trial programmes with published results in major peer-reviewed journals.",
      },
      {
        question: "How is ORYN Tirzepatide administered?",
        answer:
          "ORYN Tirzepatide is available in a pre-mixed peptide pen containing 10 mg in 3 mL. The pen is designed for subcutaneous injection with precise click-based dosing. No manual reconstitution is required. The 30-day pen format allows for consistent daily dosing throughout the research period.",
      },
      {
        question: "What purity is ORYN's Tirzepatide?",
        answer:
          "ORYN Tirzepatide is manufactured to >99% purity in GMP-certified facilities. Each batch undergoes rigorous third-party HPLC and mass spectrometry analysis. Certificates of Analysis confirming purity, identity, and sterility are available for all batches.",
      },
      {
        question: "How should Tirzepatide be stored?",
        answer:
          "Tirzepatide pens should be stored refrigerated at 2-8°C, protected from direct light. Do not freeze. Shelf life is 24 months under proper storage conditions. Keep the pen refrigerated between uses throughout the dosing period.",
      },
      {
        question: "Can Tirzepatide be combined with other peptides?",
        answer:
          "Due to Tirzepatide's potent dual-receptor mechanism, it is typically studied as a standalone compound in metabolic research protocols. Researchers considering multi-compound protocols should carefully review published literature on potential interactions and consult relevant regulatory guidelines. This is research information and not medical advice.",
      },
      {
        question: "How long does a Tirzepatide pen last?",
        answer:
          "Each ORYN Tirzepatide pen is designed for a 30-day dosing protocol. The 10 mg / 3 mL formulation delivers precise daily doses over the complete monthly period.",
      },
      {
        question:
          "What is the difference between the ORYN Tirzepatide Pen and the MediT Pen?",
        answer:
          "The ORYN Tirzepatide Peptide Pen is a multi-dose pen containing 10 mg for daily administration over 30 days. The MediT Pen is a prefilled, single-use injection pen containing 40 mg of Tirzepatide, designed for once-weekly administration. Both are pharmaceutical-grade formulations; the choice depends on the research protocol's dosing frequency requirements.",
      },
      {
        question: "Is Tirzepatide legal to purchase in the UK?",
        answer:
          "Tirzepatide for research purposes is available through licensed suppliers in the UK. It is a prescription medicine under certain brand names but can be obtained as a research compound through appropriate channels. ORYN supplies Tirzepatide strictly for research and laboratory use.",
      },
    ],
  },

  // ── GHK-Cu ─────────────────────────────────────────────────────
  {
    slug: "ghk-cu-faq",
    title: "GHK-Cu Frequently Asked Questions",
    metaTitle: "GHK-Cu FAQ | Copper Peptide Research Questions | ORYN Peptides",
    metaDescription:
      "GHK-Cu copper peptide FAQ. Learn about collagen synthesis, skin repair mechanisms, anti-aging research, purity, and ORYN's pen delivery system.",
    type: "product",
    relatedProductSlug: "ghk-cu",
    relatedCategorySlug: "anti-aging",
    introduction:
      "GHK-Cu (glycyl-L-histidyl-L-lysine copper complex) is a naturally occurring tripeptide with a high affinity for copper ions. It has been extensively studied for its roles in skin remodelling, wound healing, and anti-aging research. Below are frequently asked questions about GHK-Cu and ORYN's pen formulation.",
    faqs: [
      {
        question: "What is GHK-Cu?",
        answer:
          "GHK-Cu is a naturally occurring copper-binding tripeptide (three amino acids: glycine, histidine, and lysine) complexed with a copper(II) ion. It is found in human plasma, saliva, and urine, with concentrations that decline with age. ORYN GHK-Cu is formulated at >99% purity with a potent 60 mg dose in a precision pen system.",
      },
      {
        question: "How does GHK-Cu work?",
        answer:
          "GHK-Cu is thought to modulate gene expression related to collagen synthesis, glycosaminoglycan production, and antioxidant defence. Research indicates it can upregulate genes involved in tissue remodelling while downregulating inflammatory and tissue-destructive genes. The copper ion is essential for many enzymatic processes including lysyl oxidase activity, which is critical for collagen and elastin cross-linking.",
      },
      {
        question: "What is GHK-Cu used for in research?",
        answer:
          "GHK-Cu is studied for skin rejuvenation, wound healing, collagen synthesis, scar remodelling, hair growth, antioxidant defence, anti-inflammatory activity, and age-related tissue decline. Its ability to influence over 4,000 genes (as documented in genomic studies) makes it a remarkably versatile research compound.",
      },
      {
        question: "How is ORYN GHK-Cu administered?",
        answer:
          "ORYN GHK-Cu is delivered via a pre-mixed pen containing 60 mg in 3 mL of solution. The pen is designed for subcutaneous injection with precise dosing. The high 60 mg concentration makes this one of the most potent GHK-Cu formulations available for research.",
      },
      {
        question: "What purity is ORYN's GHK-Cu?",
        answer:
          "ORYN GHK-Cu is manufactured to >99% purity in GMP-certified, ISO 7 cleanroom facilities. Each batch is tested by independent laboratories using HPLC and mass spectrometry. Certificates of Analysis are available for every batch.",
      },
      {
        question: "How should GHK-Cu be stored?",
        answer:
          "GHK-Cu pens should be stored refrigerated at 2-8°C, away from direct light. Do not freeze the product. Shelf life is 24 months under proper storage. Continue refrigerating the pen between doses throughout the 30-day dosing period.",
      },
      {
        question: "Can GHK-Cu be combined with other peptides?",
        answer:
          "GHK-Cu is sometimes studied alongside BPC-157 in wound healing research, as both compounds have tissue-repair properties that operate through different mechanisms. GHK-Cu may also be studied in conjunction with NAD+ for anti-aging research protocols. Researchers should base combination decisions on published literature. This is for research reference only.",
      },
      {
        question: "How long does a GHK-Cu pen last?",
        answer:
          "Each ORYN GHK-Cu pen provides a 30-day dosing period. The 60 mg / 3 mL formulation is calibrated for daily dosing over the full monthly research cycle.",
      },
      {
        question: "Why is the copper ion important in GHK-Cu?",
        answer:
          "The copper(II) ion in GHK-Cu is not merely structural — it is functionally essential. Copper is a cofactor for enzymes including superoxide dismutase (antioxidant defence), lysyl oxidase (collagen cross-linking), and cytochrome c oxidase (cellular energy production). The GHK tripeptide acts as a copper delivery vehicle, transporting the ion to tissues where it can participate in these enzymatic processes.",
      },
      {
        question: "Is GHK-Cu legal to purchase in the UK?",
        answer:
          "GHK-Cu is legal to purchase in the UK for research purposes. It is not classified as a controlled substance and is widely available as a research chemical. ORYN supplies GHK-Cu exclusively for laboratory and research use.",
      },
    ],
  },

  // ── Glutathione ────────────────────────────────────────────────
  {
    slug: "glutathione-faq",
    title: "Glutathione Frequently Asked Questions",
    metaTitle: "Glutathione FAQ | Master Antioxidant Research Questions | ORYN Peptides",
    metaDescription:
      "Glutathione research FAQ. Learn about this master antioxidant, detoxification mechanisms, immune support research, purity, and ORYN's pen system.",
    type: "product",
    relatedProductSlug: "glutathione",
    relatedCategorySlug: "anti-aging",
    introduction:
      "Glutathione (GSH) is a tripeptide found in virtually every cell in the body, often called the 'master antioxidant' for its central role in oxidative stress defence and detoxification. ORYN's injectable pen format offers superior bioavailability compared to oral supplementation. Here are the most common research questions about Glutathione.",
    faqs: [
      {
        question: "What is Glutathione?",
        answer:
          "Glutathione (L-glutathione, GSH) is a tripeptide composed of glutamic acid, cysteine, and glycine. It is the most abundant intracellular antioxidant in the human body and plays critical roles in detoxification, immune function, and cellular protection. ORYN Glutathione is formulated at >99% purity with a potent 6 g dose in a precision pen system.",
      },
      {
        question: "How does Glutathione work?",
        answer:
          "Glutathione functions through multiple mechanisms: it directly neutralises reactive oxygen species (ROS) and free radicals, serves as a cofactor for glutathione peroxidase enzymes, conjugates with toxins via glutathione S-transferases for elimination, and regenerates other antioxidants such as vitamins C and E. The glutathione redox cycle (GSH/GSSG) is fundamental to cellular homeostasis.",
      },
      {
        question: "What is Glutathione used for in research?",
        answer:
          "Glutathione is studied in research related to oxidative stress, liver detoxification, immune function, neurodegenerative conditions, skin depigmentation (melanin inhibition), heavy metal chelation, mitochondrial protection, and age-related decline in antioxidant capacity.",
      },
      {
        question: "How is ORYN Glutathione administered?",
        answer:
          "ORYN Glutathione is delivered via a pre-mixed pen containing 6 g in 3 mL. The pen is designed for subcutaneous injection, bypassing the gastrointestinal tract and avoiding the significant bioavailability losses associated with oral glutathione supplementation. No reconstitution is required.",
      },
      {
        question: "What purity is ORYN's Glutathione?",
        answer:
          "ORYN Glutathione is manufactured to >99% purity under GMP-certified conditions. Each batch is independently tested using HPLC and mass spectrometry. Certificates of Analysis are available for all production batches.",
      },
      {
        question: "How should Glutathione be stored?",
        answer:
          "Glutathione pens must be refrigerated at 2-8°C and kept away from direct light. Do not freeze. Proper storage ensures a shelf life of 24 months. Glutathione is susceptible to oxidation, so correct storage is particularly important for maintaining the reduced (active) form.",
      },
      {
        question: "Can Glutathione be combined with other peptides?",
        answer:
          "Glutathione is frequently studied alongside NAD+ in anti-aging and cellular health research, as both compounds address different aspects of cellular function — Glutathione for antioxidant defence and NAD+ for energy metabolism. It is also studied with GHK-Cu in skin health research. Researchers should consult published literature for protocol design. This is for research reference only.",
      },
      {
        question: "How long does a Glutathione pen last?",
        answer:
          "Each ORYN Glutathione pen is designed for a 30-day dosing period. The 6 g / 3 mL formulation provides calibrated daily doses over the full monthly cycle.",
      },
      {
        question:
          "Why is injectable Glutathione preferred over oral forms in research?",
        answer:
          "Oral glutathione has poor bioavailability because it is largely broken down by digestive enzymes and first-pass liver metabolism. Studies have shown that oral supplementation often fails to significantly raise plasma glutathione levels. Injectable administration bypasses the GI tract entirely, delivering glutathione directly to the bloodstream at near-100% bioavailability. This is why ORYN uses a pen-based injectable delivery system.",
      },
      {
        question: "Is Glutathione legal to purchase in the UK?",
        answer:
          "Glutathione is legal to purchase in the UK for research purposes. It is a naturally occurring compound and is not a controlled substance. ORYN supplies pharmaceutical-grade Glutathione for laboratory and research applications.",
      },
    ],
  },

  // ── NAD+ ───────────────────────────────────────────────────────
  {
    slug: "nad-plus-faq",
    title: "NAD+ Frequently Asked Questions",
    metaTitle: "NAD+ FAQ | Cellular Energy & Anti-Aging Research | ORYN Peptides",
    metaDescription:
      "NAD+ research FAQ. Learn about this essential coenzyme, cellular energy, DNA repair, anti-aging research, and ORYN's precision pen delivery system.",
    type: "product",
    relatedProductSlug: "nad-plus",
    relatedCategorySlug: "anti-aging",
    introduction:
      "NAD+ (Nicotinamide Adenine Dinucleotide) is an essential coenzyme present in every living cell, playing a critical role in energy metabolism, DNA repair, and cellular signalling. NAD+ levels naturally decline with age, making it a central focus of anti-aging research. Here are the most common questions about NAD+ and ORYN's pen formulation.",
    faqs: [
      {
        question: "What is NAD+?",
        answer:
          "NAD+ (Nicotinamide Adenine Dinucleotide) is a coenzyme found in all living cells. It exists in two forms: NAD+ (oxidised) and NADH (reduced). NAD+ is essential for hundreds of enzymatic reactions including energy metabolism, DNA repair via sirtuins and PARPs, and cellular signalling. ORYN NAD+ is formulated at >99% purity with 500 mg in a precision pen system.",
      },
      {
        question: "How does NAD+ work?",
        answer:
          "NAD+ functions as an electron carrier in mitochondrial energy production (the electron transport chain), a substrate for sirtuin enzymes (SIRT1-7) that regulate gene expression, inflammation, and cellular stress responses, and a substrate for PARP enzymes involved in DNA repair. It also serves as a precursor for calcium signalling molecules. NAD+ levels decline approximately 50% between ages 40 and 60, according to published research.",
      },
      {
        question: "What is NAD+ used for in research?",
        answer:
          "NAD+ is studied in research related to cellular aging, mitochondrial function, DNA repair, neurodegenerative diseases, metabolic health, circadian rhythm regulation, cardiovascular function, and immune cell metabolism. It is one of the most actively researched molecules in the longevity science field.",
      },
      {
        question: "How is ORYN NAD+ administered?",
        answer:
          "ORYN NAD+ is delivered via a pre-mixed pen containing 500 mg in 3 mL. The pen is designed for subcutaneous injection, providing direct delivery to the bloodstream. This bypasses the digestive system, which can degrade NAD+ before absorption. No reconstitution is required.",
      },
      {
        question: "What purity is ORYN's NAD+?",
        answer:
          "ORYN NAD+ is manufactured to >99% purity under GMP-certified conditions with ISO 7 cleanroom standards. Each batch is verified by independent HPLC and mass spectrometry testing. Certificates of Analysis are provided for all batches.",
      },
      {
        question: "How should NAD+ be stored?",
        answer:
          "NAD+ pens should be stored refrigerated at 2-8°C, protected from light. Do not freeze. NAD+ is sensitive to heat and light degradation, so proper storage is essential for maintaining bioactivity. Shelf life is 24 months under correct conditions.",
      },
      {
        question: "Can NAD+ be combined with other peptides?",
        answer:
          "NAD+ is commonly studied alongside Glutathione (for comprehensive antioxidant and energy research) and GHK-Cu (for anti-aging skin research). Some researchers also study NAD+ in conjunction with GH-releasing peptides to investigate interactions between cellular energy and growth hormone pathways. Protocol design should be based on published literature. This is research information only.",
      },
      {
        question: "How long does a NAD+ pen last?",
        answer:
          "Each ORYN NAD+ pen provides a full 30-day dosing protocol. The 500 mg / 3 mL formulation delivers precise daily doses over the complete monthly research cycle.",
      },
      {
        question: "How does injectable NAD+ compare to oral NMN or NR supplements?",
        answer:
          "Oral NAD+ precursors (NMN, NR) must be converted to NAD+ through multi-step enzymatic pathways, with significant losses during digestion and conversion. Injectable NAD+ delivers the active coenzyme directly, bypassing all conversion steps and GI degradation. Research has shown injectable NAD+ can raise plasma levels far more rapidly and to higher concentrations than oral precursor supplementation.",
      },
      {
        question: "Is NAD+ legal to purchase in the UK?",
        answer:
          "NAD+ is legal to purchase in the UK for research purposes. It is a naturally occurring coenzyme and is not a controlled substance. ORYN supplies pharmaceutical-grade NAD+ for laboratory and research applications.",
      },
    ],
  },

  // ── MediT Pen (Tirzepatide 40mg) ──────────────────────────────
  {
    slug: "medit-pen-faq",
    title: "MediT Pen Frequently Asked Questions",
    metaTitle: "MediT Pen FAQ | Prefilled Tirzepatide 40mg Questions | ORYN Peptides",
    metaDescription:
      "MediT Pen FAQ. Learn about ORYN's prefilled weekly Tirzepatide 40mg injection pen, dosing protocols, storage, and metabolic research applications.",
    type: "product",
    relatedProductSlug: "medit-tirzepatide",
    relatedCategorySlug: "weight-loss",
    introduction:
      "The ORYN MediT Pen is a prefilled, single-use injection pen containing 40 mg of Tirzepatide for once-weekly administration. It combines the dual GIP/GLP-1 mechanism of Tirzepatide with the convenience of a ready-to-use prefilled format. Below are common questions about the MediT Pen.",
    faqs: [
      {
        question: "What is the MediT Pen?",
        answer:
          "The MediT Pen is ORYN's prefilled, single-use injection pen containing 40 mg of Tirzepatide. It is designed for once-weekly subcutaneous administration, providing a full dose in a single injection. The prefilled format eliminates any dosing calculation or reconstitution, making it the most convenient Tirzepatide delivery system available for research.",
      },
      {
        question: "How does the MediT Pen differ from the standard Tirzepatide Pen?",
        answer:
          "The standard ORYN Tirzepatide Peptide Pen contains 10 mg and is designed for daily dosing over 30 days. The MediT Pen contains 40 mg in a prefilled, single-use format for once-weekly injection. The MediT Pen delivers a higher per-dose concentration and is suited to weekly dosing research protocols, while the standard pen suits daily micro-dosing protocols.",
      },
      {
        question: "How is the MediT Pen administered?",
        answer:
          "The MediT Pen is administered as a once-weekly subcutaneous injection. Simply remove the cap, prime the pen if required, select the injection site (typically the abdomen, thigh, or upper arm), and inject. The prefilled design means no reconstitution, no dose dialling, and no multi-step preparation.",
      },
      {
        question: "What purity is the MediT Pen Tirzepatide?",
        answer:
          "The MediT Pen contains Tirzepatide manufactured to >99% purity under GMP-certified conditions. Each production batch is independently tested via HPLC and mass spectrometry. Certificates of Analysis are available for verification.",
      },
      {
        question: "How should the MediT Pen be stored?",
        answer:
          "MediT Pens should be stored refrigerated at 2-8°C, away from direct light. Do not freeze. Each pen is individually sealed and should remain in its packaging until use. Since the MediT Pen is single-use, there is no need for between-dose storage once administered.",
      },
      {
        question: "Who is the MediT Pen designed for in research?",
        answer:
          "The MediT Pen is designed for metabolic research protocols requiring once-weekly Tirzepatide administration at a 40 mg dose. It is particularly relevant for researchers studying the dual GIP/GLP-1 mechanism at dosing levels aligned with published clinical trial protocols. ORYN products are for research use only.",
      },
      {
        question: "How many MediT Pens are needed per month?",
        answer:
          "As a once-weekly dosing format, approximately 4 MediT Pens are required per month (one per week). Each pen is single-use and contains the full 40 mg weekly dose.",
      },
      {
        question: "Can the MediT Pen be used with other peptides?",
        answer:
          "As with the standard Tirzepatide pen, the MediT Pen delivers a potent dual-receptor agonist that is typically studied as a standalone compound. Researchers considering combination protocols should carefully review published interaction data and follow relevant guidelines. This is for research purposes only and does not constitute medical advice.",
      },
      {
        question: "What is the target BMI for MediT Pen research?",
        answer:
          "Published clinical trials on Tirzepatide have typically enrolled subjects with a BMI of 27 or above with weight-related comorbidities, or a BMI of 30 or above. These criteria are from published research protocols and may guide research design. ORYN provides this information for research context only.",
      },
      {
        question: "Is the MediT Pen legal to purchase in the UK?",
        answer:
          "The MediT Pen is available for research purchase in the UK. Tirzepatide is a research compound when supplied outside of prescribed medical contexts. ORYN supplies the MediT Pen strictly for laboratory and research purposes.",
      },
    ],
  },

  // ── NovaDose NAD+ ──────────────────────────────────────────────
  {
    slug: "novadose-nad-faq",
    title: "NovaDose NAD+ Frequently Asked Questions",
    metaTitle: "NovaDose NAD+ FAQ | Cartridge System Research Questions | ORYN Peptides",
    metaDescription:
      "NovaDose NAD+ FAQ. Learn about ORYN's innovative cartridge-based NAD+ delivery system, microdosing, bioavailability, and anti-aging research applications.",
    type: "product",
    relatedProductSlug: "novadose-nad",
    relatedCategorySlug: "anti-aging",
    introduction:
      "The NovaDose NAD+ system is ORYN's innovative cartridge-based pen delivery platform for pharmaceutical-grade NAD+. Designed for precise daily microdosing with near-100% bioavailability, it offers a more affordable and practical alternative to IV NAD+ therapy. Here are the most common questions about the NovaDose system.",
    faqs: [
      {
        question: "What is the NovaDose NAD+ system?",
        answer:
          "NovaDose is ORYN's advanced cartridge-based pen delivery system for pharmaceutical-grade NAD+ (500 mg). It uses replaceable cartridges in a reusable aluminium pen body, designed for precise daily microdosing via subcutaneous injection. The system is engineered to deliver near-100% bioavailability while being more cost-effective and convenient than IV NAD+ infusions.",
      },
      {
        question: "How does NovaDose differ from the standard NAD+ Pen?",
        answer:
          "The standard ORYN NAD+ Pen is a single-unit pen containing 500 mg in 3 mL for 30-day use. NovaDose uses a reusable pen body with replaceable cartridges, offering a more sustainable and cost-effective long-term system. The cartridge format also allows for easier storage and transport of refills. Both deliver pharmaceutical-grade NAD+ at >99% purity.",
      },
      {
        question: "How is NovaDose administered?",
        answer:
          "NovaDose is administered via daily subcutaneous microdoses using the cartridge pen system. Load a cartridge into the pen body, attach a micro-needle, dial the dose, and inject. The precision dosing mechanism ensures consistent delivery with each administration. Micro-needles are included with the system.",
      },
      {
        question: "What is the bioavailability of NovaDose NAD+?",
        answer:
          "NovaDose delivers NAD+ via subcutaneous injection, providing near-100% bioavailability. This is a significant advantage over oral NAD+ precursors (NMN, NR), which must undergo enzymatic conversion and suffer GI degradation, and even over IV infusions, which require clinical settings and significant time commitment.",
      },
      {
        question: "What purity is NovaDose NAD+?",
        answer:
          "NovaDose uses pharmaceutical-grade NAD+ sourced from GMP-certified manufacturing in Korea. Purity exceeds 99%, with each batch verified by independent HPLC and mass spectrometry testing. The Korean pharmaceutical supply chain is renowned for stringent quality standards.",
      },
      {
        question: "How should NovaDose be stored?",
        answer:
          "NovaDose cartridges should be stored refrigerated at 2-8°C, protected from light. The reusable pen body can be stored at room temperature. Do not freeze the cartridges. Unopened cartridges maintain potency throughout their stated shelf life when stored correctly.",
      },
      {
        question: "How does NovaDose compare to IV NAD+ therapy?",
        answer:
          "IV NAD+ therapy typically costs hundreds of pounds per session, requires a clinical setting, and takes 2-4 hours per infusion. NovaDose delivers comparable bioavailability through daily subcutaneous microdoses at home, at a fraction of the cost. The daily microdosing approach also provides more consistent NAD+ levels compared to periodic IV bolus dosing.",
      },
      {
        question: "How long does the NovaDose system last?",
        answer:
          "Each NovaDose cartridge contains 500 mg of NAD+, designed for a full dosing cycle of daily microdoses. The reusable pen body is designed for long-term use with replaceable cartridges. Micro-needles should be changed with each injection for sterility.",
      },
      {
        question: "Can NovaDose be combined with other peptides?",
        answer:
          "NAD+ from NovaDose can be part of broader research protocols alongside other ORYN peptides. Common pairings in published research include NAD+ with Glutathione (cellular health), GHK-Cu (anti-aging skin research), and BPC-157 (comprehensive recovery). Researchers should base protocol design on peer-reviewed literature. This is for research reference only.",
      },
      {
        question: "Is NovaDose legal to purchase in the UK?",
        answer:
          "NovaDose NAD+ is legal to purchase in the UK for research purposes. NAD+ is a naturally occurring coenzyme and is not a controlled substance. ORYN supplies the NovaDose system exclusively for laboratory and research applications.",
      },
    ],
  },
];

// ─── Topic FAQ Hubs ────────────────────────────────────────────────

const topicFAQHubs: FAQHub[] = [
  // ── Peptide Pens General ───────────────────────────────────────
  {
    slug: "peptide-pens-faq",
    title: "Peptide Pens: Frequently Asked Questions",
    metaTitle: "Peptide Pens FAQ | How Pen Systems Work | ORYN Peptides",
    metaDescription:
      "Everything you need to know about peptide pen systems. Learn how pre-mixed peptide pens work, their advantages over vials, dosing mechanisms, and more.",
    type: "topic",
    introduction:
      "Peptide pens represent a significant advancement in research peptide delivery, offering pre-mixed convenience, precise dosing, and reduced contamination risk compared to traditional vial-and-syringe methods. This FAQ covers the most common questions about how peptide pen systems work and why researchers are adopting them.",
    faqs: [
      {
        question: "What is a peptide pen?",
        answer:
          "A peptide pen is a pen-shaped injection device that contains a pre-mixed peptide solution, ready for subcutaneous administration. Unlike traditional vials that require reconstitution with bacteriostatic water and manual syringe drawing, peptide pens come pre-loaded and use a dial-and-click mechanism for precise dosing. ORYN pens contain pharmaceutical-grade peptides at >99% purity.",
      },
      {
        question: "How do peptide pens work?",
        answer:
          "Peptide pens use a mechanical dosing system where each click delivers a precise, pre-calibrated volume of peptide solution. The user attaches a sterile needle, selects the injection site, and administers a subcutaneous injection. The pen tracks remaining doses and ensures consistent delivery throughout the dosing period.",
      },
      {
        question: "What are the advantages of pens over traditional vials?",
        answer:
          "Peptide pens offer several key advantages: (1) No reconstitution required — eliminating mixing errors and contamination risk. (2) Precise dosing — mechanical click delivery is more accurate than manual syringe drawing. (3) Convenience — portable and discreet. (4) Reduced waste — no leftover bacteriostatic water or syringes. (5) Sterility — factory-sealed and 0.22um filtered.",
      },
      {
        question: "How long does a peptide pen last?",
        answer:
          "Most ORYN peptide pens are designed for a 30-day dosing period, with one pen covering a full monthly research cycle. The exception is the MediT Pen, which is a single-use prefilled pen for once-weekly administration (approximately 4 per month). Each pen type states its intended dosing period clearly.",
      },
      {
        question: "Do peptide pens need to be refrigerated?",
        answer:
          "Yes. All ORYN peptide pens should be stored at 2-8°C (standard refrigerator temperature) and protected from direct light. Do not freeze. Proper refrigeration maintains peptide stability and bioactivity throughout the 24-month shelf life and during the active dosing period.",
      },
      {
        question: "What needles do peptide pens use?",
        answer:
          "ORYN peptide pens use standard pen needles designed for subcutaneous injection. The NovaDose system includes micro-needles. A fresh sterile needle should be used for each injection to maintain sterility and ensure comfortable administration.",
      },
      {
        question: "Are peptide pens sterile?",
        answer:
          "Yes. ORYN peptide pens undergo 0.22um membrane filtration and gamma ray sterilisation during manufacturing. The pens are factory-sealed in sterile packaging. Users should always use a new sterile needle for each injection and follow standard aseptic technique.",
      },
      {
        question: "Can I travel with peptide pens?",
        answer:
          "Peptide pens are portable and discreet, making them suitable for transport. However, they must remain refrigerated (a cool bag with ice packs is suitable for short journeys). For air travel, check the relevant airline and destination regulations regarding injectable research materials. Keep pens in their original packaging with documentation.",
      },
      {
        question: "How many peptides does ORYN offer in pen format?",
        answer:
          "ORYN offers 10 products across three pen categories: 8 Peptide Pen system products (BPC-157, TB-500, CJC-1295, Ipamorelin, Tirzepatide, GHK-Cu, Glutathione, and NAD+), 1 MediT Pen (Tirzepatide 40mg prefilled), and 1 NovaDose system (NAD+ cartridge pen). All are pharmaceutical-grade with >99% purity.",
      },
      {
        question: "What is the difference between ORYN's three pen categories?",
        answer:
          "The Peptide Pen System is a multi-dose reusable pen for 30-day daily dosing (8 peptides available). The MediT Pen is a prefilled, single-use pen for once-weekly Tirzepatide 40mg. The NovaDose System is a reusable aluminium pen with replaceable cartridges for daily NAD+ microdosing. Each format is engineered for its specific dosing protocol.",
      },
    ],
  },

  // ── Ordering & Delivery ────────────────────────────────────────
  {
    slug: "ordering-delivery-faq",
    title: "Ordering & Delivery: Frequently Asked Questions",
    metaTitle: "Ordering & Delivery FAQ | Shipping & Payment | ORYN Peptides",
    metaDescription:
      "ORYN ordering and delivery FAQ. Learn about shipping times, delivery options, payment methods, free shipping thresholds, and order tracking.",
    type: "topic",
    introduction:
      "ORYN is committed to fast, reliable delivery of research-grade peptide products across the UK and Europe. We offer secure payment via Stripe, competitive shipping options, and a free shipping threshold. Below are common questions about ordering and delivery.",
    faqs: [
      {
        question: "How do I place an order with ORYN?",
        answer:
          "Orders can be placed directly through the ORYN website at orynpeptides.com. Browse products, add them to your cart, and proceed through the secure checkout process. Payment is processed via Stripe, supporting all major credit and debit cards.",
      },
      {
        question: "What payment methods does ORYN accept?",
        answer:
          "ORYN accepts all major credit and debit cards (Visa, Mastercard, American Express) through our secure Stripe payment gateway. All transactions are encrypted and PCI-compliant. Additional payment methods may be available at checkout depending on your region.",
      },
      {
        question: "Is there free shipping?",
        answer:
          "Yes. ORYN offers free shipping on orders over \u20ac150. A progress bar in the cart shows how close you are to the free shipping threshold. Orders below \u20ac150 are charged a flat shipping rate displayed at checkout.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "UK delivery is typically next-day for orders placed before the cut-off time. European delivery times vary by destination but are generally 2-5 working days. All orders are dispatched with tracking information sent to your email.",
      },
      {
        question: "How are peptide pens shipped?",
        answer:
          "Peptide pens are shipped in temperature-controlled packaging to maintain the required 2-8°C cold chain during transit. Products are securely packaged to prevent damage, and all shipments include tracking. Discreet packaging is used for all orders.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Yes. Once your order is dispatched, you will receive a tracking number via email. You can use this number to track your delivery through the courier's website. If you have any issues with tracking, contact ORYN support at info@orynpeptides.com.",
      },
      {
        question: "Does ORYN ship internationally?",
        answer:
          "ORYN primarily serves the UK and European Union markets. We ship to the United Kingdom, Germany, France, Spain, Italy, and the Netherlands, among other EU countries. Shipping availability and regulations may vary by destination. Contact us for specific country enquiries.",
      },
      {
        question: "What if my order arrives damaged?",
        answer:
          "If your order arrives damaged or the cold chain has been compromised, contact ORYN support at info@orynpeptides.com immediately with photos of the damage. We will arrange a replacement or refund. Product integrity is our top priority, and all shipments are insured.",
      },
      {
        question: "Can I use a promo code?",
        answer:
          "Yes. Promo codes can be entered during checkout. Enter your code in the promotional code field and click 'Apply' to see the discount reflected in your order total. Promo codes cannot be combined with other offers unless stated otherwise.",
      },
      {
        question: "Does ORYN offer wholesale pricing?",
        answer:
          "Yes. ORYN offers wholesale pricing for research laboratories, institutions, and bulk purchasers. Contact the wholesale team at wholesale@orynpeptides.com with your requirements for a custom quote. Volume discounts are available across the full product range.",
      },
    ],
  },

  // ── Storage & Handling ─────────────────────────────────────────
  {
    slug: "storage-handling-faq",
    title: "Storage & Handling: Frequently Asked Questions",
    metaTitle: "Peptide Storage & Handling FAQ | Cold Chain Guide | ORYN Peptides",
    metaDescription:
      "How to properly store and handle research peptide pens. Learn about cold chain requirements, shelf life, reconstitution, and best practices for peptide stability.",
    type: "topic",
    introduction:
      "Proper storage and handling of research peptides is essential for maintaining their purity, stability, and biological activity. ORYN's pen system simplifies many aspects of peptide handling, but correct temperature management remains critical. This FAQ covers best practices for peptide storage and handling.",
    faqs: [
      {
        question: "What temperature should peptide pens be stored at?",
        answer:
          "All ORYN peptide pens should be stored at 2-8°C, which is standard refrigerator temperature. This range maintains peptide stability and prevents degradation. Do not store pens in the freezer, near the back wall of the fridge (where freezing can occur), or at room temperature for extended periods.",
      },
      {
        question: "Can peptides be frozen?",
        answer:
          "No. ORYN peptide pens should not be frozen. Freezing can cause ice crystal formation that may damage the peptide's molecular structure and compromise bioactivity. If a pen has been accidentally frozen, it should not be used, as the peptide integrity may be compromised.",
      },
      {
        question: "What is the shelf life of ORYN peptide pens?",
        answer:
          "ORYN peptide pens have a shelf life of 24 months when stored correctly at 2-8°C. Each pen is labelled with a batch number and expiration date. Once opened and in active use, the pen should continue to be refrigerated and used within the 30-day dosing period.",
      },
      {
        question: "Does light affect peptide stability?",
        answer:
          "Yes. Direct light, especially UV light, can degrade certain peptides through photolysis and oxidation reactions. ORYN pens should be stored in their original packaging or in a dark area of the refrigerator. Avoid leaving pens on countertops or near windows.",
      },
      {
        question: "How should I handle a peptide pen before injection?",
        answer:
          "Remove the pen from the refrigerator 1-2 minutes before use to allow it to approach room temperature slightly — this can improve comfort during injection. Do not shake the pen vigorously. Attach a new sterile needle, prime the pen if required (to remove air bubbles), and administer using aseptic technique.",
      },
      {
        question: "Do ORYN pens require reconstitution?",
        answer:
          "No. All ORYN peptide pens come pre-mixed and ready to use. This is a key advantage over traditional vials, which require manual reconstitution with bacteriostatic water. The pre-mixed format eliminates dosing errors, contamination risk, and the need for additional supplies.",
      },
      {
        question: "How should I dispose of used needles?",
        answer:
          "Used needles should be disposed of in a sharps container, never in regular household waste. Sharps containers are available from pharmacies. When full, sharps containers should be returned to a pharmacy or local authority collection point for safe disposal in accordance with UK regulations.",
      },
      {
        question: "What happens if a pen is left out of the fridge?",
        answer:
          "Brief periods at room temperature (under 30 minutes for injection preparation) are acceptable. However, extended exposure to room temperature or higher will accelerate peptide degradation. If a pen has been left unrefrigerated for several hours or more, its potency may be compromised and it should not be used for research requiring precise dosing.",
      },
      {
        question: "Can I transport peptide pens without refrigeration?",
        answer:
          "For short journeys (under 2 hours), a cool bag with ice packs or gel packs can maintain adequate temperature. For longer transport, use an insulated container with temperature monitoring. Never leave pens in a hot car, direct sunlight, or checked luggage without thermal protection.",
      },
      {
        question: "How do I know if a peptide pen has degraded?",
        answer:
          "Visual indicators of degradation include cloudiness, discolouration, or visible particles in the solution. However, peptide degradation can occur without visible changes. This is why proper storage at 2-8°C throughout the product's life is essential. If you suspect degradation, do not use the pen and contact ORYN support.",
      },
    ],
  },

  // ── Purity & Testing ──────────────────────────────────────────
  {
    slug: "purity-testing-faq",
    title: "Purity & Testing: Frequently Asked Questions",
    metaTitle: "Peptide Purity & Testing FAQ | Quality Assurance | ORYN Peptides",
    metaDescription:
      "Learn about ORYN's peptide purity standards, HPLC testing, GMP manufacturing, ISO 7 cleanroom facilities, and Certificates of Analysis.",
    type: "topic",
    introduction:
      "Purity is the single most important factor in research peptide quality. Impurities can compromise research outcomes and introduce confounding variables. ORYN maintains >99% purity across all products, verified by independent third-party testing. This FAQ explains our quality assurance processes.",
    faqs: [
      {
        question: "What purity are ORYN peptides?",
        answer:
          "All ORYN peptides are manufactured to >99% purity. This exceeds the standard threshold for pharmaceutical-grade classification and ensures minimal impurity content that could affect research outcomes. Purity is verified by independent third-party testing for every production batch.",
      },
      {
        question: "How is peptide purity tested?",
        answer:
          "ORYN uses High-Performance Liquid Chromatography (HPLC) as the primary purity testing method. This is supplemented by mass spectrometry for identity confirmation, endotoxin testing for sterility verification, and amino acid analysis for sequence confirmation. These methods represent the gold standard for peptide quality control.",
      },
      {
        question: "What is a Certificate of Analysis (CoA)?",
        answer:
          "A Certificate of Analysis is an official document that reports the results of quality testing for a specific production batch. ORYN CoAs include purity percentage (HPLC), molecular weight confirmation (mass spectrometry), appearance, solubility, endotoxin levels, and sterility results. CoAs are available for all ORYN products.",
      },
      {
        question: "What manufacturing standards does ORYN follow?",
        answer:
          "ORYN peptides are manufactured in GMP-certified (Good Manufacturing Practice) facilities that meet ISO 7 cleanroom standards. GMP certification ensures standardised processes, quality control, and traceability. ISO 7 cleanroom classification controls airborne particulate contamination to pharmaceutical-grade levels.",
      },
      {
        question: "What is 0.22um filtration?",
        answer:
          "0.22 micrometre membrane filtration is a sterilisation method that removes bacteria and other microorganisms from liquid solutions. All ORYN peptide solutions pass through 0.22um filters during manufacturing. This is combined with gamma ray sterilisation for comprehensive sterility assurance.",
      },
      {
        question: "What is gamma ray sterilisation?",
        answer:
          "Gamma ray sterilisation uses ionising radiation to destroy microorganisms, including bacteria, viruses, and fungi. It is used in pharmaceutical manufacturing to achieve terminal sterilisation of sealed products. ORYN pens undergo gamma ray sterilisation as an additional sterility measure beyond 0.22um filtration.",
      },
      {
        question: "Why does purity matter in peptide research?",
        answer:
          "Impurities in peptide preparations can include truncated sequences, deletion sequences, oxidised forms, and residual solvents. These contaminants can produce off-target biological effects, reduce potency, introduce confounding variables in research, and compromise reproducibility. >99% purity minimises these risks.",
      },
      {
        question: "How can I verify the purity of my ORYN peptides?",
        answer:
          "Every ORYN product comes with a batch-specific Certificate of Analysis. You can request the CoA for your specific batch by contacting info@orynpeptides.com with your order number and batch code. Independent researchers can also submit samples for third-party verification at their preferred testing laboratory.",
      },
      {
        question: "What impurities are tested for?",
        answer:
          "ORYN's quality control programme tests for truncated peptide sequences, deletion peptides, oxidised variants, residual solvents (such as TFA and acetonitrile), heavy metals, endotoxins, and microbial contamination. All must fall below strict thresholds before a batch is released.",
      },
      {
        question: "Does ORYN use third-party testing?",
        answer:
          "Yes. In addition to in-house quality control, ORYN submits every production batch to independent, accredited third-party laboratories for verification testing. This provides an additional layer of quality assurance and ensures unbiased purity confirmation. Third-party results are included in the Certificate of Analysis.",
      },
    ],
  },

  // ── Peptide Research General ───────────────────────────────────
  {
    slug: "peptide-research-faq",
    title: "Peptide Research: Frequently Asked Questions",
    metaTitle: "Peptide Research FAQ | What Are Research Peptides? | ORYN Peptides",
    metaDescription:
      "General peptide research FAQ. Learn what research peptides are, how they work, common research applications, and why peptides are important in modern science.",
    type: "topic",
    introduction:
      "Peptides are at the forefront of modern biomedical research, with applications spanning tissue repair, metabolism, neuroscience, and aging. As short chains of amino acids, they offer remarkable specificity and biological activity. This FAQ provides a foundation for understanding peptide research and its significance.",
    faqs: [
      {
        question: "What are peptides?",
        answer:
          "Peptides are short chains of amino acids linked by peptide bonds. They are typically defined as chains of 2-50 amino acids (longer chains are classified as proteins). Peptides occur naturally in the body as hormones, neurotransmitters, and signalling molecules, and can also be synthesised for research purposes. Each peptide's unique amino acid sequence determines its biological function.",
      },
      {
        question: "What are research peptides?",
        answer:
          "Research peptides are synthetic peptides manufactured for laboratory and scientific investigation. They are produced to high purity standards and are used to study biological mechanisms, test hypotheses about disease pathways, and explore potential therapeutic targets. Research peptides are not approved medicines and are not intended for human therapeutic use.",
      },
      {
        question: "How are peptides different from proteins?",
        answer:
          "The primary distinction is size: peptides are typically chains of 2-50 amino acids, while proteins contain 50 or more amino acids with complex three-dimensional folding. Peptides tend to be more targeted and specific in their biological activity, while proteins are larger and often have broader functions. Many bioactive peptides are derived from larger parent proteins.",
      },
      {
        question: "Why are peptides important in research?",
        answer:
          "Peptides are important because they offer high biological specificity with generally lower toxicity than small molecule drugs. They can target specific receptors and pathways with precision. The global peptide therapeutics market is growing rapidly, with dozens of peptide-based drugs already approved and hundreds more in clinical trials. Understanding peptide biology is critical for advancing medicine.",
      },
      {
        question: "What are the most commonly researched peptides?",
        answer:
          "Some of the most studied research peptides include BPC-157 (tissue repair), TB-500 (wound healing), CJC-1295 and Ipamorelin (growth hormone release), Tirzepatide (metabolic function), GHK-Cu (skin and tissue remodelling), and various antimicrobial peptides. Each has a substantial body of published research.",
      },
      {
        question: "How are research peptides manufactured?",
        answer:
          "Research peptides are primarily manufactured using solid-phase peptide synthesis (SPPS), a technique developed by Robert Bruce Merrifield (Nobel Prize, 1984). The process involves stepwise addition of protected amino acids to a solid resin support, followed by cleavage, purification (typically by HPLC), and lyophilisation. Quality peptides require GMP-certified facilities.",
      },
      {
        question: "What is the difference between natural and synthetic peptides?",
        answer:
          "Natural peptides are produced by living organisms through ribosomal synthesis (gene expression) or non-ribosomal peptide synthesis. Synthetic peptides are manufactured in laboratories using chemical synthesis. Synthetic peptides can be identical to natural ones (e.g., BPC-157) or modified for improved stability, potency, or selectivity (e.g., CJC-1295). The key advantage of synthetic production is consistency and purity.",
      },
      {
        question: "How do peptides interact with the body?",
        answer:
          "Peptides typically exert their effects by binding to specific cell surface receptors, activating intracellular signalling cascades that alter gene expression, enzyme activity, or cellular behaviour. Some peptides also function intracellularly. The specificity of peptide-receptor interactions is determined by the peptide's amino acid sequence and three-dimensional conformation.",
      },
      {
        question: "What fields use research peptides?",
        answer:
          "Research peptides are used across many scientific disciplines including pharmacology, immunology, oncology, neuroscience, endocrinology, dermatology, sports science, and regenerative medicine. They are also critical tools in drug development, biomarker discovery, and diagnostic assay development.",
      },
      {
        question: "Where can I find published research on peptides?",
        answer:
          "Published peptide research is available through databases such as PubMed (pubmed.ncbi.nlm.nih.gov), Google Scholar (scholar.google.com), and journal-specific archives. Key journals include Peptides, Journal of Peptide Science, and various discipline-specific journals. Always refer to peer-reviewed publications for evidence-based research information.",
      },
    ],
  },

  // ── Dosing & Protocols ─────────────────────────────────────────
  {
    slug: "dosing-protocols-faq",
    title: "Dosing & Protocols: Frequently Asked Questions",
    metaTitle: "Peptide Dosing FAQ | Research Protocols & Administration | ORYN Peptides",
    metaDescription:
      "Peptide dosing and protocol FAQ. Learn about subcutaneous injection technique, dosing schedules, protocol design, and best practices for peptide research.",
    type: "topic",
    introduction:
      "Proper dosing and protocol design are fundamental to meaningful peptide research. ORYN's pen systems are engineered for consistent, precise dosing, but understanding the principles behind dosing schedules, administration routes, and protocol duration is essential. This FAQ covers key dosing and protocol questions. All information is for research reference and does not constitute medical advice.",
    faqs: [
      {
        question: "What is subcutaneous injection?",
        answer:
          "Subcutaneous (SubQ) injection is the administration of a substance into the fatty tissue layer between the skin and muscle. It is the standard route for most peptide research protocols. Common injection sites include the abdomen (around the navel), upper thigh, and upper arm. SubQ injection provides slower, more sustained absorption compared to intravenous or intramuscular routes.",
      },
      {
        question: "Why are peptides administered by injection?",
        answer:
          "Most peptides cannot survive oral administration because digestive enzymes (proteases) in the stomach and intestines break down peptide bonds before absorption can occur. Injectable administration bypasses the GI tract, delivering intact peptide molecules directly to the tissue and bloodstream. This ensures bioavailability and consistent dosing.",
      },
      {
        question: "How often should peptides be dosed?",
        answer:
          "Dosing frequency depends on the specific peptide and the research protocol. Most ORYN Peptide Pen products are designed for daily dosing over 30 days. The MediT Pen Tirzepatide is dosed once weekly. Researchers should design dosing schedules based on published pharmacokinetic data for each specific peptide.",
      },
      {
        question: "What time of day should peptides be administered?",
        answer:
          "Timing depends on the peptide and research objectives. GH-releasing peptides (CJC-1295, Ipamorelin) are often administered in the evening to align with natural GH secretion peaks during sleep. Other peptides like BPC-157 may be administered at any consistent time. Maintaining the same administration time daily helps ensure protocol consistency.",
      },
      {
        question: "Should peptides be taken with or without food?",
        answer:
          "Since ORYN peptides are administered by injection (not oral), food intake does not directly affect peptide absorption or bioavailability. However, for GH-releasing peptides, some research suggests administering on an empty stomach (or at least 30 minutes before or 2 hours after eating) may optimise GH release, as elevated blood glucose and insulin can blunt GH secretion.",
      },
      {
        question: "What is peptide cycling?",
        answer:
          "Peptide cycling refers to alternating periods of peptide administration (on-cycle) with periods of rest (off-cycle). The purpose is to prevent receptor desensitisation, allow for physiological baseline assessment, and reduce the potential for tolerance development. Common cycling patterns include 5 days on / 2 days off, or 4 weeks on / 1-2 weeks off. Cycling protocols should be based on published research.",
      },
      {
        question: "How do I know the correct dose?",
        answer:
          "ORYN peptide pens are pre-calibrated for specific dosing protocols. Each click delivers a precise, predetermined dose calculated for the 30-day pen period. Researchers designing custom protocols should refer to published dose-response studies for the specific peptide. ORYN does not provide dosing advice for individual research applications. This is not medical guidance.",
      },
      {
        question: "What is injection site rotation?",
        answer:
          "Injection site rotation means alternating the location of subcutaneous injections to prevent tissue irritation, lipodystrophy (changes in fat tissue), and localised discomfort. Common rotation patterns include alternating between left and right sides of the abdomen, thighs, and upper arms. Rotate sites with each injection.",
      },
      {
        question: "Can multiple peptides be administered at the same time?",
        answer:
          "Multiple peptides can be administered during the same research session, but they should generally be injected at separate sites rather than mixed in the same syringe (unless specifically validated for co-formulation). Mixing peptides can alter stability, pH, and bioactivity. Administer each peptide at its own injection site.",
      },
      {
        question: "How long should a peptide research protocol run?",
        answer:
          "Protocol duration varies by research objective and peptide type. Most ORYN pens are designed for 30-day cycles, which aligns with common research protocol durations in published literature. Longer-term studies may involve multiple cycles with rest periods between them. Protocol duration should be determined by research goals and published precedent.",
      },
    ],
  },

  // ── Safety & Side Effects Research ─────────────────────────────
  {
    slug: "peptide-safety-faq",
    title: "Peptide Safety: Frequently Asked Questions",
    metaTitle: "Peptide Safety FAQ | Side Effects & Research Safety | ORYN Peptides",
    metaDescription:
      "Peptide safety research FAQ. Learn about peptide safety profiles, common observations in research, injection safety, and ORYN's quality standards.",
    type: "topic",
    introduction:
      "Safety is a paramount concern in peptide research. Understanding the safety profiles documented in published research, proper injection technique, and quality assurance measures helps ensure responsible research practices. This FAQ covers safety-related questions based on published literature. This information is for research reference only and does not constitute medical advice.",
    faqs: [
      {
        question: "Are research peptides safe?",
        answer:
          "Research peptides have varying safety profiles depending on the specific compound, dosage, and route of administration. Published research on peptides like BPC-157, TB-500, and Ipamorelin generally reports favourable safety profiles with minimal adverse effects in preclinical studies. However, all research peptides should be handled according to laboratory safety protocols. ORYN products are for research use only.",
      },
      {
        question: "What are common observations at injection sites?",
        answer:
          "Published research and user reports commonly note mild, transient reactions at subcutaneous injection sites, including slight redness, minor swelling, or temporary itching. These typically resolve within hours. Proper injection technique, injection site rotation, and use of sterile needles minimise these occurrences. Persistent or severe reactions should be investigated.",
      },
      {
        question: "How does purity affect safety?",
        answer:
          "Higher purity directly correlates with improved safety profiles. Impurities such as truncated peptides, oxidised forms, residual solvents, and endotoxins can cause adverse reactions, inflammation, and unreliable biological responses. ORYN's >99% purity standard and comprehensive third-party testing minimise impurity-related risks.",
      },
      {
        question: "What injection safety precautions should be followed?",
        answer:
          "Standard injection safety precautions include: always using a new sterile needle, cleaning the injection site with an alcohol swab, rotating injection sites, washing hands before handling equipment, disposing of needles in a sharps container, and never sharing injection devices between individuals. These are standard laboratory safety practices.",
      },
      {
        question: "What is the safety profile of BPC-157 in research?",
        answer:
          "BPC-157 has been studied in numerous preclinical trials and has shown a consistently favourable safety profile. Published studies have not identified toxic doses in animal models, and no significant adverse effects have been reported across a wide range of research applications. These findings are from published research and are provided for reference only.",
      },
      {
        question: "What is the safety profile of GH-releasing peptides?",
        answer:
          "CJC-1295 and Ipamorelin have been studied in both preclinical and clinical contexts. Ipamorelin is notable for its selectivity — it stimulates GH release without significantly affecting cortisol, prolactin, or ACTH. Published clinical data on CJC-1295 and Ipamorelin report generally well-tolerated profiles. As with all research compounds, protocol design should reference published safety data.",
      },
      {
        question: "Can peptides interact with other substances?",
        answer:
          "Peptide interactions with other compounds are an area of active research. Some peptides may theoretically interact with certain pharmaceuticals or biological pathways. Researchers designing multi-compound protocols should review published interaction data. ORYN cannot provide guidance on specific combinations. This is research information and not medical advice.",
      },
      {
        question: "What should I do if I observe an unexpected reaction?",
        answer:
          "In a research setting, any unexpected observations should be documented thoroughly, the administration protocol should be paused, the product batch should be noted, and the event should be assessed against published literature. If the product is being used by an individual for any reason, they should consult a qualified medical professional immediately. ORYN products are sold for research use only.",
      },
      {
        question: "How does ORYN ensure product safety?",
        answer:
          "ORYN ensures product safety through multiple measures: GMP-certified manufacturing, ISO 7 cleanroom production, >99% purity standards, 0.22um filtration, gamma ray sterilisation, comprehensive third-party testing (HPLC, mass spectrometry, endotoxin testing), and batch-specific Certificates of Analysis. These measures represent pharmaceutical-grade quality assurance.",
      },
      {
        question: "Are there any peptides that should not be combined?",
        answer:
          "Published literature does not establish definitive contraindications for most research peptide combinations, but caution is warranted. Combining multiple compounds that act on the same biological pathway may produce unpredictable effects. Researchers should design protocols conservatively, reference published interaction studies, and introduce compounds individually when possible. This is research guidance and not medical advice.",
      },
    ],
  },

  // ── Peptide Stacking ───────────────────────────────────────────
  {
    slug: "peptide-stacking-faq",
    title: "Peptide Stacking: Frequently Asked Questions",
    metaTitle: "Peptide Stacking FAQ | Combining Peptides in Research | ORYN Peptides",
    metaDescription:
      "Peptide stacking FAQ. Learn about combining peptides for research, popular research stacks, synergistic mechanisms, and protocol design for multi-peptide studies.",
    type: "topic",
    introduction:
      "Peptide stacking refers to the practice of using multiple peptides in a research protocol, either concurrently or sequentially. Many published studies examine peptide combinations for synergistic or complementary effects. This FAQ covers common questions about peptide stacking in research contexts. All information is for research purposes and is not medical advice.",
    faqs: [
      {
        question: "What is peptide stacking?",
        answer:
          "Peptide stacking is the use of two or more peptides in a single research protocol. The goal is typically to target complementary biological pathways for synergistic or additive effects. Stacking is a common practice in published peptide research and is based on mechanistic rationale — combining compounds that work through different receptors or signalling cascades.",
      },
      {
        question: "What is the most studied peptide stack for recovery?",
        answer:
          "The BPC-157 + TB-500 combination is the most widely studied stack for tissue repair and recovery research. BPC-157 is thought to work primarily through the nitric oxide system and growth factor modulation, while TB-500 acts through actin regulation and cell migration. These complementary mechanisms are well-documented in published literature.",
      },
      {
        question: "What is the most studied stack for GH research?",
        answer:
          "The CJC-1295 + Ipamorelin combination is the most common GH-focused peptide stack. CJC-1295 acts on the GHRH receptor to stimulate sustained GH release, while Ipamorelin acts on the ghrelin receptor for selective GH stimulation. Targeting both pathways simultaneously has been shown to produce greater GH elevation than either compound alone in research.",
      },
      {
        question: "Can recovery and GH peptides be combined?",
        answer:
          "Some researchers study recovery peptides (BPC-157, TB-500) alongside GH-releasing peptides (CJC-1295, Ipamorelin) based on the rationale that elevated GH may enhance the tissue repair effects of recovery peptides. This type of multi-pathway research protocol is documented in the literature. Each peptide should be administered at its own injection site.",
      },
      {
        question: "Should stacked peptides be mixed in the same syringe?",
        answer:
          "Generally, no. Different peptides may have different pH optima, stability requirements, and can potentially interact chemically when mixed in solution. Unless a specific co-formulation has been validated, each peptide should be administered separately at its own injection site. ORYN pens are designed for individual peptide administration.",
      },
      {
        question: "What is an anti-aging peptide stack?",
        answer:
          "Anti-aging peptide research often combines NAD+ (cellular energy and DNA repair), GHK-Cu (collagen synthesis and tissue remodelling), and Glutathione (antioxidant defence). This triple combination targets three pillars of cellular aging: energy metabolism, structural integrity, and oxidative stress. Published research supports the individual mechanisms of each component.",
      },
      {
        question: "How should peptide stacking protocols be designed?",
        answer:
          "Stacking protocols should be designed based on: (1) published research establishing each peptide's mechanism of action, (2) documented compatibility or synergy between the compounds, (3) consideration of cumulative injection volume and frequency, (4) staggered introduction of compounds to isolate effects, and (5) appropriate cycling schedules. Always base protocols on peer-reviewed literature.",
      },
      {
        question: "Are there peptides that should not be stacked?",
        answer:
          "Caution is warranted when combining peptides that target the same receptor or biological pathway, as this may lead to receptor desensitisation or unpredictable effects. For example, combining multiple GH secretagogues beyond the standard CJC-1295 + Ipamorelin pair may produce diminishing returns. Tirzepatide, due to its potent dual-receptor mechanism, is typically studied as a standalone compound.",
      },
      {
        question: "Does ORYN sell pre-made peptide stacks?",
        answer:
          "ORYN sells each peptide as an individual product, allowing researchers maximum flexibility in designing their protocols. This approach ensures that each compound is optimally formulated and stored for its specific stability requirements. Researchers can purchase multiple ORYN pens to construct their own research stacks based on published literature.",
      },
      {
        question: "Where can I find published research on peptide combinations?",
        answer:
          "Published research on peptide combinations is available through PubMed (pubmed.ncbi.nlm.nih.gov), Google Scholar, and discipline-specific journals. Search for specific combinations (e.g., 'BPC-157 TB-500 combination') to find relevant studies. Review articles and meta-analyses can provide broad overviews of combination research. Always prioritise peer-reviewed sources.",
      },
    ],
  },

  // ── Peptide Legality ───────────────────────────────────────────
  {
    slug: "peptide-legality-faq",
    title: "Peptide Legality: Frequently Asked Questions",
    metaTitle: "Peptide Legality FAQ | UK & EU Legal Status | ORYN Peptides",
    metaDescription:
      "Peptide legality FAQ for the UK and EU. Learn about the legal status of research peptides, regulations, import rules, and responsible purchasing.",
    type: "topic",
    introduction:
      "Understanding the legal framework around research peptides is important for responsible purchasing and use. Regulations vary by country and can change over time. This FAQ covers the general legal landscape for research peptides in the UK and EU. This information is for general reference and should not be taken as legal advice — consult qualified legal counsel for specific situations.",
    faqs: [
      {
        question: "Are research peptides legal in the UK?",
        answer:
          "Research peptides are generally legal to purchase, possess, and use for research purposes in the UK. They are classified as research chemicals, not controlled substances (with specific exceptions). They are not licensed medicines and cannot be sold for human therapeutic use. ORYN supplies all peptides strictly for research and laboratory applications.",
      },
      {
        question: "Are research peptides legal in the EU?",
        answer:
          "The legal status of research peptides varies across EU member states. In most EU countries, research peptides can be legally purchased and possessed for research purposes. However, regulations may differ regarding import, sale, and use. Researchers should check the specific regulations in their country before ordering. ORYN ships to multiple EU countries in compliance with applicable regulations.",
      },
      {
        question: "Do I need a licence to buy research peptides?",
        answer:
          "In the UK, no specific licence is required to purchase research peptides for personal research use. However, institutional buyers (universities, laboratories) may have their own procurement policies. ORYN sells to both individual researchers and institutions, with all sales classified as being for research purposes only.",
      },
      {
        question: "Can research peptides be imported into the UK?",
        answer:
          "Research peptides can generally be imported into the UK for research purposes. Customs may inspect shipments, and proper documentation (including product descriptions and intended use) helps facilitate clearance. ORYN ships from within the EU/UK supply chain to minimise customs complications and ensure temperature-controlled delivery.",
      },
      {
        question: "Are peptides classified as controlled substances?",
        answer:
          "The vast majority of research peptides, including BPC-157, TB-500, CJC-1295, Ipamorelin, GHK-Cu, Glutathione, and NAD+, are not controlled substances in the UK or EU. Certain peptide hormones may be regulated differently (e.g., growth hormone itself is a prescription medicine). Researchers should verify the classification of specific peptides in their jurisdiction.",
      },
      {
        question: "What is the legal status of Tirzepatide?",
        answer:
          "Tirzepatide is approved as a prescription medicine under certain brand names in the UK and EU for specific medical indications. As a research chemical supplied outside of branded pharmaceutical contexts, it can be obtained for research purposes through appropriate channels. ORYN's Tirzepatide products are supplied exclusively for research and laboratory use.",
      },
      {
        question: "Are there regulations on selling peptides?",
        answer:
          "In the UK, sellers of research peptides must comply with general trading standards, product safety regulations, and consumer protection law. Peptides cannot be marketed or sold as medicines, food supplements, or for human therapeutic use without appropriate regulatory approval. ORYN complies with all applicable UK and EU trading regulations.",
      },
      {
        question: "Can peptides be used in sports?",
        answer:
          "Many peptides are prohibited by the World Anti-Doping Agency (WADA) in competitive sports. This includes growth hormone secretagogues and other performance-related compounds. ORYN products are sold for research purposes only and are not intended for use by competitive athletes subject to anti-doping regulations.",
      },
      {
        question: "What regulations apply to peptide quality?",
        answer:
          "While research peptides are not subject to the same regulatory framework as licensed medicines, reputable suppliers adhere to GMP manufacturing standards, provide Certificates of Analysis, and ensure consistent purity. ORYN voluntarily maintains pharmaceutical-grade standards (GMP certification, ISO 7 cleanroom, >99% purity) to ensure research-grade quality.",
      },
      {
        question: "Where can I find up-to-date regulatory information?",
        answer:
          "For UK regulations, the Medicines and Healthcare products Regulatory Agency (MHRA) and Home Office provide guidance on medicine classification and controlled substances. For EU regulations, the European Medicines Agency (EMA) is the primary reference. National regulatory bodies in each EU member state may also provide country-specific guidance. Regulations can change, so always check current sources.",
      },
    ],
  },

  // ── First-Time Buyers Guide ────────────────────────────────────
  {
    slug: "first-time-buyers-faq",
    title: "First-Time Buyers: Frequently Asked Questions",
    metaTitle: "First-Time Buyers FAQ | Getting Started with Peptides | ORYN Peptides",
    metaDescription:
      "New to research peptides? This first-time buyer FAQ covers how to choose peptides, what to expect, how to get started, and tips for your first ORYN order.",
    type: "topic",
    introduction:
      "Starting peptide research can feel overwhelming with the range of compounds, delivery systems, and protocols available. ORYN's pen system is designed to make entry into peptide research as straightforward as possible. This FAQ is tailored for first-time buyers looking to understand the basics before making their first purchase.",
    faqs: [
      {
        question: "I'm new to peptide research — where do I start?",
        answer:
          "Start by identifying your research interest: tissue repair (BPC-157, TB-500), growth hormone research (CJC-1295, Ipamorelin), metabolic research (Tirzepatide), skin and aging (GHK-Cu), antioxidant defence (Glutathione), or cellular energy (NAD+). Read published research on your compound of interest, then select the appropriate ORYN pen. Each pen is self-contained and ready to use.",
      },
      {
        question: "Which peptide should I buy first?",
        answer:
          "The best starting peptide depends on your research goals. BPC-157 is the most popular first purchase due to its extensive published research, broad applications, and well-documented safety profile. For GH research, Ipamorelin is a common starting point due to its selectivity. For metabolic research, the Tirzepatide pen system is a natural entry point.",
      },
      {
        question: "Do I need any equipment besides the pen?",
        answer:
          "ORYN peptide pens are pre-mixed and ready to use — no reconstitution equipment is needed. You will need pen needles (standard pen needles for subcutaneous injection), alcohol swabs for injection site preparation, and a sharps container for needle disposal. The NovaDose system includes micro-needles.",
      },
      {
        question: "How do I use a peptide pen for the first time?",
        answer:
          "Remove the pen from the refrigerator 1-2 minutes before use. Attach a new sterile needle. If required, prime the pen by dialling a small dose and pressing until a drop appears at the needle tip (removing air). Clean the injection site with an alcohol swab. Insert the needle at a 45-90 degree angle into subcutaneous tissue and press the injection button. Hold for 5-10 seconds, then withdraw.",
      },
      {
        question: "Is it safe to inject peptides at home?",
        answer:
          "Subcutaneous injection is a well-established administration method used by millions of people worldwide (e.g., for insulin). With proper aseptic technique (clean hands, sterile needles, alcohol-swabbed injection sites, needle disposal in sharps containers), subcutaneous injection can be performed safely. However, ORYN products are sold for research purposes only and this does not constitute medical advice.",
      },
      {
        question: "What should I expect after my first order?",
        answer:
          "After placing your order, you will receive an order confirmation and tracking information via email. Products are shipped in temperature-controlled packaging. Upon arrival, immediately place the pens in the refrigerator (2-8°C). Check the packaging integrity and product appearance before use. Your order includes all the information needed to get started.",
      },
      {
        question: "How much does it cost to get started?",
        answer:
          "ORYN peptide pens range from \u20ac169 (Glutathione) to \u20ac399 (NovaDose NAD+). Most peptide pens are in the \u20ac179-\u20ac249 range. Each pen lasts 30 days, making the daily research cost very affordable. Orders over \u20ac150 qualify for free shipping. Starting with a single pen is a practical way to begin.",
      },
      {
        question: "Can I buy multiple different peptides?",
        answer:
          "Yes. Many researchers purchase multiple ORYN peptides for different research objectives or for combination protocols. Each peptide is sold individually, giving you full flexibility. Popular first combinations include BPC-157 + TB-500 (recovery research) and CJC-1295 + Ipamorelin (GH research).",
      },
      {
        question: "What if the peptide doesn't work for my research?",
        answer:
          "Research outcomes depend on many variables including protocol design, dosing, timing, and the specific biological system under study. If results are not as expected, review your protocol against published literature, verify storage conditions, and consider adjusting variables. ORYN provides Certificates of Analysis to verify product quality. Contact info@orynpeptides.com with any product quality concerns.",
      },
      {
        question: "Does ORYN provide research guidance or dosing advice?",
        answer:
          "ORYN provides product specifications, Certificates of Analysis, and general information based on published research. We do not provide individualised research guidance, dosing protocols, or medical advice. Researchers should design their protocols based on peer-reviewed literature, institutional guidelines, and relevant regulatory frameworks.",
      },
    ],
  },
];

// ─── Combined Export ───────────────────────────────────────────────

export const FAQ_HUBS: FAQHub[] = [...productFAQHubs, ...topicFAQHubs];

export const FAQ_HUB_SLUGS: string[] = FAQ_HUBS.map((hub) => hub.slug);

export function getFAQHubBySlug(slug: string): FAQHub | undefined {
  return FAQ_HUBS.find((hub) => hub.slug === slug);
}
