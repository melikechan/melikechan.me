import { cn } from "@/lib/utils";

export function TypographyBlockquote({ className, children, ...props }) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    >
      {children}
    </blockquote>
  );
}
