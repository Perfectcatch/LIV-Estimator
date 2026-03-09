# 01 — ARCHITECTURE

> Stack decisions, deployment configuration, and environment variables.
> **Updated for Prisma 7 + Vercel v0 + Supabase Marketplace Integration.**

---

## CRITICAL: PRISMA 7 CHANGES

Vercel v0 installs **Prisma 7.x** by default. This has breaking changes from Prisma 5/6:

1. **Database URL moved** — out of `schema.prisma`, into `prisma.config.ts`
2. **`directUrl` removed** — use only `url` in `prisma.config.ts` (point it at direct/session connection)
3. **Driver adapters required** — must use `@prisma/adapter-pg` + `pg` package
4. **Generator provider** — use `prisma-client-js` (NOT `prisma-client` — avoids Turbopack issues)
5. **PrismaClient init changed** — must pass adapter in constructor
6. **`dotenv` must be explicitly imported** in `prisma.config.ts`

---

## SUPABASE INTEGRATION (via Vercel Marketplace)

### Setup Steps
1. In Vercel Dashboard → project → **Settings → Integrations → Browse Marketplace**
2. Search **Supabase** → **Add Integration**
3. Select your Vercel project, create or link a Supabase project
4. Vercel **auto-populates** these env vars:

| Variable | Usage |
|----------|-------|
| `POSTGRES_URL` | Pooled connection (port 6543, pgbouncer) |
| `POSTGRES_URL_NON_POOLING` | Direct connection (port 5432) — **use for Prisma** |
| `POSTGRES_PRISMA_URL` | Prisma-optimized pooled URL |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only service role key |

> **IMPORTANT:** In `prisma.config.ts`, use `POSTGRES_URL_NON_POOLING` for migrations. Prisma needs a direct TCP connection, not pgbouncer.

---

## KEY DEPENDENCIES

```bash
# Runtime
npm install @prisma/client @prisma/adapter-pg pg @supabase/supabase-js dotenv @tanstack/react-query zustand zod date-fns lucide-react class-variance-authority clsx tailwind-merge

# Dev
npm install -D prisma @types/pg tsx
```

---

## FILE-BY-FILE CONFIGURATION

### 1. `prisma.config.ts` (PROJECT ROOT)

```typescript
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("POSTGRES_URL_NON_POOLING"),
  },
});
```

### 2. `prisma/schema.prisma` (Prisma 7 format — NO url in datasource)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  // NO url here — configured in prisma.config.ts
}

// ... all models (see 02-DATABASE-SCHEMA.md)
```

### 3. `src/lib/db.ts` (Prisma Client — adapter pattern)

```typescript
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaPg({
  connectionString: process.env.POSTGRES_URL!,
});

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
```

### 4. `src/lib/supabase.ts`

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### 5. `package.json` scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "postinstall": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio"
  }
}
```

> `postinstall: prisma generate` is critical — ensures Prisma client is generated on every Vercel deploy.

---

*Next: See `02-DATABASE-SCHEMA.md` for the complete Prisma 7 schema.*
