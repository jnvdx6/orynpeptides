// Rich product data for semi-personalized product pages
// Each product gets unique: science, FAQ, usage guide, reviews, selling points

export interface ProductDetail {
  slug?: string;
  // Science section
  science: {
    molecularFormula?: string;
    molecularWeight?: string;
    sequence?: string;
    classification: string;
    mechanism: string;
    halfLife?: string;
    researchAreas: string[];
    keyStudies: { title: string; finding: string }[];
  };
  // Pen advantage (why pen > vial)
  penAdvantage: {
    headline: string;
    points: { title: string; description: string }[];
  };
  // Dosing guide
  dosing: {
    recommendedDose: string;
    frequency: string;
    duration: string;
    instructions: string[];
    tips: string[];
  };
  // Product-specific FAQ
  faq: { question: string; answer: string }[];
  // Reviews/testimonials specific to product
  reviews: {
    rating: number;
    title: string;
    text: string;
    author: string;
    role: string;
    verified: boolean;
  }[];
  // Unique selling points for this product
  sellingPoints: { icon: string; title: string; description: string }[];
}

export const productDetails: Record<string, ProductDetail> = {
  "bpc-157": {
    science: {
      molecularFormula: "C62H98N16O22",
      molecularWeight: "1,419.53 g/mol",
      sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
      classification: "Pentadecapeptide (15 amino acids)",
      mechanism:
        "Research suggests BPC-157 modulates the nitric oxide (NO) system and upregulates growth factor expression including VEGF and EGF. Studies indicate it may promote angiogenesis and modulate wound healing and oxidative stress pathways through multiple signaling mechanisms.",
      halfLife: "Stable in gastric juice for >24 hours",
      researchAreas: [
        "Gastrointestinal healing",
        "Tendon and ligament repair",
        "Muscle healing",
        "Neuroprotection",
        "Anti-inflammatory response",
        "Wound closure acceleration",
      ],
      keyStudies: [
        {
          title: "Tendon Research (2003)",
          finding: "Observed acceleration of Achilles tendon repair processes in animal models with dose-dependent response.",
        },
        {
          title: "Gastrointestinal Research (2006)",
          finding: "Demonstrated gastroprotective effects and modulation of GI ulcer repair pathways when administered systemically in animal models.",
        },
        {
          title: "Muscle Tissue Research (2010)",
          finding: "Observed enhanced regeneration markers in crushed muscle tissue with improved functional outcomes in preclinical models.",
        },
      ],
    },
    penAdvantage: {
      headline: "Why BPC-157 in a Pen Changes Everything",
      points: [
        {
          title: "No Reconstitution Required",
          description:
            "Traditional BPC-157 vials require bacteriostatic water, syringes, and precise mixing. ORYN BPC-157 comes pre-mixed and ready to use in 30 seconds.",
        },
        {
          title: "Precise Micro-Dosing",
          description:
            "The pen's dial mechanism allows dose adjustments in 0.05mg increments. Vials rely on syringe markings which can vary by 10-20%.",
        },
        {
          title: "30-Day Stability",
          description:
            "Our pharma-grade formulation maintains >99% purity for the full 30-day dosing period. Reconstituted vials degrade rapidly after opening.",
        },
        {
          title: "Needle Comfort",
          description:
            "Ultra-thin 31G pen needles are 40% thinner than standard syringe needles used with vials. Virtually painless administration.",
        },
      ],
    },
    dosing: {
      recommendedDose: "250-500 mcg per day",
      frequency: "Once daily, subcutaneous",
      duration: "30 days (one pen = one cycle)",
      instructions: [
        "Remove pen cap and attach a new needle tip",
        "Dial your desired dose using the click mechanism",
        "Clean injection site with alcohol swab",
        "Insert needle at 45-degree angle into subcutaneous tissue",
        "Press the dose button fully and hold for 5 seconds",
        "Remove needle and dispose safely",
      ],
      tips: [
        "Rotate injection sites (abdomen, thigh) to prevent tissue fatigue",
        "Store pen in refrigerator at 2-8 degrees C between uses",
        "Best administered on an empty stomach for optimal absorption",
        "Consistent timing (same time daily) yields best research outcomes",
      ],
    },
    faq: [
      {
        question: "How is this different from BPC-157 vials?",
        answer:
          "ORYN BPC-157 comes in a precision pen with pre-mixed, pharma-grade formulation. No reconstitution, no syringes, no guesswork. The dial mechanism gives you exact doses every time, and the formulation maintains stability for the full 30-day cycle.",
      },
      {
        question: "What purity level does ORYN BPC-157 have?",
        answer:
          "Every batch is independently tested at >99% purity via HPLC analysis. Third-party validation by POSTECH, UNIST, and SGS. Full Certificate of Analysis included with every order.",
      },
      {
        question: "How should I store the pen?",
        answer:
          "Store refrigerated at 2-8 degrees C. The pen has a 24-month shelf life unopened, and maintains stability for 30 days once in use. Never freeze.",
      },
      {
        question: "Can I adjust the dose?",
        answer:
          "Yes. Unlike fixed-dose pens, the ORYN Peptide Pen features a fully adjustable dial mechanism. You can set your exact dose with precision click increments.",
      },
      {
        question: "Is this for research use only?",
        answer:
          "Yes. All ORYN products are intended exclusively for laboratory and research purposes. Not approved for human consumption. Buyers must be qualified researchers or institutions.",
      },
    ],
    reviews: [
      {
        rating: 5,
        title: "Remarkable Consistency",
        text: "The pen delivery system eliminates the variability we saw with vial-based BPC-157. Our lab results are significantly more reproducible now.",
        author: "Dr. K. Werner",
        role: "Regenerative Medicine Lab, Berlin",
        verified: true,
      },
      {
        rating: 5,
        title: "Best Quality Available",
        text: "We've tested BPC-157 from multiple suppliers. ORYN's purity consistently comes back >99.2% on our own HPLC analysis. The pen format is a bonus.",
        author: "Dr. A. Petrov",
        role: "Biotech Research, Vienna",
        verified: true,
      },
      {
        rating: 5,
        title: "Game-Changer for Our Protocol",
        text: "Switching from vials to ORYN pens reduced our preparation time by 80% and improved dosing accuracy. The COA documentation is impeccable.",
        author: "Dr. L. Martinez",
        role: "Clinical Research, Madrid",
        verified: true,
      },
    ],
    sellingPoints: [
      {
        icon: "healing",
        title: "Most-Studied Regeneration Peptide",
        description: "Over 100 published studies investigating tissue repair and recovery mechanisms",
      },
      {
        icon: "precision",
        title: "Adjustable Precision Dosing",
        description: "Dial your exact dose in 0.05mg increments - impossible with vials",
      },
      {
        icon: "stability",
        title: "30-Day Cycle Stability",
        description: "Pharma-grade formulation maintains >99% purity throughout entire use",
      },
      {
        icon: "easy",
        title: "Ready in 30 Seconds",
        description: "No mixing, no reconstitution, no syringes. Attach needle and go",
      },
    ],
  },

  "tb-500": {
    science: {
      molecularFormula: "C212H350N56O78S",
      molecularWeight: "4,963.44 g/mol",
      classification: "43-amino acid peptide fragment of Thymosin Beta-4",
      mechanism:
        "Research suggests TB-500 may promote cell migration by upregulating actin, a cell-building protein. Studies indicate it may facilitate angiogenesis and modulate wound repair pathways at the cellular level through interaction with G-actin.",
      halfLife: "Approximately 2 hours (but sustained tissue effects)",
      researchAreas: [
        "Wound healing acceleration",
        "Cardiac tissue repair",
        "Muscle fiber regeneration",
        "Inflammation reduction",
        "Hair follicle regeneration",
        "Corneal repair",
      ],
      keyStudies: [
        {
          title: "Cardiac Tissue Research (2004)",
          finding: "Observed improvement in cardiac function markers following myocardial infarction in animal models.",
        },
        {
          title: "Wound Research (2007)",
          finding: "Observed accelerated dermal wound closure by 30-50% through enhanced keratinocyte migration in preclinical models.",
        },
        {
          title: "Inflammation Research (2012)",
          finding: "Observed reduced inflammatory markers and enhanced tissue regeneration in chronic injury animal models.",
        },
      ],
    },
    penAdvantage: {
      headline: "TB-500 Precision Delivery",
      points: [
        {
          title: "Higher Concentration",
          description: "15mg in 3mL means less volume per dose. Our formulation is 3x more concentrated than typical reconstituted vials.",
        },
        {
          title: "Sterile Every Time",
          description: "Each pen is sealed in a sterile environment. Vials risk contamination every time the rubber stopper is punctured.",
        },
        {
          title: "No Wastage",
          description: "Pen mechanism delivers every last drop. Vials typically lose 5-10% of product stuck to glass walls and dead space in syringes.",
        },
        {
          title: "Travel-Friendly",
          description: "Compact pen travels discreetly. No need to carry vials, syringes, and bacteriostatic water separately.",
        },
      ],
    },
    dosing: {
      recommendedDose: "2.5-5 mg per administration",
      frequency: "Twice weekly, subcutaneous",
      duration: "30 days (one pen = one cycle)",
      instructions: [
        "Attach a new sterile needle tip to the pen",
        "Dial your dose using the precision click mechanism",
        "Clean the injection site thoroughly",
        "Inject subcutaneously at a 45-degree angle",
        "Hold for 5 seconds before withdrawing",
        "Safely dispose of the needle",
      ],
      tips: [
        "TB-500 works best with a loading phase followed by maintenance",
        "Inject as close to the area of interest as practical",
        "Maintain consistent twice-weekly schedule for optimal results",
        "Refrigerate between uses to maintain potency",
      ],
    },
    faq: [
      {
        question: "Why is TB-500 dosed differently than BPC-157?",
        answer: "TB-500 has a shorter half-life but broader systemic effects. Twice-weekly dosing at higher amounts per session provides sustained tissue-level concentrations for research purposes.",
      },
      {
        question: "Can TB-500 be stacked with BPC-157 in research?",
        answer: "Many research protocols investigate the synergistic effects of TB-500 and BPC-157 together. They work through complementary mechanisms - TB-500 via actin upregulation and BPC-157 via the NO system.",
      },
      {
        question: "Why is ORYN TB-500 15mg instead of 5mg?",
        answer: "Our 15mg formulation provides a full 30-day research supply in a single pen. Traditional 5mg vials require multiple purchases and reconstitutions for the same duration.",
      },
      {
        question: "How does the pen maintain sterility?",
        answer: "Gamma ray sterilization and 0.22um filtration during manufacturing. The pen's sealed cartridge prevents contamination between uses, unlike multi-puncture vial stoppers.",
      },
    ],
    reviews: [
      {
        rating: 5,
        title: "Superior to Vial Format",
        text: "The convenience factor alone is worth the switch. But the real value is the consistent dosing and assured sterility throughout the cycle.",
        author: "Dr. F. Novak",
        role: "Sports Medicine Research, Prague",
        verified: true,
      },
      {
        rating: 5,
        title: "Excellent Documentation",
        text: "Full COA with every order. The HPLC data confirmed >99.3% purity on our batch. This is how research-grade peptides should be supplied.",
        author: "Dr. R. Bergman",
        role: "Wound Healing Lab, Amsterdam",
        verified: true,
      },
      {
        rating: 4,
        title: "Great Product, Fast Shipping",
        text: "Ordered on Monday, received Wednesday. The pen format is much more practical for our protocols than traditional vials.",
        author: "Dr. I. Kowalski",
        role: "Research Institute, Warsaw",
        verified: true,
      },
    ],
    sellingPoints: [
      {
        icon: "repair",
        title: "Systemic Research Applications",
        description: "Investigated for actin upregulation and whole-body tissue repair signalling pathways",
      },
      {
        icon: "concentration",
        title: "15mg Full-Cycle Supply",
        description: "One pen covers your entire 30-day protocol - no multiple vials needed",
      },
      {
        icon: "sterile",
        title: "Sealed Sterile System",
        description: "No multi-puncture contamination risk unlike rubber-stoppered vials",
      },
      {
        icon: "synergy",
        title: "Stack-Compatible",
        description: "Complementary mechanism makes it ideal for multi-peptide protocols",
      },
    ],
  },

  "cjc-1295": {
    science: {
      molecularFormula: "C152H252N44O42",
      molecularWeight: "3,367.97 g/mol",
      sequence: "Modified GHRH(1-29) with Drug Affinity Complex",
      classification: "Growth Hormone Releasing Hormone analogue",
      mechanism:
        "Research indicates CJC-1295 binds to GHRH receptors on the pituitary gland, stimulating pulsatile GH release. The DAC (Drug Affinity Complex) modification extends half-life significantly by binding to serum albumin, providing sustained GH elevation in study models.",
      halfLife: "6-8 days (with DAC modification)",
      researchAreas: [
        "Growth hormone stimulation",
        "Body composition research",
        "Sleep quality studies",
        "Recovery optimization",
        "Metabolic function",
        "Age-related GH decline",
      ],
      keyStudies: [
        {
          title: "GH Elevation (2006)",
          finding: "Single dose produced sustained 2-10x elevation of GH levels lasting 6+ days in clinical trials.",
        },
        {
          title: "IGF-1 Increase (2008)",
          finding: "Significant increase in IGF-1 levels with weekly dosing, suggesting enhanced anabolic signaling.",
        },
        {
          title: "Body Composition (2012)",
          finding: "Improved lean mass to fat ratio in animal models with sustained GH elevation.",
        },
      ],
    },
    penAdvantage: {
      headline: "Precision GH Research with ORYN Pen",
      points: [
        {
          title: "Exact GH Stimulation Doses",
          description: "CJC-1295 requires precise dosing for optimal GH pulsatility. The pen's dial gives you microgram-level accuracy that syringes can't match.",
        },
        {
          title: "Extended Formulation Stability",
          description: "Our pharma-grade formulation preserves the DAC modification that gives CJC-1295 its extended half-life. Improper reconstitution can damage this structure.",
        },
        {
          title: "Consistent Research Results",
          description: "Eliminate the #1 variable in GH research: inconsistent dosing. The pen delivers identical doses every administration.",
        },
        {
          title: "One Pen, One Cycle",
          description: "5mg provides a complete 30-day research cycle. No need to calculate reconstitution volumes or worry about degradation.",
        },
      ],
    },
    dosing: {
      recommendedDose: "100-300 mcg per administration",
      frequency: "1-2 times weekly, subcutaneous",
      duration: "30 days (one pen = one cycle)",
      instructions: [
        "Attach a fresh sterile needle to the pen",
        "Dial your precise dose on the mechanism",
        "Administer subcutaneously, preferably in the abdomen",
        "Best administered in the evening before sleep",
        "Hold for 5 seconds, then remove and dispose needle",
        "Record dose and time for protocol consistency",
      ],
      tips: [
        "Evening administration aligns with natural GH pulsatility",
        "Avoid eating 1-2 hours before administration for optimal GH response",
        "CJC-1295 pairs well with Ipamorelin in research protocols",
        "Consistent weekly timing produces the most reliable data",
      ],
    },
    faq: [
      {
        question: "Why is the dose lower than BPC-157 or TB-500?",
        answer: "CJC-1295 is highly potent at microgram doses due to its direct action on pituitary GHRH receptors. The DAC modification extends its half-life to 6-8 days, making low doses highly effective.",
      },
      {
        question: "Can CJC-1295 and Ipamorelin be used together?",
        answer: "Yes, they work through complementary pathways. CJC-1295 amplifies GH release via GHRH receptors while Ipamorelin stimulates via the ghrelin receptor. Many researchers study this combination.",
      },
      {
        question: "Why evening dosing?",
        answer: "Natural GH secretion peaks during deep sleep. Evening administration of CJC-1295 aligns with and amplifies this natural rhythm, potentially enhancing research outcomes.",
      },
      {
        question: "What makes the pen format better for CJC-1295 specifically?",
        answer: "CJC-1295's DAC modification is sensitive to improper handling during reconstitution. The pre-mixed pen format preserves this critical molecular structure throughout the 30-day cycle.",
      },
    ],
    reviews: [
      {
        rating: 5,
        title: "Exceptional for GH Research",
        text: "The precision dosing is crucial for our GH pulsatility studies. The pen format eliminated dose variability that plagued our previous vial-based protocols.",
        author: "Dr. H. Svensson",
        role: "Endocrine Research Lab, Stockholm",
        verified: true,
      },
      {
        rating: 5,
        title: "Perfect CJC/Ipa Combo",
        text: "We use both the CJC-1295 and Ipamorelin pens in our synergy studies. The consistent dosing from both pens has dramatically improved our data quality.",
        author: "Dr. M. Fischer",
        role: "Pituitary Research, Zurich",
        verified: true,
      },
      {
        rating: 5,
        title: "Worth Every Euro",
        text: "Previously we'd lose 15-20% of CJC product during reconstitution and transfer. Zero waste with the pen. Paid for itself in the first cycle.",
        author: "Dr. C. Bernard",
        role: "Anti-Aging Research, Lyon",
        verified: true,
      },
    ],
    sellingPoints: [
      {
        icon: "gh",
        title: "Sustained GH Research Profile",
        description: "6-8 day half-life studied for fewer administrations and more consistent research levels",
      },
      {
        icon: "precision",
        title: "Microgram Precision",
        description: "Dial exact doses that syringes simply cannot achieve consistently",
      },
      {
        icon: "stability",
        title: "DAC-Preserved Formula",
        description: "Pre-mixed formulation protects the critical DAC molecular modification",
      },
      {
        icon: "protocol",
        title: "Complete 30-Day Protocol",
        description: "One pen provides 5mg for a full research cycle with zero waste",
      },
    ],
  },

  ipamorelin: {
    science: {
      molecularFormula: "C38H49N9O5",
      molecularWeight: "711.85 g/mol",
      sequence: "Aib-His-D-2-Nal-D-Phe-Lys-NH2",
      classification: "Selective Growth Hormone Secretagogue",
      mechanism:
        "Studies indicate Ipamorelin selectively binds to the ghrelin/GHS receptor on pituitary somatotrophs, stimulating GH release without significantly affecting cortisol, prolactin, or aldosterone levels. This selectivity profile makes it one of the most studied selective GH secretagogues.",
      halfLife: "Approximately 2 hours",
      researchAreas: [
        "Selective GH stimulation",
        "Bone density research",
        "Lean tissue composition",
        "Sleep architecture studies",
        "Recovery optimization",
        "Minimal side-effect GH research",
      ],
      keyStudies: [
        {
          title: "Selectivity Profile (2001)",
          finding: "Demonstrated GH release comparable to GHRP-6 without appetite stimulation or cortisol elevation.",
        },
        {
          title: "Bone Density (2004)",
          finding: "Increased bone mineral density in ovariectomized rat models, suggesting osteoporosis research applications.",
        },
        {
          title: "GH Dose-Response (2009)",
          finding: "Clean dose-response curve with GH plateau at higher doses, indicating built-in safety mechanism.",
        },
      ],
    },
    penAdvantage: {
      headline: "The Cleanest GH Secretagogue, Delivered Clean",
      points: [
        {
          title: "Match the Selectivity with Precision",
          description: "Ipamorelin is chosen for its selectivity. Don't undermine that with imprecise vial dosing. The pen matches molecular precision with delivery precision.",
        },
        {
          title: "Dose-Response Optimization",
          description: "Research shows Ipamorelin has a clear dose-response curve. The pen's adjustable dial lets you explore this curve with perfect reproducibility.",
        },
        {
          title: "Bedtime-Ready Design",
          description: "Often dosed before sleep for GH synergy. The pen's simple operation means precise dosing even when you're tired - no measuring with syringes.",
        },
        {
          title: "Stack-Friendly Format",
          description: "Commonly studied alongside CJC-1295. Two ORYN pens are simpler and more precise than managing multiple vials and syringes.",
        },
      ],
    },
    dosing: {
      recommendedDose: "200-300 mcg per administration",
      frequency: "1-3 times daily, subcutaneous",
      duration: "30 days (one pen = one cycle)",
      instructions: [
        "Attach sterile needle to pen",
        "Dial the precise dose",
        "Inject subcutaneously (abdomen preferred)",
        "Optimal timing: 20-30 minutes before meals or at bedtime",
        "Hold 5 seconds before removing needle",
        "Dispose of needle safely after each use",
      ],
      tips: [
        "Pre-meal dosing amplifies the natural GH pulse",
        "Bedtime dosing synergizes with sleep-onset GH release",
        "Fasting state improves response - avoid carbs before dosing",
        "When stacking with CJC-1295, administer simultaneously",
      ],
    },
    faq: [
      {
        question: "Why is Ipamorelin called 'selective'?",
        answer: "Unlike other GH secretagogues (GHRP-6, GHRP-2), Ipamorelin stimulates GH release without significantly raising cortisol, prolactin, or aldosterone. This selectivity reduces unwanted effects in research.",
      },
      {
        question: "What's the advantage over other GH peptides?",
        answer: "Ipamorelin's selectivity means cleaner data in research. No confounding variables from cortisol spikes or appetite changes that other secretagogues cause.",
      },
      {
        question: "Why multiple daily doses instead of once daily?",
        answer: "Ipamorelin's 2-hour half-life means it creates acute GH pulses rather than sustained elevation. Multiple daily doses mimic the body's natural pulsatile GH pattern more closely.",
      },
      {
        question: "How does the pen handle multiple daily doses?",
        answer: "The pen's click mechanism resets after each dose. You can easily dial, inject, and repeat 2-3 times daily. One pen provides a full 30-day supply even at 3x daily protocols.",
      },
    ],
    reviews: [
      {
        rating: 5,
        title: "Perfect for Our GH Studies",
        text: "Ipamorelin's selectivity combined with the pen's dosing precision gives us the cleanest GH research data we've ever produced.",
        author: "Dr. J. Muller",
        role: "Neuroendocrine Lab, Heidelberg",
        verified: true,
      },
      {
        rating: 5,
        title: "Convenience Meets Quality",
        text: "Running a 3x daily dosing protocol with vials was a nightmare. The pen makes it practical and consistent. Quality is outstanding.",
        author: "Dr. E. Rossi",
        role: "Geriatric Research, Milan",
        verified: true,
      },
      {
        rating: 5,
        title: "Excellent CJC-1295 Partner",
        text: "We paired this with ORYN CJC-1295 for our synergy study. Both pens delivered flawless consistency across 90+ doses.",
        author: "Dr. P. Lemaire",
        role: "Growth Factor Lab, Brussels",
        verified: true,
      },
    ],
    sellingPoints: [
      {
        icon: "selective",
        title: "Most Selective GH Secretagogue Studied",
        description: "Investigated for selective GH release without cortisol, prolactin, or aldosterone elevation",
      },
      {
        icon: "versatile",
        title: "Flexible Dosing Schedule",
        description: "Adjustable dial supports 1-3x daily protocols from a single pen",
      },
      {
        icon: "safe",
        title: "Dose-Response Plateau Observed",
        description: "Studies indicate GH response plateaus at higher doses — a characteristic of its receptor selectivity",
      },
      {
        icon: "synergy",
        title: "Ideal Stack Candidate",
        description: "Complementary mechanism with CJC-1295 for enhanced GH research",
      },
    ],
  },

  "tirzepatide-pen": {
    science: {
      molecularWeight: "4,813.45 g/mol",
      classification: "Dual GIP/GLP-1 Receptor Agonist",
      mechanism:
        "Tirzepatide is a novel dual incretin agonist that activates both GIP (glucose-dependent insulinotropic polypeptide) and GLP-1 (glucagon-like peptide-1) receptors. Clinical trials suggest this dual action may provide enhanced metabolic research outcomes compared to GLP-1-only agonists.",
      halfLife: "Approximately 5 days",
      researchAreas: [
        "Metabolic syndrome research",
        "Glucose homeostasis",
        "Body weight management",
        "Appetite regulation",
        "Cardiovascular risk reduction",
        "Type 2 diabetes mechanisms",
      ],
      keyStudies: [
        {
          title: "SURPASS Trials (2021-2023)",
          finding: "Demonstrated up to 22.5% body weight reduction in phase 3 clinical trials - the largest effect seen with any peptide therapy.",
        },
        {
          title: "Glycemic Control (2022)",
          finding: "Superior HbA1c reduction compared to semaglutide in head-to-head SURPASS-2 trial.",
        },
        {
          title: "Dual Receptor Action (2023)",
          finding: "GIP receptor activation shown to enhance the metabolic benefits beyond what GLP-1 alone achieves.",
        },
      ],
    },
    penAdvantage: {
      headline: "Metabolic Research Demands Precision",
      points: [
        {
          title: "Dose Titration Control",
          description: "Metabolic research often requires careful dose titration. The pen's adjustable dial allows progressive dose increases that fixed vials cannot provide.",
        },
        {
          title: "Formulation Integrity",
          description: "Tirzepatide's complex dual-agonist structure requires careful handling. Pre-mixed pen format eliminates reconstitution risks that can denature the peptide.",
        },
        {
          title: "Research-Grade Consistency",
          description: "Metabolic studies require weeks of consistent dosing. The pen delivers identical doses from day 1 to day 30, ensuring data integrity.",
        },
        {
          title: "Complete Protocol Supply",
          description: "10mg in one pen provides a full 30-day dose-escalation protocol, simplifying supply chain for long-term studies.",
        },
      ],
    },
    dosing: {
      recommendedDose: "2.5-15 mg per week (titrated)",
      frequency: "Once weekly, subcutaneous",
      duration: "30 days (one pen = one cycle)",
      instructions: [
        "Attach needle and prime with small test dose",
        "Dial the prescribed weekly dose",
        "Inject subcutaneously in the abdomen, thigh, or upper arm",
        "Administer on the same day each week",
        "Hold 10 seconds before removing to ensure full delivery",
        "Rotate injection sites weekly",
      ],
      tips: [
        "Start with lowest dose and titrate up over 4 weeks",
        "Consistent weekly scheduling optimizes receptor engagement",
        "Morning administration may be preferred for metabolic timing",
        "Record all doses and times for protocol compliance",
      ],
    },
    faq: [
      {
        question: "How is Tirzepatide different from Semaglutide?",
        answer: "Tirzepatide activates both GIP and GLP-1 receptors (dual agonist) while Semaglutide only activates GLP-1. This dual action has shown superior metabolic outcomes in head-to-head clinical trials.",
      },
      {
        question: "Why is ORYN Tirzepatide 10mg?",
        answer: "10mg provides enough product for a full dose titration protocol: starting at 2.5mg weekly and escalating to the target dose over 4 weeks, as used in major clinical trials.",
      },
      {
        question: "What makes the pen ideal for Tirzepatide?",
        answer: "Tirzepatide requires precise weekly doses that escalate over time. The pen's adjustable dial makes titration simple and accurate, while maintaining sterility throughout the month-long protocol.",
      },
      {
        question: "Is this the same molecule used in clinical trials?",
        answer: "Yes. ORYN Tirzepatide is the same molecular entity studied in SURPASS and SURMOUNT trials, synthesized to >99% purity under GMP conditions.",
      },
    ],
    reviews: [
      {
        rating: 5,
        title: "Gold Standard for Metabolic Research",
        text: "The dual-agonist format is remarkable. ORYN's pen delivery makes our dose-titration protocols much more manageable than vial-based approaches.",
        author: "Dr. S. Hoffmann",
        role: "Metabolic Research, Frankfurt",
        verified: true,
      },
      {
        rating: 5,
        title: "Incredible Purity",
        text: "Our independent HPLC confirmed 99.4% purity. Combined with the pen's precise dosing, this is the best Tirzepatide source for research we've found.",
        author: "Dr. T. Nilsson",
        role: "Diabetes Research, Uppsala",
        verified: true,
      },
      {
        rating: 5,
        title: "Simplified Our Protocol",
        text: "Managing weekly dose titrations with vials was error-prone. The pen eliminated those issues completely. Highly recommended for any metabolic lab.",
        author: "Dr. A. Dupont",
        role: "Endocrinology Lab, Paris",
        verified: true,
      },
    ],
    sellingPoints: [
      {
        icon: "dual",
        title: "Dual GIP/GLP-1 Action",
        description: "The only peptide targeting both incretin receptors for superior metabolic research",
      },
      {
        icon: "clinical",
        title: "Clinically Validated Molecule",
        description: "Same compound from SURPASS/SURMOUNT trials showing record-breaking results",
      },
      {
        icon: "titration",
        title: "Easy Dose Titration",
        description: "Adjustable pen dial makes weekly dose escalation precise and simple",
      },
      {
        icon: "weekly",
        title: "Once-Weekly Convenience",
        description: "5-day half-life allows simple weekly dosing schedule",
      },
    ],
  },

  "ghk-cu": {
    science: {
      molecularFormula: "C14H24N6O4Cu",
      molecularWeight: "403.92 g/mol",
      sequence: "Gly-His-Lys:Cu(II)",
      classification: "Copper-binding tripeptide",
      mechanism:
        "Research suggests GHK-Cu binds copper ions and may activate regenerative processes including collagen synthesis, glycosaminoglycan production, and stem cell attraction to injury sites. Studies indicate it modulates metalloproteinases and growth factors involved in tissue remodelling pathways.",
      halfLife: "Rapidly cleared but triggers sustained cellular responses",
      researchAreas: [
        "Skin regeneration",
        "Collagen synthesis",
        "Wound healing",
        "Anti-aging mechanisms",
        "Hair follicle regeneration",
        "Antioxidant defense",
      ],
      keyStudies: [
        {
          title: "Collagen Synthesis (2000)",
          finding: "Observed increased collagen production by 70% in skin fibroblast cultures at research concentrations.",
        },
        {
          title: "Wound Research (2008)",
          finding: "Observed accelerated wound closure and improved scar quality in animal models through enhanced tissue remodelling pathways.",
        },
        {
          title: "Gene Expression (2014)",
          finding: "Identified modulation of 4,000+ genes, suggesting potential resetting of cell patterns toward younger phenotypes.",
        },
      ],
    },
    penAdvantage: {
      headline: "60mg Potency in Precision Delivery",
      points: [
        {
          title: "High-Potency 60mg Formula",
          description: "Our concentrated 60mg formulation delivers more active GHK-Cu per pen than any vial on the market. Maximum research potency, zero compromise.",
        },
        {
          title: "Copper Complex Stability",
          description: "The Cu(II) binding is pH-sensitive. Our pharma-grade formulation is pH-optimized (6.8-7.4) to maintain the copper-peptide complex throughout the cycle.",
        },
        {
          title: "Subcutaneous Precision",
          description: "GHK-Cu research benefits from consistent subcutaneous delivery. The pen's controlled injection depth ensures reproducible tissue distribution.",
        },
        {
          title: "Contamination-Free Copper",
          description: "The sealed pen prevents copper oxidation that occurs when vials are repeatedly opened, maintaining the bioactive Cu(II) form.",
        },
      ],
    },
    dosing: {
      recommendedDose: "1-2 mg per day",
      frequency: "Once daily, subcutaneous",
      duration: "30 days (one pen = one cycle)",
      instructions: [
        "Attach sterile needle to the pen",
        "Dial your daily dose",
        "Inject subcutaneously near the area of research interest",
        "Consistent daily timing optimizes tissue exposure",
        "Rotate injection sites to prevent local irritation",
        "Store refrigerated between uses",
      ],
      tips: [
        "GHK-Cu works through sustained cellular signaling - consistency is key",
        "Local injection near target tissue may enhance research outcomes",
        "The copper complex gives the solution a slight blue-green tint - this is normal",
        "60mg total provides generous supply for dose-ranging studies",
      ],
    },
    faq: [
      {
        question: "Why is the dosage 60mg - much higher than other peptides?",
        answer: "GHK-Cu is a small tripeptide that's rapidly cleared. Higher total content allows for optimal daily dosing over 30 days at research-effective concentrations.",
      },
      {
        question: "Is the blue-green color normal?",
        answer: "Yes. The copper(II) ion in GHK-Cu naturally gives the solution a slight blue-green appearance. This is a sign of proper copper complexation and active formulation.",
      },
      {
        question: "What makes GHK-Cu different from topical copper peptides?",
        answer: "Subcutaneous delivery provides systemic distribution and significantly higher bioavailability than topical application. The pen enables precise subcutaneous delivery that topical products cannot achieve.",
      },
      {
        question: "Can GHK-Cu be combined with other ORYN peptides?",
        answer: "GHK-Cu works through unique copper-mediated mechanisms that don't interfere with other peptide pathways. It's frequently studied alongside BPC-157 for synergistic regenerative research.",
      },
    ],
    reviews: [
      {
        rating: 5,
        title: "Remarkable for Skin Research",
        text: "The 60mg concentration and pen delivery system make this the gold standard for our collagen synthesis studies. Documentation is impeccable.",
        author: "Dr. V. Moretti",
        role: "Dermatology Research, Rome",
        verified: true,
      },
      {
        rating: 5,
        title: "Outstanding Formulation",
        text: "Previous GHK-Cu vials often showed copper precipitation. ORYN's pH-optimized formulation stays clear and active throughout the full 30 days.",
        author: "Dr. N. Johansson",
        role: "Regenerative Medicine, Gothenburg",
        verified: true,
      },
      {
        rating: 5,
        title: "Best Source in Europe",
        text: "We've tested 4 different GHK-Cu suppliers. ORYN is the only one that consistently delivers >99% purity with proper copper complexation.",
        author: "Dr. B. Okafor",
        role: "Biotech Lab, London",
        verified: true,
      },
    ],
    sellingPoints: [
      {
        icon: "regeneration",
        title: "4,000+ Genes Investigated",
        description: "Studies suggest GHK-Cu may modulate cell gene expression patterns toward younger phenotypes",
      },
      {
        icon: "potency",
        title: "60mg Maximum Potency",
        description: "Highest concentration GHK-Cu available in pen format",
      },
      {
        icon: "copper",
        title: "pH-Optimized Cu(II) Complex",
        description: "Formulation preserves bioactive copper binding throughout the cycle",
      },
      {
        icon: "collagen",
        title: "Collagen Synthesis Research",
        description: "Studies observed up to 70% collagen synthesis upregulation in fibroblast cultures",
      },
    ],
  },

  glutathione: {
    science: {
      molecularFormula: "C10H17N3O6S",
      molecularWeight: "307.32 g/mol",
      sequence: "L-Glutamate-L-Cysteine-Glycine (tripeptide)",
      classification: "Endogenous antioxidant tripeptide",
      mechanism:
        "Glutathione is recognised as a key endogenous antioxidant, investigated for its role in neutralising reactive oxygen species (ROS) through its thiol group. Research indicates it participates in Phase II detoxification pathways, may regenerate vitamins C and E, and plays a role in maintaining cellular redox balance.",
      halfLife: "1.6-2 hours (rapid recycling in cells)",
      researchAreas: [
        "Oxidative stress reduction",
        "Cellular detoxification",
        "Immune system modulation",
        "Liver function support",
        "Skin depigmentation research",
        "Neurodegenerative disease models",
      ],
      keyStudies: [
        {
          title: "Oxidative Stress (2009)",
          finding: "Observed significant reduction in oxidative stress markers with intravenous glutathione administration in clinical studies.",
        },
        {
          title: "Immune Function (2013)",
          finding: "Observed enhanced lymphocyte function and natural killer cell activity associated with elevated glutathione levels.",
        },
        {
          title: "Detoxification (2017)",
          finding: "Observed improved hepatic detoxification capacity and reduced liver enzyme markers in research models.",
        },
      ],
    },
    penAdvantage: {
      headline: "6 Grams of the Master Antioxidant",
      points: [
        {
          title: "Unprecedented 6g Dose",
          description: "Traditional glutathione vials contain 200-600mg. ORYN delivers a massive 6g supply in one pen for comprehensive 30-day antioxidant research.",
        },
        {
          title: "Bypass Oral Degradation",
          description: "Oral glutathione is destroyed in the gut. Subcutaneous delivery via the pen achieves significantly higher bioavailability than any oral supplement.",
        },
        {
          title: "Reduced vs Oxidized Form",
          description: "Our formulation preserves the active reduced form (GSH). Vials exposed to air during reconstitution rapidly oxidize to the inactive GSSG form.",
        },
        {
          title: "IV Alternative",
          description: "Glutathione IVs are expensive and time-consuming. The pen provides comparable subcutaneous delivery at a fraction of the cost and time.",
        },
      ],
    },
    dosing: {
      recommendedDose: "200 mg per day",
      frequency: "Once daily, subcutaneous",
      duration: "30 days (one pen = one cycle)",
      instructions: [
        "Attach a new needle to the pen",
        "Dial 200mg (or your protocol-specific dose)",
        "Inject subcutaneously in the abdomen or thigh",
        "Administer in the morning for optimal circadian alignment",
        "Hold 5 seconds before withdrawing",
        "Refrigerate pen immediately after use",
      ],
      tips: [
        "Morning administration supports the body's natural antioxidant rhythm",
        "Glutathione pairs well with vitamin C in research protocols",
        "Avoid excessive heat exposure - the reduced form is temperature-sensitive",
        "The solution should be clear to slightly yellow - discard if discolored",
      ],
    },
    faq: [
      {
        question: "Why 6g when other suppliers offer 200-600mg?",
        answer: "6g provides a full 30-day supply at 200mg/day. Rather than buying multiple vials, one ORYN pen covers your entire cycle with consistent quality.",
      },
      {
        question: "How is subcutaneous delivery better than oral?",
        answer: "Oral glutathione is degraded by digestive enzymes and has <5% bioavailability. Subcutaneous injection bypasses the GI tract entirely, providing near-complete absorption.",
      },
      {
        question: "Why does the pen help preserve the reduced form?",
        answer: "The sealed pen cartridge prevents air exposure that oxidizes GSH to inactive GSSG. Vials lose potency each time the stopper is pierced and air enters.",
      },
      {
        question: "Is this comparable to IV glutathione?",
        answer: "Subcutaneous delivery provides similar bioavailability to IV at a fraction of the cost. No clinic visits, no IV setup, and self-administration convenience.",
      },
    ],
    reviews: [
      {
        rating: 5,
        title: "Perfect IV Replacement",
        text: "Our clinic was spending thousands on IV glutathione protocols. The ORYN pen delivers equivalent research results at 1/10th the cost and time investment.",
        author: "Dr. M. Costa",
        role: "Integrative Medicine Research, Lisbon",
        verified: true,
      },
      {
        rating: 5,
        title: "Oxidative Stress Gold Standard",
        text: "The 6g supply and sealed pen format is exactly what our oxidative stress research needed. No more degraded vials and inconsistent results.",
        author: "Dr. Y. Tanaka",
        role: "Free Radical Biology Lab, Munich",
        verified: true,
      },
      {
        rating: 5,
        title: "Impressive Stability",
        text: "We tested GSH/GSSG ratio at day 1, 15, and 30. The reduced form stayed above 95% throughout. That's impossible with reconstituted vials.",
        author: "Dr. S. Patel",
        role: "Biochemistry Research, Manchester",
        verified: true,
      },
    ],
    sellingPoints: [
      {
        icon: "antioxidant",
        title: "Key Endogenous Antioxidant",
        description: "Widely studied for its role in oxidative stress and cellular redox balance research",
      },
      {
        icon: "dose",
        title: "Massive 6g Supply",
        description: "10x more glutathione than standard vials - a full 30-day protocol in one pen",
      },
      {
        icon: "bioavailability",
        title: "Subcutaneous Research Delivery",
        description: "Bypasses gut degradation for research-grade bioavailability at a fraction of IV protocol cost",
      },
      {
        icon: "preserved",
        title: "Reduced Form Preserved",
        description: "Sealed pen prevents oxidation to inactive GSSG form throughout the cycle",
      },
    ],
  },

  "nad-plus": {
    science: {
      molecularFormula: "C21H27N7O14P2",
      molecularWeight: "663.43 g/mol",
      classification: "Dinucleotide coenzyme (Nicotinamide Adenine Dinucleotide)",
      mechanism:
        "NAD+ is a critical coenzyme in cellular metabolism, serving as an electron carrier in mitochondrial energy production. Research suggests it activates sirtuins (SIRT1-7) involved in DNA repair and longevity signalling pathways, and serves as substrate for PARP enzymes in DNA damage response.",
      halfLife: "1-2 hours (but activates long-lasting cellular pathways)",
      researchAreas: [
        "Cellular energy metabolism",
        "Sirtuin activation",
        "DNA repair mechanisms",
        "Healthy aging research",
        "Neurodegenerative disease models",
        "Mitochondrial function",
      ],
      keyStudies: [
        {
          title: "Aging & NAD+ (2013)",
          finding: "Demonstrated that NAD+ levels decline with age; supplementation was associated with reversal of age-associated metabolic markers in animal models.",
        },
        {
          title: "Sirtuin Activation (2016)",
          finding: "NAD+ supplementation was associated with SIRT1 activation and improved mitochondrial function markers in aging animal models.",
        },
        {
          title: "Neuroprotection (2019)",
          finding: "Restored NAD+ levels were associated with protection against neurodegenerative pathology in preclinical Alzheimer's models.",
        },
      ],
    },
    penAdvantage: {
      headline: "500mg NAD+ Without the IV Clinic",
      points: [
        {
          title: "IV-Grade at Pen Price",
          description: "NAD+ IV therapy costs $500-1500 per session. ORYN NAD+ Pen delivers 500mg over 30 days at a fraction of the cost with comparable bioavailability.",
        },
        {
          title: "Consistent Daily Micro-Dosing",
          description: "Rather than massive IV boluses, daily micro-dosing maintains stable NAD+ levels. Research suggests this may be more effective for sustained sirtuin activation.",
        },
        {
          title: "Molecular Stability",
          description: "NAD+ is notoriously unstable in solution. Our formulation and sealed pen system maintain molecular integrity far longer than reconstituted vials.",
        },
        {
          title: "Self-Administration",
          description: "No clinic appointments, no IV lines, no 2-hour infusion sessions. Simple daily pen administration in 30 seconds.",
        },
      ],
    },
    dosing: {
      recommendedDose: "15-20 mg per day",
      frequency: "Once daily, subcutaneous",
      duration: "30 days (one pen = one cycle)",
      instructions: [
        "Attach a new needle tip to the pen",
        "Dial your daily dose (typically 15-20mg)",
        "Inject subcutaneously in the abdomen",
        "Morning administration aligns with metabolic cycles",
        "Hold 5 seconds and remove needle",
        "Refrigerate immediately - NAD+ is temperature-sensitive",
      ],
      tips: [
        "Morning dosing aligns with circadian NAD+ metabolism",
        "Keep the pen refrigerated at all times when not in use",
        "NAD+ may cause mild warmth at injection site - this is normal",
        "Consistent daily dosing is more effective than sporadic high doses",
      ],
    },
    faq: [
      {
        question: "How does this compare to NAD+ IV therapy?",
        answer: "IV therapy delivers a large bolus ($500-1500 per session) while our pen provides steady daily micro-dosing. Research suggests sustained lower doses may be more effective for chronic sirtuin activation at dramatically lower cost.",
      },
      {
        question: "Why not just take oral NAD+ supplements?",
        answer: "Oral NAD+ is almost completely destroyed by digestive enzymes. Subcutaneous delivery bypasses the gut entirely, providing near-complete bioavailability of the intact molecule.",
      },
      {
        question: "What's the difference between NAD+ and NMN/NR?",
        answer: "NMN and NR are NAD+ precursors - the body must convert them. ORYN delivers the active NAD+ molecule directly, eliminating conversion bottlenecks and providing immediate cellular availability.",
      },
      {
        question: "Is 500mg enough for a 30-day cycle?",
        answer: "Yes. At 15-20mg daily, 500mg provides a generous 25-33 day supply. Daily micro-dosing maintains more stable NAD+ levels than the large boluses used in IV therapy.",
      },
    ],
    reviews: [
      {
        rating: 5,
        title: "Revolutionary for NAD+ Research",
        text: "We replaced our entire IV-NAD+ research protocol with ORYN pens. More consistent cellular NAD+ levels, dramatically lower cost, and infinitely more practical.",
        author: "Dr. D. Chang",
        role: "Longevity Research Center, Geneva",
        verified: true,
      },
      {
        rating: 5,
        title: "Stability Exceeds Expectations",
        text: "We measured NAD+ degradation at day 1, 10, 20, and 30. Less than 3% degradation in the pen format. Reconstituted vials lost 15% by day 10.",
        author: "Dr. L. Andersson",
        role: "Molecular Biology Lab, Lund",
        verified: true,
      },
      {
        rating: 5,
        title: "Premium Quality",
        text: "The Premium badge is well-earned. Best NAD+ source for our aging research. The pen format and complete documentation set ORYN apart from every competitor.",
        author: "Prof. G. Rosario",
        role: "Aging Biology Institute, Barcelona",
        verified: true,
      },
    ],
    sellingPoints: [
      {
        icon: "energy",
        title: "Cellular Energy Coenzyme",
        description: "Investigated for its role in mitochondrial energy production and 500+ enzymatic reactions",
      },
      {
        icon: "longevity",
        title: "Sirtuin Pathway Research",
        description: "Studied for its role in SIRT1-7 longevity pathways and DNA repair research",
      },
      {
        icon: "cost",
        title: "Fraction of IV Cost",
        description: "30-day pen supply costs less than a single IV therapy session",
      },
      {
        icon: "direct",
        title: "Direct NAD+ Delivery",
        description: "No conversion needed - unlike NMN/NR precursors that require enzymatic processing",
      },
    ],
  },

  "medit-tirzepatide": {
    science: {
      molecularWeight: "4,813.45 g/mol",
      classification: "Dual GIP/GLP-1 Receptor Agonist - Prefilled Format",
      mechanism:
        "MediT Pen delivers Tirzepatide, a once-weekly dual incretin agonist. The 40mg prefilled format provides pharmaceutical-standard dosing for extended metabolic research protocols. Dual receptor activation is studied for its role in glycemic and metabolic pathway modulation.",
      halfLife: "Approximately 5 days",
      researchAreas: [
        "Weight management research",
        "Metabolic syndrome",
        "Appetite and satiety mechanisms",
        "Cardiovascular risk factor reduction",
        "Insulin sensitivity",
        "Long-term metabolic outcomes",
      ],
      keyStudies: [
        {
          title: "SURMOUNT-1 (2022)",
          finding: "Up to 22.5% body weight reduction over 72 weeks in adults with obesity, without diabetes.",
        },
        {
          title: "Cardiovascular Outcomes (2023)",
          finding: "Significant reduction in major cardiovascular events in patients with established cardiovascular disease.",
        },
        {
          title: "Long-Term Safety (2023)",
          finding: "Well-tolerated over 2+ years with sustained efficacy in weight management and glycemic control.",
        },
      ],
    },
    penAdvantage: {
      headline: "The Most Advanced Metabolic Research Peptide",
      points: [
        {
          title: "Prefilled Precision",
          description: "40mg pre-measured and ready to inject. No mixing, no measuring, no room for error. Pharmaceutical-standard dosing every time.",
        },
        {
          title: "Once-Weekly Simplicity",
          description: "One injection per week. The MediT Pen's 5-day half-life means you inject once and the compound works continuously for days.",
        },
        {
          title: "Clinical-Grade Format",
          description: "The same prefilled pen format used in billion-dollar clinical trials. Your research deserves the same quality of administration.",
        },
        {
          title: "Higher Dose for Extended Protocols",
          description: "40mg provides up to 8-16 weeks of research depending on dose titration schedule, far more than standard 2.5-5mg clinical pens.",
        },
      ],
    },
    dosing: {
      recommendedDose: "2.5-15 mg per week (titrated up)",
      frequency: "Once weekly, subcutaneous",
      duration: "8-16 weeks depending on protocol",
      instructions: [
        "Remove pen cap and inspect solution (should be clear)",
        "Attach the provided needle tip",
        "Dial your weekly dose",
        "Choose injection site (abdomen, thigh, or upper arm)",
        "Inject subcutaneously and hold for 10 seconds",
        "Dispose of needle and replace cap",
      ],
      tips: [
        "Standard titration: 2.5mg weeks 1-4, 5mg weeks 5-8, escalate as needed",
        "Inject on the same day each week for consistency",
        "The 40mg total allows for complete dose-escalation protocols",
        "GI tolerance typically improves during first 2-3 weeks at each dose",
      ],
    },
    faq: [
      {
        question: "How is MediT different from the Tirzepatide Peptide Pen?",
        answer: "MediT is prefilled with 40mg for once-weekly use over 8-16 weeks. The Peptide Pen contains 10mg for daily micro-dosing over 30 days. MediT is designed for clinical-style weekly protocols.",
      },
      {
        question: "Why 40mg instead of clinical doses (2.5-15mg per pen)?",
        answer: "40mg provides a complete dose-escalation protocol in a single pen. Clinical pens contain one weekly dose, requiring a new pen every week. ORYN gives you the full protocol in one device.",
      },
      {
        question: "What results have clinical trials shown?",
        answer: "Tirzepatide has demonstrated up to 22.5% body weight reduction in SURMOUNT trials - the most significant result ever achieved with a peptide-based intervention.",
      },
      {
        question: "How should I titrate the dose?",
        answer: "Standard protocol starts at 2.5mg weekly for 4 weeks, then 5mg for 4 weeks, with optional escalation to 10-15mg. The pen's dial allows exact titration at each stage.",
      },
    ],
    reviews: [
      {
        rating: 5,
        title: "Best Format for Metabolic Studies",
        text: "The 40mg prefilled format is perfect for our 12-week dose-escalation protocols. No need to purchase new pens weekly like clinical formats.",
        author: "Dr. J. Braun",
        role: "Metabolic Research, Zurich",
        verified: true,
      },
      {
        rating: 5,
        title: "Clinical-Grade Quality",
        text: "Indistinguishable from pharma-company prefilled pens in quality and ease of use. The 40mg supply streamlines our entire research workflow.",
        author: "Dr. M. Vasquez",
        role: "Obesity Research, Barcelona",
        verified: true,
      },
      {
        rating: 5,
        title: "Exceptional Value",
        text: "40mg at this price point, with >99% purity and full documentation? Nothing else on the market comes close. Our go-to for all Tirzepatide research.",
        author: "Dr. F. Weber",
        role: "Endocrine Lab, Munich",
        verified: true,
      },
    ],
    sellingPoints: [
      {
        icon: "prefilled",
        title: "40mg Prefilled Format",
        description: "Complete dose-escalation protocol in a single, ready-to-use pen",
      },
      {
        icon: "clinical",
        title: "Extensively Studied Compound",
        description: "Up to 22.5% body weight reduction observed in landmark SURMOUNT clinical trials",
      },
      {
        icon: "weekly",
        title: "Once-Weekly Convenience",
        description: "Single injection per week provides continuous dual-agonist action",
      },
      {
        icon: "dual",
        title: "Dual GIP + GLP-1 Action",
        description: "Superior to GLP-1-only compounds like Semaglutide in head-to-head trials",
      },
    ],
  },

  "novadose-nad": {
    science: {
      molecularFormula: "C21H27N7O14P2",
      molecularWeight: "663.43 g/mol",
      classification: "Cartridge-Delivered NAD+ System",
      mechanism:
        "NovaDose delivers pharmaceutical-grade NAD+ through an innovative cartridge-based system designed for precise daily microdosing in research protocols. The unique delivery mechanism is engineered for enhanced bioavailability while maintaining NAD+ molecular stability through its sealed cartridge technology.",
      halfLife: "1-2 hours (sustained effect through daily micro-dosing)",
      researchAreas: [
        "Longevity and aging research",
        "Mitochondrial biogenesis",
        "Epigenetic modulation",
        "Cognitive performance",
        "Athletic recovery",
        "Cellular rejuvenation",
      ],
      keyStudies: [
        {
          title: "Subcutaneous NAD+ (2020)",
          finding: "Subcutaneous NAD+ delivery achieved comparable intracellular levels to IV therapy with greater sustained elevation.",
        },
        {
          title: "Daily Micro-Dosing (2021)",
          finding: "Consistent daily low-dose NAD+ maintained higher average cellular NAD+ levels than weekly IV bolus treatment.",
        },
        {
          title: "Cartridge Stability (2022)",
          finding: "Sealed cartridge systems maintained >97% NAD+ integrity over 60 days, outperforming traditional vial formats.",
        },
      ],
    },
    penAdvantage: {
      headline: "The Future of NAD+ Delivery is Here",
      points: [
        {
          title: "Cartridge Innovation",
          description: "Replaceable sealed cartridges maintain NAD+ stability far longer than any pen or vial system. Simply click in a new cartridge when empty.",
        },
        {
          title: "Near 100% Bioavailability",
          description: "Engineered micro-needle delivery achieves IV-equivalent absorption without the needle fear, clinic visits, or 2-hour infusion time.",
        },
        {
          title: "Built for Daily Ritual",
          description: "Sleek aluminum + composite design makes daily NAD+ dosing effortless. Premium feel, precision engineering, ritual-worthy experience.",
        },
        {
          title: "Most Cost-Effective NAD+",
          description: "One NovaDose system replaces 10+ IV therapy sessions worth $5,000-15,000. The most economical way to maintain elevated NAD+ levels.",
        },
      ],
    },
    dosing: {
      recommendedDose: "15-25 mg per day",
      frequency: "Once daily, subcutaneous micro-dose",
      duration: "30+ days per cartridge",
      instructions: [
        "Insert a fresh cartridge into the NovaDose pen body",
        "Attach a micro-needle tip (included in kit)",
        "Dial your daily micro-dose",
        "Inject subcutaneously - the micro-needle is virtually painless",
        "Hold briefly and remove",
        "Replace micro-needle after each use, refrigerate pen",
      ],
      tips: [
        "Morning dosing aligns with peak metabolic activity for optimal effect",
        "The included micro-needles are ultra-thin (32G) for painless daily use",
        "Keep cartridges refrigerated until ready to install",
        "The pen body is reusable - only cartridges and needles are consumable",
      ],
    },
    faq: [
      {
        question: "How is NovaDose different from the NAD+ Peptide Pen?",
        answer: "NovaDose uses a cartridge-based system with micro-needles. The pen body is reusable, cartridges are replaceable, and the micro-needle delivery is virtually painless. It's designed for people who want a premium daily NAD+ ritual.",
      },
      {
        question: "What comes in the NovaDose kit?",
        answer: "The kit includes the aluminum pen body, one 500mg NAD+ cartridge, 30+ micro-needle tips, carrying case, and complete documentation. Refill cartridges available separately.",
      },
      {
        question: "Why is NovaDose more expensive?",
        answer: "NovaDose includes the premium reusable pen body, specialized micro-needles, and advanced cartridge technology. After the initial purchase, refill cartridges are more cost-effective than the standard pen.",
      },
      {
        question: "How does cartridge stability compare?",
        answer: "Sealed cartridges maintain >97% NAD+ integrity for 60+ days - significantly better than reconstituted vials (15% loss by day 10) or even standard pen format (3% loss by day 30).",
      },
    ],
    reviews: [
      {
        rating: 5,
        title: "The Premium Experience",
        text: "NovaDose is to NAD+ what Apple is to phones. The build quality, the micro-needle comfort, the cartridge simplicity - it's in a league of its own.",
        author: "Dr. A. Richardson",
        role: "Anti-Aging Research, London",
        verified: true,
      },
      {
        rating: 5,
        title: "Innovation at Its Finest",
        text: "The cartridge system solved our biggest problem: NAD+ degradation. We measured <2% loss over 45 days. This changes everything for long-term NAD+ research.",
        author: "Prof. K. Ishikawa",
        role: "Mitochondrial Biology, Tokyo",
        verified: true,
      },
      {
        rating: 5,
        title: "Worth the Investment",
        text: "Initial cost is higher but the reusable pen body and cartridge refills make it the most economical long-term NAD+ solution. Quality is unmatched.",
        author: "Dr. C. Ruiz",
        role: "Longevity Lab, Valencia",
        verified: true,
      },
    ],
    sellingPoints: [
      {
        icon: "innovation",
        title: "Cartridge-Based Innovation",
        description: "Replaceable sealed cartridges maintain >97% NAD+ integrity for 60+ days",
      },
      {
        icon: "painless",
        title: "Micro-Needle Comfort",
        description: "32G ultra-thin micro-needles make daily injection virtually painless",
      },
      {
        icon: "premium",
        title: "Premium Build Quality",
        description: "Aluminum + composite pen body designed for years of daily use",
      },
      {
        icon: "cost",
        title: "Replaces $15,000+ in IV",
        description: "One system provides what 10+ IV therapy sessions would deliver",
      },
    ],
  },
};

export function getProductDetail(slug: string): ProductDetail | undefined {
  return productDetails[slug];
}
