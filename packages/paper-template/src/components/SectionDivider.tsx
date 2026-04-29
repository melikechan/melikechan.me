import { cn } from "@melikechan/ui";

interface SectionDividerProps {
  variant?: "minor" | "major";
  className?: string;
}

export function SectionDivider({
  variant = "minor",
  className,
}: SectionDividerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center py-4 text-border text-2xl font-bold select-none",
        className,
      )}
      aria-hidden="true"
    >
      {variant === "major" ? "─── §§ ───" : "─── § ───"}
    </div>
  );
}
