import type { ResolvingMetadata, Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import {
  TypographyH1,
  TypographyH2,
  TypographyLink,
  TypographyLead,
} from "@melikechan/ui/typography";
export async function generateMetadata(
  _params: object,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetadata = await parent;
  return {
    title: "Projects",
    description: "Projects of melikechan.",
    alternates: {
      canonical: "/projects",
    },
    openGraph: {
      ...parentMetadata.openGraph,
      title: "Projects",
      description: "Projects of melikechan.",
      url: "/projects",
    },
    twitter: {
      ...parentMetadata.twitter,
      title: "Projects",
      description: "Projects of melikechan.",
    },
  };
}

interface Project {
  title: string;
  description: string;
  href?: string;
  img?: string;
  progress: number;
  tags?: string[];
}

const projects: Project[] = [
  {
    title: "jubilee",
    description: "jubilee, judger of the ubilo.",
    href: "https://github.com/ubilo-platform/judger",
    progress: 85,
    tags: ["C++", "CMake"],
  },
  {
    title: "Testcase Generator",
    description:
      "A testcase generator that takes JSON input and generates testcases.",
    href: "https://github.com/melikechan/object-to-tc",
    progress: 10,
    tags: ["Python", "JSON"],
  },
  {
    title: "debigtech",
    description:
      "Alternative products to get rid of big tech corporations (multilanguage, fork of degoogle).",
    href: "https://github.com/ankaraunifreesoftware/debigtech",
    img: "https://repository-images.githubusercontent.com/191201679/10394d00-968c-11ea-8879-4f06b3e59af5",
    progress: 15,
  },
  {
    title: "Super Secret Project 2",
    description: "TBA!",
    progress: 5,
    tags: ["JavaScript"],
  },
];

export default async function Projects() {
  return (
    <main className="flex flex-col min-h-screen items-center gap-6 mt-2 animate-fade-in">
      <TypographyH1>Projects</TypographyH1>
      <TypographyLead className="mt-2 text-center">
        Here is a list of featured software projects for which I am working (or
        worked) on.
        <br />
        You can find all of my projects on{" "}
        <TypographyLink
          href="https://github.com/melikechan"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </TypographyLink>
        .
      </TypographyLead>

      <TypographyH2>Featured Projects</TypographyH2>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 px-4">
        {projects.map((project, projectIndex) => (
          <ProjectCard key={projectIndex} {...project} />
        ))}
      </section>
    </main>
  );
}
