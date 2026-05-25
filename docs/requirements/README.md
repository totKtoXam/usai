# UsAI CLI Requirements

## Назначение системы

`usai` - deterministic CLI для переиспользуемых AI-assisted development workflows. Утилита не использует AI внутри себя и не принимает инженерные решения за разработчика. Ее задача - обслуживать переносимые markdown/yaml/json артефакты: prompt templates, optional schemas, rulesets, handoff-пакеты и будущие agent export adapters.

Основная модель:

```text
markdown template + optional question schema + developer answers
-> workflow draft.md or final.md
```

Система должна быть предсказуемой, воспроизводимой и удобной для code review. Все важные артефакты проекта должны оставаться обычными файлами в репозитории, а не скрытым состоянием CLI.

## Архитектурные принципы

- CLI не вызывает AI-модели и не генерирует смысловое содержание магически.
- Canonical source - markdown/yaml/json файлы в проекте.
- Global config/cache нужны только для пользовательских настроек, источников rulesets и локального кэша.
- Project config управляет путями и поведением конкретного репозитория.
- Generated files должны быть стабильными и diff-friendly.
- Rulesets загружаются выборочно по задаче, а не все сразу.
- Export в форматы Codex/Claude/Cursor является адаптацией canonical артефактов, а не конвертацией проекта.

## Целевая модель установки

`usai` устанавливается как глобальная команда в `PATH`:

```bash
usai init
usai prompt application-usecase
usai rules install clean-code --size nano --target always
```

Node.js 22.12+ + TypeScript используются как основной стек реализации. Node.js 24 LTS является recommended runtime, но package должен работать на актуальной Node 22 LTS линии. На первом этапе допустима установка через npm/pnpm, но архитектура должна оставаться friendly к будущей сборке standalone binaries под Windows, Linux и macOS.

## Implementation Stack

```text
Runtime: Node.js 22.12+ minimum, Node.js 24 LTS recommended
Language: TypeScript
Package manager: pnpm
CLI parser: commander
Interactive prompts: @inquirer/prompts
Config/schema validation: zod
YAML: yaml
Frontmatter: custom splitter + yaml parser
Template rendering: custom {{...}} renderer
Terminal colors: picocolors
File discovery: fast-glob
Tests: node:test
Build: tsup bundled CLI + tsc --noEmit typecheck
```

## Конфигурационная модель

Приоритет настроек:

```text
CLI flags
-> project .usai/config.json
-> global config
-> built-in defaults
```

Глобальный конфиг хранит пользовательские defaults и sources:

```text
Windows: %APPDATA%/usai/config.json
macOS/Linux: ~/.config/usai/config.json
```

Глобальный кэш хранит скачанные/обновленные внешние sources:

```text
Windows: %LOCALAPPDATA%/usai/cache
macOS/Linux: ~/.cache/usai
```

Проектный конфиг хранится в:

```text
<project>/.usai/config.json
```

## Project Layout

Рекомендуемая структура после `usai init`:

```text
.usai/
  config.json

docs/
  devs/
    README.md
    prompt-templates/
    prompt-schemas/      # optional, for extended templates only
    ai-workflows/
      modules/
        {module-name}/
          module.md
          features/
            {yyyyMMdd-HHmm}-{feature-name}/
              draft.md
              final.md
              completion-report.md
              handoff.md

  rulesets/
    always/
    architectural/
    feature/
    feature-completion/
    review/

  decisions/
    ADR-0000-template.md

  roadmap.md

AGENTS.md
```

`AGENTS.md` в корне должен быть маленьким router-файлом. Он описывает, какие группы rulesets подключать для разных типов задач, но не содержит все правила внутри себя.

`docs/devs/` предназначен для людей-разработчиков, reusable prompt templates и AI workflow artifacts. Агент не должен читать этот каталог как source of truth для implementation context, business logic или review facts без явной просьбы пользователя.

`docs/devs/ai-workflows/` является canonical зоной для module/feature workflow lifecycle:

```text
Module understanding
-> Feature planning
-> Slice draft
-> Final prompt
-> Implementation
-> Completion report / handoff
```

Public user docs live in `README.md` and `docs/user-guide/`. Internal product/technical requirements stay in `docs/requirements/`.

## Core Modules

```text
cli
  command parsing, flags, interactive prompts

config
  global/project config loading, defaults, validation

project
  project root detection, path resolution, scaffold creation

prompt
  template mode detection, question flow, answer validation, rendering

rules
  source catalog, search/list/install/update

templates
  deterministic markdown template rendering

markdown
  formatting helpers, future AST-based markdown utilities

cache
  downloaded sources and metadata
```

## V1 Scope

V1 включает только deterministic workflow:

- `usai init`
- `usai prompt <template-name>`
- `usai rules sources list|add|remove|set-default`
- `usai rules list [--source <name>]`
- `usai rules search <query> [--source <name>]`
- `usai rules install <rule-name> --size <nano|mini|full> --target <target> [--source <name>]`
- `usai rules update [--source <name>]`

## Feature Requirements

V1:

- [Project Initialization](v1/init/README.md)
- [Prompt Generation](v1/prompt-generation/README.md)
- [Config Resolution](v1/config-resolution/README.md)
- [Rules Sources](v1/rules-sources/README.md)
- [Rules Discovery](v1/rules-discovery/README.md)
- [Rules Installation And Update](v1/rules-installation/README.md)

V2:

- [Agent Export Adapters](v2/export-adapters/README.md)
- [Docs And Agent Instructions Check](v2/docs-check/README.md)
- [Handoff Packages](v2/handoff-packages/README.md)
- [Metrics Collection](v2/metrics/README.md)

Test plan:

- [Test Plan Overview](test-plan/README.md)
- [V1 Test Plan](test-plan/v1.md)
- [V2 Test Plan](test-plan/v2.md)

Implementation plan:

- [Implementation Plan Overview](implementation-plan/README.md)
- [V1 Implementation Plan](implementation-plan/v1.md)
- [V2 Implementation Plan](implementation-plan/v2.md)

Release docs:

- [Versioning Policy](../release/versioning.md)

## V2 Scope

V2 не должен расширять CLI в сторону multi-agent orchestration. Допустимые направления:

- `usai export codex`
- `usai export claude`
- `usai export cursor`
- `usai docs check`
- `usai handoff create`
- `usai metrics collect`

Эти команды должны работать поверх canonical markdown/yaml/json артефактов, а не вводить отдельную закрытую модель данных.

## Основные риски

- Превращение CLI в AI workflow platform вместо простого deterministic tool.
- Слишком сложный template DSL.
- Скрытое состояние, которое сложно ревьюить.
- Автоматическое переписывание правил без явного действия пользователя.
- Попытка конвертировать проекты между агентами вместо экспорта адаптированных файлов.
- Зависимость core-логики от конкретного package manager или способа установки.
