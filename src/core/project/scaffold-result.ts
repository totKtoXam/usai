/**
 * Result of a project scaffold run.
 */
export type ScaffoldResult = {
  projectRoot: string;
  createdDirectories: string[];
  existingDirectories: string[];
  createdFiles: string[];
  skippedFiles: string[];
  overwrittenFiles: string[];
  conflictedFiles: string[];
};

/**
 * Creates an empty scaffold result for the resolved project root.
 */
export function createScaffoldResult(projectRoot: string): ScaffoldResult {
  return {
    projectRoot,
    createdDirectories: [],
    existingDirectories: [],
    createdFiles: [],
    skippedFiles: [],
    overwrittenFiles: [],
    conflictedFiles: [],
  };
}
