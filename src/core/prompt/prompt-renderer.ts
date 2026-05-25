import type { PromptAnswers } from "./answers-file.js";
import type { TemplateDefinition } from "./template-definition.js";

/**
 * Renders a prompt template body with resolved answers.
 */
export function renderPrompt(
  template: TemplateDefinition,
  answers: PromptAnswers,
): string {
  return template.body.replace(/{{([\s\S]*?)}}/g, (raw) => {
    const placeholder = template.placeholders.find(
      (candidate) => candidate.raw === raw,
    );

    if (!placeholder) {
      return raw;
    }

    const value = answers[placeholder.key];

    if (value === undefined) {
      throw new Error(`Missing answer for placeholder: ${placeholder.key}`);
    }

    return renderAnswerValue(value);
  });
}

/**
 * Renders one scalar or list value into Markdown.
 */
export function renderAnswerValue(value: PromptAnswers[string]): string {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "none";
    }

    return value.map((item) => `- ${item}`).join("\n");
  }

  return String(value);
}
