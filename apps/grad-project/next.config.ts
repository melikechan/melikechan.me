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
  experimental: {
    useTypeScriptCli: true,
  },
};

export default nextConfig;
