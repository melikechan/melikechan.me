import { getSortedPostsData, getAllTags } from "@/lib/posts";
import BlogList from "./BlogList";

export async function generateMetadata() {
  return {
    title: "Blog",
    description: "Blog posts by melikechan.",
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      title: "Blog",
      description: "Blog posts by melikechan.",
      url: "/blog",
    },
    twitter: {
      card: "summary",
      title: "Blog | melikechan",
    },
  };
}

export default function BlogPage() {
  const allPostsData = getSortedPostsData();
  const allTags = getAllTags();

  return <BlogList allPostsData={allPostsData} allTags={allTags} />;
}
