import ProjectCard from "@/components/ProjectCard";

export default async function Home() {
  const projects = [
    {
      title: "Quantum Testcase Generator",
      description: "A testcase generator using IBM Quantum Experience.",
      href: "https://github.com/melikechan/quantum-testcase-generator",
      progress: 10,
      tags: ["Python", "Qiskit", "IBM Quantum Experience"],
    },
    {
      title: "degoogle (Turkish)",
      description: "Turkish translation of the degoogle project.",
      href: "https://github.com/melikechan/degoogle-turkish",
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
    }
  ];

  return (
    <main className="flex flex-col mx-8 my-4 min-h-screen space-y-4 animate-fadeIn">
      <h1 className="text-4xl font-bold">Projects</h1>

      <h2 className="text-2xl text-center font-bold">Featured Projects</h2>
      <section className="flex flex-wrap items-center justify-center flex-col gap-2 xs:flex-row xs:gap-4 sm:gap-8 h-max">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </section>
    </main>
  );
}
