"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  "data-language"?: string;
}

export function CodeBlock({
  children,
  "data-language": language,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const figureRef = React.useRef<HTMLElement>(null);

  const handleCopy = () => {
    if (!figureRef.current) return;

    const codeElement = figureRef.current.querySelector("pre code");
    if (!codeElement) return;

    navigator.clipboard.writeText(codeElement.textContent || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <figure ref={figureRef} className="group relative my-6" {...props}>
      {language && (
        <span className="absolute top-2 left-3 text-xs text-muted-foreground font-mono">
          {language}
        </span>
      )}
      {children}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </figure>
  );
}
