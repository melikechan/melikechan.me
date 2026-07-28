"use client";

import Link from "next/link";
import Image from "next/image";

import { ThemeSwitcher, MobileMenu } from "@melikechan/ui";
import { siteConfig } from "@/config/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const navLinkClass =
  "rounded-md px-2 py-1.5 text-base font-medium transition-colors hover:text-primary";

export function Navbar() {
  return (
    <nav className="sticky inset-x-0 top-0 h-20 z-50 flex items-center justify-between px-4 py-4 bg-background border-b-2">
      <Link href={siteUrl} aria-label="melikechan.me" rel="noopener noreferrer">
        <Image
          src={`${siteUrl}/logo.svg`}
          alt="melikechan-logo"
          width={48}
          height={48}
          priority
          unoptimized
        />
      </Link>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center font-medium gap-2">
          {siteConfig.navItems.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={navLinkClass}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.label}
              </Link>
            ) : null,
          )}
          <ThemeSwitcher />
        </div>

        <div className="flex lg:hidden items-center gap-4">
          <ThemeSwitcher />
          <MobileMenu items={siteConfig.navItems} />
        </div>
      </div>
    </nav>
  );
}
