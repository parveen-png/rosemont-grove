const SITE_URL = "https://rosemontgrovehallethomes.com";

const urls = [
  { loc: `${SITE_URL}/`, lastmod: "2026-08-12", changefreq: "weekly", priority: "1.0" },
  {
    loc: `${SITE_URL}/sources`,
    lastmod: "2026-08-12",
    changefreq: "monthly",
    priority: "0.6",
  },
  {
    loc: `${SITE_URL}/privacy-policy`,
    lastmod: "2026-08-12",
    changefreq: "yearly",
    priority: "0.3",
  },
] as const;

export function buildSitemapXml(): string {
  const body = urls
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

export function sitemapResponse(): Response {
  return new Response(buildSitemapXml(), {
    status: 200,
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
