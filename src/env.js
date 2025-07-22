import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  // server: This object defines the schema for server-side environment variables.
  // These variables are NOT exposed to the client-side bundle.
  server: {
    // Example: A database URL that should only be accessible on the server.
    // NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    // DATABASE_URL: z.string().url(), // Ensures it's a string and a valid URL
  },

  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
    NEXT_PUBLIC_NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },

  runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
  },

  emptyStringAsUndefined: true,
});
