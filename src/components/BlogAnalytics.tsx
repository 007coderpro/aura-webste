"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: Record<string, unknown>) => void;
  }
}

type BlogAnalyticsProps = {
  slug?: string;
};

export default function BlogAnalytics({ slug }: BlogAnalyticsProps) {
  useEffect(() => {
    const sentScrollDepths = new Set<number>();

    const track = (eventName: string, params: Record<string, unknown> = {}) => {
      const payload = { blog_slug: slug, ...params };
      window.gtag?.("event", eventName, payload);
      window.dispatchEvent(new CustomEvent("aura_blog_event", { detail: { eventName, payload } }));
    };

    track("blog_post_view");

    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const explicitTarget = event.target.closest("[data-blog-event]");
      const linkTarget = event.target.closest("a");
      const href = linkTarget?.getAttribute("href") ?? "";
      const explicitEvent = explicitTarget?.getAttribute("data-blog-event");

      if (explicitEvent) {
        track(explicitEvent, { href });
        if (explicitEvent === "download_click" || explicitEvent === "signup_start") {
          track("blog_cta_click", { href });
        }
        return;
      }

      if (href.startsWith("/blog")) {
        track("internal_link_click", { href });
      } else if (href.includes("apps.apple.com") || href.includes("play.google.com")) {
        track("app_store_click", { href });
      }
    };

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        return;
      }

      const depth = Math.round((window.scrollY / scrollable) * 100);
      for (const threshold of [50, 90]) {
        if (depth >= threshold && !sentScrollDepths.has(threshold)) {
          sentScrollDepths.add(threshold);
          track(`scroll_${threshold}`);
        }
      }
    };

    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, [slug]);

  return null;
}
