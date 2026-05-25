import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

/**
 * Prompt-related path configuration.
 */
export type PromptConfig = {
  aiWorkflows: string;
  projectRoot: string;
  promptTemplates: string;
};

type RawProjectConfig = {
  paths?: {
    aiWorkflows?: unknown;
    promptTemplates?: unknown;
  };
};

const defaultPaths = {
  aiWorkflows: "docs/ai-workflows",
  promptTemplates: "docs/devs/prompt-templates",
} as const;

/**
 * Loads prompt configuration from nearest `.usai/config.json` or falls back to defaults.
 */
export function loadPromptConfig(cwd: string): PromptConfig {
  const configPath = findNearestProjectConfig(cwd);
  const projectRoot = configPath ? dirname(dirname(configPath)) : resolve(cwd);
  const rawConfig = configPath
    ? (JSON.parse(readFileSync(configPath, "utf8")) as RawProjectConfig)
    : {};

  return {
    aiWorkflows:
      typeof rawConfig.paths?.aiWorkflows === "string"
        ? rawConfig.paths.aiWorkflows
        : defaultPaths.aiWorkflows,
    projectRoot,
    promptTemplates:
      typeof rawConfig.paths?.promptTemplates === "string"
        ? rawConfig.paths.promptTemplates
        : defaultPaths.promptTemplates,
  };
}

function findNearestProjectConfig(startDirectory: string): string | undefined {
  let currentDirectory = resolve(startDirectory);

  while (true) {
    const configPath = resolve(currentDirectory, ".usai/config.json");

    if (existsSync(configPath)) {
      return configPath;
    }

    const parentDirectory = dirname(currentDirectory);

    if (parentDirectory === currentDirectory) {
      return undefined;
    }

    currentDirectory = parentDirectory;
  }
}
