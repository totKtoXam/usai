# Feature: Project Initialization

## Цель

`usai init` создает минимальную структуру проекта для AI-assisted development workflows. Команда должна дать разработчику готовый layout для templates, optional schemas, rulesets, AI workflow artifacts и ADR.

## Команда

```bash
usai init
```

Опционально:

```bash
usai init --force
usai init --minimal
usai init --root path/to/project
usai init --with-samples
```

## Functional Requirements

- Использовать current working directory как target root по умолчанию.
- Поддержать explicit target root через `--root <path>`.
- Не подниматься автоматически к родительскому `.git` при `usai init`.
- Создать `.usai/config.json`, если он отсутствует.
- Создать директории `docs/devs`, `docs/ai-workflows/modules`, `docs/rulesets`, `docs/decisions`.
- Создать базовый `AGENTS.md`, если он отсутствует.
- Создать `docs/devs/README.md`, который объясняет human-only назначение developer templates.
- Создать `ADR-0000-template.md`, если он отсутствует.
- Создать пример simple prompt template для `application-usecase`.
- Создать config path `paths.aiWorkflows`, указывающий на `docs/ai-workflows`.
- Root `AGENTS.md` должен включать router rules, context-scope guard и Docs Maintenance Gate.
- При `--with-samples` создать также structured, extended и workflow template examples.
- Public docs для команды `init` должны быть отражены в `README.md`, `docs/user-guide/commands/init.md` и `CHANGELOG.md`.
- Не перезаписывать существующие файлы без `--force`.
- Вывести список созданных, пропущенных и конфликтующих файлов.

## Non-Functional Requirements

- Команда должна быть idempotent.
- Все сгенерированные файлы должны быть readable markdown/json/yaml.
- В режиме по умолчанию команда не должна создавать большой ruleset catalog.
- Ошибки должны объяснять, какой путь заблокировал initialization.

## Acceptance Criteria

- После запуска `usai init` можно выполнить `usai prompt application-usecase` без отдельного YAML schema-файла.
- Повторный запуск без `--force` не меняет существующие файлы.
- Root `AGENTS.md` остается router-файлом, а не дампом всех правил.
- Root `AGENTS.md` явно запрещает читать `docs/devs` как source of truth для implementation context.
- `usai init --with-samples` создает reusable templates для feature brief, slice prompts, slice implementation и review prompt.
- Public user docs описывают только реализованное поведение `usai init`, а planned commands помечены как planned.

## Out of Scope

- Установка внешних rulesets.
- Export в agent-specific formats.
- Автоматический анализ структуры исходного кода проекта.
- Генерация `.codex/skills`, `CLAUDE.md`, `.cursor/rules/*.mdc` или других agent-specific файлов.
- CLI-команда для проверки актуальности docs/AGENTS.
