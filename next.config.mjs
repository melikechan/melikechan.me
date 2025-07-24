// next.config.mjs

import nextMdx from "@next/mdx";

const withMdx = nextMdx({
  extension: /\.mdx?$/,
  options: {
    // You can add remark or rehype plugins here if needed for MDX processing.
    // For example, for code highlighting or table of contents generation.
    // remarkPlugins: [],
    // rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for Next.js applications

  // MDX Configuration
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],

  // Image Optimization Configuration
  // This allows Next.js's <Image> component to load images from specified external hosts.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

// Wrap the nextConfig with the MDX plugin for final export.
export default withMdx(nextConfig);
