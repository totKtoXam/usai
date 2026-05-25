import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { resolvePackageRoot } from "../core/package/package-root.js";

type PackageJson = {
  version?: string;
};

/**
 * Reads the package version from package metadata.
 */
export function getVersion(): string {
  const packageJsonPath = resolve(
    resolvePackageRoot(import.meta.url),
    "package.json",
  );
  const packageJson = JSON.parse(
    readFileSync(packageJsonPath, "utf8"),
  ) as PackageJson;

  return packageJson.version ?? "0.0.0";
}
