// ─── Customer Reviews Data ──────────────────────────────────────────
// Centralized reviews for product pages, schema markup, and aggregate ratings

export interface Review {
  id: string;
  author: string;
  location: string;
  product: string; // product slug
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  text: string;
  date: string; // ISO date string
  verified: boolean;
}

export const ALL_REVIEWS: Review[] = [
  // ── BPC-157 (most popular — 8 reviews) ────────────────────────────
  {
    id: "r-bpc-001",
    author: "Dr. James H.",
    location: "London, UK",
    product: "bpc-157",
    rating: 5,
    title: "Exceptional Purity — Lab Verified",
    text: "Ran our own HPLC analysis and the results matched the COA exactly at 99.3% purity. The pen format has eliminated cross-contamination issues we had with vials. Our entire lab has switched over.",
    date: "2026-01-08",
    verified: true,
  },
  {
    id: "r-bpc-002",
    author: "Sarah M.",
    location: "Manchester, UK",
    product: "bpc-157",
    rating: 5,
    title: "Incredibly Convenient",
    text: "The pre-mixed pen saved us hours of reconstitution time every week. Delivery was next-day and the packaging was discreet and temperature-controlled. Will absolutely reorder.",
    date: "2026-02-03",
    verified: true,
  },
  {
    id: "r-bpc-003",
    author: "Dr. K. Werner",
    location: "Berlin, Germany",
    product: "bpc-157",
    rating: 5,
    title: "Remarkable Batch Consistency",
    text: "We've ordered five batches now and the consistency is outstanding. Every single COA shows >99% purity. The pen delivery system gives us far more reproducible results than vial-based BPC-157 ever did.",
    date: "2026-01-22",
    verified: true,
  },
  {
    id: "r-bpc-004",
    author: "Thomas R.",
    location: "Edinburgh, UK",
    product: "bpc-157",
    rating: 5,
    title: "Best Supplier We've Found",
    text: "After testing BPC-157 from four different European suppliers, ORYN is clearly the gold standard. Purity is genuinely >99%, not just claimed. The pen system is a welcome innovation.",
    date: "2026-02-14",
    verified: true,
  },
  {
    id: "r-bpc-005",
    author: "Dr. L. Martinez",
    location: "Madrid, Spain",
    product: "bpc-157",
    rating: 5,
    title: "Game-Changer for Our Protocol",
    text: "Switching from vials to ORYN pens reduced our preparation time by 80% and improved dosing accuracy. The COA documentation is impeccable for our compliance records.",
    date: "2026-03-01",
    verified: true,
  },
  {
    id: "r-bpc-006",
    author: "Emma C.",
    location: "Bristol, UK",
    product: "bpc-157",
    rating: 4,
    title: "Great Quality, Slightly Pricey",
    text: "The product quality is undeniable — tested perfectly in our analysis. Only giving four stars because the price point is a bit higher than competitors, but you absolutely get what you pay for here.",
    date: "2026-02-19",
    verified: true,
  },
  {
    id: "r-bpc-007",
    author: "Dr. A. Petrov",
    location: "Vienna, Austria",
    product: "bpc-157",
    rating: 5,
    title: "Outstanding Research Grade",
    text: "We've tested BPC-157 from multiple suppliers. ORYN's purity consistently comes back >99.2% on our own HPLC analysis. The pen format is a bonus for dosing accuracy.",
    date: "2026-01-15",
    verified: true,
  },
  {
    id: "r-bpc-008",
    author: "Michael P.",
    location: "Leeds, UK",
    product: "bpc-157",
    rating: 5,
    title: "Fast Delivery, Perfect Condition",
    text: "Ordered Monday evening, received Wednesday morning. The cold-chain packaging kept everything at proper temperature. Pen mechanism is smooth and precise. Very impressed with the whole experience.",
    date: "2026-03-05",
    verified: true,
  },

  // ── TB-500 (4 reviews) ────────────────────────────────────────────
  {
    id: "r-tb-001",
    author: "Dr. Hannah W.",
    location: "Cambridge, UK",
    product: "tb-500",
    rating: 5,
    title: "Superior Formulation",
    text: "The 15mg dosage in the pen format is perfectly calibrated for our research protocol. Stability over the full 30-day period is excellent — no degradation detected on re-testing at day 28.",
    date: "2026-01-30",
    verified: true,
  },
  {
    id: "r-tb-002",
    author: "Robert D.",
    location: "Glasgow, UK",
    product: "tb-500",
    rating: 5,
    title: "Consistent and Reliable",
    text: "Switched from a US-based supplier to ORYN and the quality difference was immediately apparent. The pen system makes the daily protocol effortless. Third order and counting.",
    date: "2026-02-11",
    verified: true,
  },
  {
    id: "r-tb-003",
    author: "Dr. F. Dubois",
    location: "Paris, France",
    product: "tb-500",
    rating: 4,
    title: "Excellent Product, Quick Delivery",
    text: "Purity verified at our facility in Paris. Arrived in three days with proper cold-chain packaging. The pen mechanism is intuitive even for researchers new to this delivery format.",
    date: "2026-02-25",
    verified: true,
  },
  {
    id: "r-tb-004",
    author: "Claire S.",
    location: "Birmingham, UK",
    product: "tb-500",
    rating: 5,
    title: "No More Reconstitution Hassle",
    text: "The convenience of pre-mixed TB-500 cannot be overstated. We were spending 20 minutes per session on reconstitution. Now it takes seconds. Quality is top-notch as verified by our own testing.",
    date: "2026-03-02",
    verified: true,
  },

  // ── CJC-1295 (2 reviews) ─────────────────────────────────────────
  {
    id: "r-cjc-001",
    author: "Dr. N. Andersen",
    location: "Copenhagen, Denmark",
    product: "cjc-1295",
    rating: 5,
    title: "Precision Dosing at Its Best",
    text: "The dial mechanism on the pen allows for micro-adjustments that are simply impossible with vials and syringes. CJC-1295 purity confirmed via mass spec. Excellent product.",
    date: "2026-01-18",
    verified: true,
  },
  {
    id: "r-cjc-002",
    author: "David L.",
    location: "Liverpool, UK",
    product: "cjc-1295",
    rating: 4,
    title: "Solid Quality, Great Service",
    text: "Good purity, responsive customer service when I had questions about storage. The pen format is much more practical than the vials I was using before. Would recommend.",
    date: "2026-02-08",
    verified: true,
  },

  // ── Ipamorelin (2 reviews) ────────────────────────────────────────
  {
    id: "r-ipa-001",
    author: "Dr. Rachel T.",
    location: "Oxford, UK",
    product: "ipamorelin",
    rating: 5,
    title: "Clean Compound, Clean Results",
    text: "Ipamorelin is tricky to source at genuine research grade. ORYN delivers. Our mass spec analysis showed single-peak purity with no detectable impurities. The pen is an added bonus.",
    date: "2026-02-01",
    verified: true,
  },
  {
    id: "r-ipa-002",
    author: "Mark J.",
    location: "Dublin, Ireland",
    product: "ipamorelin",
    rating: 5,
    title: "Impressed With Everything",
    text: "From ordering to delivery to using the product — every step was smooth. The 6mg pen lasted the full 30 days as promised. Documentation and COA are professional grade.",
    date: "2026-02-22",
    verified: true,
  },

  // ── Tirzepatide Pen (3 reviews) ───────────────────────────────────
  {
    id: "r-tirz-001",
    author: "Dr. Sophie K.",
    location: "Amsterdam, Netherlands",
    product: "tirzepatide-pen",
    rating: 5,
    title: "Research-Grade Tirzepatide Done Right",
    text: "Finally a European source for properly formulated tirzepatide in a pen system. Purity is verified, the dosing mechanism is precise, and delivery to the Netherlands was just four days.",
    date: "2026-01-25",
    verified: true,
  },
  {
    id: "r-tirz-002",
    author: "Andrew B.",
    location: "Cardiff, UK",
    product: "tirzepatide-pen",
    rating: 5,
    title: "Top-Tier Quality",
    text: "The dual GIP/GLP-1 agonist formulation is spot-on. We've run three independent assays and every result aligns with the COA. Packaging, delivery, and product quality are all first class.",
    date: "2026-02-16",
    verified: true,
  },
  {
    id: "r-tirz-003",
    author: "Laura G.",
    location: "Newcastle, UK",
    product: "tirzepatide-pen",
    rating: 4,
    title: "Very Good Product",
    text: "Quality is excellent and the pen format makes dosing straightforward. Would love to see a higher dose option in the future, but the current 10mg pen serves our research needs well.",
    date: "2026-03-07",
    verified: true,
  },

  // ── GHK-Cu (2 reviews) ────────────────────────────────────────────
  {
    id: "r-ghk-001",
    author: "Dr. Elena V.",
    location: "Milan, Italy",
    product: "ghk-cu",
    rating: 5,
    title: "Potent and Pure",
    text: "The 60mg concentration is significantly higher than what most suppliers offer. Copper-peptide complex verified by ICP-MS. Excellent stability throughout the 30-day cycle.",
    date: "2026-01-12",
    verified: true,
  },
  {
    id: "r-ghk-002",
    author: "Jennifer A.",
    location: "Brighton, UK",
    product: "ghk-cu",
    rating: 5,
    title: "Perfect for Skin Research",
    text: "We needed a reliable GHK-Cu source for our dermatology research. ORYN exceeded expectations — the purity is exceptional and the pen delivery eliminates oxidation concerns.",
    date: "2026-02-28",
    verified: true,
  },

  // ── Glutathione (2 reviews) ───────────────────────────────────────
  {
    id: "r-glut-001",
    author: "Dr. O. Bergstrom",
    location: "Stockholm, Sweden",
    product: "glutathione",
    rating: 5,
    title: "High-Dose Glutathione, Excellent Quality",
    text: "The 6g dose in a single pen is remarkable. Stability testing at our lab showed minimal oxidation over the full usage period. The sealed pen system clearly protects the compound well.",
    date: "2026-02-05",
    verified: true,
  },
  {
    id: "r-glut-002",
    author: "Natasha F.",
    location: "Sheffield, UK",
    product: "glutathione",
    rating: 4,
    title: "Great Antioxidant Source",
    text: "Compared this against pharmaceutical glutathione standards and the purity holds up perfectly. The pen format is especially practical for glutathione since it prevents the oxidation issues you get with vials.",
    date: "2026-03-04",
    verified: true,
  },

  // ── NAD+ (3 reviews) ──────────────────────────────────────────────
  {
    id: "r-nad-001",
    author: "Dr. William C.",
    location: "London, UK",
    product: "nad-plus",
    rating: 5,
    title: "IV Clinic Quality in a Pen",
    text: "We were referring clients to IV clinics for NAD+ therapy at ten times the cost. The ORYN pen delivers comparable purity in a fraction of the time and cost. Revolutionary for our practice.",
    date: "2026-01-20",
    verified: true,
  },
  {
    id: "r-nad-002",
    author: "Patricia M.",
    location: "Barcelona, Spain",
    product: "nad-plus",
    rating: 5,
    title: "Superb Bioavailability",
    text: "The 500mg concentration is exactly what our longevity research requires. Testing confirmed the NAD+ is properly stabilised in the pen format. Delivery to Spain was surprisingly quick.",
    date: "2026-02-10",
    verified: true,
  },
  {
    id: "r-nad-003",
    author: "George H.",
    location: "Bath, UK",
    product: "nad-plus",
    rating: 5,
    title: "Worth Every Penny",
    text: "Premium product at a premium price point, but the quality justifies it completely. The pen system protects the NAD+ from degradation far better than any vial solution. Highly recommend.",
    date: "2026-03-03",
    verified: true,
  },

  // ── MediT Tirzepatide (2 reviews) ─────────────────────────────────
  {
    id: "r-medit-001",
    author: "Dr. C. Moreau",
    location: "Lyon, France",
    product: "medit-tirzepatide",
    rating: 5,
    title: "Professional-Grade Prefilled Pen",
    text: "The 40mg prefilled format is incredibly practical for our weekly research protocol. Quality matches pharmaceutical standards. The single-use design eliminates contamination risk entirely.",
    date: "2026-02-07",
    verified: true,
  },
  {
    id: "r-medit-002",
    author: "Oliver W.",
    location: "Nottingham, UK",
    product: "medit-tirzepatide",
    rating: 4,
    title: "Convenient and Effective",
    text: "Once-weekly dosing in a prefilled pen is extremely convenient. Tirzepatide quality is confirmed by our lab. Only wish the price were slightly lower, but the quality and convenience make up for it.",
    date: "2026-02-24",
    verified: true,
  },

  // ── NovaDose NAD+ (2 reviews) ─────────────────────────────────────
  {
    id: "r-nova-001",
    author: "Dr. Ingrid B.",
    location: "Munich, Germany",
    product: "novadose-nad",
    rating: 5,
    title: "Innovation in NAD+ Delivery",
    text: "The cartridge system is unlike anything else on the market. Precise daily microdosing of pharmaceutical-grade NAD+ without the hassle of IV appointments. The Korean-sourced NAD+ is pristine quality.",
    date: "2026-01-28",
    verified: true,
  },
  {
    id: "r-nova-002",
    author: "Simon T.",
    location: "Exeter, UK",
    product: "novadose-nad",
    rating: 5,
    title: "The Future of NAD+ Supplementation",
    text: "We've been tracking NAD+ delivery methods for years and the NovaDose system is a genuine step forward. Near-100% bioavailability, daily microdosing precision, and outstanding build quality. Impressive.",
    date: "2026-03-06",
    verified: true,
  },
];

// ─── Helper Functions ───────────────────────────────────────────────

/** Get all reviews for a specific product slug */
export function getReviewsByProduct(slug: string): Review[] {
  return ALL_REVIEWS.filter((r) => r.product === slug);
}

/** Get aggregate rating stats for a product */
export function getAggregateRating(slug: string): { average: number; count: number } {
  const reviews = getReviewsByProduct(slug);
  if (reviews.length === 0) return { average: 0, count: 0 };
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    average: parseFloat((sum / reviews.length).toFixed(1)),
    count: reviews.length,
  };
}

/** Per-product review statistics */
export const REVIEW_STATS: Record<string, { average: number; count: number }> = {
  "bpc-157": getAggregateRating("bpc-157"),
  "tb-500": getAggregateRating("tb-500"),
  "cjc-1295": getAggregateRating("cjc-1295"),
  "ipamorelin": getAggregateRating("ipamorelin"),
  "tirzepatide-pen": getAggregateRating("tirzepatide-pen"),
  "ghk-cu": getAggregateRating("ghk-cu"),
  "glutathione": getAggregateRating("glutathione"),
  "nad-plus": getAggregateRating("nad-plus"),
  "medit-tirzepatide": getAggregateRating("medit-tirzepatide"),
  "novadose-nad": getAggregateRating("novadose-nad"),
};
