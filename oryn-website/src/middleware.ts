import { NextRequest, NextResponse } from "next/server";
import {
  locales,
  defaultLocale,
  isValidLocale,
  isValidRegion,
  countryToLocale,
  countryToRegion,
  markets,
} from "./i18n/config";
import type { RegionKey } from "./i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, admin panel, static files, metadata images, and Next.js internals
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/") ||
    pathname === "/icon" ||
    pathname === "/apple-icon" ||
    pathname === "/opengraph-image" ||
    pathname === "/twitter-image" ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already starts with a locale
  const pathnameLocale = locales.find(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale) {
    // Path already has locale — but still set region cookie from geo if not set
    const response = NextResponse.next();
    if (!request.cookies.get("ORYN_REGION")?.value) {
      const geoRegion = detectRegionFromGeo(request);
      if (geoRegion) {
        response.cookies.set("ORYN_REGION", geoRegion, {
          maxAge: 60 * 60 * 24 * 365,
          path: "/",
        });
      }
    }
    return response;
  }

  // ── Detect locale ─────────────────────────────────────────────
  const cookieLocale = request.cookies.get("ORYN_LOCALE")?.value;
  let detectedLocale = defaultLocale;

  if (cookieLocale && isValidLocale(cookieLocale)) {
    // 1. User's explicit preference (cookie)
    detectedLocale = cookieLocale;
  } else {
    // 2. Accept-Language header (browser preference — strongest automatic signal)
    const acceptLang = request.headers.get("accept-language") || "";
    const preferredLangs = acceptLang
      .split(",")
      .map((lang) => lang.split(";")[0].trim().toLowerCase());

    let foundFromAcceptLang = false;
    for (const raw of preferredLangs) {
      // Try exact match first (e.g. "pt-br")
      if (isValidLocale(raw)) {
        detectedLocale = raw;
        foundFromAcceptLang = true;
        break;
      }
      // Try base language match (e.g. "de" from "de-DE")
      const base = raw.split("-")[0];
      if (isValidLocale(base)) {
        detectedLocale = base;
        foundFromAcceptLang = true;
        break;
      }
      // Try matching a regional locale whose base matches (e.g. "pt" → "pt-br")
      for (const loc of locales) {
        if (loc.startsWith(base + "-")) {
          detectedLocale = loc;
          foundFromAcceptLang = true;
          break;
        }
      }
      if (foundFromAcceptLang) break;
    }

    // 3. Vercel geo-detection fallback (IP-based, weaker signal)
    if (!foundFromAcceptLang) {
      const country = request.headers.get("x-vercel-ip-country");
      if (country && countryToLocale[country]) {
        detectedLocale = countryToLocale[country];
      }
    }
  }

  // ── Detect region (for currency) ──────────────────────────────
  const cookieRegion = request.cookies.get("ORYN_REGION")?.value;
  let detectedRegion: RegionKey | null = null;

  if (cookieRegion && isValidRegion(cookieRegion)) {
    detectedRegion = cookieRegion;
  } else {
    detectedRegion = detectRegionFromGeo(request);
  }

  // If no geo region detected, use the market default for this locale
  if (!detectedRegion) {
    detectedRegion = markets[detectedLocale].defaultRegion;
  }

  // ── Redirect to the localized path ────────────────────────────
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname}`;

  const response = NextResponse.redirect(url, 308);

  response.cookies.set("ORYN_LOCALE", detectedLocale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  response.cookies.set("ORYN_REGION", detectedRegion, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return response;
}

/** Use Vercel's x-vercel-ip-country header to detect the user's region */
function detectRegionFromGeo(request: NextRequest): RegionKey | null {
  const country = request.headers.get("x-vercel-ip-country");
  if (country && countryToRegion[country]) {
    return countryToRegion[country];
  }
  return null;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon\\.ico|icon|apple-icon|opengraph-image|twitter-image|sitemap\\.xml|robots\\.txt|manifest\\.json).*)",
  ],
};
