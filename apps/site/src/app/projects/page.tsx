import ProjectCard from "@/components/ProjectCard";
import { createPageMetadata } from "@/lib/metadata";
import {
  TypographyH1,
  TypographyH2,
  TypographyLink,
  TypographyLead,
} from "@melikechan/ui/typography";

export const metadata = createPageMetadata({
  title: "Projects",
  description: "Projects of melikechan.",
  pathname: "/projects",
});

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
    title: "Secret Mini Project",
    description: "TBA!",
    progress: 5,
    tags: ["Python"],
  },
];

export default function Projects() {
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
      <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 w-full px-4">
        {projects.map((project, projectIndex) => (
          <ProjectCard key={projectIndex} {...project} />
        ))}
      </section>
    </main>
  );
}
