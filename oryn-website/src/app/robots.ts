import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // ── Private routes (non-indexable user flows) ──────────
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
        ],
      },
      // ── AI crawlers: allow public pages for AI platform visibility ──
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/*/checkout", "/*/checkout/", "/*/cart", "/*/cart/", "/*/account", "/*/account/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Bytespider",
        allow: "/",
        disallow: ["/admin/", "/api/", "/*/checkout", "/*/checkout/", "/*/cart", "/*/cart/", "/*/account", "/*/account/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
