import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonProduct = () => {
    return (
        <div className="grid sm:grid-cols-2 sm:py-16 sm:px-40">
            <div className="space-y-4">
                <Skeleton className="h-[400px] w-full rounded-xl" />
                <div className="grid grid-cols-4 gap-4">
                    <Skeleton className="h-[100px] w-full rounded-lg" />
                    <Skeleton className="h-[100px] w-full rounded-lg" />
                    <Skeleton className="h-[100px] w-full rounded-lg" />
                    <Skeleton className="h-[100px] w-full rounded-lg" />
                </div>
            </div>
            <div className="space-y-6 px-8">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        </div>
    )
}
