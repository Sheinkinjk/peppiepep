import type { NextConfig } from "next";

const deploymentOrigin =
  process.env.VERCEL_URL && process.env.VERCEL_URL.length > 0
    ? `https://${process.env.VERCEL_URL}`
    : null;

const allowedOrigins = Array.from(
  new Set(
    [
      "http://localhost:3000",
      "https://localhost:3000",
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
};

export default nextConfig;
