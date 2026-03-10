export interface Author {
  slug: string;
  name: string;
  title: string;
  credentials: string;
  bio: string;
  image: string;
}

export const AUTHORS: Author[] = [
  {
    slug: "dr-james-richardson",
    name: "Dr. James Richardson",
    title: "Chief Science Officer, ORYN Labs",
    credentials: "PhD in Biochemistry",
    bio: "Dr. James Richardson holds a PhD in Biochemistry from Imperial College London and brings over 15 years of hands-on experience in peptide synthesis and formulation science. As Chief Science Officer at ORYN Labs, he oversees all research and product development, ensuring every peptide pen meets the highest standards of purity and potency. His peer-reviewed work on bioactive peptide stability has been cited in over 40 publications.",
    image: "/og-image.png",
  },
  {
    slug: "dr-sarah-chen",
    name: "Dr. Sarah Chen",
    title: "Head of Quality & Compliance",
    credentials: "PhD in Analytical Chemistry",
    bio: "Dr. Sarah Chen earned her PhD in Analytical Chemistry from the University of Cambridge and spent eight years in pharmaceutical quality control before joining ORYN Labs. She leads the company's GMP compliance programme, third-party testing protocols, and ISO 7 cleanroom operations. Her expertise ensures every batch of ORYN peptides exceeds >99% purity through rigorous HPLC and mass spectrometry validation.",
    image: "/og-image.png",
  },
  {
    slug: "dr-marcus-weber",
    name: "Dr. Marcus Weber",
    title: "European Research Director",
    credentials: "PhD in Molecular Biology",
    bio: "Dr. Marcus Weber holds a PhD in Molecular Biology from ETH Zurich and specialises in European regulatory frameworks for research-grade biologics. As ORYN's European Research Director, he manages cross-border compliance, EU regulatory filings, and partnerships with European GMP facilities. His decade of experience navigating MHRA, EMA, and national regulatory bodies makes him a trusted voice on peptide legality across Europe.",
    image: "/og-image.png",
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}

/**
 * Assign an author to a blog article based on its category or slug.
 * - Legal / compliance / EU / regulation → Dr. Marcus Weber
 * - Quality / testing / storage / safety → Dr. Sarah Chen
 * - Everything else (science, products, general) → Dr. James Richardson
 */
export function getAuthorForArticle(article: {
  slug: string;
  category: string;
}): Author {
  const slug = article.slug.toLowerCase();
  const cat = article.category.toLowerCase();

  // EU / Legal / Compliance topics → Dr. Weber
  if (
    cat.includes("legal") ||
    cat.includes("compliance") ||
    slug.includes("legal") ||
    slug.includes("regulation") ||
    slug.includes("europe")
  ) {
    return AUTHORS[2]; // Dr. Marcus Weber
  }

  // Quality / Testing / Storage / Safety topics → Dr. Chen
  if (
    cat.includes("quality") ||
    slug.includes("storage") ||
    slug.includes("shelf-life") ||
    slug.includes("safety") ||
    slug.includes("side-effect") ||
    slug.includes("troubleshooting")
  ) {
    return AUTHORS[1]; // Dr. Sarah Chen
  }

  // Default → Dr. Richardson (science, products, guides, education, etc.)
  return AUTHORS[0]; // Dr. James Richardson
}

/**
 * Pick a reviewer that is different from the primary author.
 */
export function getReviewerForArticle(article: {
  slug: string;
  category: string;
}): Author {
  const author = getAuthorForArticle(article);
  // Pick a reviewer who is NOT the same person
  if (author.slug === "dr-james-richardson") return AUTHORS[1]; // Dr. Chen reviews
  if (author.slug === "dr-sarah-chen") return AUTHORS[0]; // Dr. Richardson reviews
  return AUTHORS[1]; // Dr. Chen reviews Dr. Weber's articles
}
