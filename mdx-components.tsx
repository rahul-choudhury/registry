import type { MDXComponents } from "mdx/types";
import type * as React from "react";
import { CopyDocumentationButton } from "@/components/copy-documentation-button";
import { CodeBlock } from "./components/code-block";
import { InstallCommand } from "./components/install-command";

type FigureProps = React.ComponentPropsWithoutRef<"figure"> & {
  "data-rehype-pretty-code-figure"?: string;
  "data-language"?: string;
};

export function createDocumentationComponents(
  documentationMarkdown?: string,
): MDXComponents {
  return {
    h2: ({ children }) => {
      if (!documentationMarkdown) {
        return <h2 className="mb-2 text-2xl font-semibold">{children}</h2>;
      }

      return (
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">{children}</h2>
          <CopyDocumentationButton markdown={documentationMarkdown} />
        </div>
      );
    },
    h3: ({ children }) => (
      <h3 className="text-lg font-medium mt-4 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-muted-foreground mb-4">{children}</p>
    ),
    figure: (props: FigureProps) => {
      // Check if this is a code block from rehype-pretty-code
      if ("data-rehype-pretty-code-figure" in props) {
        return <CodeBlock {...props} />;
      }
      return <figure {...props} />;
    },
    blockquote: ({ children }) => (
      <blockquote className="mt-4 text-xs [&>*]:m-0">{children}</blockquote>
    ),
    InstallCommand,
  };
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...createDocumentationComponents(),
    ...components,
  };
}
