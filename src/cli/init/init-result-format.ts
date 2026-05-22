import type { ScaffoldResult } from "../../core/project/scaffold-result.js";

/**
 * Formats scaffold changes for terminal output.
 */
export function formatInitResult(result: ScaffoldResult): string {
  const lines = [`Initialized UsAI project at ${result.projectRoot}`, ""];

  appendSection(lines, "Created directories", result.createdDirectories);
  appendSection(lines, "Created files", result.createdFiles);
  appendSection(lines, "Skipped unchanged files", result.skippedFiles);
  appendSection(lines, "Overwritten files", result.overwrittenFiles);
  appendSection(lines, "Conflicting files", result.conflictedFiles);

  return lines.join("\n");
}

/**
 * Adds a non-empty report section to the output line buffer.
 */
function appendSection(lines: string[], title: string, items: string[]): void {
  if (items.length === 0) {
    return;
  }

  lines.push(`${title}:`);
  lines.push(...items.map((item) => `  - ${item}`));
  lines.push("");
}
