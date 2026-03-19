export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: "peptide-pen" | "medit-pen" | "novadose";
  categoryLabel: string;
  dosage: string;
  volume: string;
  price: number;
  description: string;
  benefits: string[];
  specs: Record<string, string>;
  badge?: string;
  image: string;
  images?: string[];
  researchAreas?: string[];
  videoUrl?: string;
  collectionHandle?: string | null;
}

// Per-product individual images (ORYN branded, background removed)
export const productImages = {
  // Individual pen images per product slug
  bySlug: {
    "bpc-157": "/images/products/bpc157-hero.png",
    "tb-500": "/images/products/tb500-hero.png",
    "cjc-1295": "/images/products/cjc1295-hero.png",
    "ipamorelin": "/images/products/ipamorelin-hero.png",
    "tirzepatide-pen": "/images/products/tirzepatide-hero.png",
    "ghk-cu": "/images/products/ghkcu-hero.png",
    "glutathione": "/images/products/glutathione-hero.png",
    "nad-plus": "/images/products/novanad-vial.png",
    "medit-tirzepatide": "/images/products/medit-pen-with-box.png",
    "novadose-nad": "/images/products/novadose-pen-horizontal.png",
  } as Record<string, string>,
  // Category fallback images
  categoryCard: {
    "peptide-pen": "/images/products/bpc157-hero.png",
    "medit-pen": "/images/products/medit-pen-with-box.png",
    novadose: "/images/products/novadose-pen-horizontal.png",
  } as Record<string, string>,
  // Gallery images per product slug
  gallery: {
    "bpc-157": [
      "/images/products/bpc157-hero.png",
      "/images/products/bpc157-detail.png",
      "/images/products/bpc157-angle.png",
      "/images/products/bpc157-closeup.png",
    ],
    "tb-500": [
      "/images/products/tb500-hero.png",
      "/images/products/tb500-detail.png",
      "/images/products/tb500-angle.png",
      "/images/products/tb500-closeup.png",
    ],
    "cjc-1295": [
      "/images/products/cjc1295-hero.png",
      "/images/products/cjc1295-detail.png",
      "/images/products/cjc1295-angle.png",
      "/images/products/cjc1295-closeup.png",
    ],
    "ipamorelin": [
      "/images/products/ipamorelin-hero.png",
      "/images/products/ipamorelin-detail.png",
      "/images/products/ipamorelin-angle.png",
      "/images/products/ipamorelin-closeup.png",
    ],
    "tirzepatide-pen": [
      "/images/products/tirzepatide-hero.png",
      "/images/products/tirzepatide-detail.png",
      "/images/products/tirzepatide-angle.png",
      "/images/products/tirzepatide-closeup.png",
    ],
    "ghk-cu": [
      "/images/products/ghkcu-hero.png",
      "/images/products/ghkcu-detail.png",
      "/images/products/ghkcu-angle.png",
      "/images/products/ghkcu-closeup.png",
    ],
    "glutathione": [
      "/images/products/glutathione-hero.png",
      "/images/products/glutathione-detail.png",
      "/images/products/glutathione-angle.png",
      "/images/products/glutathione-closeup.png",
    ],
    "nad-plus": [
      "/images/products/novanad-vial.png",
      "/images/products/novanad-outbox.png",
      "/images/products/novanad-inbox.png",
    ],
    "medit-tirzepatide": [
      "/images/products/medit-pen-with-box.png",
      "/images/products/medit-pen-box.png",
      "/images/products/medit-pen-closeup.png",
    ],
    "novadose-nad": [
      "/images/products/novadose-pen-horizontal.png",
      "/images/products/novadose-pen-with-cartridges.png",
      "/images/products/novadose-full-kit.png",
      "/images/products/novadose-kit-alt.png",
      "/images/products/novadose-cartridges.png",
      "/images/products/novadose-pen-vertical.png",
    ],
  } as Record<string, string[]>,
};

export const products: Product[] = [
  {
    id: "oryn-bpc-157",
    slug: "bpc-157",
    name: "BPC-157",
    subtitle: "Healing & Recovery",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "10 mg",
    volume: "3 mL",
    price: 119,
    description:
      "A regenerative peptide known for supporting tissue repair, reducing inflammation, and promoting recovery from injuries and gut damage. ORYN BPC-157 delivers 10mg in a precision-dosed reusable pen system with replaceable cartridges for 30 days of consistent administration.",
    benefits: [
      "Tissue repair & healing — muscles, tendons, ligaments, joints",
      "Anti-inflammatory — reduces swelling and chronic pain",
      "Gut restoration — repairs intestinal lining",
      "Neuroprotective properties",
      "Accelerates post-injury recovery",
    ],
    specs: {
      Purity: ">99%",
      "Fill Volume": "3 mL",
      Dosage: "10 mg",
      Formulation: "Pharma Grade",
      "Dosing Period": "30 Days",
      Sterilization: "0.22um Filter + Gamma Ray",
      Storage: "2-8°C Refrigerated",
      "Shelf Life": "24 months",
    },
    badge: "Best Seller",
    image: "/images/products/bpc157-hero.png",
    researchAreas: ["recovery", "anti-aging"],
  },
  {
    id: "oryn-tb-500",
    slug: "tb-500",
    name: "TB-500",
    subtitle: "Tissue Repair",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "15 mg",
    volume: "3 mL",
    price: 119,
    description:
      "A regenerative peptide supporting soft tissue repair, flexibility, and inflammation reduction. ORYN TB-500 delivers 15mg of Thymosin Beta-4 fragment in a reusable pen system designed for optimal bioavailability over 30 days.",
    benefits: [
      "Soft tissue recovery — muscles, tendons, ligaments",
      "Enhanced flexibility & joint mobility",
      "Reduces chronic inflammation",
      "Supports cardiovascular health",
      "Accelerates wound healing",
    ],
    specs: {
      Purity: ">99%",
      "Fill Volume": "3 mL",
      Dosage: "15 mg",
      Formulation: "Pharma Grade",
      "Dosing Period": "30 Days",
      Sterilization: "0.22um Filter + Gamma Ray",
      Storage: "2-8°C Refrigerated",
      "Shelf Life": "24 months",
    },
    image: "/images/products/tb500-hero.png",
    researchAreas: ["recovery", "muscle-growth"],
  },
  {
    id: "oryn-cjc-1295",
    slug: "cjc-1295",
    name: "CJC-1295",
    subtitle: "Growth Hormone & Recovery",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "20 mg",
    volume: "3 mL",
    price: 109,
    description:
      "A dual-action growth hormone stimulator (CJC-1295/Ipamorelin blend) supporting metabolism, muscle growth, recovery, and energy balance. Delivered in ORYN's reusable pen system with 20mg/3ml for 30 days of precision dosing.",
    benefits: [
      "Fat metabolism — burn fat while maintaining lean muscle",
      "Muscle growth & accelerated recovery",
      "Deep, restorative sleep",
      "Supports natural GH cycle",
      "Enhanced metabolic function",
    ],
    specs: {
      Purity: ">99%",
      "Fill Volume": "3 mL",
      Dosage: "5 mg",
      Formulation: "Pharma Grade",
      "Dosing Period": "30 Days",
      Sterilization: "0.22um Filter + Gamma Ray",
      Storage: "2-8°C Refrigerated",
      "Shelf Life": "24 months",
    },
    image: "/images/products/cjc1295-hero.png",
    researchAreas: ["muscle-growth", "weight-loss", "recovery"],
  },
  {
    id: "oryn-ipamorelin",
    slug: "ipamorelin",
    name: "Ipamorelin",
    subtitle: "Selective GH Release",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "20 mg",
    volume: "3 mL",
    price: 109,
    description:
      "A selective growth hormone secretagogue that stimulates the pituitary gland for natural GH release without broader hormonal disruption. ORYN Ipamorelin delivers 20mg/3ml in a reusable pen system for 30 days of targeted dosing.",
    benefits: [
      "Selective, targeted GH release",
      "Supports fat loss & lean muscle",
      "Enhanced sleep quality & recovery",
      "Supports bone density",
      "Minimal side effect profile",
    ],
    specs: {
      Purity: ">99%",
      "Fill Volume": "3 mL",
      Dosage: "6 mg",
      Formulation: "Pharma Grade",
      "Dosing Period": "30 Days",
      Sterilization: "0.22um Filter + Gamma Ray",
      Storage: "2-8°C Refrigerated",
      "Shelf Life": "24 months",
    },
    image: "/images/products/ipamorelin-hero.png",
    researchAreas: ["muscle-growth", "weight-loss", "anti-aging"],
  },
  {
    id: "oryn-tirzepatide-pen",
    slug: "tirzepatide-pen",
    name: "Tirzepatide",
    subtitle: "Weight Management",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "20 mg",
    volume: "3 mL",
    price: 169,
    description:
      "A GLP-1 & GIP dual agonist supporting appetite control, weight loss, and glucose regulation. ORYN Tirzepatide pen delivers 20mg/3ml in a reusable system with precision dosing for 30 days. The same active compound found in branded weight management solutions at a fraction of the cost.",
    benefits: [
      "Potent appetite suppression",
      "Enhanced fat metabolism",
      "Blood sugar & cholesterol management",
      "Cardiovascular support",
      "Clinically proven dual-action compound",
    ],
    specs: {
      Purity: ">99%",
      "Fill Volume": "3 mL",
      Dosage: "10 mg",
      Formulation: "Pharma Grade",
      "Dosing Period": "30 Days",
      Sterilization: "0.22um Filter + Gamma Ray",
      Storage: "2-8°C Refrigerated",
      "Shelf Life": "24 months",
    },
    badge: "Popular",
    image: "/images/products/tirzepatide-hero.png",
    researchAreas: ["weight-loss"],
  },
  {
    id: "oryn-ghk-cu",
    slug: "ghk-cu",
    name: "GHK-CU",
    subtitle: "Skin & Collagen",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "60 mg",
    volume: "3 mL",
    price: 139,
    description:
      "A copper-binding peptide that supports tissue repair, collagen production, skin rejuvenation, hair follicle stimulation, and cellular protection. ORYN GHK-CU delivers a potent 60mg formulation via reusable pen system for 30 days.",
    benefits: [
      "Skin & collagen regeneration — firmness, wrinkle reduction",
      "Wound & scar healing acceleration",
      "Hair growth & follicle stimulation",
      "Antioxidant defense against oxidative damage",
      "Anti-aging & rejuvenation",
    ],
    specs: {
      Purity: ">99%",
      "Fill Volume": "3 mL",
      Dosage: "60 mg",
      Formulation: "Pharma Grade",
      "Dosing Period": "30 Days",
      Sterilization: "0.22um Filter + Gamma Ray",
      Storage: "2-8°C Refrigerated",
      "Shelf Life": "24 months",
    },
    image: "/images/products/ghkcu-hero.png",
    researchAreas: ["skin-rejuvenation", "anti-aging"],
  },
  {
    id: "oryn-glutathione",
    slug: "glutathione",
    name: "Glutathione",
    subtitle: "Detox & Antioxidant",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "6 mg",
    volume: "3 mL",
    price: 99,
    description:
      "The body's master antioxidant supporting detoxification, immune defense, and cellular protection against oxidative stress. ORYN Glutathione delivers a powerful dose via reusable pen system for 30 days of daily administration.",
    benefits: [
      "Powerful antioxidant — neutralizes free radicals",
      "Detoxification & liver support",
      "Skin clarity & brightening",
      "Immune system boost",
      "Cellular integrity & protection",
    ],
    specs: {
      Purity: ">99%",
      "Fill Volume": "3 mL",
      Dosage: "6 g",
      Formulation: "Pharma Grade",
      "Dosing Period": "30 Days",
      Sterilization: "0.22um Filter + Gamma Ray",
      Storage: "2-8°C Refrigerated",
      "Shelf Life": "24 months",
    },
    image: "/images/products/glutathione-hero.png",
    researchAreas: ["anti-aging", "skin-rejuvenation"],
  },
  {
    id: "oryn-nad",
    slug: "nad-plus",
    name: "NAD+",
    subtitle: "Anti-Aging & Cellular Health",
    category: "peptide-pen",
    categoryLabel: "NovaNAD",
    dosage: "500 mg/vial",
    volume: "10 Vials",
    price: 189,
    description:
      "NovaNAD is the purest cellular anti-aging NAD+ therapy with the highest absorption rate. Nano-scale NAD+ particles enhance bioavailability and cellular uptake. Supports energy production, cell repair, cognitive clarity, and rejuvenation. Trusted by leading clinicians worldwide.",
    benefits: [
      "Nano-scale particles for highest absorption",
      "Mitochondrial support & energy production",
      "Cognitive optimization & mental clarity",
      "Anti-aging & DNA repair",
      "Immune support & cellular repair",
      "Skin health improvement",
      "Fatigue recovery & metabolic balance",
    ],
    specs: {
      Content: "500 mg/vial (Nicotinamide Adenine Dinucleotide)",
      Package: "10 Vials per box",
      Formulation: "Nano NAD+ particles",
      Absorption: "Highest rated nano absorption",
      Origin: "South Korea",
      Certification: "C-GMP, ISO Class 7",
      Storage: "2-8°C Refrigerated",
    },
    badge: "Premium",
    image: "/images/products/novanad-vial.png",
    researchAreas: ["anti-aging", "recovery"],
  },
  {
    id: "oryn-medit-tirzepatide",
    slug: "medit-tirzepatide",
    name: "MediT Pen",
    subtitle: "Tirzepatide 40mg — Weight Management",
    category: "medit-pen",
    categoryLabel: "MediT Pen",
    dosage: "40 mg",
    volume: "Prefilled",
    price: 249,
    description:
      "The ORYN MediT Pen is a prefilled, single-use injection pen containing 40mg Tirzepatide (>99% purity). Designed for once-weekly administration, it combines dual GIP/GLP-1 hormone action for the perfect weight loss plan. Use once a week for sustained results.",
    benefits: [
      "Dual hormone action (GIP + GLP-1)",
      "Once-weekly convenience",
      "Clinically proven effectiveness",
      "Appetite control and satiety boost",
      "Blood sugar management",
      "Supports long-term weight management",
      "May reduce obesity-related disease risk",
    ],
    specs: {
      Purity: ">99%",
      Type: "Prefilled Injection Pen",
      Dosage: "40 mg Tirzepatide",
      Frequency: "Once Weekly",
      "Target BMI": "27+ with comorbidities or 30+",
      Mechanism: "Dual GIP/GLP-1 Agonist",
      Storage: "2-8°C Refrigerated",
    },
    badge: "New",
    image: "/images/products/medit-pen-with-box.png",
    researchAreas: ["weight-loss"],
  },
  {
    id: "oryn-novadose-nad",
    slug: "novadose-nad",
    name: "NovaDose NAD+",
    subtitle: "Youth In Your Hands",
    category: "novadose",
    categoryLabel: "NovaDose System",
    dosage: "1000 mg",
    volume: "2x Cartridges (6 mL)",
    price: 299,
    description:
      "NovaDose delivers pharmaceutical-grade NAD+ through an innovative cartridge-based pen system. The auto-injection pen contains 1000mg NAD+ delivered through 2 cartridges with adjustable dose settings (10-100mg). Includes pen, 2x NAD+ cartridges, and premium carrying case. More affordable and sustainable than IV therapy.",
    benefits: [
      "B-GMP sourced NAD+ — maximum purity",
      "Adjustable dosing: 10-100mg per session",
      "Near 100% bioavailability",
      "Pure unfiltered energy & faster recovery",
      "Enhanced focus, mood & sleep quality",
      "More cost-effective than IV therapy",
      "GMP-certified, manufactured in South Korea",
    ],
    specs: {
      "NAD+ Content": "1000 mg total",
      "Delivery System": "Auto-injection pen + 2 cartridges",
      "Total Volume": "6 mL",
      "Dose Settings": "1-5 (10-100 mg)",
      Bioavailability: "Near 100%",
      Formulation: "NAD+, L-Carnitine, Taurine, Reduced Glutathione",
      Storage: "2-8°C Refrigerated",
    },
    badge: "Innovation",
    image: "/images/products/novadose-pen-horizontal.png",
    researchAreas: ["anti-aging", "recovery"],
  },
];

export const categories = [
  {
    id: "peptide-pen",
    name: "Peptide Pen System",
    description:
      "Multi-dose reusable pens with 30-day precision dosing. 8 research peptides available.",
    count: 8,
  },
  {
    id: "medit-pen",
    name: "MediT Pen",
    description:
      "Prefilled single-use weekly injection pen. Tirzepatide 40mg for metabolic research.",
    count: 1,
  },
  {
    id: "novadose",
    name: "NovaDose System",
    description:
      "Advanced NAD+ cartridge delivery system for daily precision microdosing.",
    count: 1,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
