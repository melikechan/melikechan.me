import { getSortedPostsData, getAllTags } from '@/lib/posts';
import BlogList from './BlogList';

export default function BlogPage() {
  const allPostsData = getSortedPostsData();
  const allTags = getAllTags();

  return <BlogList allPostsData={allPostsData} allTags={allTags} />;
}