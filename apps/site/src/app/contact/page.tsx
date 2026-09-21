import { TypographyH1, TypographyLead } from "@melikechan/ui/typography";
import person from "@/utils/person";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contact information of melikechan.",
  pathname: "/contact",
  noIndex: true,
});

export default function Contact() {
  return (
    <main className="flex flex-col min-h-screen items-center space-y-4 my-4 animate-fade-in">
      <TypographyH1 className="text-4xl font-bold">Contact</TypographyH1>
      <TypographyLead className="mt-2">You can contact me via:</TypographyLead>

      <section className="flex flex-col w-full max-w-md sm:max-w-lg mx-auto">
        <ul className="flex flex-col gap-4 sm:gap-6">
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
                  <span className="w-9 h-9 sm:w-10 sm:h-10 [&>svg]:w-9 [&>svg]:h-9 sm:[&>svg]:w-10 sm:[&>svg]:h-10">
                    {icon}
                  </span>
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
