import Link from "next/link";
import Image from "next/image";

import { MobileMenu } from "@/components/MobileMenu"; // Assuming this is your NavBarSheet from earlier
import { ThemeSwitcher } from "@/components/ThemeSwitcher"; // Assuming this handles your theme toggle
import { siteConfig } from "@/config/site"; // Your site navigation configuration

export function Navbar() {
  return (
    <nav className="sticky inset-x-0 top-0 h-20 z-50 flex items-center justify-between px-4 py-4 bg-background shadow-sm">
      <div className="flex items-center gap-6">
        <Link href="/" aria-label="Home">
          <Image
            src="/logo.svg"
            alt="melikechan-logo"
            width={48}
            height={48}
            priority
          />
        </Link>
      </div>

      <div className="flex items-center align-center gap-4">
        <div className="hidden lg:flex items-center space-x-6">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-center font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden lg:block">
          <ThemeSwitcher />
        </div>
        <div className="flex items-center gap-4 lg:hidden">
          <ThemeSwitcher />
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
