import Image from "next/image";
import Link from "next/link";
import { Shield, Zap, Globe, Lock, MousePointerClick, Headphones, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-transparent">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-10 lg:px-8">
        <div className="mx-auto max-w-2xl py-12 sm:py-16 lg:py-20 text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src="/transparentLogo.png"
              alt="Aura VPN"
              width={120}
              height={120}
              className="w-32 h-auto"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Secure your digital life with <span className="text-[#ffbd1c]">Aura VPN</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Fast, private, and secure access to the internet. Protect your personal data and browse anonymously from anywhere in the world.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://apps.apple.com/us/app/aura-vpn-fast-unlimited/id6745866131"
              target="_blank"
              className="rounded-lg bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white/20 ring-1 ring-white/20 flex items-center gap-3 transition-all"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-.82 3.8-.82.4 0 .88.1 1.33.26a5.48 5.48 0 011.69 1.11c-.34.33-2.15 1.76-2.11 4.75.02 2.7 2.37 3.73 2.5 3.8-.11.45-.63 1.94-1.35 2.98-.62.88-1.28 1.76-2.03 1.76-.74 0-1.66-.46-2.92-.46zM13.03 5.37c.7-1.18 1.4-2.29 2.91-2.37.16 1.48-.48 2.66-1.12 3.56-1.13 1.2-2.73 1.15-3.05 1.15-.17-1.41.69-2.6 1.26-2.34z"/></svg>
              <div className="flex flex-col items-start text-left leading-none">
                <span className="text-[10px] uppercase opacity-80">Download on the</span>
                <span className="text-base font-bold">App Store</span>
              </div>
            </Link>
            
            <Link
              href="https://play.google.com/store/apps/details?id=com.auravpn"
              target="_blank"
              className="rounded-lg bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white/20 ring-1 ring-white/20 flex items-center gap-3 transition-all"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M22.01 10.97l-15-8.58A1.99 1.99 0 0 0 4 4.02v15.96a1.99 1.99 0 0 0 3.01 1.63l15-8.58c.95-.55.95-2.06 0-2.06zM7.11 17.56V6.44l9.73 5.56-9.73 5.56z"/></svg>
              <div className="flex flex-col items-start text-left leading-none">
                <span className="text-[10px] uppercase opacity-80">Get it on</span>
                <span className="text-base font-bold">Google Play</span>
              </div>
            </Link>
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
                                                         href="https://apps.apple.com/us/app/aura-vpn-fast-unlimited/id6745866131"
                                                         target="_blank"
                                                         className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ring-1 ring-inset ring-blue-200/20 text-blue-200 hover:ring-blue-300/30"
                                                       >
                                                         Download App
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
                                                     href="https://apps.apple.com/us/app/aura-vpn-fast-unlimited/id6745866131"
                                                     target="_blank"
                                                     className="mt-6 block rounded-md bg-blue-600 py-2 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                                   >
                                                     Download App
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
                                                      href="https://apps.apple.com/us/app/aura-vpn-fast-unlimited/id6745866131"
                                                      target="_blank"
                                                      className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ring-1 ring-inset ring-blue-200/20 text-blue-200 hover:ring-blue-300/30"
                                                    >
                                                      Download App
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
                                         