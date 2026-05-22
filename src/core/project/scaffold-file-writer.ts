import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { resolveProjectPath } from "./project-root.js";
import type { ScaffoldFile } from "./scaffold-files.js";
import type { ScaffoldResult } from "./scaffold-result.js";

/**
 * Writes one scaffold file and records whether it was created, skipped,
 * overwritten or left as a conflict.
 */
export async function writeScaffoldFile(
  projectRoot: string,
  file: ScaffoldFile,
  force: boolean,
  result: ScaffoldResult,
): Promise<void> {
  const absolutePath = resolveProjectPath(projectRoot, file.path);

  try {
    const currentContent = await readFile(absolutePath, "utf8");

    if (currentContent === file.content) {
      result.skippedFiles.push(file.path);
      return;
    }

    if (!force) {
      result.conflictedFiles.push(file.path);
      return;
    }

    await writeFile(absolutePath, file.content, "utf8");
    result.overwrittenFiles.push(file.path);
  } catch (error) {
    if (!isNotFoundError(error)) {
      throw error;
    }

    await mkdir(dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, file.content, "utf8");
    result.createdFiles.push(file.path);
  }
}

/**
 * Detects Node.js file-not-found errors without hiding unrelated filesystem failures.
 */
function isNotFoundError(error: unknown): boolean {
  return (
    error instanceof Error &&
    "code" in error &&
    (error as NodeJS.ErrnoException).code === "ENOENT"
  );
}
