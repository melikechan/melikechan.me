"use client";

import { useRef, useEffect } from "react";
import katex from "katex";

export const Latex = ({ latexString, displayMode = false }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(latexString, ref.current, {
          throwOnError: false,
          displayMode: displayMode, // For block equations, use true
        });
      } catch (error) {
        console.error("KaTeX rendering error:", error);
        if (ref.current) {
          ref.current.textContent = `Error: ${error?.message ?? "LaTeX is not working"}`;
          ref.current.className = "text-red-500";
        }
      }
    }
  }, [latexString, displayMode]);

  return <div ref={ref} />;
};
