import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Desativa Strict Mode
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    // Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
