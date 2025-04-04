import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['swiper'],
  images: {
    domains: ['toryskateshop.com'],
    // Para desarrollo local con imágenes en public/
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'toryskateshop.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;