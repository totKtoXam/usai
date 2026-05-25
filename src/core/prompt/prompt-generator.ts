import type { PromptAnswers } from "./answers-file.js";
import { resolvePromptAnswers } from "./answer-resolver.js";
import { renderPrompt } from "./prompt-renderer.js";
import { writePromptOutput } from "./prompt-output.js";
import { loadTemplateReference } from "./template-loader.js";

/**
 * Options accepted by prompt generation.
 */
export type PromptGenerationOptions = {
  answers: PromptAnswers;
  cwd: string;
  force?: boolean;
  output?: string;
  templateReference: string;
};

/**
 * Result of generated prompt rendering.
 */
export type PromptGenerationResult = {
  outputPath: string;
};

/**
 * Generates a final prompt from a template and answers file.
 */
export async function generatePrompt(
  options: PromptGenerationOptions,
): Promise<PromptGenerationResult> {
  const loadedTemplate = await loadTemplateReference(
    options.templateReference,
    options.cwd,
  );
  const answers = resolvePromptAnswers(
    loadedTemplate.template.questions,
    options.answers,
  );
  const renderedPrompt = renderPrompt(loadedTemplate.template, answers);
  const outputPath = await writePromptOutput(
    renderedPrompt,
    loadedTemplate.template,
    answers,
    loadedTemplate.config,
    options.cwd,
    {
      force: options.force,
      output: options.output,
    },
  );

  return {
    outputPath,
  };
}
