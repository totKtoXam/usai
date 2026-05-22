/**
 * Parsed options for `usai init`.
 */
export type InitCliOptions = {
  force: boolean;
  minimal: boolean;
  withSamples: boolean;
};

/**
 * Result of parsing `usai init` flags.
 */
export type ParseInitOptionsResult =
  | {
      ok: true;
      options: InitCliOptions;
    }
  | {
      ok: false;
      error: string;
    };

const allowedFlags = new Set(["--force", "--minimal", "--with-samples"]);

/**
 * Parses flags accepted by `usai init`.
 */
export function parseInitOptions(args: string[]): ParseInitOptionsResult {
  const unknownArg = args.find((arg) => !allowedFlags.has(arg));

  if (unknownArg) {
    return {
      ok: false,
      error: `Unknown init option: ${unknownArg}`,
    };
  }

  return {
    ok: true,
    options: {
      force: args.includes("--force"),
      minimal: args.includes("--minimal"),
      withSamples: args.includes("--with-samples"),
    },
  };
}
