import { createClient } from "@/lib/supabase/server";

// ── Dashboard KPIs ──────────────────────────────────────────
export async function getDashboardData() {
  const supabase = await createClient();

  const [
    { count: clientCount },
    { data: jobs },
    { data: invoices },
    { data: proposals },
    { data: activityLogs },
  ] = await Promise.all([
    supabase.from("clients").select("*", { count: "exact", head: true }),
    supabase.from("jobs").select("id, name, status, description, estimated_revenue, actual_revenue, estimated_cost, actual_cost, start_date, target_end_date").limit(50),
    supabase.from("invoices").select("id, invoice_number, status, total, amount_paid, due_date").eq("status", "sent").limit(50),
    supabase.from("proposals").select("id, name, status, final_total, created_at").limit(50),
    supabase.from("activity_logs").select("id, activity_type, entity_type, entity_name, description, created_at").order("created_at", { ascending: false }).limit(10),
  ]);

  const activeJobs = (jobs ?? []).filter((j) => j.status === "in_progress" || j.status === "pending");
  const pipelineValue = (proposals ?? []).filter((p) => p.status === "sent" || p.status === "draft").reduce((sum, p) => sum + (p.final_total ?? 0), 0);
  const openInvoiceTotal = (invoices ?? []).reduce((sum, i) => sum + ((i.total ?? 0) - (i.amount_paid ?? 0)), 0);

  return {
    kpis: {
      pipelineValue,
      activeJobCount: activeJobs.length,
      customerCount: clientCount ?? 0,
      openInvoiceTotal,
      openInvoiceCount: (invoices ?? []).length,
    },
    activeJobs: activeJobs.slice(0, 6),
    recentActivity: (activityLogs ?? []).slice(0, 8),
  };
}

// ── Estimates ───────────────────────────────────────────────
export async function getEstimates() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proposals")
    .select("id, name, status, final_total, created_at, client_id")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("[v0] getEstimates error:", error.message);
    return [];
  }

  // Fetch client names for each estimate
  const clientIds = [...new Set((data ?? []).map((e) => e.client_id).filter(Boolean))];
  let clientMap: Record<string, string> = {};
  if (clientIds.length > 0) {
    const { data: clients } = await supabase.from("clients").select("id, name").in("id", clientIds);
    clientMap = Object.fromEntries((clients ?? []).map((c) => [c.id, c.name]));
  }

  return (data ?? []).map((e) => ({
    ...e,
    client_name: clientMap[e.client_id ?? ""] ?? "—",
  }));
}

// ── Catalog Items (SKUs) ────────────────────────────────────
export async function getCatalogItems() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("catalog_items")
    .select("*")
    .order("name", { ascending: true })
    .limit(200);

  if (error) {
    console.error("[v0] getCatalogItems error:", error.message);
    return [];
  }
  return data ?? [];
}

// ── Single Catalog Item (SKU detail) ────────────────────────
export async function getCatalogItemById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("catalog_items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("[v0] getCatalogItemById error:", error.message);
    return null;
  }
  return data;
}

// ── Clients ─────────────────────────────────────────────────
export async function getClients() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("name", { ascending: true })
    .limit(200);

  if (error) {
    console.error("[v0] getClients error:", error.message);
    return [];
  }
  return data ?? [];
}
