import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "./components/code-block";

type FigureProps = React.ComponentPropsWithoutRef<"figure"> & {
  "data-rehype-pretty-code-figure"?: string;
  "data-language"?: string;
};

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
    ...components,
  };
}
