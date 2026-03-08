#!/bin/bash
# ══════════════════════════════════════════════════════════════
#  LIV POOLS CRM — Project Setup Script
#  Run this from INSIDE your cloned repo directory
# ══════════════════════════════════════════════════════════════

set -e  # Exit on any error

echo ""
echo "═══════════════════════════════════════════════════"
echo "  LIV POOLS CRM — Setting Up Project Structure"
echo "═══════════════════════════════════════════════════"
echo ""

# ── Step 1: Check we're in a git repo ──
if [ ! -d ".git" ]; then
  echo "❌  ERROR: Not inside a git repo."
  echo "   Run this from your cloned repo folder."
  echo "   Example:  cd ~/Projects/liv-pools-crm && bash setup.sh"
  exit 1
fi

echo "✅  Git repo detected: $(basename $(pwd))"
echo ""

# ── Step 2: Initialize Next.js with TypeScript + Tailwind ──
echo "📦  Initializing Next.js 14 project..."
# create-next-app rejects uppercase dir names, so scaffold in a temp dir
TMPDIR=$(mktemp -d)
npx create-next-app@latest "$TMPDIR/liv-estimator" \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm \
  --no-turbopack

# Move scaffolded files into the repo (won't overwrite existing files like docs/)
cp -rn "$TMPDIR/liv-estimator/" ./
# Overwrite defaults that need to be here (package.json, tsconfig, etc.)
cp -f "$TMPDIR/liv-estimator/package.json" ./
cp -f "$TMPDIR/liv-estimator/tsconfig.json" ./
cp -f "$TMPDIR/liv-estimator/next.config.ts" ./
cp -f "$TMPDIR/liv-estimator/tailwind.config.ts" ./
cp -f "$TMPDIR/liv-estimator/postcss.config.mjs" ./
cp -f "$TMPDIR/liv-estimator/.eslintrc.json" ./
cp -rf "$TMPDIR/liv-estimator/src" ./
cp -rf "$TMPDIR/liv-estimator/public" ./
cp -f "$TMPDIR/liv-estimator/.gitignore" ./
rm -rf "$TMPDIR"

echo ""
echo "✅  Next.js initialized"

# ── Step 3: Install additional dependencies ──
echo ""
echo "📦  Installing project dependencies..."
npm install \
  @prisma/client \
  @tanstack/react-query \
  @supabase/supabase-js \
  zustand \
  zod \
  date-fns \
  lucide-react \
  class-variance-authority \
  clsx \
  tailwind-merge \
  next-auth \
  resend

echo ""
echo "📦  Installing dev dependencies..."
npm install -D \
  prisma \
  @types/node

echo ""
echo "✅  Dependencies installed"

# ── Step 4: Initialize Prisma ──
echo ""
echo "🗄️   Initializing Prisma..."
npx prisma init --datasource-provider postgresql

echo "✅  Prisma initialized"

# ── Step 5: Create directory structure ──
echo ""
echo "📁  Creating directory structure..."

# Docs
mkdir -p docs

# App routes
mkdir -p src/app/estimates/new
mkdir -p src/app/estimates/\[id\]/selections
mkdir -p src/app/estimates/\[id\]/takeoff
mkdir -p src/app/estimates/\[id\]/bom
mkdir -p src/app/estimates/\[id\]/pricing
mkdir -p src/app/estimates/\[id\]/proposal
mkdir -p src/app/estimates/\[id\]/purchase-orders
mkdir -p src/app/estimates/\[id\]/budget
mkdir -p src/app/estimates/\[id\]/change-orders
mkdir -p src/app/estimates/\[id\]/contract
mkdir -p src/app/estimates/\[id\]/job-tracker
mkdir -p src/app/estimates/\[id\]/cost-tracking
mkdir -p src/app/estimates/\[id\]/payments

mkdir -p src/app/catalog/skus/new
mkdir -p src/app/catalog/skus/\[id\]
mkdir -p src/app/catalog/kits/new
mkdir -p src/app/catalog/kits/\[id\]
mkdir -p src/app/catalog/assemblies/\[id\]
mkdir -p src/app/catalog/super-assemblies/\[id\]

mkdir -p src/app/vendors/\[id\]/pricing

mkdir -p src/app/settings

# API routes
mkdir -p src/app/api/catalog/skus
mkdir -p src/app/api/catalog/kits
mkdir -p src/app/api/catalog/assemblies
mkdir -p src/app/api/catalog/super-assemblies
mkdir -p src/app/api/estimates/\[id\]/selections
mkdir -p src/app/api/estimates/\[id\]/bom
mkdir -p src/app/api/estimates/\[id\]/pricing
mkdir -p src/app/api/estimates/\[id\]/proposal
mkdir -p src/app/api/estimates/\[id\]/po
mkdir -p src/app/api/vendors
mkdir -p src/app/api/cost-codes
mkdir -p src/app/api/formulas
mkdir -p src/app/api/settings
mkdir -p src/app/api/jobtread

# Components
mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/components/catalog
mkdir -p src/components/estimate
mkdir -p src/components/bom
mkdir -p src/components/pricing
mkdir -p src/components/proposal
mkdir -p src/components/po
mkdir -p src/components/budget
mkdir -p src/components/contract
mkdir -p src/components/dashboard

# Lib / Types / Hooks
mkdir -p src/lib
mkdir -p src/types
mkdir -p src/hooks

echo "✅  Directory structure created"

# ── Step 6: Create .env.example ──
echo ""
echo "⚙️   Creating environment config..."

cat > .env.example << 'ENVEOF'
# ══════════════════════════════════════════════════════════
#  LIV POOLS CRM — Environment Variables
#  Copy to .env.local and fill in your values
# ══════════════════════════════════════════════════════════

# ── Supabase Database ──
# Go to: Supabase Dashboard → Project Settings → Database
# "Connection string" tab → Mode: "Transaction" for DATABASE_URL
# Mode: "Session" for DIRECT_URL
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

# ── Supabase API (for auth + storage later) ──
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""

# ── Auth ──
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# ── Email (Resend) ──
RESEND_API_KEY=""
EMAIL_FROM="estimates@livpools.com"

# ── JobTread ──
JOBTREAD_API_KEY=""
JOBTREAD_BASE_URL="https://api.jobtread.com/v1"
ENVEOF

# Copy to .env.local if it doesn't exist
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "✅  Created .env.local (fill in your values)"
else
  echo "⚠️   .env.local already exists — skipping"
fi

# ── Step 7: Update .gitignore ──
echo ""
echo "📝  Updating .gitignore..."

cat >> .gitignore << 'GITEOF'

# LIV Pools additions
.env.local
.env.production
prisma/dev.db
prisma/dev.db-journal
GITEOF

echo "✅  .gitignore updated"

# ── Step 8: Create placeholder files ──
echo ""
echo "📝  Creating core library files..."

# Prisma client singleton
cat > src/lib/db.ts << 'DBEOF'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
DBEOF

# Supabase client (for Storage + Auth later)
cat > src/lib/supabase.ts << 'SUPEOF'
import { createClient } from '@supabase/supabase-js'

// Server-side client (use in API routes + server components)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Client-side client (use in browser components)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
SUPEOF

# Utils
cat > src/lib/utils.ts << 'UTILEOF'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function generateProposalNumber(): string {
  const now = new Date()
  const yy = now.getFullYear().toString().slice(-2)
  const mm = (now.getMonth() + 1).toString().padStart(2, '0')
  const seq = '0001' // TODO: query DB for next sequence
  return `Q${yy}${mm}${seq}`
}
UTILEOF

# Constants
cat > src/lib/constants.ts << 'CONSTEOF'
// Selection categories matching the 8 dropdown groups
export const SELECTION_CATEGORIES = [
  'INTERIOR_FINISH',
  'COPING',
  'EQUIPMENT',
  'SANITIZATION',
  'AUTOMATION',
  'HEATING',
  'LIGHTING',
  'SPA',
] as const

// Estimate status lifecycle
export const ESTIMATE_STATUSES = [
  'DRAFT',
  'PROPOSED',
  'APPROVED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
] as const

// Construction stages for PO builder
export const CONSTRUCTION_STAGES = [
  { num: 1, name: 'Pre-Construction' },
  { num: 2, name: 'Excavation' },
  { num: 3, name: 'Steel & Rebar' },
  { num: 4, name: 'Plumbing' },
  { num: 5, name: 'Electrical' },
  { num: 6, name: 'Shotcrete Shell' },
  { num: 7, name: 'Tile & Coping' },
  { num: 8, name: 'Equipment Set' },
  { num: 9, name: 'Interior Finish' },
  { num: 10, name: 'Startup & Closeout' },
] as const

// Company defaults
export const COMPANY = {
  name: 'LIV Pools LLC',
  license: 'CPC1459998',
  phone: '(727) 555-0100',
  email: 'info@livpools.com',
  cityStateZip: 'Clearwater, FL 34619',
} as const
CONSTEOF

# Type definitions
cat > src/types/catalog.ts << 'TYPEEOF'
export interface Sku {
  id: string
  code: string
  name: string
  costType: 'MATERIALS' | 'LABOR' | 'EQUIPMENT' | 'OVERHEAD'
  category: string
  detail?: string
  vendorId: string
  uom: string
  unitCost: number
  markupPct: number
  costCodeId: string
  stage: string
  fixedVar: 'FIXED' | 'VARIABLE'
  defaultQty?: number
  formulaRef?: string
  notes?: string
}

export interface Kit {
  id: string
  code: string
  name: string
  vendorLabel: string
  skus: Sku[]
}

export interface Assembly {
  id: string
  code: string
  name: string
  description?: string
  kits: Kit[]
}

export interface SuperAssembly {
  id: string
  code: string
  name: string
  assemblies: Assembly[]
}
TYPEEOF

cat > src/types/estimate.ts << 'ESTEOF'
export interface Estimate {
  id: string
  proposalNumber: string
  status: string
  customerName: string
  address: string
  cityCounty: string
  state: string
  zip: string
  phoneCel?: string
  email?: string
  projectName?: string
  division: 'RETAIL' | 'RESIDENTIAL' | 'COMMERCIAL'
  globalMarkup: number
  targetMargin: number
  taxRate: number
  createdAt: string
  updatedAt: string
}

export interface Selection {
  id: string
  estimateId: string
  category: string
  optionIndex: number
  optionName: string
  costDelta: number
}

export interface Takeoff {
  id: string
  estimateId: string
  poolLength: number
  poolWidth: number
  shallowDepth: number
  deepDepth: number
  spaLength: number
  spaWidth: number
  spaDepth: number
  // Calculated
  avgDepth?: number
  poolSqft?: number
  poolPerimeter?: number
  poolGallons?: number
  guniteCY?: number
  excavCY?: number
  haulLoads?: number
  rebarSticks?: number
  plumbingLF?: number
}
ESTEOF

echo "✅  Core files created"

# ── Done ──
echo ""
echo "═══════════════════════════════════════════════════"
echo "  ✅  PROJECT SETUP COMPLETE"
echo "═══════════════════════════════════════════════════"
echo ""
echo "  Next steps:"
echo ""
echo "  1. Copy the docs/ folder from Claude into your repo"
echo "     (see instructions below)"
echo ""
echo "  2. Set up Supabase:"
echo "     → Go to https://supabase.com/dashboard"
echo "     → New Project → name it 'liv-pools-crm'"
echo "     → Set a strong database password (save it!)"
echo "     → Go to Project Settings → Database"
echo "     → Copy 'Transaction' connection string → DATABASE_URL"
echo "     → Copy 'Session' connection string → DIRECT_URL"
echo "     → Paste both into .env.local"
echo ""
echo "  3. Copy the Prisma schema from docs/02-DATABASE-SCHEMA.md"
echo "     into prisma/schema.prisma"
echo ""
echo "  4. Run the database migration:"
echo "     npx prisma migrate dev --name init"
echo ""
echo "  5. Start developing:"
echo "     npm run dev"
echo ""
echo "  6. Push to Git → auto-deploys on Vercel"
echo "     git add -A"
echo "     git commit -m 'Initial project setup'"
echo "     git push origin main"
echo ""
echo "═══════════════════════════════════════════════════"
