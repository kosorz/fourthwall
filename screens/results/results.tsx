"use client"

import { GithubRepositoriesPagination } from "@/components/domain/github-repositories-pagination/github-repositories-pagination"
import { getRepos } from "@/data-access/github"
import { useSearchParams } from "next/navigation"
import { GithubRepositoriesTableSkeleton } from "@/components/domain/github-repositories/components/skeleton/skeleton"
import { useQuery } from "@tanstack/react-query"
import { GithubRepositories } from "@/components/domain/github-repositories/github-repositories"

export function ResultsScreen() {
  const searchParams = useSearchParams()
  const startCursor = searchParams.get("startCursor")
  const endCursor = searchParams.get("endCursor")
  const direction = searchParams.get("direction")
  const sort = searchParams.get("sort")
  const q = searchParams.get("q")

  const { data, isPending } = useQuery({
    queryKey: ["repos", startCursor, endCursor, direction, sort, q],
    queryFn: () =>
      getRepos({
        startCursor,
        endCursor,
        q,
        direction,
        sort,
      }),
    staleTime: 60 * 1000,
    enabled: !!q,
  })

  const pageInfo = data?.search.pageInfo || {
    hasNextPage: true,
    hasPreviousPage: true,
    startCursor: "",
    endCursor: "",
  }

  const edges = data?.search.edges || []

  if (!q) return <></>

  if (isPending) return <GithubRepositoriesTableSkeleton />

  return (
    <>
      <GithubRepositories q={q} edges={edges} />
      <GithubRepositoriesPagination {...pageInfo} />
    </>
  )
}
