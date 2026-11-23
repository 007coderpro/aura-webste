import type { Metadata } from "next";

export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: "Aura VPN", url: path, title, description },
    twitter: { card: "summary", title, description },
  };
}
