# UsAI

Deterministic CLI for reusable AI-assisted development workflows.

`usai` works with portable markdown/yaml/json assets: prompt templates, optional question schemas, rulesets and future agent export adapters. The CLI does not call AI models.

## Current Status

`usai` is pre-release. The current implementation includes the repository baseline and `usai init`.

Planned V1 commands:

```bash
usai init
usai prompt <template-name>
usai rules sources list
usai rules list
usai rules search <query>
usai rules install <rule-name> --size <nano|mini|full> --target <target>
usai rules update
```

Only document commands as available after they are implemented.

## Installation

The package is not published yet. For local development:

```bash
pnpm install
pnpm build
node dist/cli/index.js --help
```

## Quick Start

Initialize UsAI files in a project:

```bash
node dist/cli/index.js init
```

This creates project-local configuration, prompt template folders, ruleset folders, ADR folder, `docs/devs/README.md` and root `AGENTS.md`.

## Documentation

- [User Guide](docs/user-guide/README.md)
- [Installation](docs/user-guide/installation.md)
- [Quick Start](docs/user-guide/quick-start.md)
- [Commands](docs/user-guide/commands/README.md)
- [Prompt Templates](docs/user-guide/prompt-templates.md)
- [Project Layout](docs/user-guide/project-layout.md)
- [Versioning Policy](docs/release/versioning.md)
- [Changelog](CHANGELOG.md)

## Development

```bash
pnpm install
pnpm build
pnpm test
```
