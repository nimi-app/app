/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.fallback = {
      fs: false,
    };

    // Exclude SVG from Next.js Image Optimization
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.loader === 'next-image-loader') {
        return {
          ...rule,
          test: /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)/i,
        };
      }
      return rule;
    });

    // For SVG imported with querty ?url (e.g. import Logo from './logo.svg?url'), use next-image-loader
    config.module.rules.push({
      options: config.module.rules.find((rule) => rule.loader === 'next-image-loader').options,
      loader: 'next-image-loader',
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: /url/, // image if *.svg?url
    });

    // For SVG imported without querty ?url (e.g. import Logo from './logo.svg'), use @svgr/webpack to convert to React component
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: {
        not: [/url/],
      }, // exclude react component if *.svg?url
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      // disable plugins
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
            titleProp: true,
          },
        },
      ],
    });

    return config;
  },
  reactStrictMode: true,
  env: {
    PORT: process.env.PORT || 3000,
    FATHOM_SITE_ID: process.env.FATHOM_SITE_ID,
    NIMI_API_BASE_URL: process.env.NIMI_API_BASE_URL,
    NIMI_API_DEV_BASE_URL: process.env.NIMI_API_DEV_BASE_URL,
    APP_ENV: process.env.APP_ENV,
    POAP_API_KEY: process.env.POAP_API_KEY,
    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  },
  output: 'standalone',
  images: {
    domains: ['assets.coingecko.com', 'assets.coingecko.com', 'raw.githubusercontent.com'],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
