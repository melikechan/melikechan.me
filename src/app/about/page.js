export async function generateMetadata() {
  return {
    title: "About",
    description: "About melikechan.",

    openGraph: {
      title: "About",
      description: "About melikechan.",
    },
  };
}

export default function Home() {
  return (
    <div className="flex flex-col mx-8 my-4 text-center items-center min-h-screen space-y-6 animate-fadeIn">
      <h1 className="text-4xl font-bold">About</h1>
      <p className="text-lg">
        I am currently a <b>senior</b> in computer engineering at Ankara
        University. <br />
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
          <li>PyTorch</li>
          <li>CMake</li>
        </ul>
      </section>

      <section className="flex flex-col">
        <h2 className="text-2xl font-bold">Interested Areas</h2>
        <ul className="flex flex-col flex-wrap gap-2 md:flex-row md:gap-4">
          <li>Computer Vision*</li>
          <li>Machine Perception*</li>
          <li>Deep Learning*</li>
        </ul>
        <p className="text-sm">(*) I am currently learning about that field.</p>
      </section>
    </div>
  );
}
