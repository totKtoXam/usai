# Feature: Prompt Generation

## Цель

`usai prompt <template-name>` генерирует final prompt из markdown template и ответов разработчика. CLI должен быть deterministic: одинаковые входные данные дают одинаковый результат.

Главный принцип: новый template должен быть легко создать руками. Для простых случаев достаточно одного markdown-файла без отдельного YAML schema.

## Команда

```bash
usai prompt application-usecase
```

Опционально:

```bash
usai prompt application-usecase --output docs/devs/generated-prompts/custom.md
usai prompt application-usecase --answers answers.yaml
usai prompt application-usecase --no-interactive
```

## Template Modes

`usai` поддерживает три режима templates. Все режимы должны приводиться к одной внутренней модели:

```text
TemplateDefinition
  id
  body
  questions
  output
```

### 1. Simple Mode

Один `.md` файл без YAML frontmatter и без отдельного schema-файла. Placeholder сам содержит вопрос:

```md
# Task

Implement use case: {{ Use case name? }}

## Feature

{{ Feature name? }}
```

CLI извлекает placeholders, задает вопросы в консоли и подставляет ответы в те же места.

Simple Mode должен быть default mental model для разработчика.

### 2. Structured Mode

Один `.md` файл с YAML frontmatter. Frontmatter описывает metadata, output и вопросы, body остается markdown template:

```md
---
id: application-usecase
output:
  directory: docs/devs/generated-prompts
  filename: "{{date}}-{{use_case|kebab}}.md"

questions:
  use_case:
    label: Use case name?
    type: text
    required: true

  allowed_files:
    label: Allowed files?
    type: file[]
    required: true
---

# Task

Implement use case: {{use_case}}

## Allowed files

{{allowed_files}}
```

Structured Mode нужен, когда требуются типы, defaults, required-поля или custom output filename.

### 3. Extended Mode

Два файла: `.md` template и отдельный `.yaml` schema. Этот режим нужен только для больших или переиспользуемых question schemas.

```text
docs/devs/prompt-templates/application-usecase.md
docs/devs/prompt-schemas/application-usecase.yaml
```

Template может явно сослаться на schema:

```md
---
schema: application-usecase.yaml
---

# Task

Implement use case: {{use_case}}
```

Extended Mode следует использовать только когда:

- один schema переиспользуется несколькими templates;
- questions слишком большие для frontmatter;
- template нужно оставить чистым для чтения;
- schema генерируется или поддерживается отдельно.

## Placeholder Syntax

Simple Mode поддерживает compact placeholder syntax:

```text
{{ Question text? }}
{{key: Question text?}}
{{key:type: Question text?}}
{{key:select(option1,option2): Question text?}}
{{key}}
```

Правила:

- `{{ Question text? }}` задает вопрос и генерирует key из текста вопроса.
- `{{key: Question text?}}` задает вопрос с явным key.
- `{{key:type: Question text?}}` задает вопрос с явным key и типом.
- `{{key:select(...): Question text?}}` задает вопрос с вариантами ответа.
- `{{key}}` повторно использует уже полученный ответ.

## Supported Input Types

V1 должен поддержать:

```text
text       свободный однострочный текст
textarea   свободный многострочный текст
select     один вариант ответа
file       путь к одному файлу
text[]     список текстовых ответов
file[]     список путей к файлам
select[]   несколько вариантов ответа
boolean    yes/no, mainly for structured/extended mode
number     numeric value, mainly for structured/extended mode
```

Примеры:

```md
{{feature_name:text: Feature name?}}
{{description:textarea: Describe the task?}}
{{layer:select(Application,Domain,Infrastructure): Target layer?}}
{{allowed_files:file[]: Allowed files?}}
{{rulesets:file[]: Rulesets to include?}}
{{ruleset_targets:select[](always,feature,review): Ruleset targets?}}
{{need_tests:boolean: Need tests?}}
{{max_files:number: Maximum files to modify?}}
```

## Rendering Rules

- `text`, `textarea`, `select`, `file`, `boolean`, `number` рендерятся как plain text.
- `text[]`, `file[]`, `select[]` рендерятся как markdown list.
- Пустой optional list рендерится как `none`, если template не переопределяет формат.
- File inputs хранятся и рендерятся как path strings.
- CLI не должен автоматически читать содержимое file inputs в v1.
- Если один key встречается несколько раз, CLI задает вопрос один раз и переиспользует ответ.

## Functional Requirements

- Найти template по имени в configured prompt templates directory.
- Определить mode: simple, structured или extended.
- Извлечь вопросы из placeholders, frontmatter или external schema.
- Задать вопросы разработчику в CLI.
- Поддержать answers file для non-interactive режима.
- Провалидировать required-поля.
- Применить defaults, если они заданы.
- Подставить значения в markdown template.
- Сгенерировать файл в configured output directory.
- Вывести путь к созданному prompt.

## Output Requirements

- Имя файла по умолчанию должно быть стабильным и читаемым.
- Generated prompt должен содержать только итоговый markdown, без debug metadata.
- При конфликте имени файла CLI должен предложить overwrite или создать новое имя.

## Acceptance Criteria

- CLI генерирует prompt из simple `.md` template после `usai init`.
- Разработчик может создать новый template без отдельного YAML schema.
- Placeholder `{{ Use case name? }}` превращается в console question.
- Placeholder `{{allowed_files:file[]: Allowed files?}}` собирает список путей и рендерит markdown list.
- Placeholder `{{layer:select(Application,Domain): Target layer?}}` предлагает варианты ответа.
- Structured template может задать required/default/output metadata во frontmatter.
- Extended template может использовать отдельный YAML schema.

## Out of Scope

- AI-generated prompt content.
- Prompt quality scoring.
- Сложный template DSL с conditions и loops.
- Автоматический выбор rulesets на основе анализа кода.
- Автоматическое чтение содержимого файлов, указанных через `file`/`file[]`.
