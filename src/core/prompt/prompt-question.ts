/**
 * Input types supported by prompt templates.
 */
export type PromptQuestionType =
  | "text"
  | "textarea"
  | "select"
  | "file"
  | "text[]"
  | "file[]"
  | "select[]"
  | "boolean"
  | "number";

/**
 * One deterministic question extracted from a prompt template.
 */
export type PromptQuestion = {
  defaultValue?: PromptAnswerValue;
  key: string;
  label: string;
  options?: string[];
  required: boolean;
  type: PromptQuestionType;
};

/**
 * Runtime answer value accepted by the renderer.
 */
export type PromptAnswerValue = string | number | boolean | string[];
