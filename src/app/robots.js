import { siteConfig } from "@/config/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/contact", "/vercel/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
