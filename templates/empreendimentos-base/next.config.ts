import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Desativa Strict Mode
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
