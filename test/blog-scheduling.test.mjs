import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const blogDataSource = readFileSync("src/lib/blogData.ts", "utf8");
const schedulingMigrationPath = "supabase/migrations/20260526093115_publish_due_scheduled_blog_posts.sql";

test("public blog data queries only published posts", () => {
  const publishedStatusFilters = blogDataSource.match(/\.eq\("status", "published"\)/g) ?? [];

  assert.ok(publishedStatusFilters.length >= 3);
  assert.doesNotMatch(blogDataSource, /\.in\("status", \["published", "scheduled"\]\)/);
});

test("scheduled blog posts are promoted by a database cron job", () => {
  assert.equal(existsSync(schedulingMigrationPath), true);

  const migrationSource = readFileSync(schedulingMigrationPath, "utf8");

  assert.match(migrationSource, /create or replace function public\.publish_due_scheduled_blog_posts\(\)/);
  assert.match(migrationSource, /where status = 'scheduled'/);
  assert.match(migrationSource, /published_at <= timezone\('utc'::text, now\(\)\)/);
  assert.match(migrationSource, /select cron\.schedule\(\s*'publish-due-scheduled-blog-posts'/);
  assert.match(migrationSource, /create policy "web_public_read_published"/);
  assert.match(migrationSource, /revoke execute on function public\.publish_due_scheduled_blog_posts\(\) from anon/);
  assert.match(migrationSource, /revoke execute on function public\.publish_due_scheduled_blog_posts\(\) from authenticated/);
  assert.doesNotMatch(migrationSource, /ARRAY\['published'::text, 'scheduled'::text\]/);
});
