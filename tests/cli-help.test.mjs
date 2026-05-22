import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cliPath = resolve(repositoryRoot, "dist/cli/index.js");

test("prints help", async () => {
  const { stdout, stderr } = await execFileAsync(
    process.execPath,
    [cliPath, "--help"],
    {
      cwd: repositoryRoot,
    },
  );

  assert.equal(stderr, "");
  assert.match(stdout, /Usage:/);
  assert.match(stdout, /usai \[command\] \[options\]/);
});

test("prints init help", async () => {
  const { stdout, stderr } = await execFileAsync(
    process.execPath,
    [cliPath, "init", "--help"],
    {
      cwd: repositoryRoot,
    },
  );

  assert.equal(stderr, "");
  assert.match(stdout, /Initialize UsAI files/);
  assert.match(stdout, /usai init \[options\]/);
});

test("prints package version", async () => {
  const packageJson = JSON.parse(
    await readFile(resolve(repositoryRoot, "package.json"), "utf8"),
  );

  const { stdout, stderr } = await execFileAsync(
    process.execPath,
    [cliPath, "--version"],
    {
      cwd: repositoryRoot,
    },
  );

  assert.equal(stderr, "");
  assert.equal(stdout.trim(), packageJson.version);
});
