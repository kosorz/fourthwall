import { Skeleton } from "@/components/ui/skeleton"
import { GithubRepositoriesTableSkeleton } from "../../components/domain/github-repositories/skeleton"

export default function Loading() {
  return (
    <GithubRepositoriesTableSkeleton>
      <Skeleton className="w-80 self-center max-w-xl min-h-[32px]" />
    </GithubRepositoriesTableSkeleton>
  )
}
