import { SearchParams } from "next/dist/server/request/search-params"
import { GithubRepositoriesPagination } from "@/src/components/domain/github-repositories-pagination/gitthub-repositories-pagination"
import { useGetRepos } from "@/src/hooks/useGetRepos"
import { useTable } from "@/src/hooks/useTableComponent"

type Props = { searchParams: Promise<SearchParams> }

export async function ResultsScreen({ searchParams }: Props) {
  const {
    search: { edges, pageInfo },
  } = await useGetRepos(await searchParams)

  const Table = useTable()

  return (
    <>
      <Table edges={edges} />
      <GithubRepositoriesPagination pageInfo={pageInfo} />
    </>
  )
}
