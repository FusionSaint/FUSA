import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

// Static search index, fetched by the Search dialog the first time it opens.
// Keeping this out of the page HTML stops every page from embedding every guide.

function extractHeaders(body: string): string[] {
  return body
    .split("\n")
    .map((line) => line.match(/^#{1,6}\s+(.*)/)?.[1])
    .filter((header): header is string => Boolean(header));
}

// Reduce MDX to searchable plain text: drop imports, JSX/HTML tags, and markdown syntax
function toPlainText(body: string): string {
  return body
    .replace(/^import\s.*$/gm, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^{}]*\}/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#*_`>|~-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const GET: APIRoute = async () => {
  const docs = await getCollection("docs", (entry) => !entry.data.draft);
  const index = docs.map((entry) => ({
    slug: entry.slug,
    title: entry.data.title,
    description: entry.data.description ?? "",
    tags: entry.data.tags.join(" "),
    headers: extractHeaders(entry.body).join(" "),
    body: toPlainText(entry.body),
  }));
  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json" },
  });
};
