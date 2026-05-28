import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../src/lib/blogData.ts", import.meta.url), "utf8");

test("public blog data uses Next data cache instead of noStore", () => {
  assert.match(source, /import\s*\{\s*unstable_cache\s*\}\s*from\s*"next\/cache"/);
  assert.doesNotMatch(source, /unstable_noStore|noStore\(\)/);
});

test("public blog cache revalidates after one hour", () => {
  assert.match(source, /const publicBlogRevalidateSeconds = 60 \* 60;/);
  assert.match(source, /revalidate:\s*publicBlogRevalidateSeconds/);
});

test("public blog cache has broad and item-level invalidation tags", () => {
  assert.match(source, /const blogPostsCacheTag = "blog-posts";/);
  assert.match(source, /const blogSlugsCacheTag = "blog-slugs";/);
  assert.match(source, /function getBlogPostCacheTag\(slug: string\)/);
  assert.match(source, /getBlogPostCacheTag\(slug\)/);
});
