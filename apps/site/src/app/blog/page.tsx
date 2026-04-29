import type { ResolvingMetadata, Metadata } from "next";
import { getSortedPostsData, getAllTags } from "@/lib/posts";
import BlogList from "./BlogList";
import { TypographyH1, TypographyLead } from "@melikechan/ui/typography";
export async function generateMetadata(
  _params: object,
  parent: ResolvingMetadata,
): Promise<Metadata> {
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
