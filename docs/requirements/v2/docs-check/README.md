# Feature: Docs And Agent Instructions Check

## Status

Postponed to V2.

## Цель

`usai docs check` проверяет, что project documentation и agent instruction files не отстали от структуры проекта. Фича выросла из практики docs maintenance gate: после изменений кода агент или разработчик должен быстро понять, нужно ли обновить docs/AGENTS.

Команда остается deterministic и offline.

## Commands

```bash
usai docs check
usai docs check --strict
```

## Functional Requirements

- Проверить наличие root `AGENTS.md`.
- Проверить наличие configured layer/project `AGENTS.md` файлов.
- Проверить, что `docs/devs/` помечен как human-only prompt/template area.
- Проверить наличие required documentation entrypoints:
  - architecture overview;
  - project structure;
  - roadmap;
  - ADR template.
- Проверить configured module/layer map, если проект его использует.
- Вернуть non-zero exit code при нарушениях.
- Вывести точные paths и missing sections.

## Config Requirements

Project config может описывать docs check policy:

```json
{
  "docs": {
    "check": {
      "requiredFiles": ["AGENTS.md", "docs/roadmap.md"],
      "layerAgentGlobs": ["src/*/AGENTS.md"],
      "humanOnlyPaths": ["docs/devs"]
    }
  }
}
```

## Acceptance Criteria

- Команда работает без network access.
- Команда не меняет файлы.
- Ошибки пригодны для исправления вручную.
- `--strict` может включать project-specific checks, но v2 не должен требовать AST-анализ исходного кода.

## Out of Scope

- Автоматическое исправление docs.
- AI-based documentation review.
- Repo-wide source-code semantic analysis.
- Mandatory namespace map для всех языков и фреймворков.
