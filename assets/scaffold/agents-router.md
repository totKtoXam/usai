# AI Development Instructions

Use this file as a router for project AI instructions. Do not load every ruleset by default.

## Always Follow

- Keep implementation scope bounded by the user's request.
- Read only the Markdown docs, nearest `AGENTS.md` files and source files needed for the current task.
- Ask before opening broad folders or files outside the stated scope.
- Do not use `docs/devs/` as source of truth for business logic, architecture or implementation context. It is a human-maintained prompt/template area.
- Do not call AI from deterministic project tooling unless the user explicitly asked for an agent to perform the work.

Always follow:

- `docs/rulesets/always/*`

For feature implementation:

- `docs/rulesets/feature/*`
- relevant source-level AGENTS.md files

For architecture tasks:

- `docs/rulesets/architectural/*`

For feature completion:

- `docs/rulesets/feature-completion/*`

For review:

- `docs/rulesets/review/*`

## Docs Maintenance Gate

After code or workflow changes, check whether documentation or agent instructions must be updated.

Update relevant Markdown when changes affect:

- public API, routes, CLI commands or generated outputs;
- architecture, persistence, integration or security behavior;
- project structure, layer boundaries or agent workflow;
- reusable prompt templates, schemas or rulesets.

If docs do not need changes, state `Docs impact: not required` and give a short reason in the final response.

## Layer Guides

If this repository has nested `AGENTS.md` files, read the nearest one before changing files in that area.
