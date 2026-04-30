import type { NextConfig } from "next";
import zonesConfig from "../../zones.json";

const { basePath } = zonesConfig["grad-project"];
const siteHostname = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    `http://localhost:${zonesConfig["site"].port}`,
).hostname;

const nextConfig: NextConfig = {
  basePath,
  assetPrefix: basePath,
  reactStrictMode: true,
  transpilePackages: ["@melikechan/ui", "@melikechan/paper-template"],
  images: {
    remotePatterns: [{ hostname: siteHostname }],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: basePath,
        permanent: false,
        basePath: false,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.ts",
      },
    },
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

export default nextConfig;
