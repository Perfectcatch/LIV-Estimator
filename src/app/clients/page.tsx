import { getClients } from "@/lib/queries";
import { ClientsList } from "@/components/clients/ClientsList";

export default async function ClientsPage() {
  const clients = await getClients();
  return <ClientsList clients={clients} />;
}
