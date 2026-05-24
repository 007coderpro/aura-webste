# Aura VPN Blog Admin

The website now uses the Supabase `public.web` table as the blog post store.

## Admin Access

The dashboard is available at `/admin/blogs`.

Access is controlled by Supabase Auth and RLS. A signed-in user must have one of the supported app metadata roles:

```json
{
  "role": "admin"
}
```

Set it in the Supabase dashboard on the admin user record, then sign out and sign back in so the JWT refreshes.
Supported roles are `admin`, `editor`, `writer`, and `viewer`. `admin` can delete posts, `admin`/`editor`/`writer`
can save posts, and `viewer` can read the dashboard.

## Publishing Flow

1. Sign in at `/admin/blogs`.
2. Create a post with title, slug, excerpt, Markdown content, SEO title, SEO description, focus keyword, category, tags, and optional FAQs.
3. Keep the post as `draft` while editing.
4. Use `scheduled` with a future publish date for timed publication, or `published` for immediate publication.
5. Use `draft` to unpublish or `archived` to hide old content.
6. Use the revision history panel to load a previous version, then save to restore it.
7. Published and due scheduled posts appear at `/blog/[slug]`, `/blog`, taxonomy pages, and `/sitemap.xml`.

## SEO Fields

- `seo_title`: page title and Open Graph title.
- `seo_description`: meta description and Open Graph description.
- `focus_keyword`: internal editorial target.
- `tags`: Article schema keywords and blog card labels.
- `faqs`: one `Question | Answer` pair per line; rendered on the article page and included as FAQPage JSON-LD.
- `canonical_url`: optional override if an article has a canonical source.
- `cover_image_url`: optional article image for Open Graph and page display.
- `cover_image_alt`: required when a cover image is set.
- `category`: powers `/blog/category/[category-slug]` and related-post suggestions.
- `robots_meta`: `index,follow` or `noindex,nofollow`.
- `og_title` / `og_description`: optional social preview overrides.
- `cta_type`: `download`, `signup`, or `none`.
- `search_intent`, `last_reviewed_at`, `next_review_at`: editorial planning and update reminders.

## Public Blog Features

- `/blog` supports search plus category/tag links.
- `/blog/category/[category-slug]`, `/blog/tag/[tag-slug]`, and `/blog/author/[author-slug]` render crawlable archives.
- Article pages render a table of contents, author box, publish/update dates, CTA block, FAQ section, related posts, canonical metadata, Open Graph/Twitter metadata, and Article/FAQ JSON-LD.
- Changing a slug creates a row in `blog_redirects`; old slugs permanently redirect to the new URL.
- Updating a post captures the previous row in `blog_revisions` so editors can restore earlier versions.
- Blog interactions emit GA4-compatible events through `window.gtag` when available and also dispatch an `aura_blog_event` browser event. Tracked events include `blog_post_view`, `blog_cta_click`, `download_click`, `app_store_click`, `signup_start`, `scroll_50`, `scroll_90`, `internal_link_click`, and `faq_expand`.
