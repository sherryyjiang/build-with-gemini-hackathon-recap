import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("public submission data excludes contact information", async () => {
  const source = await readFile(new URL("../data/submissions.json", import.meta.url), "utf8");
  const submissions = JSON.parse(source);
  assert.equal(submissions.length, 61);
  assert.equal(source.includes("@gmail.com"), false);
  assert.equal(source.includes("Contact Email"), false);
  assert.equal(submissions.every((submission) => submission.projectLinkAudit && submission.videoLinkAudit), true);
});

test("public build order keeps finalists first and scrambles the ranked source order", async () => {
  const source = await readFile(new URL("../data/submissions.json", import.meta.url), "utf8");
  const submissions = JSON.parse(source);
  const finalists = ["OrcAIPlay", "Project Rehab", "Gemma Companion", "familiar", "The Heirloom", "Remember AI", "Sentry"];
  assert.deepEqual(submissions.slice(0, 7).map(({ name }) => name), finalists);
  assert.equal(submissions.every(({ publicId }, index) => publicId === index + 1), true);
  assert.notDeepEqual(submissions.slice(7).map(({ id }) => id), [...Array(54)].map((_, index) => index + 8));
});

test("recap includes every confirmed winner", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  for (const project of ["Gemma Companion", "Project Rehab", "OrcAIPlay", "Sentry"]) {
    assert.match(page, new RegExp(project));
  }
});
