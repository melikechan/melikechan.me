import { SiTuta } from "@icons-pack/react-simple-icons";
import Image from "next/image";

export async function generateMetadata() {
  return {
    title: "Contact",
    description: "Contact information of melikechan.",

    openGraph: {
      title: "Contact",
      description: "Contact information of melikechan.",
    },

    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function Home() {
  return (
    <>
      <h1 className="text-4xl text-center font-bold">Contact</h1>
      <p className="text-lg text-center">You can contact me via:</p>

      <section className="flex flex-col">
        <ul className="flex flex-col gap-4">
          <li>
            <a
              href="https://www.linkedin.com/in/melikechan"
              target="_blank"
              rel="noreferrer"
              className="flex flex-row gap-2 items-center"
            >
              <Image
                className="h-6 w-6"
                src="icons/linkedin.svg"
                alt="linkedin-icon"
                width={24}
                height={24}
              />
              <span className="hover:underline focus:underline active:underline">
                LinkedIn
              </span>
            </a>
          </li>
          <li>
            <a
              href="mailto:melikechan@tuta.io"
              target="_blank"
              rel="noreferrer"
              className="flex flex-row gap-2 items-center"
            >
              <SiTuta size={24} />
              <span className="hover:underline focus:underline active:underline">
                melikechan[at]tuta.io
              </span>
            </a>
          </li>
        </ul>
        <p className="text-sm">
          For my resume, please reach out to me via email or LinkedIn.
        </p>
      </section>
    </>
  );
}
