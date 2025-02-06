"use client"

import { lazy, Suspense, useEffect, useState } from "react"
import { GithubRepositoriesPagination } from "@/components/domain/github-repositories-pagination/gitthub-repositories-pagination"
import { getRepos } from "@/data-access/github"
import { useSearchParams } from "next/navigation"
import { Repository } from "@/lib/types/github"
import { GithubRepositoriesTableSkeleton } from "@/components/domain/github-repositories/components/skeleton/skeleton"
const GithubRepositories = lazy(() => import("@/components/domain/github-repositories/github-repositories"))

export function ResultsScreen() {
  const searchParams = useSearchParams()
  const [edges, setEdges] = useState<{ node: Repository }[]>([])
  const [pageInfo, setPageInfo] = useState({
    startCursor: "",
    endCursor: "",
    hasNextPage: false,
    hasPreviousPage: false,
  })
  const startCursor = searchParams.get("startCursor")
  const endCursor = searchParams.get("endCursor")
  const q = searchParams.get("q")

  useEffect(() => {
    if (!q) return

    getRepos({
      startCursor,
      endCursor,
      q,
      direction: searchParams.get("direction"),
      sort: searchParams.get("sort"),
    }).then((res) => {
      setEdges(res.search.edges)
      setPageInfo(res.search.pageInfo)
    })
  }, [q, startCursor, endCursor])

  if (edges.length === 0 && q) return <></>

  return (
    <>
      <Suspense fallback={<GithubRepositoriesTableSkeleton />}>
        <GithubRepositories q={q} edges={edges} />
      </Suspense>
      <GithubRepositoriesPagination {...pageInfo} />
    </>
  )
}
