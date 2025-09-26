/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Add trailing slash to help with static exports
    trailingSlash: true,
};

export default nextConfig;