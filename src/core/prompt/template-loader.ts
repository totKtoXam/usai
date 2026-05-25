import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { isAbsolute, resolve } from "node:path";
import type { TemplateDefinition } from "./template-definition.js";
import { parseSimpleTemplate } from "./simple/simple-template-parser.js";
import { loadPromptConfig, type PromptConfig } from "./prompt-config.js";
import { parseStructuredTemplate } from "./structured/structured-template-parser.js";

/**
 * Loaded prompt template with effective project config.
 */
export type LoadedTemplate = {
  config: PromptConfig;
  template: TemplateDefinition;
};

/**
 * Loads and parses a prompt template reference.
 */
export async function loadTemplateReference(
  templateReference: string,
  cwd: string,
): Promise<LoadedTemplate> {
  const config = loadPromptConfig(cwd);
  const sourcePath = resolveTemplateReference(templateReference, cwd, config);
  const body = await readFile(sourcePath, "utf8");

  if (isFrontmatterTemplate(body)) {
    return {
      config,
      template: parseStructuredTemplate(body, sourcePath),
    };
  }

  return {
    config,
    template: parseSimpleTemplate(body, sourcePath),
  };
}

function resolveTemplateReference(
  templateReference: string,
  cwd: string,
  config: PromptConfig,
): string {
  if (isPathReference(templateReference)) {
    const sourcePath = isAbsolute(templateReference)
      ? templateReference
      : resolve(cwd, templateReference);

    if (!existsSync(sourcePath)) {
      throw new Error(`Template file does not exist: ${sourcePath}`);
    }

    return sourcePath;
  }

  const sourcePath = resolve(
    config.projectRoot,
    config.promptTemplates,
    `${templateReference}.md`,
  );

  if (!existsSync(sourcePath)) {
    throw new Error(`Unknown prompt template: ${templateReference}`);
  }

  return sourcePath;
}

function isPathReference(templateReference: string): boolean {
  return (
    templateReference.endsWith(".md") ||
    templateReference.includes("/") ||
    templateReference.includes("\\")
  );
}

function isFrontmatterTemplate(body: string): boolean {
  return body.startsWith("---\n") || body.startsWith("---\r\n");
}
