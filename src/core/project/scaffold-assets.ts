import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

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
  return resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
}
