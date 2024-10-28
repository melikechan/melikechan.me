export async function generateMetadata() {
  return {
    title: "About | melikechan",
    description: "About melikechan.",
  };
}

export default function Home() {
  return (
    <main className="flex flex-col mx-8 my-4 min-h-screen space-y-4 animate-fadeIn">
      <h1 className="text-4xl font-bold">About</h1>
      <p className="text-lg">
        I am currently a <b>junior</b> in computer engineering at Ankara
        University.
      </p>
      <p className="text-lg">
        I am interested in AI and I would like to work as a research scientist
        in the future.
      </p>

      <section className="flex flex-col">
        <h2 className="text-2xl font-bold">Skills</h2>
        <ul className="flex flex-col flex-wrap gap-2 md:flex-row md:gap-4">
          <li>Python</li>
          <li>C++</li>
          <li>TensorFlow</li>
          <li>Keras</li>
          <li>CMake</li>
        </ul>
      </section>

      <section className="flex flex-col">
        <h2 className="text-2xl font-bold">Interested Areas</h2>
        <ul className="flex flex-col flex-wrap gap-2 md:flex-row md:gap-4">
          <li>Computer Vision*</li>
          <li>Machine Perception*</li>
          <li>Natural Language Processing*</li>
          <li>Deep Learning</li>
          <li>Quantum Computing*</li>
          <li>Systems Programming*</li>
        </ul>
        <p className="text-sm">(*) I am currently learning about that field.</p>
      </section>
    </main>
  );
}
