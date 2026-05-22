# Quick Start

Build the CLI locally:

```bash
pnpm install
pnpm build
```

Initialize a project:

```bash
node dist/cli/index.js init
```

Create additional sample prompt templates:

```bash
node dist/cli/index.js init --with-samples
```

Re-run initialization safely:

```bash
node dist/cli/index.js init
```

Existing scaffold files are not overwritten unless `--force` is passed.
