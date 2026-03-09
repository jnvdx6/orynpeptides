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
import { locales } from "@/i18n/config";

// Sitemap index: generates /sitemap/0.xml through /sitemap/7.xml
// and an auto-generated /sitemap.xml index file
export async function generateSitemaps() {
  return [
    { id: 0 }, // Static pages + product pages (both locales)
    { id: 1 }, // City landing pages (EN only)
    { id: 2 }, // City x product pages (EN only)
    { id: 3 }, // London area pages (EN only)
    { id: 4 }, // London area x slug pages (EN only — products + categories)
    { id: 5 }, // Regional pages — hubs + region x slug (EN only)
    { id: 6 }, // Category pages + category x city pages
    { id: 7 }, // Encyclopedia + blog + comparisons + bundles + glossary
    { id: 8 }, // County landing pages (EN only)
    { id: 9 }, // County x slug pages (EN only — products + categories)
    { id: 10 }, // Protocols + FAQ hubs (both locales)
  ];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date("2026-03-08");

  switch (id) {
    // ── 0: Static pages + product pages (both locales) ──────────────
    case 0: {
      const staticPages = [
        { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
        { path: "/products", changeFrequency: "weekly" as const, priority: 0.95 },
        { path: "/peptides", changeFrequency: "weekly" as const, priority: 0.9 },
        { path: "/about", changeFrequency: "monthly" as const, priority: 0.6 },
        { path: "/science", changeFrequency: "monthly" as const, priority: 0.7 },
        { path: "/contact", changeFrequency: "monthly" as const, priority: 0.5 },
        { path: "/learn", changeFrequency: "weekly" as const, priority: 0.8 },
        { path: "/compare", changeFrequency: "weekly" as const, priority: 0.8 },
        { path: "/quality", changeFrequency: "monthly" as const, priority: 0.85 },
        { path: "/why-oryn", changeFrequency: "monthly" as const, priority: 0.85 },
        { path: "/tools/peptide-calculator", changeFrequency: "monthly" as const, priority: 0.8 },
        { path: "/wholesale", changeFrequency: "monthly" as const, priority: 0.7 },
        { path: "/shipping", changeFrequency: "monthly" as const, priority: 0.7 },
        { path: "/faq", changeFrequency: "monthly" as const, priority: 0.75 },
        { path: "/peptides/encyclopedia", changeFrequency: "monthly" as const, priority: 0.8 },
        { path: "/peptides/glossary", changeFrequency: "monthly" as const, priority: 0.75 },
        { path: "/protocols", changeFrequency: "weekly" as const, priority: 0.8 },
        { path: "/bundles", changeFrequency: "monthly" as const, priority: 0.8 },
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
      break;
    }

    // ── 1: City landing pages (EN only) ─────────────────────────────
    case 1: {
      for (const citySlug of CITY_SLUGS) {
        entries.push({
          url: `${SITE_URL}/en/peptides/${citySlug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
      break;
    }

    // ── 2: City x product pages (EN only) ───────────────────────────
    case 2: {
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
      break;
    }

    // ── 3: London area pages (EN only) ──────────────────────────────
    case 3: {
      for (const areaSlug of LONDON_AREA_SLUGS) {
        entries.push({
          url: `${SITE_URL}/en/peptides/london/${areaSlug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.75,
        });
      }
      break;
    }

    // ── 4: London area x slug pages (EN only — products + categories)
    case 4: {
      // London area x product pages
      for (const areaSlug of LONDON_AREA_SLUGS) {
        for (const product of products) {
          entries.push({
            url: `${SITE_URL}/en/peptides/london/${areaSlug}/${product.slug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.55,
          });
        }
      }

      // London area x category pages
      for (const areaSlug of LONDON_AREA_SLUGS) {
        for (const category of SEO_CATEGORIES) {
          entries.push({
            url: `${SITE_URL}/en/peptides/london/${areaSlug}/${category.slug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
      }
      break;
    }

    // ── 5: Regional pages — hubs + region x slug (EN only) ─────────
    case 5: {
      // Regional hub pages
      for (const regionSlug of REGION_SLUGS) {
        entries.push({
          url: `${SITE_URL}/en/peptides/region/${regionSlug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }

      // Region x product pages
      for (const regionSlug of REGION_SLUGS) {
        for (const product of products) {
          entries.push({
            url: `${SITE_URL}/en/peptides/region/${regionSlug}/${product.slug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.65,
          });
        }
      }

      // Region x category pages
      for (const regionSlug of REGION_SLUGS) {
        for (const category of SEO_CATEGORIES) {
          entries.push({
            url: `${SITE_URL}/en/peptides/region/${regionSlug}/${category.slug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.65,
          });
        }
      }
      break;
    }

    // ── 6: Category pages + category x city pages ───────────────────
    case 6: {
      // Category SEO pages (both locales)
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

      // Category x city pages (EN only)
      for (const category of SEO_CATEGORIES) {
        for (const citySlug of CITY_SLUGS) {
          entries.push({
            url: `${SITE_URL}/en/peptides-for/${category.slug}/${citySlug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.65,
          });
        }
      }
      break;
    }

    // ── 7: Encyclopedia + blog + comparisons + bundles + glossary ───
    case 7: {
      // Peptide encyclopedia pages (both locales)
      for (const locale of locales) {
        for (const slug of ENCYCLOPEDIA_SLUGS) {
          entries.push({
            url: `${SITE_URL}/${locale}/peptides/encyclopedia/${slug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
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

      // Bundle/Stack pages (both locales)
      for (const locale of locales) {
        for (const bundleSlug of BUNDLE_SLUGS) {
          entries.push({
            url: `${SITE_URL}/${locale}/bundles/${bundleSlug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
          });
        }
      }

      // Individual glossary term pages (both locales)
      for (const locale of locales) {
        for (const termSlug of GLOSSARY_TERM_SLUGS) {
          entries.push({
            url: `${SITE_URL}/${locale}/peptides/glossary/${termSlug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
          });
        }
      }
      break;
    }

    // ── 8: County landing pages (EN only) ────────────────────────────
    case 8: {
      for (const countySlug of COUNTY_SLUGS) {
        entries.push({
          url: `${SITE_URL}/en/peptides/county/${countySlug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.75,
        });
      }
      break;
    }

    // ── 9: County x slug pages (EN only — products + categories) ────
    case 9: {
      for (const countySlug of COUNTY_SLUGS) {
        for (const product of products) {
          entries.push({
            url: `${SITE_URL}/en/peptides/county/${countySlug}/${product.slug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.55,
          });
        }
        for (const category of SEO_CATEGORIES) {
          entries.push({
            url: `${SITE_URL}/en/peptides/county/${countySlug}/${category.slug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
      }
      break;
    }

    // ── 10: Protocols + FAQ hubs (both locales) ─────────────────────
    case 10: {
      // Protocol index page
      for (const locale of locales) {
        entries.push({
          url: `${SITE_URL}/${locale}/protocols`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }

      // Individual protocol pages
      for (const locale of locales) {
        for (const protocolSlug of PROTOCOL_SLUGS) {
          entries.push({
            url: `${SITE_URL}/${locale}/protocols/${protocolSlug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          });
        }
      }

      // FAQ hub pages
      for (const locale of locales) {
        for (const faqSlug of FAQ_HUB_SLUGS) {
          entries.push({
            url: `${SITE_URL}/${locale}/faq/${faqSlug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
          });
        }
      }
      break;
    }
  }

  return entries;
}
