/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: '/ai-core',
        destination: '/ai-engine',
        statusCode: 301
      }
    ];
  }
};

export default nextConfig;
