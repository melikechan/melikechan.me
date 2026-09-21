import type { NavItem } from "@melikechan/ui";
import { env } from "@/env";

export type { NavItem };

interface SiteConfig {
  name: string;
  url: string;
  description: string;
  title: string;
  siteUrl: string;
  authors: readonly string[];
  navItems: NavItem[];
}

const siteUrl = env.NEXT_PUBLIC_SITE_URL;

export const siteConfig: SiteConfig = {
  name: "melikechan",
  url: siteUrl,
  description: "melikechan's personal website.",
  title: "melikechan",
  siteUrl,
  authors: ["Melike Vurucu"],
  navItems: [
    {
      href: "/about",
      label: "About",
    },
    {
      label: "Works",
      subitems: [
        {
          href: "/research",
          label: "Research",
        },
        {
          href: "/projects",
          label: "Projects",
        },
      ],
    },
    {
      href: "/blog",
      label: "Blog",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ],
};
