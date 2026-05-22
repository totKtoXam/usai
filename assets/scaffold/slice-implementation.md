# Slice Implementation Prompt

Slice prompt:

{{slice_prompt:file: Slice prompt path?}}

## Instructions

Implement only the selected slice.

Follow:

- root `AGENTS.md`;
- nearest layer `AGENTS.md`;
- the slice prompt's Source Of Truth;
- Read Scope, Write Scope, Do Not Open and Do Not Edit sections.

Do not read files outside Read Scope without approval.

Do not edit files outside Write Scope without approval.

Do not create business rules, routes, DTO fields, entities, services or abstractions that are not present in the approved source of truth.

Update documentation only when it is included in Documentation Scope or when the change triggers the project's Docs Maintenance Gate. Ask before editing docs outside Write Scope.

Before finishing, run or report the Verification Gate:

{{verification_gate:text: Verification command or manual gate?}}

Final response must include:

- implementation summary;
- changed files;
- verification result;
- blockers or residual risks;
- docs impact.
