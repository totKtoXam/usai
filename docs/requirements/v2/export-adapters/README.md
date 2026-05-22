# Feature: Agent Export Adapters

## Status

Postponed to V2.

## Цель

Export adapters преобразуют canonical rules/templates в agent-specific файлы. Это адаптация формата, а не конвертация проекта между агентами.

## Commands

```bash
usai export codex
usai export claude
usai export cursor
```

## Target Outputs

```text
codex  -> AGENTS.md / .codex/skills/*/SKILL.md / .codex/skills/*/agents/*.yaml
claude -> CLAUDE.md
cursor -> .cursor/rules/*.mdc
```

## Functional Requirements

- Прочитать canonical project rulesets.
- Прочитать canonical prompt/workflow templates, если adapter поддерживает agent skills.
- Сформировать agent-specific output по adapter rules.
- Не удалять существующие agent files без явного подтверждения.
- Поддержать dry-run.
- Показать список файлов, которые будут созданы или изменены.

## Codex Skill Export Requirements

Codex export должен уметь адаптировать portable workflow templates в `.codex/skills`:

```text
docs/devs/prompt-templates/feature-brief.md
-> .codex/skills/feature-brief/SKILL.md

docs/devs/prompt-templates/slice-prompts.md
-> .codex/skills/slice-prompts/SKILL.md
```

Если source template не содержит достаточной metadata для Codex skill, adapter должен создать deterministic wrapper с:

- skill name;
- description;
- process;
- references to canonical template files;
- optional `agents/openai.yaml` interface metadata.

Canonical source остается в `docs/devs` или project-configured template paths. `.codex/skills` является generated/exported view.

## Acceptance Criteria

- Export не требует AI.
- Export можно ревьюить через обычный git diff.
- CLI не обещает “convert project between agents”.
- Codex skill export не становится canonical source of truth.

## Out of Scope

- Multi-agent orchestration.
- Автоматическая миграция поведения одного агента в другой.
- Генерация новых правил через AI.
