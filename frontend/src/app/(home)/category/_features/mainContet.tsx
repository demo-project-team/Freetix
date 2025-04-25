import { Skeleton } from "@/components/ui/skeleton";
import { useCategory } from "@/provider/categoryProvider";

const Maincontent = () => {
  const { category } = useCategory();
  const isLoading = !category?.name;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white w-screen">
      <header className="py-10 px-6 text-center">
        {isLoading ? (
          <Skeleton className="h-14 w-72 mx-auto mb-4" />
        ) : (
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r uppercase from-cyan-400 to-purple-600 drop-shadow-[0_0_15px_rgba(58,150,221,0.5)]">
            {category.name} UNIVERSE
          </h1>
        )}
        <div className="mt-6 h-1 w-32 bg-cyan-500 mx-auto rounded-full shadow-lg" />
      </header>

      <main className="px-6 md:px-12 lg:px-24 py-10 flex-grow">
        <h2 className="text-3xl font-bold text-cyan-300 mb-10 text-center animate-pulse">
          🕹️ Тоглоомын Төрлүүд
        </h2>
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="backdrop-blur-md bg-white/5 border border-cyan-500/20 rounded-2xl p-6 shadow-xl"
                  >
                    <Skeleton className="w-full h-48 mb-6 rounded-lg" />
                    <Skeleton className="h-6 w-2/3 mx-auto mb-4" />
                    <Skeleton className="h-4 w-5/6 mx-auto mb-4" />
                    <Skeleton className="h-10 w-32 mx-auto rounded-full" />
                  </div>
                ))
              : <>{category.vendors.map((vendor, i)=>(
                <div key={i}>
                  {vendor.name}
                  <div>{vendor.description}</div>
                  <div>{vendor.email}</div>
                  <div>{vendor.phone}</div>
                  <div>{vendor.address?.street}</div>
                </div>
              ))}</>}
          </div>
        </section>
      </main>

      {/* Footer as-is */}
    </div>
  );
};
export default Maincontent