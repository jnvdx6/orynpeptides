import { NextRequest, NextResponse } from "next/server";
import { submitUrls, getAllSitemapUrls } from "@/lib/indexnow";

const ADMIN_SECRET = process.env.INDEXNOW_ADMIN_SECRET || "";

function isAuthorized(request: NextRequest): boolean {
  if (!ADMIN_SECRET) return false;
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${ADMIN_SECRET}`;
}

/**
 * POST /api/indexnow/submit
 *
 * Submit URLs to IndexNow for instant indexing by Bing, Yandex, Seznam, Naver.
 *
 * Body (optional):
 *   { "urls": ["https://orynxpeptides.com/en/products/bpc-157", ...] }
 *
 * If no URLs provided, submits all sitemap URLs.
 *
 * Headers:
 *   Authorization: Bearer <INDEXNOW_ADMIN_SECRET>
 */
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let urls: string[];

    const body = await request.json().catch(() => ({}));

    if (Array.isArray(body.urls) && body.urls.length > 0) {
      urls = body.urls;
    } else {
      urls = getAllSitemapUrls();
    }

    const result = await submitUrls(urls);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
