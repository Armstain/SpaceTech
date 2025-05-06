/** @type {import('next').NextConfig} */
const nextConfig = {
    // Removed output: 'export'
    images: {
        // domains: [
        //     'medusa-public-images.s3.eu-west-1.amazonaws.com',
        //     'localhost'
        // ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '**',
            }
        ]
    }
};

export default nextConfig;
