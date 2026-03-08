import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _supabaseAdmin: SupabaseClient | null = null
let _supabase: SupabaseClient | null = null

// Server-side client (use in API routes + server components)
export function getSupabaseAdmin() {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }
  return _supabaseAdmin
}

// Client-side client (use in browser components)
export function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return _supabase
}
