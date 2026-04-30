"use client";

import { useMemo } from "react";
import katex from "katex";

interface LatexProps {
  latexString: string;
  displayMode?: boolean;
}

export const Latex = ({ latexString, displayMode = false }: LatexProps) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latexString, {
        throwOnError: false,
        displayMode,
      });
    } catch {
      return `<span class="text-red-500">LaTeX error</span>`;
    }
  }, [latexString, displayMode]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
