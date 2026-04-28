import type { ResolvingMetadata, Metadata } from "next";
import { TypographyH1, TypographyH2 } from "@/components/typography/headings";
import {
  TypographyLead,
  TypographyMuted,
} from "@/components/typography/paragraph";

export async function generateMetadata(
  _params: object,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetadata = await parent;
  return {
    title: "Research",
    description: "Research projects affiliated with melikechan.",
    alternates: {
      canonical: "/research",
    },
    openGraph: {
      ...parentMetadata.openGraph,
      title: "Research",
      description: "Research projects affiliated with melikechan.",
      url: "/research",
    },
    twitter: {
      ...parentMetadata.twitter,
      title: "Research",
      description: "Research projects affiliated with melikechan.",
    },
  };
}

export default async function Research() {
  return (
    <main className="flex flex-col min-h-screen items-center gap-6 mt-2 animate-fade-in">
      <TypographyH1>Research</TypographyH1>
      <TypographyLead className="mt-2 text-center">
        Here is a list of featured research projects for which I am the author
        or co-author.
      </TypographyLead>

      <TypographyH2>Featured Work</TypographyH2>
      <TypographyMuted className="text-center">
        Unfortunately, there are still no research projects. 😔 Check back
        later.
      </TypographyMuted>
    </main>
  );
}
