/**
 * Markdown document split into YAML frontmatter and body.
 */
export type FrontmatterParts = {
  body: string;
  frontmatter: string;
};

/**
 * Splits a markdown document with YAML frontmatter.
 */
export function splitFrontmatter(content: string): FrontmatterParts {
  const normalizedContent = content.replace(/^\uFEFF/, "");

  if (
    !normalizedContent.startsWith("---\n") &&
    !normalizedContent.startsWith("---\r\n")
  ) {
    throw new Error("Template does not start with YAML frontmatter.");
  }

  const newline = normalizedContent.startsWith("---\r\n") ? "\r\n" : "\n";
  const closingMarker = `${newline}---${newline}`;
  const closingIndex = normalizedContent.indexOf(closingMarker, 3);

  if (closingIndex === -1) {
    throw new Error("Template frontmatter is missing a closing marker.");
  }

  return {
    body: normalizedContent.slice(closingIndex + closingMarker.length),
    frontmatter: normalizedContent.slice(3 + newline.length, closingIndex),
  };
}
