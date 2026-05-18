import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@melikechan/ui/utils";
import { ImageLightbox } from "./ImageLightbox";

interface FigureWithCaptionProps {
  src?: string;
  alt: string;
  caption?: ReactNode;
  variant?: "default" | "aside";
  className?: string;
  containerClassName?: string; // Styles the image wrapper div
  children?: ReactNode;
  priority?: boolean;
  zoomable?: boolean;
}

export function FigureWithCaption({
  src,
  alt,
  caption,
  variant = "default",
  className,
  containerClassName,
  children,
  priority = false,
  zoomable = false,
}: FigureWithCaptionProps) {
  const sizes =
    variant === "aside"
      ? "(max-width: 768px) 100vw, 50vw"
      : "(min-width: 96rem) 72rem, (min-width: 80rem) 64rem, (min-width: 64rem) 56rem, 100vw";

  const backdropSizes =
    variant === "aside"
      ? "25vw"
      : "(min-width: 96rem) 36rem, (min-width: 80rem) 32rem, (min-width: 64rem) 28rem, 50vw";

  const visual =
    src && zoomable ? (
      <ImageLightbox
        src={src}
        alt={alt}
        sizes={sizes}
        backdropSizes={backdropSizes}
        priority={priority}
        containerClassName={containerClassName}
      />
    ) : (
      <div
        className={cn(
          "relative rounded-lg overflow-hidden mx-auto w-full",
          !src && "bg-muted",
          containerClassName ?? "aspect-video",
        )}
      >
        {src ? (
          <>
            {/* Blurred backdrop eliminates letterbox gaps for any aspect ratio mismatch */}
            <Image
              src={src}
              alt=""
              fill
              aria-hidden
              sizes={backdropSizes}
              priority={priority}
              className="object-cover scale-110 blur-2xl opacity-60 select-none"
            />
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-contain z-10"
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-primary to-primary-alt opacity-50"
          />
        )}
      </div>
    );

  const figcaption = caption && (
    <figcaption className="text-xs text-center text-muted-foreground">
      {caption}
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
