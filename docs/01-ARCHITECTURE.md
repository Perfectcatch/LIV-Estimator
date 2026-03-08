# 01 — ARCHITECTURE

> Stack decisions, deployment configuration, environment variables, and authentication.

---

## STACK DECISIONS

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js 14 (App Router) | Server Components for catalog pages, Client Islands for forms. Vercel-native. |
| **Language** | TypeScript (strict mode) | Type safety across the entire 4-tier catalog hierarchy. |
| **Database** | PostgreSQL (Supabase) | Relational data fits the SKU→Kit→Assembly→SA hierarchy. Free tier, built-in dashboard, auth + storage for later. |
| **ORM** | Prisma | Type-safe queries, easy migrations, great schema DSL. Supabase pooler compatible. |
| **Styling** | Tailwind CSS + shadcn/ui | Rapid UI dev, consistent design system. |
| **PDF Gen** | `@react-pdf/renderer` | Server-side PDF for proposals, POs, contracts. |
| **Email** | Resend | Vercel-native transactional email for proposal delivery. |
| **File Storage** | Supabase Storage | PDF storage, attachments, exports. Free 1GB on free tier. |
| **Auth** | NextAuth.js (Credentials + Google) | Simple auth — only LIV staff need access. |
| **State Mgmt** | React Query (TanStack) + Zustand | Server state caching + lightweight client state for forms. |

---

## ENVIRONMENT VARIABLES

```env
# .env.local

# ── Supabase Database ──
# Project Settings → Database → Connection string
DATABASE_URL="postgresql://postgres.[REF]:[PASS]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[REF]:[PASS]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

# ── Supabase API ──
NEXT_PUBLIC_SUPABASE_URL="https://[REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."

# ── Auth ──
NEXTAUTH_SECRET="generate-random-secret"
NEXTAUTH_URL="https://your-app.vercel.app"

# ── Email (Resend) ──
RESEND_API_KEY="re_..."
EMAIL_FROM="estimates@livpools.com"

# ── JobTread Integration ──
JOBTREAD_API_KEY="jt_..."
JOBTREAD_BASE_URL="https://api.jobtread.com/v1"

# ── Company Defaults (from 09-SETTINGS) ──
COMPANY_NAME="LIV Pools LLC"
COMPANY_PHONE="(727) 555-0100"
COMPANY_EMAIL="info@livpools.com"
COMPANY_LICENSE="CPC1459998"
COMPANY_CITY="Clearwater, FL 34619"
```

---

## DEPLOYMENT CONFIG

### `next.config.ts`

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@react-pdf/renderer'],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.vercel-storage.com' },
    ],
  },
}

export default nextConfig
```

### `vercel.json`

```json
{
  "framework": "nextjs",
  "regions": ["iad1"],
  "crons": [
    {
      "path": "/api/jobtread/sync",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

---

## KEY DEPENDENCIES

```json
{
  "dependencies": {
    "next": "^14.2",
    "react": "^18.3",
    "typescript": "^5.5",
    "@prisma/client": "^5.18",
    "@tanstack/react-query": "^5",
    "zustand": "^4.5",
    "@react-pdf/renderer": "^3.4",
    "resend": "^3",
    "@supabase/supabase-js": "^2.45",
    "next-auth": "^4.24",
    "zod": "^3.23",
    "date-fns": "^3.6",
    "lucide-react": "^0.400",
    "class-variance-authority": "^0.7",
    "clsx": "^2.1",
    "tailwind-merge": "^2.4"
  },
  "devDependencies": {
    "prisma": "^5.18",
    "@types/react": "^18.3",
    "@types/node": "^20",
    "tailwindcss": "^3.4",
    "postcss": "^8",
    "autoprefixer": "^10",
    "eslint": "^8",
    "eslint-config-next": "^14"
  }
}
```

---

## AUTH MODEL

Simple role-based access — no customer-facing portal needed yet.

| Role | Access |
|------|--------|
| `ADMIN` | Full CRUD on everything including settings and catalog |
| `ESTIMATOR` | Create/edit estimates, generate proposals and POs |
| `VIEWER` | Read-only access to estimates and documents |

---

## DATA FLOW ARCHITECTURE

```
User Input (Project Info Form)
      │
      ▼
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  Takeoff     │────▶│   Formula    │────▶│  Calculated  │
│  Dimensions  │     │   Library    │     │  Quantities  │
└─────────────┘     └──────────────┘     └──────┬───────┘
                                                │
      ┌─────────────┐                           │
      │  Selections  │──────────────────────────┤
      │  (8 cats)    │                           │
      └─────────────┘                           ▼
                                        ┌──────────────┐
      ┌─────────────┐                  │   BOM Engine  │
      │   Catalog    │────────────────▶│   (Explode    │
      │   (4-tier)   │                  │    hierarchy) │
      └─────────────┘                  └──────┬───────┘
                                               │
                                               ▼
                                       ┌──────────────┐
                                       │   Pricing    │
                                       │   Engine     │
                                       └──────┬───────┘
                                               │
                    ┌──────────────────────────┼──────────────────┐
                    │                          │                  │
                    ▼                          ▼                  ▼
           ┌──────────────┐          ┌──────────────┐   ┌──────────────┐
           │   Proposal   │          │   Purchase   │   │    Budget    │
           │   + Contract │          │   Orders     │   │   Tracking   │
           └──────────────┘          └──────────────┘   └──────────────┘
```

---

*Next: See `02-DATABASE-SCHEMA.md` for the complete Prisma schema.*
