import { Skeleton } from "@/components/ui/skeleton"

const SkeletonLoader = () => {
    return(
        <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-40"/>
        ))}
      </div>
    )
}
export default SkeletonLoader