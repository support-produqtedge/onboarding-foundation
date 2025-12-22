import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',

  async rewrites() {
    return [
      {
        source: '/api/admin/auth/:path*',
        destination: "http://localhost:3008/api/v1/admin/auth/:path*"
      },
      {
        source: '/api/auth/:path*',
        destination: "http://localhost:3008/api/v1/auth/:path*"
      },
      {
        source: "/api/admin/superadmin/:path*",
        destination: "http://localhost:3008/api/v1/admin/superadmin/:path*"
      }
    ]
  }
};

export default nextConfig;
