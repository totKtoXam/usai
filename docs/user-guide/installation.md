# Installation

`usai` is not published yet.

For local development:

```bash
node --version # requires Node.js 22.12+, Node.js 24 LTS recommended
pnpm install
pnpm build
node dist/cli/index.js --help
```

Future installation channels may include:

- npm global install;
- GitHub Releases binaries;
- Homebrew;
- Scoop;
- WinGet.

The CLI is designed around the global `usai` command, not around `npx` as the primary user experience.
