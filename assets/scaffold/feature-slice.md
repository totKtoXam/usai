---
id: feature-slice
output:
  directory: docs/devs/generated-prompts
  filename: "{{date}}-{{feature_name}}-slice.md"
questions:
  feature_name:
    label: Feature name?
    type: text
    required: true
  layer:
    label: Target layer?
    type: select
    options:
      - Application
      - Domain
      - Infrastructure
  allowed_files:
    label: Allowed files?
    type: file[]
---

# Task

Implement feature slice for {{feature_name}}.

## Layer

{{layer}}

## Allowed files

{{allowed_files}}
