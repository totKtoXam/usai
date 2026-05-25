import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cliPath = resolve(repositoryRoot, "dist/cli/index.js");
const tempRoot = resolve(repositoryRoot, ".tmp-prompt-tests");

test.after(async () => {
  if (tempRoot.startsWith(repositoryRoot) && tempRoot !== repositoryRoot) {
    await rm(tempRoot, { recursive: true, force: true });
  }
});

test("prompt renders named simple template with answers file", async () => {
  const projectRoot = await createInitializedProject();
  const answersPath = resolve(projectRoot, "answers.yaml");
  const outputPath = resolve(projectRoot, "final.md");
  await writeFile(
    answersPath,
    [
      "use_case: UpdateRailwayTrack",
      "feature_name: Railway tracks",
      "allowed_files:",
      "  - src/Application/Tracks",
      "forbidden_files: []",
      "max_files: 5",
      "need_tests: true",
      "rulesets:",
      "  - docs/rulesets/always/clean-code.nano.md",
      "",
    ].join("\n"),
    "utf8",
  );

  const result = await runCli(
    [
      "prompt",
      "application-usecase",
      "--answers",
      answersPath,
      "--no-interactive",
      "--output",
      outputPath,
    ],
    projectRoot,
  );

  assert.equal(result.code, 0, result.stderr);
  assert.match(result.stdout, /Generated prompt:/);
  assert.ok(existsSync(outputPath));
  assert.match(await readFile(outputPath, "utf8"), /UpdateRailwayTrack/);
  assert.match(
    await readFile(outputPath, "utf8"),
    /- src\/Application\/Tracks/,
  );
  assert.match(
    await readFile(outputPath, "utf8"),
    /Forbidden files:\r?\n\r?\nnone/,
  );
});

test("prompt renders direct draft path into explicit final path", async () => {
  const projectRoot = await createInitializedProject();
  const featureRoot = resolve(
    projectRoot,
    "docs/ai-workflows/modules/tracks/features/20260525-1200-update-track",
  );
  const draftPath = resolve(featureRoot, "draft.md");
  const finalPath = resolve(featureRoot, "final.md");
  const answersPath = resolve(featureRoot, "answers.yaml");
  await mkdir(featureRoot, { recursive: true });
  await writeFile(
    draftPath,
    [
      "# Slice",
      "",
      "Implement {{use_case:text: Use case name?}} in {{layer:select(Application,Domain): Layer?}}.",
      "",
    ].join("\n"),
    "utf8",
  );
  await writeFile(
    answersPath,
    ["use_case: UpdateTrack", "layer: Application", ""].join("\n"),
    "utf8",
  );

  const result = await runCli(
    [
      "prompt",
      draftPath,
      "--answers",
      answersPath,
      "--no-interactive",
      "--output",
      finalPath,
    ],
    projectRoot,
  );

  assert.equal(result.code, 0, result.stderr);
  assert.equal(
    await readFile(finalPath, "utf8"),
    "# Slice\n\nImplement UpdateTrack in Application.\n",
  );
});

test("prompt fails clearly when required answer is missing in no-interactive mode", async () => {
  const projectRoot = await createInitializedProject();
  const answersPath = resolve(projectRoot, "answers.yaml");
  await writeFile(answersPath, "use_case: UpdateRailwayTrack\n", "utf8");

  const result = await runCli(
    [
      "prompt",
      "application-usecase",
      "--answers",
      answersPath,
      "--no-interactive",
      "--output",
      "final.md",
    ],
    projectRoot,
  );

  assert.equal(result.code, 1);
  assert.match(result.stderr, /Missing required answer: feature_name/);
});

test("prompt protects existing output unless force is used", async () => {
  const projectRoot = await createInitializedProject();
  const answersPath = resolve(projectRoot, "answers.yaml");
  const outputPath = resolve(projectRoot, "final.md");
  await writeFile(
    answersPath,
    [
      "use_case: UpdateRailwayTrack",
      "feature_name: Railway tracks",
      "allowed_files: []",
      "forbidden_files: []",
      "max_files: 5",
      "need_tests: true",
      "rulesets: []",
      "",
    ].join("\n"),
    "utf8",
  );
  await writeFile(outputPath, "existing\n", "utf8");

  const conflictResult = await runCli(
    [
      "prompt",
      "application-usecase",
      "--answers",
      answersPath,
      "--no-interactive",
      "--output",
      outputPath,
    ],
    projectRoot,
  );

  assert.equal(conflictResult.code, 1);
  assert.match(conflictResult.stderr, /Output file already exists/);
  assert.equal(await readFile(outputPath, "utf8"), "existing\n");

  const forceResult = await runCli(
    [
      "prompt",
      "application-usecase",
      "--answers",
      answersPath,
      "--no-interactive",
      "--output",
      outputPath,
      "--force",
    ],
    projectRoot,
  );

  assert.equal(forceResult.code, 0, forceResult.stderr);
  assert.notEqual(await readFile(outputPath, "utf8"), "existing\n");
});

test("prompt renders structured template output metadata", async () => {
  const projectRoot = await createInitializedProject([
    "init",
    "--with-samples",
  ]);
  const answersPath = resolve(projectRoot, "answers.yaml");
  await writeFile(
    answersPath,
    [
      "module_name: tracks",
      "feature_name: Update Track",
      "layer: Application",
      "allowed_files:",
      "  - src/Application/Tracks",
      "",
    ].join("\n"),
    "utf8",
  );

  const result = await runCli(
    ["prompt", "feature-slice", "--answers", answersPath, "--no-interactive"],
    projectRoot,
  );

  assert.equal(result.code, 0, result.stderr);
  const outputPath = result.stdout.replace("Generated prompt:", "").trim();
  assert.match(
    outputPath,
    /docs[\\/]ai-workflows[\\/]modules[\\/]tracks[\\/]features[\\/]\d{8}-\d{4}-Update Track[\\/]final\.md$/,
  );
  assert.match(
    await readFile(outputPath, "utf8"),
    /Implement feature slice for Update Track/,
  );
});

test("prompt uses structured defaults when answers are omitted", async () => {
  const projectRoot = await createInitializedProject();
  const templatePath = resolve(
    projectRoot,
    "docs/devs/prompt-templates/defaulted.md",
  );
  await writeFile(
    templatePath,
    [
      "---",
      "id: defaulted",
      "questions:",
      "  feature_name:",
      "    label: Feature name?",
      "    type: text",
      "    default: Default Feature",
      "---",
      "",
      "# {{feature_name}}",
      "",
    ].join("\n"),
    "utf8",
  );

  const result = await runCli(
    [
      "prompt",
      "defaulted",
      "--no-interactive",
      "--output",
      "defaulted-final.md",
    ],
    projectRoot,
  );

  assert.equal(result.code, 0, result.stderr);
  assert.equal(
    await readFile(resolve(projectRoot, "defaulted-final.md"), "utf8"),
    "# Default Feature\n",
  );
});

test("prompt reports extended templates as not implemented in phase 2.2", async () => {
  const projectRoot = await createInitializedProject();
  const structuredPath = resolve(projectRoot, "structured.md");
  await writeFile(
    structuredPath,
    [
      "---",
      "schema: structured.yaml",
      "---",
      "",
      "# Task",
      "{{name}}",
      "",
    ].join("\n"),
    "utf8",
  );

  const result = await runCli(
    ["prompt", structuredPath, "--no-interactive", "--output", "final.md"],
    projectRoot,
  );

  assert.equal(result.code, 1);
  assert.match(result.stderr, /Phase 2.3/);
});

async function createInitializedProject(initArgs = ["init"]) {
  await mkdir(tempRoot, { recursive: true });
  const projectRoot = await mkdtemp(resolve(tempRoot, "prompt-"));
  await runCli(initArgs, projectRoot);

  return projectRoot;
}

function runCli(args, cwd) {
  return new Promise((resolvePromise) => {
    const child = spawn(process.execPath, [cliPath, ...args], {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("close", (code) => {
      resolvePromise({
        code,
        stderr,
        stdout,
      });
    });
  });
}
