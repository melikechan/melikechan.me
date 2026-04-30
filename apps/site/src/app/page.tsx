import type { ResolvingMetadata, Metadata } from "next";
import HeroSocialButton from "@/components/HeroSocialButton";
import ShootingStars from "@/components/ShootingStars";
import person from "@/utils/person";

export async function generateMetadata(
  _params: object,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetadata = await parent;
  return {
    title: {
      absolute: "melikechan",
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      ...parentMetadata.openGraph,
      title: "melikechan",
    },
    twitter: {
      ...parentMetadata.twitter,
      title: "melikechan",
    },
  };
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <ShootingStars />
      <section className="relative flex flex-col gap-4 overflow-hidden animate-fade-in items-center justify-center">
        <h1 className="text-4xl text-center font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-primary-alt">
          {person.nickname}
        </h1>
        <h2 className="text-2xl sm:text-3xl text-center font-semibold bg-clip-text text-transparent bg-linear-to-r from-primary to-primary-alt">
          {person.fullname}
        </h2>
        <p className="text-base sm:text-lg text-center">{person.title}</p>

        <div className="flex gap-4 sm:gap-6 flex-row">
          {Object.entries(person.links)
            .filter(([, { featured }]) => featured === true)
            .map(([key, { href, icon }]) => (
              <HeroSocialButton key={key} href={href}>
                {icon}
              </HeroSocialButton>
            ))}
        </div>
      </section>
    </main>
  );
}
