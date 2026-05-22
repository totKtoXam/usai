# Feature: Project Initialization

## Цель

`usai init` создает минимальную структуру проекта для AI-assisted development workflows. Команда должна дать разработчику готовый layout для templates, optional schemas, rulesets, generated prompts, handoffs и ADR.

## Команда

```bash
usai init
```

Опционально:

```bash
usai init --force
usai init --minimal
usai init --with-samples
```

## Functional Requirements

- Найти project root из текущей директории.
- Создать `.usai/config.json`, если он отсутствует.
- Создать директории `docs/devs`, `docs/rulesets`, `docs/decisions`.
- Создать базовый `AGENTS.md`, если он отсутствует.
- Создать `ADR-0000-template.md`, если он отсутствует.
- Создать пример simple prompt template для `application-usecase`.
- При `--with-samples` создать также structured и extended template examples.
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

## Out of Scope

- Установка внешних rulesets.
- Export в agent-specific formats.
- Автоматический анализ структуры исходного кода проекта.
