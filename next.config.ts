import type { NextConfig } from "next";

const deploymentOrigin =
  process.env.VERCEL_URL && process.env.VERCEL_URL.length > 0
    ? `https://${process.env.VERCEL_URL}`
    : null;

// Only allow localhost in development, not in production
const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigins = Array.from(
  new Set(
    [
      // Only include localhost in development
      ...(!isProduction ? ["http://localhost:3000", "https://localhost:3000"] : []),
      "https://referlabs.com.au",
      "https://peppiepep.vercel.app",
      deploymentOrigin,
    ].filter(Boolean),
  ),
) as string[];

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    serverActions: {
      allowedOrigins,
      bodySizeLimit: "8mb",
    },
  },
  async redirects() {
    return [
      {
        source: '/linkedin-influencer',
        destination: '/linkedin-growth',
        permanent: true,
      },
      {
        source: '/linkedin-influencer/business',
        destination: '/linkedin-growth/business',
        permanent: true,
      },
      {
        source: '/linkedin-influencer/influencer',
        destination: '/linkedin-growth/influencer',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
