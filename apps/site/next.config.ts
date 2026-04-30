import type { NextConfig } from "next";
import nextMdx from "@next/mdx";
import zonesConfig from "../../zones.json";

const withMdx = nextMdx({
  extension: /\.mdx?$/,
  options: {},
});

type ZoneEntry = { port: number; basePath?: string };

const zones = (Object.entries(zonesConfig) as [string, ZoneEntry][])
  .filter(
    (entry): entry is [string, Required<ZoneEntry>] => "basePath" in entry[1],
  )
  .map(([name, zone]) => {
    const envKey = `${name.toUpperCase().replace(/-/g, "_")}_URL`;
    return {
      basePath: zone.basePath,
      url: process.env[envKey] ?? `http://localhost:${zone.port}`,
    };
  });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
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
    return zones.map((zone) => ({
      source: `${zone.basePath}:path(.*)`,
      destination: `${zone.url}${zone.basePath}:path`,
    }));
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
