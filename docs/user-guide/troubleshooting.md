# Troubleshooting

## `usai init` reports conflicting files

`usai init` does not overwrite existing scaffold files by default.

Review the conflicting paths. If overwriting is intended, run:

```bash
usai init --force
```

## Command is not found

For local development, run through Node:

```bash
node dist/cli/index.js --help
```

Global installation is not published yet.

## Docs and command behavior disagree

The implementation is the source of truth for current behavior. Update the public docs and `CHANGELOG.md` when user-facing behavior changes.
