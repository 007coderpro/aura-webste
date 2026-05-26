import type { Metadata } from "next";
import BlogAnalytics from "@/components/BlogAnalytics";
import BlogIndex from "@/components/BlogIndex";
import { getBlogTaxonomy, getPublishedPosts } from "@/lib/blogData";
import { getAuraSiteJsonLd } from "@/lib/structuredData";
import { siteUrl } from "@/lib/supabase";

type BlogPageProps = {
  searchParams?: Promise<{
    q?: string;
    category?: string;
    tag?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Aura VPN Blog - Privacy, Security, and VPN Guides",
  description:
    "VPN setup guides, privacy explainers, streaming access tips, and security advice from Aura VPN.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: "Aura VPN Blog",
    description:
      "Practical VPN guides for private browsing, secure travel, streaming, and device protection.",
    url: `${siteUrl}/blog`,
    type: "website",
  },
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const siteJsonLd = getAuraSiteJsonLd(siteUrl);
  const [posts, taxonomy] = await Promise.all([
    getPublishedPosts({
      search: params?.q,
      category: params?.category,
      tag: params?.tag,
      limit: 24,
    }),
    getBlogTaxonomy(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />
      <BlogAnalytics slug="blog-index" />
      <BlogIndex
        title="VPN guides built for search and real users."
        description="Learn how to browse privately, secure public Wi-Fi, stream safely, and get more from Aura VPN on every device."
        posts={posts}
        categories={taxonomy.categories}
        tags={taxonomy.tags}
        authors={taxonomy.authors}
        active={{ category: params?.category, tag: params?.tag, search: params?.q }}
      />
    </>
  );
}
