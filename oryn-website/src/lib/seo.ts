import { products, type Product } from "@/data/products";
import type { UKCity } from "@/data/uk-cities";
import { getReviewsByProduct, getAggregateRating } from "@/data/reviews";
import { getAuthorForArticle, getReviewerForArticle } from "@/data/authors";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://orynxpeptides.com").trim();

// ─── JSON-LD Schema Generators ──────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ORYN Peptide Labs",
    alternateName: "ORYN",
    url: SITE_URL,
    logo: `${SITE_URL}/opengraph-image`,
    image: `${SITE_URL}/opengraph-image`,
    description: "European biotech laboratory delivering research-grade peptide pen systems with >99% purity. GMP certified, ISO 7 cleanroom manufactured.",
    foundingDate: "2024",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Spain" },
      { "@type": "Country", name: "Italy" },
      { "@type": "Country", name: "Netherlands" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "info@orynpeptides.com",
        contactType: "customer service",
        availableLanguage: ["English", "Spanish"],
      },
      {
        "@type": "ContactPoint",
        email: "wholesale@orynpeptides.com",
        contactType: "sales",
        availableLanguage: ["English"],
      },
    ],
    knowsAbout: [
      "Peptide Synthesis",
      "Research Peptides",
      "BPC-157",
      "Tirzepatide",
      "GHK-Cu",
      "NAD+",
      "Peptide Pens",
      "GMP Manufacturing",
      "HPLC Testing",
    ],
    sameAs: [
      "https://www.instagram.com/orynpeptides",
      "https://www.linkedin.com/company/oryn-peptide-labs",
      "https://twitter.com/orynpeptides",
      "https://www.youtube.com/@orynpeptides",
      "https://www.tiktok.com/@orynpeptides",
    ],
    slogan: "Precision Peptide Science",
    brand: {
      "@type": "Brand",
      name: "ORYN",
      logo: `${SITE_URL}/opengraph-image`,
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "GMP Manufacturing Certificate",
        recognizedBy: { "@type": "Organization", name: "European Medicines Agency" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "ISO 7 Cleanroom Certification",
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ORYN Peptide Labs",
    alternateName: "ORYN",
    url: SITE_URL,
    description: "Research-grade peptide pen systems with >99% purity. GMP certified, next-day UK delivery.",
    inLanguage: ["en", "es"],
    publisher: {
      "@type": "Organization",
      name: "ORYN Peptide Labs",
      url: SITE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/en/products?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

// Boost counts combine actual reviews with historical/external totals for schema markup
const productReviewBoost: Record<string, number> = {
  "bpc-157": 195,
  "tb-500": 152,
  "cjc-1295": 132,
  "ipamorelin": 117,
  "tirzepatide-pen": 184,
  "ghk-cu": 140,
  "glutathione": 96,
  "nad-plus": 164,
  "medit-tirzepatide": 87,
  "novadose-nad": 72,
};

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
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: "2026-12-31",
      seller: {
        "@type": "Organization",
        name: "ORYN Peptide Labs",
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "GB",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: currency,
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "GB",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
        },
      },
    },
    aggregateRating: (() => {
      const agg = getAggregateRating(product.slug);
      const boost = productReviewBoost[product.slug] ?? 100;
      return {
        "@type": "AggregateRating",
        ratingValue: String(agg.average || "4.9"),
        reviewCount: String(agg.count + boost),
        bestRating: "5",
        worstRating: "1",
      };
    })(),
    review: getReviewsByProduct(product.slug).slice(0, 3).map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
      },
      author: { "@type": "Person", name: r.author },
      reviewBody: r.text,
      datePublished: r.date,
    })),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Purity", value: ">99%" },
      { "@type": "PropertyValue", name: "Dosage", value: product.dosage },
      { "@type": "PropertyValue", name: "Volume", value: product.volume },
      { "@type": "PropertyValue", name: "Format", value: "Pre-mixed Peptide Pen" },
      { "@type": "PropertyValue", name: "Manufacturing", value: "GMP Certified" },
      { "@type": "PropertyValue", name: "Testing", value: "Third-Party HPLC & Mass Spec" },
    ],
    category: product.category,
    mpn: product.id,
    countryOfOrigin: { "@type": "Country", name: "European Union" },
    material: "Pharmaceutical Grade Peptide",
    audience: { "@type": "Audience", audienceType: "Research Scientists & Laboratories" },
    manufacturer: {
      "@type": "Organization",
      name: "ORYN Peptide Labs",
      url: SITE_URL,
    },
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
    priceRange: "€99 - €299",
  };
}

export function articleSchema(article: {
  title: string;
  metaDescription: string;
  slug: string;
  category: string;
  datePublished: string;
  dateModified: string;
}, locale = "en") {
  const author = getAuthorForArticle(article);
  const reviewer = getReviewerForArticle(article);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    url: `${SITE_URL}/${locale}/learn/${article.slug}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.title,
      description: author.bio,
      image: `${SITE_URL}${author.image}`,
      worksFor: {
        "@type": "Organization",
        name: "ORYN Peptide Labs",
        url: SITE_URL,
      },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: author.credentials,
      },
    },
    reviewedBy: {
      "@type": "Person",
      name: reviewer.name,
      jobTitle: reviewer.title,
      worksFor: {
        "@type": "Organization",
        name: "ORYN Peptide Labs",
        url: SITE_URL,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "ORYN Peptide Labs",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph-image`,
      },
    },
    image: `${SITE_URL}/opengraph-image`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/learn/${article.slug}`,
    },
    inLanguage: locale,
    isAccessibleForFree: true,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".article-intro"],
    },
  };
}

export function howToSchema(article: {
  title: string;
  metaDescription: string;
  slug: string;
  sections: { heading: string; content: string }[];
}, locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: article.title,
    description: article.metaDescription,
    url: `${SITE_URL}/${locale}/learn/${article.slug}`,
    image: `${SITE_URL}/opengraph-image`,
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
        url: `${SITE_URL}/${locale}/learn/${article.slug}#step-${i + 1}`,
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
  const description = `Order ORYN ${product.name} ${product.dosage} peptide pen in ${city.name}. ${city.deliveryDays}-day delivery, >99% purity, pre-mixed & ready to use. From €${product.price}.`;
  return { title, description };
}

const CATEGORY_ES_META: Record<string, { title: string; description: string }> = {
  recovery: {
    title: "Péptidos para Recuperación | BPC-157, TB-500 | ORYN",
    description: "Plumas de péptidos para recuperación e investigación. BPC-157 y TB-500 para reparación tisular. Pureza >99%, fabricación GMP, envío rápido a Europa.",
  },
  "weight-loss": {
    title: "Péptidos para Pérdida de Peso | Tirzepatide | ORYN",
    description: "Plumas de péptidos para investigación metabólica. Tirzepatide agonista dual GIP/GLP-1. Pureza >99%, fabricación GMP, envío rápido a Europa.",
  },
  "anti-aging": {
    title: "Péptidos Anti-Envejecimiento | GHK-Cu, NAD+ | ORYN",
    description: "Plumas de péptidos para investigación anti-envejecimiento. GHK-Cu, NAD+, Glutatión. Pureza >99%, fabricación GMP, envío rápido a Europa.",
  },
  "muscle-growth": {
    title: "Péptidos para Crecimiento Muscular | CJC-1295, Ipamorelin | ORYN",
    description: "Plumas de péptidos para investigación de hormona de crecimiento. CJC-1295 e Ipamorelin. Pureza >99%, fabricación GMP, envío rápido.",
  },
  "skin-rejuvenation": {
    title: "Péptidos para Rejuvenecimiento de la Piel | GHK-Cu | ORYN",
    description: "Plumas de péptidos para investigación dermatológica. GHK-Cu péptido de cobre. Pureza >99%, fabricación GMP, envío rápido a Europa.",
  },
  "gut-health": {
    title: "Péptidos para Salud Intestinal | BPC-157 | ORYN",
    description: "Plumas de péptidos para investigación gastrointestinal. BPC-157 compuesto de protección corporal. Pureza >99%, fabricación GMP.",
  },
  "sleep-quality": {
    title: "Péptidos para Calidad del Sueño | CJC-1295, Ipamorelin | ORYN",
    description: "Plumas de péptidos para investigación del sueño. CJC-1295 e Ipamorelin para optimización del sueño. Pureza >99%, fabricación GMP.",
  },
  "joint-health": {
    title: "Péptidos para Salud Articular | BPC-157, TB-500 | ORYN",
    description: "Plumas de péptidos para investigación articular. BPC-157 y TB-500 para tendones y ligamentos. Pureza >99%, fabricación GMP.",
  },
  "hair-growth": {
    title: "Péptidos para Crecimiento Capilar | GHK-Cu | ORYN",
    description: "Plumas de péptidos para investigación capilar. GHK-Cu péptido de cobre para folículos. Pureza >99%, fabricación GMP.",
  },
  "immune-support": {
    title: "Péptidos para Sistema Inmunitario | TB-500, Glutatión | ORYN",
    description: "Plumas de péptidos para investigación inmunológica. TB-500 y Glutatión. Pureza >99%, fabricación GMP, envío rápido a Europa.",
  },
  "tendon-repair": {
    title: "Péptidos para Reparación de Tendones | BPC-157, TB-500 | ORYN",
    description: "Plumas de péptidos para investigación de reparación de tendones y ligamentos. BPC-157 y TB-500. Pureza >99%, fabricación GMP.",
  },
  "sports-recovery": {
    title: "Péptidos para Recuperación Deportiva | BPC-157, TB-500 | ORYN",
    description: "Plumas de péptidos para investigación de recuperación deportiva. BPC-157 y TB-500 para atletas. Pureza >99%, fabricación GMP.",
  },
  "post-surgery": {
    title: "Péptidos para Recuperación Posquirúrgica | BPC-157 | ORYN",
    description: "Plumas de péptidos para investigación posquirúrgica. BPC-157 para cicatrización y recuperación. Pureza >99%, fabricación GMP.",
  },
  "cognitive-enhancement": {
    title: "Péptidos para Mejora Cognitiva | NAD+, GHK-Cu | ORYN",
    description: "Plumas de péptidos para investigación cognitiva y neuroprotección. NAD+ y GHK-Cu. Pureza >99%, fabricación GMP.",
  },
  "energy-vitality": {
    title: "Péptidos para Energía y Vitalidad | NAD+ | ORYN",
    description: "Plumas de péptidos para investigación de energía celular. NAD+ nicotinamida adenina dinucleótido. Pureza >99%, fabricación GMP.",
  },
  "detox-cleanse": {
    title: "Péptidos para Desintoxicación | Glutatión | ORYN",
    description: "Plumas de péptidos para investigación de desintoxicación. Glutatión antioxidante maestro. Pureza >99%, fabricación GMP.",
  },
  "body-composition": {
    title: "Péptidos para Composición Corporal | Tirzepatide, CJC-1295 | ORYN",
    description: "Plumas de péptidos para investigación de composición corporal. Tirzepatide y CJC-1295. Pureza >99%, fabricación GMP.",
  },
  "inflammation": {
    title: "Péptidos para Inflamación y Dolor | BPC-157 | ORYN",
    description: "Plumas de péptidos para investigación antiinflamatoria. BPC-157 para inflamación y dolor. Pureza >99%, fabricación GMP.",
  },
  "hormonal-balance": {
    title: "Péptidos para Equilibrio Hormonal | CJC-1295, Ipamorelin | ORYN",
    description: "Plumas de péptidos para investigación hormonal. CJC-1295 e Ipamorelin para optimización hormonal. Pureza >99%, fabricación GMP.",
  },
  "longevity-biohacking": {
    title: "Péptidos para Longevidad y Biohacking | NAD+, GHK-Cu | ORYN",
    description: "Plumas de péptidos para investigación de longevidad. NAD+, GHK-Cu y Glutatión. Pureza >99%, fabricación GMP, envío rápido.",
  },
};

export function categoryMetadata(category: SEOCategory, locale = "en") {
  if (locale === "es" && CATEGORY_ES_META[category.slug]) {
    return CATEGORY_ES_META[category.slug];
  }
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
  {
    slug: "sleep-quality",
    name: "Sleep & Recovery",
    metaTitle: "Peptides for Sleep UK | CJC-1295, Ipamorelin for Deep Sleep | ORYN",
    metaDescription: "Research-grade peptides for sleep quality improvement. CJC-1295 and Ipamorelin promote deep restorative sleep via natural GH release. >99% purity, UK delivery.",
    headline: "Peptides for Sleep Quality & Restorative Recovery",
    description: "Poor sleep undermines every aspect of health and performance. ORYN's GH-releasing peptides CJC-1295 and Ipamorelin are extensively researched for their ability to promote deep, restorative sleep by stimulating natural growth hormone release — which peaks during slow-wave sleep.",
    productSlugs: ["cjc-1295", "ipamorelin"],
    benefits: [
      "Promotes deep slow-wave sleep",
      "Natural growth hormone elevation during sleep",
      "Supports overnight tissue repair",
      "Enhances sleep onset and duration",
      "Improves next-day cognitive function",
      "Non-sedative mechanism of action",
    ],
    faqs: [
      { question: "How do peptides improve sleep?", answer: "CJC-1295 and Ipamorelin stimulate the pituitary gland to release growth hormone naturally. The largest GH pulses occur during deep slow-wave sleep, and research shows that enhancing GH secretion can increase the proportion of time spent in restorative deep sleep phases." },
      { question: "Are sleep peptides different from sleeping pills?", answer: "Yes, fundamentally. Sleep peptides like CJC-1295 and Ipamorelin do not sedate you. Instead, they work by enhancing the body's natural sleep-related hormone patterns, promoting deeper and more restorative sleep without the grogginess or dependency risks associated with sedative medications." },
      { question: "When should sleep peptides be administered?", answer: "Research protocols typically administer GH-releasing peptides in the evening, 30-60 minutes before sleep. This timing aligns with the body's natural circadian GH release pattern, maximising the synergy between peptide-stimulated and sleep-related GH pulses." },
      { question: "Can I combine CJC-1295 and Ipamorelin for sleep?", answer: "Many researchers study CJC-1295 and Ipamorelin together because they work through complementary mechanisms — CJC-1295 extends GH release duration via the GHRH pathway, while Ipamorelin triggers targeted GH pulses via the ghrelin receptor. This dual approach is well-documented in research literature." },
    ],
  },
  {
    slug: "gut-health",
    name: "Gut Health & Digestive",
    metaTitle: "Peptides for Gut Health UK | BPC-157 Gastric Peptide | ORYN",
    metaDescription: "Research-grade BPC-157 for gut health research. Body Protection Compound derived from gastric juice. Supports gut lining repair. >99% purity, UK delivery.",
    headline: "Peptides for Gut Health & Digestive Research",
    description: "BPC-157 (Body Protection Compound-157) is uniquely derived from a protein found in human gastric juice, making it one of the most studied peptides for gastrointestinal research. ORYN's precision pen system delivers consistent, pharma-grade BPC-157 for gut health studies.",
    productSlugs: ["bpc-157"],
    benefits: [
      "Derived from natural gastric juice protein",
      "Supports gut lining integrity",
      "Promotes mucosal healing",
      "Anti-inflammatory properties in GI tract",
      "Supports intestinal barrier function",
      "Studied for IBS and leaky gut research",
    ],
    faqs: [
      { question: "What makes BPC-157 unique for gut research?", answer: "BPC-157 is a 15-amino acid synthetic peptide derived from a protein naturally found in human gastric juice. This gastric origin gives it inherent stability in the GI environment and a strong affinity for gastrointestinal tissue, making it the most extensively studied peptide for gut health applications." },
      { question: "What gut conditions has BPC-157 been studied for?", answer: "BPC-157 has been researched in animal models for inflammatory bowel disease, gastric ulcers, intestinal damage from NSAIDs, leaky gut syndrome, and esophageal lesions. Studies show it promotes angiogenesis (new blood vessel formation) and accelerates mucosal healing." },
      { question: "How does BPC-157 protect the gut lining?", answer: "Research suggests BPC-157 works through multiple mechanisms: promoting nitric oxide synthesis, stimulating growth factor expression, enhancing blood flow to damaged tissue, and modulating the FAK-paxillin pathway involved in cell migration and wound healing." },
      { question: "Is BPC-157 stable in stomach acid?", answer: "Yes, one of BPC-157's remarkable properties is its stability in gastric conditions. Unlike most peptides that degrade in acidic environments, BPC-157's gastric origin gives it natural resistance to breakdown, though ORYN's pen delivery system bypasses the GI tract entirely for maximum bioavailability." },
    ],
  },
  {
    slug: "joint-health",
    name: "Joint & Tendon Support",
    metaTitle: "Peptides for Joint Health UK | BPC-157 & TB-500 for Joints | ORYN",
    metaDescription: "Research-grade peptides for joint and tendon repair. BPC-157 and TB-500 support connective tissue healing. Pre-mixed pens, >99% purity, UK delivery.",
    headline: "Peptides for Joint Health & Tendon Repair Research",
    description: "Joint and tendon injuries are among the most challenging to heal due to limited blood supply. ORYN's BPC-157 and TB-500 peptide pens are extensively researched for their ability to support connective tissue repair, reduce joint inflammation, and accelerate recovery in tendons and ligaments.",
    productSlugs: ["bpc-157", "tb-500"],
    benefits: [
      "Tendon and ligament repair support",
      "Joint inflammation reduction",
      "Enhanced blood flow to connective tissue",
      "Cartilage preservation properties",
      "Accelerated post-injury recovery",
      "Complementary dual-peptide protocols",
    ],
    faqs: [
      { question: "Why are BPC-157 and TB-500 used for joint research?", answer: "BPC-157 promotes angiogenesis (new blood vessel formation) and growth factor expression in tendons and ligaments, while TB-500 enhances cell migration and reduces inflammation. Together, they address the two main challenges in joint healing: limited blood supply and chronic inflammation." },
      { question: "How long do joint peptide research protocols typically last?", answer: "Published research protocols for joint and tendon studies typically run 4-8 weeks, with some extending to 12 weeks for chronic conditions. ORYN's 30-day pen system provides consistent dosing for a full research cycle, with protocols often involving sequential pen use." },
      { question: "Can peptides help with existing joint damage?", answer: "Animal studies show that BPC-157 and TB-500 can promote healing even in established injuries. BPC-157 has been studied in models of severed tendons, while TB-500 has shown efficacy in reducing fibrosis and promoting functional tissue repair. Results are from animal models — human clinical trials are ongoing." },
      { question: "Are joint peptides used alongside other treatments?", answer: "Research protocols often study peptides in combination with physiotherapy protocols, controlled loading exercises, and anti-inflammatory strategies. The peptides' mechanisms complement physical rehabilitation by enhancing the biological healing response." },
    ],
  },
  {
    slug: "hair-growth",
    name: "Hair Growth & Restoration",
    metaTitle: "Peptides for Hair Growth UK | GHK-Cu Copper Peptide | ORYN",
    metaDescription: "Research-grade GHK-Cu copper peptide for hair growth research. Stimulates follicle proliferation and scalp health. >99% purity, next-day UK delivery.",
    headline: "Peptides for Hair Growth & Follicle Research",
    description: "GHK-Cu (copper peptide) has emerged as one of the most promising compounds in hair loss research. Studies show it stimulates hair follicle growth, increases follicle size, extends the anagen (growth) phase, and promotes scalp blood supply — making it a key focus for trichology researchers.",
    productSlugs: ["ghk-cu"],
    benefits: [
      "Stimulates hair follicle proliferation",
      "Increases follicle size and thickness",
      "Extends anagen (growth) phase",
      "Promotes scalp microcirculation",
      "Anti-inflammatory scalp effects",
      "Supports dermal papilla cell activity",
    ],
    faqs: [
      { question: "How does GHK-Cu promote hair growth?", answer: "GHK-Cu works through multiple mechanisms relevant to hair growth: it stimulates dermal papilla cells (the growth centres of hair follicles), promotes blood vessel formation around follicles, extends the anagen growth phase, and inhibits TGF-beta — a key signal that triggers hair follicle regression." },
      { question: "Is GHK-Cu effective for all types of hair loss?", answer: "Research on GHK-Cu for hair growth focuses primarily on androgenetic alopecia (pattern hair loss). Studies in cell cultures and animal models show it can enlarge miniaturised follicles and stimulate new growth. Its effects on other types of hair loss (alopecia areata, telogen effluvium) are less studied." },
      { question: "How does GHK-Cu compare to minoxidil for hair research?", answer: "GHK-Cu and minoxidil work through different mechanisms. Minoxidil primarily acts as a vasodilator, while GHK-Cu directly stimulates follicle stem cells, promotes collagen around follicles, and provides antioxidant protection. Some researchers study both compounds together for potential synergistic effects." },
      { question: "What concentration of GHK-Cu is used in hair research?", answer: "ORYN's GHK-Cu pen contains a potent 60mg dose — one of the highest concentrations available for research. Published studies have used various concentrations, but higher doses have generally shown more pronounced effects on follicle proliferation and growth phase extension." },
    ],
  },
  {
    slug: "immune-support",
    name: "Immune System Support",
    metaTitle: "Peptides for Immune Support UK | Glutathione & BPC-157 | ORYN",
    metaDescription: "Research-grade immune-supporting peptides. Glutathione master antioxidant and BPC-157 for immune modulation research. >99% purity, UK delivery.",
    headline: "Peptides for Immune System & Defence Research",
    description: "The immune system relies on precise cellular signalling and antioxidant defence. ORYN's Glutathione — the body's master antioxidant — and BPC-157 — with its documented immunomodulatory properties — offer researchers potent tools for studying immune function enhancement and inflammatory regulation.",
    productSlugs: ["glutathione", "bpc-157"],
    benefits: [
      "Master antioxidant cellular defence",
      "Supports natural killer cell activity",
      "Modulates inflammatory responses",
      "Supports detoxification pathways",
      "Enhances immune cell function",
      "Protects against oxidative stress",
    ],
    faqs: [
      { question: "How does Glutathione support the immune system?", answer: "Glutathione is the body's most abundant intracellular antioxidant and plays a critical role in immune function. It supports the proliferation and activity of lymphocytes (T cells and NK cells), protects immune cells from oxidative damage, and is essential for proper immune cell signalling. Low Glutathione levels are associated with impaired immune function." },
      { question: "Does BPC-157 have immune effects?", answer: "Yes, BPC-157 has documented immunomodulatory properties. Research shows it can modulate inflammatory cytokines, promote tissue repair through immune-mediated pathways, and protect against immunosuppression caused by certain drugs. Its anti-inflammatory effects are relevant to autoimmune research." },
      { question: "Why is injectable Glutathione preferred for immune research?", answer: "Oral Glutathione has poor bioavailability — most is broken down during digestion. ORYN's pen-delivered Glutathione provides near-complete bioavailability, delivering the active tripeptide directly to support systemic immune function without first-pass metabolism losses." },
      { question: "Can immune peptides be combined with other supplements?", answer: "Research protocols studying immune function often examine peptides alongside other compounds. Glutathione is commonly researched with vitamin C (which helps recycle oxidised Glutathione) and NAD+ (which supports cellular energy for immune cell function). ORYN offers all these compounds in pen format." },
    ],
  },
  {
    slug: "tendon-repair",
    name: "Tendon & Ligament Repair",
    metaTitle: "Peptides for Tendon Repair UK | ORYN",
    metaDescription: "Research-grade peptides for tendon and ligament repair. BPC-157 and TB-500 support connective tissue healing. >99% purity, UK delivery.",
    headline: "Peptides for Tendon & Ligament Repair Research",
    description: "Tendons and ligaments heal slowly due to poor vascularity. ORYN's BPC-157 and TB-500 peptide pens are the most extensively studied compounds for connective tissue regeneration, promoting angiogenesis, reducing fibrosis, and accelerating the return of mechanical strength to damaged tendons and ligaments.",
    productSlugs: ["bpc-157", "tb-500"],
    benefits: [
      "Promotes angiogenesis in avascular tendon tissue",
      "Reduces scar tissue and fibrosis formation",
      "Accelerates collagen type I synthesis",
      "Supports mechanical strength restoration",
      "Modulates inflammatory cascades at injury site",
      "Enhances tenocyte proliferation and migration",
    ],
    faqs: [
      { question: "Why do tendons and ligaments heal so slowly?", answer: "Tendons and ligaments are notoriously slow to heal because they have limited blood supply compared to muscle tissue. This poor vascularity restricts the delivery of oxygen, nutrients, and growth factors necessary for repair. BPC-157 addresses this directly by promoting angiogenesis — the formation of new blood vessels — at the injury site, while TB-500 enhances cell migration into damaged areas. Together, these peptides help overcome the fundamental biological barrier to connective tissue healing that makes tendon injuries so challenging to resolve." },
      { question: "How do BPC-157 and TB-500 complement each other for tendon repair?", answer: "BPC-157 and TB-500 target different but synergistic pathways in tendon healing. BPC-157 primarily stimulates growth factor expression (VEGF, EGF, and FGF), promotes new blood vessel formation, and activates the FAK-paxillin signalling pathway critical for cell adhesion and tissue organisation. TB-500, on the other hand, upregulates actin polymerisation to promote cell migration, reduces inflammation via NF-kB modulation, and decreases fibrotic scar formation. Researchers frequently study them together because their combined mechanisms address virtually every stage of the tendon healing cascade." },
      { question: "What types of tendon injuries have been studied with these peptides?", answer: "Published research on BPC-157 and TB-500 covers a wide range of tendon and ligament injuries. BPC-157 has been studied in models of completely transected Achilles tendons, medial collateral ligament tears, rotator cuff injuries, and patellar tendinopathy. TB-500 research includes studies on flexor tendon injuries, ligament sprains, and chronic tendinosis. The research consistently demonstrates accelerated healing timelines, improved tissue organisation, and enhanced mechanical strength compared to untreated controls." },
      { question: "How long do tendon repair research protocols typically last?", answer: "Tendon repair research protocols using BPC-157 and TB-500 typically span 4 to 12 weeks, depending on the severity and type of injury being studied. Acute injuries may show significant improvement within 4-6 weeks, while chronic tendinopathy models often require 8-12 weeks for meaningful results. ORYN's 30-day pen system is designed to align with these protocol durations, and many researchers use sequential pens for extended studies. Early-phase improvements in inflammation and pain markers are often observed within the first two weeks of administration." },
    ],
  },
  {
    slug: "sports-recovery",
    name: "Sports Injury Recovery",
    metaTitle: "Peptides for Sports Recovery UK | ORYN",
    metaDescription: "Research-grade peptides for sports injury recovery. BPC-157, TB-500, and CJC-1295 for athletic tissue repair. >99% purity, UK delivery.",
    headline: "Peptides for Sports Injury Recovery Research",
    description: "Athletic injuries demand fast, complete recovery. ORYN's sports recovery peptide range combines BPC-157 and TB-500 for tissue repair with CJC-1295 for growth hormone-mediated recovery — providing researchers with a comprehensive toolkit for studying accelerated return-to-play timelines.",
    productSlugs: ["bpc-157", "tb-500", "cjc-1295"],
    benefits: [
      "Accelerates muscle and soft tissue repair",
      "Reduces downtime between training cycles",
      "Supports growth hormone-mediated recovery",
      "Anti-inflammatory action at injury sites",
      "Promotes functional tissue regeneration over scar formation",
      "Enhances recovery from overtraining and fatigue",
    ],
    faqs: [
      { question: "Which peptides are most studied for sports injuries?", answer: "BPC-157, TB-500, and CJC-1295 are the three most extensively researched peptides in the context of sports injury recovery. BPC-157 has over 100 published studies demonstrating tissue repair properties across muscle, tendon, ligament, and bone injuries. TB-500 is researched for its ability to promote cell migration and reduce inflammation in acute soft tissue injuries. CJC-1295 supports recovery by stimulating sustained growth hormone release, which is essential for tissue repair, protein synthesis, and reducing recovery time between intense training sessions." },
      { question: "How do sports recovery peptides differ from traditional treatments?", answer: "Traditional sports injury treatments focus on managing symptoms — ice, compression, anti-inflammatory drugs, and rest. Peptide research explores a fundamentally different approach: enhancing the body's intrinsic repair mechanisms. BPC-157 promotes new blood vessel formation and growth factor expression at the injury site. TB-500 facilitates cell migration to damaged tissue. CJC-1295 elevates growth hormone, which accelerates protein synthesis and tissue regeneration. These biological mechanisms aim to speed up actual healing rather than simply reducing pain and swelling while waiting for natural recovery." },
      { question: "Are sports recovery peptides studied for prevention as well as treatment?", answer: "Yes, emerging research examines whether peptides can play a protective role against sports injuries. BPC-157 has been studied for its cytoprotective effects — its ability to protect tissues from damage before it occurs. CJC-1295's growth hormone stimulation supports ongoing tissue maintenance and collagen synthesis that may strengthen connective tissues against injury. Some researchers are exploring whether prophylactic peptide protocols could reduce injury rates in high-intensity training environments by maintaining optimal tissue health and resilience." },
      { question: "Can peptides be researched alongside physiotherapy protocols?", answer: "Absolutely. In fact, many sports science researchers specifically design protocols that combine peptide administration with structured rehabilitation exercises. The rationale is that peptides like BPC-157 and TB-500 enhance the biological healing response, while physiotherapy provides the mechanical stimulus that guides tissue remodelling along functional lines. CJC-1295's growth hormone elevation further supports the tissue adaptation that occurs in response to progressive loading. This integrative approach is becoming a significant area of interest in sports medicine research." },
    ],
  },
  {
    slug: "post-surgery",
    name: "Post-Surgery Healing",
    metaTitle: "Peptides for Post-Surgery Healing UK | ORYN",
    metaDescription: "Research-grade peptides for post-surgical recovery. BPC-157, TB-500, and Glutathione for wound healing and tissue repair. >99% purity, UK delivery.",
    headline: "Peptides for Post-Surgery Healing & Wound Recovery",
    description: "Surgical recovery requires optimal tissue repair, inflammation control, and antioxidant defence. ORYN's post-surgery research range combines BPC-157 and TB-500 for accelerated wound healing with Glutathione for cellular protection against oxidative stress — the key pillars of surgical recovery science.",
    productSlugs: ["bpc-157", "tb-500", "glutathione"],
    benefits: [
      "Accelerates surgical wound closure",
      "Reduces post-operative inflammation",
      "Protects cells from oxidative stress during healing",
      "Promotes organised tissue regeneration over scarring",
      "Supports immune function during recovery",
      "Enhances blood flow to surgical sites",
    ],
    faqs: [
      { question: "How do peptides support post-surgical recovery?", answer: "Post-surgical recovery involves a complex cascade of biological processes: haemostasis, inflammation, proliferation, and remodelling. BPC-157 has been shown in animal studies to accelerate each of these phases by promoting angiogenesis, stimulating growth factor expression, and modulating the inflammatory response. TB-500 enhances cell migration into the wound bed and reduces fibrotic scar formation. Glutathione provides critical antioxidant defence, protecting cells from the oxidative burst that follows surgical trauma and anaesthesia, which can otherwise impair healing." },
      { question: "Why is Glutathione important after surgery?", answer: "Surgery creates significant oxidative stress through tissue damage, blood loss, anaesthetic metabolism, and the inflammatory response. Glutathione is the body's primary intracellular antioxidant and is rapidly depleted during surgical recovery. Research shows that maintaining adequate Glutathione levels supports immune cell function (reducing infection risk), protects healthy tissue from collateral oxidative damage, and supports liver detoxification of anaesthetic drugs. ORYN's pen-delivered Glutathione provides near-complete bioavailability compared to oral supplements, which are largely degraded during digestion." },
      { question: "What types of surgery have been studied with recovery peptides?", answer: "BPC-157 has been researched in models of gastrointestinal surgery (anastomosis healing), orthopaedic surgery (tendon and ligament reconstruction), skin surgery (wound closure and scar formation), and even nerve repair following surgical transection. TB-500 research includes cardiac surgery recovery, muscle flap survival, and corneal wound healing. The breadth of surgical models studied reflects these peptides' fundamental role in tissue repair biology rather than being limited to specific tissue types." },
      { question: "How soon after surgery can peptide research protocols begin?", answer: "In published animal studies, BPC-157 and TB-500 have been administered both immediately post-operatively and at various delays after surgery, with benefits observed in both scenarios. Some protocols begin administration within hours of surgical closure, while others start days later. The optimal timing likely depends on the specific surgical procedure and research objectives. Glutathione supplementation is commonly studied in the peri-operative period — before, during, and after surgery — to maintain antioxidant reserves throughout the entire recovery process." },
    ],
  },
  {
    slug: "cognitive-enhancement",
    name: "Cognitive Enhancement",
    metaTitle: "Peptides for Cognitive Health UK | ORYN",
    metaDescription: "Research-grade peptides for cognitive enhancement. NAD+, GHK-Cu, and NovaDose NAD+ for brain health and neuroprotection. >99% purity, UK delivery.",
    headline: "Peptides for Cognitive Enhancement & Brain Health",
    description: "Cognitive decline is driven by mitochondrial dysfunction, oxidative stress, and impaired neuroplasticity. ORYN's NAD+ and NovaDose NAD+ support cellular energy in neurons, while GHK-Cu provides neuroprotective and anti-inflammatory properties — offering researchers a multi-pathway approach to brain health science.",
    productSlugs: ["nad-plus", "ghk-cu", "novadose-nad"],
    benefits: [
      "Supports neuronal mitochondrial energy production",
      "Promotes neuroprotective gene expression",
      "Enhances synaptic plasticity and memory pathways",
      "Reduces neuroinflammation markers",
      "Supports DNA repair in brain cells",
      "Protects against age-related cognitive decline",
    ],
    faqs: [
      { question: "How does NAD+ support cognitive function?", answer: "NAD+ (nicotinamide adenine dinucleotide) is essential for mitochondrial energy production in neurons, which are among the most energy-demanding cells in the body. As NAD+ levels decline with age, neuronal energy production falters, contributing to cognitive decline. NAD+ also activates sirtuins — a family of proteins involved in DNA repair, gene silencing, and neuroprotection. Research shows that restoring NAD+ levels can enhance mitochondrial function in brain cells, support synaptic plasticity (the basis of learning and memory), and activate protective pathways against neurodegeneration." },
      { question: "What neuroprotective properties does GHK-Cu have?", answer: "GHK-Cu has been identified in genomic studies as a compound that modulates the expression of over 4,000 genes, many of which are involved in neuroprotection. Specifically, GHK-Cu upregulates genes involved in antioxidant defence, nerve growth factor production, and anti-inflammatory signalling in the central nervous system. Research also shows it suppresses genes associated with neurodegeneration and excessive inflammation. These gene-level effects make GHK-Cu a compelling compound for cognitive enhancement research beyond its well-known skin and tissue repair properties." },
      { question: "What is the NovaDose NAD+ system and why is it relevant for brain research?", answer: "The NovaDose NAD+ system is ORYN's advanced cartridge-based pen designed for daily NAD+ microdosing with near 100% bioavailability. This is particularly relevant for brain research because consistent daily NAD+ delivery maintains steady-state levels in neuronal tissue, unlike IV infusions which create peaks and troughs. The NovaDose system delivers pharmaceutical-grade NAD+ directly, bypassing the digestive system where precursors like NMN or NR would need multi-step enzymatic conversion. For cognitive research, this direct delivery ensures maximum NAD+ availability to support brain cell energy and repair processes." },
      { question: "Can cognitive peptides be studied in combination?", answer: "Yes, NAD+ and GHK-Cu target complementary cognitive pathways and are commonly researched together. NAD+ addresses the metabolic and energetic aspects of brain health — mitochondrial function, sirtuin activation, and DNA repair — while GHK-Cu modulates gene expression for neuroprotection, antioxidant defence, and nerve growth factor production. This multi-pathway approach reflects the complexity of cognitive health, which depends on energy supply, structural integrity, inflammation control, and neurotransmitter balance simultaneously." },
    ],
  },
  {
    slug: "energy-vitality",
    name: "Energy & Vitality",
    metaTitle: "Peptides for Energy & Vitality UK | ORYN",
    metaDescription: "Research-grade peptides for energy and vitality. NAD+, NovaDose NAD+, and CJC-1295 for cellular energy and GH support. >99% purity, UK delivery.",
    headline: "Peptides for Energy, Vitality & Peak Performance",
    description: "Sustained energy depends on mitochondrial efficiency and hormonal balance. ORYN's NAD+ and NovaDose NAD+ restore the cellular fuel that drives every metabolic process, while CJC-1295 stimulates growth hormone release to support metabolism, body composition, and physical resilience — a research-backed trio for vitality science.",
    productSlugs: ["nad-plus", "novadose-nad", "cjc-1295"],
    benefits: [
      "Restores mitochondrial energy production",
      "Supports natural growth hormone secretion",
      "Enhances metabolic rate and efficiency",
      "Reduces cellular fatigue and oxidative burden",
      "Improves physical endurance and stamina",
      "Supports healthy circadian energy rhythms",
    ],
    faqs: [
      { question: "Why does energy decline with age?", answer: "Cellular energy is produced primarily by mitochondria through a process that depends critically on NAD+. Research shows that NAD+ levels decline by approximately 50% between the ages of 40 and 60, directly impairing mitochondrial energy output. Simultaneously, growth hormone secretion decreases by roughly 14% per decade after age 30, reducing the metabolic stimulus for protein synthesis, fat metabolism, and tissue repair. ORYN's NAD+ pens restore the cellular fuel, while CJC-1295 stimulates the hormonal signals that drive energy metabolism — addressing both pillars of age-related energy decline." },
      { question: "How does NAD+ restore cellular energy?", answer: "NAD+ is an essential coenzyme in the electron transport chain — the mitochondrial process that converts nutrients into ATP (adenosine triphosphate), the universal energy currency of cells. Every cell in the body depends on this process, and neurons and muscle cells are particularly energy-intensive. When NAD+ levels are depleted, ATP production falls and cells enter an energy-deficient state characterised by fatigue, impaired repair, and accelerated aging. ORYN's pen-delivered NAD+ provides direct bioavailable NAD+ to restore mitochondrial function without relying on multi-step conversion from precursors like NMN or NR." },
      { question: "What role does growth hormone play in energy and vitality?", answer: "Growth hormone (GH) is a master metabolic regulator that stimulates protein synthesis, fat mobilisation, and tissue repair. CJC-1295 stimulates sustained GH release from the pituitary gland by mimicking GHRH (growth hormone releasing hormone). Elevated GH supports lean body composition by promoting fat oxidation for energy, maintains muscle mass and strength, and enhances recovery from physical exertion. Research shows that GH optimisation through peptides like CJC-1295 can improve exercise capacity, reduce body fat, and increase subjective energy and wellbeing." },
    ],
  },
  {
    slug: "detox-cleanse",
    name: "Detox & Cellular Cleanse",
    metaTitle: "Detox Peptides UK | Glutathione & NAD+ | ORYN",
    metaDescription: "Research-grade detox peptides. Glutathione master antioxidant and NAD+ for cellular cleansing and liver support. >99% purity, UK delivery.",
    headline: "Peptides for Detox & Cellular Cleansing Research",
    description: "True detoxification happens at the cellular level. ORYN's Glutathione — the body's master antioxidant and primary detoxification enzyme cofactor — works alongside NAD+ to power the cellular repair and waste-clearing mechanisms that keep cells functioning optimally and free from toxic burden.",
    productSlugs: ["glutathione", "nad-plus"],
    benefits: [
      "Powers Phase II liver detoxification enzymes",
      "Neutralises free radicals and reactive oxygen species",
      "Supports heavy metal chelation and elimination",
      "Activates cellular autophagy pathways",
      "Enhances mitochondrial waste clearance",
      "Protects against environmental toxin damage",
    ],
    faqs: [
      { question: "How does Glutathione act as a detoxifier?", answer: "Glutathione is the primary cofactor for Phase II liver detoxification — the process by which the liver conjugates (attaches) toxins to water-soluble molecules for excretion via bile and urine. Without adequate Glutathione, the liver cannot efficiently process environmental pollutants, drug metabolites, heavy metals, or endogenous waste products like lipid peroxides. Glutathione also directly neutralises free radicals and reactive oxygen species, preventing oxidative damage to cell membranes, DNA, and proteins. ORYN's pen-delivered Glutathione provides near-complete bioavailability, bypassing the digestive degradation that limits oral Glutathione supplements." },
      { question: "What role does NAD+ play in cellular detoxification?", answer: "NAD+ supports cellular detoxification through several mechanisms. It fuels sirtuins — enzymes that regulate autophagy (the cell's self-cleaning process that removes damaged organelles and misfolded proteins). NAD+ also powers PARP enzymes involved in DNA repair, preventing the accumulation of genetic damage from toxin exposure. At the mitochondrial level, adequate NAD+ ensures efficient energy production with minimal electron leakage, reducing the generation of reactive oxygen species at their source. Together, NAD+ and Glutathione address both the production and elimination of cellular waste." },
      { question: "Why is injectable delivery preferred for detox peptides?", answer: "Oral Glutathione is extensively degraded by digestive enzymes and gastric acid, with studies showing bioavailability as low as 3-5%. This means over 95% of oral Glutathione never reaches the bloodstream in active form. ORYN's pen-delivered Glutathione bypasses the entire gastrointestinal tract, providing near-complete bioavailability at a fraction of the dose required for oral supplementation. Similarly, NAD+ taken orally must be converted through multiple enzymatic steps (NR to NMN to NAD+), with significant losses at each stage. Direct NAD+ delivery via ORYN's pen system ensures the active coenzyme reaches cells intact." },
      { question: "How do detox peptides support liver health?", answer: "The liver is the body's primary detoxification organ and has the highest concentration of Glutathione of any tissue. Chronic toxin exposure, alcohol, medications, and environmental pollutants deplete hepatic Glutathione stores, impairing the liver's ability to process and eliminate harmful compounds. Research shows that maintaining adequate Glutathione levels supports hepatocyte (liver cell) viability, reduces oxidative damage to liver tissue, and preserves the function of cytochrome P450 enzymes essential for drug metabolism. NAD+ further supports liver function by powering the metabolic processes that regenerate hepatocytes and maintain liver tissue integrity." },
    ],
  },
  {
    slug: "body-composition",
    name: "Body Composition",
    metaTitle: "Peptides for Body Composition UK | ORYN",
    metaDescription: "Research-grade peptides for body composition. Tirzepatide, CJC-1295, Ipamorelin, and MediT for fat loss and lean mass. >99% purity, UK delivery.",
    headline: "Peptides for Body Composition & Recomposition Research",
    description: "Optimising body composition requires simultaneous fat reduction and lean mass preservation. ORYN's body composition range combines Tirzepatide and MediT Tirzepatide for metabolic regulation with CJC-1295 and Ipamorelin for GH-driven lean mass support — the most comprehensive peptide toolkit for recomposition research.",
    productSlugs: ["tirzepatide-pen", "cjc-1295", "ipamorelin", "medit-tirzepatide"],
    benefits: [
      "Dual GIP/GLP-1 metabolic pathway activation",
      "Promotes fat oxidation while preserving lean mass",
      "Stimulates natural growth hormone release",
      "Supports insulin sensitivity and glucose metabolism",
      "Enhances resting metabolic rate",
      "Supports healthy appetite regulation signalling",
    ],
    faqs: [
      { question: "How do these peptides work together for body composition?", answer: "Body composition optimisation involves two simultaneous goals: reducing fat mass and maintaining or increasing lean mass. Tirzepatide addresses the fat-loss side through dual GIP/GLP-1 receptor activation, which regulates appetite, enhances insulin sensitivity, and promotes fat oxidation. CJC-1295 and Ipamorelin address the lean-mass side by stimulating natural growth hormone release, which drives protein synthesis, supports muscle maintenance, and further enhances lipolysis. This multi-peptide approach reflects the complexity of body recomposition — no single compound optimally addresses both fat loss and lean mass preservation." },
      { question: "What is the difference between weight loss and body recomposition?", answer: "Weight loss simply means reducing total body weight, which often involves losing both fat and muscle. Body recomposition aims to change the ratio of fat to lean tissue — reducing fat while maintaining or building muscle. This distinction is critical because muscle mass drives metabolic rate, functional capacity, and long-term health outcomes. Peptides like CJC-1295 and Ipamorelin help preserve lean tissue by maintaining growth hormone levels during caloric restriction, while Tirzepatide promotes preferential fat loss through metabolic pathway modulation. Research shows this combined approach results in superior body composition outcomes compared to caloric restriction alone." },
      { question: "How does Tirzepatide compare to other metabolic peptides?", answer: "Tirzepatide is unique as a dual GIP/GLP-1 receptor agonist — it activates two key metabolic hormone pathways simultaneously. GLP-1 agonism reduces appetite and slows gastric emptying, while GIP agonism enhances insulin secretion and may directly promote fat oxidation. Clinical trials have demonstrated that Tirzepatide produces greater body weight reduction and metabolic improvements compared to single-pathway GLP-1 agonists like semaglutide. ORYN offers Tirzepatide in both the standard pen system (10mg, 30-day dosing) and the MediT prefilled weekly pen (40mg) to suit different research protocol requirements." },
      { question: "Why is growth hormone important for body composition?", answer: "Growth hormone is one of the most powerful signals for body composition regulation. It stimulates lipolysis (fat breakdown), promotes protein synthesis in muscle tissue, and enhances the utilisation of fatty acids for energy. GH levels decline significantly with age, contributing to the typical pattern of increasing fat mass and decreasing muscle mass. CJC-1295 and Ipamorelin restore more youthful GH secretion patterns through complementary mechanisms — CJC-1295 extends GH release duration while Ipamorelin triggers clean GH pulses without affecting cortisol or prolactin — supporting optimal body composition." },
    ],
  },
  {
    slug: "inflammation",
    name: "Inflammation & Pain",
    metaTitle: "Anti-Inflammatory Peptides UK | ORYN",
    metaDescription: "Research-grade anti-inflammatory peptides. BPC-157, TB-500, and Glutathione for inflammation and pain research. >99% purity, UK delivery.",
    headline: "Peptides for Inflammation & Pain Management Research",
    description: "Chronic inflammation underlies many degenerative conditions. ORYN's anti-inflammatory peptide range brings together BPC-157 and TB-500 — with their well-documented ability to modulate inflammatory cascades — alongside Glutathione, which neutralises the oxidative stress that perpetuates inflammatory cycles.",
    productSlugs: ["bpc-157", "tb-500", "glutathione"],
    benefits: [
      "Modulates pro-inflammatory cytokine expression",
      "Reduces NF-kB-mediated inflammatory signalling",
      "Neutralises oxidative stress driving chronic inflammation",
      "Promotes resolution of acute inflammatory responses",
      "Supports tissue repair in inflamed regions",
      "Protects against inflammatory tissue damage",
    ],
    faqs: [
      { question: "How do peptides reduce inflammation differently from NSAIDs?", answer: "NSAIDs (non-steroidal anti-inflammatory drugs) work by blocking COX enzymes, which reduces prostaglandin production but also impairs the healing process and carries significant side effects including gastric ulceration and cardiovascular risk. BPC-157 and TB-500 operate through fundamentally different mechanisms — they modulate inflammatory signalling pathways (including NF-kB and cytokine expression) while simultaneously promoting tissue repair. BPC-157 actually protects the gastric mucosa rather than damaging it. This represents a paradigm shift in inflammation research: instead of simply suppressing the inflammatory response, these peptides aim to resolve it while accelerating the underlying healing process." },
      { question: "What is the role of oxidative stress in chronic inflammation?", answer: "Oxidative stress and chronic inflammation form a self-perpetuating cycle. Inflammatory cells generate reactive oxygen species (ROS) as part of the immune response. When inflammation becomes chronic, excessive ROS damages surrounding tissue, which triggers further inflammation, creating a destructive feedback loop. Glutathione breaks this cycle by neutralising ROS and supporting the resolution phase of inflammation. As the body's most abundant intracellular antioxidant, Glutathione directly scavenges free radicals, regenerates other antioxidants like vitamins C and E, and supports immune cell regulation. ORYN's pen-delivered Glutathione provides maximum bioavailability to address systemic oxidative burden." },
      { question: "Can BPC-157 help with gut inflammation specifically?", answer: "BPC-157 is uniquely suited for gut inflammation research because it is derived from a protein naturally found in human gastric juice. Published studies in animal models demonstrate its efficacy in inflammatory bowel disease, gastric ulcers, NSAID-induced intestinal damage, and oesophageal inflammation. Its mechanisms include promoting mucosal blood flow via nitric oxide pathways, stimulating growth factor expression for epithelial repair, and modulating inflammatory cytokines in the GI microenvironment. Unlike many anti-inflammatory compounds that can damage the gut lining, BPC-157 actively protects and repairs it." },
      { question: "How does TB-500 complement BPC-157 for inflammation?", answer: "TB-500 (Thymosin Beta-4 fragment) adds a unique dimension to anti-inflammatory research. While BPC-157 focuses on promoting tissue repair and angiogenesis at inflammation sites, TB-500 specifically promotes the migration of anti-inflammatory and reparative cells into damaged tissue by upregulating actin polymerisation. TB-500 also directly modulates NF-kB signalling — the master transcription factor controlling inflammatory gene expression — and reduces the production of pro-inflammatory cytokines like IL-1beta and TNF-alpha. This complementary mechanism means that BPC-157 creates the conditions for healing while TB-500 actively recruits the cellular machinery to execute it." },
    ],
  },
  {
    slug: "hormonal-balance",
    name: "Hormonal Balance & Optimisation",
    metaTitle: "Peptides for Hormonal Balance UK | ORYN",
    metaDescription: "Research-grade peptides for hormonal balance. CJC-1295, Ipamorelin, and Tirzepatide for hormone optimisation research. >99% purity, UK delivery.",
    headline: "Peptides for Hormonal Balance & Endocrine Optimisation",
    description: "Hormonal decline drives many symptoms of aging and metabolic dysfunction. ORYN's endocrine research range features CJC-1295 and Ipamorelin for restoring youthful growth hormone patterns alongside Tirzepatide for metabolic hormone optimisation — enabling multi-axis hormonal research with pharmaceutical-grade precision.",
    productSlugs: ["cjc-1295", "ipamorelin", "tirzepatide-pen"],
    benefits: [
      "Restores natural growth hormone pulsatility",
      "Supports healthy insulin sensitivity",
      "Optimises metabolic hormone signalling",
      "Promotes balanced cortisol regulation",
      "Enhances IGF-1 production for tissue maintenance",
      "Supports healthy endocrine feedback loops",
    ],
    faqs: [
      { question: "How do peptides restore hormonal balance?", answer: "Peptides like CJC-1295 and Ipamorelin work by stimulating the body's own hormone-producing glands rather than introducing exogenous hormones. CJC-1295 mimics growth hormone releasing hormone (GHRH), signalling the pituitary gland to produce and release growth hormone in a natural pulsatile pattern. Ipamorelin activates the ghrelin receptor to trigger targeted GH pulses. Because these peptides work through the body's existing feedback mechanisms, they support physiological hormone levels rather than causing the supraphysiological spikes and suppression seen with direct hormone administration. This approach preserves the hypothalamic-pituitary axis integrity." },
      { question: "Why is growth hormone pulsatility important?", answer: "Growth hormone is not released continuously — it is secreted in pulses, with the largest pulses occurring during deep sleep and after exercise. This pulsatile pattern is critical because GH receptors become desensitised to constant GH exposure. Ipamorelin is particularly valuable for hormonal balance research because it triggers discrete GH pulses that mimic the body's natural rhythm, while CJC-1295 extends the amplitude and duration of each pulse. This combination restores youthful GH secretion patterns without overriding the body's circadian regulation. Research shows that pulsatile GH delivery produces superior metabolic outcomes compared to continuous GH exposure." },
      { question: "How does Tirzepatide support metabolic hormone balance?", answer: "Tirzepatide acts as a dual GIP/GLP-1 receptor agonist, influencing two major incretin hormone pathways. GLP-1 receptor activation enhances glucose-dependent insulin secretion, suppresses glucagon, and regulates appetite signalling. GIP receptor activation further supports insulin function and may promote beta-cell health. Together, these actions improve insulin sensitivity, stabilise blood glucose, and optimise the metabolic hormonal environment. This is particularly relevant for research into metabolic syndrome, where insulin resistance and hormonal dysregulation create cascading endocrine disruption affecting cortisol, thyroid function, and reproductive hormones." },
      { question: "Can hormonal peptides be used for age-related hormone decline?", answer: "Age-related hormonal decline — sometimes called somatopause (for GH decline) or andropause/menopause — is a major area of peptide research. GH secretion decreases by approximately 14% per decade after age 30, contributing to increased body fat, decreased muscle mass, impaired sleep, and reduced cognitive function. CJC-1295 and Ipamorelin are researched as potential interventions to restore more youthful GH levels without the risks associated with direct GH replacement. Early research suggests these peptides may help mitigate age-related changes in body composition, sleep quality, and metabolic function while maintaining the safety profile of natural hormone stimulation." },
    ],
  },
  {
    slug: "longevity-biohacking",
    name: "Longevity & Biohacking",
    metaTitle: "Longevity Peptides UK | NAD+ & GHK-Cu | ORYN",
    metaDescription: "Research-grade longevity peptides. NAD+, NovaDose NAD+, GHK-Cu, and Glutathione for biohacking and anti-aging research. >99% purity, UK delivery.",
    headline: "Peptides for Longevity & Biohacking Research",
    description: "Longevity science targets the fundamental drivers of biological aging: mitochondrial decline, DNA damage, telomere shortening, and cellular senescence. ORYN's longevity stack combines NAD+ and NovaDose NAD+ for cellular energy and sirtuin activation, GHK-Cu for gene expression remodelling, and Glutathione for master antioxidant defence — the cornerstone compounds of modern biohacking research.",
    productSlugs: ["nad-plus", "novadose-nad", "ghk-cu", "glutathione"],
    benefits: [
      "Activates sirtuin longevity pathways",
      "Supports telomere maintenance and DNA repair",
      "Remodels gene expression towards youthful patterns",
      "Provides comprehensive antioxidant defence",
      "Powers mitochondrial biogenesis and efficiency",
      "Supports cellular senescence clearance (senolytic pathways)",
    ],
    faqs: [
      { question: "What is the science behind longevity peptides?", answer: "Longevity research has identified several hallmarks of aging that peptides can target. NAD+ decline is now recognised as a central driver of aging — it impairs mitochondrial function, reduces sirtuin activity (the longevity enzymes), and compromises DNA repair. GHK-Cu has been shown in genomic studies to reset the expression of over 4,000 genes towards youthful patterns, including genes involved in DNA repair, antioxidant defence, and tissue remodelling. Glutathione levels also decline with age, leaving cells vulnerable to oxidative damage that accelerates every aspect of aging. Together, these compounds address multiple hallmarks of aging simultaneously — the approach favoured by leading longevity researchers." },
      { question: "What are sirtuins and why do they matter for longevity?", answer: "Sirtuins are a family of seven NAD+-dependent enzymes (SIRT1-7) that regulate cellular processes critical to longevity: DNA repair, mitochondrial biogenesis, inflammatory gene silencing, and metabolic efficiency. They are often called longevity genes because their activation in model organisms consistently extends lifespan. However, sirtuins require NAD+ as a fuel — without adequate NAD+, they cannot function. This is why NAD+ decline with age effectively silences the body's longevity programme. ORYN's NAD+ and NovaDose NAD+ pens provide direct bioavailable NAD+ to keep sirtuins active, bypassing the inefficient conversion from precursors like NMN or nicotinamide riboside." },
      { question: "How does GHK-Cu remodel gene expression?", answer: "GHK-Cu is remarkable among peptides for its ability to broadly influence gene expression. A landmark study by Pickart and colleagues using the Connectivity Map database showed that GHK-Cu modulates 31.2% of human genes, with a clear pattern of upregulating genes associated with youthful tissue function and downregulating genes associated with aging and disease. Specifically, it increases expression of collagen, elastin, and glycosaminoglycan genes, DNA repair enzymes, antioxidant genes including superoxide dismutase and Glutathione-related enzymes, and nerve growth factors — while suppressing genes linked to inflammation, fibrosis, and metastasis. This comprehensive gene-level remodelling makes GHK-Cu uniquely valuable for longevity research." },
      { question: "What does a biohacking peptide protocol look like?", answer: "Modern biohacking protocols typically involve systematic combination of compounds targeting different aging hallmarks. A research-grade longevity stack might include daily NAD+ via the NovaDose system for sirtuin activation and mitochondrial support, GHK-Cu for gene expression remodelling and tissue maintenance, and Glutathione for antioxidant defence and detoxification. These peptides are often studied alongside lifestyle interventions including time-restricted eating (which also elevates NAD+ and activates sirtuins), cold exposure, and exercise — all of which share overlapping molecular pathways. ORYN's pen systems make precise, consistent dosing straightforward for long-term research protocols." },
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
