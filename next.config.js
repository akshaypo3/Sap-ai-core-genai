const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/dashboard',
            permanent: true,
          },
        ]
      },
    typescript: {
        ignoreBuildErrors: true
    },
    reactStrictMode: true,
    logging: {
      fetches: {
        fullUrl: true,
      },
    }
};

module.exports = withNextIntl(nextConfig);