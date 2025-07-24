"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="dropdown menu for linking the website"
        >
          <span className="material-symbols-outlined w-5 h-5 text-muted-foreground">
            menu
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <SheetHeader>
          <SheetTitle>Navigate</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full text-left"
              asChild
            >
              <Link href={item.href} onClick={handleLinkClick}>
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
