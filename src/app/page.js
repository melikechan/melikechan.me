import HeroSocialButton from "@/components/HeroSocialButton";

import person from "@/utils/person";


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <section className="relative flex flex-col gap-4 overflow-hidden animate-fade-in items-center justify-center">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-primary-alt">
          {person.nickname}
        </h1>
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-linear-to-r from-primary to-primary-alt">
          {person.fullname}
        </h2>
        <p className="text-lg">{person.title}</p>

        <div className="flex flex-col gap-4 xs:flex-row">
          {Object.entries(person.links).filter(([, { featured }]) => featured === true).map(([key, { href, icon }]) => (
            <HeroSocialButton key={key} href={href}>
              {icon}
            </HeroSocialButton>
          ))}
        </div>
      </section>
    </main>
  );
}
