import { getSortedPostsData, getAllTags } from '@/lib/posts';
import BlogList from './BlogList';

export async function generateMetadata() {
  return {
    title: "Blog",
    description: "Blog posts by melikechan.",
    openGraph: {
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