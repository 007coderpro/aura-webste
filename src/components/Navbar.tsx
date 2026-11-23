'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import DownloadLink from './DownloadLink';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent backdrop-blur-sm border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <Image 
                  src="/aura-logo-96.png"
                  alt="Aura VPN Logo" 
                  width={40} 
                  height={40} 
                  className="w-auto h-10"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="border-transparent text-gray-300 hover:border-blue-400 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/blog" className="border-transparent text-gray-300 hover:border-blue-400 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Blog
              </Link>
              <Link href="/pages/contact" className="border-transparent text-gray-300 hover:border-blue-400 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <DownloadLink
              className="inline-flex min-h-11 items-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-5 sm:text-base"
            >
              Download Aura VPN
            </DownloadLink>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:hidden"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className="bg-white/10 border-blue-500 text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Home
            </Link>
            <Link href="/blog" className="border-transparent text-gray-300 hover:bg-white/5 hover:border-gray-300 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Blog
            </Link>
            <Link href="/pages/contact" className="border-transparent text-gray-300 hover:bg-white/5 hover:border-gray-300 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
