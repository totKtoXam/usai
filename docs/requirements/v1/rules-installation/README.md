# Feature: Rules Installation And Update

## Цель

Rules installation копирует выбранный ruleset из source в project rulesets directory. Пользователь явно выбирает rule, size и target.

## Commands

```bash
usai rules install <rule-name> --size <nano|mini|full> --target <target>
usai rules install <rule-name> --size <nano|mini|full> --target <target> --source <name>
usai rules update
usai rules update --source <name>
```

## Targets

```text
always
architectural
feature
feature-completion
review
```

## Functional Requirements

- Resolve source by explicit `--source` or effective default source.
- Ensure source cache is available.
- Resolve requested rule by name and size.
- Copy selected markdown file into `docs/rulesets/<target>/`.
- Preserve readable filename, for example `clean-code.nano.md`.
- Avoid overwrite unless `--force` is passed or user confirms.
- Print installed file path.
- `rules update` updates source cache only.

## Update Semantics

`usai rules update` must not rewrite installed project rules automatically. It only refreshes cached source contents. Reinstalling or upgrading project files requires explicit install/force command.

## Acceptance Criteria

- Installing `clean-code` with `--size nano --target always` creates `docs/rulesets/always/clean-code.nano.md`.
- Installing the same rule twice without `--force` does not silently overwrite local modifications.
- `rules update` changes only cache, not project rulesets.

## Out of Scope

- Bulk upgrade of all installed rules.
- Conflict-aware merge.
- Rule dependency resolution.
- Private source authentication.
