import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // ── Private routes ──────────────────────────────────────
          "/admin/",
          "/api/",
          "/*/checkout",
          "/*/checkout/",
          "/*/cart",
          "/*/cart/",
          "/*/account",
          "/*/account/",
          "/*/wishlist",
          "/*/wishlist/",

          // ── Low-value combinatorial pages (prevent crawl waste) ─
          // City × product pages (e.g., /en/peptides/manchester/bpc-157)
          "/en/peptides/*/bpc-157",
          "/en/peptides/*/tirzepatide-pen",
          "/en/peptides/*/ghk-cu",
          "/en/peptides/*/nad-plus",
          "/en/peptides/*/tb-500",
          "/en/peptides/*/medit-tirzepatide",
          "/en/peptides/*/cjc-1295",
          "/en/peptides/*/ipamorelin",
          "/en/peptides/*/semaglutide",
          "/en/peptides/*/pt-141",

          // London area × product/category combos
          "/en/peptides/london/*/bpc-157",
          "/en/peptides/london/*/tirzepatide-pen",
          "/en/peptides/london/*/ghk-cu",
          "/en/peptides/london/*/nad-plus",
          "/en/peptides/london/*/tb-500",
          "/en/peptides/london/*/medit-tirzepatide",
          "/en/peptides/london/*/cjc-1295",
          "/en/peptides/london/*/ipamorelin",
          "/en/peptides/london/*/semaglutide",
          "/en/peptides/london/*/pt-141",
          "/en/peptides/london/*/recovery",
          "/en/peptides/london/*/weight-loss",
          "/en/peptides/london/*/anti-aging",
          "/en/peptides/london/*/muscle-growth",
          "/en/peptides/london/*/skin-rejuvenation",

          // Region × product/category combos
          "/en/peptides/region/*/bpc-157",
          "/en/peptides/region/*/tirzepatide-pen",
          "/en/peptides/region/*/ghk-cu",
          "/en/peptides/region/*/nad-plus",
          "/en/peptides/region/*/tb-500",
          "/en/peptides/region/*/medit-tirzepatide",
          "/en/peptides/region/*/cjc-1295",
          "/en/peptides/region/*/ipamorelin",
          "/en/peptides/region/*/semaglutide",
          "/en/peptides/region/*/pt-141",
          "/en/peptides/region/*/recovery",
          "/en/peptides/region/*/weight-loss",
          "/en/peptides/region/*/anti-aging",

          // County × product/category combos
          "/en/peptides/county/*/bpc-157",
          "/en/peptides/county/*/tirzepatide-pen",
          "/en/peptides/county/*/ghk-cu",
          "/en/peptides/county/*/nad-plus",
          "/en/peptides/county/*/tb-500",
          "/en/peptides/county/*/medit-tirzepatide",
          "/en/peptides/county/*/cjc-1295",
          "/en/peptides/county/*/ipamorelin",
          "/en/peptides/county/*/semaglutide",
          "/en/peptides/county/*/pt-141",
          "/en/peptides/county/*/recovery",
          "/en/peptides/county/*/weight-loss",
          "/en/peptides/county/*/anti-aging",

          // Category × city combos (e.g., /en/peptides-for/recovery/manchester)
          "/en/peptides-for/recovery/*",
          "/en/peptides-for/weight-loss/*",
          "/en/peptides-for/anti-aging/*",
          "/en/peptides-for/muscle-growth/*",
          "/en/peptides-for/skin-rejuvenation/*",
          "/en/peptides-for/sleep-quality/*",
          "/en/peptides-for/gut-health/*",
          "/en/peptides-for/hair-growth/*",
          "/en/peptides-for/immune-support/*",
          "/en/peptides-for/tendon-repair/*",
          "/en/peptides-for/sports-recovery/*",
          "/en/peptides-for/post-surgery/*",
          "/en/peptides-for/cognitive-enhancement/*",
          "/en/peptides-for/energy-vitality/*",
          "/en/peptides-for/detox-cleanse/*",
          "/en/peptides-for/body-composition/*",
          "/en/peptides-for/inflammation/*",
          "/en/peptides-for/hormonal-balance/*",
          "/en/peptides-for/longevity-biohacking/*",

          // European city × product pages (all locales)
          "/*/peptides/europe/*/*/bpc-157",
          "/*/peptides/europe/*/*/tirzepatide-pen",
          "/*/peptides/europe/*/*/ghk-cu",
          "/*/peptides/europe/*/*/nad-plus",
          "/*/peptides/europe/*/*/tb-500",
          "/*/peptides/europe/*/*/medit-tirzepatide",
          "/*/peptides/europe/*/*/cjc-1295",
          "/*/peptides/europe/*/*/ipamorelin",
          "/*/peptides/europe/*/*/semaglutide",
          "/*/peptides/europe/*/*/pt-141",

          // Non-EN European city pages (keep only EN hub pages)
          "/es/peptides/europe/*/*",
          "/fr/peptides/europe/*/*",
          "/de/peptides/europe/*/*",
          "/it/peptides/europe/*/*",
          "/pt/peptides/europe/*/*",
          "/nl/peptides/europe/*/*",
          "/pl/peptides/europe/*/*",
        ],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
      {
        userAgent: "anthropic-ai",
        disallow: ["/"],
      },
      {
        userAgent: "Google-Extended",
        disallow: ["/"],
      },
      {
        userAgent: "Bytespider",
        disallow: ["/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
