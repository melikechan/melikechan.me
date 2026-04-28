import type { ResolvingMetadata, Metadata } from "next";
import { getSortedPostsData, getAllTags } from "@/lib/posts";
import BlogList from "./BlogList";
import { TypographyH1 } from "@/components/typography/headings";
import { TypographyLead } from "@/components/typography/paragraph";

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
    <main className="flex flex-col min-h-screen items-center gap-6 mt-2 mx-1 animate-fade-in">
      <div className="text-center">
        <TypographyH1>Blog</TypographyH1>
        <TypographyLead className="mt-2">
          Search, sort, and read my latest thoughts.
        </TypographyLead>
      </div>
      <BlogList allPostsData={allPostsData} allTags={allTags} />
    </main>
  );
}
