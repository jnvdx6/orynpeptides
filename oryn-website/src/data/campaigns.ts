export interface CampaignBundle {
  slug: string;
  name: string;
  productSlugs: string[];
  discountPercent: number;
  standardDiscountPercent: number;
}

export interface CampaignPromo {
  code: string;
  description: string;
  discountType: "percentage" | "fixed" | "tiered";
  discountValue: number;
  /** For tiered discounts: min items -> discount percent */
  tiers?: { minItems: number; percentage: number }[];
}

export interface CampaignOffer {
  label: string;
  description: string;
  icon: "shipping" | "discount" | "gift";
}

export interface CampaignTheme {
  /** CSS gradient for hero background */
  heroGradient: string;
  /** CSS class for molecular grid overlay */
  gridOverlay: string;
  /** Accent color for buttons and highlights */
  accentColor: string;
  /** Text color on hero */
  heroTextColor: string;
  /** Secondary text color on hero */
  heroSubtextColor: string;
  /** Badge background */
  badgeBg: string;
  /** Badge text */
  badgeText: string;
  /** Section background for alternating sections */
  sectionBg: string;
  /** Section accent border */
  sectionBorder: string;
}

export interface Campaign {
  slug: string;
  name: string;
  tagline: string;
  subtitle: string;
  description: string;
  startDate: string;
  endDate: string;
  /** Hero product slugs (from products.ts) */
  heroProductSlugs: string[];
  /** Campaign-specific bundles with enhanced discounts */
  bundles: CampaignBundle[];
  /** Promo codes */
  promos: CampaignPromo[];
  /** Campaign offers (free shipping, etc.) */
  offers: CampaignOffer[];
  /** Visual theme */
  theme: CampaignTheme;
  /** SEO */
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
}

// ─── Spring 2026: Cellular Renewal ──────────────────────────

export const springCampaign: Campaign = {
  slug: "spring-renewal",
  name: "Cellular Renewal",
  tagline: "Renewal Starts at the Molecular Level",
  subtitle: "Spring 2026 Collection",
  description:
    "Discover our curated selection of regeneration, repair, and detoxification peptides. This spring, harness the science of cellular renewal with research-grade compounds designed for tissue repair, collagen synthesis, and antioxidant defence.",
  startDate: "2026-04-01",
  endDate: "2026-04-30",
  heroProductSlugs: ["bpc-157", "ghk-cu", "glutathione", "tb-500"],
  bundles: [
    {
      slug: "recovery-stack",
      name: "Recovery & Repair Stack",
      productSlugs: ["bpc-157", "tb-500"],
      discountPercent: 15,
      standardDiscountPercent: 10,
    },
    {
      slug: "skin-renewal",
      name: "Skin Renewal Stack",
      productSlugs: ["ghk-cu", "glutathione"],
      discountPercent: 15,
      standardDiscountPercent: 10,
    },
    {
      slug: "anti-aging-stack",
      name: "Anti-Aging & Longevity Stack",
      productSlugs: ["ghk-cu", "nad-plus", "glutathione"],
      discountPercent: 15,
      standardDiscountPercent: 12,
    },
  ],
  promos: [
    {
      code: "RENEWAL26",
      description: "10% off your first order",
      discountType: "percentage",
      discountValue: 10,
    },
  ],
  offers: [
    {
      label: "Free Standard Shipping",
      description: "On all orders over €175",
      icon: "shipping",
    },
    {
      label: "15% Bundle Savings",
      description: "Enhanced discounts on campaign bundles",
      icon: "discount",
    },
    {
      label: "10% Welcome Discount",
      description: "Code RENEWAL26 for new customers",
      icon: "gift",
    },
  ],
  theme: {
    heroGradient:
      "linear-gradient(135deg, #0a3d2a 0%, #145a3e 30%, #1a7a54 60%, #0f4d35 100%)",
    gridOverlay: "bg-molecular-grid-green",
    accentColor: "#2ecc71",
    heroTextColor: "text-white",
    heroSubtextColor: "text-white/70",
    badgeBg: "bg-emerald-500",
    badgeText: "text-white",
    sectionBg: "bg-emerald-50",
    sectionBorder: "border-emerald-200",
  },
  seo: {
    title:
      "Spring Cellular Renewal — Regeneration & Repair Peptides | ORYN Peptide Labs",
    description:
      "Explore ORYN's Spring 2026 Cellular Renewal collection. BPC-157, GHK-Cu, Glutathione, and TB-500 research-grade peptide pens with 15% bundle savings and free shipping over €175.",
  },
};

// ─── Pre-Summer 2026: Peak Performance ──────────────────────

export const preSummerCampaign: Campaign = {
  slug: "peak-performance",
  name: "Peak Performance",
  tagline: "Engineer Your Peak",
  subtitle: "Pre-Summer 2026 Collection",
  description:
    "Metabolic optimisation, energy systems, and body composition research — science for peak output. Featuring our most advanced delivery systems including the MediT Pen and NovaDose platform.",
  startDate: "2026-05-15",
  endDate: "2026-06-30",
  heroProductSlugs: [
    "tirzepatide-pen",
    "medit-tirzepatide",
    "nad-plus",
    "novadose-nad",
    "cjc-1295",
    "ipamorelin",
  ],
  bundles: [
    {
      slug: "metabolic-stack",
      name: "Metabolic Transformation Stack",
      productSlugs: ["tirzepatide-pen", "medit-tirzepatide"],
      discountPercent: 12,
      standardDiscountPercent: 8,
    },
    {
      slug: "gh-stack",
      name: "Growth Hormone Stack",
      productSlugs: ["cjc-1295", "ipamorelin"],
      discountPercent: 15,
      standardDiscountPercent: 10,
    },
    {
      slug: "total-wellness",
      name: "Total Wellness Stack",
      productSlugs: ["bpc-157", "nad-plus", "glutathione"],
      discountPercent: 15,
      standardDiscountPercent: 10,
    },
    {
      slug: "nad-complete",
      name: "NAD+ Complete Stack",
      productSlugs: ["nad-plus", "novadose-nad"],
      discountPercent: 12,
      standardDiscountPercent: 8,
    },
  ],
  promos: [
    {
      code: "PEAK26",
      description: "10% on 2 products, 15% on 3+",
      discountType: "tiered",
      discountValue: 10,
      tiers: [
        { minItems: 3, percentage: 15 },
        { minItems: 2, percentage: 10 },
      ],
    },
  ],
  offers: [
    {
      label: "Tiered Discounts",
      description: "10% on 2 items, 15% on 3+",
      icon: "discount",
    },
    {
      label: "Free Priority Delivery",
      description: "On orders over €400",
      icon: "shipping",
    },
    {
      label: "NovaDose Launch Special",
      description: "Free shipping on first 50 NovaDose orders",
      icon: "gift",
    },
  ],
  theme: {
    heroGradient:
      "linear-gradient(135deg, #1a1a3e 0%, #2a2a5e 30%, #3a3a7e 60%, #1a1a4e 100%)",
    gridOverlay: "bg-molecular-grid-blue",
    accentColor: "#f39c12",
    heroTextColor: "text-white",
    heroSubtextColor: "text-white/70",
    badgeBg: "bg-amber-500",
    badgeText: "text-white",
    sectionBg: "bg-blue-50",
    sectionBorder: "border-blue-200",
  },
  seo: {
    title:
      "Peak Performance — Metabolic & Energy Peptides | ORYN Peptide Labs",
    description:
      "Explore ORYN's Pre-Summer 2026 Peak Performance collection. Tirzepatide, NAD+, NovaDose, and GH peptides with tiered discounts up to 15% off.",
  },
};

// ─── Registry ───────────────────────────────────────────────

export const campaigns: Campaign[] = [springCampaign, preSummerCampaign];

export function getCampaignBySlug(slug: string): Campaign | undefined {
  return campaigns.find((c) => c.slug === slug);
}

/** Get the currently active campaign based on date, or the upcoming one */
export function getActiveCampaign(now = new Date()): Campaign | undefined {
  const dateStr = now.toISOString().split("T")[0];

  // Check for active campaign
  const active = campaigns.find(
    (c) => dateStr >= c.startDate && dateStr <= c.endDate
  );
  if (active) return active;

  // Return the next upcoming campaign
  const upcoming = campaigns
    .filter((c) => dateStr < c.startDate)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  return upcoming[0];
}
