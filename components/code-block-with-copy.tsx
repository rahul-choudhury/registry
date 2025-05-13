"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CodeBlockWithCopy({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const codeElement = document.querySelector(".relative pre code");
    if (codeElement) {
      navigator.clipboard.writeText(codeElement.textContent || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative">
      <pre className="bg-muted p-3 pr-10 rounded-md overflow-x-auto text-sm">
        {children}
      </pre>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="absolute top-1 right-2 cursor-pointer"
      >
        {copied ? <Check /> : <Copy />}
      </Button>
    </div>
  );
}
