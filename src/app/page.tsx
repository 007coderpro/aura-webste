import Image from "next/image";
import Link from "next/link";
import { Globe, Lock, MousePointerClick, Shield, Smartphone, Zap } from "lucide-react";
import DownloadLink from "@/components/DownloadLink";
import { pageMetadata } from "@/lib/pageMetadata";
import { getAuraSiteJsonLd } from "@/lib/structuredData";
import { siteUrl } from "@/lib/supabase";

export const metadata = pageMetadata(
  "/",
  "Aura VPN for iPhone, iPad, Mac, and Android",
  "Download Aura VPN: Fast & Unlimited by VerticalRisers Oy. Encrypt your connection with WireGuard and choose a VPN location on your phone, tablet, or Mac.",
);

export default function Home() {
  const siteJsonLd = getAuraSiteJsonLd(siteUrl);

  return (
    <div className="bg-transparent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-10 lg:px-8">
        <div className="mx-auto max-w-5xl py-12 sm:py-16 lg:py-20 text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src="/aura-logo-160.png"
              alt="Aura VPN"
              width={120}
              height={120}
              className="w-32 h-auto"
              priority
            />
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
            <span className="text-[#ffbd1c]">Aura VPN</span> for iPhone, iPad, Mac, and Android
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Encrypt your connection on public Wi-Fi and browse with the VPN server’s IP address.
            Find Aura VPN: Fast &amp; Unlimited by VerticalRisers Oy on the App Store and Google Play.
          </p>
          <div id="download-platforms" className="mt-8 scroll-mt-24">
            <DownloadLink className="inline-flex min-h-14 w-full max-w-xs items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-xl font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:px-12">
              Download Aura VPN
            </DownloadLink>
          </div>
          <div className="mt-8">
            <Link href="/support" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors">
              Check supported devices and get connection help <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32 bg-transparent">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">How Aura VPN works</h2>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <Zap className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                  WireGuard® Protocol
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">Aura VPN uses WireGuard to create an encrypted tunnel between your device and the VPN server you select.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <Lock className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                  Public Wi-Fi Protection
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">On a café, hotel, or airport network, the tunnel keeps traffic it carries private from others on the same Wi-Fi.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <Globe className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                  Global Server Network
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">Choose a location in the app. Websites reached through the VPN see that server’s public IP address. A nearby location can reduce latency.</p>
                </dd>
              </div>
               <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <Shield className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                  Strict No-Logs Policy
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">Aura VPN does not log browsing activity or DNS queries. Our <Link href="/pages/privacy" className="text-blue-300 underline">privacy policy</Link> explains how purchase and diagnostic data are handled.</p>
                </dd>
              </div>
               <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <MousePointerClick className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                  No Sign-Up Required
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">Open the app and choose a VPN location without registering an email address.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <Smartphone className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                  Up to 10 Linked Devices
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-300">
                  Link up to 10 supported devices to one Premium account. Manage the devices from your profile in the app.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-6 pb-24 text-center sm:pb-32">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Aura VPN Premium</h2>
        <p className="mt-5 text-lg leading-8 text-gray-300">
          Aura VPN is free to download. Premium unlocks additional VPN locations and device linking.
          Open the app to see the plans, billing periods, and prices available in your region before you subscribe.
        </p>
        <DownloadLink className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-blue-600 px-6 font-semibold text-white hover:bg-blue-500">
          Download Aura VPN
        </DownloadLink>
      </section>
    </div>
  );
}
