import type { MetadataRoute } from "next";
import { SITE_URL, SEO_CATEGORIES } from "@/lib/seo";
import { products } from "@/data/products";
import { BLOG_ARTICLES } from "@/data/blog-articles";
import { COMPARISON_SLUGS } from "@/data/comparisons";
import { ENCYCLOPEDIA_SLUGS } from "@/data/peptide-encyclopedia";
import { BUNDLE_SLUGS } from "@/data/bundles";
import { GLOSSARY_TERM_SLUGS } from "@/data/glossary-terms";
import { PROTOCOL_SLUGS } from "@/data/protocols";
import { FAQ_HUB_SLUGS } from "@/data/faq-hubs";
import { EUROPEAN_COUNTRIES } from "@/data/european-countries";

/**
 * Pruned sitemap — English-only, no geographic location pages.
 *
 * Why: Domain is <1 week old with zero authority. Google has indexed only
 * 81 of ~14,919 URLs (0.5%). Submitting thousands of thin/duplicate pages
 * wastes crawl budget and dilutes page authority. We focus the sitemap on
 * ~300 high-value English pages until the domain earns more authority.
 *
 * Removed:
 * - All non-English locale variants (7 locales × every page)
 * - UK city hub pages, London area pages, region pages, county pages
 * - European city-level pages
 *
 * Kept:
 * - Core English static pages, product pages, category pages
 * - All learn articles, encyclopedia, comparisons, glossary, protocols, FAQ hubs
 * - European country-level hub pages (EN only)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();
  const locale = "en";

  // ── Static pages (EN only) ──────────────────────────────────────
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

  for (const page of staticPages) {
    entries.push({
      url: `${SITE_URL}/${locale}${page.path}`,
      lastModified: now,
      priority: page.priority,
    });
  }

  // ── Product pages (EN only) ─────────────────────────────────────
  for (const product of products) {
    entries.push({
      url: `${SITE_URL}/${locale}/products/${product.slug}`,
      lastModified: now,
      priority: 0.9,
    });
  }

  // ── Category pages (EN only) ───────────────────────────────────
  for (const category of SEO_CATEGORIES) {
    entries.push({
      url: `${SITE_URL}/${locale}/peptides-for/${category.slug}`,
      lastModified: now,
      priority: 0.85,
    });
  }

  // ── Encyclopedia + blog + comparisons + bundles + glossary (EN) ─
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

  // ── Protocols + FAQ hubs (EN only) ──────────────────────────────
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

  // ── Europe country hub pages (EN only) ──────────────────────────
  for (const country of EUROPEAN_COUNTRIES) {
    entries.push({
      url: `${SITE_URL}/${locale}/peptides/europe/${country.slug}`,
      lastModified: now,
      priority: 0.8,
    });
  }

  return entries;
}
