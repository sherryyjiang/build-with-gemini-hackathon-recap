import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("public submission data excludes contact information", async () => {
  const source = await readFile(new URL("../data/submissions.json", import.meta.url), "utf8");
  const submissions = JSON.parse(source);
  assert.equal(submissions.length, 61);
  assert.equal(source.includes("@gmail.com"), false);
  assert.equal(source.includes("Contact Email"), false);
});

test("recap includes every confirmed winner", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  for (const project of ["Gemma Companion", "Project Rehab", "OrcAIPlay", "Sentry"]) {
    assert.match(page, new RegExp(project));
  }
});
