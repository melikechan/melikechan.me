"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";

export interface NavItem {
  href?: string;
  label: string;
  external?: boolean;
  subitems?: NavItem[];
}

const topLinkClass =
  "block w-full rounded-md px-3 py-2 text-base font-medium transition-colors hover:text-primary";
const subLinkClass =
  "block w-full rounded-md px-3 py-2 text-base font-medium transition-colors text-muted-foreground hover:bg-primary/20 hover:text-primary";

function NavItems({
  items,
  onClose,
  depth = 0,
}: {
  items: NavItem[];
  onClose: () => void;
  depth?: number;
}) {
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
          {...(item.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {item.label}
        </Link>
      );
    }
    return null;
  });
}

interface MobileMenuProps {
  items: NavItem[];
  title?: string;
}

export function MobileMenu({ items, title = "Navigate" }: MobileMenuProps) {
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
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <nav className="mt-4 flex flex-col gap-1">
          <NavItems items={items} onClose={() => setOpen(false)} />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
