import type { SocialObjects } from "@/lib/types";

export const SITE = {
  website: "https://fusionsaint.com",
  author: "FusionSaint",
  desc: "Elite, tactical, data-driven game guides by FusionSaint",
  title: "FusionSaint Guides",
  ogImage: "/og/fusionsaint_ogimage.png",          // put this file at public/og/fs-guides-og.jpg
  repo: "https://github.com/FusionSaint/FUSA",
};

export const LOCALE = {
  lang: "en",
  langTag: ["en-US"],
} as const;

export const menu_items: { title: string; href: string }[] = [
  // { title: "Home", href: "/" },
];

export const side_nav_menu_order: string[] = [
  "getting-started",
];

export const docconfig = {
  hide_table_of_contents: false,
  hide_breadcrumbs: false,
  hide_side_navigations: false,
  hide_datetime: false,
  hide_time: true,
  hide_search: false,
  hide_repo_button: false,  // set to true if you don’t want a GitHub button
  hide_author: true,
};

export const Socials: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/FusionSaint",
    linkTitle: `${SITE.title} on Github`,
    active: true,
  },
  // leave the rest as-is or toggle active:false until you have real links
  {
    name: "Mail",
    href: "mailto:fusionsaint@pm.me", // change to your real email, or set active:false
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/fusionsaint.bsky.social",
    linkTitle: `${SITE.title} on Bluesky`,
    active: false,
  },
];
