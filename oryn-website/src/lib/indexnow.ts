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
import { BRAZIL_COUNTRY } from "@/data/brazilian-cities";
import { locales } from "@/i18n/config";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? "";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_BATCH = 10_000;

function getHost(): string {
  return new URL(SITE_URL).hostname;
}

/**
 * Submit a list of URLs to IndexNow for instant indexing by Bing, Yandex,
 * Seznam, and Naver. Automatically batches into chunks of 10,000.
 */
export async function submitUrls(urls: string[]): Promise<{
  batches: number;
  totalUrls: number;
  results: { batch: number; status: number; ok: boolean }[];
}> {
  if (!INDEXNOW_KEY) {
    throw new Error("INDEXNOW_KEY environment variable is not set");
  }

  const host = getHost();
  const keyLocation = `${SITE_URL}/${INDEXNOW_KEY}.txt`;
  const results: { batch: number; status: number; ok: boolean }[] = [];

  for (let i = 0; i < urls.length; i += MAX_URLS_PER_BATCH) {
    const batch = urls.slice(i, i + MAX_URLS_PER_BATCH);
    const batchIndex = Math.floor(i / MAX_URLS_PER_BATCH) + 1;

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation,
        urlList: batch,
      }),
    });

    results.push({
      batch: batchIndex,
      status: response.status,
      ok: response.ok || response.status === 202,
    });
  }

  return {
    batches: results.length,
    totalUrls: urls.length,
    results,
  };
}

/**
 * Gather all sitemap URLs. Mirrors the logic in src/app/sitemap.ts so
 * IndexNow submissions stay in sync with what search engines see.
 */
export function getAllSitemapUrls(): string[] {
  const urls: string[] = [];

  const staticPages = [
    "", "/products", "/peptides", "/peptide-pens", "/about", "/science",
    "/contact", "/learn", "/compare", "/quality", "/why-oryn",
    "/tools/peptide-calculator", "/wholesale", "/shipping", "/faq",
    "/peptides/encyclopedia", "/peptides/glossary", "/protocols", "/bundles",
    "/peptides/europe", "/privacy", "/terms", "/disclaimer",
  ];

  // Static pages (all locales)
  for (const locale of locales) {
    for (const path of staticPages) {
      urls.push(`${SITE_URL}/${locale}${path}`);
    }
  }

  // Product pages (all locales)
  for (const locale of locales) {
    for (const product of products) {
      urls.push(`${SITE_URL}/${locale}/products/${product.slug}`);
    }
  }

  // UK city hub pages (EN only)
  for (const citySlug of CITY_SLUGS) {
    urls.push(`${SITE_URL}/en/peptides/${citySlug}`);
  }

  // London area hub pages (EN only)
  for (const areaSlug of LONDON_AREA_SLUGS) {
    urls.push(`${SITE_URL}/en/peptides/london/${areaSlug}`);
  }

  // Regional hub pages (EN only)
  for (const regionSlug of REGION_SLUGS) {
    urls.push(`${SITE_URL}/en/peptides/region/${regionSlug}`);
  }

  // County hub pages (EN only)
  for (const countySlug of COUNTY_SLUGS) {
    urls.push(`${SITE_URL}/en/peptides/county/${countySlug}`);
  }

  // Product × City pages (EN only)
  for (const citySlug of CITY_SLUGS) {
    for (const product of products) {
      urls.push(`${SITE_URL}/en/peptides/${citySlug}/${product.slug}`);
    }
  }

  // Product × London area pages (EN only)
  for (const areaSlug of LONDON_AREA_SLUGS) {
    for (const product of products) {
      urls.push(`${SITE_URL}/en/peptides/london/${areaSlug}/${product.slug}`);
    }
  }

  // Product × Region pages (EN only)
  for (const regionSlug of REGION_SLUGS) {
    for (const product of products) {
      urls.push(`${SITE_URL}/en/peptides/region/${regionSlug}/${product.slug}`);
    }
  }

  // Product × County pages (EN only)
  for (const countySlug of COUNTY_SLUGS) {
    for (const product of products) {
      urls.push(`${SITE_URL}/en/peptides/county/${countySlug}/${product.slug}`);
    }
  }

  // Product × European city pages (all locales)
  for (const locale of locales) {
    for (const country of EUROPEAN_COUNTRIES) {
      for (const city of country.cities) {
        for (const product of products) {
          urls.push(`${SITE_URL}/${locale}/peptides/europe/${country.slug}/${city.slug}/${product.slug}`);
        }
      }
    }
  }

  // Category pages (all locales)
  for (const locale of locales) {
    for (const category of SEO_CATEGORIES) {
      urls.push(`${SITE_URL}/${locale}/peptides-for/${category.slug}`);
    }
  }

  // Category × City cross-product pages (EN only)
  for (const category of SEO_CATEGORIES) {
    for (const citySlug of CITY_SLUGS) {
      urls.push(`${SITE_URL}/en/peptides-for/${category.slug}/${citySlug}`);
    }
  }

  // Category × European country cross-product pages (all locales)
  for (const locale of locales) {
    for (const category of SEO_CATEGORIES) {
      for (const country of EUROPEAN_COUNTRIES) {
        urls.push(`${SITE_URL}/${locale}/peptides-for/${category.slug}/europe/${country.slug}`);
      }
    }
  }

  // Category × European city cross-product pages (all locales)
  for (const locale of locales) {
    for (const category of SEO_CATEGORIES) {
      for (const country of EUROPEAN_COUNTRIES) {
        for (const city of country.cities) {
          urls.push(`${SITE_URL}/${locale}/peptides-for/${category.slug}/europe/${country.slug}/${city.slug}`);
        }
      }
    }
  }

  // Category × London area cross-product pages (EN only)
  for (const category of SEO_CATEGORIES) {
    for (const areaSlug of LONDON_AREA_SLUGS) {
      urls.push(`${SITE_URL}/en/peptides-for/${category.slug}/london/${areaSlug}`);
    }
  }

  // Category × UK region cross-product pages (EN only)
  for (const category of SEO_CATEGORIES) {
    for (const regionSlug of REGION_SLUGS) {
      urls.push(`${SITE_URL}/en/peptides-for/${category.slug}/region/${regionSlug}`);
    }
  }

  // Category × UK county cross-product pages (EN only)
  for (const category of SEO_CATEGORIES) {
    for (const countySlug of COUNTY_SLUGS) {
      urls.push(`${SITE_URL}/en/peptides-for/${category.slug}/county/${countySlug}`);
    }
  }

  // Encyclopedia, blog, comparisons, bundles, glossary (all locales)
  for (const locale of locales) {
    for (const slug of ENCYCLOPEDIA_SLUGS) {
      urls.push(`${SITE_URL}/${locale}/peptides/encyclopedia/${slug}`);
    }
    for (const article of BLOG_ARTICLES) {
      urls.push(`${SITE_URL}/${locale}/learn/${article.slug}`);
    }
    for (const compSlug of COMPARISON_SLUGS) {
      urls.push(`${SITE_URL}/${locale}/compare/${compSlug}`);
    }
    for (const bundleSlug of BUNDLE_SLUGS) {
      urls.push(`${SITE_URL}/${locale}/bundles/${bundleSlug}`);
    }
    for (const termSlug of GLOSSARY_TERM_SLUGS) {
      urls.push(`${SITE_URL}/${locale}/peptides/glossary/${termSlug}`);
    }
  }

  // Protocols + FAQ hubs (all locales)
  for (const locale of locales) {
    urls.push(`${SITE_URL}/${locale}/protocols`);
    for (const protocolSlug of PROTOCOL_SLUGS) {
      urls.push(`${SITE_URL}/${locale}/protocols/${protocolSlug}`);
    }
    for (const faqSlug of FAQ_HUB_SLUGS) {
      urls.push(`${SITE_URL}/${locale}/faq/${faqSlug}`);
    }
  }

  // Brazil country hub page (all locales)
  for (const locale of locales) {
    urls.push(`${SITE_URL}/${locale}/peptides/brazil`);
  }

  // Brazil city hub pages (all locales)
  for (const locale of locales) {
    for (const city of BRAZIL_COUNTRY.cities) {
      urls.push(`${SITE_URL}/${locale}/peptides/brazil/${city.slug}`);
    }
  }

  // Product × Brazil city pages (all locales)
  for (const locale of locales) {
    for (const city of BRAZIL_COUNTRY.cities) {
      for (const product of products) {
        urls.push(`${SITE_URL}/${locale}/peptides/brazil/${city.slug}/${product.slug}`);
      }
    }
  }

  // Europe country hub pages (all locales)
  for (const locale of locales) {
    for (const country of EUROPEAN_COUNTRIES) {
      urls.push(`${SITE_URL}/${locale}/peptides/europe/${country.slug}`);
    }
  }

  // Europe city hub pages (all locales)
  for (const locale of locales) {
    for (const country of EUROPEAN_COUNTRIES) {
      for (const city of country.cities) {
        urls.push(`${SITE_URL}/${locale}/peptides/europe/${country.slug}/${city.slug}`);
      }
    }
  }

  return urls;
}
