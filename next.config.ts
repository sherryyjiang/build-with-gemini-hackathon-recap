import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
    qualities: [75, 90],
  },
};

export default nextConfig;
