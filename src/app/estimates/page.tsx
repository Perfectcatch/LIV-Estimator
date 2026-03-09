import { getEstimates } from "@/lib/queries";
import { EstimatesList } from "@/components/estimates/EstimatesList";

export default async function EstimatesPage() {
  const estimates = await getEstimates();
  return <EstimatesList estimates={estimates} />;
}
