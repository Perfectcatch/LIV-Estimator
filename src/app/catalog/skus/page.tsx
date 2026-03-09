import { getCatalogItems } from "@/lib/queries";
import { CatalogSkusList } from "@/components/catalog/CatalogSkusList";

export default async function SkusPage() {
  const items = await getCatalogItems();
  return <CatalogSkusList items={items} />;
}
