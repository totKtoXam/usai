# Feature: Config Resolution

## Цель

Config resolution объединяет CLI flags, project config, global config и built-in defaults в одно effective configuration. Эта фича нужна, чтобы `usai` работал как глобальный CLI, но вел себя по-разному в разных проектах.

## Config Priority

```text
CLI flags
-> project .usai/config.json
-> global config
-> built-in defaults
```

## Project Config

```json
{
  "version": 1,
  "paths": {
    "promptTemplates": "docs/devs/prompt-templates",
    "promptSchemas": "docs/devs/prompt-schemas",
    "aiWorkflows": "docs/devs/ai-workflows",
    "rulesets": "docs/rulesets",
    "decisions": "docs/decisions",
    "roadmap": "docs/roadmap.md"
  },
  "rules": {
    "defaultSource": "agent-rules-books"
  }
}
```

`promptSchemas` используется только для extended prompt templates. Simple и structured templates должны работать без отдельного schema-файла.

`aiWorkflows` указывает на canonical directory для module/feature workflow artifacts: `module.md`, `draft.md`, `final.md`, `completion-report.md` и `handoff.md`.

## Global Config

```json
{
  "version": 1,
  "rules": {
    "defaultSource": "agent-rules-books",
    "sources": [
      {
        "name": "agent-rules-books",
        "type": "github",
        "url": "https://github.com/ciembor/agent-rules-books",
        "branch": "main"
      }
    ]
  }
}
```

## Functional Requirements

- Найти project config относительно current working directory.
- Загрузить global config из OS-specific config path.
- Применить built-in default source `agent-rules-books`, если source не задан.
- Валидировать config через schema.
- Сообщать точный путь и поле при ошибке конфигурации.
- Поддержать future migration через `version`.

## Acceptance Criteria

- CLI работает в проекте без global config.
- CLI работает с global default source.
- Project config может переопределить пути.
- CLI flags имеют максимальный приоритет.

## Out of Scope

- Секреты и auth tokens.
- Удаленный config service.
- Автоматическая миграция между major versions.
