import { SiGithub, SiKaggle, SiGitlab } from "@icons-pack/react-simple-icons";
import Image from "next/image";

import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center space-y-4 mx-8 my-4 animate-fadeIn">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
        melikechan
      </h1>
      <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
        Melike Vurucu
      </h2>
      <p className="text-lg text-center">
        undergraduate researcher, computer engineering student @ ankara
        university
      </p>
      <div className="flex flex-col gap-4 xs:flex-row">
        <Button
          variant="gradient_x"
          href="https://www.linkedin.com/in/melikechan"
        >
          <Image
            className="h-6 w-6"
            src="icons/linkedin.svg"
            alt="linkedin-icon"
            width={24}
            height={24}
          />
        </Button>
        <Button variant="gradient_x" href="https://github.com/melikechan">
          <SiGithub size={24} />
        </Button>
        <Button variant="gradient_x" href="https://gitlab.com/melikechan">
          <SiGitlab size={24} />
        </Button>
        <Button variant="gradient_x" href="https://www.kaggle.com/melikechan">
          <SiKaggle size={24} />
        </Button>
      </div>
    </div>
  );
}
