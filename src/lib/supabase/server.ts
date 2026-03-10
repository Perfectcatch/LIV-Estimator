import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/schema";

function makeMockQuery(): Record<string, unknown> {
  const empty = { data: [], error: null, count: 0 };
  const self: Record<string, unknown> = {
    then: (resolve: (v: unknown) => unknown) => Promise.resolve(empty).then(resolve),
    catch: (reject: (v: unknown) => unknown) => Promise.resolve(empty).catch(reject),
    finally: (cb: () => void) => Promise.resolve(empty).finally(cb),
  };
  const noop = () => self;
  [
    "select","insert","update","delete","upsert",
    "eq","neq","gt","gte","lt","lte","like","ilike","is","in",
    "contains","containedBy","order","limit","range","single",
    "maybeSingle","filter","match","not","or","and","returns",
    "throwOnError","overrideTypes","csv","explain","rollback",
    "head","count",
  ].forEach(m => { self[m] = noop; });
  return self;
}

function createMockClient() {
  return {
    from: () => makeMockQuery(),
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    },
    rpc: () => makeMockQuery(),
    schema: () => ({ from: () => makeMockQuery() }),
  };
}

export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return createMockClient() as unknown as ReturnType<typeof createServerClient<Database>>;
  }

  const cookieStore = await cookies();
  return createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {}
      },
    },
  });
}
