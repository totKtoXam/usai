import { initializeProject } from "../../core/project/scaffold.js";
import { formatInitHelp } from "./init-help.js";
import { parseInitOptions } from "./init-options.js";
import { formatInitResult } from "./init-result-format.js";

/**
 * Runs the `usai init` command.
 */
export async function runInit(args: string[]): Promise<number> {
  if (args.includes("--help") || args.includes("-h")) {
    console.log(formatInitHelp());
    return 0;
  }

  const parseResult = parseInitOptions(args);

  if (!parseResult.ok) {
    console.error(parseResult.error);
    console.error("");
    console.error(formatInitHelp());
    return 1;
  }

  const result = await initializeProject({
    cwd: process.cwd(),
    force: parseResult.options.force,
    minimal: parseResult.options.minimal,
    withSamples: parseResult.options.withSamples,
  });

  console.log(formatInitResult(result));

  if (result.conflictedFiles.length > 0) {
    console.error(
      "Conflicting files were not overwritten. Re-run with `usai init --force` to overwrite them.",
    );
    return 1;
  }

  return 0;
}
