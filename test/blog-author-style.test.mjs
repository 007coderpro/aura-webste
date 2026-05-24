import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync("src/app/blog/[slug]/page.tsx", "utf8");

test("blog author is shown as a quiet byline, not a highlighted card", () => {
  assert.doesNotMatch(source, /UserRound/);
  assert.doesNotMatch(source, /bg-blue-500\/20 p-2/);
  assert.doesNotMatch(source, /mt-6 flex items-center gap-3 rounded-lg border border-white\/10 bg-white\/5 p-4/);
  assert.match(source, /By <span className="font-medium text-gray-200">/);
});
