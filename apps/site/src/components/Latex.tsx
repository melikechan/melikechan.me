"use client";

import { useRef, useEffect } from "react";
import katex from "katex";

interface LatexProps {
  latexString: string;
  displayMode?: boolean;
}

export const Latex = ({ latexString, displayMode = false }: LatexProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(latexString, ref.current, {
          throwOnError: false,
          displayMode,
        });
      } catch (error) {
        console.error("KaTeX rendering error:", error);
        if (ref.current) {
          ref.current.textContent = `Error: ${error instanceof Error ? error.message : "LaTeX is not working"}`;
          ref.current.className = "text-red-500";
        }
      }
    }
  }, [latexString, displayMode]);

  return <div ref={ref} />;
};
