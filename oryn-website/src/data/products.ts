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
    subtitle: "Regeneration Research Peptide",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "10 mg",
    volume: "3 mL",
    price: 119,
    description:
      "A pentadecapeptide widely studied in tissue regeneration and gastrointestinal research. Research suggests BPC-157 may modulate nitric oxide pathways and growth factor expression. ORYN BPC-157 delivers 10mg in a precision-dosed reusable pen system with replaceable cartridges for 30 days of consistent administration.",
    benefits: [
      "Investigated for tissue regeneration — muscles, tendons, ligaments, joints",
      "Studied for anti-inflammatory pathway modulation",
      "Research focus on gastrointestinal mucosal integrity",
      "Investigated for neuroprotective mechanisms",
      "Studied in post-injury recovery models",
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
    subtitle: "Cell Migration Research Peptide",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "15 mg",
    volume: "3 mL",
    price: 119,
    description:
      "A Thymosin Beta-4 fragment studied for its role in cell migration and actin regulation. Research suggests TB-500 may promote angiogenesis and modulate inflammatory pathways. ORYN TB-500 delivers 15mg in a reusable pen system designed for optimal bioavailability over 30 days.",
    benefits: [
      "Investigated for soft tissue regeneration — muscles, tendons, ligaments",
      "Studied for flexibility and joint mobility research",
      "Research focus on inflammatory pathway modulation",
      "Investigated in cardiovascular tissue models",
      "Studied in wound closure research",
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
    subtitle: "GH Secretagogue Research Peptide",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "20 mg",
    volume: "3 mL",
    price: 109,
    description:
      "A GHRH analogue (CJC-1295/Ipamorelin blend) investigated for growth hormone pathway modulation. Studies indicate CJC-1295 may stimulate pulsatile GH release via pituitary GHRH receptors. Delivered in ORYN's reusable pen system with 20mg/3ml for 30 days of precision dosing.",
    benefits: [
      "Investigated for body composition and metabolic research",
      "Studied in muscle tissue and recovery models",
      "Research focus on sleep architecture and GH pulsatility",
      "Investigated for natural GH cycle modulation",
      "Studied for metabolic pathway research",
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
    subtitle: "Selective GH Secretagogue",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "20 mg",
    volume: "3 mL",
    price: 109,
    description:
      "A selective growth hormone secretagogue investigated for its ability to stimulate pituitary GH release via the ghrelin receptor. Research suggests Ipamorelin may offer selective GH modulation without broader hormonal disruption. ORYN Ipamorelin delivers 20mg/3ml in a reusable pen system for 30 days of targeted dosing.",
    benefits: [
      "Investigated for selective, targeted GH release pathways",
      "Studied in body composition and lean tissue research",
      "Research focus on sleep quality and recovery models",
      "Investigated for bone density research applications",
      "Studied for its selective receptor profile",
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
    subtitle: "Dual Incretin Research Peptide",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "20 mg",
    volume: "3 mL",
    price: 169,
    description:
      "A dual GIP/GLP-1 receptor agonist extensively studied in metabolic research. Clinical trials suggest Tirzepatide may modulate appetite signalling and glucose homeostasis through dual incretin pathways. ORYN Tirzepatide pen delivers 20mg/3ml in a reusable system with precision dosing for 30 days.",
    benefits: [
      "Investigated for appetite and satiety pathway modulation",
      "Studied in metabolic and body composition research",
      "Research focus on glucose homeostasis mechanisms",
      "Investigated in cardiovascular risk factor studies",
      "Extensively studied dual-receptor agonist compound",
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
    subtitle: "Copper Peptide Research Compound",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "60 mg",
    volume: "3 mL",
    price: 139,
    description:
      "A copper-binding tripeptide investigated for its role in tissue remodelling, collagen synthesis, and gene expression modulation. Studies suggest GHK-Cu may activate regenerative processes through copper-mediated signalling. ORYN GHK-CU delivers a potent 60mg formulation via reusable pen system for 30 days.",
    benefits: [
      "Investigated for collagen synthesis and skin remodelling research",
      "Studied in wound closure and tissue repair models",
      "Research focus on hair follicle signalling pathways",
      "Investigated for antioxidant defence mechanisms",
      "Studied for gene expression modulation (4,000+ genes identified)",
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
    subtitle: "Antioxidant Research Tripeptide",
    category: "peptide-pen",
    categoryLabel: "Peptide Pen",
    dosage: "6 mg",
    volume: "3 mL",
    price: 99,
    description:
      "An endogenous tripeptide widely recognised as a key antioxidant in cellular redox research. Studies indicate Glutathione participates in Phase II detoxification and reactive oxygen species neutralisation. ORYN Glutathione delivers a research-grade dose via reusable pen system for 30 days of daily administration.",
    benefits: [
      "Investigated for antioxidant and free radical neutralisation research",
      "Studied for Phase II detoxification pathway modulation",
      "Research focus on skin depigmentation mechanisms",
      "Investigated for immune system modulation research",
      "Studied for cellular redox balance and integrity",
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
    subtitle: "Cellular Coenzyme Research",
    category: "peptide-pen",
    categoryLabel: "NovaNAD",
    dosage: "500 mg/vial",
    volume: "10 Vials",
    price: 189,
    description:
      "NovaNAD provides high-purity NAD+ (Nicotinamide Adenine Dinucleotide) with nano-scale particles for enhanced bioavailability. Research suggests NAD+ is a critical coenzyme in mitochondrial metabolism, sirtuin activation, and DNA repair pathways. Widely studied in cellular aging and energy metabolism research.",
    benefits: [
      "Nano-scale particles for enhanced research bioavailability",
      "Investigated for mitochondrial function and energy metabolism",
      "Studied in cognitive performance and neurological research",
      "Research focus on sirtuin activation and DNA repair pathways",
      "Investigated for immune function and cellular integrity",
      "Studied in dermatological and skin biology research",
      "Research focus on metabolic pathway modulation",
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
    subtitle: "Tirzepatide 40mg — Metabolic Research Pen",
    category: "medit-pen",
    categoryLabel: "MediT Pen",
    dosage: "40 mg",
    volume: "Prefilled",
    price: 249,
    description:
      "The ORYN MediT Pen is a prefilled, single-use injection pen containing 40mg Tirzepatide (>99% purity). Designed for once-weekly administration in metabolic research protocols, it features dual GIP/GLP-1 receptor agonism — the most studied dual incretin compound in clinical trials.",
    benefits: [
      "Dual receptor agonism (GIP + GLP-1) for metabolic research",
      "Once-weekly administration convenience",
      "Extensively studied in SURPASS/SURMOUNT clinical trials",
      "Investigated for appetite and satiety pathway modulation",
      "Studied for glucose homeostasis research",
      "Research focus on long-term metabolic outcomes",
      "Investigated in cardiovascular risk factor studies",
    ],
    specs: {
      Purity: ">99%",
      Type: "Prefilled Injection Pen",
      Dosage: "40 mg Tirzepatide",
      Frequency: "Once Weekly",
      "Research Application": "Metabolic and incretin pathway studies",
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
    subtitle: "Advanced NAD+ Delivery System",
    category: "novadose",
    categoryLabel: "NovaDose System",
    dosage: "1000 mg",
    volume: "2x Cartridges (6 mL)",
    price: 299,
    description:
      "NovaDose delivers pharmaceutical-grade NAD+ through an innovative cartridge-based pen system. The auto-injection pen contains 1000mg NAD+ delivered through 2 cartridges with adjustable dose settings (10-100mg). Includes pen, 2x NAD+ cartridges, and premium carrying case. Designed for sustained NAD+ research protocols.",
    benefits: [
      "B-GMP sourced NAD+ — maximum purity",
      "Adjustable dosing: 10-100mg per session",
      "Near 100% bioavailability for research applications",
      "Investigated for cellular energy and metabolic research",
      "Studied for cognitive performance and sleep architecture research",
      "Cost-effective alternative to IV-based research protocols",
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
      "Prefilled single-use weekly injection pen. Tirzepatide 40mg for metabolic research applications.",
    count: 1,
  },
  {
    id: "novadose",
    name: "NovaDose System",
    description:
      "Advanced NAD+ cartridge delivery system for daily precision research microdosing.",
    count: 1,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
