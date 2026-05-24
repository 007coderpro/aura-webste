import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/supabase";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/test-env", "/preview", "/staging", "/private"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
