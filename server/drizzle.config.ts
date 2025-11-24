import type { Config } from "drizzle-kit";
import { config } from "dotenv";
import { env } from "./src/config/env.ts";

config();

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
} satisfies Config;
