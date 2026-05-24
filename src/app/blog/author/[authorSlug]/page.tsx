import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogAnalytics from "@/components/BlogAnalytics";
import BlogIndex from "@/components/BlogIndex";
import { getBlogTaxonomy, getPublishedPosts } from "@/lib/blogData";
import { siteUrl } from "@/lib/supabase";

type AuthorPageProps = {
  params: Promise<{
    authorSlug: string;
  }>;
};

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { authorSlug } = await params;
  const taxonomy = await getBlogTaxonomy();
  const author = taxonomy.authors.find((item) => item.slug === authorSlug);

  return {
    title: `${author?.name ?? "Aura VPN author"} - Aura VPN Blog`,
    description: `Aura VPN articles by ${author?.name ?? "this author"}.`,
    alternates: {
      canonical: `${siteUrl}/blog/author/${authorSlug}`,
    },
  };
}

export default async function BlogAuthorPage({ params }: AuthorPageProps) {
  const { authorSlug } = await params;
  const [posts, taxonomy] = await Promise.all([
    getPublishedPosts({ author: authorSlug, limit: 24 }),
    getBlogTaxonomy(),
  ]);
  const author = taxonomy.authors.find((item) => item.slug === authorSlug);

  if (!author && posts.length === 0) {
    notFound();
  }

  return (
    <>
      <BlogAnalytics slug={`author-${authorSlug}`} />
      <BlogIndex
        title={`${author?.name ?? "Aura VPN"} posts`}
        description="Author archive for Aura VPN guides, updates, and privacy explainers."
        posts={posts}
        categories={taxonomy.categories}
        tags={taxonomy.tags}
        authors={taxonomy.authors}
        active={{ author: authorSlug }}
      />
    </>
  );
}
