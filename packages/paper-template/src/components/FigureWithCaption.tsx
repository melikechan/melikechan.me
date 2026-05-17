import Image from "next/image";
import { cn } from "@melikechan/ui/utils";
import { TypographyMuted } from "@melikechan/ui/typography";

interface FigureWithCaptionProps {
  src?: string;
  alt: string;
  caption?: string;
  variant?: "default" | "aside";
  className?: string;
  children?: React.ReactNode;
  figureWidth?: string;
  figureHeight?: string;
  aspectRatio?: string;
  priority?: boolean;
}

export function FigureWithCaption({
  src,
  alt,
  caption,
  variant = "default",
  className,
  children,
  figureWidth = "100%",
  figureHeight,
  aspectRatio = "16/9",
  priority = false,
}: FigureWithCaptionProps) {
  const sizes =
    variant === "aside" ? "(max-width: 768px) 100vw, 50vw" : "100vw";

  const visual = (
    <div
      className={cn("relative rounded-lg overflow-hidden", !src && "bg-muted")}
      style={{
        width: figureWidth,
        height: figureHeight,
        aspectRatio: figureHeight ? undefined : aspectRatio,
        margin: "0 auto",
      }}
    >
      {src ? (
        <>
          {/* Blurred backdrop eliminates letterbox gaps for any aspect ratio mismatch */}
          <Image
            src={src}
            alt=""
            fill
            aria-hidden
            sizes="30vw"
            className="object-cover scale-110 blur-2xl opacity-60 select-none"
          />
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-contain relative z-10"
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-alt opacity-50" />
      )}
    </div>
  );

  const figcaption = caption && (
    <figcaption>
      <TypographyMuted className="text-xs text-center">
        {caption}
      </TypographyMuted>
    </figcaption>
  );

  if (variant === "aside") {
    return (
      <div className={cn("grid md:grid-cols-2 gap-6 items-start", className)}>
        <figure className="flex flex-col gap-1">
          {visual}
          {figcaption}
        </figure>
        <div className="text-sm leading-7">{children}</div>
      </div>
    );
  }

  return (
    <figure className={cn("flex flex-col gap-1", className)}>
      {visual}
      {figcaption}
    </figure>
  );
}
