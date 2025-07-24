import HeroSocialButton from "@/components/HeroSocialButton";
import ShootingStars from "@/components/ShootingStars"; // Import the new component
import person from "@/utils/person";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <ShootingStars />
      <section className="relative flex flex-col gap-4 overflow-hidden animate-fade-in items-center justify-center">
        <h1 className="text-4xl text-center font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-primary-alt">
          {person.nickname}
        </h1>
        <h2 className="text-2xl text-center font-semibold bg-clip-text text-transparent bg-linear-to-r from-primary to-primary-alt">
          {person.fullname}
        </h2>
        <p className="text-lg text-center">{person.title}</p>

        <div className="flex gap-4 flex-row">
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
