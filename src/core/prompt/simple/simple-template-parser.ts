import { basename, extname } from "node:path";
import type { TemplateDefinition } from "../template-definition.js";
import { parsePlaceholder } from "./placeholder-parser.js";
import { scanTemplatePlaceholders } from "../template-placeholder.js";

/**
 * Parses a Simple Mode markdown template into a canonical definition.
 */
export function parseSimpleTemplate(
  body: string,
  sourcePath: string,
): TemplateDefinition {
  const placeholders = scanTemplatePlaceholders(body);
  const questionsByKey = new Map(
    [] as Array<[string, TemplateDefinition["questions"][number]]>,
  );

  for (const placeholder of placeholders) {
    const parsed = parsePlaceholder(
      placeholder.raw.slice(2, placeholder.raw.length - 2),
    );
    if (parsed.kind === "question" && !questionsByKey.has(parsed.key)) {
      questionsByKey.set(parsed.key, parsed.question);
    }
  }

  return {
    body,
    id: templateIdFromPath(sourcePath),
    mode: "simple",
    placeholders,
    questions: [...questionsByKey.values()],
    sourcePath,
  };
}

function templateIdFromPath(sourcePath: string): string {
  const fileName = basename(sourcePath, extname(sourcePath));

  return fileName || "prompt";
}
