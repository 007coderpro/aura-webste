export type BlogStatus = "draft" | "scheduled" | "published" | "archived";

export type BlogCtaType = "download" | "signup" | "none";

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogHeadingLink = {
  id: string;
  title: string;
  level: 2 | 3;
};

export type BlogSeoCheck = {
  label: string;
  ok: boolean;
  points: number;
};

export type BlogPost = {
  id?: number;
  created_at?: string;
  updated_at?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: BlogStatus;
  published_at: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  focus_keyword: string | null;
  category: string | null;
  robots_meta: string | null;
  og_title: string | null;
  og_description: string | null;
  cta_type: BlogCtaType;
  search_intent: string | null;
  last_reviewed_at: string | null;
  next_review_at: string | null;
  tags: string[];
  faqs: BlogFaq[];
  author_name: string;
};

export const emptyBlogPost: BlogPost = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  status: "draft",
  published_at: null,
  cover_image_url: null,
  cover_image_alt: null,
  seo_title: null,
  seo_description: null,
  canonical_url: null,
  focus_keyword: null,
  category: null,
  robots_meta: "index,follow",
  og_title: null,
  og_description: null,
  cta_type: "download",
  search_intent: null,
  last_reviewed_at: null,
  next_review_at: null,
  tags: [],
  faqs: [],
  author_name: "Aura VPN",
};

export function slugifyTitle(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function estimateReadingMinutes(markdown: string) {
  const words = markdownToPlainText(markdown).match(/\S+/g)?.length ?? 0;
  return Math.max(1, Math.ceil(words / 200));
}

export function markdownToPlainText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~|-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getBlogTableOfContents(markdown: string): BlogHeadingLink[] {
  return markdown
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => /^(#{2,3})\s+(.+)$/.exec(line.trim()))
    .filter((match): match is RegExpExecArray => Boolean(match))
    .map((match) => {
      const title = stripInlineMarkdown(match[2].trim());
      return {
        id: slugifyTitle(title),
        title,
        level: match[1].length as 2 | 3,
      };
    });
}

export function getRelatedBlogPosts<T extends Pick<BlogPost, "id" | "slug" | "category" | "tags">>(
  post: Pick<BlogPost, "id" | "slug" | "category" | "tags">,
  posts: T[],
  limit = 3,
) {
  const postTags = new Set((post.tags ?? []).map((tag) => tag.toLowerCase()));

  return posts
    .filter((candidate) => candidate.id !== post.id && candidate.slug !== post.slug)
    .map((candidate) => {
      const tagOverlap = (candidate.tags ?? []).filter((tag) => postTags.has(tag.toLowerCase())).length;
      const categoryMatch = Boolean(post.category && candidate.category === post.category);
      return {
        post: candidate,
        score: (categoryMatch ? 3 : 0) + tagOverlap,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

export function getBlogSeoChecks(post: Partial<BlogPost>): BlogSeoCheck[] {
  const title = (post.seo_title || post.title || "").trim();
  const description = (post.seo_description || post.excerpt || "").trim();
  const slug = post.slug || "";
  const content = post.content || "";
  const wordCount = markdownToPlainText(content).match(/\S+/g)?.length ?? 0;
  const hasInternalLink = /\]\(\/(?:blog|pages|downloads)?[^\)]*\)/.test(content) || /https:\/\/auravpn\.com/i.test(content);
  const hasCta = post.cta_type !== "none" || /download|sign up|try aura/i.test(content);

  return [
    { label: "SEO title is 30-60 characters", ok: title.length >= 30 && title.length <= 60, points: 10 },
    { label: "Meta description is 70-160 characters", ok: description.length >= 70 && description.length <= 160, points: 10 },
    { label: "Slug is clean and readable", ok: /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 72, points: 10 },
    { label: "Excerpt is useful for listings", ok: Boolean(post.excerpt && post.excerpt.length >= 50 && post.excerpt.length <= 320), points: 10 },
    { label: "Article has enough depth", ok: wordCount >= 700, points: 10 },
    { label: "Article uses structured H2/H3 sections", ok: getBlogTableOfContents(content).length > 0, points: 10 },
    { label: "Featured image has alt text", ok: Boolean(post.cover_image_url && post.cover_image_alt), points: 10 },
    { label: "Canonical URL is set", ok: Boolean(post.canonical_url), points: 10 },
    {
      label: "Keyword, intent, category, and tags are planned",
      ok: Boolean(post.focus_keyword && post.search_intent && post.category && post.tags?.length),
      points: 10,
    },
    {
      label: "Internal link, CTA, and FAQ are present",
      ok: hasInternalLink && hasCta && Boolean(post.faqs?.length),
      points: 10,
    },
  ];
}

export function getBlogSeoScore(post: Partial<BlogPost>) {
  const checks = getBlogSeoChecks(post);
  const possible = checks.reduce((sum, check) => sum + check.points, 0);
  const earned = checks.reduce((sum, check) => sum + (check.ok ? check.points : 0), 0);
  return possible > 0 ? Math.round((earned / possible) * 100) : 0;
}

export function markdownToHtml(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let listType: "ul" | "ol" | null = null;

  const closeList = () => {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      closeList();
      continue;
    }

    const heading = /^(#{2,3})\s+(.+)$/.exec(line);
    if (heading) {
      closeList();
      const level = heading[1].length;
      const text = heading[2].trim();
      html.push(`<h${level} id="${escapeAttribute(slugifyTitle(text))}">${renderInline(text)}</h${level}>`);
      continue;
    }

    const unordered = /^[-*]\s+(.+)$/.exec(line);
    if (unordered) {
      if (listType !== "ul") {
        closeList();
        listType = "ul";
        html.push("<ul>");
      }
      html.push(`<li>${renderInline(unordered[1])}</li>`);
      continue;
    }

    const ordered = /^\d+\.\s+(.+)$/.exec(line);
    if (ordered) {
      if (listType !== "ol") {
        closeList();
        listType = "ol";
        html.push("<ol>");
      }
      html.push(`<li>${renderInline(ordered[1])}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${renderInline(line)}</p>`);
  }

  closeList();
  return html.join("\n");
}

export function blogPostToArticleJsonLd(post: BlogPost, baseUrl: string) {
  const canonicalUrl = post.canonical_url || getBlogPostUrl(post, baseUrl);
  const article = {
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    mainEntityOfPage: canonicalUrl,
    headline: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    image: post.cover_image_url ? [post.cover_image_url] : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      "@type": "Organization",
      name: post.author_name || "Aura VPN",
    },
    publisher: {
      "@type": "Organization",
      name: "Aura VPN",
      url: baseUrl,
    },
    url: canonicalUrl,
    keywords: post.tags?.join(", "),
  };

  const graph: unknown[] = [removeUndefined(article)];
  const faqEntities = normalizeFaqs(post.faqs).map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  }));

  if (faqEntities.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: faqEntities,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function normalizeFaqs(value: unknown): BlogFaq[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const faq = item as Record<string, unknown>;
      const question = typeof faq.question === "string" ? faq.question.trim() : "";
      const answer = typeof faq.answer === "string" ? faq.answer.trim() : "";

      return question && answer ? { question, answer } : null;
    })
    .filter((item): item is BlogFaq => item !== null);
}

export function getBlogPostUrl(post: Pick<BlogPost, "slug">, baseUrl: string) {
  return `${baseUrl.replace(/\/$/, "")}/blog/${post.slug}`;
}

export function blogPostFromRow(row: Record<string, unknown>): BlogPost {
  return {
    id: typeof row.id === "number" ? row.id : undefined,
    created_at: typeof row.created_at === "string" ? row.created_at : undefined,
    updated_at: typeof row.updated_at === "string" ? row.updated_at : undefined,
    title: String(row.title ?? ""),
    slug: String(row.slug ?? ""),
    excerpt: String(row.excerpt ?? ""),
    content: String(row.content ?? ""),
    status: normalizeBlogStatus(row.status),
    published_at: typeof row.published_at === "string" ? row.published_at : null,
    cover_image_url: typeof row.cover_image_url === "string" ? row.cover_image_url : null,
    cover_image_alt: typeof row.cover_image_alt === "string" ? row.cover_image_alt : null,
    seo_title: typeof row.seo_title === "string" ? row.seo_title : null,
    seo_description:
      typeof row.seo_description === "string"
        ? row.seo_description
        : typeof row.meta_description === "string"
          ? row.meta_description
          : null,
    canonical_url: typeof row.canonical_url === "string" ? row.canonical_url : null,
    focus_keyword: typeof row.focus_keyword === "string" ? row.focus_keyword : null,
    category: typeof row.category === "string" ? row.category : null,
    robots_meta: typeof row.robots_meta === "string" ? row.robots_meta : "index,follow",
    og_title: typeof row.og_title === "string" ? row.og_title : null,
    og_description: typeof row.og_description === "string" ? row.og_description : null,
    cta_type: normalizeCtaType(row.cta_type),
    search_intent: typeof row.search_intent === "string" ? row.search_intent : null,
    last_reviewed_at: typeof row.last_reviewed_at === "string" ? row.last_reviewed_at : null,
    next_review_at: typeof row.next_review_at === "string" ? row.next_review_at : null,
    tags: Array.isArray(row.tags) ? row.tags.filter((tag): tag is string => typeof tag === "string") : [],
    faqs: normalizeFaqs(row.faqs),
    author_name: typeof row.author_name === "string" ? row.author_name : "Aura VPN",
  };
}

function normalizeBlogStatus(value: unknown): BlogStatus {
  return value === "published" || value === "scheduled" || value === "archived" ? value : "draft";
}

function normalizeCtaType(value: unknown): BlogCtaType {
  return value === "signup" || value === "none" ? value : "download";
}

function stripInlineMarkdown(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .trim();
}

function renderInline(value: string) {
  const escaped = escapeHtml(value);

  return escaped
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/!\[([^\]]*)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g, (_match, alt: string, src: string) => {
      const safeSrc = escapeAttribute(src);
      const safeAlt = escapeAttribute(alt);
      return `<img src="${safeSrc}" alt="${safeAlt}" loading="lazy" />`;
    })
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g, (_match, label: string, href: string) => {
      const safeHref = escapeAttribute(href);
      return `<a href="${safeHref}" rel="nofollow noopener noreferrer">${label}</a>`;
    });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value: string) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function removeUndefined<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined));
}
