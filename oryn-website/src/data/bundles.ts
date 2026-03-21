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
    name: "Recovery & Repair Research Stack",
    tagline: "The most studied peptide duo in tissue regeneration research",
    description:
      "BPC-157 and TB-500 are two of the most extensively researched peptides in tissue regeneration studies. This stack combines BPC-157's investigated gastric-derived mechanisms with TB-500's studied role in cell migration and inflammatory pathway modulation, creating a comprehensive research protocol. Researchers worldwide pair these peptides for their complementary mechanisms — studies suggest BPC-157 may promote angiogenesis and growth factor expression while TB-500 may enhance actin regulation and modulate fibrosis pathways. Together, they are investigated for both structural and inflammatory components of tissue research.",
    productSlugs: ["bpc-157", "tb-500"],
    savingsPercent: 10,
    benefits: [
      "Investigated for synergistic tissue regeneration through dual mechanisms",
      "Studied for wound closure and recovery pathway modulation",
      "Research focus on inflammatory pathway modulation across joints, tendons, and muscles",
      "Investigated for gut mucosal integrity and barrier function research",
      "Studied for angiogenesis and blood supply pathway research",
      "Research focus on fibrosis and scar tissue formation pathways",
    ],
    protocol:
      "The BPC-157 + TB-500 research protocol is one of the most well-documented peptide stacks in research literature. Typical protocols involve concurrent administration over 4-8 weeks, with BPC-157 investigated for local tissue repair via nitric oxide modulation and TB-500 studied for systemic inflammatory pathway modulation and cell-migration support. Both peptides are administered subcutaneously, with many researchers noting improved outcomes when injection sites are rotated near the area of interest.",
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
    name: "Longevity Research Stack",
    tagline: "Triple-compound protocol for cellular aging research",
    description:
      "This comprehensive research stack combines three extensively studied compounds targeting distinct aging-related pathways. Studies suggest GHK-Cu may stimulate collagen synthesis and tissue remodelling, NAD+ is investigated for cellular energy production and DNA repair, and Glutathione is studied for its antioxidant defence role against oxidative damage. Together, these three compounds are researched for the structural, energetic, and protective dimensions of biological aging. Longevity researchers increasingly recognise that multi-pathway interventions may yield enhanced outcomes compared to single-compound approaches.",
    productSlugs: ["ghk-cu", "nad-plus", "glutathione"],
    savingsPercent: 12,
    benefits: [
      "Investigated for collagen synthesis and skin elasticity research via GHK-Cu",
      "Studied for cellular energy production and mitochondrial function via NAD+",
      "Research focus on antioxidant defence and detoxification pathways via Glutathione",
      "Investigated for DNA repair pathway activation and genomic integrity",
      "Studied for skin biology, depigmentation, and remodelling research",
      "Research focus on neuroprotective mechanisms and cognitive function",
    ],
    protocol:
      "The longevity research triple stack targets three distinct hallmarks of aging simultaneously. GHK-Cu is investigated for addressing extracellular matrix degradation through collagen and elastin production pathways, while NAD+ is studied for replenishing the coenzyme critical for sirtuin activation, mitochondrial function, and DNA repair. Glutathione is researched for countering cumulative oxidative stress associated with cellular senescence. Research protocols typically stagger administration — GHK-Cu in the morning, Glutathione midday, and NAD+ in the evening — to optimise each compound's pharmacokinetics.",
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
    name: "Growth Hormone Research Stack",
    tagline: "Dual-pathway GH secretagogue research protocol",
    description:
      "The CJC-1295 and Ipamorelin combination is the most widely researched growth hormone secretagogue stack. Studies suggest CJC-1295 mimics GHRH to provide sustained GH elevation, while Ipamorelin is investigated for triggering targeted GH pulses through the ghrelin receptor without significantly affecting cortisol or prolactin. This dual-pathway approach is studied for amplifying natural growth hormone release beyond what either peptide may achieve alone. Researchers favour this combination for its investigated selective hormonal profile and predictable, dose-dependent GH response.",
    productSlugs: ["cjc-1295", "ipamorelin"],
    savingsPercent: 10,
    benefits: [
      "Investigated for amplified growth hormone release through dual pathways",
      "Studied for body composition and lean tissue research applications",
      "Research focus on sleep architecture and GH pulse optimisation",
      "Investigated for recovery pathway modulation between training sessions",
      "Studied for bone density and joint tissue research",
      "Investigated for selective hormonal profile — minimal cortisol or prolactin effect observed",
    ],
    protocol:
      "The CJC-1295 + Ipamorelin protocol leverages two distinct GH-releasing pathways investigated for synergistic elevation. CJC-1295 acts as a GHRH analogue, studied for providing sustained baseline elevation of growth hormone, while Ipamorelin is investigated for triggering additional targeted GH pulses via the ghrelin receptor. Most research protocols administer both peptides together in the evening, 30-60 minutes before sleep, to synchronise with the body's natural nocturnal GH surge. This timing is studied for maximising the synergy between peptide-stimulated and sleep-related GH release.",
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
    name: "Metabolic Research Stack",
    tagline: "Dual-format tirzepatide for comprehensive metabolic research",
    description:
      "This stack pairs the ORYN Tirzepatide Pen (10mg, daily micro-dosing) with the MediT Pen (40mg, once-weekly), giving researchers maximum flexibility for metabolic studies. Tirzepatide is a dual GIP/GLP-1 receptor agonist — the most extensively studied class of dual incretin compound. The daily pen system allows precise dose titration during the initiation phase, while the weekly MediT Pen provides the higher-dose convenience required for sustained protocols. This combination supports comprehensive research into appetite signalling, glucose homeostasis, and metabolic pathways.",
    productSlugs: ["tirzepatide-pen", "medit-tirzepatide"],
    savingsPercent: 8,
    benefits: [
      "Dual GIP/GLP-1 receptor agonism for metabolic pathway research",
      "Flexible dosing: daily micro-dosing pen + weekly injection pen",
      "Investigated for appetite regulation and satiety signalling pathways",
      "Studied for glucose homeostasis and insulin sensitivity research",
      "Extensively studied compound class with robust clinical trial data",
      "Designed for long-term metabolic research protocols",
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
    name: "Total Wellness Research Stack",
    tagline: "Foundation protocol for systemic wellness research",
    description:
      "The Total Wellness Research Stack combines three compounds that target the most fundamental aspects of cellular research: tissue integrity, cellular energy, and antioxidant defence. BPC-157 is investigated for gut mucosal integrity and systemic tissue repair pathways, NAD+ is studied for mitochondrial energy production and DNA repair mechanisms, and Glutathione is researched for its role as a key antioxidant in cellular redox balance. This foundational stack is designed for researchers studying whole-body wellness pathways and preventive research protocols.",
    productSlugs: ["bpc-157", "nad-plus", "glutathione"],
    savingsPercent: 10,
    benefits: [
      "Investigated for gut mucosal integrity and tissue research via BPC-157",
      "Studied for mitochondrial energy production and metabolic research via NAD+",
      "Research focus on antioxidant defence and detoxification pathways via Glutathione",
      "Investigated for immune system modulation and inflammatory pathway research",
      "Studied for neuroprotective mechanisms and cognitive function research",
      "Foundation protocol compatible with additional peptide research stacks",
    ],
    protocol:
      "The Total Wellness research protocol addresses three pillars of systemic research. BPC-157 is investigated for targeting the gut-body axis, studied for intestinal barrier integrity and inflammatory pathway modulation. NAD+ is researched for replenishing the coenzyme that declines with age and stress, studied for restoring mitochondrial function markers and activating sirtuin-mediated repair pathways. Glutathione is investigated for providing antioxidant protection of cellular structures from oxidative stress. Many researchers use this as a foundation protocol, running it for 30-60 days before layering additional targeted peptide stacks.",
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
    name: "Skin Research Stack",
    tagline: "Advanced dermatological research through peptide science",
    description:
      "The Skin Research Stack pairs two of the most studied compounds in dermatological peptide research. Studies suggest GHK-Cu (copper peptide) may stimulate collagen and elastin synthesis, promote tissue remodelling, and modulate the skin's structural protein pathways. Glutathione, a key endogenous antioxidant, is investigated for skin depigmentation, detoxification pathways, and protection against UV-induced oxidative damage. Together, these compounds are researched for both the structural degradation and oxidative stress components of skin aging — the two primary areas of dermatological aging research.",
    productSlugs: ["ghk-cu", "glutathione"],
    savingsPercent: 10,
    benefits: [
      "Investigated for collagen and elastin synthesis pathway research",
      "Studied for skin depigmentation and melanin regulation mechanisms",
      "Research focus on antioxidant protection against UV and environmental damage",
      "Investigated for wound closure and scar formation pathway research",
      "Studied for hyaluronic acid production and skin hydration mechanisms",
      "Research focus on inflammatory pathway modulation in dermal tissue",
    ],
    protocol:
      "The Skin Research protocol targets complementary dermal pathways. GHK-Cu is investigated for addressing the structural component of skin aging by stimulating fibroblasts to produce collagen, elastin, and glycosaminoglycans (including hyaluronic acid). Glutathione is studied for its role on the oxidative and pigmentation side — investigated for neutralising free radicals, modulating tyrosinase (the enzyme involved in melanin production), and supporting hepatic detoxification pathways. Research protocols typically run 8-12 weeks, as collagen remodelling is a gradual process with observable changes accumulating over time.",
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
    name: "Athlete Recovery Research Stack",
    tagline: "Triple-compound protocol for athletic recovery research",
    description:
      "The Athlete Recovery Research Stack builds on the extensively studied BPC-157 + TB-500 research duo by adding CJC-1295 for growth hormone pathway investigation. This three-compound protocol is designed for researching multiple dimensions of athletic recovery: BPC-157 is investigated for tissue repair and inflammatory pathways, TB-500 is studied for cell migration and fibrosis modulation, and CJC-1295 is researched for natural growth hormone elevation in muscle recovery, sleep architecture, and body composition studies. This is the most comprehensive recovery research protocol available for studying elite athletic performance and injury rehabilitation.",
    productSlugs: ["bpc-157", "tb-500", "cjc-1295"],
    savingsPercent: 12,
    benefits: [
      "Triple-compound approach investigated for tissue regeneration research",
      "Studied for growth hormone pathway modulation and muscle recovery research",
      "Research focus on sleep architecture and overnight regeneration pathways",
      "Investigated for inflammatory pathway modulation across joints, tendons, and muscles",
      "Studied for lean body composition research during recovery periods",
      "Research focus on scar tissue and fibrosis formation pathways",
    ],
    protocol:
      "The Athlete Recovery research protocol combines two regeneration-focused peptides with a growth hormone secretagogue for comprehensive recovery research. BPC-157 and TB-500 are typically administered together (often subcutaneously near the area of concern) to investigate local tissue repair pathways, while CJC-1295 is administered in the evening to investigate amplification of the natural nocturnal GH surge associated with overnight recovery. This three-pronged approach researches tissue repair (BPC-157 + TB-500), inflammatory pathway modulation (all three compounds), and systemic recovery hormone pathways (CJC-1295). Protocols typically run 6-8 weeks for acute studies and 8-12 weeks for chronic condition research.",
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
    name: "NAD+ Complete Research Stack",
    tagline: "Dual-delivery NAD+ for comprehensive cellular research",
    description:
      "The NAD+ Complete Research Stack combines two delivery systems for comprehensive NAD+ research protocols. The ORYN NAD+ Pen (500mg, peptide pen system) provides a concentrated monthly dose through our precision pen platform, while the NovaDose NAD+ (500mg, cartridge system) enables daily micro-dosing for sustained NAD+ elevation throughout the day. This dual-delivery approach is designed for both acute and continuous NAD+ research — the most thorough NAD+ research protocol available outside of clinical IV settings, at a fraction of the cost.",
    productSlugs: ["nad-plus", "novadose-nad"],
    savingsPercent: 8,
    benefits: [
      "Dual-delivery system for comprehensive NAD+ research protocols",
      "Investigated for sustained cellular energy production and mitochondrial function",
      "Studied for DNA repair pathway activation and genomic stability research",
      "Research focus on cognitive performance and neuroprotective mechanisms",
      "More affordable and convenient than IV-based NAD+ research protocols",
      "Investigated for sirtuin activation — the longevity gene pathway research",
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
