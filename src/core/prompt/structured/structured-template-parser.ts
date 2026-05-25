import { basename, extname } from "node:path";
import { parse } from "yaml";
import type {
  PromptAnswerValue,
  PromptQuestion,
  PromptQuestionType,
} from "../prompt-question.js";
import type {
  TemplateDefinition,
  TemplateOutput,
} from "../template-definition.js";
import { scanTemplatePlaceholders } from "../template-placeholder.js";
import { splitFrontmatter } from "./frontmatter-splitter.js";

const supportedTypes = new Set<PromptQuestionType>([
  "text",
  "textarea",
  "select",
  "file",
  "text[]",
  "file[]",
  "select[]",
  "boolean",
  "number",
]);

type RawStructuredTemplate = {
  id?: unknown;
  output?: unknown;
  questions?: unknown;
  schema?: unknown;
};

/**
 * Parses a Structured Mode markdown template into a canonical definition.
 */
export function parseStructuredTemplate(
  content: string,
  sourcePath: string,
): TemplateDefinition {
  const parts = splitFrontmatter(content);
  const metadata = parse(parts.frontmatter) as RawStructuredTemplate | null;

  if (!metadata || typeof metadata !== "object") {
    throw new Error("Structured template frontmatter must be a YAML object.");
  }

  if (typeof metadata.schema === "string") {
    throw new Error(
      "Extended template mode is planned for Phase 2.3 and is not implemented yet.",
    );
  }

  const body = parts.body.replace(/^\r?\n/, "");

  return {
    body,
    id:
      typeof metadata.id === "string"
        ? metadata.id
        : templateIdFromPath(sourcePath),
    mode: "structured",
    output: parseOutput(metadata.output),
    placeholders: scanTemplatePlaceholders(body),
    questions: parseQuestions(metadata.questions),
    sourcePath,
  };
}

function parseQuestions(rawQuestions: unknown): PromptQuestion[] {
  if (!isRecord(rawQuestions)) {
    throw new Error("Structured template must define a questions object.");
  }

  return Object.entries(rawQuestions).map(([key, rawQuestion]) =>
    parseQuestion(key, rawQuestion),
  );
}

function parseQuestion(key: string, rawQuestion: unknown): PromptQuestion {
  if (!isRecord(rawQuestion)) {
    throw new Error(`Question '${key}' must be an object.`);
  }

  const label = rawQuestion.label;
  const type = rawQuestion.type ?? "text";

  if (typeof label !== "string" || label.trim().length === 0) {
    throw new Error(`Question '${key}' must define a label.`);
  }

  if (
    typeof type !== "string" ||
    !supportedTypes.has(type as PromptQuestionType)
  ) {
    throw new Error(`Question '${key}' has unsupported type.`);
  }

  return {
    defaultValue: parseDefaultValue(key, rawQuestion.default),
    key,
    label,
    options: parseOptions(key, rawQuestion.options),
    required: rawQuestion.required !== false,
    type: type as PromptQuestionType,
  };
}

function parseDefaultValue(
  key: string,
  value: unknown,
): PromptAnswerValue | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }

  throw new Error(`Question '${key}' has unsupported default value.`);
}

function parseOptions(key: string, value: unknown): string[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw new Error(`Question '${key}' options must be an array.`);
  }

  return value.map((item) => String(item));
}

function parseOutput(rawOutput: unknown): TemplateOutput | undefined {
  if (rawOutput === undefined) {
    return undefined;
  }

  if (!isRecord(rawOutput)) {
    throw new Error("Template output metadata must be an object.");
  }

  return {
    directory:
      typeof rawOutput.directory === "string" ? rawOutput.directory : undefined,
    filename:
      typeof rawOutput.filename === "string" ? rawOutput.filename : undefined,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function templateIdFromPath(sourcePath: string): string {
  const fileName = basename(sourcePath, extname(sourcePath));

  return fileName || "prompt";
}
