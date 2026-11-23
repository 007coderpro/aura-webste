"use client";

import { useEffect } from "react";
import { getStoreUrl, storeUrls } from "@/lib/downloads";

export default function StoreRedirect() {
  useEffect(() => {
    const destination = getStoreUrl(navigator);
    if (destination) window.location.replace(destination);
  }, []);

  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold">Get Aura VPN</h1>
      <p className="mt-4">Choose the device you want to install Aura VPN on.</p>
      <div className="mt-4 flex flex-wrap justify-center gap-6">
        <a className="underline" href={storeUrls.iphone}>iPhone &amp; iPad</a>
        <a className="underline" href={storeUrls.mac}>Mac</a>
        <a className="underline" href={storeUrls.android}>Android</a>
      </div>
    </section>
  );
}
