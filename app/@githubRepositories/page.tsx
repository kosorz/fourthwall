import { SearchParams } from "next/dist/server/request/search-params"
import { Suspense } from "react"
import { GithubRepositoriesPagination } from "@/components/domain/github-repositories/pagination"
import { fetchGithubRepositories } from "@/lib/api/fetchGithubRepositories"
import { Response } from "@/lib/types/github"
import { GithubRepositoriesTable } from "@/components/domain/github-repositories/table"
import { GithubRepositoriesTableSkeleton } from "./components/skeleton"

export const experimental_ppr = true

type Props = { searchParams: Promise<SearchParams> }

export default async function Page({ searchParams }: Props) {
  const { q = "", startCursor = "", endCursor = "", direction = "", sort = "" } = await searchParams

  const {
    data: {
      search: { edges, pageInfo },
    },
  }: Response = await fetchGithubRepositories({ startCursor, endCursor, direction, q, sort })

  return (
    <>
      <Suspense key={`${startCursor}${endCursor}`} fallback={<GithubRepositoriesTableSkeleton />}>
        <GithubRepositoriesTable q={q} edges={edges} />
      </Suspense>
      <GithubRepositoriesPagination {...pageInfo} />
    </>
  )
}
