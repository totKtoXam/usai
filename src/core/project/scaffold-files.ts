import { readScaffoldAsset } from "./scaffold-assets.js";
import {
  defaultScaffoldFileEntries,
  sampleScaffoldFileEntries,
  type ScaffoldFileEntry,
} from "./scaffold-file-manifest.js";

/**
 * A file that can be created by the project scaffold.
 */
export type ScaffoldFile = {
  path: string;
  content: string;
};

/**
 * Options that affect which scaffold files are included.
 */
export type ScaffoldFileOptions = {
  minimal?: boolean;
  withSamples?: boolean;
};

/**
 * Builds the file list for `usai init`.
 */
export async function getScaffoldFiles(
  options: ScaffoldFileOptions,
): Promise<ScaffoldFile[]> {
  const entries = getScaffoldFileEntries(options);

  return Promise.all(entries.map(readScaffoldFile));
}

/**
 * Builds the scaffold asset manifest for the selected init mode.
 */
export function getScaffoldFileEntries(
  options: ScaffoldFileOptions,
): ScaffoldFileEntry[] {
  const entries = options.minimal
    ? defaultScaffoldFileEntries.slice(0, 2)
    : [...defaultScaffoldFileEntries];

  if (options.withSamples) {
    entries.push(...sampleScaffoldFileEntries);
  }

  return entries;
}

async function readScaffoldFile(
  entry: ScaffoldFileEntry,
): Promise<ScaffoldFile> {
  return {
    path: entry.target,
    content: await readScaffoldAsset(entry.asset),
  };
}
