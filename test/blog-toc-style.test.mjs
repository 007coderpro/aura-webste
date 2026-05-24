import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync("src/app/blog/[slug]/page.tsx", "utf8");

test("blog table of contents uses compact scannable rows", () => {
  assert.match(source, /In this article/);
  assert.match(source, /sectionNumber/);
  assert.doesNotMatch(source, /sm:grid-cols-2/);
  assert.match(source, /grid-cols-1/);
  assert.match(source, /gap-3/);
  assert.match(source, /item\.level === 3/);
  assert.match(source, /aria-label={`Jump to section/);
  assert.match(source, /bg-gradient-to-br/);
  assert.match(source, /from-white\/\[0\.10\]/);
  assert.match(source, /shadow-\[0_24px_80px_rgba\(12,7,64,0\.34\)\]/);
  assert.match(source, /uppercase tracking-normal text-blue-100/);
  assert.match(source, /border-l-2 border-blue-300\/20/);
  assert.match(source, /bg-\[#1a1260\]\/55/);
  assert.match(source, /min-h-16/);
  assert.match(source, /px-5 py-4/);
});
