import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Performance & Build
  reactStrictMode: true,
  swcMinify: true,
  
  // Images - Optimized for LCP
  images: {
    unoptimized: false, // Enable optimization for better LCP
    formats: ['image/avif', 'image/webp'], // Modern formats
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Cache settings for better performance
    minimumCacheTTL: 60,
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
    // Optimize CSS for faster rendering
    optimizeCss: true,
  },
}

export default nextConfig
