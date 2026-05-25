import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Resolves the package root by walking up from a module URL until `package.json` is found.
 */
export function resolvePackageRoot(moduleUrl: string): string {
  let currentDirectory = dirname(fileURLToPath(moduleUrl));

  while (true) {
    const packageJsonPath = resolve(currentDirectory, "package.json");

    if (existsSync(packageJsonPath)) {
      return currentDirectory;
    }

    const parentDirectory = dirname(currentDirectory);

    if (parentDirectory === currentDirectory) {
      throw new Error(`Cannot resolve package root from ${moduleUrl}`);
    }

    currentDirectory = parentDirectory;
  }
}
