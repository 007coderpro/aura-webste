import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image 
              src="/transparentLogo.png" 
              alt="Aura VPN Logo" 
              width={32} 
              height={32} 
              className="w-auto h-8"
            />
            <span className="font-bold text-lg text-[#ffbd1c]">Aura VPN</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/pages/terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link href="/pages/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/pages/contact" className="text-gray-400 hover:text-white text-sm">
              Contact Us
            </Link>
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
