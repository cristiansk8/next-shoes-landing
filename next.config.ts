import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['toryskateshop.com'],
    // Para desarrollo local con imágenes en public/
    remotePatterns: [
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