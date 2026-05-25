import type { TemplatePlaceholder } from "./template-definition.js";
import { parsePlaceholder } from "./simple/placeholder-parser.js";

const placeholderPattern = /{{([\s\S]*?)}}/g;

/**
 * Scans template body for placeholder occurrences and resolves their keys.
 */
export function scanTemplatePlaceholders(body: string): TemplatePlaceholder[] {
  const placeholders: TemplatePlaceholder[] = [];
  let match: RegExpExecArray | null;

  while ((match = placeholderPattern.exec(body)) !== null) {
    const raw = match[0];
    const parsed = parsePlaceholder(match[1]);

    placeholders.push({
      end: match.index + raw.length,
      key: parsed.key,
      raw,
      start: match.index,
    });
  }

  return placeholders;
}
