import type { NextConfig } from "next";
import zonesConfig from "../../zones.json";

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
        as: "*.js",
      },
    },
  },
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
  experimental: {
    useTypeScriptCli: true,
  },
};

export default nextConfig;
