import { OrganizationProvider } from "@/provider/OrganizationPrider";
import Maincontent from "./_features/Maincontent";

export default function Home() {
  return (
    <OrganizationProvider>
      <Maincontent/>
    </OrganizationProvider>
  );
}
