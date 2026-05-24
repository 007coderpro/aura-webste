import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync("src/components/BlogIndex.tsx", "utf8");

test("blog index does not show the resources eyebrow", () => {
  assert.doesNotMatch(source, /Aura VPN resources/);
});

test("blog search does not show a visible Search guides label", () => {
  assert.doesNotMatch(source, />\s*Search guides\s*</);
  assert.match(source, /aria-label="Search blog articles"/);
});
