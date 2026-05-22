import { existsSync } from "node:fs";
import { dirname, isAbsolute, parse, resolve } from "node:path";

const rootMarkers = [".usai/config.json", ".git", "package.json"];

/**
 * Finds the nearest project root from a starting directory.
 */
export function findProjectRoot(startDirectory: string): string {
  let current = resolve(startDirectory);
  const { root } = parse(current);

  while (true) {
    if (rootMarkers.some((marker) => existsSync(resolve(current, marker)))) {
      return current;
    }

    if (current === root) {
      return resolve(startDirectory);
    }

    current = dirname(current);
  }
}

/**
 * Resolves a project-relative path against the project root.
 */
export function resolveProjectPath(projectRoot: string, path: string): string {
  return isAbsolute(path) ? path : resolve(projectRoot, path);
}
