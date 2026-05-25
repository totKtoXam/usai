# Generated Files

Generated files must be deterministic and reviewable.

Expected generated locations:

```text
docs/devs/ai-workflows/modules/{module-name}/module.md
docs/devs/ai-workflows/modules/{module-name}/features/{yyyyMMdd-HHmm}-{feature-name}/draft.md
docs/devs/ai-workflows/modules/{module-name}/features/{yyyyMMdd-HHmm}-{feature-name}/final.md
docs/devs/ai-workflows/modules/{module-name}/features/{yyyyMMdd-HHmm}-{feature-name}/completion-report.md
docs/devs/ai-workflows/modules/{module-name}/features/{yyyyMMdd-HHmm}-{feature-name}/handoff.md
```

`draft.md` is an intermediate prompt template. `final.md` is the compiled prompt that can be sent to an AI agent.

Generated agent-specific files are planned for V2 exports:

```text
AGENTS.md
CLAUDE.md
.cursor/rules/*.mdc
.codex/skills/*/SKILL.md
```

Canonical templates and rules remain in project Markdown/YAML/JSON files. Agent-specific exports are generated views, not the primary source of truth.
