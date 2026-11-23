"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { shouldShowFooterLogin } from "@/lib/routes";

export default function Footer() {
  const pathname = usePathname();
  const showLogin = shouldShowFooterLogin(pathname);

  return (
    <footer className="bg-transparent border-t border-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image 
              src="/aura-logo-96.png"
              alt="Aura VPN Logo" 
              width={32} 
              height={32} 
              className="w-auto h-8"
            />
            <span className="font-bold text-lg text-[#ffbd1c]">Aura VPN</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <Link href="/support" className="text-gray-400 hover:text-white text-sm">
              Help Center
            </Link>
            <Link href="/pages/terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link href="/pages/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/pages/contact" className="text-gray-400 hover:text-white text-sm">
              Contact Us
            </Link>
            <Link href="/pages/delete-account" className="text-gray-400 hover:text-white text-sm">
              Delete Account
            </Link>
            {showLogin && (
              <Link href="/admin/blogs" className="text-gray-400 hover:text-white text-sm">
                Login
              </Link>
            )}
          </div>
        </div>
        <div className="mt-8 border-t border-white/5 pt-8 text-center">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} Aura VPN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
