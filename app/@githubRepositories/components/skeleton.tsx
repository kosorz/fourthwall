import { Skeleton } from "@/components/ui/skeleton"
import { ReactNode } from "react"

export function GithubRepositoriesTableSkeleton({ children }: { children?: ReactNode | ReactNode[] }) {
  return (
    <main className="flex flex-col gap-1 min-h-[500px]">
      {Array(11)
        .fill(null)
        .map((_, index) => (
          <Skeleton key={index} className="w-full max-w-3xl min-h-[41.5px]" />
        ))}
      <Skeleton className="w-80 mt-2 mb-[13px] self-center max-w-xl min-h-[30px]" />
      {children}
    </main>
  )
}
