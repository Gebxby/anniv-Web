import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/video/:path*",  // match semua file dalam /video
        headers: [
          {
            key: "Content-Type",
            value: "video/mp4",
          },
        ],
      },
    ]
  },
}

export default nextConfig;
