---
id: feature-slice
output:
  directory: docs/devs/ai-workflows/modules/{{module_name}}/features/{{datetime}}-{{feature_name}}
  filename: final.md
questions:
  module_name:
    label: Module name?
    type: text
    required: true
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
