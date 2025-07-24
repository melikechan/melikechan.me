import person from "@/utils/person"; // Make sure this path is correct
import React from "react";

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
    <main className="flex flex-col min-h-screen items-center space-y-4 mx-8 my-4 animate-fade-in">
      <h1 className="text-4xl font-bold">Contact</h1>
      <p className="text-lg">You can contact me via:</p>

      <section className="flex flex-col">
        <ul className="flex flex-col gap-4">
          {Object.entries(person.links)
            .filter(([, link]) => link.contact === true)
            .map(([key, { href, icon, title }]) => (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-row gap-2 items-center"
                >
                  {React.cloneElement(icon, { className: "w-9 h-9" })}
                  <span className="hover:underline focus:underline active:underline">
                    {title}
                  </span>
                </a>
              </li>
            ))}
        </ul>
        <p className="text-sm mt-4">
          For my resume, please reach out to me via email or LinkedIn.
        </p>
      </section>
    </main>
  );
}
