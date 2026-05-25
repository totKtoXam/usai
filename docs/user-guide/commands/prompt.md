# `usai prompt`

Generates a final prompt from a Markdown template.

## Usage

```bash
usai prompt <template> [options]
```

`<template>` can be:

- a template name from `docs/devs/prompt-templates`;
- a direct path to a `.md` template, such as a workflow `draft.md`.

## Options

| Option             | Description                                            |
| ------------------ | ------------------------------------------------------ |
| `--answers <path>` | Read answers from a YAML file.                         |
| `--force`          | Overwrite an existing output file.                     |
| `--no-interactive` | Fail instead of asking for missing answers.            |
| `--output <path>`  | Write the generated prompt to an explicit output path. |
| `-h`, `--help`     | Show command help.                                     |

## Examples

```bash
usai prompt application-usecase --answers answers.yaml --no-interactive --output final.md
```

```bash
usai prompt docs/ai-workflows/modules/tracks/features/20260525-1200-update-track/draft.md \
  --answers answers.yaml \
  --no-interactive \
  --output docs/ai-workflows/modules/tracks/features/20260525-1200-update-track/final.md
```

## Current Scope

V1 currently supports Simple and Structured Mode templates. Extended templates are planned for a later Phase 2 subphase.

Simple Mode placeholders:

```text
{{ Question text? }}
{{key: Question text?}}
{{key:type: Question text?}}
{{key:select(option1,option2): Question text?}}
{{key}}
```
