# UsAI CLI Implementation Plan

## Цель

Implementation plan описывает порядок разработки `usai` без преждевременного усложнения. Основной принцип: сначала сделать deterministic CLI, который полезен на одном проекте, затем расширять установку rulesets и только после этого добавлять agent export adapters.

## Delivery Strategy

```text
Phase 0
  repository and engineering baseline

Phase 1
  project initialization

Phase 2
  prompt generation MVP

Phase 3
  config resolution

Phase 4
  local rules sources and installation

Phase 5
  GitHub source cache and agent-rules-books

Phase 6
  packaging and release hardening

Phase 7+
  v2 features
```

Каждая phase должна завершаться working CLI state и минимальным набором тестов. Не нужно ждать полной архитектуры, чтобы получить первую полезную команду.

## Engineering Principles

- Core domain должен оставаться independent от способа установки CLI.
- Файловые операции должны работать через project root abstraction.
- Prompt rendering должен иметь golden tests с точным markdown output.
- Network-dependent functionality должна быть изолирована от основной логики.
- Нельзя добавлять AI calls, plugin system или workflow engine в v1.

## Plans

- [V1 Implementation Plan](v1.md)
- [V2 Implementation Plan](v2.md)
