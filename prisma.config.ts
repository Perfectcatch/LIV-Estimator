import path from "node:path";
import { loadEnvConfig } from "@next/env";
import { defineConfig } from "prisma/config";

loadEnvConfig(path.resolve("."));

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrate: {
    async development() {
      return {
        url: process.env["DATABASE_URL"]!,
        shadowUrl: process.env["DIRECT_URL"],
      };
    },
  },
});
