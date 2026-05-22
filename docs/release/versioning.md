# Versioning Policy

`usai` follows Semantic Versioning after the first stable release.

Current pre-release version:

```text
0.0.0
```

## Version Format

```text
MAJOR.MINOR.PATCH
```

Before `1.0.0`, breaking changes may happen in minor versions, but they must still be documented in `CHANGELOG.md`.

## Patch Version

Increment `PATCH` for user-visible fixes that do not change CLI contracts:

- bug fix in an existing command;
- typo or formatting fix in generated output that preserves the contract;
- documentation correction;
- packaging fix that does not change command behavior.

Example:

```text
0.2.1 -> 0.2.2
```

## Minor Version

Increment `MINOR` for backward-compatible user-facing additions:

- new command;
- new option that does not change existing behavior;
- new supported template mode or input type;
- new ruleset source type;
- new generated file type that is opt-in;
- improved docs or examples for new workflows.

During `0.x`, use minor versions for planned V1/V2 milestones.

Example:

```text
0.2.0 -> 0.3.0
```

## Major Version

Increment `MAJOR` for breaking changes after `1.0.0`:

- removing or renaming commands/options;
- changing default output paths;
- changing `.usai/config.json` schema incompatibly;
- changing generated prompt/ruleset formats in a way that breaks existing workflows;
- changing ruleset target semantics.

Before `1.0.0`, document these as breaking changes under the next minor release.

## Changelog Rules

Every user-facing change must update [CHANGELOG.md](../../CHANGELOG.md).

Use the `Unreleased` section while developing:

```md
## Unreleased

### Added

- ...

### Changed

- ...

### Fixed

- ...

### Removed

- ...
```

Use only sections that apply.

## Documentation Rules

When changing user-facing behavior, update:

- `README.md` if quick start, installation or major command behavior changes;
- `docs/user-guide/**` for detailed user documentation;
- `docs/user-guide/commands/<command>.md` for command behavior;
- `CHANGELOG.md` under `Unreleased`.

Do not document planned commands as available commands.
