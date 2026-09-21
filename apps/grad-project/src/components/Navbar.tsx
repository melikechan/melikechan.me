import Image from "next/image";

import { ThemeSwitcher } from "@melikechan/ui";
import { siteConfig } from "@/config/site";

export function Navbar() {
  return (
    <nav className="sticky inset-x-0 top-0 h-20 z-50 flex items-center justify-between px-4 py-4 bg-background border-b-2">
      <a href={siteConfig.siteUrl} aria-label="melikechan.me">
        <Image
          src={new URL("/logo.svg", siteConfig.siteUrl).toString()}
          alt="melikechan logo"
          width={48}
          height={48}
          unoptimized
        />
      </a>

      <ThemeSwitcher />
    </nav>
  );
}
