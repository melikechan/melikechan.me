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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import type { NavItem } from "@/config/site";

const topLinkClass =
  "block w-full rounded-md px-3 py-2 text-base font-medium transition-colors hover:text-primary";
const subLinkClass =
  "block w-full rounded-md px-3 py-2 text-base font-medium transition-colors text-muted-foreground hover:bg-primary/20 hover:text-primary";

interface NavItemsProps {
  items: NavItem[];
  onClose: () => void;
  depth?: number;
}

function NavItems({ items, onClose, depth = 0 }: NavItemsProps) {
  const linkClass = depth === 0 ? topLinkClass : subLinkClass;

  return items.map((item) => {
    if (item.subitems) {
      return (
        <Accordion
          key={item.label}
          type="single"
          collapsible
          className="w-full"
        >
          <AccordionItem value={item.label} className="border-0">
            <AccordionTrigger className="px-3 py-2 text-base font-medium hover:no-underline hover:text-primary rounded-md justify-between">
              {item.label}
            </AccordionTrigger>
            <AccordionContent className="pb-0 pl-4">
              <NavItems
                items={item.subitems}
                onClose={onClose}
                depth={depth + 1}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    }
    if (item.href) {
      return (
        <Link
          key={item.href}
          href={item.href}
          className={linkClass}
          onClick={onClose}
        >
          {item.label}
        </Link>
      );
    }
    return null;
  });
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger aria-label="Open navigation menu" asChild>
        <Button variant="ghost" className="text-center" size="sm">
          <span className="material-symbols-outlined text-muted-foreground">
            menu
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="border-0"
      >
        <SheetHeader className="flex items-center w-full">
          <SheetTitle>Navigate</SheetTitle>
        </SheetHeader>
        <nav className="mt-4 flex flex-col gap-1">
          <NavItems
            items={siteConfig.navItems}
            onClose={() => setOpen(false)}
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
