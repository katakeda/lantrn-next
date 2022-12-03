/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'cdn.recreation.gov'],
  },
  output: 'standalone',
};

module.exports = nextConfig;
