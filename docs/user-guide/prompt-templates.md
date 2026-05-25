# Prompt Templates

Prompt templates are Markdown files used by `usai prompt`.

Simple and Structured modes are currently implemented. Extended mode is planned for a later V1 subphase.

`usai prompt` supports both reusable template names and direct paths to workflow draft templates:

```bash
usai prompt application-usecase
usai prompt docs/ai-workflows/modules/railway-tracks/features/20260522-2115-update-railway-track/draft.md
```

## Simple Mode

One `.md` file without YAML frontmatter:

```md
# Task

Implement use case: {{use_case:text: Use case name?}}
```

The placeholder defines the console question.

## Structured Mode

One `.md` file with YAML frontmatter:

```md
---
id: feature-slice
questions:
  feature_name:
    label: Feature name?
    type: text
    required: true
---

# Task

Implement {{feature_name}}.
```

## Extended Mode

One `.md` template plus one external `.yaml` schema. Use this only for large or shared question schemas.

Extended Mode is planned but not implemented yet.

```text
docs/devs/prompt-templates/architecture-task.md
docs/devs/prompt-schemas/architecture-task.yaml
```

## Workflow Drafts

A generated workflow `draft.md` can itself be a Simple, Structured or Extended template. `usai` should parse it the same way as a reusable template and write the compiled result to `final.md`.

## Placeholder Types

Planned V1 input types:

```text
text
textarea
select
file
text[]
file[]
select[]
boolean
number
```
