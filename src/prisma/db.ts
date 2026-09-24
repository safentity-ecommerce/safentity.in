import postgres from "@prisma/orm-postgres/runtime"
import type { Contract } from "./contract.d"
import contractJson from "./contract.json" with { type: "json" }

const url = process.env["DATABASE_URL"]?.trim() ?? ""

if (!url) {
  throw new Error(
    "DATABASE_URL is not set. Add your Supabase connection string to .env.local " +
      "(Supabase Dashboard > Project Settings > Database > Connect > Connection string, session pooler on port 5432).",
  )
}

export const db = postgres<Contract>({
  contractJson,
  url,
  poolOptions: {
    connectionTimeoutMillis: 10_000,
  },
})