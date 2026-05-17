import { Button, TypographyUnorderedList } from "@melikechan/ui";
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
  SimpleTable,
} from "@melikechan/paper-template";
import { SiHuggingface } from "@icons-pack/react-simple-icons";
import { modelArchitectures, metrics, rows } from "./data";
import { EvaluationTable } from "@/components/EvaluationTable";

const TOC_ITEMS = [
  { href: "#introduction", label: "Introduction" },
  { href: "#methodology", label: "Methodology" },
  { href: "#results", label: "Results" },
  { href: "#conclusion", label: "Conclusion" },
];

export default function Page() {
  return (
    <article className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto py-10 animate-fade-in">
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
          <sup>1</sup>Ankara University, Computer Engineering Department
          (Students)
        </TypographyMuted>
        <TypographyMuted className="text-base -mt-2">
          <sup>2</sup>Ankara University, Computer Engineering Department
          (Advisor)
        </TypographyMuted>

        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <Button variant="default" size="lg" asChild>
            <a href="#playground" rel="noopener noreferrer">
              <SiHuggingface />
              Playground
            </a>
          </Button>
        </div>
      </header>

      <section className="mb-8">
        <FigureWithCaption
          src="/research/grad-project/images/example-img.jpg"
          alt="Example art piece with generated caption"
          caption="The Crucifixion with the Virgin, Saint John, Saint Jerome, and Saint Mary Magdalene [left panel] by Pietro Perugino (c. 1482/1485)"
          variant="aside"
          figureHeight="80vh"
        >
          <div className="flex flex-col gap-3">
            <TypographyH3 className="text-base font-semibold text-primary mt-0">
              Our Caption
            </TypographyH3>
            <TypographyParagraph>
              A balding man with pale skin stands in front of a rocky cave
              opening under a clear blue sky in this tall, narrow painting. The
              man’s body faces us but he turns his head to look off to our right
              in profile. His gray hair is cut short and he has high cheekbones,
              a prominent nose, sunken eyes, hollow cheeks, and his lips are
              parted. A black cloth drapes over one shoulder and across his
              hips. He holds his left hand, to our left, up by that breast and
              leans heavily on a wooden staff planted in the ground with his
              other hand. Plants grow along the bottom edge of the panel and
              beyond the man. A lion lies on the dirt path behind him, looking
              at him. More trees grow against the tall, craggy rocks above the
              cave.
            </TypographyParagraph>
            <TypographyH3 className="text-base font-semibold text-primary mt-0">
              Ground Truth
            </TypographyH3>
            <TypographyParagraph>
              A man stands, leaning on a staff used like a crutch, in a deep,
              rocky landscape in this round-topped vertical painting. The
              cleanshaven man has tanned skin and sparse gray hair. He is nude
              aside from a slate-gray cloth that wraps around his hips. The hand
              not bracing the crutch is held in a loose fist at his chest. A few
              plants grow and bloom along the bottom of the panel. The dirt path
              on which the man stands winds through low, grass-covered mounds to
              a cave opening at the base of a tall, steep cliff face. A lion
              stands on the path between the man and the cave. An owl perches in
              the bare, spike-like branches of a spindly tree growing to our
              right of the man.
            </TypographyParagraph>
          </div>
        </FigureWithCaption>
      </section>

      <div className="flex justify-center mb-4">
        <TypographyBlockquote className="max-w-2xl text-center border-l-0 border-t-2 pt-4 pl-0 text-muted-foreground">
          &ldquo;A comparative study evaluating the ability of small (&lt;10B
          Parameters) Vision-Language Models (VLMs) to generate objective art
          descriptions when fine-tuned under data scarcity.&rdquo;
        </TypographyBlockquote>
      </div>

      <SectionDivider variant="major" />

      <TableOfContents items={TOC_ITEMS} className="mb-4" />

      <SectionDivider variant="major" />

      <section id="introduction" className="scroll-mt-24">
        <TypographyH2>Introduction</TypographyH2>

        <TypographyParagraph className="mt-4">
          Detailed visual descriptions of artworks are{" "}
          <strong>essential</strong> for visually impaired museum visitors.
          However, generating them is a manual, labor-intensive process that
          requires specialized art history knowledge, fundamentally{" "}
          <strong>limiting accessibility</strong> at scale.
        </TypographyParagraph>

        <TypographyParagraph>
          This challenge can be framed as a specialized, long-form image
          captioning problem. Relying on general-purpose Large Language Models
          (LLMs) for this task{" "}
          <strong>is suboptimal and leads to high operational costs.</strong> In
          contrast, lightweight Vision-Language Models (VLMs) are highly suited
          for this; when fine-tuned effectively, they enable cost-efficient
          local deployment and significantly reduce deployment costs.
        </TypographyParagraph>

        <TypographyParagraph>
          In this study, we fine-tune various small VLMs to generate purely
          visual, objective art descriptions. We present a{" "}
          <strong>comparative analysis</strong> evaluating their task-specific
          performance, hallucination resistance, and overall capabilities.
        </TypographyParagraph>
      </section>

      <SectionDivider />

      <section id="methodology" className="scroll-mt-24">
        <TypographyH2>Methodology</TypographyH2>

        <div className="mt-4">
          <TypographyH3>Used Datasets</TypographyH3>
          <TypographyUnorderedList>
            <li>
              <a
                href="https://www.nga.gov/artworks/free-images-and-open-access"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold underline underline-offset-2 hover:text-primary-alt transition-colors"
              >
                NGA Open Data:
              </a>{" "}
              Our primary dataset, consisting of 2,553 images paired with
              descriptions that adhere to{" "}
              <a
                href="https://www.nga.gov/visit/accessibility/collection-image-descriptions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-primary-alt transition-colors"
              >
                NGA's accessibility guidelines.
              </a>
              <TypographyMuted className="mt-1 block">
                (~10% reserved for testing, the remainder for training)
              </TypographyMuted>
              <FigureWithCaption
                src="/research/grad-project/images/nga-gt-word-count.jpeg"
                alt="Word counts on NGA Open Data train and test set"
                caption="Fig 1. Word count distribution of NGA Open Data dataset's train and test splits."
                aspectRatio="11/4"
                figureWidth="85%"
                className="mt-4"
              />
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2406.10328"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold underline underline-offset-2 hover:text-primary-alt transition-colors"
              >
                PixelProse:
              </a>{" "}
              Synthetic dense-captioning dataset.
              <TypographyMuted className="mt-1 block">
                (Subsets of 5K–20K samples were used for intermediate task
                fine-tuning (IFT) to evaluate its impact on performance.)
              </TypographyMuted>
            </li>
          </TypographyUnorderedList>
        </div>
        <div className="mt-4">
          <TypographyH3>Training Framework</TypographyH3>
          <TypographyUnorderedList>
            <li>
              <strong>Quantization:</strong> 4-bit quantized base models are
              used.
            </li>
            <li>
              <strong>QLoRA (Low-Rank Adaptation):</strong> Injected trainable
              rank decomposition matrices exclusively into the{" "}
              <em>attention</em>, <em>multilayer perceptron (MLP)</em> layers of
              the language backbone, and the <em>cross-modal connector.</em>
            </li>
            <li>
              <strong>Vision encoders were kept completely frozen.</strong>
            </li>
          </TypographyUnorderedList>
        </div>
        <div className="mt-4">
          <TypographyH3>Selected Models</TypographyH3>

          <TypographyParagraph>
            The following models were used for ablation studies:
          </TypographyParagraph>
          <TypographyUnorderedList>
            <li>
              <a
                href="https://huggingface.co/blog/smolvlm2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold underline underline-offset-2 hover:text-primary-alt transition-colors"
              >
                SmolVLM2 Video Instruct
              </a>{" "}
              (256M and 500M): Selected for their extremely low parameter counts
              and efficiency.
            </li>
            <li>
              <a
                href="https://qwen.ai/blog?id=qwen3.5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold underline underline-offset-2 hover:text-primary-alt transition-colors"
              >
                Qwen 3.5
              </a>{" "}
              (4B and 9B): Selected for leading performance on MMStar,
              HallucinationBench, and RealWorldQA. <br />
              Initial hyperparameter tuning and dataset ablation studies were
              conducted on this model.
            </li>
            <li>
              <a
                href="https://qwen.ai/blog?id=qwen3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold underline underline-offset-2 hover:text-primary-alt transition-colors"
              >
                Qwen 3
              </a>{" "}
              (2B and 8B): Included to evaluate generational architectural
              differences.
            </li>
          </TypographyUnorderedList>
        </div>
        <div className="mt-4">
          <TypographyH3>Ablation Studies and Findings</TypographyH3>

          <TypographyParagraph>
            <TypographyUnorderedList>
              <li>
                IFT on PixelProse yielded no performance gains on the NGA
                evaluation set.
              </li>
              <li>
                Using multiple similar prompts during training degraded the
                results.
              </li>
            </TypographyUnorderedList>
            Consequently, all final models were trained using a standardized
            configuration{" "}
            <strong>
              exclusively on the NGA dataset using a single prompt.
            </strong>
          </TypographyParagraph>
        </div>
        <div className="mt-4">
          <TypographyH3>Evaluation Strategy</TypographyH3>

          <TypographyParagraph>
            We scored model outputs on a 1–5 scale across four axes using an{" "}
            <strong>LLM-as-a-Judge framework</strong> (Claude Sonnet):
            <TypographyUnorderedList>
              <li>
                <strong>Coverage:</strong> Proportion of ground-truth entities
                accurately captured.
              </li>
              <li>
                <strong>Correctness:</strong> Factual accuracy of the described
                entity attributes.
              </li>
              <li>
                <strong>Hallucination:</strong> Avoidance of fabricated or
                ungrounded visual elements.
              </li>
              <li>
                <strong>Tone:</strong> Strict adherence to NGA’s image
                description guidelines.
              </li>
            </TypographyUnorderedList>
          </TypographyParagraph>
        </div>
      </section>

      <SectionDivider />

      <section id="results" className="scroll-mt-24">
        <TypographyH2>Results</TypographyH2>

        <SimpleTable
          caption={
            <>
              <strong>Table 1. </strong> Trained model architectures and
              parameter distribution.
            </>
          }
          columns={[
            { label: "Model Name", align: "left" },
            { label: "Total Params (M)", align: "right" },
            { label: "LoRA Params (K)", align: "right" },
            { label: "Trainable (%)", align: "right" },
          ]}
          rows={modelArchitectures}
        />

        <EvaluationTable
          caption={
            <>
              <strong>Table 2. </strong> LLM-as-a-Judge evaluation scores
              (1&ndash;5) and fine-tuning deltas
              (&Delta;&nbsp;=&nbsp;fine-tuned&nbsp;&minus;&nbsp;base) per axis.
              &#8593;/&#8595; denote the column-best and column-worst values per
              group, respectively.
            </>
          }
          groups={["Base Performance", "Fine-Tuned Performance", "Δ"]}
          metrics={metrics}
          rows={rows}
          footnote="Cov: Coverage, Cor: Correctness, Hal: Hallucination, Ovr: Overall."
        />

        <FigureWithCaption
          src="/research/grad-project/images/delta-heatmap.jpeg"
          alt="Δ heatmap showing per-model, per-axis fine-tuning deltas; green cells indicate improvement, red cells indicate regression"
          caption="Δ heatmap (green = improvement, red = regression)"
          figureWidth="60%"
        />

        <TypographyParagraph className="mt-4">
          Fine-tuning gains are inversely proportional to base capacity:
          SmolVLM2 improved by up to +0.61 overall, while Qwen3-VL-8B gained
          only +0.05, regressing in Coverage and Correctness. Crucially,
          post-fine-tuning rankings are preserved — a rescaling, not a
          reordering.{" "}
          <strong>Tone improved universally across all models</strong> (∆
          +0.90–1.60), while Hallucination proved the most resistant axis.
        </TypographyParagraph>
      </section>

      <SectionDivider />

      <section className="scroll-mt-24">
        <TypographyH2>Conclusion</TypographyH2>
        <TypographyUnorderedList className="mt-4">
          <li>
            <strong>
              Small datasets align tone but cannot teach factual grounding
            </strong>{" "}
            to small VLMs.
          </li>
          <li>
            <strong>LoRA cannot bridge a capacity gap</strong> that pre-training
            left unfilled.
          </li>
          <li>
            <strong>
              Synthetic intermediate fine-tuning and multi-prompt training
              degraded performance
            </strong>{" "}
            in low-data regimes rather than reducing hallucinations.
          </li>
          <li>
            LoRA layer count showed no correlation with performance; targeting
            specific layers actively destabilized models.
          </li>
          <li>
            <strong>LLM-as-a-Judge is scalable but noisy</strong> — automated
            scores require cautious interpretation.
          </li>
        </TypographyUnorderedList>
      </section>
    </article>
  );
}
