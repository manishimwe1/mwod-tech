import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript:{
    ignoreBuildErrors:true
  },
  eslint:{
    ignoreDuringBuilds:true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:  "careful-mole-955.convex.cloud"
      },
    ],
  },
}

export default nextConfig;
