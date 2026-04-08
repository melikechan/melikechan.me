"use client";

import Link from "next/link";
import Image from "next/image";

import { MobileMenu } from "@/components/MobileMenu";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { siteConfig } from "@/config/site";

const navLinkClass =
  "rounded-md px-2 py-1.5 text-base font-medium transition-colors hover:text-primary";

const itemClass = "focus:bg-primary/20 focus:text-primary";

function DropdownItems({ items }) {
  return items.map((item) => {
    if (item.subitems) {
      return (
        <DropdownMenuSub key={item.label}>
          <DropdownMenuSubTrigger className={itemClass}>
            {item.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownItems items={item.subitems} />
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      );
    }
    if (item.href) {
      return (
        <DropdownMenuItem key={item.href} className={itemClass} asChild>
          <Link href={item.href}>{item.label}</Link>
        </DropdownMenuItem>
      );
    }
    return null;
  });
}

export function Navbar() {
  return (
    <nav className="sticky inset-x-0 top-0 h-20 z-50 flex items-center justify-between px-4 py-4 bg-background border-b">
      <Link href="/" aria-label="Home">
        <Image
          src="/logo.svg"
          alt="melikechan-logo"
          width={48}
          height={48}
          priority
        />
      </Link>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center font-medium gap-2">
          {siteConfig.navItems.map((item) =>
            item.subitems ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger
                  className={`${navLinkClass} flex items-center gap-1 outline-none`}
                >
                  {item.label}
                  <span className="material-symbols-outlined text-[1em] leading-none">
                    expand_more
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownItems items={item.subitems} />
                </DropdownMenuContent>
              </DropdownMenu>
            ) : item.href ? (
              <Link key={item.href} href={item.href} className={navLinkClass}>
                {item.label}
              </Link>
            ) : null,
          )}
          <ThemeSwitcher />
        </div>

        <div className="flex lg:hidden items-center gap-4">
          <ThemeSwitcher />
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
