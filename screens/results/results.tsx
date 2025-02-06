"use client"

import { cache, useEffect, useState } from "react"
import { GithubRepositoriesPagination } from "@/components/domain/github-repositories-pagination/gitthub-repositories-pagination"
import { getRepos } from "@/data-access/github"
import { GithubRepositories } from "@/components/domain/github-repositories/github-repositories"
import { useSearchParams } from "next/navigation"
import { Repository } from "@/lib/types/github"

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

  const fetchRepos = cache(
    async () =>
      await getRepos({
        startCursor,
        endCursor,
        q,
        direction: searchParams.get("direction"),
        sort: searchParams.get("sort"),
      }).then((res) => {
        setEdges(res.search.edges)
        setPageInfo(res.search.pageInfo)
      })
  )

  useEffect(() => {
    if (!q) return

    fetchRepos()
  }, [q, startCursor, endCursor])

  if (edges.length === 0 && q) return <></>

  return (
    <>
      <GithubRepositories q={q} edges={edges} />
      <GithubRepositoriesPagination {...pageInfo} />
    </>
  )
}
