import type { MetadataRoute } from "next";
import { SITE_URL, SEO_CATEGORIES } from "@/lib/seo";
import { products } from "@/data/products";
import { CITY_SLUGS } from "@/data/uk-cities";
import { BLOG_ARTICLES, ARTICLE_SLUGS } from "@/data/blog-articles";
import { COMPARISON_SLUGS } from "@/data/comparisons";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date("2026-03-08");

  // Static pages per locale
  const staticPages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/products", changeFrequency: "weekly" as const, priority: 0.95 },
    { path: "/peptides", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/science", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/learn", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/compare", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/disclaimer", changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  // Product pages (high priority — money pages)
  for (const locale of locales) {
    for (const product of products) {
      entries.push({
        url: `${SITE_URL}/${locale}/products/${product.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  // City landing pages (en only — UK market)
  for (const citySlug of CITY_SLUGS) {
    entries.push({
      url: `${SITE_URL}/en/peptides/${citySlug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Product × City pages (en only)
  for (const citySlug of CITY_SLUGS) {
    for (const product of products) {
      entries.push({
        url: `${SITE_URL}/en/peptides/${citySlug}/${product.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Category SEO pages
  for (const locale of locales) {
    for (const category of SEO_CATEGORIES) {
      entries.push({
        url: `${SITE_URL}/${locale}/peptides-for/${category.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }
  }

  // Blog/Learn pages with actual dates
  for (const locale of locales) {
    for (const article of BLOG_ARTICLES) {
      entries.push({
        url: `${SITE_URL}/${locale}/learn/${article.slug}`,
        lastModified: new Date(article.dateModified),
        changeFrequency: "monthly",
        priority: 0.75,
      });
    }
  }

  // Comparison pages
  for (const locale of locales) {
    for (const compSlug of COMPARISON_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/compare/${compSlug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
