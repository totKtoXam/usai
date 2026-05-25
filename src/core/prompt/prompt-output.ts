import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, resolve } from "node:path";
import type { PromptConfig } from "./prompt-config.js";
import type { TemplateDefinition } from "./template-definition.js";
import type { PromptAnswers } from "./answers-file.js";
import { renderOutputTemplate } from "./output-template-renderer.js";

/**
 * Output options accepted by prompt generation.
 */
export type PromptOutputOptions = {
  force?: boolean;
  output?: string;
};

/**
 * Writes rendered prompt content to disk.
 */
export async function writePromptOutput(
  content: string,
  template: TemplateDefinition,
  answers: PromptAnswers,
  config: PromptConfig,
  cwd: string,
  options: PromptOutputOptions,
): Promise<string> {
  const outputPath = resolveOutputPath(
    template,
    answers,
    config,
    cwd,
    options.output,
  );

  if (existsSync(outputPath) && options.force !== true) {
    throw new Error(`Output file already exists: ${outputPath}`);
  }

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, content, "utf8");

  return outputPath;
}

function resolveOutputPath(
  template: TemplateDefinition,
  answers: PromptAnswers,
  config: PromptConfig,
  cwd: string,
  output?: string,
): string {
  if (output) {
    return isAbsolute(output) ? output : resolve(cwd, output);
  }

  if (template.output?.directory || template.output?.filename) {
    const date = new Date();
    const directory = template.output.directory
      ? renderOutputTemplate(template.output.directory, answers, date)
      : config.aiWorkflows;
    const filename = template.output.filename
      ? renderOutputTemplate(template.output.filename, answers, date)
      : `${template.id}.md`;

    return resolve(config.projectRoot, directory, filename);
  }

  return resolve(
    config.projectRoot,
    config.aiWorkflows,
    "generated",
    `${formatTimestamp(new Date())}-${template.id}.md`,
  );
}

function formatTimestamp(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}${month}${day}-${hours}${minutes}`;
}
