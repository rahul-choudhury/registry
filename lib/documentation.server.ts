import { readFileSync } from "node:fs";
import { join } from "node:path";
import { normalizeDocumentationMarkdown } from "@/lib/documentation";

export function getDocumentationMarkdown(name: string) {
  const filePath = join(process.cwd(), "markdown", `${name}.mdx`);
  return normalizeDocumentationMarkdown(readFileSync(filePath, "utf8"));
}
