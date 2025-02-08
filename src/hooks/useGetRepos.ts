import { getRepos } from "@/data-access/github"
import { RepositorySearchResponse } from "@/src/lib/types/github"
import { SearchParams } from "next/dist/server/request/search-params"

export async function useGetRepos(searchParams: SearchParams): Promise<RepositorySearchResponse> {
  return await getRepos(searchParams)
}
