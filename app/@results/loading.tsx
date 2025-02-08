import { GithubRepositoriesTableSkeleton } from "@/src/components/domain/github-repositories/components/skeleton/skeleton"
import { Skeleton } from "@/src/components/ui/skeleton/skeleton"

export default function Loading() {
  return (
    <GithubRepositoriesTableSkeleton>
      <Skeleton aria-label="Pagination loading skeleton" className="w-80 self-center max-w-xl min-h-[32px]" />
    </GithubRepositoriesTableSkeleton>
  )
}
