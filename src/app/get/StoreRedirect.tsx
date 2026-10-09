"use client";

import { useEffect } from "react";
import Link from "next/link";

const appStoreUrl = "https://apps.apple.com/app/id6745866131";
const googlePlayUrl = "https://play.google.com/store/apps/details?id=com.auravpn";

export default function StoreRedirect() {
  useEffect(() => {
    const userAgent = navigator.userAgent;
    // iPadOS can request desktop sites and report itself as a Mac.
    const isIPadDesktop =
      /Macintosh|MacIntel/i.test(`${userAgent} ${navigator.platform}`) &&
      navigator.maxTouchPoints > 1;
    const isAppleMobile = /iPhone|iPad|iPod/i.test(userAgent) || isIPadDesktop;

    const destination = isAppleMobile
      ? appStoreUrl
      : /Android/i.test(userAgent)
        ? googlePlayUrl
        : "/";

    // Avoid sending visitors back through the redirect with the Back button.
    window.location.replace(destination);
  }, []);

  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold">Get Aura VPN</h1>
      <p className="mt-4">Taking you to the right place for your device…</p>
      <p className="mt-6">If you are not redirected, choose a link below.</p>
      <div className="mt-4 flex flex-wrap justify-center gap-6">
        <a className="underline" href={appStoreUrl}>App Store</a>
        <a className="underline" href={googlePlayUrl}>Google Play</a>
        <Link className="underline" href="/">Aura VPN website</Link>
      </div>
    </section>
  );
}
