import { cn } from "@melikechan/ui/utils";
import { TypographyH2, TypographyLink } from "@melikechan/ui/typography";

interface TocItem {
  href: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  return (
    <nav
      aria-label="Table of contents"
      className={cn("flex flex-col items-center gap-3", className)}
    >
      <TypographyH2>Table of Contents</TypographyH2>
      <ol className="flex flex-col gap-1">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-baseline gap-2">
            <span className="text-muted-foreground text-sm tabular-nums w-5 text-right shrink-0">
              {i + 1}.
            </span>
            <TypographyLink href={item.href}>{item.label}</TypographyLink>
          </li>
        ))}
      </ol>
    </nav>
  );
}
