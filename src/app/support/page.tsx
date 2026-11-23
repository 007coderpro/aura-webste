import Link from "next/link";
import { storeUrls } from "@/lib/downloads";
import { pageMetadata } from "@/lib/pageMetadata";
import { siteUrl } from "@/lib/supabase";

const title = "Aura VPN Help Center";
const description = "Find official Aura VPN downloads, check device and router compatibility, and troubleshoot slow streaming or a dropped connection.";
export const metadata = pageMetadata("/support", title, description);

const questions = [
  {
    id: "devices",
    question: "Which devices can run Aura VPN?",
    answer: "Download Aura VPN: Fast & Unlimited from VerticalRisers Oy for iPhone, iPad, or Mac on the App Store and for Android on Google Play. Apple lists iOS 15.0, iPadOS 15.0, and macOS 15.5 as the minimum versions for those devices. Open Google Play on your Android device to check compatibility before installing.",
    links: [
      { href: storeUrls.iphone, label: "iPhone and iPad on the App Store" },
      { href: storeUrls.mac, label: "Mac on the App Store" },
      { href: storeUrls.android, label: "Android on Google Play" },
    ],
  },
  {
    id: "routers-and-tvs",
    question: "Can I install Aura VPN on a smart TV, router, or Windows PC?",
    answer: "Aura VPN’s published downloads cover Apple devices and Android mobile devices. A native Windows installer, a dedicated smart TV app, and router configuration files are outside the setup options documented here. Installing the app on your phone protects that phone’s VPN traffic. Other devices on the same Wi-Fi need their own protection.",
    links: [{ href: "/pages/contact", label: "Ask about a specific device" }],
  },
  {
    id: "linked-devices",
    question: "How many devices can I link to Aura VPN Premium?",
    answer: "You can link up to 10 supported devices to one Premium account. Open your profile in Aura VPN to view the linked devices or remove one you no longer use.",
    links: [{ href: storeUrls.iphone, label: "See device linking in the App Store version history" }],
  },
  {
    id: "streaming-and-speed",
    question: "What can I do if streaming slows down with Aura VPN?",
    answer: "Start with a VPN location close to you. A distant server adds travel time, and congestion on Wi-Fi or along the route can reduce throughput. On a trusted network, compare download speed on the same device with the VPN connected and disconnected, using the same test server. If speeds are similar and only one streaming service fails, check that service’s VPN policy and regional availability.",
    links: [{ href: "/blog/how-to-check-if-vpn-is-working", label: "Check your VPN connection" }],
  },
  {
    id: "disconnects",
    question: "What should I check if Aura VPN keeps disconnecting?",
    answer: "Check whether the drop happens when switching between Wi-Fi and cellular, after the screen locks, or on one network only. Reconnect on a stable network, then try a second VPN location. If the problem repeats, send support your device model, OS and app versions, the selected location, and when the drop occurred. Those details help narrow down the cause.",
    links: [
      { href: "/blog/vpn-keeps-disconnecting", label: "Troubleshoot repeated disconnects" },
      { href: "/pages/contact", label: "Contact Aura VPN support" },
    ],
  },
  {
    id: "privacy",
    question: "What does Aura VPN encrypt, and which IP address do websites see?",
    answer: "Aura VPN uses WireGuard to encrypt traffic carried between your device and the VPN server. Websites reached through the tunnel see the server’s public IP address. A website can still recognize an account you sign in to. The privacy policy explains how Aura VPN handles browsing activity, purchases, and app diagnostics.",
    links: [{ href: "/pages/privacy", label: "Read the Aura VPN privacy policy" }],
  },
  {
    id: "connection-controls",
    question: "Does Aura VPN offer a kill switch or split tunneling?",
    answer: "A kill switch blocks traffic when a VPN connection drops. Split tunneling lets selected traffic bypass the VPN while it is connected. The official Aura VPN store listings leave availability of these controls unspecified. If you rely on either feature, contact support with your device and app version for confirmation.",
    links: [{ href: "/pages/contact", label: "Check feature availability with support" }],
  },
];

export default function SupportPage() {
  const url = new URL("/support", siteUrl).href;
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    about: { "@id": new URL("/#software-application", siteUrl).href },
    mainEntity: questions.map(({ id, question, answer }) => ({
      "@type": "Question",
      "@id": `${url}#${id}`,
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
      <p className="mt-5 text-lg leading-8 text-gray-300">
        Find the app for your device or get help with your VPN connection.
      </p>
      <nav aria-label="Help topics" className="my-8 grid gap-2 border-y border-white/15 py-6">
        {questions.map(({ id, question }) => (
          <a key={id} href={`#${id}`} className="w-fit text-blue-300 hover:underline">{question}</a>
        ))}
      </nav>
      <div className="space-y-10">
        {questions.map(({ id, question, answer, links }) => (
          <section key={id} id={id} className="scroll-mt-24" aria-labelledby={`${id}-heading`}>
            <h2 id={`${id}-heading`} className="text-2xl font-semibold text-white">{question}</h2>
            <p className="mt-3 leading-7 text-gray-300">{answer}</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-blue-300 underline underline-offset-4 hover:text-white">{label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
