import { Button } from "@melikechan/ui";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyLead,
  TypographyParagraph,
  TypographyMuted,
  TypographyBlockquote,
} from "@melikechan/ui/typography";
import {
  SectionDivider,
  TableOfContents,
  FigureWithCaption,
  ImageCarousel,
  BibtexBlock,
} from "@melikechan/paper-template";

const TOC_ITEMS = [
  { href: "#abstract", label: "Abstract" },
  { href: "#introduction", label: "Introduction" },
  { href: "#methodology", label: "Methodology" },
  { href: "#results", label: "Results" },
  { href: "#examples", label: "Examples" },
  { href: "#bibtex", label: "BibTeX" },
];

const BIBTEX = `@misc{turan2025vlmart,
  title   = {Summarization of Art Pieces Using Vision-Language Models},
  author  = {Turan, Mustafa Taner and Vurucu, Melike and Tuğrul, Bülent},
  year    = {2025},
  note    = {Ankara University, Computer Engineering Department}
}`;

export default function Page() {
  return (
    <article className="w-full max-w-4xl mx-auto px-4 py-10 animate-fade-in">
      <header className="flex flex-col items-center text-center gap-3 mb-10">
        <TypographyH1 className="text-3xl sm:text-4xl lg:text-5xl text-balance">
          Summarization of Art Pieces Using Vision-Language Models
        </TypographyH1>

        <TypographyLead>
          Ankara University Computer Engineering Graduation Project
        </TypographyLead>

        <TypographyParagraph className="mt-0">
          Mustafa Taner Turan<sup>1</sup>, Melike Vurucu<sup>1</sup>, Bülent
          Tuğrul<sup>2</sup>
        </TypographyParagraph>
        <TypographyMuted className="text-base -mt-2">
          <sup>1</sup>Ankara University, Computer Engineering Department (Students)
        </TypographyMuted>
        <TypographyMuted className="text-base -mt-2">
          <sup>2</sup>Ankara University, Computer Engineering Department (Advisor)
        </TypographyMuted>

        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <Button variant="default" size="lg" asChild>
            <a href="#playground" rel="noopener noreferrer">
              Playground
            </a>
          </Button>
          <Button variant="default" size="lg" asChild>
            <a
              href="#grad-project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
        </div>
      </header>

      <section className="mb-8">
        <FigureWithCaption
          alt="Example art piece with generated caption"
          caption=""
          variant="aside"
        >
          <div className="flex flex-col gap-3">
            <TypographyH3 className="text-base font-semibold text-primary mt-0">
              Our Caption
            </TypographyH3>
            <TypographyParagraph>[Will be added]</TypographyParagraph>
          </div>
        </FigureWithCaption>
      </section>

      <div className="flex justify-center mb-4">
        <TypographyBlockquote className="max-w-2xl text-center border-l-0 border-t-2 pt-4 pl-0 text-muted-foreground">
          &ldquo;[Teaser quote about the project — TBD]&rdquo;
        </TypographyBlockquote>
      </div>

      <SectionDivider variant="major" />

      <TableOfContents items={TOC_ITEMS} className="mb-4" />

      <SectionDivider variant="major" />

      <section id="introduction" className="scroll-mt-24">
        <TypographyH2>Introduction</TypographyH2>
        <TypographyParagraph className="mt-4">[Motivation]</TypographyParagraph>
        <TypographyParagraph>[Related Work]</TypographyParagraph>
      </section>

      <SectionDivider />

      <section id="methodology" className="scroll-mt-24">
        <TypographyH2>Methodology</TypographyH2>
        <TypographyParagraph className="mt-4">[TBD]</TypographyParagraph>
      </section>

      <SectionDivider />

      <section id="results" className="scroll-mt-24">
        <TypographyH2>Results</TypographyH2>
        <TypographyParagraph className="mt-4">[TBD]</TypographyParagraph>
      </section>

      <SectionDivider />

      <section id="examples" className="scroll-mt-24">
        <TypographyH2>Examples</TypographyH2>
        <TypographyParagraph className="mt-4">[TBD]</TypographyParagraph>
      </section>

      <SectionDivider />

      <section className="scroll-mt-24">
        <TypographyH2>Conclusion</TypographyH2>
        <TypographyParagraph className="mt-4">[TBD]</TypographyParagraph>
      </section>

      <SectionDivider variant="major" />

      <section id="bibtex" className="scroll-mt-24">
        <TypographyH2>BibTeX</TypographyH2>
        <BibtexBlock code={BIBTEX} className="mt-4" />
      </section>
    </article>
  );
}
