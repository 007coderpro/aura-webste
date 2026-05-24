import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, Download, RefreshCw } from "lucide-react";
import BlogAnalytics from "@/components/BlogAnalytics";
import {
  blogPostToArticleJsonLd,
  estimateReadingMinutes,
  getBlogPostUrl,
  getBlogTableOfContents,
  markdownToHtml,
  slugifyTitle,
} from "@/lib/blogs";
import {
  getBlogRedirectBySlug,
  getPublishedBlogSlugs,
  getPublishedPostBySlug,
  getRelatedPublishedPosts,
} from "@/lib/blogData";
import { siteUrl } from "@/lib/supabase";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog post not found - Aura VPN",
    };
  }

  const canonical = post.canonical_url || getBlogPostUrl(post, siteUrl);
  const socialTitle = post.og_title || post.seo_title || post.title;
  const socialDescription = post.og_description || post.seo_description || post.excerpt;

  return {
    title: post.seo_title || `${post.title} - Aura VPN Blog`,
    description: post.seo_description || post.excerpt,
    alternates: {
      canonical,
    },
    robots: post.robots_meta === "noindex,nofollow" ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: canonical,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      images: post.cover_image_url
        ? [{ url: post.cover_image_url, alt: post.cover_image_alt || post.title }]
        : undefined,
    },
    twitter: {
      card: post.cover_image_url ? "summary_large_image" : "summary",
      title: socialTitle,
      description: socialDescription,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    const redirectSlug = await getBlogRedirectBySlug(slug);
    if (redirectSlug) {
      permanentRedirect(`/blog/${redirectSlug}`);
    }
    notFound();
  }

  const [relatedPosts] = await Promise.all([getRelatedPublishedPosts(post, 3)]);
  const jsonLd = blogPostToArticleJsonLd(post, siteUrl);
  const toc = getBlogTableOfContents(post.content);
  const showCta = post.cta_type !== "none";

  return (
    <article className="px-6 py-12 sm:py-16 lg:px-8">
      <BlogAnalytics slug={post.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="mx-auto max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-200 hover:text-white">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Blog
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-normal text-blue-200">
          {post.category && <Link href={`/blog/category/${slugifyTitle(post.category)}`}>{post.category}</Link>}
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {post.published_at ? formatDate(post.published_at) : "Draft"}
          </span>
          {post.updated_at && (
            <span className="inline-flex items-center gap-1">
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
              Updated {formatDate(post.updated_at)}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {estimateReadingMinutes(post.content)} min read
          </span>
        </div>

        <h1 className="mt-5 text-4xl font-bold tracking-normal text-white sm:text-5xl">{post.title}</h1>
        <p className="mt-5 text-lg leading-8 text-gray-300">{post.excerpt}</p>

        <p className="mt-4 text-sm text-gray-400">
          By <span className="font-medium text-gray-200">{post.author_name}</span>
          <span className="text-gray-600" aria-hidden="true"> / </span>
          <span>Aura VPN privacy and security team</span>
        </p>

        {post.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image_url}
            alt={post.cover_image_alt || post.title}
            className="mt-8 aspect-[16/9] w-full rounded-lg border border-white/10 object-cover"
          />
        )}

        {toc.length >= 2 && (
          <nav
            className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.10] via-white/[0.04] to-blue-500/[0.08] p-4 shadow-[0_24px_80px_rgba(12,7,64,0.34)] backdrop-blur-xl sm:p-5"
            aria-label="Table of contents"
          >
            <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_18px_rgba(147,197,253,0.65)]"
                  aria-hidden="true"
                />
                <h2 className="text-xs font-semibold uppercase tracking-normal text-blue-100">In this article</h2>
              </div>
              <p className="w-fit rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-blue-100">
                {toc.filter((item) => item.level === 2).length} sections
              </p>
            </div>
            <ol className="mt-6 grid grid-cols-1 gap-3 text-sm">
              {toc.map((item, index) => {
                const sectionNumber = toc.slice(0, index + 1).filter((entry) => entry.level === 2).length;
                const isSubsection = item.level === 3;

                return (
                  <li key={item.id} className={isSubsection ? "pl-4 sm:pl-9" : undefined}>
                    <a
                      href={`#${item.id}`}
                      aria-label={`Jump to section ${item.title}`}
                      className={[
                        "group flex items-start gap-3 rounded-lg transition",
                        isSubsection
                          ? "min-h-11 border-l-2 border-blue-300/20 px-5 py-3 text-sm text-blue-100/80 hover:border-blue-300/60 hover:bg-white/[0.04] hover:text-white"
                          : "min-h-16 border border-white/10 bg-[#1a1260]/55 px-5 py-4 text-white shadow-sm shadow-black/10 hover:border-blue-300/40 hover:bg-blue-400/[0.10]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "flex shrink-0 items-center justify-center rounded-full font-semibold",
                          isSubsection
                            ? "mt-1 h-1.5 w-1.5 bg-blue-200/70 text-transparent"
                            : "h-7 w-7 bg-blue-200 text-xs text-blue-950 shadow-sm shadow-blue-950/20",
                        ].join(" ")}
                        aria-hidden="true"
                      >
                        {!isSubsection && sectionNumber}
                      </span>
                      <span className={isSubsection ? "leading-5" : "font-semibold leading-6"}>{item.title}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <div
          className="mt-10 max-w-none space-y-5 text-base leading-8 text-gray-200 [&_a]:text-blue-200 [&_a]:underline [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_h2]:pt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:pt-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_img]:rounded-xl [&_img]:border [&_img]:border-white/10 [&_img]:object-cover [&_li]:ml-5 [&_ol]:list-decimal [&_p]:text-gray-200 [&_strong]:text-white [&_ul]:list-disc"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        />

        {showCta && (
          <section className="mt-12 rounded-lg border border-blue-300/20 bg-blue-500/10 p-6">
            <h2 className="text-2xl font-semibold text-white">Protect your next browsing session</h2>
            <p className="mt-3 text-sm leading-7 text-blue-100">
              Aura VPN helps keep public Wi-Fi, travel browsing, and everyday app traffic private across your devices.
            </p>
            <Link
              href="/#download-platforms"
              data-blog-event={post.cta_type === "signup" ? "signup_start" : "download_click"}
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-blue-950 hover:bg-blue-50"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {post.cta_type === "signup" ? "Start with Aura VPN" : "Download Aura VPN"}
            </Link>
          </section>
        )}

        {post.faqs.length > 0 && (
          <section className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-semibold text-white">Frequently asked questions</h2>
            <div className="mt-5 space-y-4">
              {post.faqs.map((faq) => (
                <details key={faq.question} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <summary data-blog-event="faq_expand" className="cursor-pointer text-base font-semibold text-white">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-gray-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-semibold text-white">Related posts</h2>
            <div className="mt-5 grid gap-4">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 hover:border-blue-300/40"
                >
                  <span className="text-sm font-semibold text-white">{relatedPost.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-gray-300">{relatedPost.excerpt}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(value));
}
