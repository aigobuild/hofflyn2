import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/hofflyn2",
  assetPrefix: "/hofflyn2/",
  images: { unoptimized: true },
  experimental: {
    agentUpgrade: false,
  },
};

export default nextConfig;
