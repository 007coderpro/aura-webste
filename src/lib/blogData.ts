import { unstable_cache } from "next/cache";
import type { BlogPost } from "@/lib/blogs";
import { blogPostFromRow, getRelatedBlogPosts, slugifyTitle } from "@/lib/blogs";
import { createSupabaseServerClient } from "@/lib/supabase";

const blogSelect = [
  "id",
  "created_at",
  "updated_at",
  "title",
  "slug",
  "excerpt",
  "content",
  "status",
  "published_at",
  "cover_image_url",
  "cover_image_alt",
  "seo_title",
  "seo_description",
  "canonical_url",
  "focus_keyword",
  "category",
  "robots_meta",
  "og_title",
  "og_description",
  "cta_type",
  "search_intent",
  "last_reviewed_at",
  "next_review_at",
  "tags",
  "faqs",
  "author_name",
].join(",");

export type BlogPostFilters = {
  limit?: number;
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
};

const publicBlogRevalidateSeconds = 60 * 60;
const blogPostsCacheTag = "blog-posts";
const blogSlugsCacheTag = "blog-slugs";
const blogRedirectsCacheTag = "blog-redirects";

const getCachedPublishedPostRows = unstable_cache(
  async (queryLimit: number) => {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("web")
      .select(blogSelect)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })
      .limit(queryLimit);

    if (error) {
      console.error("Failed to fetch published blog posts", error.message);
      return [];
    }

    return (data ?? []) as unknown as Record<string, unknown>[];
  },
  ["published-blog-post-rows"],
  {
    revalidate: publicBlogRevalidateSeconds,
    tags: [blogPostsCacheTag],
  },
);

const getCachedPublishedBlogSlugs = unstable_cache(
  async () => {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("web")
      .select("slug")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString());

    if (error) {
      console.error("Failed to fetch blog slugs", error.message);
      return [];
    }

    return (data ?? []) as unknown as Record<string, unknown>[];
  },
  ["published-blog-slugs"],
  {
    revalidate: publicBlogRevalidateSeconds,
    tags: [blogPostsCacheTag, blogSlugsCacheTag],
  },
);

function getCachedPublishedPostBySlug(slug: string) {
  return unstable_cache(
    async () => {
      const supabase = createSupabaseServerClient();
      const { data, error } = await supabase
        .from("web")
        .select(blogSelect)
        .eq("slug", slug)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .maybeSingle();

      if (error) {
        console.error("Failed to fetch blog post", error.message);
        return null;
      }

      return data ? (data as unknown as Record<string, unknown>) : null;
    },
    ["published-blog-post-by-slug", slug],
    {
      revalidate: publicBlogRevalidateSeconds,
      tags: [blogPostsCacheTag, getBlogPostCacheTag(slug)],
    },
  )();
}

function getCachedBlogRedirectBySlug(slug: string) {
  return unstable_cache(
    async () => {
      const supabase = createSupabaseServerClient();
      const { data, error } = await supabase
        .from("blog_redirects")
        .select("new_slug")
        .eq("old_slug", slug)
        .maybeSingle();

      if (error) {
        console.error("Failed to fetch blog redirect", error.message);
        return null;
      }

      return typeof data?.new_slug === "string" ? data.new_slug : null;
    },
    ["blog-redirect-by-slug", slug],
    {
      revalidate: publicBlogRevalidateSeconds,
      tags: [blogRedirectsCacheTag, getBlogRedirectCacheTag(slug)],
    },
  )();
}

export async function getPublishedPosts(options: number | BlogPostFilters = 24): Promise<BlogPost[]> {
  const filters = typeof options === "number" ? { limit: options } : options;
  const limit = filters.limit ?? 24;
  const needsLocalFilter = Boolean(filters.category || filters.tag || filters.author || filters.search);
  const rows = await getCachedPublishedPostRows(needsLocalFilter ? 1000 : limit);
  return rows
    .map((row) => blogPostFromRow(row))
    .filter((post) => matchesFilters(post, filters))
    .slice(0, limit);
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const data = await getCachedPublishedPostBySlug(slug);
  return data ? blogPostFromRow(data as unknown as Record<string, unknown>) : null;
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  const rows = await getCachedPublishedBlogSlugs();
  return rows
    .map((row) => (typeof row.slug === "string" ? row.slug : ""))
    .filter(Boolean);
}

export async function getRelatedPublishedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const candidates = await getPublishedPosts({ limit: 1000 });
  return getRelatedBlogPosts(post, candidates, limit);
}

export async function getBlogRedirectBySlug(slug: string): Promise<string | null> {
  return getCachedBlogRedirectBySlug(slug);
}

export async function getBlogTaxonomy() {
  const posts = await getPublishedPosts({ limit: 1000 });
  const categories = uniqueBySlug(posts.map((post) => post.category).filter(isString));
  const tags = uniqueBySlug(posts.flatMap((post) => post.tags));
  const authors = uniqueBySlug(posts.map((post) => post.author_name).filter(isString));

  return { categories, tags, authors };
}

function matchesFilters(post: BlogPost, filters: BlogPostFilters) {
  const categoryMatches = !filters.category || slugifyTitle(post.category ?? "") === filters.category;
  const tagMatches = !filters.tag || post.tags.some((tag) => slugifyTitle(tag) === filters.tag);
  const authorMatches = !filters.author || slugifyTitle(post.author_name) === filters.author;
  const search = filters.search?.trim().toLowerCase();
  const searchMatches =
    !search ||
    [post.title, post.excerpt, post.content, post.category ?? "", post.tags.join(" ")]
      .join(" ")
      .toLowerCase()
      .includes(search);

  return categoryMatches && tagMatches && authorMatches && searchMatches;
}

function uniqueBySlug(values: string[]) {
  const seen = new Set<string>();
  return values
    .map((name) => ({ name, slug: slugifyTitle(name) }))
    .filter((item) => {
      if (!item.slug || seen.has(item.slug)) {
        return false;
      }
      seen.add(item.slug);
      return true;
    });
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function getBlogPostCacheTag(slug: string) {
  return `blog-post:${slug}`;
}

function getBlogRedirectCacheTag(slug: string) {
  return `blog-redirect:${slug}`;
}
