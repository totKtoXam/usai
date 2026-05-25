import type { PromptAnswerValue, PromptQuestion } from "./prompt-question.js";
import type { PromptAnswers } from "./answers-file.js";

/**
 * Resolves final answers for a template.
 */
export function resolvePromptAnswers(
  questions: PromptQuestion[],
  providedAnswers: PromptAnswers,
): PromptAnswers {
  const resolvedAnswers: PromptAnswers = {};

  for (const question of questions) {
    const providedAnswer = providedAnswers[question.key];

    if (providedAnswer !== undefined) {
      resolvedAnswers[question.key] = coerceAnswerValue(
        question,
        providedAnswer,
      );
      continue;
    }

    if (question.defaultValue !== undefined) {
      resolvedAnswers[question.key] = question.defaultValue;
      continue;
    }

    if (question.required) {
      throw new Error(`Missing required answer: ${question.key}`);
    }
  }

  return {
    ...providedAnswers,
    ...resolvedAnswers,
  };
}

function coerceAnswerValue(
  question: PromptQuestion,
  value: PromptAnswerValue,
): PromptAnswerValue {
  if (question.type === "number") {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue)) {
      throw new Error(`Answer '${question.key}' must be a number.`);
    }

    return numberValue;
  }

  if (question.type === "boolean") {
    if (typeof value === "boolean") {
      return value;
    }

    if (typeof value === "string") {
      if (value.toLowerCase() === "true") {
        return true;
      }

      if (value.toLowerCase() === "false") {
        return false;
      }
    }

    throw new Error(`Answer '${question.key}' must be a boolean.`);
  }

  if (question.type.endsWith("[]") && !Array.isArray(value)) {
    return String(value)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return value;
}
