import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isValidLocale } from "./i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rewrite /sitemap.xml to API route (Next.js [locale] catches it otherwise)
  if (pathname === "/sitemap.xml") {
    const url = request.nextUrl.clone();
    url.pathname = "/api/sitemap-index";
    return NextResponse.rewrite(url);
  }

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
    pathname.startsWith("/sitemap/") ||
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
    return NextResponse.next();
  }

  // Detect preferred locale from Accept-Language header or cookie
  const cookieLocale = request.cookies.get("ORYN_LOCALE")?.value;
  let detectedLocale = defaultLocale;

  if (cookieLocale && isValidLocale(cookieLocale)) {
    detectedLocale = cookieLocale;
  } else {
    const acceptLang = request.headers.get("accept-language") || "";
    const preferredLangs = acceptLang
      .split(",")
      .map((lang) => lang.split(";")[0].trim().substring(0, 2).toLowerCase());

    for (const lang of preferredLangs) {
      if (isValidLocale(lang)) {
        detectedLocale = lang;
        break;
      }
    }
  }

  // Redirect to the localized path
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set("ORYN_LOCALE", detectedLocale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon\\.ico|icon|apple-icon|opengraph-image|twitter-image|sitemap/|robots\\.txt|manifest\\.json).*)",
  ],
};
