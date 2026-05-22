#!/usr/bin/env node
import { pathToFileURL } from "node:url";
import { formatHelp } from "./cli-help.js";
import { runInit } from "./init/init-command.js";
import { getVersion } from "./package-version.js";

/**
 * Runs the UsAI CLI with already-tokenized arguments.
 */
export async function run(args = process.argv.slice(2)): Promise<number> {
  if (args.includes("--version") || args.includes("-v")) {
    console.log(getVersion());
    return 0;
  }

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    console.log(formatHelp(getVersion()));
    return 0;
  }

  const [command, ...commandArgs] = args;

  if (command === "init") {
    return runInit(commandArgs);
  }

  console.error(`Unknown command: ${command}`);
  console.error("");
  console.error(formatHelp(getVersion()));
  return 1;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  process.exitCode = await run();
}
