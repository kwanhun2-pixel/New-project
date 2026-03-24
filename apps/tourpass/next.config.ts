import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@loop8/ui", "@loop8/common"],
  experimental: {
    optimizePackageImports: ["@loop8/ui"],
  },
};

export default nextConfig;
