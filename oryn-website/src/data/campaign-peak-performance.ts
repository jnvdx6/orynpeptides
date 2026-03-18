import { getProductBySlug, type Product } from "./products";

export const PEAK_CAMPAIGN = {
  slug: "peak-performance",
  name: "Peak Performance",
  tagline: "Engineer Your Peak",
  timeline: "May 15 – June 30, 2026",
  promoCode: "PEAK26",
  freeDeliveryThreshold: 400,
} as const;

export const PEAK_HERO_SLUGS = [
  "tirzepatide-pen",
  "medit-tirzepatide",
  "nad-plus",
  "novadose-nad",
  "cjc-1295",
  "ipamorelin",
] as const;

export interface CampaignBundle {
  slug: string;
  name: string;
  tagline: string;
  productSlugs: string[];
  discountPercent: number;
}

export const PEAK_BUNDLES: CampaignBundle[] = [
  {
    slug: "metabolic-transformation",
    name: "Metabolic Transformation",
    tagline: "Dual-format tirzepatide for comprehensive weight management",
    productSlugs: ["tirzepatide-pen", "medit-tirzepatide"],
    discountPercent: 12,
  },
  {
    slug: "gh-stack",
    name: "Growth Hormone Stack",
    tagline: "Dual-pathway GH optimisation for peak performance",
    productSlugs: ["cjc-1295", "ipamorelin"],
    discountPercent: 15,
  },
  {
    slug: "total-wellness",
    name: "Total Wellness Stack",
    tagline: "Foundation protocol for systemic health optimisation",
    productSlugs: ["bpc-157", "nad-plus", "glutathione"],
    discountPercent: 15,
  },
  {
    slug: "nad-complete",
    name: "NAD+ Complete Stack",
    tagline: "Dual-delivery NAD+ for maximum cellular rejuvenation",
    productSlugs: ["nad-plus", "novadose-nad"],
    discountPercent: 12,
  },
];

export interface ComparisonSpec {
  label: string;
  valueA: string;
  valueB: string;
  winner?: "A" | "B" | "tie";
}

export const TIRZEPATIDE_COMPARISON: {
  title: string;
  slugA: string;
  slugB: string;
  specs: ComparisonSpec[];
} = {
  title: "Tirzepatide Pen vs MediT Pen",
  slugA: "tirzepatide-pen",
  slugB: "medit-tirzepatide",
  specs: [
    { label: "Dosage", valueA: "20 mg (multi-dose)", valueB: "40 mg (single-use)", winner: "B" },
    { label: "Delivery", valueA: "Reusable pen, daily micro-dosing", valueB: "Prefilled pen, once weekly", winner: "tie" },
    { label: "Best For", valueA: "Dose titration & initiation", valueB: "Maintenance & convenience", winner: "tie" },
    { label: "Frequency", valueA: "Daily", valueB: "Once weekly", winner: "B" },
    { label: "Purity", valueA: ">99%", valueB: ">99%", winner: "tie" },
    { label: "Price", valueA: "€169", valueB: "€249", winner: "A" },
    { label: "Cost Per Week", valueA: "~€39/wk (30-day pen)", valueB: "€249/injection", winner: "A" },
    { label: "Mechanism", valueA: "Dual GIP/GLP-1 agonist", valueB: "Dual GIP/GLP-1 agonist", winner: "tie" },
  ],
};

export const NAD_COMPARISON: {
  title: string;
  slugA: string;
  slugB: string;
  specs: ComparisonSpec[];
} = {
  title: "NAD+ Pen vs NovaDose NAD+",
  slugA: "nad-plus",
  slugB: "novadose-nad",
  specs: [
    { label: "NAD+ Content", valueA: "500 mg (10 vials)", valueB: "1000 mg (2 cartridges)", winner: "B" },
    { label: "Delivery", valueA: "Subcutaneous vials", valueB: "Auto-injection pen + cartridges", winner: "B" },
    { label: "Dosing", valueA: "Fixed per vial", valueB: "Adjustable 10-100 mg", winner: "B" },
    { label: "Bioavailability", valueA: "High (nano-scale particles)", valueB: "Near 100%", winner: "B" },
    { label: "Formulation", valueA: "Pure nano NAD+", valueB: "NAD+, L-Carnitine, Taurine, Glutathione", winner: "tie" },
    { label: "Price", valueA: "€189", valueB: "€299", winner: "A" },
    { label: "Best For", valueA: "Concentrated monthly protocol", valueB: "Daily precision microdosing", winner: "tie" },
    { label: "Origin", valueA: "South Korea (C-GMP, ISO 7)", valueB: "South Korea (GMP)", winner: "tie" },
  ],
};

export function getCampaignProducts(): Product[] {
  return PEAK_HERO_SLUGS
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => !!p);
}
