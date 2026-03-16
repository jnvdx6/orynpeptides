/**
 * ORYN Peptides — Shipping Setup Script
 *
 * Run with: npx medusa exec src/scripts/setup-shipping.ts
 *
 * Creates:
 * - Stock locations (UK warehouse, US warehouse)
 * - Fulfillment sets with service zones
 * - Shipping options with flat-rate prices + free shipping thresholds
 *
 * Shipping Rates:
 * | Zone              | Standard       | Express        | Free from |
 * |-------------------|---------------|----------------|-----------|
 * | UK (domestic)     | £4.99 (2-4d)  | £9.99 (1-2d)   | £130      |
 * | US (domestic)     | $5.99 (3-5d)  | $14.99 (1-3d)  | $175      |
 * | Europe            | €8.99 (3-7d)  | €15.99 (2-5d)  | €175      |
 * | Rest of World     | €17.99 (7-14d)| €29.99 (5-8d)  | €300      |
 */

import {
  ExecArgs,
  IFulfillmentModuleService,
  IRegionModuleService,
  IStockLocationService,
} from "@medusajs/framework/types";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { createShippingOptionsWorkflow } from "@medusajs/medusa/core-flows";

export default async function setupShipping({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const fulfillmentModule: IFulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const regionModule: IRegionModuleService = container.resolve(Modules.REGION);
  const stockLocationModule: IStockLocationService = container.resolve(Modules.STOCK_LOCATION);
  const link = container.resolve(ContainerRegistrationKeys.LINK);

  logger.info("=== ORYN Shipping Setup ===");

  // ─── 1. Get existing regions ──────────────────────────────────
  logger.info("Fetching existing regions...");
  const regions = await regionModule.listRegions({});
  const ukRegion = regions.find((r) => r.currency_code === "gbp");
  const usRegion = regions.find((r) => r.currency_code === "usd");
  const europeRegion = regions.find((r) => r.currency_code === "eur" && r.name?.includes("Europe"));

  if (!ukRegion || !usRegion || !europeRegion) {
    logger.error("Missing regions. Found: " + regions.map((r) => `${r.name} (${r.currency_code})`).join(", "));
    return;
  }
  logger.info(`Regions: UK=${ukRegion.id}, US=${usRegion.id}, Europe=${europeRegion.id}`);

  // Check if Rest of World region exists, create if not
  let rowRegion = regions.find((r) => r.name?.includes("Rest of World") || r.name?.includes("International"));
  if (!rowRegion) {
    logger.info("Creating Rest of World region...");
    // Collect all countries already assigned to existing regions
    const assignedCountries = new Set<string>();
    for (const r of regions) {
      const regionDetail = await regionModule.retrieveRegion(r.id, { relations: ["countries"] });
      for (const c of regionDetail.countries || []) {
        assignedCountries.add((c as any).iso_2 || (c as any).code || "");
      }
    }
    logger.info(`Countries already assigned: ${[...assignedCountries].join(", ")}`);

    // Only include countries NOT already assigned
    const rowCandidates = [
      "au", "nz", "ca", "jp", "kr", "sg", "hk", "ae", "sa", "qa",
      "no", "se", "dk", "fi", "ch", "pl", "cz", "hu", "ro", "bg",
      "hr", "sk", "si", "lt", "lv", "ee", "cy", "mt", "lu", "gr",
      "mx", "br", "ar", "cl", "co", "pe", "za", "ng", "ke", "in",
      "th", "my", "ph", "id", "vn", "tw", "il", "tr",
    ];
    const rowCountriesFiltered = rowCandidates.filter((c) => !assignedCountries.has(c));
    logger.info(`ROW countries (not yet assigned): ${rowCountriesFiltered.join(", ")}`);

    if (rowCountriesFiltered.length > 0) {
      rowRegion = await regionModule.createRegions({
        name: "Rest of World",
        currency_code: "eur",
        countries: rowCountriesFiltered,
        metadata: { tax_rate: 0 },
      });
      logger.info(`Rest of World region created: ${rowRegion.id} with ${rowCountriesFiltered.length} countries`);
    } else {
      logger.info("No unassigned countries left for ROW region, skipping");
    }
  } else {
    logger.info(`Rest of World region exists: ${rowRegion.id}`);
  }

  // ─── 2. Create Stock Locations ────────────────────────────────
  logger.info("Creating stock locations...");

  const existingLocations = await stockLocationModule.listStockLocations({});
  let ukLocation = existingLocations.find((l) => l.name === "ORYN UK Warehouse");
  let usLocation = existingLocations.find((l) => l.name === "ORYN US Warehouse");

  if (!ukLocation) {
    ukLocation = await stockLocationModule.createStockLocations({
      name: "ORYN UK Warehouse",
      address: {
        address_1: "London",
        country_code: "gb",
        city: "London",
      },
    });
    logger.info(`UK warehouse created: ${ukLocation.id}`);
  }

  if (!usLocation) {
    usLocation = await stockLocationModule.createStockLocations({
      name: "ORYN US Warehouse",
      address: {
        address_1: "New York",
        country_code: "us",
        city: "New York",
      },
    });
    logger.info(`US warehouse created: ${usLocation.id}`);
  }

  // ─── 3. Get or create shipping profile ────────────────────────
  logger.info("Setting up shipping profile...");
  const existingProfiles = await fulfillmentModule.listShippingProfiles({});
  let shippingProfile = existingProfiles.find((p) => p.name === "ORYN Standard Profile");

  if (!shippingProfile) {
    shippingProfile = await fulfillmentModule.createShippingProfiles({
      name: "ORYN Standard Profile",
      type: "default",
    });
    logger.info(`Shipping profile created: ${shippingProfile.id}`);
  }

  // ─── 4. Create Fulfillment Sets with Service Zones ────────────
  logger.info("Creating fulfillment sets and service zones...");

  // UK Fulfillment Set
  const ukFulfillmentSet = await fulfillmentModule.createFulfillmentSets({
    name: "ORYN UK Shipping",
    type: "shipping",
    service_zones: [
      {
        name: "United Kingdom",
        geo_zones: [{ type: "country", country_code: "gb" }],
      },
    ],
  });
  const ukZone = ukFulfillmentSet.service_zones[0];
  logger.info(`UK fulfillment set: ${ukFulfillmentSet.id}, zone: ${ukZone.id}`);

  // US Fulfillment Set
  const usFulfillmentSet = await fulfillmentModule.createFulfillmentSets({
    name: "ORYN US Shipping",
    type: "shipping",
    service_zones: [
      {
        name: "United States",
        geo_zones: [{ type: "country", country_code: "us" }],
      },
    ],
  });
  const usZone = usFulfillmentSet.service_zones[0];
  logger.info(`US fulfillment set: ${usFulfillmentSet.id}, zone: ${usZone.id}`);

  // Europe Fulfillment Set
  const euFulfillmentSet = await fulfillmentModule.createFulfillmentSets({
    name: "ORYN Europe Shipping",
    type: "shipping",
    service_zones: [
      {
        name: "Europe",
        geo_zones: [
          { type: "country", country_code: "de" },
          { type: "country", country_code: "fr" },
          { type: "country", country_code: "es" },
          { type: "country", country_code: "it" },
          { type: "country", country_code: "nl" },
          { type: "country", country_code: "be" },
          { type: "country", country_code: "at" },
          { type: "country", country_code: "pt" },
          { type: "country", country_code: "ie" },
        ],
      },
    ],
  });
  const euZone = euFulfillmentSet.service_zones[0];
  logger.info(`Europe fulfillment set: ${euFulfillmentSet.id}, zone: ${euZone.id}`);

  // Rest of World Fulfillment Set — use countries from the ROW region
  let rowZone: any = null;
  if (rowRegion) {
    const rowRegionDetail = await regionModule.retrieveRegion(rowRegion.id, { relations: ["countries"] });
    const rowCountries = (rowRegionDetail.countries || []).map((c: any) => c.iso_2 || c.code);
    if (rowCountries.length > 0) {
      const rowFulfillmentSet = await fulfillmentModule.createFulfillmentSets({
        name: "ORYN International Shipping",
        type: "shipping",
        service_zones: [
          {
            name: "Rest of World",
            geo_zones: rowCountries.map((cc: string) => ({ type: "country" as const, country_code: cc })),
          },
        ],
      });
      rowZone = rowFulfillmentSet.service_zones[0];
      logger.info(`ROW fulfillment set: ${rowFulfillmentSet.id}, zone: ${rowZone.id}`);

      // Link ROW fulfillment set to UK warehouse
      await link.create([
        { [Modules.STOCK_LOCATION]: { stock_location_id: ukLocation.id }, [Modules.FULFILLMENT]: { fulfillment_set_id: rowFulfillmentSet.id } },
      ]);
    }
  } else {
    logger.info("Skipping ROW fulfillment set (no ROW region)");
  }

  // ─── 5. Link fulfillment sets to stock locations ──────────────
  logger.info("Linking fulfillment sets to stock locations...");
  await link.create([
    { [Modules.STOCK_LOCATION]: { stock_location_id: ukLocation.id }, [Modules.FULFILLMENT]: { fulfillment_set_id: ukFulfillmentSet.id } },
    { [Modules.STOCK_LOCATION]: { stock_location_id: ukLocation.id }, [Modules.FULFILLMENT]: { fulfillment_set_id: euFulfillmentSet.id } },
    { [Modules.STOCK_LOCATION]: { stock_location_id: usLocation.id }, [Modules.FULFILLMENT]: { fulfillment_set_id: usFulfillmentSet.id } },
  ]);

  // Link fulfillment provider to stock locations
  await link.create([
    { [Modules.STOCK_LOCATION]: { stock_location_id: ukLocation.id }, [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" } },
    { [Modules.STOCK_LOCATION]: { stock_location_id: usLocation.id }, [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" } },
  ]);

  // ─── 6. Create Shipping Options ───────────────────────────────
  logger.info("Creating shipping options...");

  const PROVIDER_ID = "manual_manual";

  // === UK SHIPPING ===
  await createShippingOptionsWorkflow(container).run({
    input: [
      // UK Standard
      {
        name: "UK Standard Shipping (2-4 business days)",
        service_zone_id: ukZone.id,
        shipping_profile_id: shippingProfile.id,
        provider_id: PROVIDER_ID,
        type: { label: "Standard", description: "Royal Mail Tracked 48", code: "uk-standard" },
        price_type: "flat",
        prices: [
          { currency_code: "gbp", amount: 4.99, rules: [] },
          { currency_code: "gbp", amount: 0, rules: [{ attribute: "item_total", operator: "gte", value: 13000 }] },
        ],
      },
      // UK Express
      {
        name: "UK Express Shipping (1-2 business days)",
        service_zone_id: ukZone.id,
        shipping_profile_id: shippingProfile.id,
        provider_id: PROVIDER_ID,
        type: { label: "Express", description: "Royal Mail Tracked 24", code: "uk-express" },
        price_type: "flat",
        prices: [
          { currency_code: "gbp", amount: 9.99, rules: [] },
          { currency_code: "gbp", amount: 0, rules: [{ attribute: "item_total", operator: "gte", value: 13000 }] },
        ],
      },
    ],
  });
  logger.info("UK shipping options created (Standard £4.99, Express £9.99, free from £130)");

  // === US SHIPPING ===
  await createShippingOptionsWorkflow(container).run({
    input: [
      // US Standard
      {
        name: "US Standard Shipping (3-5 business days)",
        service_zone_id: usZone.id,
        shipping_profile_id: shippingProfile.id,
        provider_id: PROVIDER_ID,
        type: { label: "Standard", description: "USPS Priority Mail", code: "us-standard" },
        price_type: "flat",
        prices: [
          { currency_code: "usd", amount: 5.99, rules: [] },
          { currency_code: "usd", amount: 0, rules: [{ attribute: "item_total", operator: "gte", value: 17500 }] },
        ],
      },
      // US Express
      {
        name: "US Express Shipping (1-3 business days)",
        service_zone_id: usZone.id,
        shipping_profile_id: shippingProfile.id,
        provider_id: PROVIDER_ID,
        type: { label: "Express", description: "USPS Priority Mail Express", code: "us-express" },
        price_type: "flat",
        prices: [
          { currency_code: "usd", amount: 14.99, rules: [] },
          { currency_code: "usd", amount: 0, rules: [{ attribute: "item_total", operator: "gte", value: 17500 }] },
        ],
      },
    ],
  });
  logger.info("US shipping options created (Standard $5.99, Express $14.99, free from $175)");

  // === EUROPE SHIPPING ===
  await createShippingOptionsWorkflow(container).run({
    input: [
      // Europe Standard
      {
        name: "Europe Standard Shipping (3-7 business days)",
        service_zone_id: euZone.id,
        shipping_profile_id: shippingProfile.id,
        provider_id: PROVIDER_ID,
        type: { label: "Standard", description: "DPD / DHL Standard", code: "eu-standard" },
        price_type: "flat",
        prices: [
          { currency_code: "eur", amount: 8.99, rules: [] },
          { currency_code: "eur", amount: 0, rules: [{ attribute: "item_total", operator: "gte", value: 17500 }] },
        ],
      },
      // Europe Express
      {
        name: "Europe Express Shipping (2-5 business days)",
        service_zone_id: euZone.id,
        shipping_profile_id: shippingProfile.id,
        provider_id: PROVIDER_ID,
        type: { label: "Express", description: "DHL Express", code: "eu-express" },
        price_type: "flat",
        prices: [
          { currency_code: "eur", amount: 15.99, rules: [] },
          { currency_code: "eur", amount: 0, rules: [{ attribute: "item_total", operator: "gte", value: 17500 }] },
        ],
      },
    ],
  });
  logger.info("Europe shipping options created (Standard €8.99, Express €15.99, free from €175)");

  // === REST OF WORLD SHIPPING ===
  if (rowZone) {
    await createShippingOptionsWorkflow(container).run({
      input: [
        // ROW Standard
        {
          name: "International Standard Shipping (7-14 business days)",
          service_zone_id: rowZone.id,
          shipping_profile_id: shippingProfile.id,
          provider_id: PROVIDER_ID,
          type: { label: "Standard", description: "International Tracked Post", code: "row-standard" },
          price_type: "flat",
          prices: [
            { currency_code: "eur", amount: 17.99, rules: [] },
            { currency_code: "eur", amount: 0, rules: [{ attribute: "item_total", operator: "gte", value: 30000 }] },
          ],
        },
        // ROW Express
        {
          name: "International Express Shipping (5-8 business days)",
          service_zone_id: rowZone.id,
          shipping_profile_id: shippingProfile.id,
          provider_id: PROVIDER_ID,
          type: { label: "Express", description: "DHL Express Worldwide", code: "row-express" },
          price_type: "flat",
          prices: [
            { currency_code: "eur", amount: 29.99, rules: [] },
            { currency_code: "eur", amount: 0, rules: [{ attribute: "item_total", operator: "gte", value: 30000 }] },
          ],
        },
      ],
    });
    logger.info("International shipping options created (Standard €17.99, Express €29.99, free from €300)");
  } else {
    logger.info("Skipping ROW shipping options (no ROW zone)");
  }

  // ─── Done ─────────────────────────────────────────────────────
  logger.info("=== Shipping setup complete! ===");
  logger.info("Summary:");
  logger.info("  UK:     Standard £4.99 / Express £9.99 / Free from £130");
  logger.info("  US:     Standard $5.99 / Express $14.99 / Free from $175");
  logger.info("  Europe: Standard €8.99 / Express €15.99 / Free from €175");
  logger.info("  ROW:    Standard €17.99 / Express €29.99 / Free from €300");
  logger.info("  Warehouses: UK (London), US (New York)");
  logger.info("  Provider: Manual Fulfillment");
}
