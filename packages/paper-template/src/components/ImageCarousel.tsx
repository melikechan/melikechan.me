"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, cn } from "@melikechan/ui";
import { TypographyMuted } from "@melikechan/ui/typography";

interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  className?: string;
}

export function ImageCarousel({ images, className }: ImageCarouselProps) {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  if (!images?.length) return null;

  const { src, alt, caption } = images[active];

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="relative">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
          <Image key={src} src={src} alt={alt} fill className="object-cover" />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background"
          onClick={prev}
          aria-label="Previous image"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background"
          onClick={next}
          aria-label="Next image"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </Button>
      </div>

      {caption && (
        <TypographyMuted className="text-xs text-center">{caption}</TypographyMuted>
      )}

      <div className="flex justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to image ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === active
                ? "w-4 bg-primary"
                : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70",
            )}
          />
        ))}
      </div>
    </div>
  );
}
