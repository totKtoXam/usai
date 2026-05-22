# UsAI CLI Test Plan

## Цель

Test plan описывает, как проверять `usai` как deterministic CLI. Основной риск системы - не алгоритмическая сложность, а незаметные изменения в markdown/yaml rendering, path resolution, config precedence и ruleset installation behavior.

Тесты должны подтверждать:

- одинаковые inputs дают одинаковые generated files;
- CLI не перезаписывает пользовательские файлы без явного действия;
- project-local behavior не зависит от глобального состояния, кроме явно заданных defaults;
- generated markdown остается review-friendly;
- v2 adapters не превращаются в project conversion или AI orchestration.

## Test Layers

```text
unit tests
  parser, config merge, rendering, path helpers

golden tests
  template input -> exact generated markdown

integration tests
  CLI command against temporary project directory

contract tests
  source catalog shape, rule metadata, adapter outputs

manual smoke tests
  installed CLI in PATH on Windows/Linux/macOS
```

## Test Data Strategy

- Использовать temporary directories для integration tests.
- Держать fixtures рядом с тестами.
- Хранить expected markdown outputs как golden files.
- Не использовать реальные home directories в автоматических тестах.
- Для network-related rules sources использовать mocked/local source by default.
- Реальный `agent-rules-books` проверять отдельным optional smoke test.

## Common Acceptance Checks

- Все команды возвращают non-zero exit code при ошибке.
- Ошибки содержат путь или config key, который вызвал проблему.
- Generated files имеют стабильный порядок секций и списков.
- Повторный запуск idempotent-команд не меняет файлы.
- `--force` явно покрыт тестами там, где команда может перезаписать файл.
