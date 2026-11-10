import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

// Sitemap of real pages only (redirect stubs for old guide URLs are left out)
export const GET: APIRoute = async ({ site }) => {
  const docs = await getCollection("docs", (entry) => !entry.data.draft);
  const posts = await getCollection("blog");

  const paths = [
    "/",
    "/blog",
    ...docs.map((entry) => `/${entry.slug}`),
    ...posts.map((post) => `/blog/${post.slug}`),
  ];

  const urls = paths
    .map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`)
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } },
  );
};
