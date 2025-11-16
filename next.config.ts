// homesync/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // 1. O hostname do seu erro
      },
      // 2. Adicionei os outros hostnames que você usa no projeto:
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
      },
      {
        protocol: 'https',
        hostname: 'a.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'blogson.com.br',
      },
      {
        protocol: 'https',
        hostname: 'images.homify.com',
      },
      {
        protocol: 'https',
        hostname: 'cinqdi.com.br',
      },
      {
        protocol: 'https',
        hostname: 'cinprime.com.br',
      },
      {
        protocol: 'https',
        hostname: 'iprojetei.com.br',
      },
    ],
  },
};

export default nextConfig;