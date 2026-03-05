/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com', 
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', 
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com', 
      },
      {
        protocol: 'https',
        hostname: 'cf.bstatic.com', 
      },
    ],
  },
};

export default nextConfig;