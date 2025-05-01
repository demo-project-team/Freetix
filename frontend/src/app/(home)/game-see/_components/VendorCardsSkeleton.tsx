import { Skeleton } from "@/components/ui/skeleton";

export const VendorCardsSkeleton = () => (
    <div className="bg-white bg-opacity-10 rounded-2xl shadow-2xl p-8 hover:scale-105 hover:bg-opacity-20 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300">
    <Skeleton className="rounded-xl mb-4 object-cover h-64 w-full" />
    <Skeleton className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent h-8" />
    <Skeleton className="mb-2 text-lg text-black h-6 w-32" />
    <Skeleton className="mb-6 text-lg text-black h-6 w-40" />
    <Skeleton className="inline-block mt-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-bold py-2 px-6 rounded-full border-2 border-blue-400 h-12 w-48" />
  </div>
  );