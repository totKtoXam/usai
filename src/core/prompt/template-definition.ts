import type { PromptQuestion } from "./prompt-question.js";

/**
 * Prompt template mode recognized by the loader.
 */
export type TemplateMode = "simple" | "structured" | "extended";

/**
 * Canonical prompt template representation used by generation.
 */
export type TemplateDefinition = {
  body: string;
  id: string;
  mode: TemplateMode;
  output?: TemplateOutput;
  placeholders: TemplatePlaceholder[];
  questions: PromptQuestion[];
  sourcePath: string;
};

/**
 * Optional output metadata declared by a template.
 */
export type TemplateOutput = {
  directory?: string;
  filename?: string;
};

/**
 * One placeholder occurrence in the template body.
 */
export type TemplatePlaceholder = {
  end: number;
  key: string;
  raw: string;
  start: number;
};
