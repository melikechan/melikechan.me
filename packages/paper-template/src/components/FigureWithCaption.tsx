import Image from "next/image";
import { cn } from "@melikechan/ui";

interface FigureWithCaptionProps {
  src?: string;
  alt: string;
  caption?: string;
  variant?: "default" | "aside";
  className?: string;
  children?: React.ReactNode;
}

export function FigureWithCaption({
  src,
  alt,
  caption,
  variant = "default",
  className,
  children,
}: FigureWithCaptionProps) {
  const visualContent = (
    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-muted">
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-foreground opacity-50" />
      )}
    </div>
  );

  if (variant === "aside") {
    return (
      <div className={cn("grid md:grid-cols-2 gap-6 items-start", className)}>
        <figure className="flex flex-col gap-2">
          {visualContent}
          {caption && (
            <figcaption className="text-xs text-muted-foreground text-center">
              {caption}
            </figcaption>
          )}
        </figure>
        <div className="text-sm leading-7">{children}</div>
      </div>
    );
  }

  return (
    <figure className={cn("flex flex-col gap-2", className)}>
      {visualContent}
      {caption && (
        <figcaption className="text-xs text-muted-foreground text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}