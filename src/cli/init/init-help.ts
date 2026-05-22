/**
 * Formats `usai init` command help.
 */
export function formatInitHelp(): string {
  return [
    "Initialize UsAI files in the current project.",
    "",
    "Usage:",
    "  usai init [options]",
    "",
    "Options:",
    "  --force              Overwrite conflicting scaffold files",
    "  --minimal            Create config, router and directories only",
    "  --with-samples       Add structured and extended prompt examples",
    "  -h, --help           Show help",
    "",
  ].join("\n");
}
