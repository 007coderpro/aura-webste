import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync("src/app/admin/blogs/AdminBlogDashboard.tsx", "utf8");

test("admin article preview appears next to the editor and gives visible toggle feedback", () => {
  assert.match(source, /{preview \? "Hide preview" : "Preview"}/);

  const contentFieldIndex = source.indexOf("value={form.content}");
  const previewIndex = source.indexOf("{preview && (");
  const seoSectionIndex = source.indexOf("SEO fields");

  assert.notEqual(contentFieldIndex, -1);
  assert.notEqual(previewIndex, -1);
  assert.notEqual(seoSectionIndex, -1);
  assert.ok(previewIndex > contentFieldIndex, "preview should render after the Markdown editor");
  assert.ok(previewIndex < seoSectionIndex, "preview should render before SEO and revision sections");
});

test("admin SEO content brief sits in the writing section before the Markdown editor", () => {
  const excerptFieldIndex = source.indexOf("Excerpt");
  const helperIndex = source.indexOf("SEO Content Brief");
  const contentFieldIndex = source.indexOf("value={form.content}");
  const applyHandlerIndex = source.indexOf("applyKeywordTarget");

  assert.notEqual(excerptFieldIndex, -1);
  assert.notEqual(helperIndex, -1);
  assert.notEqual(contentFieldIndex, -1);
  assert.notEqual(applyHandlerIndex, -1);
  assert.equal(source.includes("Keyword helper (optional)"), false);
  assert.ok(helperIndex > excerptFieldIndex, "helper should render after the excerpt field");
  assert.ok(helperIndex < contentFieldIndex, "helper should render before the Markdown editor");
});

test("admin SEO content brief includes writer guidance sections", () => {
  for (const label of ["Reader problem", "Article angle", "Product angle", "FAQ ideas", "SEO checklist"]) {
    assert.match(source, new RegExp(label));
  }
});

test("admin editor supports drag and drop blog images near Markdown content", () => {
  const mediaSectionIndex = source.indexOf("Blog images");
  const contentFieldIndex = source.indexOf("value={form.content}");
  const seoSectionIndex = source.indexOf("SEO fields");

  assert.notEqual(mediaSectionIndex, -1);
  assert.notEqual(contentFieldIndex, -1);
  assert.notEqual(seoSectionIndex, -1);
  assert.ok(mediaSectionIndex < contentFieldIndex, "image uploader should sit before the Markdown editor");
  assert.match(source, /onDrop=\{handleImageDrop\}/);
  assert.match(source, /accept="image\/\*"/);
  assert.match(source, /multiple/);
  assert.match(source, /blog-images/);
  assert.match(source, /insertImageIntoContent/);
  assert.equal(source.includes('label="Cover image URL"'), false);
});
