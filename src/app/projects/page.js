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

export default async function Home() {
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
      title: "degoogle (Turkish)",
      description: "Turkish translation of the degoogle project.",
      href: "https://github.com/ankaraunifreesoftware/degoogle-turkish",
      img: "https://repository-images.githubusercontent.com/191201679/10394d00-968c-11ea-8879-4f06b3e59af5",
      progress: 15,
    },
    {
      title: "Super Secret Project",
      description: "TBA!",
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

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Projects</h1>

      <h2 className="text-2xl text-center font-bold">Featured Projects</h2>
      <section className="flex flex-wrap items-center justify-center flex-col gap-2 xs:flex-row xs:gap-4 sm:gap-8 h-max">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </section>
    </>
  );
}
