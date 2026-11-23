"use client";

import { useSyncExternalStore, type ComponentPropsWithoutRef } from "react";
import { getStoreUrl } from "@/lib/downloads";

// Device identity is stable for the lifetime of the page.
const subscribe = () => () => {};
const getFallbackUrl = () => "/get";
const getBrowserUrl = () => getStoreUrl(navigator) ?? getFallbackUrl();

export default function DownloadLink(props: Omit<ComponentPropsWithoutRef<"a">, "href">) {
  const href = useSyncExternalStore(subscribe, getBrowserUrl, getFallbackUrl);
  return <a {...props} href={href} />;
}
