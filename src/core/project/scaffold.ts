import { mkdir } from "node:fs/promises";
import { findProjectRoot, resolveProjectPath } from "./project-root.js";
import { writeScaffoldFile } from "./scaffold-file-writer.js";
import { scaffoldDirectories } from "./scaffold-directories.js";
import { getScaffoldFiles } from "./scaffold-files.js";
import {
  createScaffoldResult,
  type ScaffoldResult,
} from "./scaffold-result.js";

/**
 * Options accepted by project initialization.
 */
export type InitOptions = {
  cwd: string;
  force?: boolean;
  minimal?: boolean;
  withSamples?: boolean;
};

/**
 * Creates or updates the project-local UsAI scaffold.
 */
export async function initializeProject(
  options: InitOptions,
): Promise<ScaffoldResult> {
  const projectRoot = findProjectRoot(options.cwd);
  const result = createScaffoldResult(projectRoot);

  for (const directory of scaffoldDirectories) {
    const absolutePath = resolveProjectPath(projectRoot, directory);
    const mkdirResult = await mkdir(absolutePath, { recursive: true });

    if (mkdirResult) {
      result.createdDirectories.push(directory);
    } else {
      result.existingDirectories.push(directory);
    }
  }

  for (const file of await getScaffoldFiles(options)) {
    await writeScaffoldFile(projectRoot, file, Boolean(options.force), result);
  }

  return result;
}
