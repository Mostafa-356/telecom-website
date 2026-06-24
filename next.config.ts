import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Performance & Build
  reactStrictMode: true,
  swcMinify: true,
  
  // Images
  images: {
    unoptimized: true,
  },
  
  // Linting & Type Checking
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Experimental Optimizations
  experimental: {
    optimizePackageImports: ['@radix-ui'],
  },
}

export default nextConfig
