import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import { siteUrl } from "@/lib/supabase";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aura VPN - Fast, Secure & Private",
    template: "%s",
  },
  description: "Secure your internet connection with Aura VPN for private browsing, safe Wi-Fi, and fast VPN access.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Aura VPN - Fast, Secure & Private",
    description: "Secure your internet connection with Aura VPN for private browsing, safe Wi-Fi, and fast VPN access.",
    url: siteUrl,
    siteName: "Aura VPN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Aura VPN - Fast, Secure & Private",
    description: "Secure your internet connection with Aura VPN.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <BackgroundBlobs />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
