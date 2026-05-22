#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const commandName = "usai";

type PackageJson = {
  version?: string;
};

export function getVersion(): string {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const packageJsonPath = resolve(currentDir, "../../package.json");
  const packageJson = JSON.parse(
    readFileSync(packageJsonPath, "utf8"),
  ) as PackageJson;

  return packageJson.version ?? "0.0.0";
}

export function formatHelp(version = getVersion()): string {
  return [
    `UsAI CLI ${version}`,
    "",
    "Deterministic CLI for reusable AI-assisted development workflows.",
    "",
    "Usage:",
    `  ${commandName} [command] [options]`,
    "",
    "Commands:",
    "  init                 Initialize UsAI files in the current project",
    "  prompt <template>    Generate a final prompt from a template",
    "  rules                Manage reusable rulesets",
    "",
    "Options:",
    "  -h, --help           Show help",
    "  -v, --version        Show version",
    "",
    "The listed commands are part of the v1 roadmap. Phase 0 exposes help and version only.",
    "",
  ].join("\n");
}

export function run(args = process.argv.slice(2)): number {
  if (args.includes("--version") || args.includes("-v")) {
    console.log(getVersion());
    return 0;
  }

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(formatHelp());
    return 0;
  }

  const [command] = args;
  console.error(`Unknown command: ${command}`);
  console.error("");
  console.error(formatHelp());
  return 1;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  process.exitCode = run();
}
