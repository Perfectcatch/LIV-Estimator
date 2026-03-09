import { getDashboardData } from "@/lib/queries";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

export default async function DashboardPage() {
  let data;
  try {
    data = await getDashboardData();
    console.log("[v0] Dashboard data loaded:", {
      kpis: data.kpis,
      jobCount: data.activeJobs.length,
      activityCount: data.recentActivity.length,
    });
  } catch (err) {
    console.error("[v0] Dashboard page error:", err);
    data = {
      kpis: { pipelineValue: 0, activeJobCount: 0, customerCount: 0, openInvoiceTotal: 0, openInvoiceCount: 0 },
      activeJobs: [],
      recentActivity: [],
    };
  }
  return <DashboardContent {...data} />;
}
