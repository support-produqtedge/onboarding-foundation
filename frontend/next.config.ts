import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',

  async rewrites() {
    return [
      {
        source: '/api/admin/auth/:path*',
        destination: "http://localhost:3008/api/v1/admin/auth/:path*"
      }
    ]
  }
};

export default nextConfig;
