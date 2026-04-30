"use client";

import { useState } from "react";
import { Button, Card, CardAction, CardContent, CardHeader, cn } from "@melikechan/ui";

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
    <Card className={cn("border-2 border-border overflow-hidden py-0 gap-0", className)}>
      <CardHeader className="flex items-center justify-end px-4 py-1 border-b-2 border-border">
        <CardAction>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleCopy}
            aria-label="Copy BibTeX"
          >
            <span className="material-symbols-outlined text-base">
              {copied ? "check" : "content_copy"}
            </span>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="py-4">
        <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap break-all">
          {code}
        </pre>
      </CardContent>
    </Card>
  );
}
