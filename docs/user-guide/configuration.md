# Configuration

Project configuration lives in:

```text
.usai/config.json
```

The default scaffold creates:

```json
{
  "version": 1,
  "paths": {
    "promptTemplates": "docs/devs/prompt-templates",
    "promptSchemas": "docs/devs/prompt-schemas",
    "generatedPrompts": "docs/devs/generated-prompts",
    "handoffs": "docs/devs/handoffs",
    "rulesets": "docs/rulesets",
    "decisions": "docs/decisions",
    "roadmap": "docs/roadmap.md"
  },
  "rules": {
    "defaultSource": "agent-rules-books"
  }
}
```

Future config resolution order:

```text
CLI flags
-> project .usai/config.json
-> global config
-> built-in defaults
```
