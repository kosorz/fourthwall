import { SearchParams } from "next/dist/server/request/search-params"
import { Suspense } from "react"
import { GithubRepositoriesPagination } from "@/components/domain/github-repositories/pagination"
import { getRepos } from "@/lib/api/github"
import { Response } from "@/lib/types/github"
import { GithubRepositoriesTable } from "@/components/domain/github-repositories"
import { GithubRepositoriesTableSkeleton } from "../../components/domain/github-repositories/skeleton"

type Props = { searchParams: Promise<SearchParams> }

export default async function Page({ searchParams }: Props) {
  const { q = "", startCursor = "", endCursor = "", direction = "", sort = "" } = await searchParams

  if (!q) return null

  const {
    data: {
      search: { edges, pageInfo },
    },
  }: Response = await getRepos({ startCursor, endCursor, direction, q, sort })

  return (
    <>
      <Suspense key={`${startCursor}${endCursor}`} fallback={<GithubRepositoriesTableSkeleton />}>
        <GithubRepositoriesTable q={q} edges={edges} />
      </Suspense>
      <GithubRepositoriesPagination {...pageInfo} />
    </>
  )
}
