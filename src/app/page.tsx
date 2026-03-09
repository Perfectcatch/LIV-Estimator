import { getDashboardData } from "@/lib/queries";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

export default async function DashboardPage() {
  const data = await getDashboardData();
  return <DashboardContent {...data} />;
}
