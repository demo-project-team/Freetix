"use client";

import { VendorProvider } from "@/provider/VendorProvider";
import { useParams } from "next/navigation";
import MainContent from "./_features/MainContent";

const Home = () => {
  const { organizationId } = useParams();
  return (
    <VendorProvider id={organizationId as string}>
      <MainContent />
    </VendorProvider>
  );
};
export default Home;
