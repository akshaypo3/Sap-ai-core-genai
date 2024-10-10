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
    typescript: {
        ignoreBuildErrors: true
    }
};

module.exports = withNextIntl(nextConfig);