import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    additionalData: "@import './app/styles/common/gem.scss';\r\n",
  },
};

export default nextConfig;
