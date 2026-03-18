"use client";

import { Check, Copy } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";

interface CopyDocumentationButtonProps {
  markdown: string;
}

export function CopyDocumentationButton({
  markdown,
}: CopyDocumentationButtonProps) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) {
      return;
    }

    const timeoutId = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleCopy}
      aria-label="Copy documentation"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      Copy Documentation
    </Button>
  );
}
