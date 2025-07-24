import ProjectCard from "@/components/ProjectCard";

export async function generateMetadata() {
  return {
    title: "Projects",
    description: "Projects of melikechan.",

    openGraph: {
      title: "Projects",
      description: "Projects of melikechan.",
    },
  };
}

const projects = [
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
    title: "jubilee",
    description: "jubilee, judger of the ubilo.",
    href: "https://github.com/ubilo-platform/judger",
    progress: 85,
    tags: ["C++", "CMake"],
  },
  {
    title: "Super Secret Project 2",
    description: "TBA!",
    progress: 5,
    tags: ["JavaScript"],
  },
];

export default async function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center gap-6 mt-2 animate-fade-in">
      <h1 className="text-4xl font-bold">Projects</h1>

      <h2 className="text-2xl font-bold">Featured Projects</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 px-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </section>
    </main>
  );
}
