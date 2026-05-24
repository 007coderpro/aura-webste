import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogAnalytics from "@/components/BlogAnalytics";
import BlogIndex from "@/components/BlogIndex";
import { getBlogTaxonomy, getPublishedPosts } from "@/lib/blogData";
import { siteUrl } from "@/lib/supabase";

type TagPageProps = {
  params: Promise<{
    tagSlug: string;
  }>;
};

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tagSlug } = await params;
  const taxonomy = await getBlogTaxonomy();
  const tag = taxonomy.tags.find((item) => item.slug === tagSlug);

  return {
    title: `${tag?.name ?? "Blog tag"} - Aura VPN Blog`,
    description: `Aura VPN articles tagged ${tag?.name ?? tagSlug}.`,
    alternates: {
      canonical: `${siteUrl}/blog/tag/${tagSlug}`,
    },
  };
}

export default async function BlogTagPage({ params }: TagPageProps) {
  const { tagSlug } = await params;
  const [posts, taxonomy] = await Promise.all([
    getPublishedPosts({ tag: tagSlug, limit: 24 }),
    getBlogTaxonomy(),
  ]);
  const tag = taxonomy.tags.find((item) => item.slug === tagSlug);

  if (!tag && posts.length === 0) {
    notFound();
  }

  return (
    <>
      <BlogAnalytics slug={`tag-${tagSlug}`} />
      <BlogIndex
        title={`${tag?.name ?? "Aura VPN"} articles`}
        description="Guides and explainers grouped by tag so readers can keep moving through related topics."
        posts={posts}
        categories={taxonomy.categories}
        tags={taxonomy.tags}
        authors={taxonomy.authors}
        active={{ tag: tagSlug }}
      />
    </>
  );
}
