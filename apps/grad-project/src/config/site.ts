interface SiteConfig {
  name: string;
  url: string;
  description: string;
  title: string;
  siteUrl: string;
  authors: readonly string[];
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig: SiteConfig = {
  name: "Summarization of Art Pieces Using VLMs",
  url: new URL("/research/grad-project", siteUrl).toString(),
  description:
    "An accessibility-focused approach to generating objective, visual descriptions of art pieces using fine-tuned Vision-Language Models.",
  title: "Summarization of Art Pieces Using Vision-Language Models",
  siteUrl,
  authors: ["Mustafa Taner Turan", "Melike Vurucu", "Bülent Tuğrul"],
};
