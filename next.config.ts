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
      {
        protocol: 'https',
        hostname:  "lh3.googleusercontent.com"
      },
    ],
  },
}

export default nextConfig;
