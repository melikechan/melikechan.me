import { TypographyH1, TypographyH2 } from "@/components/typography/headings";
import {
  TypographyMuted,
  TypographyParagraph,
} from "@/components/typography/paragraph";

export async function generateMetadata() {
  return {
    title: "Research",
    description: "Research projects affiliated with melikechan.",
    alternates: {
      canonical: "/research",
    },
    openGraph: {
      title: "Research",
      description: "Research projects affiliated with melikechan.",
      url: "/research",
    },
    twitter: {
      card: "summary",
      title: "Research | melikechan",
    },
  };
}

export default async function Projects() {
  return (
    <main className="flex flex-col min-h-screen items-center gap-6 mt-2 animate-fade-in">
      <TypographyH1>Research</TypographyH1>
      <TypographyParagraph className="text-center">
        Here is a list of featured research projects for which I am the author
        or co-author.
      </TypographyParagraph>

      <TypographyH2>Featured Work</TypographyH2>
      <TypographyMuted className="text-center">
        Unfortunately, there are still no research projects. 😔 Check back
        later.
      </TypographyMuted>
    </main>
  );
}
