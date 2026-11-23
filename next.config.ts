import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      { source: "/pages/privacy-ios", destination: "/pages/privacy", permanent: true },
    ];
  },
};

export default nextConfig;
