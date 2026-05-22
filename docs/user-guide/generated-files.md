# Generated Files

Generated files must be deterministic and reviewable.

Expected generated locations:

```text
docs/devs/generated-prompts/
docs/devs/handoffs/
```

Generated agent-specific files are planned for V2 exports:

```text
AGENTS.md
CLAUDE.md
.cursor/rules/*.mdc
.codex/skills/*/SKILL.md
```

Canonical templates and rules remain in project Markdown/YAML/JSON files. Agent-specific exports are generated views, not the primary source of truth.
