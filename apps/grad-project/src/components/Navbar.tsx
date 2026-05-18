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
    <nav className="sticky inset-x-0 top-0 z-50 bg-background border-b">
      <div className="flex items-center justify-between h-16 px-4">
        <Link
          href={siteUrl}
          aria-label="melikechan.me"
          rel="noopener noreferrer"
        >
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
          <div className="hidden sm:flex items-center gap-2 font-medium">
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
          </div>
          <ThemeSwitcher />
          <div className="sm:hidden">
            <MobileMenu items={siteConfig.navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
