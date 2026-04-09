import { getSortedPostsData } from "@/lib/posts";
import { siteConfig } from "@/config/site";

function toDate(value) {
  if (!value) return undefined;
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d;
}

export default function sitemap() {
  const posts = getSortedPostsData();
  const baseUrl = siteConfig.url;
  const latestPostDate = toDate(posts[0]?.date);

  const staticPages = [
    {
      url: baseUrl,
      lastModified: latestPostDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/research`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: toDate(post.date),
    changeFrequency: "never",
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
