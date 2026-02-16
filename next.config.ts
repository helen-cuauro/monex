import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-ced-uploads-01.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
