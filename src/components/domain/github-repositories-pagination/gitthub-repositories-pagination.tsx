"use client"
import { cn } from "@/src/lib/functions/cn/cn"
import { useSearchParams } from "next/navigation"
import { PageInfo } from "@/src/lib/types/github"
import { BrowseDirection } from "@/src/lib/types/pagination"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination/pagination"
import { useRouter } from "nextjs-toploader/app"

type Props = { pageInfo: PageInfo }

export function GithubRepositoriesPagination({
  pageInfo: { startCursor, endCursor, hasNextPage, hasPreviousPage },
}: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  function goToPage(direction: BrowseDirection) {
    const nextParams = new URLSearchParams(searchParams.toString())

    nextParams.set("startCursor", startCursor || "")
    nextParams.set("endCursor", endCursor || "")
    nextParams.set("direction", direction)

    router.push(`?${nextParams.toString()}`)
  }

  const disabledPaginationClasses = "opacity-50 pointer-events-none"
  const commonPaginationClasses = "w-40 select-none"

  if (!hasNextPage && !hasPreviousPage) return

  return (
    <Pagination className={`mt-2`}>
      <PaginationContent className="grid grid-cols-2 justify-items-center">
        <PaginationItem>
          <PaginationPrevious
            onClick={hasPreviousPage ? () => goToPage(BrowseDirection.Backward) : undefined}
            aria-disabled={!hasPreviousPage}
            className={cn(commonPaginationClasses, !hasPreviousPage && disabledPaginationClasses)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={hasNextPage ? () => goToPage(BrowseDirection.Forward) : undefined}
            aria-disabled={!hasNextPage}
            className={cn(commonPaginationClasses, !hasNextPage && disabledPaginationClasses)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
