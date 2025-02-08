import { getRepo } from "@/data-access/github"
import { Repository } from "@/src/lib/types/github"
import { Params } from "next/dist/server/request/params"

export async function useGetRepo(params: Params): Promise<Repository> {
  return await getRepo(params)
}
