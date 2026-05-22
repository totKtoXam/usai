# Infrastructure Layer Instructions

This layer owns integrations with external systems and machine-local state.

## Responsibilities

- Global cache location and cache reads/writes.
- GitHub or remote source download logic.
- Future source adapters for public repositories, local directories and authenticated sources.
- OS-specific path handling that should not leak into core behavior.

## Boundaries

- Do not put prompt rendering or ruleset installation decisions in this layer.
- Do not make network calls from tests unless the test is explicitly marked as optional smoke coverage.
- Do not rewrite project files from source update commands; source updates refresh cache only.
- Do not store canonical project content only in global cache.

## Design Rules

- Keep network-dependent code behind narrow adapter interfaces.
- Make cache paths injectable for tests.
- Prefer local fixtures over real remote services in automated tests.
- Surface errors with enough context: source name, URL/path and cache location.
- Add JSDoc to exported adapters, adapter options, cache APIs and source metadata types.
