import { TypographyH1 } from "@/components/typography/headings";
import { TypographyLead } from "@/components/typography/paragraph";

import person from "@/utils/person";
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
      <TypographyH1 className="text-4xl font-bold">Contact</TypographyH1>
      <TypographyLead className="mt-2">You can contact me via:</TypographyLead>

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
      </section>
    </main>
  );
}
