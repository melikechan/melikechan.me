import { cn } from "@/lib/utils";

export function TypographyH1({ className, children, ...props }) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ className, children, ...props }) {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight mt-2",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ className, children, ...props }) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight mt-3",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({ className, children, ...props }) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight mt-4",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}
