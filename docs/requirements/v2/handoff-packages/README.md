# Feature: Handoff Packages

## Status

Postponed to V2.

## Цель

Handoff packages помогают передавать контекст между AI-agent sessions или между разработчиками. Это структурированные markdown-файлы, а не скрытый database state.

## Command

```bash
usai handoff create
```

## Functional Requirements

- Создать handoff markdown в `docs/devs/handoffs`.
- Спросить task summary, current status, changed files, risks, next steps.
- Позволить включить links на generated prompts и ADR.
- Использовать deterministic template.

## Acceptance Criteria

- Handoff файл можно открыть и понять без CLI.
- Handoff можно закоммитить и ревьюить.
- CLI не читает историю агента автоматически в v2.

## Out of Scope

- Автоматическое извлечение контекста из Codex/Claude/Cursor.
- Синхронизация между агентами.
- Long-term memory system.
