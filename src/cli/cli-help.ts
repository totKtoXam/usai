const commandName = "usai";

/**
 * Formats global CLI help.
 */
export function formatHelp(version: string): string {
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
    "Run `usai <command> --help` for command-specific options.",
    "",
  ].join("\n");
}
