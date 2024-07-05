import nextMdx from '@next/mdx';

const withMdx = nextMdx({
    extension: /\.mdx?$/,
    options: {}
});

/** @type {import('next').NextConfig} */
const nextConfig = withMdx({
    pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
});

export default nextConfig;
