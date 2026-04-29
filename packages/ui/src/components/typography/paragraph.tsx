import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { cn } from "../../lib/utils";

export function TypographyParagraph({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-3", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function TypographyLead({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}

export function TypographyLarge({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-lg font-semibold tracking-wider", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function TypographySmall({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <small
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    >
      {children}
    </small>
  );
}

export function TypographyMuted({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
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
} as const;

type LinkVariant = keyof typeof linkClasses;

export function TypographyLink({
  className,
  variant = "primary",
  ...props
}: LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: LinkVariant }) {
  return (
    <Link
      className={cn(
        "underline font-medium underline-offset-4 transition-colors",
        linkClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
