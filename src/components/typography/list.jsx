import { cn } from "@/lib/utils";

export function TypographyUnorderedList({ className, children, ...props }) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
      {children}
    </ul>
  );
}

export function TypographyOrderedList({ className, children, ...props }) {
  return (
    <ol
      className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)}
      {...props}
    >
      {children}
    </ol>
  );
}
