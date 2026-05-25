import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import type { PromptAnswerValue } from "./prompt-question.js";

/**
 * Answers loaded from a YAML file.
 */
export type PromptAnswers = Record<string, PromptAnswerValue>;

/**
 * Loads prompt answers from a YAML file.
 */
export async function loadAnswersFile(path: string): Promise<PromptAnswers> {
  const content = await readFile(path, "utf8");
  const parsed = parse(content) as unknown;

  if (!isPlainRecord(parsed)) {
    throw new Error("Answers file must contain a YAML object.");
  }

  return normalizeAnswers(parsed);
}

function normalizeAnswers(record: Record<string, unknown>): PromptAnswers {
  const answers: PromptAnswers = {};

  for (const [key, value] of Object.entries(record)) {
    answers[key] = normalizeAnswerValue(key, value);
  }

  return answers;
}

function normalizeAnswerValue(key: string, value: unknown): PromptAnswerValue {
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

  if (value === null || value === undefined) {
    return "";
  }

  throw new Error(`Unsupported answer value for '${key}'.`);
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
