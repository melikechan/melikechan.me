import Link from "next/link";
import { cn } from "@/lib/utils";

export function TypographyParagraph({ className, children, ...props }) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-3", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function TypographyLead({ className, children, ...props }) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}

export function TypographyLarge({ className, children, ...props }) {
  return (
    <div
      className={cn("text-lg font-semibold tracking-wider", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function TypographySmall({ className, children, ...props }) {
  return (
    <small
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    >
      {children}
    </small>
  );
}

export function TypographyMuted({ className, children, ...props }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}

const linkClasses = {
  default: "text-foreground hover:text-foreground/80",
  primary: "text-primary hover:text-primary/80",
  muted: "text-muted-foreground hover:text-muted-foreground/80",
};

export function TypographyLink({ className, variant = "primary", ...props }) {
  return (
    <Link
      className={cn(
        "underline font-medium underline-offset-4 transition-colors",
        linkClasses[variant],
        className
      )}
      {...props}
    />
  );
}
