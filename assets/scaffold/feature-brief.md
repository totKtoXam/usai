# Feature Brief Request

Source materials:

{{source_materials:file[]: Source files or notes?}}

Feature/module name:

{{feature_name:text: Feature or module name?}}

## Instructions

Create one decision-complete feature implementation brief.

Include:

- business goal and success criteria;
- in-scope and out-of-scope behavior;
- actors, permissions and entry points;
- inputs, outputs and field tables;
- constraints, invariants and validation rules;
- public API, storage, integration or security impact;
- dependencies and missing requirements first;
- database/entity shape through domain concepts, not raw BA column names;
- implementation stages with verification gates;
- test plan;
- assumptions and open questions.

Do not invent business rules, routes, DTO fields, entities, services or abstractions that are not grounded in the source materials.

Preserve original business field names in field tables and add separate proposed repository/entity property names.

Do not treat UI labels, spreadsheet labels, database column suggestions or string lengths as implementation contracts unless the source explicitly makes them business requirements.

Save the generated artifact as Markdown. For module-level context, prefer:

```text
docs/devs/ai-workflows/modules/{module-name}/module.md
```

Output path:

{{output_path:text: Output path?}}
