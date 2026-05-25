import { checkbox, confirm, input, select } from "@inquirer/prompts";
import type { PromptAnswers } from "../../core/prompt/answers-file.js";
import type {
  PromptAnswerValue,
  PromptQuestion,
} from "../../core/prompt/prompt-question.js";

/**
 * Collects missing prompt answers through interactive terminal prompts.
 */
export async function collectInteractiveAnswers(
  questions: PromptQuestion[],
  existingAnswers: PromptAnswers,
): Promise<PromptAnswers> {
  const collectedAnswers: PromptAnswers = {};

  for (const question of questions) {
    if (existingAnswers[question.key] !== undefined) {
      continue;
    }

    collectedAnswers[question.key] = await collectAnswer(question);
  }

  return {
    ...existingAnswers,
    ...collectedAnswers,
  };
}

async function collectAnswer(
  question: PromptQuestion,
): Promise<PromptAnswerValue> {
  if (question.type === "boolean") {
    return confirm({
      default: Boolean(question.defaultValue),
      message: question.label,
    });
  }

  if (question.type === "select") {
    return select({
      choices: choicesForQuestion(question),
      message: question.label,
    });
  }

  if (question.type === "select[]") {
    return checkbox({
      choices: choicesForQuestion(question),
      message: question.label,
    });
  }

  if (question.type === "number") {
    const answer = await input({
      default:
        question.defaultValue === undefined
          ? undefined
          : String(question.defaultValue),
      message: question.label,
      validate: (value) =>
        Number.isFinite(Number(value)) || "Enter a valid number.",
    });

    return Number(answer);
  }

  if (question.type.endsWith("[]")) {
    const answer = await input({
      message: `${question.label} (comma-separated)`,
    });

    return answer
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return input({
    default:
      question.defaultValue === undefined
        ? undefined
        : String(question.defaultValue),
    message: question.label,
  });
}

function choicesForQuestion(question: PromptQuestion) {
  return (question.options ?? []).map((option) => ({
    name: option,
    value: option,
  }));
}
