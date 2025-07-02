import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  api: {
    bodyParser: {
      sizeLimit: "1mb", // increase as needed
    },
  },
};

export default nextConfig;
