# Project Layout

`usai init` creates a project-local structure:

```text
.usai/
  config.json

docs/
  devs/
    README.md
    prompt-templates/
    prompt-schemas/
    generated-prompts/
    handoffs/

  rulesets/
    always/
    architectural/
    feature/
    feature-completion/
    review/

  decisions/
    ADR-0000-template.md

AGENTS.md
```

## Responsibilities

- `AGENTS.md`: router for agent instructions and docs maintenance rules.
- `docs/devs/`: human-maintained prompt templates and workflow notes.
- `docs/devs/prompt-templates/`: reusable prompt templates.
- `docs/devs/prompt-schemas/`: optional schemas for extended templates.
- `docs/devs/generated-prompts/`: generated final prompts.
- `docs/devs/handoffs/`: handoff packages between agents or sessions.
- `docs/rulesets/`: reusable rules grouped by target.
- `docs/decisions/`: ADR files.

`docs/devs/` is not source of truth for implementation context unless the user explicitly asks to use it.
