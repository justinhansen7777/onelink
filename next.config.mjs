/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
        disableStaticImages: false,
    },
    trailingSlash: true,
    // Ensure all paths are treated as case-sensitive
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(png|jpe?g|gif|svg)$/i,
            type: 'asset/resource',
        });
        return config;
    },
};

export default nextConfig;