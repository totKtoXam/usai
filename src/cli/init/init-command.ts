import { initializeProject } from "../../core/project/scaffold.js";
import { formatInitResult } from "./init-result-format.js";

/**
 * Commander options accepted by `usai init`.
 */
export type InitCommandOptions = {
  force?: boolean;
  minimal?: boolean;
  root?: string;
  withSamples?: boolean;
};

/**
 * Runs the `usai init` command.
 */
export async function runInit(options: InitCommandOptions): Promise<number> {
  const result = await initializeProject({
    cwd: process.cwd(),
    force: options.force === true,
    minimal: options.minimal === true,
    root: options.root,
    withSamples: options.withSamples === true,
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
