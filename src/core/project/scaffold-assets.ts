import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { resolvePackageRoot } from "../package/package-root.js";

/**
 * Reads a scaffold asset from the package-level `assets/scaffold` directory.
 */
export async function readScaffoldAsset(
  assetFileName: string,
): Promise<string> {
  return readFile(resolveScaffoldAssetPath(assetFileName), "utf8");
}

/**
 * Resolves a scaffold asset path for both `src` development and `dist` runtime.
 */
export function resolveScaffoldAssetPath(assetFileName: string): string {
  return resolve(getPackageRoot(), "assets/scaffold", assetFileName);
}

/**
 * Resolves the package root from this module location.
 */
function getPackageRoot(): string {
  return resolvePackageRoot(import.meta.url);
}
