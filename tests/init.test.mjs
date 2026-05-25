import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cliPath = resolve(repositoryRoot, "dist/cli/index.js");
const tempRoot = resolve(repositoryRoot, ".tmp-tests");

test.after(async () => {
  if (tempRoot.startsWith(repositoryRoot) && tempRoot !== repositoryRoot) {
    await rm(tempRoot, { recursive: true, force: true });
  }
});

test("init creates default project scaffold in the current directory", async () => {
  const projectRoot = await createTempProject();
  const nestedDirectory = resolve(projectRoot, "src/Application");
  await mkdir(nestedDirectory, { recursive: true });

  const result = await runCli(["init"], nestedDirectory);

  assert.equal(result.code, 0, result.stderr);
  assert.match(result.stdout, /Created directories:/);
  assert.match(result.stdout, /Created files:/);
  assert.ok(existsSync(resolve(nestedDirectory, ".usai/config.json")));
  assert.ok(existsSync(resolve(nestedDirectory, "AGENTS.md")));
  assert.ok(existsSync(resolve(nestedDirectory, "docs/devs/README.md")));
  assert.ok(
    existsSync(resolve(nestedDirectory, "docs/devs/ai-workflows/modules")),
  );
  assert.ok(
    !existsSync(resolve(nestedDirectory, "docs/devs/generated-prompts")),
  );
  assert.ok(!existsSync(resolve(nestedDirectory, "docs/devs/handoffs")));
  assert.ok(
    existsSync(
      resolve(
        nestedDirectory,
        "docs/devs/prompt-templates/application-usecase.md",
      ),
    ),
  );
  assert.ok(existsSync(resolve(nestedDirectory, "docs/rulesets/always")));
  assert.ok(
    !existsSync(resolve(nestedDirectory, "docs/rulesets/always/.gitkeep")),
  );
  assert.ok(!existsSync(resolve(projectRoot, ".usai/config.json")));
});

test("init can target an explicit root directory", async () => {
  const projectRoot = await createTempProject();
  const nestedDirectory = resolve(projectRoot, "src/Application");
  await mkdir(nestedDirectory, { recursive: true });

  const result = await runCli(["init", "--root", projectRoot], nestedDirectory);

  assert.equal(result.code, 0, result.stderr);
  assert.ok(existsSync(resolve(projectRoot, ".usai/config.json")));
  assert.ok(!existsSync(resolve(nestedDirectory, ".usai/config.json")));
});

test("init is idempotent when files are unchanged", async () => {
  const projectRoot = await createTempProject();

  const firstResult = await runCli(["init"], projectRoot);
  const secondResult = await runCli(["init"], projectRoot);

  assert.equal(firstResult.code, 0, firstResult.stderr);
  assert.equal(secondResult.code, 0, secondResult.stderr);
  assert.match(secondResult.stdout, /Skipped unchanged files:/);
  assert.doesNotMatch(secondResult.stdout, /Conflicting files:/);
});

test("init reports conflicts and force overwrites them", async () => {
  const projectRoot = await createTempProject();
  await runCli(["init"], projectRoot);
  await writeFile(
    resolve(projectRoot, "AGENTS.md"),
    "custom instructions\n",
    "utf8",
  );

  const conflictResult = await runCli(["init"], projectRoot);

  assert.equal(conflictResult.code, 1);
  assert.match(conflictResult.stdout, /Conflicting files:/);
  assert.match(conflictResult.stdout, /AGENTS\.md/);
  assert.match(conflictResult.stderr, /not overwritten/);
  assert.equal(
    await readFile(resolve(projectRoot, "AGENTS.md"), "utf8"),
    "custom instructions\n",
  );

  const forceResult = await runCli(["init", "--force"], projectRoot);
  const agentsContent = await readFile(
    resolve(projectRoot, "AGENTS.md"),
    "utf8",
  );

  assert.equal(forceResult.code, 0, forceResult.stderr);
  assert.match(forceResult.stdout, /Overwritten files:/);
  assert.match(agentsContent, /^# AI Development Instructions/);
  assert.match(agentsContent, /Docs Maintenance Gate/);
  assert.match(agentsContent, /docs\/devs/);
});

test("init minimal skips sample prompt and ADR files", async () => {
  const projectRoot = await createTempProject();

  const result = await runCli(["init", "--minimal"], projectRoot);

  assert.equal(result.code, 0, result.stderr);
  assert.ok(existsSync(resolve(projectRoot, ".usai/config.json")));
  assert.ok(existsSync(resolve(projectRoot, "AGENTS.md")));
  assert.ok(existsSync(resolve(projectRoot, "docs/devs/prompt-templates")));
  assert.ok(existsSync(resolve(projectRoot, "docs/devs/ai-workflows/modules")));
  assert.ok(!existsSync(resolve(projectRoot, "docs/devs/README.md")));
  assert.ok(
    !existsSync(
      resolve(projectRoot, "docs/devs/prompt-templates/application-usecase.md"),
    ),
  );
  assert.ok(
    !existsSync(resolve(projectRoot, "docs/decisions/ADR-0000-template.md")),
  );
});

test("init with samples creates structured and extended prompt examples", async () => {
  const projectRoot = await createTempProject();

  const result = await runCli(["init", "--with-samples"], projectRoot);

  assert.equal(result.code, 0, result.stderr);
  assert.ok(
    existsSync(
      resolve(projectRoot, "docs/devs/prompt-templates/application-usecase.md"),
    ),
  );
  const config = JSON.parse(
    await readFile(resolve(projectRoot, ".usai/config.json"), "utf8"),
  );
  assert.equal(config.paths.aiWorkflows, "docs/devs/ai-workflows");
  assert.equal(config.paths.generatedPrompts, undefined);
  assert.equal(config.paths.handoffs, undefined);
  assert.ok(
    existsSync(
      resolve(projectRoot, "docs/devs/prompt-templates/feature-slice.md"),
    ),
  );
  assert.ok(
    existsSync(
      resolve(projectRoot, "docs/devs/prompt-templates/architecture-task.md"),
    ),
  );
  assert.ok(
    existsSync(
      resolve(projectRoot, "docs/devs/prompt-schemas/architecture-task.yaml"),
    ),
  );
  assert.ok(
    existsSync(
      resolve(projectRoot, "docs/devs/prompt-templates/feature-brief.md"),
    ),
  );
  assert.ok(
    existsSync(
      resolve(projectRoot, "docs/devs/prompt-templates/slice-prompts.md"),
    ),
  );
  assert.ok(
    existsSync(
      resolve(
        projectRoot,
        "docs/devs/prompt-templates/slice-implementation.md",
      ),
    ),
  );
  assert.ok(
    existsSync(
      resolve(projectRoot, "docs/devs/prompt-templates/review-slice.md"),
    ),
  );
});

async function createTempProject() {
  await mkdir(tempRoot, { recursive: true });
  const projectRoot = await mkdtemp(resolve(tempRoot, "init-"));
  await mkdir(resolve(projectRoot, ".git"));

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
        stdout,
        stderr,
      });
    });
  });
}
