# Slice Review Prompt

Slice name:

{{slice_name:text: Slice name?}}

Implemented files:

{{implemented_files:file[]: Implemented files?}}

Expected scope:

{{expected_scope:textarea: Expected scope?}}

## Review Focus

Review as a code reviewer. Findings first, ordered by severity.

Check:

- scope violations;
- missing validation;
- incorrect dependency direction;
- missing docs or agent-instruction updates;
- missing XML/JSDoc comments on public API-facing code;
- generated output instability;
- missing verification gate;
- files changed outside Write Scope;
- business rules or contracts invented outside the approved source of truth.

For each finding, include exact file and line reference when possible.

If no issues are found, state that clearly and list residual test gaps or risk.
