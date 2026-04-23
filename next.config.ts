import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'news.google.com' },
      { protocol: 'https', hostname: 'a.espncdn.com' },
      { protocol: 'https', hostname: 'olemisssports.com' },
      { protocol: 'https', hostname: 'images.sidearmdev.com' },
      { protocol: 'https', hostname: 'cdn.vox-cdn.com' },
    ],
  },
};

export default nextConfig;
