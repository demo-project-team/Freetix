"use client";
import { useOrganization } from "@/provider/OrganizationPrider";

import TableCont from "../_components/TableCont";
const Maincontent = () => {

  const { organization } = useOrganization();
  console.log(organization);
if (!organization) return
  return (
    <div className="flex flex-col">
      {organization.map((org, i) => (
        <TableCont key={i} org={org}/>
      ))}
    </div>
  );
};
export default Maincontent;
