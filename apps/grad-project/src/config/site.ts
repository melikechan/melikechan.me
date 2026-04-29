import type { NavItem } from "@melikechan/ui";

interface SiteConfig {
  name: string;
  navItems: NavItem[];
}

export const siteConfig: SiteConfig = {
  name: "Summarization of Art Pieces Using VLMs",
  navItems: [
    {
      href: "/research/grad-project",
      label: "About",
      external: true,
    },
    {
      href: "#playground",
      label: "Playground",
    },
  ],
};
