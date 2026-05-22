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
codex  -> AGENTS.md / .codex/skills/*/SKILL.md
claude -> CLAUDE.md
cursor -> .cursor/rules/*.mdc
```

## Functional Requirements

- Прочитать canonical project rulesets.
- Сформировать agent-specific output по adapter rules.
- Не удалять существующие agent files без явного подтверждения.
- Поддержать dry-run.
- Показать список файлов, которые будут созданы или изменены.

## Acceptance Criteria

- Export не требует AI.
- Export можно ревьюить через обычный git diff.
- CLI не обещает “convert project between agents”.

## Out of Scope

- Multi-agent orchestration.
- Автоматическая миграция поведения одного агента в другой.
- Генерация новых правил через AI.
