import { getSortedPostsData, getAllTags } from "@/lib/posts";
import BlogList from "./BlogList";

export async function generateMetadata(_params, parent) {
  const parentMetadata = await parent;
  return {
    title: "Blog",
    description: "Blog posts by melikechan.",
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      ...parentMetadata.openGraph,
      title: "Blog",
      description: "Blog posts by melikechan.",
      url: "/blog",
    },
    twitter: {
      ...parentMetadata.twitter,
      title: "Blog",
      description: "Blog posts by melikechan.",
    },
  };
}

export default function BlogPage() {
  const allPostsData = getSortedPostsData();
  const allTags = getAllTags();

  return <BlogList allPostsData={allPostsData} allTags={allTags} />;
}
