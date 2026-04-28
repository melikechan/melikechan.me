"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { ThemeSwitcher } from "@melikechan/ui";
import { siteConfig } from "@/config/site";

const navLinkClass =
  "rounded-md px-2 py-1.5 text-base font-medium transition-colors hover:text-primary";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky inset-x-0 top-0 z-50 bg-background border-b">
      <div className="flex items-center justify-between h-16 px-4">
        <Link
          href={siteConfig.mainSiteUrl}
          aria-label="melikechan.me"
          rel="noopener noreferrer"
        >
          <Image
            src="/logo.svg"
            alt="melikechan-logo"
            width={48}
            height={48}
            priority
          />
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 font-medium">
            {siteConfig.navItems.map((item) => (
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
            ))}
          </div>
          <ThemeSwitcher />
          <button
            className="sm:hidden p-1.5 rounded-md hover:bg-accent"
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="material-symbols-outlined text-muted-foreground">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="sm:hidden border-t px-4 py-3 flex flex-col gap-1 bg-background">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:text-primary"
              onClick={() => setMobileOpen(false)}
              {...(item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
