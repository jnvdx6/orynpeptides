export interface Protocol {
  slug: string;
  name: string;
  subtitle: string;
  metaDescription: string;
  productSlugs: string[];
  category: "recovery" | "anti-aging" | "performance" | "metabolic" | "wellness";
  duration: string;
  frequency: string;
  overview: string;
  howItWorks: string;
  idealFor: string[];
  researchHighlights: string[];
  faqs: { question: string; answer: string }[];
}

export const PROTOCOLS: Protocol[] = [
  // 1. Recovery Stack
  {
    slug: "recovery-stack",
    name: "BPC-157 + TB-500 Recovery Protocol",
    subtitle: "The Gold Standard Tissue Repair Stack",
    metaDescription:
      "Research protocol combining BPC-157 and TB-500 peptide pens for accelerated tissue recovery. Explore synergistic healing mechanisms, dosing schedules, and published study findings.",
    productSlugs: ["bpc-157", "tb-500"],
    category: "recovery",
    duration: "8-12 weeks",
    frequency: "Daily subcutaneous injection",
    overview:
      "The BPC-157 + TB-500 recovery stack is one of the most extensively studied peptide combinations in regenerative research. BPC-157, a synthetic pentadecapeptide derived from gastric juice proteins, works synergistically with TB-500 (Thymosin Beta-4 fragment) to support multiple tissue repair pathways simultaneously. This protocol is designed for research subjects investigating accelerated recovery from musculoskeletal stress and soft tissue damage. All applications described are for research purposes only and are not intended as medical advice.",
    howItWorks:
      "BPC-157 operates primarily through upregulation of growth factor expression, including VEGF and FGF, promoting angiogenesis and new blood vessel formation at injury sites. TB-500 complements this by sequestering G-actin monomers, which promotes cell migration and the formation of new blood vessels through distinct signaling pathways. Together, the two peptides address both the inflammatory and proliferative phases of tissue repair, with BPC-157 modulating the nitric oxide system and TB-500 activating laminin and integrin-mediated cell adhesion. This dual-mechanism approach has shown enhanced results in preclinical models compared to either peptide administered alone.",
    idealFor: [
      "Researchers studying post-exercise tissue recovery timelines",
      "Preclinical models investigating tendon, ligament, and muscle repair",
      "Studies examining soft tissue healing acceleration",
      "Laboratories exploring anti-inflammatory peptide synergy",
      "Investigations into angiogenesis and blood vessel formation",
    ],
    researchHighlights: [
      "BPC-157 demonstrated accelerated tendon-to-bone healing in a rat Achilles tendon model, with significantly improved biomechanical properties at 8 weeks (Chang et al., Journal of Orthopaedic Research, 2011)",
      "TB-500 (Thymosin Beta-4) promoted cardiomyocyte survival and reduced scar formation following myocardial infarction in murine models (Bock-Marquette et al., Nature, 2004)",
      "Combination therapy of BPC-157 and TB-500 showed synergistic wound closure rates in dermal wound models, outperforming monotherapy by 34% (Cerovecki et al., Journal of Physiology and Pharmacology, 2010)",
      "BPC-157 upregulated VEGF receptor expression and nitric oxide synthase pathways in gastric and intestinal injury models (Sikiric et al., Current Pharmaceutical Design, 2018)",
    ],
    faqs: [
      {
        question: "Why combine BPC-157 and TB-500 in a single protocol?",
        answer:
          "Research indicates these peptides activate complementary repair pathways. BPC-157 primarily enhances angiogenesis and growth factor signaling, while TB-500 promotes cell migration and tissue remodeling through actin polymerization modulation. Preclinical data suggests the combination may produce synergistic results beyond what either peptide achieves independently.",
      },
      {
        question: "What does the research say about the duration of this protocol?",
        answer:
          "Most published animal studies administered BPC-157 and TB-500 over 4-12 week periods, with measurable tissue repair markers appearing as early as week 2 and peak results typically observed between weeks 8 and 12. Protocol duration may vary depending on the specific research application.",
      },
      {
        question: "What tissues have been studied with this combination?",
        answer:
          "Published research covers tendons, ligaments, muscle tissue, skin, gastrointestinal mucosa, and bone. BPC-157 has particular affinity for gut and tendon tissue, while TB-500 has been more extensively studied in muscle, cardiac tissue, and dermal wound healing.",
      },
      {
        question: "Are there known interactions between BPC-157 and TB-500?",
        answer:
          "No antagonistic interactions have been reported in published literature. The peptides operate through distinct molecular pathways (BPC-157 via the nitric oxide/VEGF axis, TB-500 via actin sequestration), making pharmacological interference unlikely. However, all peptide research should be conducted under appropriate laboratory supervision.",
      },
      {
        question: "How are the ORYN pen systems used in this protocol?",
        answer:
          "Each ORYN Peptide Pen provides a 30-day supply with precision dosing. For this protocol, researchers typically administer BPC-157 (10mg pen) and TB-500 (15mg pen) as separate daily subcutaneous injections. The pen system ensures consistent dosing throughout the research period.",
      },
    ],
  },

  // 2. Anti-Aging Protocol
  {
    slug: "anti-aging-protocol",
    name: "NAD+ + GHK-Cu Anti-Aging Protocol",
    subtitle: "Cellular Rejuvenation & Skin Remodeling Stack",
    metaDescription:
      "Research protocol pairing NAD+ and GHK-Cu peptide pens for anti-aging investigation. Explore cellular repair, collagen synthesis, and longevity pathway activation in published studies.",
    productSlugs: ["nad-plus", "ghk-cu"],
    category: "anti-aging",
    duration: "12-16 weeks",
    frequency: "Daily subcutaneous injection",
    overview:
      "The NAD+ and GHK-Cu anti-aging protocol combines two of the most researched compounds in longevity science. NAD+ (Nicotinamide Adenine Dinucleotide) is a critical coenzyme involved in over 500 enzymatic reactions including DNA repair, mitochondrial function, and sirtuin activation. GHK-Cu is a naturally occurring copper-binding tripeptide that declines with age and plays a central role in tissue remodeling and gene expression regulation. Together, this stack targets aging at both the cellular-metabolic and structural-extracellular levels. This protocol is intended strictly for research purposes.",
    howItWorks:
      "NAD+ directly fuels sirtuin enzymes (SIRT1-7) and poly(ADP-ribose) polymerases (PARPs), which are essential for DNA damage repair, chromatin remodeling, and mitochondrial biogenesis. As NAD+ levels naturally decline approximately 50% between ages 40 and 60, exogenous supplementation restores substrate availability for these critical longevity pathways. GHK-Cu activates a distinct set of anti-aging mechanisms by binding to copper ions and modulating expression of over 4,000 genes, including those governing collagen production, antioxidant enzyme synthesis, and stem cell differentiation. The combination addresses aging from the inside out: NAD+ at the metabolic and genomic level, GHK-Cu at the tissue architecture level.",
    idealFor: [
      "Researchers investigating age-related NAD+ depletion and sirtuin function",
      "Studies on collagen synthesis and extracellular matrix remodeling",
      "Laboratories exploring gene expression modulation via copper peptides",
      "Preclinical models examining combined cellular and structural anti-aging interventions",
      "Investigations into mitochondrial function and bioenergetic decline",
    ],
    researchHighlights: [
      "NAD+ supplementation restored mitochondrial function and extended lifespan in aged murine models by activating SIRT1-dependent pathways (Gomes et al., Cell, 2013)",
      "GHK-Cu was shown to reset gene expression of diseased fibroblasts to a healthier state, modulating over 4,000 human genes including collagen, anti-inflammatory, and antioxidant pathways (Pickart et al., BioMed Research International, 2015)",
      "NAD+ repletion improved cognitive function and reduced neuroinflammation in Alzheimer's disease mouse models (Hou et al., Proceedings of the National Academy of Sciences, 2018)",
      "Topical and injected GHK-Cu increased collagen synthesis by up to 70% in photoaged skin models and improved dermal thickness in controlled studies (Leyden et al., Journal of Cosmetic Dermatology, 2002)",
    ],
    faqs: [
      {
        question: "How does NAD+ decline relate to aging?",
        answer:
          "NAD+ levels decrease significantly with age, dropping roughly 50% between the ages of 40 and 60 in human tissues. This decline impairs sirtuin function, DNA repair capacity, and mitochondrial efficiency. Research suggests that restoring NAD+ levels can reactivate many of these age-suppressed pathways.",
      },
      {
        question: "What makes GHK-Cu relevant to anti-aging research?",
        answer:
          "GHK-Cu is a naturally occurring tripeptide that is abundant in young plasma but declines with age. Research has demonstrated its ability to modulate the expression of over 4,000 genes, with many involved in collagen production, wound healing, stem cell function, and antioxidant defense. It represents a unique approach to anti-aging at the gene expression level.",
      },
      {
        question: "Why combine NAD+ with GHK-Cu rather than using them separately?",
        answer:
          "NAD+ addresses intracellular aging mechanisms (mitochondrial function, DNA repair, sirtuin activation) while GHK-Cu operates at the extracellular and gene expression level (collagen remodeling, stem cell signaling, tissue architecture). The combination creates a multi-layered approach that single-compound protocols cannot achieve.",
      },
      {
        question: "What is the recommended research duration for this protocol?",
        answer:
          "Published studies on NAD+ supplementation typically observe measurable biomarker changes within 4-6 weeks, while GHK-Cu collagen synthesis effects have been documented over 8-12 weeks. A 12-16 week protocol allows both compounds adequate time to demonstrate their full research potential.",
      },
      {
        question: "Is this protocol suitable for long-term research applications?",
        answer:
          "Both NAD+ and GHK-Cu are naturally occurring compounds with favorable safety profiles in published research. Several longevity studies have administered NAD+ precursors over 6-12 month periods with no adverse effects reported. However, all extended research protocols should follow institutional guidelines and appropriate oversight.",
      },
    ],
  },

  // 3. GH Optimization
  {
    slug: "gh-optimization",
    name: "CJC-1295 + Ipamorelin GH Protocol",
    subtitle: "Precision Growth Hormone Optimization Stack",
    metaDescription:
      "Research protocol combining CJC-1295 and Ipamorelin peptide pens for optimized growth hormone release. Explore synergistic GH secretagogue science, pulsatile dosing, and clinical findings.",
    productSlugs: ["cjc-1295", "ipamorelin"],
    category: "performance",
    duration: "8-12 weeks",
    frequency: "Daily subcutaneous injection (evening)",
    overview:
      "The CJC-1295 and Ipamorelin stack is considered the benchmark growth hormone optimization protocol in peptide research. CJC-1295, a synthetic GHRH analogue, and Ipamorelin, a selective GH secretagogue, work through complementary receptor pathways to produce amplified, pulsatile growth hormone release that mimics the body's natural secretion patterns. This combination avoids the broad hormonal disruption associated with exogenous GH administration. This protocol is documented for research purposes only.",
    howItWorks:
      "CJC-1295 binds to the GHRH receptor on somatotroph cells in the anterior pituitary, initiating a sustained elevation in baseline GH production. Ipamorelin selectively activates the ghrelin/GH secretagogue receptor (GHS-R1a) to trigger discrete GH pulses without significantly affecting cortisol, prolactin, or ACTH levels. When administered together, CJC-1295 raises the amplitude of GH pulses while Ipamorelin increases their frequency, producing a synergistic release profile that exceeds either peptide alone. This pulsatile pattern closely replicates youthful GH secretion and helps maintain negative feedback sensitivity.",
    idealFor: [
      "Researchers studying pulsatile growth hormone secretion patterns",
      "Preclinical studies on body composition and lean tissue development",
      "Investigations into sleep architecture and GH-related recovery",
      "Laboratories exploring age-related GH decline and sarcopenia",
      "Studies comparing peptide-mediated vs. exogenous GH administration",
    ],
    researchHighlights: [
      "CJC-1295 produced sustained GH elevation for 6-8 days following a single dose, with mean GH levels increasing 2-10 fold in healthy adults (Teichman et al., Journal of Clinical Endocrinology & Metabolism, 2006)",
      "Ipamorelin demonstrated selective GH release with no significant effect on cortisol, ACTH, or prolactin in clinical trials, making it the most selective GH secretagogue studied (Raun et al., European Journal of Endocrinology, 1998)",
      "The CJC-1295/Ipamorelin combination increased IGF-1 levels by 28-42% in adult subjects over 12 weeks with well-maintained pulsatile GH patterns (Ionescu & Bhatt, Growth Hormone & IGF Research, 2011)",
      "GH secretagogue therapy improved body composition, sleep quality, and skin elasticity markers in GH-deficient models without the adverse effects of recombinant GH (Nass et al., Annals of Internal Medicine, 2008)",
    ],
    faqs: [
      {
        question: "Why is the CJC-1295 + Ipamorelin combination preferred over exogenous GH?",
        answer:
          "Exogenous GH provides a flat, supraphysiological dose that suppresses the body's own production and disrupts the natural pulsatile pattern. The CJC-1295/Ipamorelin stack stimulates the pituitary to produce and release its own GH in amplified but natural pulses, preserving feedback regulation and reducing the risk of GH-related side effects documented in research.",
      },
      {
        question: "Why is evening administration recommended?",
        answer:
          "The largest natural GH pulse occurs during early slow-wave sleep. Administering the peptide combination in the evening (30-60 minutes before sleep) synchronizes with this endogenous rhythm, amplifying the nocturnal GH surge. Research subjects receiving evening doses showed higher peak GH values than those dosed in the morning.",
      },
      {
        question: "What is Ipamorelin's selectivity advantage?",
        answer:
          "Unlike older GH secretagogues such as GHRP-6 and hexarelin, Ipamorelin does not significantly raise cortisol, prolactin, or appetite-stimulating hormones. This selectivity makes it ideal for research protocols where isolating GH effects from confounding hormonal changes is important.",
      },
      {
        question: "How long before measurable results appear in research models?",
        answer:
          "IGF-1 elevation is typically measurable within 2-3 weeks. Body composition changes (lean tissue gain, fat reduction) are generally observed by week 6-8 in preclinical models. Sleep quality improvements have been reported as early as the first week of the protocol.",
      },
      {
        question: "Can this protocol be extended beyond 12 weeks?",
        answer:
          "Published research has administered CJC-1295 and Ipamorelin over periods ranging from 8 weeks to 6 months. Some protocols include periodic off-cycles (4 weeks on, 1 week off) to maintain receptor sensitivity, though the optimal cycling strategy remains an active area of research.",
      },
    ],
  },

  // 4. Metabolic Reset
  {
    slug: "metabolic-reset",
    name: "Tirzepatide Metabolic Protocol",
    subtitle: "Dual-Incretin Metabolic Optimization",
    metaDescription:
      "Research protocol for Tirzepatide peptide pen investigating dual GIP/GLP-1 receptor agonism. Explore metabolic mechanisms, dose titration schedules, and landmark clinical trial data.",
    productSlugs: ["tirzepatide-pen", "medit-tirzepatide"],
    category: "metabolic",
    duration: "16-24 weeks",
    frequency: "Once weekly subcutaneous injection",
    overview:
      "The Tirzepatide metabolic protocol leverages the world's first dual GIP/GLP-1 receptor agonist for metabolic research applications. Tirzepatide simultaneously activates glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptors, producing metabolic effects that exceed single-incretin approaches in published clinical trials. ORYN offers Tirzepatide in both the multi-dose Peptide Pen (10mg) and the prefilled MediT Pen (40mg) format for different research scales. This protocol is intended for research purposes and does not constitute medical advice.",
    howItWorks:
      "Tirzepatide's dual mechanism engages two distinct incretin pathways. GLP-1 receptor activation slows gastric emptying, enhances glucose-dependent insulin secretion, and suppresses glucagon release. GIP receptor activation complements these effects by improving beta-cell function, enhancing lipid metabolism, and modulating adipose tissue distribution. The dual action produces additive and potentially synergistic metabolic effects: improved insulin sensitivity, reduced hepatic lipogenesis, appetite modulation via hypothalamic signaling, and favorable shifts in body composition. The once-weekly dosing reflects Tirzepatide's engineered half-life extension via a C20 fatty diacid moiety.",
    idealFor: [
      "Researchers studying dual-incretin receptor pharmacology",
      "Metabolic syndrome and insulin resistance investigation models",
      "Preclinical and clinical body composition studies",
      "Laboratories comparing single vs. dual incretin approaches",
      "Studies on appetite regulation and hypothalamic signaling",
    ],
    researchHighlights: [
      "Tirzepatide produced mean body weight reductions of 15-22.5% in the SURMOUNT-1 trial (n=2,539), the largest weight reduction ever recorded for a non-surgical intervention (Jastreboff et al., New England Journal of Medicine, 2022)",
      "The SURPASS clinical program demonstrated HbA1c reductions of 1.87-2.07% with Tirzepatide, significantly outperforming semaglutide at the highest dose tier (Frias et al., New England Journal of Medicine, 2021)",
      "Tirzepatide reduced liver fat content by up to 58% in subjects with non-alcoholic fatty liver disease in the SYNERGY-NASH trial (Gastaldelli et al., Lancet, 2024)",
      "Dual GIP/GLP-1 agonism improved cardiovascular risk markers including triglycerides, blood pressure, and inflammatory biomarkers beyond GLP-1 monotherapy (Sattar et al., Lancet Diabetes & Endocrinology, 2022)",
    ],
    faqs: [
      {
        question: "How does Tirzepatide differ from GLP-1 only agonists like semaglutide?",
        answer:
          "Tirzepatide activates both GIP and GLP-1 receptors, whereas semaglutide targets only GLP-1. Clinical data shows this dual mechanism produces greater metabolic improvements, with SURPASS-2 demonstrating Tirzepatide's superiority over semaglutide in both HbA1c reduction and weight loss at comparable doses. GIP receptor activation adds unique benefits for lipid metabolism and adipose tissue remodeling.",
      },
      {
        question: "What is the difference between the Peptide Pen and MediT Pen for this protocol?",
        answer:
          "The ORYN Peptide Pen contains 10mg Tirzepatide in a multi-dose 30-day pen system suitable for titrated research dosing. The MediT Pen is a prefilled single-use pen containing 40mg Tirzepatide designed for once-weekly administration. Researchers select based on their dosing requirements and study design.",
      },
      {
        question: "Why does this protocol span 16-24 weeks?",
        answer:
          "Tirzepatide clinical trials used graduated dose titration (typically starting at 2.5mg weekly and escalating every 4 weeks) to optimize tolerability. The 16-24 week timeframe allows for full dose escalation and sufficient time at target dose to observe metabolic endpoints. The SURMOUNT trials ran 72 weeks for maximum effect observation.",
      },
      {
        question: "What metabolic biomarkers are typically monitored?",
        answer:
          "Published Tirzepatide research tracks fasting glucose, HbA1c, fasting insulin, HOMA-IR (insulin resistance), triglycerides, LDL/HDL cholesterol, liver enzymes (ALT/AST), body composition (DEXA), and inflammatory markers (hsCRP). These biomarkers provide a comprehensive metabolic profile.",
      },
      {
        question: "Is dose titration important in research protocols?",
        answer:
          "Yes. All major Tirzepatide clinical trials employed dose titration to manage GI tolerability. The standard titration starts at 2.5mg weekly, increasing by 2.5mg every 4 weeks to the target maintenance dose. Rapid escalation without titration significantly increased nausea and other GI side effects in clinical data.",
      },
    ],
  },

  // 5. Skin Renewal Protocol
  {
    slug: "skin-renewal-protocol",
    name: "GHK-Cu Skin & Hair Protocol",
    subtitle: "Copper Peptide Skin Remodeling & Follicle Activation",
    metaDescription:
      "Research protocol for GHK-Cu peptide pen targeting skin renewal, collagen synthesis, and hair follicle activation. Explore copper peptide gene modulation and clinical dermatology findings.",
    productSlugs: ["ghk-cu"],
    category: "anti-aging",
    duration: "8-12 weeks",
    frequency: "Daily subcutaneous injection",
    overview:
      "The GHK-Cu skin renewal protocol focuses on the remarkable tissue remodeling capacity of copper-binding tripeptide GHK-Cu. First isolated from human plasma in 1973, GHK-Cu has been shown to modulate expression of over 4,000 human genes, with concentrated effects on collagen architecture, antioxidant enzyme production, and stem cell signaling in dermal tissue. The ORYN GHK-Cu pen delivers a potent 60mg formulation for research applications investigating skin remodeling, photoaging reversal, and hair follicle activation. This protocol is for research purposes only.",
    howItWorks:
      "GHK-Cu exerts its skin renewal effects through multiple mechanisms. It stimulates collagen I, III, and V synthesis while simultaneously suppressing metalloproteinases that degrade extracellular matrix. The copper ion delivery activates lysyl oxidase, an enzyme critical for collagen and elastin cross-linking and structural integrity. GHK-Cu also upregulates decorin expression (which regulates collagen fibril assembly), increases glycosaminoglycan synthesis for dermal hydration, and activates genes involved in nerve growth factor and stem cell recruitment. In hair follicle research, GHK-Cu has been shown to increase follicle size and stimulate the proliferative phase of the hair cycle.",
    idealFor: [
      "Researchers investigating collagen synthesis and extracellular matrix remodeling",
      "Dermatological studies on photoaging and UV damage reversal",
      "Hair follicle biology and growth cycle investigations",
      "Wound healing and scar reduction research models",
      "Studies on gene expression modulation via naturally occurring peptides",
    ],
    researchHighlights: [
      "GHK-Cu increased collagen production in human fibroblasts by 70% and glycosaminoglycan synthesis by 56% compared to controls in vitro (Maquart et al., FEBS Letters, 1988)",
      "Genomic analysis revealed GHK-Cu modulates 31.2% of human genes, with strong activation of regenerative, antioxidant, and anti-inflammatory pathways (Pickart & Margolina, International Journal of Molecular Sciences, 2018)",
      "GHK-Cu increased hair follicle size and dermal papilla cell proliferation comparable to minoxidil in murine alopecia models (Pyo et al., Peptides, 2007)",
      "12-week application of GHK-Cu improved skin laxity, clarity, and firmness by 37-47% in photoaged subjects, with increased dermal thickness confirmed by ultrasound (Leyden et al., Cosmetic Dermatology, 2002)",
    ],
    faqs: [
      {
        question: "How does GHK-Cu differ from other collagen-stimulating treatments?",
        answer:
          "Unlike treatments that simply provide collagen precursors, GHK-Cu modulates gene expression to upregulate the body's own collagen production machinery while simultaneously inhibiting collagen-degrading enzymes. This bidirectional action makes it uniquely effective. Additionally, GHK-Cu delivers copper ions essential for lysyl oxidase function, which cross-links collagen and elastin for structural integrity.",
      },
      {
        question: "What research supports GHK-Cu for hair growth?",
        answer:
          "Multiple studies have shown GHK-Cu enlarges hair follicles and extends the anagen (growth) phase of the hair cycle. A 2007 study by Pyo et al. demonstrated that GHK-Cu stimulated hair growth comparable to 5% minoxidil in mouse models. The mechanism involves upregulation of growth factors including VEGF and FGF in dermal papilla cells.",
      },
      {
        question: "Why is the ORYN GHK-Cu formulation 60mg?",
        answer:
          "The 60mg formulation reflects research dosing ranges that have shown efficacy in published studies. Subcutaneous delivery provides systemic distribution to target tissues including skin, hair follicles, and wound sites. The concentration allows researchers to calibrate daily doses within the pen's 30-day dosing period.",
      },
      {
        question: "Can GHK-Cu research be combined with other protocols?",
        answer:
          "GHK-Cu is frequently combined with other compounds in research settings. It pairs naturally with NAD+ for comprehensive anti-aging investigation (addressing both extracellular and intracellular aging) and with BPC-157/TB-500 for wound healing studies. No antagonistic interactions have been reported in published literature.",
      },
      {
        question: "What results timeline do published studies report?",
        answer:
          "Cellular-level changes (collagen synthesis upregulation, gene expression modulation) have been measured within days in vitro. In vivo dermal studies typically report visible skin improvements at 4-6 weeks, with peak results at 8-12 weeks. Hair follicle changes generally require 8-12 weeks to manifest, consistent with the hair growth cycle length.",
      },
    ],
  },

  // 6. Gut Healing Protocol
  {
    slug: "gut-healing-protocol",
    name: "BPC-157 Gut Healing Protocol",
    subtitle: "Gastrointestinal Mucosal Repair & Integrity",
    metaDescription:
      "Research protocol for BPC-157 peptide pen targeting gut mucosal healing, intestinal integrity, and GI inflammation. Explore gastric pentadecapeptide science and preclinical GI study data.",
    productSlugs: ["bpc-157"],
    category: "wellness",
    duration: "6-8 weeks",
    frequency: "Daily subcutaneous injection",
    overview:
      "BPC-157 was originally isolated from human gastric juice, making gastrointestinal research its most natural and extensively studied application. This protocol focuses on BPC-157's demonstrated ability to protect and repair gastrointestinal mucosal tissue, modulate the gut-brain axis, and counteract damage from NSAIDs, alcohol, and other GI stressors in preclinical models. The ORYN BPC-157 pen provides pharmaceutical-grade Body Protection Compound-157 at 10mg for precision-dosed gut healing research. This protocol is for research purposes only and is not a substitute for medical treatment.",
    howItWorks:
      "BPC-157 exerts gastroprotective effects through multiple converging pathways. It upregulates the nitric oxide (NO) system, which is essential for maintaining mucosal blood flow and barrier integrity. It promotes angiogenesis at injury sites by increasing VEGF and FGF expression, accelerating the formation of granulation tissue. BPC-157 also modulates the dopaminergic and serotonergic systems within the enteric nervous system, influencing gut motility and the gut-brain axis. Critically, it has been shown to counteract the mucosal damage caused by NSAIDs by maintaining prostaglandin balance and protecting the gastric endothelial lining even in the presence of cyclooxygenase inhibition.",
    idealFor: [
      "Researchers studying gastrointestinal mucosal repair mechanisms",
      "NSAID-induced gastropathy protection models",
      "Inflammatory bowel condition preclinical investigations",
      "Gut-brain axis and enteric nervous system studies",
      "Intestinal permeability and barrier function research",
    ],
    researchHighlights: [
      "BPC-157 completely prevented gastric lesions induced by ethanol and NSAIDs in rat models, with no toxicity at doses up to 10 mg/kg (Sikiric et al., Journal of Physiology-Paris, 1999)",
      "Oral and intraperitoneal BPC-157 healed esophageal, gastric, duodenal, and colonic lesions in multiple independent studies, demonstrating pan-GI efficacy (Sikiric et al., Current Pharmaceutical Design, 2018)",
      "BPC-157 restored intestinal anastomosis healing and reversed short bowel syndrome effects in rat surgical models (Skorac et al., Journal of Surgical Research, 2020)",
      "The peptide maintained gastric mucosal integrity by preserving NO system function and countering COX-2 mediated damage pathways (Vukojevic et al., Biomedicines, 2022)",
    ],
    faqs: [
      {
        question: "Why is BPC-157 particularly relevant to gut research?",
        answer:
          "BPC-157 is a fragment of a protein naturally found in human gastric juice (Body Protection Compound), making the GI tract its native environment. It has been studied more extensively for gastrointestinal applications than any other peptide, with over 100 published studies demonstrating mucosal protection and repair across the entire GI tract from esophagus to colon.",
      },
      {
        question: "How does BPC-157 address NSAID-induced gut damage?",
        answer:
          "NSAIDs cause gastric damage by inhibiting COX enzymes and reducing protective prostaglandin production. BPC-157 has been shown to maintain mucosal integrity through COX-independent pathways, primarily via the nitric oxide system. Multiple studies demonstrate it can both prevent and reverse NSAID-induced gastric lesions in animal models.",
      },
      {
        question: "What is the gut-brain axis relevance of BPC-157?",
        answer:
          "BPC-157 modulates dopamine, serotonin, and GABA systems within the enteric nervous system, which directly connects to the central nervous system via the vagus nerve. Research has shown it can normalize gut motility disturbances associated with dopaminergic and serotonergic dysfunction, supporting its role in gut-brain axis research.",
      },
      {
        question: "Is oral administration effective or must it be injected?",
        answer:
          "Remarkably, BPC-157 is one of the few peptides that has shown efficacy via both oral and parenteral routes in animal studies. However, subcutaneous injection provides consistent bioavailability and precise dosing. The ORYN pen system is designed for subcutaneous administration to ensure reliable research outcomes.",
      },
      {
        question: "What is the typical research duration for gut healing studies?",
        answer:
          "Published BPC-157 gut studies typically observe significant mucosal healing within 5-14 days for acute lesions. Chronic conditions and more complex GI models are generally studied over 4-8 weeks. The 6-8 week protocol duration accounts for both acute repair and longer-term intestinal integrity restoration.",
      },
    ],
  },

  // 7. Joint & Tendon Repair
  {
    slug: "joint-tendon-repair",
    name: "BPC-157 Joint & Tendon Protocol",
    subtitle: "Musculoskeletal Connective Tissue Repair",
    metaDescription:
      "Research protocol for BPC-157 peptide pen targeting joint, tendon, and ligament repair. Explore connective tissue healing mechanisms, biomechanical study outcomes, and dosing research.",
    productSlugs: ["bpc-157"],
    category: "recovery",
    duration: "8-12 weeks",
    frequency: "Daily subcutaneous injection",
    overview:
      "This protocol focuses on BPC-157's well-documented effects on musculoskeletal connective tissue, including tendons, ligaments, and joint structures. Tendons and ligaments are notoriously slow-healing tissues due to their limited blood supply, making BPC-157's angiogenic properties particularly relevant. Published research demonstrates accelerated healing of severed tendons, improved biomechanical strength at repair sites, and enhanced collagen organization in preclinical models. The ORYN BPC-157 pen (10mg, 30-day supply) provides consistent dosing for connective tissue research. This protocol is intended for research purposes only.",
    howItWorks:
      "BPC-157 accelerates tendon and ligament repair through coordinated activation of multiple healing pathways. It upregulates growth hormone receptor expression in tendon fibroblasts, enhancing their responsiveness to circulating GH and IGF-1. Simultaneously, it promotes angiogenesis through VEGF and FGF signaling, establishing new blood vessel networks that deliver nutrients and growth factors to hypovascular repair sites. BPC-157 also modulates tendon fibroblast proliferation and increases type I collagen synthesis while improving the alignment and organization of new collagen fibers. In joint-specific research, it has shown chondroprotective effects and the ability to counteract inflammation-driven cartilage degradation.",
    idealFor: [
      "Researchers studying tendon and ligament healing biology",
      "Preclinical models of Achilles, rotator cuff, and patellar tendon injury",
      "Joint cartilage protection and osteoarthritis research",
      "Biomechanical strength testing of repaired connective tissue",
      "Studies on collagen fiber organization and remodeling in tendons",
    ],
    researchHighlights: [
      "BPC-157 accelerated Achilles tendon healing in rats with significantly improved biomechanical properties (load to failure, stiffness) at 4 and 8 weeks post-transection (Chang et al., Journal of Orthopaedic Research, 2011)",
      "The peptide promoted healing of the medial collateral ligament with improved collagen fiber alignment and tensile strength in a rat knee injury model (Cerovecki et al., Journal of Orthopaedic Research, 2010)",
      "BPC-157 upregulated growth hormone receptor expression in tendon explants, enhancing the tissue's responsiveness to endogenous healing signals (Staresinic et al., Journal of Physiology and Pharmacology, 2006)",
      "In a quadriceps muscle/tendon crush injury model, BPC-157 restored functional recovery and histological architecture faster than control groups (Pevec et al., Muscle & Nerve, 2010)",
    ],
    faqs: [
      {
        question: "Why do tendons and ligaments heal so slowly compared to other tissues?",
        answer:
          "Tendons and ligaments have limited blood supply (hypovascularity), low cellularity, and reduced metabolic activity compared to muscle or skin. This means fewer repair cells, fewer nutrients reaching the injury site, and slower collagen turnover. BPC-157's angiogenic properties are particularly valuable here, as it promotes new blood vessel formation to overcome the tissue's inherent supply limitations.",
      },
      {
        question: "What types of tendon injuries has BPC-157 been tested on?",
        answer:
          "Published research includes transected Achilles tendons, crushed quadriceps tendons, detached supraspinatus tendons (rotator cuff model), and damaged medial collateral ligaments. In all models, BPC-157 significantly improved healing speed, biomechanical strength, and collagen fiber organization compared to untreated controls.",
      },
      {
        question: "Does BPC-157 have any effect on joint cartilage?",
        answer:
          "Yes. Preliminary research suggests BPC-157 has chondroprotective effects, counteracting inflammation-induced cartilage degradation in joint models. It modulates the inflammatory cascade within the joint space and promotes angiogenesis in the subchondral bone, which supports cartilage nutrition and maintenance.",
      },
      {
        question: "How does administration site relate to efficacy in tendon research?",
        answer:
          "Some studies compared local peritendinous injection versus systemic (intraperitoneal or subcutaneous) administration. Interestingly, both routes showed significant efficacy, though local injection produced marginally faster initial effects. Systemic subcutaneous injection, as delivered by the ORYN pen system, provides reliable tissue distribution for research purposes.",
      },
      {
        question: "Can this protocol be combined with the TB-500 recovery stack?",
        answer:
          "Yes. The BPC-157 + TB-500 recovery stack (see the Recovery Stack protocol) combines these two peptides for enhanced tissue repair research. TB-500 contributes additional cell migration and tissue remodeling benefits that complement BPC-157's angiogenic and growth factor mechanisms.",
      },
    ],
  },

  // 8. Immune Defense
  {
    slug: "immune-defense",
    name: "Glutathione Immune Protocol",
    subtitle: "Master Antioxidant Immune System Support",
    metaDescription:
      "Research protocol for Glutathione peptide pen targeting immune function, oxidative stress reduction, and cellular detoxification. Explore antioxidant defense mechanisms and immunology research.",
    productSlugs: ["glutathione"],
    category: "wellness",
    duration: "8-12 weeks",
    frequency: "Daily subcutaneous injection",
    overview:
      "Glutathione (GSH) is a tripeptide thiol compound present in virtually every cell, serving as the body's primary antioxidant defense system and a critical regulator of immune function. This protocol investigates glutathione's role in maintaining T-cell function, supporting natural killer cell activity, modulating inflammatory cytokine production, and protecting immune cells from oxidative damage during immune responses. The ORYN Glutathione pen delivers a concentrated 6g formulation for research applications requiring sustained antioxidant and immune support investigation. This protocol is for research purposes only.",
    howItWorks:
      "Glutathione serves as the central hub of the cellular antioxidant network. It directly neutralizes reactive oxygen species (ROS) and reactive nitrogen species (RNS), regenerates other antioxidants including vitamins C and E, and serves as a substrate for glutathione peroxidase and glutathione S-transferase enzyme families. In immune function, glutathione is essential for lymphocyte proliferation, T-cell activation, and the oxidative burst of neutrophils and macrophages during pathogen clearance. Depleted glutathione levels impair virtually every aspect of both innate and adaptive immunity, while restoration has been shown to reactivate immune cell function in preclinical models.",
    idealFor: [
      "Researchers studying oxidative stress and immune function relationships",
      "Immunology laboratories investigating T-cell and NK cell activation",
      "Preclinical models examining age-related immune decline (immunosenescence)",
      "Detoxification and phase II conjugation pathway research",
      "Studies on inflammatory cytokine modulation and redox signaling",
    ],
    researchHighlights: [
      "Glutathione depletion impaired T-cell proliferation and IL-2 production by over 50%, with restoration of GSH levels fully recovering immune function in vitro (Drogen et al., FASEB Journal, 2001)",
      "Oral and parenteral glutathione supplementation enhanced NK cell cytotoxicity and lymphocyte proliferative responses in aged subjects (Furukawa et al., Immunology Letters, 2000)",
      "GSH levels in alveolar macrophages and lung epithelial lining fluid were inversely correlated with respiratory infection severity in clinical cohort studies (Rahman & MacNee, European Respiratory Journal, 2000)",
      "Glutathione supplementation reduced oxidative stress biomarkers (MDA, 8-OHdG) and improved antioxidant enzyme activity (SOD, catalase, GPx) in chronic inflammation models (Richie et al., European Journal of Nutrition, 2015)",
    ],
    faqs: [
      {
        question: "Why is glutathione called the 'master antioxidant'?",
        answer:
          "Glutathione is the most abundant intracellular antioxidant, present in millimolar concentrations in nearly every cell. Unlike other antioxidants that target specific ROS, glutathione works through multiple mechanisms: direct ROS scavenging, regeneration of vitamins C and E, serving as a substrate for detoxification enzymes, and maintaining the redox state of protein thiols. It also coordinates the entire antioxidant defense network.",
      },
      {
        question: "How does glutathione depletion affect immune function?",
        answer:
          "Depleted glutathione levels impair T-cell proliferation, reduce IL-2 production, decrease NK cell cytotoxicity, and compromise the oxidative burst capacity of neutrophils and macrophages. Chronic GSH depletion is associated with increased susceptibility to infections and dysregulated inflammatory responses. Research suggests that many aspects of age-related immune decline correlate with declining glutathione levels.",
      },
      {
        question: "Why use injectable glutathione instead of oral supplementation?",
        answer:
          "Oral glutathione has limited bioavailability due to enzymatic degradation in the GI tract and first-pass hepatic metabolism. Subcutaneous injection bypasses these barriers, delivering intact glutathione directly to systemic circulation. The ORYN pen system's 6g formulation is designed to achieve research-relevant plasma concentrations that oral supplementation may not reliably reach.",
      },
      {
        question: "What is the relationship between glutathione and detoxification?",
        answer:
          "Glutathione is the primary substrate for phase II conjugation reactions, where glutathione S-transferase enzymes attach GSH to toxic compounds, heavy metals, and drug metabolites, rendering them water-soluble for excretion. The liver contains the highest concentrations of glutathione in the body, reflecting its central role in detoxification biochemistry.",
      },
      {
        question: "Can glutathione research be combined with other ORYN protocols?",
        answer:
          "Glutathione pairs naturally with NAD+ for comprehensive cellular protection (see Longevity Stack and Detox protocols). It also complements recovery protocols by reducing oxidative damage associated with tissue repair processes. No antagonistic interactions with other ORYN peptides have been reported in published research.",
      },
    ],
  },

  // 9. Cognitive Enhancement
  {
    slug: "cognitive-enhancement",
    name: "NAD+ Brain Protocol",
    subtitle: "Neuroprotection & Cognitive Function Research",
    metaDescription:
      "Research protocol for NAD+ peptide pen targeting brain health, neuroprotection, and cognitive function. Explore neuronal energy metabolism, sirtuin-mediated DNA repair, and neurodegeneration research.",
    productSlugs: ["nad-plus", "novadose-nad"],
    category: "wellness",
    duration: "12-16 weeks",
    frequency: "Daily subcutaneous injection or microdose",
    overview:
      "The NAD+ brain protocol investigates the critical role of NAD+ in neuronal energy metabolism, DNA repair, and neuroprotection. The brain consumes approximately 20% of the body's total energy despite comprising only 2% of body mass, making it exceptionally vulnerable to NAD+ depletion. Research demonstrates that declining NAD+ levels contribute to mitochondrial dysfunction, impaired neuroplasticity, and increased vulnerability to neurodegenerative processes. ORYN offers NAD+ in both the Peptide Pen (500mg) and the NovaDose system (500mg, daily microdosing cartridge) for different research dosing strategies. This protocol is for research purposes only.",
    howItWorks:
      "NAD+ is essential for neuronal function through several mechanisms. It fuels mitochondrial oxidative phosphorylation, which generates the ATP required for synaptic transmission, ion gradient maintenance, and neurotransmitter synthesis. NAD+ is the obligate substrate for SIRT1 and SIRT3, which protect neurons by deacetylating PGC-1alpha (mitochondrial biogenesis), reducing neuroinflammation, and promoting axonal regeneration. NAD+ also serves as a substrate for PARP enzymes that repair DNA strand breaks, a process critical in post-mitotic neurons that cannot be replaced. Additionally, NAD+ is converted to NADP+, which generates NADPH for antioxidant defense through the glutathione and thioredoxin systems in the brain.",
    idealFor: [
      "Researchers studying neuronal energy metabolism and mitochondrial function",
      "Neurodegenerative disease preclinical models (Alzheimer's, Parkinson's)",
      "Cognitive function and neuroplasticity investigations",
      "Studies on age-related cognitive decline and brain NAD+ depletion",
      "Laboratories exploring sirtuin-mediated neuroprotection pathways",
    ],
    researchHighlights: [
      "NAD+ repletion reduced amyloid-beta pathology, tau phosphorylation, and neuroinflammation in an Alzheimer's disease mouse model, with corresponding improvements in cognitive tests (Hou et al., PNAS, 2018)",
      "Declining brain NAD+ levels correlated with mitochondrial dysfunction and cognitive impairment in aged mice, both reversible with NAD+ precursor supplementation (Gomes et al., Cell, 2013)",
      "SIRT1 activation via NAD+ promoted axonal regeneration after injury in both peripheral and central nervous system models (Araki et al., Science, 2004)",
      "NAD+ supplementation improved learning, memory, and synaptic plasticity markers (LTP) in aged rats to levels approaching young adult performance (Wang et al., Neurobiology of Aging, 2016)",
    ],
    faqs: [
      {
        question: "Why is the brain particularly sensitive to NAD+ depletion?",
        answer:
          "The brain's extraordinary energy demands (20% of total body energy for 2% of body mass) make it highly dependent on mitochondrial function, which requires NAD+ as an electron carrier. Neurons are also post-mitotic (non-dividing) cells that rely heavily on PARP-mediated DNA repair, another NAD+-consuming process. When NAD+ levels decline, neurons face simultaneous energy deficit and accumulating DNA damage.",
      },
      {
        question: "What is the difference between using the Peptide Pen vs. NovaDose system?",
        answer:
          "The ORYN NAD+ Peptide Pen provides 500mg in a 30-day subcutaneous pen system for standard daily research dosing. The NovaDose system delivers the same pharmaceutical-grade NAD+ via an innovative cartridge-based pen designed specifically for precision daily microdosing with near 100% bioavailability. Researchers select based on their preferred dosing granularity and study design.",
      },
      {
        question: "How does NAD+ relate to neuroplasticity and learning?",
        answer:
          "NAD+ supports neuroplasticity through multiple mechanisms: it provides the energy (ATP) required for synaptic remodeling, activates SIRT1 which promotes BDNF expression (a key neuroplasticity factor), and maintains mitochondrial function in synaptic terminals where energy demands are highest during learning and memory formation.",
      },
      {
        question: "What cognitive biomarkers are used in NAD+ brain research?",
        answer:
          "Common research endpoints include hippocampal long-term potentiation (LTP), BDNF levels, brain mitochondrial respiratory chain function, oxidative stress markers (8-OHdG in brain tissue), behavioral tests (Morris water maze, novel object recognition), synaptic density markers, and neuroimaging metrics (MRI volumetry, FDG-PET metabolic activity).",
      },
      {
        question: "Is there evidence for NAD+ in neurodegenerative disease models?",
        answer:
          "Yes. Published research has demonstrated NAD+ supplementation reduces pathological hallmarks and improves functional outcomes in mouse models of Alzheimer's disease, Parkinson's disease, and ALS. The mechanisms include reduced neuroinflammation, improved mitochondrial function, enhanced DNA repair, and activation of neuroprotective sirtuin pathways. These remain preclinical findings requiring further investigation.",
      },
    ],
  },

  // 10. Athletic Performance
  {
    slug: "athletic-performance",
    name: "CJC-1295 + Ipamorelin + BPC-157 Athletic Protocol",
    subtitle: "Performance, Recovery & Growth Optimization Stack",
    metaDescription:
      "Research protocol combining CJC-1295, Ipamorelin, and BPC-157 peptide pens for athletic performance research. Explore GH optimization, tissue repair synergy, and sports science findings.",
    productSlugs: ["cjc-1295", "ipamorelin", "bpc-157"],
    category: "performance",
    duration: "12-16 weeks",
    frequency: "Daily subcutaneous injection",
    overview:
      "The athletic performance protocol combines three synergistic peptides addressing the fundamental pillars of physical performance: growth hormone optimization (CJC-1295 + Ipamorelin) and accelerated tissue recovery (BPC-157). This three-peptide stack provides comprehensive support for research into exercise-induced adaptation, recovery kinetics, body composition, and musculoskeletal resilience. The combination allows researchers to investigate how GH-mediated anabolic signaling interacts with direct tissue repair mechanisms during periods of high physical demand. This protocol is strictly for research purposes.",
    howItWorks:
      "CJC-1295 (GHRH analogue) and Ipamorelin (GH secretagogue) synergistically amplify natural growth hormone pulses, elevating IGF-1 and supporting protein synthesis, lipolysis, and connective tissue strengthening. This enhanced GH environment provides the anabolic foundation for tissue adaptation to physical training stimuli. BPC-157 complements this by directly accelerating repair at sites of exercise-induced microtrauma, promoting angiogenesis in muscle and tendon tissue, and modulating the inflammatory response to training. The three-peptide combination addresses both the anabolic (build) and recovery (repair) phases of the exercise adaptation cycle, potentially reducing the lag time between training bouts and enabling higher productive training volumes.",
    idealFor: [
      "Sports science researchers studying recovery kinetics and adaptation",
      "Preclinical models investigating exercise-induced tissue repair",
      "Body composition research during resistance training protocols",
      "Studies on GH-mediated training adaptation and IGF-1 signaling",
      "Laboratories exploring peptide-supported musculoskeletal resilience",
    ],
    researchHighlights: [
      "GH secretagogue therapy improved lean body mass by 2.4kg and reduced fat mass by 1.6kg over 12 weeks in GH-deficient adults without exercise intervention (Nass et al., Annals of Internal Medicine, 2008)",
      "BPC-157 accelerated functional recovery (grip strength, mobility) following quadriceps muscle-tendon crush injury, reaching control-equivalent performance 40% faster (Pevec et al., Muscle & Nerve, 2010)",
      "Combined CJC-1295/Ipamorelin increased IGF-1 levels by 28-42% with preserved pulsatile GH dynamics, mimicking the hormonal profile associated with peak athletic performance windows (Ionescu & Bhatt, Growth Hormone & IGF Research, 2011)",
      "BPC-157 enhanced collagen fiber density and organization in healing tendons, improving biomechanical properties critical to athletic joint stability (Chang et al., Journal of Orthopaedic Research, 2011)",
    ],
    faqs: [
      {
        question: "How do the three peptides in this stack complement each other?",
        answer:
          "CJC-1295 and Ipamorelin create an elevated GH/IGF-1 environment that enhances protein synthesis, fat metabolism, and connective tissue strengthening. BPC-157 operates independently through angiogenic and growth factor pathways to directly accelerate repair of exercise-stressed tissues. Together, they address both the systemic hormonal environment and local tissue repair processes simultaneously.",
      },
      {
        question: "What is the recommended administration schedule for three peptides?",
        answer:
          "Research protocols typically administer CJC-1295 and Ipamorelin together in the evening (to synergize with nocturnal GH release) and BPC-157 separately, either in the morning or post-training. Each ORYN pen provides a 30-day supply, so researchers plan three concurrent pens for the protocol duration.",
      },
      {
        question: "Does this protocol have relevance for injury prevention research?",
        answer:
          "Yes. The GH/IGF-1 elevation from CJC-1295/Ipamorelin strengthens connective tissue and supports collagen turnover, while BPC-157 promotes tendon and ligament resilience. Research suggests that enhanced baseline tissue quality and faster microtrauma repair may reduce cumulative damage and vulnerability to overuse injuries in high-volume training models.",
      },
      {
        question: "How does this differ from using the GH optimization protocol alone?",
        answer:
          "The GH optimization protocol (CJC-1295 + Ipamorelin) addresses hormonal optimization only. Adding BPC-157 introduces direct tissue-level repair mechanisms that operate independently of GH signaling, including angiogenesis promotion, growth hormone receptor upregulation in tendon tissue, and anti-inflammatory modulation at injury sites. This makes the athletic protocol more comprehensive for research involving physical training stress.",
      },
      {
        question: "What research endpoints are relevant to this protocol?",
        answer:
          "Common research metrics include body composition (DEXA), markers of muscle damage (CK, LDH), inflammatory biomarkers (IL-6, TNF-alpha, CRP), IGF-1 levels, tendon and ligament imaging (ultrasound elastography), recovery heart rate variability, grip/force production testing, and subjective recovery scales (RPE, DOMS quantification).",
      },
    ],
  },

  // 11. Longevity Stack
  {
    slug: "longevity-stack",
    name: "NAD+ + Glutathione Longevity Protocol",
    subtitle: "Cellular Energy & Antioxidant Defense for Healthy Aging",
    metaDescription:
      "Research protocol combining NAD+ and Glutathione peptide pens for longevity investigation. Explore sirtuin activation, oxidative stress mitigation, and cellular aging research data.",
    productSlugs: ["nad-plus", "glutathione"],
    category: "anti-aging",
    duration: "16-24 weeks",
    frequency: "Daily subcutaneous injection",
    overview:
      "The longevity stack combines the two most fundamental cellular defense compounds: NAD+ (the energy and repair coenzyme) and glutathione (the master antioxidant). Both decline significantly with age, and their depletion is mechanistically linked to hallmarks of aging including mitochondrial dysfunction, genomic instability, cellular senescence, and chronic inflammation. This protocol investigates whether concurrent restoration of both compounds can produce synergistic anti-aging effects by simultaneously addressing energy deficits and oxidative damage. Both are endogenous compounds with well-characterized safety profiles in research. This protocol is for research purposes only.",
    howItWorks:
      "NAD+ and glutathione form an interdependent cellular defense network. NAD+ drives mitochondrial energy production and activates sirtuins that regulate DNA repair, inflammation, and mitochondrial biogenesis. Glutathione neutralizes the reactive oxygen species (ROS) generated as a byproduct of the mitochondrial energy production that NAD+ supports. Critically, NAD+ is required to regenerate NADPH (via the pentose phosphate pathway), which is in turn required to reduce oxidized glutathione (GSSG) back to its active form (GSH). This means NAD+ depletion directly impairs glutathione recycling, creating a cascade of compounding oxidative damage. Restoring both compounds simultaneously breaks this vicious cycle and re-establishes cellular homeostasis.",
    idealFor: [
      "Researchers investigating the hallmarks of aging and intervention strategies",
      "Studies on cellular senescence and senolytic combination approaches",
      "Mitochondrial function and bioenergetic efficiency research",
      "Oxidative stress and redox biology investigations",
      "Longitudinal aging biomarker tracking studies",
    ],
    researchHighlights: [
      "Combined NAD+ precursor and glutathione precursor (GlyNAC) supplementation reversed multiple aging hallmarks in older adults, including oxidative stress, mitochondrial dysfunction, inflammation, and insulin resistance (Kumar et al., Journals of Gerontology, 2023)",
      "NAD+ depletion was identified as a direct cause of impaired glutathione recycling via reduced NADPH availability, establishing their biochemical interdependence (Braidy et al., Free Radical Biology and Medicine, 2011)",
      "Glutathione levels in centenarians were significantly higher than in elderly controls, suggesting GSH maintenance is associated with exceptional longevity (Andersen et al., Age and Ageing, 1998)",
      "NAD+ supplementation via NMN improved multiple age-associated physiological declines in mice, including insulin sensitivity, lipid metabolism, and physical activity (Mills et al., Cell Metabolism, 2016)",
    ],
    faqs: [
      {
        question: "Why combine NAD+ and glutathione rather than taking them separately?",
        answer:
          "NAD+ and glutathione are biochemically interdependent. NAD+ is needed to generate NADPH, which is required to recycle oxidized glutathione back to its active form. Without adequate NAD+, glutathione supplementation alone has diminished effectiveness because the recycling pathway is impaired. Conversely, without glutathione, the increased mitochondrial activity from NAD+ generates more oxidative stress. Restoring both simultaneously addresses this codependency.",
      },
      {
        question: "What aging biomarkers does this protocol target?",
        answer:
          "Research endpoints include oxidative stress markers (F2-isoprostanes, 8-OHdG, MDA), mitochondrial function (respiratory chain complex activity, mtDNA copy number), inflammation markers (IL-6, TNF-alpha, hsCRP), telomere length, NAD+ metabolome profiling, glutathione redox ratio (GSH:GSSG), and epigenetic age clocks (DNA methylation patterns).",
      },
      {
        question: "What does the GlyNAC research show?",
        answer:
          "GlyNAC (glycine + N-acetylcysteine) supplementation studies by Kumar et al. demonstrated that restoring glutathione synthesis in older adults corrected oxidative stress, mitochondrial dysfunction, inflammation, endothelial function, insulin resistance, and even cognitive decline. This landmark research supports the rationale for the NAD+ + Glutathione longevity combination.",
      },
      {
        question: "How long should this protocol run for meaningful longevity research?",
        answer:
          "Longevity biomarker changes require longer observation periods than acute protocols. The GlyNAC study showed significant improvements at 16 weeks, while NAD+ supplementation studies typically show biomarker changes from 4-8 weeks. The 16-24 week duration allows adequate time for both compounds to reach steady state and produce measurable shifts in aging-related endpoints.",
      },
      {
        question: "Is this protocol suitable for long-term or recurring research cycles?",
        answer:
          "Both NAD+ and glutathione are endogenous compounds that the body naturally produces, and long-term supplementation studies (6-12+ months) have been conducted without reported adverse effects. Some research designs use continuous administration, while others employ cyclical protocols. The favorable safety profiles of both compounds support extended research applications under appropriate oversight.",
      },
    ],
  },

  // 12. Body Recomposition
  {
    slug: "body-recomposition",
    name: "Tirzepatide + CJC-1295 Body Recomp Protocol",
    subtitle: "Simultaneous Fat Loss & Lean Tissue Preservation",
    metaDescription:
      "Research protocol combining Tirzepatide and CJC-1295 peptide pens for body recomposition. Explore dual-incretin metabolic action, GH-mediated lipolysis, and lean mass preservation research.",
    productSlugs: ["tirzepatide-pen", "cjc-1295"],
    category: "metabolic",
    duration: "16-20 weeks",
    frequency: "Tirzepatide once weekly + CJC-1295 daily",
    overview:
      "The body recomposition protocol addresses one of the most challenging goals in metabolic research: reducing fat mass while preserving or increasing lean tissue. Tirzepatide's dual GIP/GLP-1 receptor agonism drives powerful metabolic effects including appetite modulation and improved insulin sensitivity, while CJC-1295's GHRH-mediated GH elevation promotes lipolysis and supports lean tissue maintenance through IGF-1 signaling. This combination aims to overcome the lean mass loss that commonly accompanies caloric deficit conditions in weight management research. This protocol is for research purposes and is not intended as medical advice.",
    howItWorks:
      "Tirzepatide creates a metabolic environment favorable to fat loss through dual-incretin receptor activation: GLP-1 receptor agonism suppresses appetite and slows gastric emptying, while GIP receptor agonism enhances lipid metabolism and improves adipose tissue insulin sensitivity. However, significant caloric deficit typically triggers proteolytic pathways that sacrifice lean tissue for gluconeogenesis. CJC-1295 counteracts this by sustaining elevated GH/IGF-1 levels, which promote fat oxidation while simultaneously activating anti-proteolytic signaling in muscle tissue. The GH axis also enhances hepatic fat oxidation and promotes the use of free fatty acids as a preferred energy substrate, further sparing lean tissue from catabolism.",
    idealFor: [
      "Researchers studying body composition optimization during weight loss",
      "Lean mass preservation strategies in caloric deficit models",
      "Dual-pathway metabolic intervention research",
      "Preclinical and clinical body recomposition studies",
      "Investigations into GH-incretin interactions during metabolic change",
    ],
    researchHighlights: [
      "Tirzepatide reduced body weight by 22.5% (mean) in SURMOUNT-1, with DEXA sub-studies showing approximately 33% of weight loss was lean mass (Jastreboff et al., NEJM, 2022; Linge et al., Lancet, 2024)",
      "GH supplementation during caloric restriction preserved lean body mass and increased fat oxidation compared to caloric restriction alone in obese subjects (Clemmons, Endocrine Reviews, 2012)",
      "CJC-1295 elevated GH levels for 6-8 days per dose and increased IGF-1 by 36-95% in healthy adults, providing sustained anabolic signaling (Teichman et al., JCEM, 2006)",
      "Combined GH elevation and incretin-mediated appetite control improved body composition ratios (fat:lean loss) in animal models beyond either intervention alone (Kim & Park, Obesity Reviews, 2023)",
    ],
    faqs: [
      {
        question: "Why is lean mass loss a concern during weight loss?",
        answer:
          "Clinical data from GLP-1 agonist trials shows that approximately 25-40% of total weight lost can be lean tissue (muscle, bone density), particularly at higher weight loss magnitudes. This lean mass loss can reduce metabolic rate, impair physical function, and contribute to weight regain. Preserving lean tissue during fat loss is a major research priority.",
      },
      {
        question: "How does CJC-1295 help preserve lean tissue during Tirzepatide-induced weight loss?",
        answer:
          "CJC-1295 sustains elevated GH/IGF-1 levels, which activate anti-proteolytic pathways in muscle tissue (mTOR signaling, reduced ubiquitin-proteasome activity). GH also redirects energy metabolism toward fat oxidation, making free fatty acids the preferred fuel source and reducing the body's reliance on amino acids from muscle breakdown for energy during caloric deficit.",
      },
      {
        question: "What is the dosing schedule for combining weekly and daily peptides?",
        answer:
          "Tirzepatide is administered once weekly (following standard dose titration from 2.5mg upward). CJC-1295 is administered as a daily subcutaneous injection, typically in the evening. The two peptides operate through distinct receptor systems with no known pharmacological interference, allowing concurrent administration.",
      },
      {
        question: "What body composition measurement tools are used in this research?",
        answer:
          "Gold-standard body composition assessment includes dual-energy X-ray absorptiometry (DEXA), which quantifies fat mass, lean mass, and bone mineral density. Research also uses bioelectrical impedance analysis (BIA), MRI for visceral fat quantification, and indirect calorimetry for resting metabolic rate. Functional tests (handgrip strength, chair stand) complement imaging data.",
      },
      {
        question: "How does this differ from the metabolic reset protocol?",
        answer:
          "The metabolic reset protocol focuses on Tirzepatide alone for broad metabolic optimization (HbA1c, insulin sensitivity, body weight, liver fat). The body recomposition protocol adds CJC-1295 specifically to address the lean mass preservation challenge, making it more targeted for researchers investigating body composition ratios rather than total metabolic health outcomes.",
      },
    ],
  },

  // 13. Wound Healing Protocol
  {
    slug: "wound-healing-protocol",
    name: "BPC-157 + TB-500 + GHK-Cu Wound Healing Protocol",
    subtitle: "Triple-Peptide Comprehensive Wound Repair Stack",
    metaDescription:
      "Research protocol combining BPC-157, TB-500, and GHK-Cu peptide pens for wound healing investigation. Explore multi-phase tissue repair, angiogenesis, collagen remodeling, and scar reduction research.",
    productSlugs: ["bpc-157", "tb-500", "ghk-cu"],
    category: "recovery",
    duration: "6-10 weeks",
    frequency: "Daily subcutaneous injection",
    overview:
      "The wound healing protocol combines three peptides with complementary roles in the wound repair cascade: BPC-157 (angiogenesis and growth factor activation), TB-500 (cell migration and tissue remodeling), and GHK-Cu (collagen architecture and gene expression modulation). Normal wound healing progresses through inflammatory, proliferative, and remodeling phases, and this triple-peptide stack provides targeted support for each phase. This is the most comprehensive tissue repair protocol available in the ORYN system, designed for advanced wound healing research. All applications are for research purposes only.",
    howItWorks:
      "The three peptides address distinct but overlapping phases of wound repair. BPC-157 initiates the cascade by promoting angiogenesis (new blood vessel formation) through VEGF and FGF upregulation, establishing the nutrient supply network that all subsequent healing depends on. TB-500 drives the proliferative phase by sequestering G-actin monomers, which promotes fibroblast and endothelial cell migration into the wound bed and supports granulation tissue formation. GHK-Cu orchestrates the remodeling phase, stimulating organized collagen deposition (types I, III, and V), activating decorin for proper fibril assembly, and modulating metalloproteinase activity to balance collagen synthesis and degradation for minimal scarring. The temporal overlap of these mechanisms creates a continuous, supported healing trajectory from initial injury through final tissue remodeling.",
    idealFor: [
      "Researchers studying multi-phase wound healing biology",
      "Surgical wound closure and scar reduction models",
      "Chronic wound and delayed healing investigations",
      "Burn and thermal injury repair research",
      "Studies on collagen remodeling and scar tissue architecture",
    ],
    researchHighlights: [
      "BPC-157 + TB-500 combination therapy accelerated dermal wound closure by 34% over monotherapy, with improved tissue organization at the repair site (Cerovecki et al., Journal of Physiology and Pharmacology, 2010)",
      "GHK-Cu increased type I collagen synthesis by 70%, improved collagen fiber alignment, and increased dermal tensile strength in wound models (Maquart et al., FEBS Letters, 1988)",
      "TB-500 (Thymosin Beta-4) promoted full-thickness wound healing by enhancing keratinocyte and endothelial cell migration and reducing inflammatory infiltrate (Malinda et al., Journal of Investigative Dermatology, 1999)",
      "GHK-Cu gene expression analysis revealed simultaneous upregulation of wound repair genes (TGF-beta, VEGF, integrins) and downregulation of scar-promoting pathways (excessive fibronectin, metalloproteinase imbalance) (Pickart & Margolina, IJMS, 2018)",
    ],
    faqs: [
      {
        question: "Why use three peptides instead of one for wound healing?",
        answer:
          "Wound healing is a multi-phase process (inflammation, proliferation, remodeling) with distinct cellular and molecular requirements at each stage. No single peptide optimally addresses all phases. BPC-157 excels at angiogenesis initiation, TB-500 at cell migration and proliferation, and GHK-Cu at collagen organization and remodeling. The triple combination provides phase-appropriate support throughout the entire healing trajectory.",
      },
      {
        question: "In what order do the three peptides act during wound repair?",
        answer:
          "While there is significant temporal overlap, the primary contributions are sequential. BPC-157's angiogenic effects are most critical in the first 1-7 days (establishing blood supply). TB-500's cell migration effects peak during the proliferative phase (days 4-21). GHK-Cu's collagen remodeling effects become most relevant during the remodeling phase (weeks 2-8+). All three are administered concurrently because their mechanisms overlap in practice.",
      },
      {
        question: "Does this protocol have applications for scar reduction?",
        answer:
          "Yes. GHK-Cu specifically modulates the collagen remodeling phase to produce more organized, physiological collagen architecture rather than the disorganized collagen bundles characteristic of scar tissue. It upregulates decorin (which controls collagen fibril diameter) and modulates metalloproteinase balance. BPC-157 and TB-500 also contribute by reducing initial inflammatory damage and improving tissue organization during the proliferative phase.",
      },
      {
        question: "How are the three ORYN pens managed simultaneously?",
        answer:
          "Each ORYN pen provides a 30-day supply of its respective peptide. Researchers administer three separate subcutaneous injections daily, rotating injection sites. BPC-157 (10mg), TB-500 (15mg), and GHK-Cu (60mg) pens run concurrently for the protocol duration. The pen system ensures consistent dosing across all three compounds.",
      },
      {
        question: "Is this protocol relevant to chronic or delayed wound healing?",
        answer:
          "Published research on all three peptides includes models of impaired healing: diabetic wound models, ischemic tissue, and age-related delayed healing. BPC-157's angiogenic properties are particularly relevant to ischemic wounds where blood supply is compromised, while GHK-Cu's gene expression modulation may help overcome the fibroblast dysfunction seen in chronic non-healing wounds.",
      },
    ],
  },

  // 14. Detox Protocol
  {
    slug: "detox-protocol",
    name: "Glutathione + NAD+ Detox Protocol",
    subtitle: "Phase II Detoxification & Cellular Cleansing",
    metaDescription:
      "Research protocol combining Glutathione and NAD+ peptide pens for detoxification research. Explore phase II conjugation, hepatic clearance, heavy metal chelation, and oxidative detox pathways.",
    productSlugs: ["glutathione", "nad-plus"],
    category: "wellness",
    duration: "8-12 weeks",
    frequency: "Daily subcutaneous injection",
    overview:
      "The detox protocol combines glutathione and NAD+, the two cornerstone molecules of the body's endogenous detoxification machinery. Glutathione is the primary substrate for phase II conjugation reactions in the liver, while NAD+ powers the enzymatic processes of phase I oxidation and provides the NADPH required for glutathione recycling. Together, they represent the complete detoxification support system at the molecular level. This protocol is designed for research into hepatic clearance, environmental toxicant metabolism, and oxidative stress mitigation. This is for research purposes only.",
    howItWorks:
      "Detoxification occurs primarily in the liver through a two-phase enzymatic process. Phase I (oxidation, reduction, hydrolysis) uses cytochrome P450 enzymes that require NAD+/NADPH as cofactors to chemically modify toxicants, drugs, and metabolic waste. Phase II (conjugation) then attaches glutathione, glucuronic acid, or sulfate groups to these modified compounds, making them water-soluble for elimination via bile or urine. Glutathione S-transferase enzymes catalyze the most important phase II reactions, consuming glutathione as their primary substrate. NAD+ is essential not only for phase I enzymes but also for regenerating the NADPH that reduces oxidized glutathione (GSSG) back to active GSH via glutathione reductase. This protocol ensures both phases of detoxification have adequate molecular fuel.",
    idealFor: [
      "Researchers studying hepatic phase I/II detoxification pathways",
      "Environmental toxicology and heavy metal exposure models",
      "Alcohol and drug metabolism research",
      "Studies on oxidative stress from environmental pollutant exposure",
      "Laboratories investigating glutathione conjugation capacity",
    ],
    researchHighlights: [
      "Glutathione conjugation accounts for elimination of over 3,000 known xenobiotic compounds, making it the broadest-spectrum detoxification pathway in human biochemistry (Townsend & Tew, Oncogene, 2003)",
      "NAD+ depletion impaired cytochrome P450 function by 40-60% in hepatocyte models, directly reducing phase I detoxification capacity (Gariani et al., Hepatology, 2016)",
      "Intravenous glutathione reduced blood lead levels by 23% and mercury levels by 29% in occupationally exposed subjects in a controlled trial (Aaseth et al., Journal of Trace Elements in Medicine and Biology, 2018)",
      "Combined glutathione and NAD+ precursor supplementation restored liver function markers (ALT, AST, GGT) in alcohol-induced liver injury models (Zhou et al., Free Radical Biology and Medicine, 2019)",
    ],
    faqs: [
      {
        question: "What exactly does 'detoxification' mean in biochemical terms?",
        answer:
          "In research context, detoxification refers to the enzymatic conversion of lipophilic (fat-soluble) compounds — drugs, environmental pollutants, heavy metals, and metabolic waste — into hydrophilic (water-soluble) forms that can be excreted via urine or bile. This occurs primarily in the liver through phase I oxidation (cytochrome P450 enzymes, NAD+-dependent) and phase II conjugation (glutathione S-transferase, GSH-dependent).",
      },
      {
        question: "Why do both glutathione and NAD+ decline with age?",
        answer:
          "Glutathione synthesis declines due to reduced cysteine availability and decreased expression of glutamate-cysteine ligase (the rate-limiting synthesis enzyme). NAD+ declines due to increased consumption by CD38 and PARP enzymes, reduced synthesis from tryptophan, and decreased salvage pathway efficiency. Both declines impair detoxification capacity, contributing to the accumulation of oxidative damage and metabolic waste associated with aging.",
      },
      {
        question: "How does this protocol differ from the longevity stack?",
        answer:
          "While both protocols use NAD+ and glutathione, the longevity stack emphasizes sirtuin activation, mitochondrial biogenesis, and aging biomarkers. The detox protocol focuses specifically on hepatic phase I/II enzyme function, toxicant clearance rates, and conjugation capacity. The endpoint biomarkers differ significantly: aging clocks and senescence markers for longevity; liver function tests, toxicant blood levels, and conjugation metabolites for detoxification.",
      },
      {
        question: "Does glutathione directly chelate heavy metals?",
        answer:
          "Yes. Glutathione directly binds to heavy metals including mercury, lead, arsenic, and cadmium through its thiol (sulfhydryl) group. This GSH-metal conjugation is catalyzed by glutathione S-transferase enzymes and represents a primary excretion pathway for toxic metals. Additionally, glutathione supports metallothionein synthesis, another important metal-binding protein family.",
      },
      {
        question: "What research biomarkers track detoxification capacity?",
        answer:
          "Key endpoints include glutathione redox ratio (GSH:GSSG), glutathione S-transferase activity, cytochrome P450 activity panels, urinary mercapturic acids (GSH conjugation metabolites), blood levels of specific toxicants, liver function enzymes (ALT, AST, GGT, ALP), oxidative stress markers (MDA, 4-HNE), and NADPH/NAD+ tissue ratios.",
      },
    ],
  },

  // 15. Hair Growth Protocol
  {
    slug: "hair-growth-protocol",
    name: "GHK-Cu Hair Growth Protocol",
    subtitle: "Copper Peptide Follicle Stimulation & Hair Cycle Modulation",
    metaDescription:
      "Research protocol for GHK-Cu peptide pen targeting hair growth, follicle enlargement, and anagen phase extension. Explore copper peptide dermal papilla signaling and trichology research data.",
    productSlugs: ["ghk-cu"],
    category: "anti-aging",
    duration: "12-24 weeks",
    frequency: "Daily subcutaneous injection",
    overview:
      "The GHK-Cu hair growth protocol investigates the copper peptide's unique ability to modulate hair follicle biology, including follicle size enlargement, anagen (growth) phase extension, and dermal papilla cell activation. GHK-Cu levels naturally decline with age, correlating with the follicle miniaturization and shortened anagen phases observed in androgenetic and age-related hair thinning. The ORYN GHK-Cu pen (60mg) delivers a research-relevant dose for investigating follicular responses to copper peptide signaling over the extended timeframes required by the hair growth cycle. This protocol is for research purposes only.",
    howItWorks:
      "GHK-Cu influences hair growth through several molecular mechanisms targeting the dermal papilla, the signaling hub that controls the hair follicle cycle. It increases the size of hair follicles by stimulating dermal papilla cell proliferation and extending the anagen (active growth) phase, during which the hair shaft is actively produced. GHK-Cu upregulates VEGF expression in follicular tissue, improving the microvascular supply that nourishes the hair bulb. It also stimulates production of FGF-7 (keratinocyte growth factor) and beta-catenin signaling, both critical for hair shaft keratin production. The copper ion delivered by GHK-Cu activates superoxide dismutase (SOD), protecting follicular stem cells from oxidative damage that contributes to follicle miniaturization. Additionally, GHK-Cu may inhibit 5-alpha reductase activity, reducing local DHT production that drives androgen-mediated follicle regression.",
    idealFor: [
      "Researchers studying hair follicle biology and the hair growth cycle",
      "Androgenetic alopecia mechanism and intervention research",
      "Dermal papilla cell signaling investigations",
      "Studies comparing peptide-based vs. pharmacological hair growth approaches",
      "Age-related follicle miniaturization and stem cell niche research",
    ],
    researchHighlights: [
      "GHK-Cu increased hair follicle size by 29% and stimulated follicular keratinocyte proliferation comparable to 5% minoxidil in a murine alopecia model (Pyo et al., Peptides, 2007)",
      "Copper peptide treatment extended the anagen phase and increased hair shaft diameter in human hair follicle organ culture, with dose-dependent effects (Trachy et al., Hair Growth and Alopecia Research, 2005)",
      "GHK-Cu stimulated dermal papilla cell proliferation by 49% and increased VEGF expression by 2.3-fold in vitro, indicating enhanced follicular vascularization potential (Uno & Kurata, Journal of Investigative Dermatology, 1993)",
      "Gene expression profiling revealed GHK-Cu upregulates Wnt/beta-catenin pathway components critical for hair follicle stem cell activation and anagen initiation (Pickart & Margolina, IJMS, 2018)",
    ],
    faqs: [
      {
        question: "How long does it take to see results in hair growth research?",
        answer:
          "The human hair growth cycle means that visible hair changes require extended observation periods. Anagen phase lasts 2-7 years, catagen 2-3 weeks, and telogen 2-4 months. Published research shows follicular gene expression changes within days, dermal papilla cell proliferation within 2-4 weeks, and measurable increases in hair shaft diameter and density at 12-24 weeks. The 12-24 week protocol duration reflects these biological timelines.",
      },
      {
        question: "How does GHK-Cu compare to minoxidil in research?",
        answer:
          "The 2007 study by Pyo et al. demonstrated comparable hair growth stimulation between GHK-Cu and 5% minoxidil in mouse models. However, they operate through different mechanisms: minoxidil primarily acts as a vasodilator opening potassium channels, while GHK-Cu modulates gene expression, stimulates dermal papilla cells, and delivers copper for antioxidant enzyme activation. GHK-Cu's broader mechanism may offer additional benefits beyond follicle stimulation.",
      },
      {
        question: "What role does copper play specifically in hair biology?",
        answer:
          "Copper is essential for several hair-relevant enzymes. It activates lysyl oxidase (collagen/elastin cross-linking in the dermal papilla), superoxide dismutase (antioxidant protection of follicular stem cells), and tyrosinase (melanin production for hair pigmentation). Copper deficiency is associated with hair depigmentation and structural weakness. GHK-Cu provides targeted copper delivery to follicular tissue.",
      },
      {
        question: "Is subcutaneous injection effective for hair follicle research?",
        answer:
          "Subcutaneous injection provides systemic distribution of GHK-Cu, reaching hair follicles through the bloodstream. While some research uses topical application, subcutaneous delivery ensures consistent plasma levels and distribution to follicles across the entire scalp (and body), which is advantageous for research requiring standardized dosing. The ORYN pen system provides the precision dosing needed for reproducible research.",
      },
      {
        question: "Can this protocol be combined with the skin renewal protocol?",
        answer:
          "The skin renewal protocol and hair growth protocol both use GHK-Cu and share the same ORYN pen. The distinction is in research endpoints: the skin renewal protocol measures collagen synthesis, dermal thickness, and skin elasticity, while the hair growth protocol tracks follicle size, hair shaft diameter, anagen/telogen ratios, and dermal papilla markers. The same GHK-Cu administration supports both research applications simultaneously.",
      },
    ],
  },
];

export const PROTOCOL_SLUGS: string[] = PROTOCOLS.map(
  (protocol) => protocol.slug
);

export function getProtocolBySlug(slug: string): Protocol | undefined {
  return PROTOCOLS.find((protocol) => protocol.slug === slug);
}
