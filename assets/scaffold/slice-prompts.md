# Slice Prompt Generation Request

Approved feature brief:

{{feature_brief:file: Approved feature brief path?}}

Feature/module name:

{{feature_name:text: Feature or module name?}}

## Instructions

Use the approved feature brief as the only source of truth.

Do not re-analyze original BA files or source materials unless the user explicitly allows it.

If the brief has blocking open questions, missing contracts or unclear write scope, create a blockers report instead of implementation prompts.

Choose:

- `lightweight-slice-mode` for a local change touching 1-3 files, one layer and no new entity/schema/API/architecture decision.
- `full-slice-mode` for multi-layer features, multiple use cases, new schema/entity/API, migrations, integrations or dependency chain.
- `blockers-report` when safe write scope cannot be determined.

Every generated prompt must include:

- Mode;
- Goal;
- Source Of Truth;
- Source Facts;
- Read Scope;
- Write Scope;
- Do Not Open;
- Do Not Edit;
- Dependencies;
- Blockers;
- Documentation Scope;
- Verification Gate.

Do not include `docs/devs/` in implementation Read Scope or Write Scope.

Output directory:

{{output_directory:text: Output directory for generated slice prompts?}}
