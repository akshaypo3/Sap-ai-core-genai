// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     typescript: {
//         ignoreBuildErrors: true
//     }
// };

// module.exports = nextConfig;

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
    }
};

module.exports = withNextIntl(nextConfig);