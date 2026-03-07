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
}

// Per-product individual images (ORYN branded, background removed)
export const productImages = {
  // Individual pen images per product slug
  bySlug: {
    "bpc-157": "/images/products/pen-bpc157.png",
    "tb-500": "/images/products/pen-tb500.png",
    "cjc-1295": "/images/products/pen-cjc1295.png",
    "ipamorelin": "/images/products/pen-ipamorelin.png",
    "tirzepatide-pen": "/images/products/pen-tirzepatide.png",
    "ghk-cu": "/images/products/pen-ghkcu.png",
    "glutathione": "/images/products/pen-glutathione.png",
    "nad-plus": "/images/products/pen-nad.png",
    "medit-tirzepatide": "/images/products/pen-medit.png",
    "novadose-nad": "/images/products/pen-novadose.png",
  } as Record<string, string>,
  // Category fallback images
  categoryCard: {
    "peptide-pen": "/images/products/pen-bpc157.png",
    "medit-pen": "/images/products/pen-medit.png",
    novadose: "/images/products/pen-novadose.png",
  } as Record<string, string>,
  // Gallery images per product slug (own image + manufacturer reference + category shots)
  gallery: {
    "bpc-157": [
      "/images/products/pen-bpc157.png",
      "/images/products/peptide-pen-single.png",
      "/images/products/peptide-pens-all.png",
    ],
    "tb-500": [
      "/images/products/pen-tb500.png",
      "/images/products/peptide-pen-single.png",
      "/images/products/peptide-pens-all.png",
    ],
    "cjc-1295": [
      "/images/products/pen-cjc1295.png",
      "/images/products/peptide-pen-single.png",
      "/images/products/peptide-pens-all.png",
    ],
    "ipamorelin": [
      "/images/products/pen-ipamorelin.png",
      "/images/products/peptide-pen-single.png",
      "/images/products/peptide-pens-all.png",
    ],
    "tirzepatide-pen": [
      "/images/products/pen-tirzepatide.png",
      "/images/products/peptide-pen-single.png",
      "/images/products/peptide-pens-all.png",
    ],
    "ghk-cu": [
      "/images/products/pen-ghkcu.png",
      "/images/products/peptide-pen-single.png",
      "/images/products/peptide-pens-all.png",
    ],
    "glutathione": [
      "/images/products/pen-glutathione.png",
      "/images/products/peptide-pen-single.png",
      "/images/products/peptide-pens-all.png",
    ],
    "nad-plus": [
      "/images/products/pen-nad.png",
      "/images/products/peptide-pen-single.png",
      "/images/products/peptide-pens-all.png",
    ],
    "medit-tirzepatide": [
      "/images/products/pen-medit.png",
      "/images/products/medit-pen-box.png",
      "/images/products/medit-pen-closeup.png",
    ],
    "novadose-nad": [
      "/images/products/pen-novadose.png",
      "/images/products/novadose-system.png",
      "/images/products/novadose-pen.png",
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
    price: 189,
    description:
      "Body Protection Compound-157 is a synthetic peptide derived from a naturally occurring protein in gastric juice. ORYN BPC-157 is formulated at pharmaceutical grade in a precision-dosed pen system for consistent, reliable administration over 30 days.",
    benefits: [
      "Supports tissue healing and recovery",
      "Promotes gut health and integrity",
      "Supports tendon and ligament repair",
      "Anti-inflammatory properties",
      "Neuroprotective potential",
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
    image: "/images/products/pen-bpc157.png",
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
    price: 199,
    description:
      "Thymosin Beta-4 fragment, TB-500, plays a crucial role in tissue repair and regeneration. ORYN TB-500 delivers a precise 15mg dose in our advanced pen system, engineered for optimal bioavailability and consistent results.",
    benefits: [
      "Accelerates wound healing",
      "Reduces inflammation",
      "Promotes muscle tissue repair",
      "Supports cardiovascular health",
      "Enhances flexibility and mobility",
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
    image: "/images/products/pen-tb500.png",
  },
  {
    id: "oryn-cjc-1295",
    slug: "cjc-1295",
    name: "CJC-1295",
    subtitle: "GH Stimulation",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "5 mg",
    volume: "3 mL",
    price: 179,
    description:
      "CJC-1295 is a synthetic analogue of growth hormone-releasing hormone (GHRH). ORYN CJC-1295 provides sustained GH elevation through our precision dosing system, manufactured to the highest pharmaceutical standards.",
    benefits: [
      "Stimulates growth hormone release",
      "Supports lean body composition",
      "Promotes deep restorative sleep",
      "Enhances recovery between sessions",
      "Supports metabolic function",
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
    image: "/images/products/pen-cjc1295.png",
  },
  {
    id: "oryn-ipamorelin",
    slug: "ipamorelin",
    name: "Ipamorelin",
    subtitle: "GH Stimulation",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "6 mg",
    volume: "3 mL",
    price: 179,
    description:
      "Ipamorelin is a selective growth hormone secretagogue that stimulates the pituitary gland. ORYN Ipamorelin offers targeted GH release without the broader hormonal disruption seen in less selective compounds.",
    benefits: [
      "Selective GH release",
      "Minimal side effect profile",
      "Supports bone density",
      "Promotes lean tissue",
      "Enhances sleep quality",
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
    image: "/images/products/pen-ipamorelin.png",
  },
  {
    id: "oryn-tirzepatide-pen",
    slug: "tirzepatide-pen",
    name: "Tirzepatide",
    subtitle: "Metabolic",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "10 mg",
    volume: "3 mL",
    price: 249,
    description:
      "Tirzepatide is a dual GIP/GLP-1 receptor agonist representing the forefront of metabolic peptide science. ORYN Tirzepatide pen system delivers precision dosing for metabolic research applications.",
    benefits: [
      "Dual hormone receptor action",
      "Supports metabolic function",
      "Blood sugar management",
      "Appetite regulation",
      "Clinically studied compound",
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
    image: "/images/products/pen-tirzepatide.png",
  },
  {
    id: "oryn-ghk-cu",
    slug: "ghk-cu",
    name: "GHK-CU",
    subtitle: "Skin Repair",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "60 mg",
    volume: "3 mL",
    price: 219,
    description:
      "GHK-Cu (Copper peptide) is a naturally occurring tripeptide with a high affinity for copper ions. ORYN GHK-CU supports skin remodeling and repair research with a potent 60mg formulation.",
    benefits: [
      "Promotes collagen synthesis",
      "Supports skin elasticity",
      "Antioxidant properties",
      "Wound healing support",
      "Anti-aging research applications",
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
    image: "/images/products/pen-ghkcu.png",
  },
  {
    id: "oryn-glutathione",
    slug: "glutathione",
    name: "Glutathione",
    subtitle: "Antioxidant",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "6 g",
    volume: "3 mL",
    price: 169,
    description:
      "Glutathione is the body's master antioxidant, critical for cellular detoxification and immune function. ORYN Glutathione delivers a powerful 6g dose via our precision pen system for maximum bioavailability.",
    benefits: [
      "Master antioxidant defense",
      "Cellular detoxification",
      "Immune system support",
      "Skin brightening properties",
      "Liver function support",
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
    image: "/images/products/pen-glutathione.png",
  },
  {
    id: "oryn-nad",
    slug: "nad-plus",
    name: "NAD+",
    subtitle: "Metabolic & Anti-Aging",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "500 mg",
    volume: "3 mL",
    price: 299,
    description:
      "Nicotinamide Adenine Dinucleotide (NAD+) is a critical coenzyme present in every cell. ORYN NAD+ pen delivers a concentrated 500mg dose to support cellular energy production, DNA repair, and healthy aging.",
    benefits: [
      "Cellular energy production",
      "DNA repair support",
      "Healthy aging research",
      "Cognitive function support",
      "Metabolic efficiency",
    ],
    specs: {
      Purity: ">99%",
      "Fill Volume": "3 mL",
      Dosage: "500 mg",
      Formulation: "Pharma Grade",
      "Dosing Period": "30 Days",
      Sterilization: "0.22um Filter + Gamma Ray",
      Storage: "2-8°C Refrigerated",
      "Shelf Life": "24 months",
    },
    badge: "Premium",
    image: "/images/products/pen-nad.png",
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
    price: 349,
    description:
      "The ORYN MediT Pen is a prefilled, single-use injection pen containing 40mg Tirzepatide. Designed for once-weekly administration, it combines dual GIP/GLP-1 hormone action for comprehensive metabolic support.",
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
    image: "/images/products/pen-medit.png",
  },
  {
    id: "oryn-novadose-nad",
    slug: "novadose-nad",
    name: "NovaDose NAD+",
    subtitle: "Youth In Your Hands",
    category: "novadose",
    categoryLabel: "NovaDose System",
    dosage: "500 mg",
    volume: "Cartridge System",
    price: 399,
    description:
      "NovaDose delivers pharmaceutical-grade NAD+ through an innovative cartridge-based pen system. Designed for precise daily microdosing, it supports cellular energy, metabolic efficiency, and natural repair. More affordable and sustainable than IV therapy.",
    benefits: [
      "Pharmaceutical-grade NAD+ from Korea",
      "Precise daily microdosing",
      "Near 100% bioavailability",
      "Supports cellular energy and clarity",
      "Enhances mood and physical performance",
      "More cost-effective than IV therapy",
      "GMP-certified manufacturing",
    ],
    specs: {
      "NAD+ Source": "Pharmaceutical Grade, Korea",
      "Delivery System": "Cartridge-based Pen",
      Dosing: "Daily Microdose",
      Bioavailability: "Near 100%",
      "Pen Material": "Aluminum + Plastic",
      Needles: "Micro-needles included",
      Storage: "Refrigerated 2-8°C",
    },
    badge: "Innovation",
    image: "/images/products/pen-novadose.png",
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
