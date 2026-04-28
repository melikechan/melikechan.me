interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

interface SiteConfig {
  name: string;
  mainSiteUrl: string;
  navItems: NavItem[];
}

export const siteConfig: SiteConfig = {
  name: "Summarization of Art Pieces Using VLMs",
  mainSiteUrl: "https://melikechan.me",
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
