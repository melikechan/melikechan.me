import { createPageMetadata } from "@/lib/metadata";
import {
  TypographyH1,
  TypographyH2,
  TypographyLead,
  TypographyMuted,
} from "@melikechan/ui/typography";

export const metadata = createPageMetadata({
  title: "Research",
  description: "Research projects affiliated with melikechan.",
  pathname: "/research",
  noIndex: true,
});

export default function Research() {
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
