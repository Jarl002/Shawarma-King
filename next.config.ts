import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Dev only: lets phones on the same Wi-Fi (e.g. 192.168.1.23:3001) load the app's JavaScript,
  // so the site can be tested on a real phone. Has no effect on the deployed site.
  allowedDevOrigins: ["192.168.*.*"],
};

export default nextConfig;
