import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogAnalytics from "@/components/BlogAnalytics";
import BlogIndex from "@/components/BlogIndex";
import { getBlogTaxonomy, getPublishedPosts } from "@/lib/blogData";
import { siteUrl } from "@/lib/supabase";

type CategoryPageProps = {
  params: Promise<{
    categorySlug: string;
  }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const taxonomy = await getBlogTaxonomy();
  const category = taxonomy.categories.find((item) => item.slug === categorySlug);

  return {
    title: `${category?.name ?? "Blog category"} - Aura VPN Blog`,
    description: `Aura VPN articles in ${category?.name ?? "this category"}.`,
    alternates: {
      canonical: `${siteUrl}/blog/category/${categorySlug}`,
    },
  };
}

export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const [posts, taxonomy] = await Promise.all([
    getPublishedPosts({ category: categorySlug, limit: 24 }),
    getBlogTaxonomy(),
  ]);
  const category = taxonomy.categories.find((item) => item.slug === categorySlug);

  if (!category && posts.length === 0) {
    notFound();
  }

  return (
    <>
      <BlogAnalytics slug={`category-${categorySlug}`} />
      <BlogIndex
        title={`${category?.name ?? "Aura VPN"} guides`}
        description="Focused Aura VPN articles grouped by topic for faster research and comparison."
        posts={posts}
        categories={taxonomy.categories}
        tags={taxonomy.tags}
        authors={taxonomy.authors}
        active={{ category: categorySlug }}
      />
    </>
  );
}
