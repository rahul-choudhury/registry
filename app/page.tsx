"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { TailwindHelper } from "@/registry/components/tw-helper";

export default function Home() {
  const [metaPixelCopied, setMetaPixelCopied] = useState(false);
  const [twHelperCopied, setTwHelperCopied] = useState(false);
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        {/* Meta Pixel Component */}
        <section className="border rounded-lg p-6 space-y-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Meta Pixel</h2>
            <p className="text-muted-foreground">
              A component that encapsulates meta pixel logic for Facebook
              tracking.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Installation</h3>
            <div className="relative">
              <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md overflow-x-auto text-sm">
                <code>
                  npx shadcn@latest add
                  https://registry.rchoudhury.dev/r/meta-pixel.json
                </code>
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    "npx shadcn@latest add https://registry.rchoudhury.dev/r/meta-pixel.json",
                  );
                  setMetaPixelCopied(true);
                  setTimeout(() => setMetaPixelCopied(false), 2000);
                }}
                className="absolute top-2 right-2 bg-slate-200 dark:bg-slate-700 p-1.5 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                aria-label="Copy to clipboard"
              >
                {metaPixelCopied ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Usage Example</h3>
            <p className="text-sm text-muted-foreground">
              Non-visual component. Add to your layout or pages where tracking
              is needed.
            </p>
            <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
              <pre className="text-sm overflow-x-auto">
                <code>{`// In your layout.js or page component
import { MetaPixel } from "@/components/meta-pixel";

export default function Layout({ children }) {
  return (
    <>
      <MetaPixel />
      {children}
    </>
  );
}`}</code>
              </pre>
              <span className="text-xs text-muted-foreground block mt-2">
                Note: Set NEXT_PUBLIC_META_PIXEL_ID in your environment
                variables
              </span>
            </div>
          </div>
        </section>

        {/* Tailwind Helper Component */}
        <section className="border rounded-lg p-6 space-y-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Tailwind Helper</h2>
            <p className="text-muted-foreground">
              A utility component that displays the current breakpoint. Only
              visible in development.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Installation</h3>
            <div className="relative">
              <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md overflow-x-auto text-sm">
                <code>
                  npx shadcn@latest add
                  https://registry.rchoudhury.dev/r/tw-helper.json
                </code>
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    "npx shadcn@latest add https://registry.rchoudhury.dev/r/tw-helper.json",
                  );
                  setTwHelperCopied(true);
                  setTimeout(() => setTwHelperCopied(false), 2000);
                }}
                className="absolute top-2 right-2 bg-slate-200 dark:bg-slate-700 p-1.5 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                aria-label="Copy to clipboard"
              >
                {twHelperCopied ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Preview</h3>
            <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-900 relative h-32">
              <TailwindHelper />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-sm text-center text-muted-foreground">
                  Resize your browser to see different breakpoints
                  <br />
                  (Look for indicator in bottom left corner)
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Usage Example</h3>
            <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
              <pre className="text-sm overflow-x-auto">
                <code>{`// In your layout.js or root component
import { TailwindHelper } from "@/components/tw-helper";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <TailwindHelper />
    </>
  );
}`}</code>
              </pre>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
