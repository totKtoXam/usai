#!/usr/bin/env node
import { realpathSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Command, CommanderError } from "commander";
import { runInit } from "./init/init-command.js";
import { getVersion } from "./package-version.js";

/**
 * Runs the UsAI CLI with already-tokenized arguments.
 */
export async function run(args = process.argv.slice(2)): Promise<number> {
  let commandExitCode = 0;
  const program = createCliProgram((exitCode) => {
    commandExitCode = exitCode;
  });

  try {
    await program.parseAsync(args, { from: "user" });
  } catch (error) {
    if (error instanceof CommanderError) {
      return error.exitCode;
    }

    throw error;
  }

  return commandExitCode;
}

/**
 * Creates the Commander-based CLI program.
 */
export function createCliProgram(
  setExitCode: (exitCode: number) => void,
): Command {
  const program = new Command();

  program
    .name("usai")
    .description(
      "Deterministic CLI for reusable AI-assisted development workflows.",
    )
    .version(getVersion(), "-v, --version", "Show version")
    .helpOption("-h, --help", "Show help")
    .showHelpAfterError()
    .exitOverride();

  program
    .command("init")
    .description("Initialize UsAI files in the current project.")
    .option("--force", "Overwrite conflicting scaffold files")
    .option("--minimal", "Create config, router and directories only")
    .option(
      "--root <path>",
      "Initialize the specified directory instead of the current directory",
    )
    .option("--with-samples", "Add structured and extended prompt examples")
    .action(
      async (options: {
        force?: boolean;
        minimal?: boolean;
        root?: string;
        withSamples?: boolean;
      }) => {
        setExitCode(await runInit(options));
      },
    );

  program
    .command("prompt <template>")
    .description("Generate a final prompt from a template.")
    .action(() => {
      console.error(
        "`usai prompt` is planned for V1 but is not implemented yet.",
      );
      setExitCode(1);
    });

  program
    .command("rules")
    .description("Manage reusable rulesets.")
    .action(() => {
      console.error(
        "`usai rules` is planned for V1 but is not implemented yet.",
      );
      setExitCode(1);
    });

  return program;
}

/**
 * Returns true when the module URL belongs to the Node entrypoint script.
 */
export function isCliEntrypoint(
  moduleUrl: string,
  entrypointPath: string | undefined,
): boolean {
  if (!entrypointPath) {
    return false;
  }

  const modulePath = resolveRealPath(fileURLToPath(moduleUrl));
  const invokedPath = resolveRealPath(entrypointPath);

  if (process.platform === "win32") {
    return modulePath.toLowerCase() === invokedPath.toLowerCase();
  }

  return modulePath === invokedPath;
}

/**
 * Resolves symlinks and junctions when possible, while keeping a usable path for missing files.
 */
function resolveRealPath(path: string): string {
  try {
    return realpathSync.native(path);
  } catch {
    return resolve(path);
  }
}

if (isCliEntrypoint(import.meta.url, process.argv[1])) {
  process.exitCode = await run();
}
