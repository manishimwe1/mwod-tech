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
        hostname:  "qualified-rook-575.convex.cloud"
      },
    ],
  },
}

export default nextConfig;
