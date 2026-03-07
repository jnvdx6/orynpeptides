import {
  ExecArgs,
  IProductModuleService,
  IRegionModuleService,
  ISalesChannelModuleService,
  IShippingProfileModuleService,
  IFulfillmentModuleService,
  IStockLocationModuleService,
  IInventoryService,
  IPricingModuleService,
} from "@medusajs/framework/types";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";

// ORYN Product catalog
const PRODUCTS = [
  {
    title: "ORYN BPC-157",
    subtitle: "Healing & Recovery",
    handle: "bpc-157",
    description:
      "Body Protection Compound-157 is a synthetic peptide derived from a naturally occurring protein in gastric juice. ORYN BPC-157 is formulated at pharmaceutical grade in a precision-dosed pen system for consistent, reliable administration over 30 days.",
    collection_title: "Peptide Pen System",
    tags: ["healing", "recovery", "bpc", "peptide-pen"],
    status: "published" as const,
    options: [{ title: "Dosage", values: ["10mg / 3mL"] }],
    variants: [
      {
        title: "BPC-157 10mg / 3mL",
        sku: "ORY-BPC157-10",
        prices: [
          { amount: 18900, currency_code: "eur" },
          { amount: 19900, currency_code: "usd" },
          { amount: 16900, currency_code: "gbp" },
        ],
        manage_inventory: true,
        options: { Dosage: "10mg / 3mL" },
      },
    ],
    metadata: {
      badge: "Best Seller",
      dosage: "10 mg",
      volume: "3 mL",
      category: "peptide-pen",
      categoryLabel: "Peptide Pen",
      purity: ">99%",
      dosingPeriod: "30 Days",
      sterilization: "0.22um Filter + Gamma Ray",
      storage: "2-8C Refrigerated",
      shelfLife: "24 months",
      benefits: JSON.stringify([
        "Supports tissue healing and recovery",
        "Promotes gut health and integrity",
        "Supports tendon and ligament repair",
        "Anti-inflammatory properties",
        "Neuroprotective potential",
      ]),
    },
  },
  {
    title: "ORYN TB-500",
    subtitle: "Tissue Repair",
    handle: "tb-500",
    description:
      "Thymosin Beta-4 fragment, TB-500, plays a crucial role in tissue repair and regeneration. ORYN TB-500 delivers a precise 15mg dose in our advanced pen system.",
    collection_title: "Peptide Pen System",
    tags: ["tissue-repair", "tb500", "peptide-pen"],
    status: "published" as const,
    options: [{ title: "Dosage", values: ["15mg / 3mL"] }],
    variants: [
      {
        title: "TB-500 15mg / 3mL",
        sku: "ORY-TB500-15",
        prices: [
          { amount: 19900, currency_code: "eur" },
          { amount: 20900, currency_code: "usd" },
          { amount: 17900, currency_code: "gbp" },
        ],
        manage_inventory: true,
        options: { Dosage: "15mg / 3mL" },
      },
    ],
    metadata: {
      dosage: "15 mg",
      volume: "3 mL",
      category: "peptide-pen",
      categoryLabel: "Peptide Pen",
      purity: ">99%",
      dosingPeriod: "30 Days",
      sterilization: "0.22um Filter + Gamma Ray",
      storage: "2-8C Refrigerated",
      shelfLife: "24 months",
      benefits: JSON.stringify([
        "Accelerates wound healing",
        "Reduces inflammation",
        "Promotes muscle tissue repair",
        "Supports cardiovascular health",
        "Enhances flexibility and mobility",
      ]),
    },
  },
  {
    title: "ORYN CJC-1295",
    subtitle: "GH Stimulation",
    handle: "cjc-1295",
    description:
      "CJC-1295 is a synthetic analogue of growth hormone-releasing hormone (GHRH). ORYN CJC-1295 provides sustained GH elevation through our precision dosing system.",
    collection_title: "Peptide Pen System",
    tags: ["growth-hormone", "cjc1295", "peptide-pen"],
    status: "published" as const,
    options: [{ title: "Dosage", values: ["5mg / 3mL"] }],
    variants: [
      {
        title: "CJC-1295 5mg / 3mL",
        sku: "ORY-CJC1295-5",
        prices: [
          { amount: 17900, currency_code: "eur" },
          { amount: 18900, currency_code: "usd" },
          { amount: 15900, currency_code: "gbp" },
        ],
        manage_inventory: true,
        options: { Dosage: "5mg / 3mL" },
      },
    ],
    metadata: {
      dosage: "5 mg",
      volume: "3 mL",
      category: "peptide-pen",
      categoryLabel: "Peptide Pen",
      purity: ">99%",
      dosingPeriod: "30 Days",
      sterilization: "0.22um Filter + Gamma Ray",
      storage: "2-8C Refrigerated",
      shelfLife: "24 months",
      benefits: JSON.stringify([
        "Stimulates growth hormone release",
        "Supports lean body composition",
        "Promotes deep restorative sleep",
        "Enhances recovery between sessions",
        "Supports metabolic function",
      ]),
    },
  },
  {
    title: "ORYN Ipamorelin",
    subtitle: "GH Stimulation",
    handle: "ipamorelin",
    description:
      "Ipamorelin is a selective growth hormone secretagogue that stimulates the pituitary gland. ORYN Ipamorelin offers targeted GH release.",
    collection_title: "Peptide Pen System",
    tags: ["growth-hormone", "ipamorelin", "peptide-pen"],
    status: "published" as const,
    options: [{ title: "Dosage", values: ["6mg / 3mL"] }],
    variants: [
      {
        title: "Ipamorelin 6mg / 3mL",
        sku: "ORY-IPA-6",
        prices: [
          { amount: 17900, currency_code: "eur" },
          { amount: 18900, currency_code: "usd" },
          { amount: 15900, currency_code: "gbp" },
        ],
        manage_inventory: true,
        options: { Dosage: "6mg / 3mL" },
      },
    ],
    metadata: {
      dosage: "6 mg",
      volume: "3 mL",
      category: "peptide-pen",
      categoryLabel: "Peptide Pen",
      purity: ">99%",
      dosingPeriod: "30 Days",
      sterilization: "0.22um Filter + Gamma Ray",
      storage: "2-8C Refrigerated",
      shelfLife: "24 months",
      benefits: JSON.stringify([
        "Selective GH release",
        "Minimal side effect profile",
        "Supports bone density",
        "Promotes lean tissue",
        "Enhances sleep quality",
      ]),
    },
  },
  {
    title: "ORYN Tirzepatide",
    subtitle: "Metabolic",
    handle: "tirzepatide-pen",
    description:
      "Tirzepatide is a dual GIP/GLP-1 receptor agonist. ORYN Tirzepatide pen delivers precision dosing for metabolic research.",
    collection_title: "Peptide Pen System",
    tags: ["metabolic", "tirzepatide", "peptide-pen"],
    status: "published" as const,
    options: [{ title: "Dosage", values: ["10mg / 3mL"] }],
    variants: [
      {
        title: "Tirzepatide 10mg / 3mL",
        sku: "ORY-TIRZ-10",
        prices: [
          { amount: 24900, currency_code: "eur" },
          { amount: 26900, currency_code: "usd" },
          { amount: 22900, currency_code: "gbp" },
        ],
        manage_inventory: true,
        options: { Dosage: "10mg / 3mL" },
      },
    ],
    metadata: {
      badge: "Popular",
      dosage: "10 mg",
      volume: "3 mL",
      category: "peptide-pen",
      categoryLabel: "Peptide Pen",
      purity: ">99%",
      dosingPeriod: "30 Days",
      sterilization: "0.22um Filter + Gamma Ray",
      storage: "2-8C Refrigerated",
      shelfLife: "24 months",
      benefits: JSON.stringify([
        "Dual hormone receptor action",
        "Supports metabolic function",
        "Blood sugar management",
        "Appetite regulation",
        "Clinically studied compound",
      ]),
    },
  },
  {
    title: "ORYN GHK-CU",
    subtitle: "Skin Repair",
    handle: "ghk-cu",
    description:
      "GHK-Cu (Copper peptide) is a naturally occurring tripeptide with a high affinity for copper ions. ORYN GHK-CU supports skin remodeling research.",
    collection_title: "Peptide Pen System",
    tags: ["skin-repair", "copper-peptide", "peptide-pen"],
    status: "published" as const,
    options: [{ title: "Dosage", values: ["60mg / 3mL"] }],
    variants: [
      {
        title: "GHK-CU 60mg / 3mL",
        sku: "ORY-GHKCU-60",
        prices: [
          { amount: 21900, currency_code: "eur" },
          { amount: 22900, currency_code: "usd" },
          { amount: 19900, currency_code: "gbp" },
        ],
        manage_inventory: true,
        options: { Dosage: "60mg / 3mL" },
      },
    ],
    metadata: {
      dosage: "60 mg",
      volume: "3 mL",
      category: "peptide-pen",
      categoryLabel: "Peptide Pen",
      purity: ">99%",
      dosingPeriod: "30 Days",
      sterilization: "0.22um Filter + Gamma Ray",
      storage: "2-8C Refrigerated",
      shelfLife: "24 months",
      benefits: JSON.stringify([
        "Promotes collagen synthesis",
        "Supports skin elasticity",
        "Antioxidant properties",
        "Wound healing support",
        "Anti-aging research applications",
      ]),
    },
  },
  {
    title: "ORYN Glutathione",
    subtitle: "Antioxidant",
    handle: "glutathione",
    description:
      "Glutathione is the body's master antioxidant. ORYN Glutathione delivers a powerful 6g dose via our precision pen system.",
    collection_title: "Peptide Pen System",
    tags: ["antioxidant", "glutathione", "peptide-pen"],
    status: "published" as const,
    options: [{ title: "Dosage", values: ["6g / 3mL"] }],
    variants: [
      {
        title: "Glutathione 6g / 3mL",
        sku: "ORY-GLUT-6G",
        prices: [
          { amount: 16900, currency_code: "eur" },
          { amount: 17900, currency_code: "usd" },
          { amount: 14900, currency_code: "gbp" },
        ],
        manage_inventory: true,
        options: { Dosage: "6g / 3mL" },
      },
    ],
    metadata: {
      dosage: "6 g",
      volume: "3 mL",
      category: "peptide-pen",
      categoryLabel: "Peptide Pen",
      purity: ">99%",
      dosingPeriod: "30 Days",
      sterilization: "0.22um Filter + Gamma Ray",
      storage: "2-8C Refrigerated",
      shelfLife: "24 months",
      benefits: JSON.stringify([
        "Master antioxidant defense",
        "Cellular detoxification",
        "Immune system support",
        "Skin brightening properties",
        "Liver function support",
      ]),
    },
  },
  {
    title: "ORYN NAD+",
    subtitle: "Metabolic & Anti-Aging",
    handle: "nad-plus",
    description:
      "Nicotinamide Adenine Dinucleotide (NAD+) is a critical coenzyme present in every cell. ORYN NAD+ pen delivers a concentrated 500mg dose.",
    collection_title: "Peptide Pen System",
    tags: ["anti-aging", "nad", "metabolic", "peptide-pen"],
    status: "published" as const,
    options: [{ title: "Dosage", values: ["500mg / 3mL"] }],
    variants: [
      {
        title: "NAD+ 500mg / 3mL",
        sku: "ORY-NAD-500",
        prices: [
          { amount: 29900, currency_code: "eur" },
          { amount: 31900, currency_code: "usd" },
          { amount: 27900, currency_code: "gbp" },
        ],
        manage_inventory: true,
        options: { Dosage: "500mg / 3mL" },
      },
    ],
    metadata: {
      badge: "Premium",
      dosage: "500 mg",
      volume: "3 mL",
      category: "peptide-pen",
      categoryLabel: "Peptide Pen",
      purity: ">99%",
      dosingPeriod: "30 Days",
      sterilization: "0.22um Filter + Gamma Ray",
      storage: "2-8C Refrigerated",
      shelfLife: "24 months",
      benefits: JSON.stringify([
        "Cellular energy production",
        "DNA repair support",
        "Healthy aging research",
        "Cognitive function support",
        "Metabolic efficiency",
      ]),
    },
  },
  {
    title: "ORYN MediT Pen",
    subtitle: "Tirzepatide 40mg - Weight Management",
    handle: "medit-tirzepatide",
    description:
      "The ORYN MediT Pen is a prefilled, single-use injection pen containing 40mg Tirzepatide. Dual GIP/GLP-1 hormone action for metabolic support.",
    collection_title: "MediT Pen",
    tags: ["metabolic", "tirzepatide", "weight-management", "medit-pen"],
    status: "published" as const,
    options: [{ title: "Type", values: ["Prefilled 40mg"] }],
    variants: [
      {
        title: "MediT Pen Tirzepatide 40mg",
        sku: "ORY-MEDIT-40",
        prices: [
          { amount: 34900, currency_code: "eur" },
          { amount: 36900, currency_code: "usd" },
          { amount: 31900, currency_code: "gbp" },
        ],
        manage_inventory: true,
        options: { Type: "Prefilled 40mg" },
      },
    ],
    metadata: {
      badge: "New",
      dosage: "40 mg",
      volume: "Prefilled",
      category: "medit-pen",
      categoryLabel: "MediT Pen",
      purity: ">99%",
      frequency: "Once Weekly",
      mechanism: "Dual GIP/GLP-1 Agonist",
      storage: "2-8C Refrigerated",
      benefits: JSON.stringify([
        "Dual hormone action (GIP + GLP-1)",
        "Once-weekly convenience",
        "Clinically proven effectiveness",
        "Appetite control and satiety boost",
        "Blood sugar management",
        "Supports long-term weight management",
      ]),
    },
  },
  {
    title: "ORYN NovaDose NAD+",
    subtitle: "Youth In Your Hands",
    handle: "novadose-nad",
    description:
      "NovaDose delivers pharmaceutical-grade NAD+ through an innovative cartridge-based pen system. Designed for precise daily microdosing.",
    collection_title: "NovaDose System",
    tags: ["nad", "anti-aging", "novadose", "cartridge"],
    status: "published" as const,
    options: [{ title: "Kit", values: ["Complete Kit"] }],
    variants: [
      {
        title: "NovaDose NAD+ Complete Kit",
        sku: "ORY-NOVA-NAD",
        prices: [
          { amount: 39900, currency_code: "eur" },
          { amount: 42900, currency_code: "usd" },
          { amount: 36900, currency_code: "gbp" },
        ],
        manage_inventory: true,
        options: { Kit: "Complete Kit" },
      },
    ],
    metadata: {
      badge: "Innovation",
      dosage: "500 mg",
      volume: "Cartridge System",
      category: "novadose",
      categoryLabel: "NovaDose System",
      purity: ">99%",
      dosing: "Daily Microdose",
      bioavailability: "Near 100%",
      storage: "Refrigerated 2-8C",
      benefits: JSON.stringify([
        "Pharmaceutical-grade NAD+ from Korea",
        "Precise daily microdosing",
        "Near 100% bioavailability",
        "Supports cellular energy and clarity",
        "Enhances mood and physical performance",
        "More cost-effective than IV therapy",
        "GMP-certified manufacturing",
      ]),
    },
  },
];

export default async function seed({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const productModule: IProductModuleService = container.resolve(Modules.PRODUCT);
  const regionModule: IRegionModuleService = container.resolve(Modules.REGION);
  const salesChannelModule: ISalesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);

  logger.info("Seeding ORYN Peptide Labs store...");

  // 1. Create Sales Channel
  logger.info("Creating sales channel...");
  const [salesChannel] = await salesChannelModule.createSalesChannels([
    {
      name: "ORYN Online Store",
      description: "ORYN Peptide Labs online storefront",
    },
  ]);
  logger.info(`Sales channel created: ${salesChannel.id}`);

  // 2. Create Regions
  logger.info("Creating regions...");
  const europeRegion = await regionModule.createRegions({
    name: "Europe",
    currency_code: "eur",
    countries: ["de", "fr", "es", "it", "nl", "be", "at", "pt", "ie"],
    metadata: { tax_rate: 0 },
  });

  const ukRegion = await regionModule.createRegions({
    name: "United Kingdom",
    currency_code: "gbp",
    countries: ["gb"],
    metadata: { tax_rate: 0 },
  });

  const usRegion = await regionModule.createRegions({
    name: "United States",
    currency_code: "usd",
    countries: ["us"],
    metadata: { tax_rate: 0 },
  });

  logger.info(`Regions created: Europe (${europeRegion.id}), UK (${ukRegion.id}), US (${usRegion.id})`);

  // 3. Create Product Collections
  logger.info("Creating product collections...");
  const collectionNames = [...new Set(PRODUCTS.map((p) => p.collection_title))];
  const collections: Record<string, any> = {};
  for (const name of collectionNames) {
    const [collection] = await productModule.createProductCollections([
      {
        title: name,
        handle: name.toLowerCase().replace(/\s+/g, "-"),
      },
    ]);
    collections[name] = collection;
    logger.info(`Collection created: ${name} (${collection.id})`);
  }

  // 4. Create Products with Variants and Prices
  logger.info("Creating products...");
  for (const productData of PRODUCTS) {
    const product = await productModule.createProducts({
      title: productData.title,
      subtitle: productData.subtitle,
      handle: productData.handle,
      description: productData.description,
      status: productData.status,
      collection_id: collections[productData.collection_title]?.id,
      tags: productData.tags.map((t) => ({ value: t })),
      options: productData.options,
      variants: productData.variants.map((v) => ({
        title: v.title,
        sku: v.sku,
        manage_inventory: v.manage_inventory,
        prices: v.prices,
        options: v.options,
      })),
      metadata: productData.metadata,
    });

    // Link product to sales channel
    await remoteLink.create({
      [Modules.PRODUCT]: { product_id: product.id },
      [Modules.SALES_CHANNEL]: { sales_channel_id: salesChannel.id },
    });

    logger.info(`Product created: ${productData.title} (${product.id})`);
  }

  // 5. Create Shipping Profile & Options
  logger.info("Creating shipping options...");
  // Note: Fulfillment and shipping setup may require additional provider modules.
  // For now, create via admin API after startup.

  logger.info("");
  logger.info("=== SEED COMPLETE ===");
  logger.info(`Created ${PRODUCTS.length} products`);
  logger.info(`Created ${Object.keys(collections).length} collections`);
  logger.info(`Created 3 regions (Europe, UK, US)`);
  logger.info(`Created 1 sales channel`);
  logger.info("");
  logger.info("Next steps:");
  logger.info("1. Create an admin user: medusa user -e admin@oryn.com -p admin123");
  logger.info("2. Configure shipping options via Medusa Admin");
  logger.info("3. Enable Stripe payment provider for each region via Admin");
  logger.info("4. Copy the publishable API key from Admin > Settings > API keys");
  logger.info("5. Set NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY in your storefront .env.local");
}
