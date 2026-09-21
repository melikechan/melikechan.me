import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { fileURLToPath } from "node:url";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    settings: {
      next: {
        rootDir: [
          fileURLToPath(new URL("./apps/site/", import.meta.url)),
          fileURLToPath(new URL("./apps/grad-project/", import.meta.url)),
        ],
      },
    },
    rules: {
      // This Pages Router rule does not recognize a global App Router layout.
      "@next/next/no-page-custom-font": "off",
    },
  },
  globalIgnores([
    "**/.next/**",
    "**/dist/**",
    "**/build/**",
    "**/next-env.d.ts",
  ]),
]);
