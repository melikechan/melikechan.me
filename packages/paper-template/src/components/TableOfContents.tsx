import { cn } from "@melikechan/ui";

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
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-4 gap-y-1",
        className,
      )}
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-primary underline-offset-4 hover:underline transition-colors"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
