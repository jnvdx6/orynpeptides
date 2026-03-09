import Link from "next/link";
import { BLOG_ARTICLES } from "@/data/blog-articles";
import { COMPARISONS } from "@/data/comparisons";
import { PEPTIDE_ENTRIES } from "@/data/peptide-encyclopedia";
import { bundles } from "@/data/bundles";
import { SEO_CATEGORIES } from "@/lib/seo";

interface RelatedContentProps {
  productSlug?: string;
  categorySlug?: string;
  locale: string;
}

interface ContentCard {
  type: "ARTICLE" | "COMPARISON" | "ENCYCLOPEDIA" | "BUNDLE" | "CATEGORY";
  title: string;
  description: string;
  href: string;
}

function findRelatedArticles(
  productSlug?: string,
  categorySlug?: string
): ContentCard[] {
  let matched = BLOG_ARTICLES.filter((a) => {
    if (productSlug) {
      return a.relatedProducts.includes(productSlug);
    }
    if (categorySlug) {
      const category = SEO_CATEGORIES.find((c) => c.slug === categorySlug);
      if (category) {
        return a.relatedProducts.some((rp) =>
          category.productSlugs.includes(rp)
        );
      }
    }
    return false;
  });

  if (matched.length === 0) {
    matched = BLOG_ARTICLES.slice(0, 3);
  }

  return matched.slice(0, 3).map((a) => ({
    type: "ARTICLE" as const,
    title: a.title,
    description: a.metaDescription,
    href: `/learn/${a.slug}`,
  }));
}

function findRelatedComparisons(
  productSlug?: string,
  categorySlug?: string
): ContentCard[] {
  let matched = COMPARISONS.filter((c) => {
    if (productSlug) {
      return c.productA === productSlug || c.productB === productSlug;
    }
    if (categorySlug) {
      const category = SEO_CATEGORIES.find((cat) => cat.slug === categorySlug);
      if (category) {
        return (
          category.productSlugs.includes(c.productA) ||
          category.productSlugs.includes(c.productB)
        );
      }
    }
    return false;
  });

  if (matched.length === 0) {
    matched = COMPARISONS.slice(0, 2);
  }

  return matched.slice(0, 2).map((c) => ({
    type: "COMPARISON" as const,
    title: c.title,
    description: c.metaDescription,
    href: `/compare/${c.slug}`,
  }));
}

function findRelatedEncyclopedia(
  productSlug?: string,
  categorySlug?: string
): ContentCard[] {
  let entry = productSlug
    ? PEPTIDE_ENTRIES.find((e) => e.slug === productSlug)
    : undefined;

  if (!entry && categorySlug) {
    const category = SEO_CATEGORIES.find((c) => c.slug === categorySlug);
    if (category && category.productSlugs.length > 0) {
      entry = PEPTIDE_ENTRIES.find((e) =>
        category.productSlugs.includes(e.slug)
      );
    }
  }

  if (!entry && PEPTIDE_ENTRIES.length > 0) {
    entry = PEPTIDE_ENTRIES[0];
  }

  if (!entry) return [];

  return [
    {
      type: "ENCYCLOPEDIA" as const,
      title: `${entry.name} — ${entry.fullName}`,
      description: `${entry.classification}. Molecular weight: ${entry.molecularWeight}. Explore mechanism of action, key studies, and research applications.`,
      href: `/peptides/encyclopedia/${entry.slug}`,
    },
  ];
}

function findRelatedBundles(
  productSlug?: string,
  categorySlug?: string
): ContentCard[] {
  let matched = bundles.filter((b) => {
    if (productSlug) {
      return b.productSlugs.includes(productSlug);
    }
    if (categorySlug) {
      const category = SEO_CATEGORIES.find((c) => c.slug === categorySlug);
      if (category) {
        return b.productSlugs.some((ps) =>
          category.productSlugs.includes(ps)
        );
      }
    }
    return false;
  });

  if (matched.length === 0) {
    matched = bundles.slice(0, 1);
  }

  return matched.slice(0, 1).map((b) => ({
    type: "BUNDLE" as const,
    title: b.name,
    description: b.tagline,
    href: `/bundles/${b.slug}`,
  }));
}

function findRelatedCategories(
  productSlug?: string,
  categorySlug?: string
): ContentCard[] {
  let matched = SEO_CATEGORIES.filter((c) => {
    if (categorySlug) {
      return c.slug !== categorySlug;
    }
    if (productSlug) {
      return c.productSlugs.includes(productSlug);
    }
    return false;
  });

  if (matched.length === 0) {
    matched = SEO_CATEGORIES.slice(0, 2);
  }

  return matched.slice(0, 2).map((c) => ({
    type: "CATEGORY" as const,
    title: c.name,
    description: c.metaDescription,
    href: `/peptides-for/${c.slug}`,
  }));
}

export function RelatedContent({
  productSlug,
  categorySlug,
  locale,
}: RelatedContentProps) {
  const articles = findRelatedArticles(productSlug, categorySlug);
  const comparisons = findRelatedComparisons(productSlug, categorySlug);
  const encyclopedia = findRelatedEncyclopedia(productSlug, categorySlug);
  const relatedBundles = findRelatedBundles(productSlug, categorySlug);
  const categories = findRelatedCategories(productSlug, categorySlug);

  const allCards: ContentCard[] = [
    ...articles,
    ...comparisons,
    ...encyclopedia,
    ...relatedBundles,
    ...categories,
  ];

  if (allCards.length === 0) return null;

  return (
    <section className="border-t border-oryn-grey/10 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="inline-flex items-center gap-3 mb-2">
          <div className="w-6 h-px bg-oryn-orange" />
          <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
            EXPLORE MORE
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-8">
          Related Research &amp; Resources
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allCards.map((card) => (
            <Link
              key={card.href}
              href={`/${locale}${card.href}`}
              className="group block rounded-xl border border-oryn-grey/20 bg-white p-5 transition-all hover:border-oryn-orange/30 hover:shadow-md"
            >
              <span className="text-[8px] font-mono text-oryn-orange tracking-[0.15em]">
                {card.type}
              </span>
              <h3 className="text-sm font-bold mt-1 mb-2 group-hover:text-oryn-orange transition-colors line-clamp-2">
                {card.title}
              </h3>
              <p className="text-xs text-oryn-black/50 font-plex line-clamp-3">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
