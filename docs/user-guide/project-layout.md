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
    ai-workflows/
      modules/

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
- `docs/devs/`: human-maintained prompt templates and workflow artifacts.
- `docs/devs/prompt-templates/`: reusable prompt templates.
- `docs/devs/prompt-schemas/`: optional schemas for extended templates.
- `docs/devs/ai-workflows/`: module, feature, prompt, report and handoff workflow artifacts.
- `docs/rulesets/`: reusable rules grouped by target.
- `docs/decisions/`: ADR files.

`docs/devs/` is not source of truth for implementation context unless the user explicitly asks to use it.

## AI Workflows

Recommended workflow artifact layout:

```text
docs/devs/ai-workflows/
  modules/
    {module-name}/
      module.md

      features/
        {yyyyMMdd-HHmm}-{feature-name}/
          draft.md
          final.md
          completion-report.md
          handoff.md
```

- `module.md`: module-level prompt or brief.
- `draft.md`: intermediate prompt template that can be passed to `usai prompt`.
- `final.md`: compiled prompt intended for an AI agent.
- `completion-report.md`: implementation result summary.
- `handoff.md`: context package for another agent, reviewer or session.
