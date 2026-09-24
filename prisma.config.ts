import { definePrismaConfig } from "prisma/config";
import { defineConfig } from "@prisma/orm-postgres/config";

try {
  process.loadEnvFile(".env.local");
} catch {
  // .env.local is optional while running Prisma commands; Next.js loads it at runtime.
}

const dbConnection = process.env.DATABASE_URL?.trim();

export default definePrismaConfig({
  orm: defineConfig({
    contract: "./src/prisma/contract.prisma",
    migrations: {
      dir: "./src/prisma/migrations",
    },
    ...(dbConnection ? { db: { connection: dbConnection } } : {}),
  }),
  skills: {
    agents: ["claude", "cursor", "agents", "devin"],
  },
});