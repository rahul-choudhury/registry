"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Check, Copy } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  buildInstallCommand,
  DEFAULT_PACKAGE_MANAGER,
  isPackageManager,
  PACKAGE_MANAGERS,
  type PackageManager,
  readPackageManagerPreference,
  writePackageManagerPreference,
} from "@/lib/install-command";

interface InstallCommandProps {
  url: string;
}

export function InstallCommand({ url }: InstallCommandProps) {
  const [packageManager, setPackageManager] = React.useState<PackageManager>(
    DEFAULT_PACKAGE_MANAGER,
  );
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    setPackageManager(readPackageManagerPreference(window.localStorage));
  }, []);

  React.useEffect(() => {
    if (!copied) {
      return;
    }

    const timeoutId = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  const command = buildInstallCommand(packageManager, url);
  const [binary, ...rest] = command.split(" ");
  const remainingCommand = rest.join(" ");

  const handleValueChange = (value: string) => {
    if (!isPackageManager(value)) {
      return;
    }

    const nextPackageManager = value;
    setPackageManager(nextPackageManager);
    writePackageManagerPreference(window.localStorage, nextPackageManager);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <figure className="my-6 overflow-hidden rounded-lg border bg-muted/20 shadow-xs">
      <TabsPrimitive.Root
        value={packageManager}
        onValueChange={handleValueChange}
      >
        <div className="flex items-center border-b px-3 sm:px-4">
          <TabsPrimitive.List className="flex min-w-0 flex-1 gap-4 overflow-x-auto sm:gap-5">
            {PACKAGE_MANAGERS.map((manager) => (
              <TabsPrimitive.Trigger
                key={manager}
                value={manager}
                className="border-b-2 border-transparent px-0 py-2.5 text-sm font-medium lowercase text-muted-foreground transition-colors data-[state=active]:border-foreground data-[state=active]:text-foreground"
              >
                {manager}
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy install command"}
            className="shrink-0 text-muted-foreground"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="px-3 py-3.5 sm:px-4 sm:py-4">
          <pre className="m-0 overflow-x-auto bg-transparent p-0 text-sm leading-6 scrollbar-none">
            <code className="font-mono">
              <span className="text-violet-600 dark:text-violet-400">
                {binary}
              </span>
              {remainingCommand ? (
                <span className="text-sky-950 dark:text-sky-100">
                  {" "}
                  {remainingCommand}
                </span>
              ) : null}
            </code>
          </pre>
        </div>
      </TabsPrimitive.Root>
    </figure>
  );
}
