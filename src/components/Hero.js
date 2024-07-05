import { SiLinkedin, SiGithub, SiKaggle, SiGitlab } from "@icons-pack/react-simple-icons";
import Button
  from "./Button";
export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-melikechan-gold to-melikechan-pink dark:from-melikechan-purple dark:to-melikechan-blue">
        melikechan
      </h1>
      <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-melikechan-gold to-melikechan-pink dark:from-melikechan-purple dark:to-melikechan-blue">
        Melike Vurucu
      </h2>
      <p className="text-lg text-center">
        undergraduate researcher, computer engineering student @ ankara university
      </p>
      <div className="flex flex-col gap-4 xs:flex-row">
        <Button href="https://www.linkedin.com/in/melikechan">
          <SiLinkedin size={24} />
        </Button>
        <Button href="https://github.com/melikechan">
          <SiGithub size={24} />
        </Button>
        <Button href="https://gitlab.com/melikechan">
          <SiGitlab size={24} />
        </Button>
        <Button href="https://www.kaggle.com/melikechan">
          <SiKaggle size={24} />
        </Button>
      </div>

    </section>
  );
}
