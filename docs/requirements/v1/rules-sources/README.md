# Feature: Rules Sources

## Цель

Rules sources позволяют выбирать, откуда устанавливать rulesets. `agent-rules-books` должен быть default source, но пользователь может вручную выбрать другой источник.

## Commands

```bash
usai rules sources list
usai rules sources add <name> <url>
usai rules sources remove <name>
usai rules sources set-default <name>
```

## Default Source

```json
{
  "name": "agent-rules-books",
  "type": "github",
  "url": "https://github.com/ciembor/agent-rules-books",
  "branch": "main"
}
```

## Functional Requirements

- Поддержать built-in default source `agent-rules-books`.
- Дать пользователю добавить named source.
- Дать пользователю выбрать default source.
- Позволить любой rules-команде принять `--source <name>`.
- Если `--source` не передан, использовать effective default source.
- Не удалять built-in source физически, но позволить выбрать другой default.

## Supported Source Types In V1

- `github` public repository.
- `local` directory path.

## Future Source Types

- `git` repository with SSH/HTTPS auth.
- private GitHub source.
- internal registry.

## Acceptance Criteria

- `usai rules install clean-code --size nano --target always` использует default source.
- `usai rules install clean-code --size nano --target always --source agent-rules-books` использует явно выбранный source.
- `usai rules sources list` показывает built-in, global и project sources.

## Out of Scope

- Token management.
- Private repositories.
- Central marketplace.
