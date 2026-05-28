import Image from "next/image";
import Link from "next/link";
import { Download, Globe, Lock, MousePointerClick, Shield, Smartphone, Zap } from "lucide-react";
import { getAuraSiteJsonLd } from "@/lib/structuredData";
import { siteUrl } from "@/lib/supabase";

const platformDownloads = [
  {
    name: "macOS",
    category: "Official Store",
    href: "https://apps.apple.com/fi/app/aura-vpn-fast-unlimited/id6745866131",
    description: "Download Aura VPN for macOS from the App Store for automatic updates and a trusted install flow.",
    cta: "Open App Store",
    badge: "Desktop",
    isDirectDownload: false,
  },
  {
    name: "iPhone & iPad",
    category: "Official Store",
    href: "https://apps.apple.com/us/app/aura-vpn-fast-unlimited/id6745866131",
    description: "Download Aura VPN for iOS from the App Store for automatic updates and trusted install flow.",
    cta: "Open App Store",
    badge: "Mobile",
    isDirectDownload: false,
  },
  {
    name: "Android",
    category: "Official Store",
    href: "https://play.google.com/store/apps/details?id=com.auravpn",
    description: "Install Aura VPN from Google Play on Android phones and tablets.",
    cta: "Open Google Play",
    badge: "Mobile",
    isDirectDownload: false,
  },
] as const;

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
            Secure your digital life with <span className="text-[#ffbd1c]">Aura VPN</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Fast, private, and secure access to the internet. Protect your personal data and browse anonymously from anywhere in the world.
          </p>
          <p className="mx-auto mt-8 max-w-3xl text-sm text-gray-400">
            Install Aura VPN from the official stores on macOS, iOS, and Android.
          </p>
          <div
            id="download-platforms"
            className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3"
          >
            {platformDownloads.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target={platform.isDirectDownload ? undefined : "_blank"}
                rel={platform.isDirectDownload ? undefined : "noreferrer"}
                download={platform.isDirectDownload}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-blue-400/60 hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-gray-400">{platform.category}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{platform.name}</h3>
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                    {platform.badge}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-300">{platform.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#ffbd1c] transition-transform group-hover:translate-x-1">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>{platform.cta}</span>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/pages/contact" className="text-sm font-semibold leading-6 text-gray-400 hover:text-white transition-colors">
              Need help? Contact Support <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32 bg-transparent">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-400">Why Choose Aura VPN?</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Advanced features for ultimate privacy
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <Zap className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                  WireGuard® Protocol
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">Experience buffer-free streaming and low-latency gaming with the state-of-the-art WireGuard® protocol.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <Lock className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                  Bank-Grade Encryption
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">Your data is secured with AES-256 bit encryption, making it unreadable to hackers, ISPs, and snoopers.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <Globe className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                  Global Server Network
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">Access content from anywhere in the world. Bypass geo-restrictions and enjoy true internet freedom.</p>
                </dd>
              </div>
               <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <Shield className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                  Strict No-Logs Policy
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">We value your privacy. We never track, store, or share your online activity or personal data.</p>
                </dd>
              </div>
               <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <MousePointerClick className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                  No Sign-Up Required
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">Total anonymity from the start. No account, email, or personal details needed to use our VPN.</p>
                </dd>
              </div>
                              <div className="flex flex-col">
                               <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                                 <Smartphone className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                                 Connect 10 Devices
                               </dt>
                               <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                                 <p className="flex-auto">One premium account protects all your gadgets. Connect up to 10 devices simultaneously with just one subscription.</p>
                               </dd>
                             </div>
                                       </dl>
                                     </div>
                                   </div>
                                 </div>
                           
                                 {/* Pricing Section */}
                                 <div className="py-24 sm:py-32 bg-transparent">
                                   <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                     <div className="mx-auto max-w-2xl sm:text-center">
                                       <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Simple, transparent pricing</h2>
                                       <p className="mt-6 text-lg leading-8 text-gray-300">
                                         Choose the plan that suits you best. All plans include full access to our global network and protection for 10 devices.
                                       </p>
                                     </div>
                                     <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3 lg:gap-x-8">
                                       
                                       {/* 1 Month Plan */}
                                       <div className="relative p-8 bg-white/5 ring-1 ring-white/10 rounded-2xl xl:p-10">
                                         <h3 className="text-lg font-semibold leading-8 text-white">Monthly</h3>
                                         <p className="mt-4 text-sm leading-6 text-gray-300">Flexible protection for short-term needs.</p>
                                         <p className="mt-6 flex items-baseline gap-x-1">
                                           <span className="text-4xl font-bold tracking-tight text-white">$9.99</span>
                                           <span className="text-sm font-semibold leading-6 text-gray-300">/month</span>
                                         </p>
                                                       <Link
                                                         href="#download-platforms"
                                                         className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ring-1 ring-inset ring-blue-200/20 text-blue-200 hover:ring-blue-300/30"
                                                       >
                                                         Choose Platform
                                                       </Link>
                                         
                                         <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                                           <li className="flex gap-x-3"><Shield className="h-6 w-5 flex-none text-blue-400" /> 10 Devices</li>
                                           <li className="flex gap-x-3"><Shield className="h-6 w-5 flex-none text-blue-400" /> WireGuard® Protection</li>
                                           <li className="flex gap-x-3"><Shield className="h-6 w-5 flex-none text-blue-400" /> Servers in 10+ Countries</li>
                                           <li className="flex gap-x-3"><Shield className="h-6 w-5 flex-none text-blue-400" /> Total Internet Privacy</li>
                                         </ul>
                                       </div>
                           
                                       {/* 12 Month Plan (Best Value) */}
                                       <div className="relative p-8 bg-blue-600/10 ring-2 ring-blue-500 rounded-2xl xl:p-10 lg:z-10 lg:scale-105">
                                         <div className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-blue-500 rounded-full text-xs font-semibold text-white shadow-sm">
                                           Best Value
                                         </div>
                                         <h3 className="text-lg font-semibold leading-8 text-white">12 Months</h3>
                                         <p className="mt-4 text-sm leading-6 text-gray-300">Maximum savings for long-term security.</p>
                                         <p className="mt-6 flex items-baseline gap-x-1">
                                           <span className="text-4xl font-bold tracking-tight text-white">$4.99</span>
                                           <span className="text-sm font-semibold leading-6 text-gray-300">/mo</span>
                                         </p>
                                                   <p className="text-xs text-gray-400 mt-1">Billed $59.99 every 12 months</p>
                                                   <Link
                                                     href="#download-platforms"
                                                     className="mt-6 block rounded-md bg-blue-600 py-2 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                                   >
                                                     Choose Platform
                                                   </Link>                                         <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                                            <li className="flex gap-x-3"><Shield className="h-6 w-5 flex-none text-blue-400" /> 10 Devices</li>
                                           <li className="flex gap-x-3"><Shield className="h-6 w-5 flex-none text-blue-400" /> WireGuard® Protection</li>
                                           <li className="flex gap-x-3"><Shield className="h-6 w-5 flex-none text-blue-400" /> Servers in 10+ Countries</li>
                                           <li className="flex gap-x-3"><Shield className="h-6 w-5 flex-none text-blue-400" /> Total Internet Privacy</li>
                                         </ul>
                                       </div>
                           
                                       {/* 6 Month Plan */}
                                       <div className="relative p-8 bg-white/5 ring-1 ring-white/10 rounded-2xl xl:p-10">
                                         <h3 className="text-lg font-semibold leading-8 text-white">6 Months</h3>
                                         <p className="mt-4 text-sm leading-6 text-gray-300">Great balance of price and flexibility.</p>
                                         <p className="mt-6 flex items-baseline gap-x-1">
                                           <span className="text-4xl font-bold tracking-tight text-white">$5.83</span>
                                           <span className="text-sm font-semibold leading-6 text-gray-300">/mo</span>
                                         </p>
                                                    <p className="text-xs text-gray-400 mt-1">Billed $34.99 every 6 months</p>
                                                    <Link
                                                      href="#download-platforms"
                                                      className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ring-1 ring-inset ring-blue-200/20 text-blue-200 hover:ring-blue-300/30"
                                                    >
                                                      Choose Platform
                                                    </Link>                                         <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                                           <li className="flex gap-x-3"><Shield className="h-6 w-5 flex-none text-blue-400" /> 10 Devices</li>
                                           <li className="flex gap-x-3"><Shield className="h-6 w-5 flex-none text-blue-400" /> WireGuard® Protection</li>
                                           <li className="flex gap-x-3"><Shield className="h-6 w-5 flex-none text-blue-400" /> Servers in 10+ Countries</li>
                                           <li className="flex gap-x-3"><Shield className="h-6 w-5 flex-none text-blue-400" /> Total Internet Privacy</li>
                                                       </ul>
                                                     </div>
                                         
                                                   </div>
                                                   <p className="mt-10 text-center text-sm text-gray-400">
                                                     Note: Prices may vary slightly depending on your currency and region. All subscriptions and purchases are securely processed directly within the Aura VPN app.
                                                   </p>
                                                 </div>
                                               </div>
                                             </div>
                                           );
                                         }
                                         
