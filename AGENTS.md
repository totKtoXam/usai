# UsAI Development Instructions

This repository implements `usai`: a deterministic Node.js + TypeScript CLI for reusable AI-assisted development workflows.

## Always Follow

- Keep the CLI deterministic. Do not add AI model calls inside `usai`.
- Treat markdown/yaml/json files as the canonical project assets.
- Keep generated files stable, readable and easy to review in git diffs.
- Prefer small, explicit modules over generic frameworks or hidden abstractions.
- Do not add plugin systems, workflow orchestration or project conversion behavior in v1.
- Do not use placeholder files such as `.gitkeep` to keep empty directories.
- Add JSDoc to exported functions, exported types, exported constants and non-trivial internal helpers.
- Split files by responsibility; avoid collecting unrelated config, templates, parsing and IO in one module.
- Keep public user documentation current for user-facing CLI behavior.
- Follow `docs/release/versioning.md` for versioning decisions.
- Update `CHANGELOG.md` under `Unreleased` for every user-facing change.

## Project References

- Requirements: `docs/requirements/README.md`
- Public user guide: `docs/user-guide/README.md`
- Versioning policy: `docs/release/versioning.md`
- Changelog: `CHANGELOG.md`
- V1 implementation plan: `docs/requirements/implementation-plan/v1.md`
- V1 test plan: `docs/requirements/test-plan/v1.md`

## Public Documentation Gate

When changing any user-facing CLI command, option, config field, template format, ruleset workflow, generated output or installation behavior, update:

- `README.md` for installation, quick start or major command behavior;
- `docs/user-guide/**` for detailed user documentation;
- `docs/user-guide/commands/<command>.md` for command-specific behavior;
- `CHANGELOG.md` under `Unreleased`.

Do not document planned commands as available commands. Keep internal requirements and engineering plans in `docs/requirements/`, not in the public README.

## Layer Routing

- CLI command parsing and terminal output: `src/cli/AGENTS.md`
- Deterministic domain logic: `src/core/AGENTS.md`
- External systems, cache and source adapters: `src/infrastructure/AGENTS.md`

Load only the layer instructions relevant to the files being changed.

## Verification

For code changes, run the narrowest useful checks first, then the full phase checks before finishing:

```bash
pnpm build
pnpm lint
pnpm format
pnpm test
```
