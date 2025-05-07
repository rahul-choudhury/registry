"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlockWithCopy({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre className="bg-slate-100 dark:bg-slate-800 p-3 pr-10 rounded-md overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-slate-200 dark:bg-slate-700 p-1.5 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        aria-label="Copy to clipboard"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}
