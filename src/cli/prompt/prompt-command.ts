import { isAbsolute, resolve } from "node:path";
import {
  loadAnswersFile,
  type PromptAnswers,
} from "../../core/prompt/answers-file.js";
import { resolvePromptAnswers } from "../../core/prompt/answer-resolver.js";
import { renderPrompt } from "../../core/prompt/prompt-renderer.js";
import { writePromptOutput } from "../../core/prompt/prompt-output.js";
import { loadTemplateReference } from "../../core/prompt/template-loader.js";
import { collectInteractiveAnswers } from "./interactive-answers.js";

/**
 * Commander options accepted by `usai prompt`.
 */
export type PromptCommandOptions = {
  answers?: string;
  force?: boolean;
  interactive?: boolean;
  noInteractive?: boolean;
  output?: string;
};

/**
 * Runs the `usai prompt` command.
 */
export async function runPrompt(
  templateReference: string,
  options: PromptCommandOptions,
): Promise<number> {
  try {
    const cwd = process.cwd();
    const loadedTemplate = await loadTemplateReference(templateReference, cwd);
    const fileAnswers = options.answers
      ? await loadAnswersFile(resolveInputPath(cwd, options.answers))
      : ({} as PromptAnswers);
    const answers = isNoInteractive(options)
      ? fileAnswers
      : await collectInteractiveAnswers(
          loadedTemplate.template.questions,
          fileAnswers,
        );
    const resolvedAnswers = resolvePromptAnswers(
      loadedTemplate.template.questions,
      answers,
    );
    const renderedPrompt = renderPrompt(
      loadedTemplate.template,
      resolvedAnswers,
    );
    const outputPath = await writePromptOutput(
      renderedPrompt,
      loadedTemplate.template,
      resolvedAnswers,
      loadedTemplate.config,
      cwd,
      {
        force: options.force,
        output: options.output,
      },
    );

    console.log(`Generated prompt: ${outputPath}`);
    return 0;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return 1;
  }
}

function resolveInputPath(cwd: string, path: string): string {
  return isAbsolute(path) ? path : resolve(cwd, path);
}

function isNoInteractive(options: PromptCommandOptions): boolean {
  return options.noInteractive === true || options.interactive === false;
}
