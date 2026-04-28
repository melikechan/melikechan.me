"use client";

import { useState } from "react";
import { Button, Card, CardContent, cn } from "@melikechan/ui";

interface BibtexBlockProps {
  code: string;
  className?: string;
}

export function BibtexBlock({ code, className }: BibtexBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className={cn("relative", className)}>
      <CardContent className="pt-4">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 text-xs"
          onClick={handleCopy}
          aria-label="Copy BibTeX"
        >
          <span className="material-symbols-outlined text-sm">
            {copied ? "check" : "content_copy"}
          </span>
          {copied ? "Copied" : "Copy"}
        </Button>
        <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap break-all pr-20">
          {code}
        </pre>
      </CardContent>
    </Card>
  );
}
