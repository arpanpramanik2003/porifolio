/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  agentRules: false,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'arpanpramanik.vercel.app',
          },
        ],
        destination: 'https://arpanpramanik.dev/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
