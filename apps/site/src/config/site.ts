import type { NavItem } from "@melikechan/ui";

export type { NavItem };

export interface SiteConfig {
  name: string;
  url: string;
  description: string;
  navItems: NavItem[];
}

export const siteConfig: SiteConfig = {
  name: "melikechan",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description: "melikechan's personal website.",
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
