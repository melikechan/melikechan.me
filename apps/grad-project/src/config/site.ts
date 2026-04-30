import type { NavItem } from "@melikechan/ui";

interface SiteConfig {
  name: string;
  navItems: NavItem[];
}

export const siteConfig: SiteConfig = {
  name: "Summarization of Art Pieces Using VLMs",
  navItems: [
    {
      href: "/",
      label: "About",
    },
    {
      href: "#playground",
      label: "Playground",
    },
  ],
};
