import { cn } from "../../lib/utils";

export function TypographyHr({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn("flex items-center justify-center gap-4 my-8", className)}
      {...props}
    >
      <div className="h-0.5 w-1/3 bg-linear-to-r from-transparent to-primary/70" />
      <span
        aria-hidden
        className="material-symbols-outlined text-primary text-base"
      >
        star
      </span>
      <div className="h-0.5 w-1/3 bg-linear-to-l from-transparent to-primary/70" />
    </div>
  );
}
