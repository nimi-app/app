/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      use: '@svgr/webpack',
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              removeViewBox: false,
            },
          ],
        },
        titleProp: true,
      },
      test: /\.svg$/,
    });

    return config;
  },
  reactStrictMode: true,
  env: {
    PORT: process.env.PORT || 3000,
    FATHOM_SITE_ID: process.env.FATHOM_SITE_ID,
  },
  output: 'standalone',
  images: {
    domains: ['assets.coingecko.com', 'assets.coingecko.com', 'raw.githubusercontent.com'],
  },
};

module.exports = nextConfig;
