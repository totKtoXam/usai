# Feature: Metrics Collection

## Status

Postponed to V2.

## Цель

Metrics collection собирает простые engineering metrics вокруг generated prompts, rulesets и handoffs. Фича не должна превращаться в telemetry platform.

## Command

```bash
usai metrics collect
```

## Possible Metrics

- Количество generated prompts.
- Используемые prompt templates.
- Установленные rulesets по target.
- Наличие handoff файлов.
- Наличие ADR.

## Functional Requirements

- Читать только локальные project files.
- Выводить результат в terminal и optional markdown/json report.
- Не отправлять telemetry наружу.
- Не собирать sensitive content без явного действия пользователя.

## Acceptance Criteria

- Metrics работают offline.
- Output можно закоммитить как markdown report, если пользователь этого хочет.
- Нет скрытой отправки данных.

## Out of Scope

- Cloud dashboard.
- User tracking.
- Productivity scoring.
- AI-based quality evaluation.
