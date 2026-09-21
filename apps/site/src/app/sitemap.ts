import type { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/posts";
import { siteConfig } from "@/config/site";

function toDate(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getSortedPostsData();
  const latestPostDate = toDate(posts[0]?.date);
  const url = (pathname: string) =>
    new URL(pathname, siteConfig.siteUrl).toString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: url("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    { url: url("/about"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/projects"), changeFrequency: "monthly", priority: 0.8 },
    {
      url: url("/research/grad-project"),
      changeFrequency: "never",
      priority: 0.8,
    },
    {
      url: url("/blog"),
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = posts
    .filter((post) => post.noIndex !== true)
    .map((post) => ({
      url: url(`/blog/${post.id}`),
      lastModified: toDate(post.date),
      changeFrequency: "never",
      priority: 0.7,
    }));

  return [...staticPages, ...blogPages];
}
