import type { PromptQuestion, PromptQuestionType } from "../prompt-question.js";
import { slugifyPlaceholderKey } from "./placeholder-key.js";

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

/**
 * Parsed placeholder instruction from Simple Mode syntax.
 */
export type ParsedPlaceholder =
  | {
      key: string;
      kind: "reference";
    }
  | {
      key: string;
      kind: "question";
      question: PromptQuestion;
    };

/**
 * Parses one Simple Mode placeholder body.
 */
export function parsePlaceholder(content: string): ParsedPlaceholder {
  const normalizedContent = content.trim();

  if (normalizedContent.length === 0) {
    throw new Error("Empty placeholder is not allowed.");
  }

  const firstColonIndex = normalizedContent.indexOf(":");

  if (firstColonIndex === -1) {
    if (isReferencePlaceholder(normalizedContent)) {
      return {
        key: normalizedContent,
        kind: "reference",
      };
    }

    const label = normalizedContent;
    return {
      key: slugifyPlaceholderKey(label),
      kind: "question",
      question: {
        key: slugifyPlaceholderKey(label),
        label,
        required: true,
        type: "text",
      },
    };
  }

  const key = normalizedContent.slice(0, firstColonIndex).trim();
  const rest = normalizedContent.slice(firstColonIndex + 1).trim();

  if (!isValidExplicitKey(key)) {
    throw new Error(`Invalid placeholder key: ${key}`);
  }

  const typedPlaceholder = parseTypedPlaceholder(key, rest);

  if (typedPlaceholder) {
    return typedPlaceholder;
  }

  return {
    key,
    kind: "question",
    question: {
      key,
      label: rest,
      required: true,
      type: "text",
    },
  };
}

function isReferencePlaceholder(content: string): boolean {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(content);
}

function isValidExplicitKey(key: string): boolean {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key);
}

function parseTypedPlaceholder(
  key: string,
  content: string,
): ParsedPlaceholder | undefined {
  const typeSeparatorIndex = content.indexOf(":");

  if (typeSeparatorIndex === -1) {
    return undefined;
  }

  const rawType = content.slice(0, typeSeparatorIndex).trim();
  const label = content.slice(typeSeparatorIndex + 1).trim();
  const selectType = parseSelectType(rawType);

  if (selectType) {
    return {
      key,
      kind: "question",
      question: {
        key,
        label,
        options: selectType.options,
        required: true,
        type: selectType.type,
      },
    };
  }

  if (!supportedTypes.has(rawType as PromptQuestionType)) {
    return undefined;
  }

  return {
    key,
    kind: "question",
    question: {
      key,
      label,
      required: true,
      type: rawType as PromptQuestionType,
    },
  };
}

function parseSelectType(
  rawType: string,
): { options: string[]; type: "select" | "select[]" } | undefined {
  const match = /^(select\[\]|select)\((.*)\)$/.exec(rawType);

  if (!match) {
    return undefined;
  }

  const type = match[1] as "select" | "select[]";
  const options = match[2]
    .split(",")
    .map((option) => option.trim())
    .filter(Boolean);

  if (options.length === 0) {
    throw new Error(`Select placeholder '${rawType}' must define options.`);
  }

  return {
    options,
    type,
  };
}
