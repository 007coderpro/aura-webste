import Link from "next/link";
import DownloadLink from "./DownloadLink";
import { CalendarDays, Clock, Download, Filter } from "lucide-react";
import type { BlogPost } from "@/lib/blogs";
import { estimateReadingMinutes, slugifyTitle } from "@/lib/blogs";

type TaxonomyItem = {
  name: string;
  slug: string;
};

type BlogIndexProps = {
  title: string;
  description: string;
  posts: BlogPost[];
  categories: TaxonomyItem[];
  tags: TaxonomyItem[];
  authors: TaxonomyItem[];
  active?: {
    category?: string;
    tag?: string;
    author?: string;
    search?: string;
  };
};

export default function BlogIndex({ title, description, posts, categories, tags, authors, active }: BlogIndexProps) {
  return (
    <div className="px-6 py-14 sm:py-18 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-normal text-white sm:text-5xl">{title}</h1>
            <p className="mt-5 text-base leading-8 text-gray-300 sm:text-lg">{description}</p>
          </div>

          <form action="/blog" className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex gap-2">
              <input
                id="blog-search"
                name="q"
                defaultValue={active?.search ?? ""}
                aria-label="Search blog articles"
                className="min-w-0 flex-1 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-blue-400"
                placeholder="Public Wi-Fi, travel..."
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
              >
                <Filter className="h-4 w-4" aria-hidden="true" />
                Filter
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <TaxonomyLink href="/blog" label="All" active={!active?.category && !active?.tag && !active?.author} />
          {categories.map((category) => (
            <TaxonomyLink
              key={category.slug}
              href={`/blog/category/${category.slug}`}
              label={category.name}
              active={active?.category === category.slug}
            />
          ))}
          {tags.slice(0, 8).map((tag) => (
            <TaxonomyLink key={tag.slug} href={`/blog/tag/${tag.slug}`} label={`#${tag.name}`} active={active?.tag === tag.slug} />
          ))}
        </div>

        {posts.length === 0 ? (
          <div className="mt-12 rounded-lg border border-white/10 bg-white/5 p-8 text-gray-300">
            No published articles match this view yet.
          </div>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-lg border border-white/10 bg-white/5 p-6">
                {post.cover_image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.cover_image_url}
                    alt={post.cover_image_alt || post.title}
                    className="mb-5 aspect-[16/9] w-full rounded-md object-cover"
                  />
                )}
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-normal text-blue-200">
                  {post.category && <Link href={`/blog/category/${slugifyTitle(post.category)}`}>{post.category}</Link>}
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    {post.published_at
                      ? new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(
                          new Date(post.published_at),
                        )
                      : "Draft"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {estimateReadingMinutes(post.content)} min read
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-normal text-white">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-200">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-7 text-gray-300">{post.excerpt}</p>
                {post.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.slice(0, 4).map((tag) => (
                      <Link key={tag} href={`/blog/tag/${slugifyTitle(tag)}`} className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-200">
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        <section className="mt-12 rounded-lg border border-blue-300/20 bg-blue-500/10 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Browse privately with Aura VPN</h2>
              <p className="mt-2 text-sm leading-6 text-blue-100">
                Use the same VPN these guides are written for: fast apps, secure public Wi-Fi, and private browsing.
              </p>
            </div>
            <DownloadLink
              data-blog-event="download_click"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-blue-950 hover:bg-blue-50"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Aura VPN
            </DownloadLink>
          </div>
        </section>

        {authors.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2 text-sm text-gray-300">
            <span className="font-semibold text-white">Authors:</span>
            {authors.map((author) => (
              <Link key={author.slug} href={`/blog/author/${author.slug}`} className="hover:text-blue-200">
                {author.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TaxonomyLink({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-3 py-1 text-sm ${
        active ? "border-blue-300 bg-blue-400/20 text-blue-100" : "border-white/10 bg-white/5 text-gray-200 hover:border-white/20"
      }`}
    >
      {label}
    </Link>
  );
}
