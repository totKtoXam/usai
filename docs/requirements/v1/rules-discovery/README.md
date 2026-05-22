# Feature: Rules Discovery

## Цель

Rules discovery позволяет посмотреть доступные rulesets в выбранном source и найти нужные правила перед установкой.

## Commands

```bash
usai rules list
usai rules list --source agent-rules-books
usai rules search clean
usai rules search clean --source agent-rules-books
```

## Functional Requirements

- Прочитать catalog выбранного source.
- Показать имя rule, доступные sizes и краткое описание, если оно доступно.
- Поддержать поиск по имени, тегам и описанию.
- Поддержать фильтр по size.
- Поддержать фильтр по target, если metadata source это позволяет.
- Если source еще не кэширован, предложить выполнить update/download.

## Rule Metadata

Минимальная metadata-модель:

```json
{
  "name": "clean-code",
  "sizes": ["nano", "mini", "full"],
  "description": "Clean Code rules for AI-assisted development",
  "tags": ["clean-code", "quality", "review"]
}
```

Если внешний source не содержит metadata, CLI может построить catalog из структуры файлов.

## Acceptance Criteria

- `usai rules list` работает после обновления default source.
- `usai rules search clean` возвращает rules с `clean` в имени.
- Пустой результат поиска отображается как нормальное состояние, а не ошибка.

## Out of Scope

- Semantic search.
- AI-based recommendations.
- Автоматический выбор правил по diff.
