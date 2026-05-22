# Developer Agent Workflow

This directory is for human-maintained prompt templates and handoff material.

Agents must not treat `docs/devs/` as source of truth for business logic, architecture, implementation scope or review facts. For implementation work, agents should use:

- root `AGENTS.md`;
- relevant layer `AGENTS.md` files;
- approved feature briefs or slice prompts;
- explicitly allowed source files;
- project docs and ADRs that are in scope.

## Recommended Flow

1. Create a feature brief from source materials.
2. Approve the feature brief as the source of truth.
3. Generate executable slice prompts or a focused lightweight prompt.
4. Run one implementation prompt at a time.
5. Review the changed slice.

## Prompt Templates

Reusable prompt templates live in `docs/devs/prompt-templates/`.

Generated prompts should be written to `docs/devs/generated-prompts/` unless the project config overrides the path.
