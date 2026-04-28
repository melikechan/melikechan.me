import type { NextConfig } from "next";
import nextMdx from "@next/mdx";

const withMdx = nextMdx({
  extension: /\.mdx?$/,
  options: {},
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@melikechan/ui"],
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.ts",
      },
    },
  },
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "repository-images.githubusercontent.com",
      },
    ],
  },
  async rewrites() {
    const gradProjectUrl = process.env.GRAD_PROJECT_URL;
    if (!gradProjectUrl) return [];
    return [
      {
        source: "/research/grad-project/:path*",
        destination: `${gradProjectUrl}/research/grad-project/:path*`,
      },
    ];
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule: { test?: { test?: (s: string) => boolean } }) =>
        rule.test?.test?.(".svg"),
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
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

export default withMdx(nextConfig);
