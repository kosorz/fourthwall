import { SearchParams } from "next/dist/server/request/search-params"
import { Suspense } from "react"
import { GithubRepositoriesPagination } from "@/components/domain/github-repositories-pagination/gitthub-repositories-pagination"
import { getRepos } from "@/lib/api/github"
import { Response } from "@/lib/types/github"
import GithubRepositoriesAsync, {
  GithubRepositories,
} from "@/components/domain/github-repositories/github-repositories"
import { GithubRepositoriesTableSkeleton } from "@/components/domain/github-repositories/components/skeleton/skeleton"

type Props = { searchParams: Promise<SearchParams> }

export async function ResultsScreen({ searchParams }: Props) {
  const { q = "", startCursor = "", endCursor = "", direction = "", sort = "" } = await searchParams

  if (!q) return <></>

  const {
    data: {
      search: { edges, pageInfo },
    },
  }: Response = await getRepos({ startCursor, endCursor, direction, q, sort })

  // to have streaming via suspense we need to render async component
  // to be able to render it in jest test we need synchronous component
  // those are childhood problem of RSC in conjunction with JEST
  const Table = process.env.NODE_ENV !== "test" ? GithubRepositoriesAsync : GithubRepositories

  return (
    <>
      <Suspense key={`${startCursor}${endCursor}`} fallback={<GithubRepositoriesTableSkeleton />}>
        <Table q={q} edges={edges} />
      </Suspense>
      <GithubRepositoriesPagination {...pageInfo} />
    </>
  )
}
