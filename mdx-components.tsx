import type { MDXComponents } from "mdx/types";
import { CodeBlockWithCopy } from "./components/code-block-with-copy";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-medium mt-4 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-muted-foreground mb-4">{children}</p>
    ),
    pre: ({ children }) => <CodeBlockWithCopy>{children}</CodeBlockWithCopy>,
    blockquote: ({ children }) => (
      <blockquote className="mt-4 text-xs [&>*]:m-0">{children}</blockquote>
    ),
    ...components,
  };
}
