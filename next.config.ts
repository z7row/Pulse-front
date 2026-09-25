import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    "*": ["./.wwebjs_auth/**/*"],
  },
  allowedDevOrigins: ["192.168.1.10", "localhost",
    '127.0.0.1:3000',],

  images: {
    remotePatterns: [
      { hostname: "picsum.photos" },
      { hostname: "i.pravatar.cc" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "images.wallpapersden.com" },
      { hostname: "res.cloudinary.com" },
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);