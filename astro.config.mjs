import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import { readdirSync } from "node:fs";

// Old guide URLs (before the move to /archive) redirect to their archived copies
const ARCHIVE_DIR = "src/content/docs/archive";
const archiveRedirects = Object.fromEntries(
  readdirSync(ARCHIVE_DIR, { recursive: true })
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file
        .replace(/\\/g, "/")
        .replace(/\.mdx$/, "")
        .replace(/(^|\/)index$/, "")
        .toLowerCase();
      return [`/${slug}`, `/archive/${slug}`];
    })
    // archive/index.mdx has an empty slug; skip it so "/" (the home page) isn't redirected
    .filter(([from]) => from !== "/"),
);

// https://astro.build/config
export default defineConfig({
  site: "https://fusionsaint.com",
  redirects: archiveRedirects,
  markdown: {
    smartypants: true,
    syntaxHighlight: "shiki",
    shikiConfig: {
      // theme: "catppuccin-mocha",
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-macchiato",
      },
    },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
        },
      ],
    ],
    prefetch: true,
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx({
      gfm: true,
    }),
  ],
});
