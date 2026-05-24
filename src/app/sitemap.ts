import type { MetadataRoute } from "next";
import { getBlogTaxonomy, getPublishedPosts } from "@/lib/blogData";
import { getBlogPostUrl } from "@/lib/blogs";
import { siteUrl } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = ["", "/pages/contact", "/pages/privacy", "/pages/terms", "/pages/delete-account", "/blog"];
  const [posts, taxonomy] = await Promise.all([getPublishedPosts(1000), getBlogTaxonomy()]);
  const taxonomyRoutes = [
    ...taxonomy.categories.map((item) => `/blog/category/${item.slug}`),
    ...taxonomy.tags.map((item) => `/blog/tag/${item.slug}`),
    ...taxonomy.authors.map((item) => `/blog/author/${item.slug}`),
  ];
  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/blog" || route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/blog" ? 0.8 : 0.5,
  }));

  return [
    ...routes,
    ...posts.map((post) => ({
      url: getBlogPostUrl(post, siteUrl),
      lastModified: post.updated_at ? new Date(post.updated_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...taxonomyRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
