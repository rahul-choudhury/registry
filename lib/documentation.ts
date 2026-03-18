import {
  buildInstallCommand,
  DEFAULT_PACKAGE_MANAGER,
} from "@/lib/install-command";

const HEADING_PATTERN = /^#{1,6}\s+/;
const IMPORT_PATTERN =
  /^\s*import(?:\s+[\w*\s{},]+\s+from)?\s+["'][^"']+["'];?\s*$/;
const INSTALL_COMMAND_PATTERN =
  /^\s*<InstallCommand\s+url=(["'])(.*?)\1\s*\/>\s*$/;
const JSX_ONLY_PATTERN = /^\s*(?:<\/?[A-Za-z][^>]*\/?>|<>|<\/>)\s*$/;

type MarkdownSegment = {
  content: string;
  type: "code" | "text";
};

export function normalizeDocumentationMarkdown(markdown: string) {
  return splitMarkdownSegments(markdown)
    .map((segment) =>
      segment.type === "code"
        ? segment.content
        : normalizeTextSegment(segment.content),
    )
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeTextSegment(segment: string) {
  const transformedLines = segment
    .split("\n")
    .flatMap((line) => transformLine(line));

  return removeStandaloneJsxLines(removePreviewSections(transformedLines))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}

function splitMarkdownSegments(markdown: string): MarkdownSegment[] {
  const segments: MarkdownSegment[] = [];
  const lines = markdown.split("\n");
  let currentType: MarkdownSegment["type"] = "text";
  let currentLines: string[] = [];

  for (const line of lines) {
    if (line.trimStart().startsWith("```")) {
      if (currentType === "code") {
        currentLines.push(line);
        segments.push({ content: currentLines.join("\n"), type: "code" });
        currentLines = [];
        currentType = "text";
        continue;
      }

      if (currentLines.length > 0) {
        segments.push({ content: currentLines.join("\n"), type: "text" });
      }

      currentLines = [line];
      currentType = "code";
      continue;
    }

    currentLines.push(line);
  }

  if (currentLines.length > 0) {
    segments.push({ content: currentLines.join("\n"), type: currentType });
  }

  return segments;
}

function transformLine(line: string) {
  if (IMPORT_PATTERN.test(line)) {
    return [];
  }

  const installCommandMatch = line.match(INSTALL_COMMAND_PATTERN);
  if (!installCommandMatch) {
    return [line];
  }

  const [, , url] = installCommandMatch;
  return ["```bash", buildInstallCommand(DEFAULT_PACKAGE_MANAGER, url), "```"];
}

function removePreviewSections(lines: string[]) {
  const nextLines: string[] = [];
  let index = 0;

  while (index < lines.length) {
    if (!isPreviewHeading(lines[index])) {
      nextLines.push(lines[index]);
      index += 1;
      continue;
    }

    const sectionEnd = findSectionEnd(lines, index + 1);
    const bodyLines = lines.slice(index + 1, sectionEnd).filter(isNonBlankLine);

    if (bodyLines.length === 1 && isStandaloneJsxLine(bodyLines[0])) {
      index = sectionEnd;
      continue;
    }

    nextLines.push(lines[index]);
    index += 1;
  }

  return nextLines;
}

function removeStandaloneJsxLines(lines: string[]) {
  return lines.filter((line) => !isStandaloneJsxLine(line));
}

function findSectionEnd(lines: string[], startIndex: number) {
  let index = startIndex;

  while (index < lines.length && !HEADING_PATTERN.test(lines[index])) {
    index += 1;
  }

  return index;
}

function isPreviewHeading(line: string) {
  return line.trim() === "### Preview";
}

function isStandaloneJsxLine(line: string) {
  return JSX_ONLY_PATTERN.test(line) && !INSTALL_COMMAND_PATTERN.test(line);
}

function isNonBlankLine(line: string) {
  return line.trim().length > 0;
}
