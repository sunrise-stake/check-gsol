/** @type {import('next').NextConfig} */
const nextConfig = {
    // workaround for issue in old metaplex lib
    experimental: {
        esmExternals: 'loose',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.sunrisestake.com',
                port: '',
                pathname: '/assets/**',
            },
        ],
    },
};

export default nextConfig;
