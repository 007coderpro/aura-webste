import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";

import { siteUrl } from "../src/lib/supabase.ts";

test("siteUrl defaults to the live auravpn.net domain", () => {
  assert.equal(siteUrl, "https://auravpn.net");
});

test("example environment uses the live auravpn.net domain", () => {
  const envExample = readFileSync(".env.example", "utf8");

  assert.match(envExample, /^NEXT_PUBLIC_SITE_URL=https:\/\/auravpn\.net$/m);
});

test("authored blog canonical URLs use auravpn.net", () => {
  const files = [
    ...readdirSync("content/blog-drafts")
      .filter((file) => file.endsWith(".md") || file.endsWith(".sql"))
      .map((file) => `content/blog-drafts/${file}`),
    "docs/example-blog-post-best-vpn-for-torrenting.md",
  ];

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    assert.doesNotMatch(source, /canonical_url:\s*https:\/\/auravpn\.com\/blog\//, file);
    assert.doesNotMatch(source, /"canonical_url":\s*"https:\/\/auravpn\.com\/blog\//, file);
  }
});

test("source code does not emit auravpn.com canonical URLs", () => {
  const files = [
    "src/lib/supabase.ts",
    "src/lib/blogKeywordStrategy.ts",
    "src/app/admin/blogs/AdminBlogDashboard.tsx",
  ];

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    assert.doesNotMatch(source, /https:\/\/auravpn\.com\/blog\//, file);
    assert.doesNotMatch(source, /https:\/\/auravpn\.com["`]/, file);
  }
});
