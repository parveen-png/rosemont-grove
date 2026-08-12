import { sitemapResponse } from "@/lib/seo/sitemap";

export const dynamic = "force-static";

/** Alternate sitemap path for Search Console cache-busting */
export function GET() {
  return sitemapResponse();
}
