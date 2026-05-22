# Prompt Templates

Prompt templates are Markdown files used by `usai prompt`.

The command is planned for V1. This page describes the intended template format.

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

```text
docs/devs/prompt-templates/architecture-task.md
docs/devs/prompt-schemas/architecture-task.yaml
```

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
