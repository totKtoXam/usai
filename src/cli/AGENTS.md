# CLI Layer Instructions

This layer owns command parsing, command-specific help, terminal output and process exit behavior.

## Responsibilities

- Parse CLI arguments and flags.
- Dispatch commands to core use cases.
- Print human-readable command output.
- Convert core results and errors into exit codes.
- Keep command help aligned with implemented behavior.

## Boundaries

- Do not put scaffold, prompt, ruleset or config business logic in `src/cli`.
- Do not perform direct network access from this layer.
- Do not read or write project files directly when a core module should own the operation.
- Do not call `process.exit`; return an exit code and let the entrypoint assign `process.exitCode`.

## Style

- Keep command handlers thin and explicit.
- Keep output deterministic enough to test with snapshots or exact assertions.
- Add command-specific tests when adding or changing CLI flags.
- Prefer the current lightweight parser until the implementation plan explicitly needs a CLI framework.
- Add JSDoc to exported command handlers, option parsers, help formatters and result formatters.
- Keep each command split by purpose: command runner, options parser, help text and output formatting.
