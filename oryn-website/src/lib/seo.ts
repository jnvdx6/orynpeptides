import { products, type Product } from "@/data/products";
import type { UKCity } from "@/data/uk-cities";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://oryn-psi.vercel.app";

// ─── JSON-LD Schema Generators ──────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ORYN Peptide Labs",
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    description: "European biotech laboratory delivering research-grade peptide pen systems with >99% purity.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@orynpeptides.com",
      contactType: "customer service",
    },
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ORYN Peptide Labs",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/en/products?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function productSchema(product: Product, locale: string = "en") {
  const currency = locale === "es" ? "EUR" : "GBP";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `ORYN ${product.name}`,
    description: product.description,
    image: `${SITE_URL}${product.image}`,
    url: `${SITE_URL}/${locale}/products/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: "ORYN",
    },
    sku: product.id,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "ORYN Peptide Labs",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "GB",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          businessDays: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
          },
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Purity", value: ">99%" },
      { "@type": "PropertyValue", name: "Dosage", value: product.dosage },
      { "@type": "PropertyValue", name: "Volume", value: product.volume },
    ],
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function localBusinessSchema(city: UKCity) {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineBusiness",
    name: `ORYN Peptide Labs — ${city.name}`,
    url: `${SITE_URL}/en/peptides/${city.slug}`,
    description: `Buy research-grade peptide pens in ${city.name}. Next-day UK delivery, >99% purity, GMP manufactured.`,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: city.region,
      },
    },
    brand: {
      "@type": "Brand",
      name: "ORYN",
    },
    priceRange: "£169 - £399",
  };
}

export function articleSchema(article: {
  title: string;
  metaDescription: string;
  slug: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    url: `${SITE_URL}/en/learn/${article.slug}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Organization",
      name: "ORYN Peptide Labs",
    },
    publisher: {
      "@type": "Organization",
      name: "ORYN Peptide Labs",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
      },
    },
    image: `${SITE_URL}/og-image.png`,
  };
}

export function howToSchema(article: {
  title: string;
  metaDescription: string;
  slug: string;
  sections: { heading: string; content: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: article.title,
    description: article.metaDescription,
    url: `${SITE_URL}/en/learn/${article.slug}`,
    image: `${SITE_URL}/og-image.png`,
    totalTime: "PT10M",
    supply: [
      { "@type": "HowToSupply", name: "ORYN Peptide Pen" },
      { "@type": "HowToSupply", name: "Sterile pen needle (31G or 32G)" },
      { "@type": "HowToSupply", name: "Alcohol swabs" },
    ],
    tool: [
      { "@type": "HowToTool", name: "Sharps container for needle disposal" },
    ],
    step: article.sections
      .filter((s) => s.heading.toLowerCase().includes("step"))
      .map((section, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: section.heading,
        text: section.content.replace(/\*\*/g, "").replace(/\n/g, " ").slice(0, 500),
        url: `${SITE_URL}/en/learn/${article.slug}#step-${i + 1}`,
      })),
  };
}

// ─── Metadata Helpers ───────────────────────────────────────────────

export function cityMetadata(city: UKCity) {
  const title = `Buy Peptide Pens in ${city.name} | ORYN — Next-Day UK Delivery`;
  const description = `Order research-grade peptide pens in ${city.name}, ${city.region}. ${city.deliveryDays}-day delivery, >99% purity, pre-mixed & ready to use. BPC-157, Tirzepatide, GHK-Cu & more.`;
  return { title, description };
}

export function productCityMetadata(product: Product, city: UKCity) {
  const title = `Buy ${product.name} in ${city.name} | ORYN Peptide Pen — UK Delivery`;
  const description = `Order ORYN ${product.name} ${product.dosage} peptide pen in ${city.name}. ${city.deliveryDays}-day delivery, >99% purity, pre-mixed & ready to use. From £${product.price}.`;
  return { title, description };
}

export function categoryMetadata(category: SEOCategory) {
  return {
    title: category.metaTitle,
    description: category.metaDescription,
  };
}

// ─── SEO Category Data ─────────────────────────────────────────────

export interface SEOCategory {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  description: string;
  productSlugs: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

export const SEO_CATEGORIES: SEOCategory[] = [
  {
    slug: "recovery",
    name: "Recovery & Healing",
    metaTitle: "Peptides for Recovery & Healing | BPC-157, TB-500 | ORYN UK",
    metaDescription: "Research-grade recovery peptide pens. BPC-157 and TB-500 for tissue repair, wound healing, and inflammation research. >99% purity, next-day UK delivery.",
    headline: "Peptides for Recovery & Healing",
    description: "ORYN's recovery peptide range features BPC-157 and TB-500 — two of the most extensively studied peptides for tissue repair and regeneration. Delivered in our precision pen system for consistent, research-grade administration.",
    productSlugs: ["bpc-157", "tb-500"],
    benefits: [
      "Tissue repair and regeneration support",
      "Anti-inflammatory properties",
      "Wound healing acceleration",
      "Tendon and ligament recovery",
      "Gut health and integrity support",
      "Muscle tissue repair",
    ],
    faqs: [
      { question: "What are recovery peptides?", answer: "Recovery peptides are synthetic compounds that support the body's natural healing processes. BPC-157 (Body Protection Compound) and TB-500 (Thymosin Beta-4) are the most studied recovery peptides, with extensive research into their tissue repair, anti-inflammatory, and wound healing properties." },
      { question: "How do BPC-157 and TB-500 differ?", answer: "BPC-157 is a 15-amino acid peptide derived from gastric juice proteins, primarily researched for gut healing, tendon repair, and neuroprotection. TB-500 is a 43-amino acid peptide fragment of Thymosin Beta-4, researched for wound healing, cardiac tissue repair, and reducing inflammation. Many researchers study them together for complementary effects." },
      { question: "Why choose pen delivery for recovery peptides?", answer: "ORYN's pre-mixed peptide pen system eliminates the need for reconstitution, reducing contamination risk and dosing errors. Each pen delivers precise, consistent doses over 30 days, making it ideal for sustained recovery research protocols." },
      { question: "What purity are ORYN recovery peptides?", answer: "All ORYN peptides are manufactured to >99% purity in GMP-certified facilities. Each batch undergoes HPLC testing and comes with a Certificate of Analysis." },
    ],
  },
  {
    slug: "weight-loss",
    name: "Weight Loss & Metabolic",
    metaTitle: "Peptides for Weight Loss UK | Tirzepatide & Semaglutide Pens | ORYN",
    metaDescription: "Research-grade weight loss peptide pens. Tirzepatide dual GIP/GLP-1 agonist for metabolic research. Pre-mixed pens, >99% purity, next-day UK delivery.",
    headline: "Peptides for Weight Loss & Metabolic Research",
    description: "ORYN's metabolic peptide range includes Tirzepatide — a dual GIP/GLP-1 receptor agonist representing the cutting edge of metabolic peptide science. Available in both our standard pen system and the MediT prefilled weekly pen.",
    productSlugs: ["tirzepatide-pen", "medit-tirzepatide"],
    benefits: [
      "Dual hormone receptor action (GIP + GLP-1)",
      "Appetite regulation research",
      "Blood sugar management studies",
      "Metabolic function support",
      "Clinically studied compound",
      "Weekly dosing convenience (MediT Pen)",
    ],
    faqs: [
      { question: "What are metabolic peptides?", answer: "Metabolic peptides are compounds that interact with the body's metabolic signalling pathways. Tirzepatide is a dual GIP/GLP-1 receptor agonist, meaning it activates two key hormonal pathways involved in appetite regulation, insulin secretion, and energy metabolism." },
      { question: "What is the difference between the Tirzepatide Pen and MediT Pen?", answer: "The ORYN Tirzepatide Pen is a multi-dose pen system with 10mg of tirzepatide for 30-day precision dosing. The MediT Pen is a prefilled, single-use injection pen containing 40mg tirzepatide, designed for once-weekly administration." },
      { question: "How does tirzepatide compare to semaglutide?", answer: "Tirzepatide is a dual GIP/GLP-1 agonist (activates two receptors), while semaglutide is a GLP-1 agonist only. Clinical research has shown tirzepatide may offer enhanced metabolic benefits due to its dual mechanism of action." },
      { question: "Are weight loss peptides legal in the UK?", answer: "Research peptides including tirzepatide are legal to purchase for research purposes in the UK. They are not licensed for self-administration. ORYN products are sold strictly for research use only." },
    ],
  },
  {
    slug: "anti-aging",
    name: "Anti-Aging & Longevity",
    metaTitle: "Anti-Aging Peptides UK | GHK-Cu, NAD+, Glutathione | ORYN",
    metaDescription: "Research-grade anti-aging peptide pens. GHK-Cu copper peptide, NAD+ and Glutathione for longevity research. >99% purity, next-day UK delivery.",
    headline: "Peptides for Anti-Aging & Longevity Research",
    description: "ORYN's anti-aging range combines three powerhouse compounds: GHK-Cu (copper peptide) for skin and tissue remodelling, NAD+ for cellular energy and DNA repair, and Glutathione for master antioxidant defence. Available in pen and NovaDose systems.",
    productSlugs: ["ghk-cu", "nad-plus", "glutathione", "novadose-nad"],
    benefits: [
      "Collagen synthesis and skin elasticity",
      "Cellular energy production (NAD+)",
      "DNA repair and longevity pathways",
      "Master antioxidant defence (Glutathione)",
      "Skin brightening and rejuvenation",
      "Neuroprotective properties",
    ],
    faqs: [
      { question: "What are anti-aging peptides?", answer: "Anti-aging peptides are compounds that target various pathways associated with biological aging. GHK-Cu promotes collagen synthesis and tissue remodelling, NAD+ supports cellular energy and DNA repair mechanisms, and Glutathione provides powerful antioxidant defence against oxidative stress." },
      { question: "What is GHK-Cu and how does it work?", answer: "GHK-Cu (glycyl-L-histidyl-L-lysine copper) is a naturally occurring tripeptide with a high affinity for copper ions. Research shows it promotes collagen and elastin production, supports wound healing, and has anti-inflammatory and antioxidant properties." },
      { question: "What is the NovaDose NAD+ system?", answer: "The NovaDose is ORYN's advanced cartridge-based pen system for daily NAD+ microdosing. It delivers pharmaceutical-grade NAD+ with near 100% bioavailability, offering a more affordable and convenient alternative to IV NAD+ therapy." },
      { question: "Can I combine anti-aging peptides?", answer: "Many researchers study complementary peptide protocols. GHK-Cu, NAD+, and Glutathione target different aging pathways and are commonly researched together. Always consult relevant literature and qualified professionals for research protocol design." },
    ],
  },
  {
    slug: "muscle-growth",
    name: "Muscle Growth & Performance",
    metaTitle: "Peptides for Muscle Growth UK | CJC-1295, Ipamorelin | ORYN",
    metaDescription: "Research-grade growth hormone peptide pens. CJC-1295 and Ipamorelin for GH stimulation research. Pre-mixed pens, >99% purity, next-day UK delivery.",
    headline: "Peptides for Muscle Growth & Performance Research",
    description: "ORYN's growth hormone secretagogue range features CJC-1295 and Ipamorelin — two complementary peptides that stimulate natural growth hormone release through distinct mechanisms. Delivered in precision pen systems for consistent research-grade administration.",
    productSlugs: ["cjc-1295", "ipamorelin"],
    benefits: [
      "Natural growth hormone stimulation",
      "Lean body composition support",
      "Deep restorative sleep promotion",
      "Enhanced recovery between sessions",
      "Bone density support",
      "Minimal side effect profile (Ipamorelin)",
    ],
    faqs: [
      { question: "What are growth hormone peptides?", answer: "Growth hormone peptides, or secretagogues, stimulate the pituitary gland to release growth hormone naturally. CJC-1295 is a GHRH analogue that provides sustained GH elevation, while Ipamorelin is a selective ghrelin receptor agonist that triggers GH pulses without affecting other hormones." },
      { question: "How do CJC-1295 and Ipamorelin work together?", answer: "CJC-1295 extends the duration of GH release by mimicking GHRH, while Ipamorelin triggers additional GH pulses through the ghrelin pathway. Together, they provide a synergistic approach to GH research — amplifying and sustaining natural growth hormone release." },
      { question: "Why is Ipamorelin considered selective?", answer: "Unlike other GH secretagogues, Ipamorelin does not significantly increase cortisol, prolactin, or ACTH levels. This selectivity makes it one of the cleanest GH-releasing peptides for research, with fewer potential side effects." },
      { question: "What purity are ORYN growth peptides?", answer: "All ORYN peptides exceed 99% purity, manufactured in GMP-certified European facilities. Each batch is independently tested via HPLC and mass spectrometry." },
    ],
  },
  {
    slug: "skin-rejuvenation",
    name: "Skin Rejuvenation",
    metaTitle: "Peptides for Skin UK | GHK-Cu Copper Peptide & Glutathione | ORYN",
    metaDescription: "Research-grade skin peptide pens. GHK-Cu copper peptide and Glutathione for skin rejuvenation research. >99% purity, next-day UK delivery.",
    headline: "Peptides for Skin Rejuvenation Research",
    description: "ORYN offers two powerful peptides for skin science research: GHK-Cu (copper peptide), which promotes collagen synthesis and tissue remodelling, and Glutathione, the body's master antioxidant with well-documented skin brightening properties.",
    productSlugs: ["ghk-cu", "glutathione"],
    benefits: [
      "Collagen and elastin synthesis",
      "Skin elasticity improvement",
      "Antioxidant and detoxification",
      "Skin brightening properties",
      "Wound healing acceleration",
      "Anti-inflammatory effects",
    ],
    faqs: [
      { question: "How does GHK-Cu benefit skin?", answer: "GHK-Cu (copper peptide) has been shown in over 70 published studies to stimulate collagen production, promote elastin synthesis, increase glycosaminoglycans (like hyaluronic acid), and support skin's natural repair processes. It is one of the most extensively researched peptides for skin biology." },
      { question: "How does injectable Glutathione differ from oral supplements?", answer: "Injectable Glutathione has significantly higher bioavailability compared to oral supplements, which are largely broken down during digestion. ORYN's pen-delivered Glutathione bypasses the digestive system entirely, delivering the active compound directly for maximum research efficacy." },
      { question: "Can GHK-Cu and Glutathione be researched together?", answer: "Yes, these peptides target complementary skin pathways — GHK-Cu promotes structural protein synthesis (collagen, elastin) while Glutathione provides antioxidant defence and melanin regulation. They are commonly studied together in skin research protocols." },
    ],
  },
];

export function getCategoryBySlug(slug: string): SEOCategory | undefined {
  return SEO_CATEGORIES.find((c) => c.slug === slug);
}

export function getProductsForCategory(category: SEOCategory): Product[] {
  return category.productSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => !!p);
}
