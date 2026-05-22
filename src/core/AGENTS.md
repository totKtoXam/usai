# Core Layer Instructions

This layer owns deterministic domain behavior for `usai`.

## Responsibilities

- Project root detection and path resolution.
- Scaffold planning and file conflict decisions.
- Config loading and merge rules.
- Prompt template parsing, question modeling and rendering.
- Ruleset catalog, search and installation decisions.
- Pure helpers for markdown, templates and filesystem abstractions.

## Boundaries

- Do not call AI models from this layer.
- Do not perform network access from this layer.
- Do not write terminal output from this layer.
- Do not depend on CLI argument parsing details.
- Do not depend on package manager or install mechanism.

## Design Rules

- Prefer deterministic functions with explicit inputs and outputs.
- Keep filesystem effects isolated behind focused functions.
- Return structured results instead of printing side effects.
- Keep templates simple; do not introduce conditions, loops or a complex DSL in v1.
- Preserve user files by default and require explicit force behavior for overwrites.
- Add JSDoc to every exported domain type, exported function and exported constant.
- Keep templates, config defaults, path logic, result models and filesystem writes in separate files.

## Testing

- Add unit tests for parsers, merge logic and rendering.
- Add golden tests for generated markdown.
- Use temporary project directories for integration tests.
