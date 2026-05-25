# Quick Start

Build the CLI locally:

```bash
node --version # requires Node.js 24+
pnpm install
pnpm build
```

Initialize a project:

```bash
node dist/cli/index.js init
```

`init` writes into the current directory. To initialize another directory explicitly:

```bash
node dist/cli/index.js init --root path/to/project
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
