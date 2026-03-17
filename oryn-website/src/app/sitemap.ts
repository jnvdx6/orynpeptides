import type { MetadataRoute } from "next";
import { SITE_URL, SEO_CATEGORIES } from "@/lib/seo";
import { products } from "@/data/products";
import { CITY_SLUGS } from "@/data/uk-cities";
import { LONDON_AREA_SLUGS } from "@/data/london-areas";
import { BLOG_ARTICLES } from "@/data/blog-articles";
import { COMPARISON_SLUGS } from "@/data/comparisons";
import { ENCYCLOPEDIA_SLUGS } from "@/data/peptide-encyclopedia";
import { REGION_SLUGS } from "@/data/uk-regions";
import { BUNDLE_SLUGS } from "@/data/bundles";
import { GLOSSARY_TERM_SLUGS } from "@/data/glossary-terms";
import { COUNTY_SLUGS } from "@/data/uk-counties";
import { PROTOCOL_SLUGS } from "@/data/protocols";
import { FAQ_HUB_SLUGS } from "@/data/faq-hubs";
import { EUROPEAN_COUNTRIES } from "@/data/european-countries";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // ── Static pages (all locales) ──────────────────────────────────
  const staticPages = [
    { path: "", priority: 1.0 },
    { path: "/products", priority: 0.95 },
    { path: "/peptides", priority: 0.9 },
    { path: "/peptide-pens", priority: 0.9 },
    { path: "/about", priority: 0.6 },
    { path: "/science", priority: 0.7 },
    { path: "/contact", priority: 0.5 },
    { path: "/learn", priority: 0.8 },
    { path: "/compare", priority: 0.8 },
    { path: "/quality", priority: 0.85 },
    { path: "/why-oryn", priority: 0.85 },
    { path: "/tools/peptide-calculator", priority: 0.8 },
    { path: "/wholesale", priority: 0.7 },
    { path: "/shipping", priority: 0.7 },
    { path: "/faq", priority: 0.75 },
    { path: "/peptides/encyclopedia", priority: 0.8 },
    { path: "/peptides/glossary", priority: 0.75 },
    { path: "/protocols", priority: 0.8 },
    { path: "/bundles", priority: 0.8 },
    { path: "/peptides/europe", priority: 0.85 },
  ];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: now,
        priority: page.priority,
      });
    }
  }

  // ── Product pages (all locales) ─────────────────────────────────
  for (const locale of locales) {
    for (const product of products) {
      entries.push({
        url: `${SITE_URL}/${locale}/products/${product.slug}`,
        lastModified: now,
        priority: 0.9,
      });
    }
  }

  // ── UK city hub pages (EN only) ────────────────────────────────
  for (const citySlug of CITY_SLUGS) {
    entries.push({
      url: `${SITE_URL}/en/peptides/${citySlug}`,
      lastModified: now,
      priority: 0.8,
    });
  }

  // ── London area hub pages (EN only) ────────────────────────────
  for (const areaSlug of LONDON_AREA_SLUGS) {
    entries.push({
      url: `${SITE_URL}/en/peptides/london/${areaSlug}`,
      lastModified: now,
      priority: 0.75,
    });
  }

  // ── Regional hub pages (EN only) ───────────────────────────────
  for (const regionSlug of REGION_SLUGS) {
    entries.push({
      url: `${SITE_URL}/en/peptides/region/${regionSlug}`,
      lastModified: now,
      priority: 0.8,
    });
  }

  // ── County hub pages (EN only) ─────────────────────────────────
  for (const countySlug of COUNTY_SLUGS) {
    entries.push({
      url: `${SITE_URL}/en/peptides/county/${countySlug}`,
      lastModified: now,
      priority: 0.75,
    });
  }

  // ── Category pages (all locales) ───────────────────────────────
  for (const locale of locales) {
    for (const category of SEO_CATEGORIES) {
      entries.push({
        url: `${SITE_URL}/${locale}/peptides-for/${category.slug}`,
        lastModified: now,
        priority: 0.85,
      });
    }
  }

  // ── Category × City cross-product pages (EN only) ─────────────
  for (const category of SEO_CATEGORIES) {
    for (const citySlug of CITY_SLUGS) {
      entries.push({
        url: `${SITE_URL}/en/peptides-for/${category.slug}/${citySlug}`,
        lastModified: now,
        priority: 0.7,
      });
    }
  }

  // ── Encyclopedia + blog + comparisons + bundles + glossary ─────
  for (const locale of locales) {
    for (const slug of ENCYCLOPEDIA_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/peptides/encyclopedia/${slug}`,
        lastModified: now,
        priority: 0.75,
      });
    }
    for (const article of BLOG_ARTICLES) {
      entries.push({
        url: `${SITE_URL}/${locale}/learn/${article.slug}`,
        lastModified: new Date(article.dateModified),
        priority: 0.75,
      });
    }
    for (const compSlug of COMPARISON_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/compare/${compSlug}`,
        lastModified: now,
        priority: 0.7,
      });
    }
    for (const bundleSlug of BUNDLE_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/bundles/${bundleSlug}`,
        lastModified: now,
        priority: 0.8,
      });
    }
    for (const termSlug of GLOSSARY_TERM_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/peptides/glossary/${termSlug}`,
        lastModified: now,
        priority: 0.7,
      });
    }
  }

  // ── Protocols + FAQ hubs (all locales) ──────────────────────────
  for (const locale of locales) {
    entries.push({
      url: `${SITE_URL}/${locale}/protocols`,
      lastModified: now,
      priority: 0.8,
    });
    for (const protocolSlug of PROTOCOL_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/protocols/${protocolSlug}`,
        lastModified: now,
        priority: 0.75,
      });
    }
    for (const faqSlug of FAQ_HUB_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/faq/${faqSlug}`,
        lastModified: now,
        priority: 0.7,
      });
    }
  }

  // ── Europe country hub pages (all locales) ──────────────────────
  for (const locale of locales) {
    for (const country of EUROPEAN_COUNTRIES) {
      entries.push({
        url: `${SITE_URL}/${locale}/peptides/europe/${country.slug}`,
        lastModified: now,
        priority: 0.8,
      });
    }
  }

  // ── Europe city hub pages (all locales) ─────────────────────────
  for (const locale of locales) {
    for (const country of EUROPEAN_COUNTRIES) {
      for (const city of country.cities) {
        entries.push({
          url: `${SITE_URL}/${locale}/peptides/europe/${country.slug}/${city.slug}`,
          lastModified: now,
          priority: 0.7,
        });
      }
    }
  }

  return entries;
}
