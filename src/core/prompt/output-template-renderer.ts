import type { PromptAnswers } from "./answers-file.js";

/**
 * Renders output path template placeholders from answers and built-in variables.
 */
export function renderOutputTemplate(
  template: string,
  answers: PromptAnswers,
  date: Date,
): string {
  return template.replace(
    /{{\s*([^}|]+)(?:\|([^}]+))?\s*}}/g,
    (_raw, key, filter) => {
      const value = resolveOutputValue(String(key).trim(), answers, date);
      return applyOutputFilter(
        String(value),
        filter ? String(filter).trim() : undefined,
      );
    },
  );
}

function resolveOutputValue(
  key: string,
  answers: PromptAnswers,
  date: Date,
): string | number | boolean {
  if (key === "date") {
    return formatDate(date);
  }

  if (key === "datetime") {
    return formatDateTime(date);
  }

  const value = answers[key];

  if (value === undefined || Array.isArray(value)) {
    throw new Error(`Cannot render output path placeholder: ${key}`);
  }

  return value;
}

function applyOutputFilter(value: string, filter?: string): string {
  if (!filter) {
    return value;
  }

  if (filter === "kebab") {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  throw new Error(`Unsupported output path filter: ${filter}`);
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

function formatDateTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${formatDate(date)}-${hours}${minutes}`;
}
