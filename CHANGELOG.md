# Changelog

All notable user-facing changes to `usai` are documented in this file.

This project follows the versioning policy in [docs/release/versioning.md](docs/release/versioning.md).

## Unreleased

### Added

- Initial Node.js + TypeScript CLI baseline.
- `usai init` project scaffold command.
- `usai init --root <path>` for explicit target directory initialization.
- `usai init` scaffold now creates `docs/devs/ai-workflows/modules` for module and feature workflow artifacts.
- Commander-based CLI parser, Node.js 24 runtime target and tsup bundled build.
- Public user guide skeleton.

### Changed

- `usai init` now initializes the current directory by default instead of walking up to the nearest parent `.git` directory.
- Project requirements, test plan and implementation plan docs.
