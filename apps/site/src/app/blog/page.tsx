import { getSortedPostsData, getAllTags } from "@/lib/posts";
import { createPageMetadata } from "@/lib/metadata";
import BlogList from "./BlogList";
import { TypographyH1, TypographyLead } from "@melikechan/ui/typography";

export const metadata = createPageMetadata({
  title: "Blog",
  description: "Blog posts by melikechan.",
  pathname: "/blog",
});

export default async function BlogPage() {
  const allPostsData = await getSortedPostsData();
  const allTags = getAllTags(allPostsData);

  return (
    <main className="flex flex-col min-h-screen items-center gap-6 mt-2 animate-fade-in">
      <div className="flex flex-col gap-6 w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
        <div className="text-center">
          <TypographyH1>Blog</TypographyH1>
          <TypographyLead className="mt-2">
            Search, sort, and read my latest thoughts.
          </TypographyLead>
        </div>
        <BlogList allPostsData={allPostsData} allTags={allTags} />
      </div>
    </main>
  );
}
