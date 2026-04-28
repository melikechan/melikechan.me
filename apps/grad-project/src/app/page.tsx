import { Button } from "@melikechan/ui";
import { TypographyBlockquote } from "@melikechan/ui";
import { TypographyH2 } from "@melikechan/ui";
import { TypographyParagraph } from "@melikechan/ui";
import { SectionDivider } from "@melikechan/paper-template";
import { TableOfContents } from "@melikechan/paper-template";
import { FigureWithCaption } from "@melikechan/paper-template";
import { ImageCarousel } from "@melikechan/paper-template";
import { BibtexBlock } from "@melikechan/paper-template";

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
  author  = {Turan, Mustafa Taner and Vurucu, Melike and Tu{\\u{g}}rul, B{\\"u}lent},
  year    = {2025},
  note    = {Ankara University, Computer Engineering Department}
}`;

export default function Page() {
  return (
    <article className="w-full max-w-4xl mx-auto px-4 py-10 animate-fade-in">
      <header className="flex flex-col items-center text-center gap-4 mb-10">
        <h1 className="scroll-m-20 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          Summarization of Art Pieces Using Vision-Language Models
        </h1>

        <p className="text-lg font-semibold text-muted-foreground">
          [Conference / Venue — TBD]
        </p>

        <p className="text-base text-muted-foreground">
          Mustafa Taner Turan, Melike Vurucu, Bülent Tuğrul
          <sup>1</sup>
        </p>
        <p className="text-sm text-muted-foreground -mt-2">
          <sup>1</sup>Ankara University, Computer Engineering Department
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <Button variant="default" size="sm" asChild>
            <a href="#playground" rel="noopener noreferrer">
              Playground
            </a>
          </Button>
          <Button variant="default" size="sm" asChild>
            <a
              href="https://github.com/melikechan/grad-project"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
          <Button variant="default" size="sm" asChild>
            <a href="#bibtex">
              <span className="material-symbols-outlined text-sm">
                description
              </span>
              Paper
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
            <h2 className="font-semibold text-base text-primary">
              Our Caption
            </h2>
            <p className="text-sm leading-7 text-foreground">
              This horizontal print shows several people and creatures in
              action. The scene is created entirely with black ink on
              tan-colored paper, and it has a dark shadowy atmosphere. At the
              center of the composition, one person riding a horse appears to be
              being attacked by two sea monsters. The rider&apos;s face is
              turned toward the left side of the image, but their mouth is wide
              open, and their eyes appear to be closed. A fish hangs from the
              right hand of the creature on the far side of them. To the left,
              another figure rides away from the attacking creatures, holding a
              horn-like object. Behind this figure, a woman stands facing away,
              her hair flowing over her shoulders.
            </p>
          </div>
        </FigureWithCaption>
      </section>

      <div className="flex justify-center mb-4">
        <TypographyBlockquote className="max-w-2xl text-center border-l-0 border-t-2 pt-4 pl-0 text-muted-foreground">
          &ldquo;[Key insight or teaser quote about the project — TBD]&rdquo;
        </TypographyBlockquote>
      </div>

      <SectionDivider variant="major" />

      <TableOfContents items={TOC_ITEMS} className="mb-4" />

      <SectionDivider variant="major" />

      <section id="abstract" className="scroll-mt-24">
        <TypographyH2>Abstract</TypographyH2>
        <TypographyParagraph className="mt-4">
          [Abstract — TBD. Describe the problem: accessibility of art for
          visually impaired people. Describe the approach: fine-tuning a
          Vision-Language Model (SmolVLM-256M-Instruct with LoRA) on NGA and
          Artpedia datasets. Describe the results: improvements over the base
          model on BLEU, ROUGE, BERTScore, and CLIPScore metrics.]
        </TypographyParagraph>
      </section>

      <SectionDivider />

      <section id="introduction" className="scroll-mt-24">
        <TypographyH2>Introduction</TypographyH2>
        <TypographyParagraph className="mt-4">
          [Introduction — TBD. Motivate the work: visually impaired individuals
          encounter barriers when accessing art. Existing alt-text on museum
          websites is sparse or absent. Automated, detailed, objective
          descriptions can bridge this gap. Outline contributions.]
        </TypographyParagraph>
        <TypographyParagraph>
          [Continue with related work and positioning in the literature.]
        </TypographyParagraph>
      </section>

      <SectionDivider />

      <section id="methodology" className="scroll-mt-24">
        <TypographyH2>Methodology</TypographyH2>
        <TypographyParagraph className="mt-4">
          [Methodology — TBD. Describe the full pipeline: dataset curation (NGA
          + Artpedia), preprocessing, model architecture
          (SmolVLM-256M-Instruct), LoRA fine-tuning configuration (r=16,
          alpha=32, 4-bit NF4 quantization), training setup (5 epochs, lr 2e-4 →
          5e-5 schedule, batch size 1 + gradient accumulation 8).]
        </TypographyParagraph>

        <FigureWithCaption
          alt="Methodology diagram"
          caption="Fig. 1 — Overview of the fine-tuning pipeline."
          variant="aside"
          className="mt-6"
        >
          <TypographyParagraph>
            [Describe the methodology figure. Explain the data flow from raw
            images through tokenization, model forward pass, LoRA adapter
            updates, and inference. Mention the Liger kernel optimization and
            gradient checkpointing used for memory efficiency.]
          </TypographyParagraph>
        </FigureWithCaption>
      </section>

      <SectionDivider />

      <section id="results" className="scroll-mt-24">
        <TypographyH2>Results</TypographyH2>
        <TypographyParagraph className="mt-4">
          [Results — TBD. Quantitative evaluation of the fine-tuned model vs.
          the base model. Report BLEU-4, ROUGE-L, CIDEr, METEOR, BERTScore
          (Longformer), and CLIPScore (Jina V2) on both the NGA and Artpedia
          test splits. Discuss which metrics showed the most improvement and any
          trade-offs observed.]
        </TypographyParagraph>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <FigureWithCaption
            alt="BLEU and ROUGE comparison chart"
            caption="Fig. 2 — BLEU-4 and ROUGE-L: base model vs. fine-tuned."
          />
          <FigureWithCaption
            alt="BERTScore and CLIPScore comparison chart"
            caption="Fig. 3 — BERTScore and CLIPScore: base model vs. fine-tuned."
          />
        </div>
      </section>

      <SectionDivider />

      <section id="examples" className="scroll-mt-24">
        <TypographyH2>Examples</TypographyH2>
        <TypographyParagraph className="mt-4">
          [Examples — TBD. Qualitative comparison of captions generated by the
          base model versus the fine-tuned model on held-out art pieces.
          Highlight improvements in detail, factual accuracy, and
          accessibility-oriented language.]
        </TypographyParagraph>
      </section>

      <SectionDivider />

      <section className="scroll-mt-24">
        <TypographyH2>Conclusion</TypographyH2>
        <TypographyParagraph className="mt-4">
          [Conclusion — TBD. Summarize contributions, limitations (model size,
          dataset coverage), and future directions (larger models, multilingual
          descriptions, user studies with visually impaired participants).]
        </TypographyParagraph>
      </section>

      <SectionDivider variant="major" />

      <section id="bibtex" className="scroll-mt-24">
        <TypographyH2>BibTeX</TypographyH2>
        <BibtexBlock code={BIBTEX} className="mt-4" />
      </section>
    </article>
  );
}
