import { getCatalogItemById } from "@/lib/queries";
import { SkuDetailForm } from "@/components/catalog/SkuDetailForm";
import { notFound } from "next/navigation";

export default async function SkuDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getCatalogItemById(id);
  if (!item) return notFound();
  return <SkuDetailForm item={item} />;
}
