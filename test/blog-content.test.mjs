import assert from "node:assert/strict";
import test from "node:test";

import {
  blogPostFromRow,
  blogPostToArticleJsonLd,
  estimateReadingMinutes,
  getBlogSeoChecks,
  getBlogSeoScore,
  getBlogTableOfContents,
  getRelatedBlogPosts,
  markdownToHtml,
  slugifyTitle,
} from "../src/lib/blogs.ts";
import { shouldShowFooterLogin } from "../src/lib/routes.ts";

test("slugifyTitle creates a stable SEO slug", () => {
  assert.equal(
    slugifyTitle(" Best VPN for Netflix & Streaming in 2026! "),
    "best-vpn-for-netflix-streaming-in-2026",
  );
});

test("estimateReadingMinutes rounds up and never returns less than one minute", () => {
  assert.equal(estimateReadingMinutes("short draft"), 1);
  assert.equal(estimateReadingMinutes(Array.from({ length: 401 }, () => "word").join(" ")), 3);
});

test("markdownToHtml renders useful article markup and escapes raw HTML", () => {
  const html = markdownToHtml(
    [
      "## Why use Aura VPN?",
      "",
      "Aura VPN keeps streaming private with [fast apps](https://auravpn.com/).",
      "",
      "<script>alert('xss')</script>",
    ].join("\n"),
  );

  assert.match(html, /<h2 id="why-use-aura-vpn">Why use Aura VPN\?<\/h2>/);
  assert.match(html, /<a href="https:\/\/auravpn.com\/" rel="nofollow noopener noreferrer">fast apps<\/a>/);
  assert.match(html, /&lt;script&gt;alert\(&#39;xss&#39;\)&lt;\/script&gt;/);
});

test("markdownToHtml renders Markdown images as safe lazy-loaded images", () => {
  const html = markdownToHtml("![Aura app screen](https://example.com/aura.png)");

  assert.match(
    html,
    /<img src="https:\/\/example.com\/aura.png" alt="Aura app screen" loading="lazy" \/>/,
  );
});

test("blogPostToArticleJsonLd emits Article and FAQPage schema for published posts", () => {
  const schema = blogPostToArticleJsonLd(
    {
      title: "Best VPN for Travel",
      slug: "best-vpn-for-travel",
      excerpt: "A practical travel VPN guide.",
      published_at: "2026-01-05T10:00:00.000Z",
      updated_at: "2026-01-06T10:00:00.000Z",
      author_name: "Aura VPN",
      cover_image_url: "https://auravpn.com/og.png",
      faqs: [
        {
          question: "Is Aura VPN good for travel?",
          answer: "Yes, it is built for private connections on public networks.",
        },
      ],
    },
    "https://auravpn.com",
  );

  assert.equal(schema["@context"], "https://schema.org");
  assert.equal(schema["@graph"][0]["@type"], "Article");
  assert.equal(schema["@graph"][0].headline, "Best VPN for Travel");
  assert.equal(schema["@graph"][1]["@type"], "FAQPage");
  assert.equal(schema["@graph"][1].mainEntity[0].name, "Is Aura VPN good for travel?");
});

test("blogPostFromRow maps CMS statuses and SEO planning fields", () => {
  const post = blogPostFromRow({
    title: "Scheduled VPN Guide",
    slug: "scheduled-vpn-guide",
    excerpt: "A scheduled VPN guide for launch planning.",
    content: "## Intro\n\nPrivate browsing advice.",
    status: "scheduled",
    cover_image_alt: "Aura VPN app on a laptop",
    category: "Privacy",
    robots_meta: "noindex,nofollow",
    og_title: "Social title",
    og_description: "Social description",
    cta_type: "download",
    search_intent: "informational",
    last_reviewed_at: "2026-01-01T00:00:00.000Z",
    next_review_at: "2026-04-01T00:00:00.000Z",
  });

  assert.equal(post.status, "scheduled");
  assert.equal(post.cover_image_alt, "Aura VPN app on a laptop");
  assert.equal(post.category, "Privacy");
  assert.equal(post.robots_meta, "noindex,nofollow");
  assert.equal(post.og_title, "Social title");
  assert.equal(post.cta_type, "download");
  assert.equal(post.search_intent, "informational");
  assert.equal(post.next_review_at, "2026-04-01T00:00:00.000Z");
});

test("getBlogTableOfContents extracts stable H2 and H3 anchors", () => {
  assert.deepEqual(
    getBlogTableOfContents(["# Ignored title", "## Why Aura VPN?", "### Public Wi-Fi", "Text"].join("\n")),
    [
      { id: "why-aura-vpn", title: "Why Aura VPN?", level: 2 },
      { id: "public-wi-fi", title: "Public Wi-Fi", level: 3 },
    ],
  );
});

test("getRelatedBlogPosts prefers category and tag overlap", () => {
  const post = { id: 1, slug: "travel-vpn", category: "Travel", tags: ["wifi", "privacy"] };
  const related = getRelatedBlogPosts(
    post,
    [
      { id: 1, slug: "travel-vpn", category: "Travel", tags: ["wifi"] },
      { id: 2, slug: "airport-wifi", category: "Travel", tags: ["wifi", "security"] },
      { id: 3, slug: "streaming-vpn", category: "Streaming", tags: ["privacy"] },
      { id: 4, slug: "gaming-vpn", category: "Gaming", tags: ["latency"] },
    ],
    2,
  );

  assert.deepEqual(related.map((item) => item.slug), ["airport-wifi", "streaming-vpn"]);
});

test("getBlogSeoScore rewards complete SEO CMS fields", () => {
  const completePost = {
    title: "Best VPN for Public Wi-Fi While Traveling",
    slug: "best-vpn-public-wifi-travel",
    excerpt: "Learn how Aura VPN protects public Wi-Fi sessions while traveling, streaming, and working remotely.",
    content: [
      "## Why public Wi-Fi needs a VPN",
      "Aura VPN helps protect public Wi-Fi connections with private browsing and secure apps.",
      "Read our [privacy guide](/blog/privacy-guide) and download Aura VPN today.",
      ...Array.from({ length: 720 }, () => "privacy"),
    ].join(" "),
    status: "published",
    published_at: "2026-01-05T10:00:00.000Z",
    cover_image_url: "https://auravpn.com/cover.png",
    cover_image_alt: "Aura VPN protecting public Wi-Fi",
    seo_title: "Best VPN for Public Wi-Fi Travel in 2026",
    seo_description: "Learn how to use Aura VPN on public Wi-Fi while traveling, streaming, and working from cafes or airports.",
    canonical_url: "https://auravpn.com/blog/best-vpn-public-wifi-travel",
    focus_keyword: "VPN for public Wi-Fi",
    category: "Travel",
    search_intent: "informational",
    tags: ["privacy", "wifi"],
    faqs: [{ question: "Should I use a VPN on public Wi-Fi?", answer: "Yes, it helps protect your traffic." }],
    cta_type: "download",
  };

  assert.equal(getBlogSeoChecks(completePost).every((check) => check.ok), true);
  assert.equal(getBlogSeoScore(completePost), 100);
});

test("shouldShowFooterLogin only allows public blog routes", () => {
  assert.equal(shouldShowFooterLogin("/blog"), true);
  assert.equal(shouldShowFooterLogin("/blog/best-vpn-for-travel"), true);
  assert.equal(shouldShowFooterLogin("/"), false);
  assert.equal(shouldShowFooterLogin("/pages/contact"), false);
  assert.equal(shouldShowFooterLogin("/admin/blogs"), false);
});
