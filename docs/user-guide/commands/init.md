# `usai init`

Initializes UsAI files in the current project.

## Usage

```bash
usai init [options]
```

For local development before publishing:

```bash
node dist/cli/index.js init
```

## Options

| Option           | Description                                                       |
| ---------------- | ----------------------------------------------------------------- |
| `--force`        | Overwrite conflicting scaffold files.                             |
| `--minimal`      | Create config, router and directories only.                       |
| `--root <path>`  | Initialize a specific directory instead of the current directory. |
| `--with-samples` | Add structured, extended and workflow prompt examples.            |
| `-h`, `--help`   | Show command help.                                                |

By default, `usai init` writes into the current working directory. It does not walk up to the nearest parent `.git` directory.

## Generated Files

Default:

```text
.usai/config.json
AGENTS.md
docs/devs/README.md
docs/devs/prompt-templates/application-usecase.md
docs/decisions/ADR-0000-template.md
```

With `--with-samples`:

```text
docs/devs/prompt-templates/feature-slice.md
docs/devs/prompt-templates/architecture-task.md
docs/devs/prompt-schemas/architecture-task.yaml
docs/devs/prompt-templates/feature-brief.md
docs/devs/prompt-templates/slice-prompts.md
docs/devs/prompt-templates/slice-implementation.md
docs/devs/prompt-templates/review-slice.md
```

`usai init` also creates the configured directories under `docs/devs`, `docs/rulesets` and `docs/decisions`.

The default `docs/devs` workflow directory is:

```text
docs/devs/ai-workflows/modules/
```

## Constraints

- Existing files are not overwritten unless `--force` is used.
- The command does not install external rulesets.
- The command does not generate agent-specific exports such as `.codex/skills`.
