export interface PeptideBundle {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  productSlugs: string[];
  savingsPercent: number;
  benefits: string[];
  protocol: string;
  faqs: { question: string; answer: string }[];
}

export const bundles: PeptideBundle[] = [
  {
    slug: "recovery-stack",
    name: "Recovery & Repair Stack",
    tagline: "The classic healing duo for accelerated tissue repair",
    description:
      "BPC-157 and TB-500 are the two most extensively researched peptides for tissue repair and regeneration. This stack combines BPC-157's gastric-derived healing properties with TB-500's cell migration and anti-inflammatory action, creating a comprehensive recovery protocol. Researchers worldwide pair these peptides for their complementary mechanisms — BPC-157 promotes angiogenesis and growth factor expression while TB-500 enhances actin regulation and reduces fibrosis. Together, they address both the structural and inflammatory components of tissue damage.",
    productSlugs: ["bpc-157", "tb-500"],
    savingsPercent: 10,
    benefits: [
      "Synergistic tissue repair through dual mechanisms",
      "Accelerated wound healing and reduced recovery time",
      "Anti-inflammatory action across joints, tendons, and muscles",
      "Supports gut lining integrity and mucosal healing",
      "Promotes angiogenesis for enhanced blood supply to damaged tissue",
      "Reduces fibrosis and scar tissue formation",
    ],
    protocol:
      "The BPC-157 + TB-500 recovery protocol is one of the most well-documented peptide stacks in research literature. Typical protocols involve concurrent administration over 4-8 weeks, with BPC-157 targeting local tissue repair via nitric oxide modulation and TB-500 providing systemic anti-inflammatory and cell-migration support. Both peptides are administered subcutaneously, with many researchers noting enhanced outcomes when injection sites are rotated near the area of interest.",
    faqs: [
      {
        question: "Why are BPC-157 and TB-500 considered the gold standard recovery stack?",
        answer:
          "BPC-157 and TB-500 target complementary healing pathways. BPC-157 promotes angiogenesis, growth factor expression, and nitric oxide synthesis at the tissue level, while TB-500 enhances cell migration, reduces inflammation systemically, and promotes actin polymerisation for structural repair. This dual-mechanism approach addresses both local and systemic aspects of recovery.",
      },
      {
        question: "Can I use both peptides at the same time?",
        answer:
          "Yes, concurrent administration is the most common research protocol. Many studies and anecdotal reports examine both peptides administered on the same day, often at the same time but at different injection sites. The two compounds work through independent mechanisms and do not interfere with each other.",
      },
      {
        question: "How long does a typical recovery stack protocol last?",
        answer:
          "Published research protocols typically run 4-8 weeks for acute injuries and up to 12 weeks for chronic conditions. ORYN's 30-day pen system provides consistent dosing for a full cycle, with many researchers using sequential pens for extended protocols.",
      },
      {
        question: "Is this stack suitable for joint and tendon injuries?",
        answer:
          "Joint and tendon injuries are among the most researched applications for this stack. BPC-157 has been studied in models of severed Achilles tendons, while TB-500 has shown efficacy in reducing joint inflammation and promoting functional connective tissue repair in animal studies.",
      },
    ],
  },
  {
    slug: "anti-aging-stack",
    name: "Anti-Aging & Longevity Stack",
    tagline: "Triple-compound longevity protocol for cellular renewal",
    description:
      "This comprehensive anti-aging stack combines three powerhouse compounds targeting distinct aging pathways. GHK-Cu stimulates collagen synthesis and tissue remodelling, NAD+ fuels cellular energy production and DNA repair, and Glutathione provides master antioxidant defence against oxidative damage. Together, these three compounds address the structural, energetic, and protective dimensions of biological aging. Researchers studying longevity increasingly recognise that multi-pathway interventions yield superior outcomes compared to single-compound approaches.",
    productSlugs: ["ghk-cu", "nad-plus", "glutathione"],
    savingsPercent: 12,
    benefits: [
      "Collagen synthesis and skin elasticity restoration via GHK-Cu",
      "Cellular energy production and mitochondrial support via NAD+",
      "Master antioxidant defence and detoxification via Glutathione",
      "DNA repair pathway activation for genomic integrity",
      "Skin brightening, rejuvenation, and anti-wrinkle properties",
      "Neuroprotective and cognitive function support",
    ],
    protocol:
      "The anti-aging triple stack targets three distinct hallmarks of aging simultaneously. GHK-Cu addresses extracellular matrix degradation by stimulating collagen and elastin production, while NAD+ replenishes the coenzyme critical for sirtuin activation, mitochondrial function, and DNA repair. Glutathione counters the cumulative oxidative stress that drives cellular senescence. Research protocols typically stagger administration — GHK-Cu in the morning, Glutathione midday, and NAD+ in the evening — to optimise each compound's pharmacokinetics.",
    faqs: [
      {
        question: "Why combine three compounds for anti-aging research?",
        answer:
          "Aging is a multi-factorial process involving structural degradation (collagen loss), energy decline (NAD+ depletion), and oxidative damage (glutathione depletion). Addressing all three pathways simultaneously produces synergistic benefits that single-compound approaches cannot match. This mirrors the multi-target strategy increasingly favoured in longevity research.",
      },
      {
        question: "What does NAD+ do for aging?",
        answer:
          "NAD+ levels decline by up to 50% between ages 40 and 60. This coenzyme is essential for sirtuin activation (the 'longevity genes'), mitochondrial energy production, and PARP-mediated DNA repair. Restoring NAD+ levels is one of the most actively researched anti-aging interventions, with studies showing improvements in cellular metabolism, cognitive function, and physical endurance.",
      },
      {
        question: "How does GHK-Cu complement the other compounds?",
        answer:
          "GHK-Cu works on the structural level — stimulating collagen, elastin, and glycosaminoglycan production while NAD+ and Glutathione work at the cellular level. GHK-Cu also has its own antioxidant and anti-inflammatory properties, creating additional synergy with Glutathione's detoxification pathways.",
      },
      {
        question: "Is there a recommended order of administration?",
        answer:
          "Many researchers stagger administration throughout the day to avoid potential interactions and optimise absorption. A common protocol is GHK-Cu in the morning, Glutathione midday, and NAD+ in the evening (as NAD+ metabolism is linked to circadian rhythms). However, some protocols administer all three at the same time without reported issues.",
      },
    ],
  },
  {
    slug: "gh-stack",
    name: "Growth Hormone Stack",
    tagline: "Dual-pathway GH optimisation for peak performance",
    description:
      "The CJC-1295 and Ipamorelin combination is the most widely researched growth hormone secretagogue stack. CJC-1295 mimics GHRH to provide sustained GH elevation, while Ipamorelin triggers targeted GH pulses through the ghrelin receptor without affecting cortisol or prolactin. This dual-pathway approach amplifies natural growth hormone release far beyond what either peptide achieves alone. Researchers favour this combination for its clean hormonal profile and predictable, dose-dependent GH response.",
    productSlugs: ["cjc-1295", "ipamorelin"],
    savingsPercent: 10,
    benefits: [
      "Amplified natural growth hormone release through dual pathways",
      "Promotes lean body composition and muscle preservation",
      "Deep, restorative sleep enhancement via GH pulse optimisation",
      "Accelerated recovery between training sessions",
      "Supports bone density and joint health",
      "Clean hormonal profile — no cortisol or prolactin elevation",
    ],
    protocol:
      "The CJC-1295 + Ipamorelin protocol leverages two distinct GH-releasing pathways for synergistic elevation. CJC-1295 acts as a GHRH analogue, providing a sustained baseline elevation of growth hormone, while Ipamorelin triggers additional targeted GH pulses via the ghrelin receptor. Most research protocols administer both peptides together in the evening, 30-60 minutes before sleep, to synchronise with the body's natural nocturnal GH surge. This timing maximises the synergy between peptide-stimulated and sleep-related GH release.",
    faqs: [
      {
        question: "Why combine CJC-1295 with Ipamorelin instead of using one alone?",
        answer:
          "CJC-1295 and Ipamorelin work through completely different receptors — GHRH and ghrelin, respectively. CJC-1295 provides a sustained GH baseline elevation while Ipamorelin triggers sharp, targeted GH pulses. Together, they produce a synergistic GH response that is significantly greater than either peptide alone, while maintaining a clean side-effect profile.",
      },
      {
        question: "Will this stack affect cortisol or other hormones?",
        answer:
          "One of the key advantages of the CJC-1295 + Ipamorelin combination is its selectivity. Ipamorelin is one of the most selective GH secretagogues available, meaning it stimulates GH release without significantly elevating cortisol, prolactin, or ACTH. CJC-1295 similarly targets GH release specifically through the GHRH pathway.",
      },
      {
        question: "When is the best time to administer this stack?",
        answer:
          "Most research protocols recommend evening administration, 30-60 minutes before sleep. This timing aligns with the body's natural circadian GH pattern, as the largest growth hormone pulses occur during deep slow-wave sleep. Fasted administration is generally preferred, as elevated blood sugar can blunt GH release.",
      },
    ],
  },
  {
    slug: "metabolic-stack",
    name: "Metabolic Transformation Stack",
    tagline: "Dual-format tirzepatide for comprehensive metabolic support",
    description:
      "This stack pairs the ORYN Tirzepatide Pen (10mg, daily micro-dosing) with the MediT Pen (40mg, once-weekly), giving researchers maximum flexibility for metabolic studies. Tirzepatide is a dual GIP/GLP-1 receptor agonist — the most advanced class of metabolic peptide available. The daily pen system allows precise dose titration during the initiation phase, while the weekly MediT Pen provides the higher-dose convenience required for sustained protocols. This combination supports comprehensive research into appetite regulation, blood sugar management, and metabolic efficiency.",
    productSlugs: ["tirzepatide-pen", "medit-tirzepatide"],
    savingsPercent: 8,
    benefits: [
      "Dual GIP/GLP-1 receptor agonism for enhanced metabolic action",
      "Flexible dosing: daily micro-dosing pen + weekly injection pen",
      "Appetite regulation and satiety signalling modulation",
      "Blood sugar management and insulin sensitivity support",
      "Clinically proven compound class with extensive trial data",
      "Supports long-term metabolic research protocols",
    ],
    protocol:
      "The metabolic transformation protocol leverages two delivery formats of tirzepatide for optimal flexibility. Many researchers begin with the daily Tirzepatide Pen (10mg) for precise dose titration during the initiation phase, allowing gradual upward adjustment to assess tolerance. The MediT Pen (40mg weekly) is then used for the maintenance phase, providing the convenience of once-weekly administration at established doses. This stepped approach mirrors the dose-escalation strategy used in published clinical trials of GIP/GLP-1 agonists.",
    faqs: [
      {
        question: "What is the advantage of having both daily and weekly tirzepatide formats?",
        answer:
          "The daily pen (10mg) allows micro-dosing for precise dose titration, which is particularly valuable during the initiation phase when researchers need to assess dose-response relationships. The weekly MediT Pen (40mg) provides convenience for established protocols. Having both formats gives researchers maximum flexibility to design optimal study protocols.",
      },
      {
        question: "How does tirzepatide differ from GLP-1-only agonists?",
        answer:
          "Tirzepatide is a dual GIP/GLP-1 receptor agonist, meaning it activates two key metabolic hormone pathways simultaneously. GIP (glucose-dependent insulinotropic polypeptide) and GLP-1 (glucagon-like peptide-1) have complementary effects on appetite, insulin secretion, and energy metabolism. Clinical data suggests this dual mechanism produces superior metabolic outcomes compared to GLP-1-only compounds.",
      },
      {
        question: "Is dose escalation necessary with tirzepatide?",
        answer:
          "Published clinical trial protocols universally employ dose escalation with tirzepatide, starting at lower doses and gradually increasing over 4-8 weeks. This approach allows the body to adapt to GLP-1 receptor activation and minimises gastrointestinal side effects. The daily pen format in this stack is ideal for this titration phase.",
      },
    ],
  },
  {
    slug: "total-wellness",
    name: "Total Wellness Stack",
    tagline: "Foundation protocol for systemic health optimisation",
    description:
      "The Total Wellness Stack combines three compounds that target the most fundamental aspects of health: tissue integrity, cellular energy, and antioxidant defence. BPC-157 supports gut health and systemic tissue repair, NAD+ fuels mitochondrial energy production and DNA repair mechanisms, and Glutathione provides the master antioxidant shield that protects every cell from oxidative damage. This foundational stack is designed for researchers studying whole-body wellness optimisation and preventive health protocols.",
    productSlugs: ["bpc-157", "nad-plus", "glutathione"],
    savingsPercent: 10,
    benefits: [
      "Comprehensive gut health and tissue integrity via BPC-157",
      "Mitochondrial energy production and metabolic support via NAD+",
      "Systemic antioxidant defence and detoxification via Glutathione",
      "Immune system modulation and inflammatory balance",
      "Neuroprotective and cognitive function support",
      "Foundation protocol compatible with additional peptide stacks",
    ],
    protocol:
      "The Total Wellness protocol addresses three pillars of systemic health. BPC-157 targets the gut-body axis, supporting intestinal barrier integrity and modulating inflammatory pathways throughout the body. NAD+ replenishes the coenzyme that declines with age and stress, restoring mitochondrial function and activating sirtuin-mediated repair pathways. Glutathione provides the antioxidant backbone that protects cellular structures from oxidative stress. Many researchers use this as a foundation protocol, running it for 30-60 days before layering additional targeted peptide stacks.",
    faqs: [
      {
        question: "Why are these three compounds considered a wellness foundation?",
        answer:
          "BPC-157, NAD+, and Glutathione each address a fundamental pillar of health. BPC-157 supports structural integrity (especially gut and connective tissue), NAD+ powers cellular energy and repair mechanisms, and Glutathione protects against the oxidative damage that underlies most chronic diseases. Together, they create a comprehensive baseline for systemic health optimisation.",
      },
      {
        question: "Can this stack be combined with other peptide protocols?",
        answer:
          "Yes, the Total Wellness Stack is specifically designed as a foundation protocol. Many researchers run this stack alongside targeted protocols such as the Recovery Stack (adding TB-500) or the GH Stack (adding CJC-1295 + Ipamorelin). The three compounds in this stack support the body's baseline healing capacity, potentially enhancing the effects of additional peptides.",
      },
      {
        question: "How does BPC-157 support overall wellness beyond gut health?",
        answer:
          "While BPC-157 is best known for gut healing, research shows it has systemic effects including neuroprotection, tendon and ligament repair, anti-inflammatory modulation, and support for the gut-brain axis. Its gastric-juice origin gives it unique stability, and its effects extend far beyond the GI tract.",
      },
      {
        question: "What is the recommended duration for a wellness protocol?",
        answer:
          "Most researchers run a minimum 30-day wellness protocol, with many extending to 60-90 days for comprehensive baseline assessment. ORYN's pen system delivers consistent dosing for 30 days per pen, making it easy to plan sequential cycles for extended wellness research.",
      },
    ],
  },
  {
    slug: "skin-renewal",
    name: "Skin Renewal Stack",
    tagline: "Advanced dermal rejuvenation through peptide science",
    description:
      "The Skin Renewal Stack pairs two of the most potent compounds in dermatological peptide research. GHK-Cu (copper peptide) stimulates collagen and elastin synthesis, promotes tissue remodelling, and enhances the skin's structural proteins. Glutathione, the body's master antioxidant, provides powerful skin brightening, detoxification, and protection against UV-induced oxidative damage. Together, these compounds address both the structural degradation and oxidative stress components of skin aging — the two primary drivers of visible skin deterioration.",
    productSlugs: ["ghk-cu", "glutathione"],
    savingsPercent: 10,
    benefits: [
      "Stimulates collagen and elastin synthesis for structural renewal",
      "Skin brightening and even tone via glutathione's melanin regulation",
      "Antioxidant protection against UV and environmental damage",
      "Promotes wound healing and scar reduction",
      "Supports hyaluronic acid production for skin hydration",
      "Anti-inflammatory action to reduce redness and irritation",
    ],
    protocol:
      "The Skin Renewal protocol targets complementary dermal pathways. GHK-Cu addresses the structural component of skin aging by stimulating fibroblasts to produce collagen, elastin, and glycosaminoglycans (including hyaluronic acid). Glutathione works on the oxidative and pigmentation side, neutralising free radicals, inhibiting tyrosinase (the enzyme responsible for melanin production), and supporting hepatic detoxification to reduce skin-dulling toxin accumulation. Research protocols typically run 8-12 weeks, as collagen remodelling is a gradual process with visible improvements accumulating over time.",
    faqs: [
      {
        question: "How do GHK-Cu and Glutathione work together for skin?",
        answer:
          "GHK-Cu and Glutathione target different aspects of skin health. GHK-Cu stimulates the production of structural proteins (collagen, elastin, proteoglycans) that give skin its firmness and elasticity, while Glutathione provides antioxidant protection, brightens skin by inhibiting melanin production, and supports detoxification. Together, they address both the structural and environmental causes of skin aging.",
      },
      {
        question: "How long before visible skin improvements are expected?",
        answer:
          "Collagen remodelling is a gradual process. Research suggests initial improvements in skin tone and brightness (from Glutathione) may appear within 2-4 weeks, while structural improvements from collagen synthesis (GHK-Cu) typically become noticeable at 6-12 weeks. Most researchers run this protocol for a minimum of 8 weeks for comprehensive assessment.",
      },
      {
        question: "Is injectable GHK-Cu more effective than topical copper peptide products?",
        answer:
          "Injectable GHK-Cu delivers the peptide systemically, allowing it to reach the dermal layer directly via the bloodstream. Topical copper peptide products face significant penetration challenges — the skin barrier limits absorption of peptides to the superficial epidermis. ORYN's pen-delivered GHK-Cu achieves far higher bioavailability and deeper dermal action.",
      },
    ],
  },
  {
    slug: "athlete-recovery",
    name: "Athlete Recovery Stack",
    tagline: "Elite-level recovery with GH-enhanced tissue repair",
    description:
      "The Athlete Recovery Stack builds on the classic BPC-157 + TB-500 healing duo by adding CJC-1295 for growth hormone optimisation. This three-compound protocol addresses every dimension of athletic recovery: BPC-157 promotes tissue repair and reduces inflammation, TB-500 enhances cell migration and reduces fibrosis, and CJC-1295 elevates natural growth hormone to support muscle recovery, sleep quality, and body composition. This is the most comprehensive recovery protocol available for researchers studying elite athletic performance and injury rehabilitation.",
    productSlugs: ["bpc-157", "tb-500", "cjc-1295"],
    savingsPercent: 12,
    benefits: [
      "Triple-compound approach to accelerated tissue repair",
      "Growth hormone elevation for enhanced muscle recovery",
      "Deep restorative sleep promotion for overnight regeneration",
      "Reduced inflammation across joints, tendons, and muscles",
      "Supports lean body composition during recovery periods",
      "Minimised scar tissue and fibrosis from training injuries",
    ],
    protocol:
      "The Athlete Recovery protocol combines two healing peptides with a growth hormone secretagogue for comprehensive recovery support. BPC-157 and TB-500 are typically administered together (often subcutaneously near the area of concern) to maximise local tissue repair, while CJC-1295 is administered in the evening to amplify the natural nocturnal GH surge that drives overnight recovery. This three-pronged approach addresses tissue repair (BPC-157 + TB-500), anti-inflammatory modulation (all three compounds), and systemic recovery hormones (CJC-1295). Protocols typically run 6-8 weeks for acute injuries and 8-12 weeks for chronic conditions.",
    faqs: [
      {
        question: "Why add CJC-1295 to the BPC-157 + TB-500 recovery stack?",
        answer:
          "CJC-1295 adds a growth hormone dimension to the recovery protocol. Elevated GH supports muscle protein synthesis, deep sleep (when most tissue repair occurs), and lean body composition — all critical for athletic recovery. While BPC-157 and TB-500 handle direct tissue repair, CJC-1295 creates the optimal hormonal environment for the body's overall recovery capacity.",
      },
      {
        question: "Is this stack suitable during active training or only during injury recovery?",
        answer:
          "Many researchers study this stack both during active training phases (for enhanced recovery between sessions) and during injury rehabilitation. During active training, the stack may support faster recovery, reduced soreness, and better sleep quality. During injury rehabilitation, the full tissue-repair and anti-inflammatory properties become the primary focus.",
      },
      {
        question: "How should the three peptides be administered?",
        answer:
          "Common research protocols administer BPC-157 and TB-500 together in the morning or post-training (near the area of concern if applicable), and CJC-1295 separately in the evening before sleep to align with natural GH release patterns. This separation optimises the pharmacokinetics of each compound.",
      },
      {
        question: "Can Ipamorelin be added to this stack?",
        answer:
          "Yes, some researchers add Ipamorelin alongside CJC-1295 for enhanced GH release (see our Growth Hormone Stack). The four-peptide combination is well-documented in research literature. However, the three-peptide Athlete Recovery Stack provides excellent GH support while keeping the protocol manageable.",
      },
    ],
  },
  {
    slug: "nad-complete",
    name: "NAD+ Complete Stack",
    tagline: "Dual-delivery NAD+ for maximum cellular rejuvenation",
    description:
      "The NAD+ Complete Stack combines two delivery systems for comprehensive NAD+ replenishment. The ORYN NAD+ Pen (500mg, peptide pen system) provides a concentrated monthly dose through our precision pen platform, while the NovaDose NAD+ (500mg, cartridge system) enables daily micro-dosing for sustained NAD+ elevation throughout the day. This dual-delivery approach ensures both acute NAD+ supplementation and continuous baseline maintenance — the most thorough NAD+ protocol available outside of clinical IV therapy, at a fraction of the cost.",
    productSlugs: ["nad-plus", "novadose-nad"],
    savingsPercent: 8,
    benefits: [
      "Dual-delivery system for comprehensive NAD+ replenishment",
      "Sustained cellular energy production and mitochondrial support",
      "DNA repair pathway activation for genomic stability",
      "Cognitive clarity and neuroprotective benefits",
      "More affordable and convenient than IV NAD+ therapy",
      "Supports sirtuin activation — the longevity gene pathway",
    ],
    protocol:
      "The NAD+ Complete protocol leverages two complementary delivery systems. The ORYN NAD+ Pen provides concentrated subcutaneous NAD+ administration, allowing for significant acute elevation of cellular NAD+ levels. The NovaDose system complements this with daily micro-doses that maintain elevated NAD+ throughout the day, preventing the troughs that occur between larger doses. This mirrors the strategy used in clinical NAD+ research, where sustained elevation produces superior outcomes compared to intermittent bolus dosing. The combined protocol provides near-continuous NAD+ support at a fraction of the cost of IV infusion therapy.",
    faqs: [
      {
        question: "Why use two different NAD+ delivery systems?",
        answer:
          "The two systems serve complementary roles. The NAD+ Pen delivers a concentrated dose for acute NAD+ elevation, while the NovaDose system provides daily micro-doses to maintain sustained levels. This dual approach prevents the peaks and troughs of single-delivery protocols, keeping cellular NAD+ consistently elevated — which research suggests produces superior outcomes for mitochondrial function and DNA repair.",
      },
      {
        question: "How does this compare to IV NAD+ therapy?",
        answer:
          "IV NAD+ therapy typically costs hundreds of pounds per session and requires clinical visits. The NAD+ Complete Stack provides comparable NAD+ delivery at a fraction of the cost, with the convenience of self-administered pen systems. The NovaDose system achieves near 100% bioavailability, making it a practical alternative to IV infusions for sustained NAD+ research.",
      },
      {
        question: "What are the signs of NAD+ depletion?",
        answer:
          "Research associates NAD+ depletion with fatigue, cognitive fog, reduced exercise capacity, poor sleep quality, and accelerated aging markers. NAD+ levels naturally decline by approximately 50% between ages 40 and 60, and further decline with chronic stress, poor sleep, and metabolic disorders. Researchers study NAD+ replenishment to address these age-related declines.",
      },
      {
        question: "Can I combine the NAD+ Complete Stack with other ORYN stacks?",
        answer:
          "Yes, NAD+ is a foundational compound that complements virtually any peptide protocol. It is particularly synergistic with the Anti-Aging Stack (adding GHK-Cu and Glutathione for a comprehensive longevity protocol) and the Total Wellness Stack (BPC-157 and Glutathione for systemic health support).",
      },
    ],
  },
];

export const BUNDLE_SLUGS = bundles.map((b) => b.slug);

export function getBundleBySlug(slug: string): PeptideBundle | undefined {
  return bundles.find((b) => b.slug === slug);
}
