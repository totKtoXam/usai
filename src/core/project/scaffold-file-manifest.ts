/**
 * Describes one scaffold asset and its target path in an initialized project.
 */
export type ScaffoldFileEntry = {
  asset: string;
  target: string;
};

/**
 * Files created by default unless `usai init --minimal` is used.
 */
export const defaultScaffoldFileEntries: ScaffoldFileEntry[] = [
  {
    asset: "project-config.json",
    target: ".usai/config.json",
  },
  {
    asset: "agents-router.md",
    target: "AGENTS.md",
  },
  {
    asset: "devs-readme.md",
    target: "docs/devs/README.md",
  },
  {
    asset: "application-usecase.md",
    target: "docs/devs/prompt-templates/application-usecase.md",
  },
  {
    asset: "adr-template.md",
    target: "docs/decisions/ADR-0000-template.md",
  },
];

/**
 * Files created only by `usai init --with-samples`.
 */
export const sampleScaffoldFileEntries: ScaffoldFileEntry[] = [
  {
    asset: "feature-slice.md",
    target: "docs/devs/prompt-templates/feature-slice.md",
  },
  {
    asset: "architecture-task.md",
    target: "docs/devs/prompt-templates/architecture-task.md",
  },
  {
    asset: "architecture-task.yaml",
    target: "docs/devs/prompt-schemas/architecture-task.yaml",
  },
  {
    asset: "feature-brief.md",
    target: "docs/devs/prompt-templates/feature-brief.md",
  },
  {
    asset: "slice-prompts.md",
    target: "docs/devs/prompt-templates/slice-prompts.md",
  },
  {
    asset: "slice-implementation.md",
    target: "docs/devs/prompt-templates/slice-implementation.md",
  },
  {
    asset: "review-slice.md",
    target: "docs/devs/prompt-templates/review-slice.md",
  },
];
