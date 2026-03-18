import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { normalizeDocumentationMarkdown } from "./documentation";

describe("normalizeDocumentationMarkdown", () => {
  test("removes top-level imports without changing fenced code blocks", () => {
    const markdown = [
      'import { Preview } from "@/components/preview";',
      "",
      "## Example",
      "",
      "```tsx",
      'import { KeepMe } from "@/components/keep-me";',
      "",
      "export function Example() {",
      "  return <KeepMe />;",
      "}",
      "```",
    ].join("\n");

    expect(normalizeDocumentationMarkdown(markdown)).toBe(
      [
        "## Example",
        "",
        "```tsx",
        'import { KeepMe } from "@/components/keep-me";',
        "",
        "export function Example() {",
        "  return <KeepMe />;",
        "}",
        "```",
      ].join("\n"),
    );
  });

  test("replaces InstallCommand with a static bun install command", () => {
    const markdown = [
      "### Installation",
      '<InstallCommand url="https://registry.rchoudhury.dev/r/use-media-query.json" />',
    ].join("\n");

    expect(normalizeDocumentationMarkdown(markdown)).toBe(
      [
        "### Installation",
        "```bash",
        "bunx --bun shadcn@latest add https://registry.rchoudhury.dev/r/use-media-query.json",
        "```",
      ].join("\n"),
    );
  });

  test("removes preview-only sections from submit-button docs", () => {
    const markdown = readFileSync(
      join(process.cwd(), "markdown", "submit-button.mdx"),
      "utf8",
    );
    const normalized = normalizeDocumentationMarkdown(markdown);

    expect(normalized).not.toContain("import { SubmitButtonPreview");
    expect(normalized).not.toContain("### Preview");
    expect(normalized).not.toContain("<SubmitButtonPreview />");
    expect(normalized).toContain("## SubmitButton");
    expect(normalized).toContain("### Usage");
    expect(normalized).toContain(
      'import { SubmitButton } from "@/components/ui/submit-button";',
    );
  });

  test("leaves plain markdown-only entries unchanged", () => {
    const markdown = [
      "## Plain Entry",
      "",
      "Simple documentation for an LLM.",
      "",
      "### Notes",
      "- No MDX",
      "- No JSX",
    ].join("\n");

    expect(normalizeDocumentationMarkdown(markdown)).toBe(markdown);
  });
});
